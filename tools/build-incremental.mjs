import { access, cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { execFile } from 'node:child_process'
import path from 'node:path'
import { promisify } from 'node:util'
import { loadTopicSelection, allImplementationTopics } from './incremental-selector.mjs'

const root = path.resolve(new URL('..', import.meta.url).pathname)
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
if (auto) {
  const { stdout } = await exec('git', ['diff', '--name-only', 'HEAD^', 'HEAD'], { cwd: root })
  const changed = stdout.trim().split('\n').filter(Boolean)
  const deckChanges = changed.filter((file) => file.startsWith('apps/slides/decks/') && file.endsWith('.md'))
  const unsafe = changed.some((file) => file.startsWith('apps/slides/') && !file.startsWith('apps/slides/decks/')) || changed.some((file) => ['package.json', 'pnpm-lock.yaml'].includes(file) || file.startsWith('packages/visualizations/'))
  autoTopics = unsafe ? undefined : deckChanges.map((file) => path.basename(file, '.md'))
  autoPortalOnly = !unsafe && deckChanges.length === 0
}
const selected = autoPortalOnly ? [] : await loadTopicSelection(root, { course, topic, topics: autoTopics })
const all = await allImplementationTopics(root)
const output = path.join(root, 'dist')
const slides = path.join(output, 'slides')
if (json) {
  console.log(JSON.stringify({ course: course ?? null, topic: topic ?? null, topics: selected, allTopics: all }, null, 2))
  process.exit(0)
}

console.log(`incremental mode: ${autoPortalOnly ? 'portal-only' : 'selected'} (${selected.length} Topic(s))`)
if (!portalOnly) for (const id of selected) console.log(`building slides: ${id}`)

const baseline = await Promise.all(all.map(async (id) => {
  try { await readFile(path.join(slides, id, 'index.html')); return true } catch { return false }
}))
const baselineComplete = baseline.every(Boolean)
if (!baselineComplete && !portalOnly) {
  console.log('incremental baseline unavailable -> full slide build')
  await exec('pnpm', ['build'], { cwd: root, env: { ...process.env, FULL_BUILD: '1' }, maxBuffer: 50 * 1024 * 1024 })
  process.exit(0)
}

const backup = path.join(root, '.incremental-slides-backup')
await rm(backup, { recursive: true, force: true })
if (await exists(slides)) await cp(slides, backup, { recursive: true })
await rm(output, { recursive: true, force: true })
await exec('pnpm', ['build:portal'], { cwd: root, maxBuffer: 50 * 1024 * 1024 })
await mkdir(output, { recursive: true })
if (await exists(backup)) await cp(backup, slides, { recursive: true })
await rm(backup, { recursive: true, force: true })

for (const id of selected) {
  await rm(path.join(slides, id), { recursive: true, force: true })
  await exec('pnpm', ['exec', 'slidev', 'build', `apps/slides/decks/${id}.md`, '--out', path.join(slides, id), '--base', `${process.env.BASE_PATH ?? '/'}slides/${id}/`, '--download', 'false'], { cwd: root, maxBuffer: 50 * 1024 * 1024 })
}
await mkdir(slides, { recursive: true })
await writeFile(path.join(slides, '.build-manifest.json'), JSON.stringify({ version: 1, topics: all }, null, 2) + '\n')
console.log(`incremental site written to ${path.relative(root, output)}/`)

async function exists(file) {
  try { await access(file); return true } catch { return false }
}
