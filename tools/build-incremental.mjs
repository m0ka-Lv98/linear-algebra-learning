import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { execFile } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'
import { loadTopicSelection, allImplementationTopics } from './incremental-selector.mjs'
import { generateCourse0110SlideDecks } from './generate-course01-10-slide-decks.mjs'
import { buildSlideDecks } from './slidev-build-pool.mjs'
import { normalizeCourse0110SlideDecks } from './normalize-course01-10-slide-decks.mjs'

const root = path.resolve(fileURLToPath(new URL('..', import.meta.url)))
const exec = promisify(execFile)
const args = process.argv.slice(2)
const value = (name) => { const i = args.indexOf(name); return i === -1 ? undefined : args[i + 1] }
const auto = args.includes('--auto')
const course = value('--course')
const topic = value('--topic')
const topics = value('--topics')?.split(',').map((id) => id.trim()).filter(Boolean)
const portalOnly = args.includes('--portal-only')
const full = args.includes('--full')
const json = args.includes('--json')
if (course && !/^\d{2}$/.test(course)) throw new Error('--course must be a two-digit Course ID')
if (topic && topics) throw new Error('Use either --topic or --topics, not both')
if (!course && !topic && !topics && !portalOnly && !auto) throw new Error('Specify --course, --topic, --topics, --portal-only, or --auto')
if (full) {
  await exec('pnpm', ['build'], { cwd: root, env: { ...process.env, FULL_BUILD: '1' }, maxBuffer: 50 * 1024 * 1024 })
  process.exit(0)
}

let autoTopics = topics
let autoPortalOnly = portalOnly
let autoCourse0110 = false
if (auto) {
  const diffBase = resolveDiffBase(process.env.DIFF_BASE)
  let stdout
  try {
    ({ stdout } = await exec('git', ['diff', '--name-only', diffBase, 'HEAD'], { cwd: root }))
  } catch (error) {
    console.warn(`WARN: git diff ${diffBase}..HEAD failed; falling back to HEAD^..HEAD`)
    ;({ stdout } = await exec('git', ['diff', '--name-only', 'HEAD^', 'HEAD'], { cwd: root }))
  }

  const changed = stdout.trim().split('\n').filter(Boolean)
  const deckChanges = changed
    .filter((file) => file.startsWith('apps/slides/decks/') && file.endsWith('.md'))
    .map((file) => path.basename(file, '.md'))
  const textbookChanges = changed
    .filter((file) => file.startsWith('apps/portal/textbook/') && file.endsWith('.md'))
    .map((file) => path.basename(file, '.md'))

  // Files such as style.css affect every deck. Build-script changes do not
  // change rendered content by themselves, so they do not invalidate 210 decks.
  const sharedDeckChanges = changed.filter((file) => file.startsWith('apps/slides/decks/') && !file.endsWith('.md'))
  const slideRuntimeChanges = changed.some((file) =>
    file.startsWith('apps/slides/') &&
    file !== 'apps/slides/build.mjs' &&
    !file.startsWith('apps/slides/decks/'))
  const generatorChanged = changed.includes('tools/generate-course01-10-slide-decks.mjs')
  const unsafe = sharedDeckChanges.length > 0 ||
    slideRuntimeChanges ||
    changed.some((file) => ['package.json', 'pnpm-lock.yaml'].includes(file) || file.startsWith('packages/visualizations/'))

  if (unsafe) {
    autoTopics = undefined
  } else if (generatorChanged) {
    autoCourse0110 = true
    autoTopics = undefined
  } else {
    autoTopics = [...new Set([...deckChanges, ...textbookChanges])]
  }
  autoPortalOnly = !unsafe && !generatorChanged && (autoTopics?.length ?? 0) === 0
}

const all = await allImplementationTopics(root)
const course00 = new Set(await loadTopicSelection(root, { course: '00' }))
let selected
if (autoCourse0110) {
  selected = all.filter((id) => !course00.has(id))
} else {
  selected = autoPortalOnly ? [] : await loadTopicSelection(root, { course, topic, topics: autoTopics })
}

const output = path.join(root, 'dist')
const slides = path.join(output, 'slides')
const portalOutput = path.join(root, 'apps/portal/.vitepress/dist')
if (json) {
  console.log(JSON.stringify({ course: course ?? null, topic: topic ?? null, topics: selected, allTopics: all }, null, 2))
  process.exit(0)
}

console.log(`incremental mode: ${autoPortalOnly ? 'portal-only' : autoCourse0110 ? 'Course 01-10 generated' : 'selected'} (${selected.length} Topic(s))`)
if (!autoPortalOnly) for (const id of selected) console.log(`selected slides: ${id}`)

const generatedSelected = selected.filter((id) => !course00.has(id))
if (generatedSelected.length) {
  const generated = await generateCourse0110SlideDecks({ root, ids: generatedSelected })
  console.log(`materialized generated slide sources: ${generated.total} (${generated.changed.length} changed)`)
  await normalizeCourse0110SlideDecks({ root, ids: generatedSelected })
}

const baseline = await Promise.all(all.map(async (id) => {
  try { await readFile(path.join(slides, id, 'index.html')); return true } catch { return false }
}))
const baselineComplete = baseline.every(Boolean)
if (!baselineComplete) {
  console.log('incremental baseline unavailable -> full site build')
  await exec('pnpm', ['build'], { cwd: root, env: { ...process.env, FULL_BUILD: '1' }, maxBuffer: 50 * 1024 * 1024 })
  process.exit(0)
}

const backup = path.join(root, '.incremental-slides-backup')
await rm(backup, { recursive: true, force: true })
await cp(slides, backup, { recursive: true })

try {
  await rm(output, { recursive: true, force: true })
  await mkdir(slides, { recursive: true })
  await cp(backup, slides, { recursive: true })

  for (const id of selected) {
    await rm(path.join(slides, id), { recursive: true, force: true })
  }

  // Portal and selected Slidev builds are independent. Overlap them, and use
  // the same bounded Slidev pool used by full and Course 01-10 builds.
  const portalBuild = exec('pnpm', ['build:portal'], {
    cwd: root,
    env: process.env,
    maxBuffer: 50 * 1024 * 1024,
  })
  const selectedBuild = buildSlideDecks({ root, ids: selected, outputDir: slides })
  await Promise.all([portalBuild, selectedBuild])

  await mkdir(output, { recursive: true })
  await cp(portalOutput, output, { recursive: true })
  await writeFile(
    path.join(slides, '.build-manifest.json'),
    `${JSON.stringify({ version: 2, topics: all }, null, 2)}\n`,
  )
  console.log(`incremental site written to ${path.relative(root, output)}/`)
} finally {
  await rm(backup, { recursive: true, force: true })
}

function resolveDiffBase(candidate) {
  if (!candidate || /^0+$/.test(candidate)) return 'HEAD^'
  return candidate
}

