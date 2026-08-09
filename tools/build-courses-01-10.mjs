import { access, cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { execFile } from 'node:child_process'
import path from 'node:path'
import { promisify } from 'node:util'
import { parse } from 'yaml'
import { generateCourse0110SlideDecks } from './generate-course01-10-slide-decks.mjs'
import { buildSlideDecks } from './slidev-build-pool.mjs'

const exec = promisify(execFile)
const root = process.cwd()
const curriculum = parse(await readFile(path.join(root, 'content/curriculum.yml'), 'utf8'))
if (!Array.isArray(curriculum?.topics)) throw new Error('content/curriculum.yml: topics array not found')

const implementationIds = (items) => [...new Set(items.map((item) => item.implementation_topic ?? item.id))]
const course00Ids = implementationIds(curriculum.topics.filter((item) => String(item.course) === '00'))
const targetIds = implementationIds(curriculum.topics.filter((item) => String(item.course) !== '00'))
const allIds = [...course00Ids, ...targetIds]

if (course00Ids.length !== 8) throw new Error(`Expected 8 Course 00 topics, found ${course00Ids.length}`)
if (targetIds.length !== 202) throw new Error(`Expected 202 Course 01-10 topics, found ${targetIds.length}`)
if (allIds.length !== 210) throw new Error(`Expected 210 total implementation topics, found ${allIds.length}`)

const output = path.join(root, 'dist')
const slides = path.join(output, 'slides')
const portalOutput = path.join(root, 'apps/portal/.vitepress/dist')
const backup = path.join(root, '.course00-slides-backup')

// This dedicated builder has one hard invariant: Course 00 is NEVER rebuilt.
// Therefore a previously built Course 00 baseline must already be present,
// normally restored by actions/cache in the Pages workflow. A missing baseline
// is a hard failure, not a reason to fall back to the full build.
const missingCourse00 = []
for (const id of course00Ids) {
  if (!(await exists(path.join(slides, id, 'index.html')))) missingCourse00.push(id)
}
if (missingCourse00.length) {
  throw new Error(
    `Course 00 baseline is incomplete (${missingCourse00.length}/8 missing): ${missingCourse00.join(', ')}. ` +
    'Refusing to run a full-build fallback because this mode must not rebuild Course 00. ' +
    'Restore a complete dist/slides cache from a successful Pages run and rerun.'
  )
}

const generated = await generateCourse0110SlideDecks({ root, ids: targetIds })
console.log(`materialized Course 01-10 slide sources: ${generated.total} (${generated.changed.length} changed)`)
console.log(`build scope: Course 01-10 only (${targetIds.length} decks)`)
console.log(`preserving Course 00 baseline (${course00Ids.length} decks); Course 00 will not be rebuilt`)

await rm(backup, { recursive: true, force: true })
await mkdir(backup, { recursive: true })
for (const id of course00Ids) {
  await cp(path.join(slides, id), path.join(backup, id), { recursive: true })
}

try {
  await rm(output, { recursive: true, force: true })
  await mkdir(slides, { recursive: true })
  for (const id of course00Ids) {
    await cp(path.join(backup, id), path.join(slides, id), { recursive: true })
  }

  // Portal and the 202 Slidev builds are independent. Run them concurrently,
  // while Slidev uses a bounded pool instead of spawning 202 builds serially.
  const portalBuild = exec('pnpm', ['build:portal'], {
    cwd: root,
    env: process.env,
    maxBuffer: 50 * 1024 * 1024,
  })
  const targetBuild = buildSlideDecks({ root, ids: targetIds, outputDir: slides })
  await Promise.all([portalBuild, targetBuild])

  await mkdir(output, { recursive: true })
  await cp(portalOutput, output, { recursive: true })

  await writeFile(
    path.join(slides, '.build-manifest.json'),
    `${JSON.stringify({ version: 2, topics: allIds }, null, 2)}\n`,
  )

  const missingAfterBuild = []
  for (const id of allIds) {
    if (!(await exists(path.join(slides, id, 'index.html')))) missingAfterBuild.push(id)
  }
  if (missingAfterBuild.length) {
    throw new Error(`Combined output is incomplete: ${missingAfterBuild.join(', ')}`)
  }

  console.log('PASS: rebuilt Course 01-10 (202 decks) in parallel and preserved Course 00 (8 cached decks).')
} finally {
  await rm(backup, { recursive: true, force: true })
}

async function exists(file) {
  try { await access(file); return true } catch { return false }
}
