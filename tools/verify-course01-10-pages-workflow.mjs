import { readFile } from 'node:fs/promises'

const workflow = await readFile('.github/workflows/pages.yml', 'utf8')
const builder = await readFile('tools/build-courses-01-10.mjs', 'utf8')
const pool = await readFile('tools/slidev-build-pool.mjs', 'utf8')
const errors = []

for (const required of [
  'courses_01_10:',
  'COURSES_01_10:',
  'node tools/build-courses-01-10.mjs',
  'SLIDE_BUILD_CONCURRENCY:',
]) {
  if (!workflow.includes(required)) errors.push(`Pages workflow missing: ${required}`)
}

const dedicatedBranch = workflow.match(/if \[ "\$COURSES_01_10" = "true" \]; then([\s\S]*?)elif \[ "\$FULL"/m)?.[1]
if (!dedicatedBranch) {
  errors.push('Could not isolate courses_01_10 workflow branch')
} else if (/pnpm build(?:\s|$)/m.test(dedicatedBranch)) {
  errors.push('courses_01_10 branch must never invoke pnpm build/full build')
}

for (const required of [
  'Expected at least one Course 00 topic',
  'Expected at least one Course 01-10 topic',
  'Refusing to run a full-build fallback',
  "await cp(path.join(backup, id), path.join(slides, id), { recursive: true })",
  'generateCourse0110SlideDecks',
  'buildSlideDecks',
]) {
  if (!builder.includes(required)) errors.push(`Dedicated builder missing invariant: ${required}`)
}

if (!pool.includes('availableParallelism') || !pool.includes('SLIDE_BUILD_CONCURRENCY')) {
  errors.push('bounded Slidev pool does not expose CPU-aware concurrency control')
}
if (/\['pnpm', \['build:incremental'/.test(builder) || builder.includes("['build:incremental'")) {
  errors.push('Dedicated Course 01-10 builder must not delegate to build:incremental')
}

if (errors.length) {
  for (const error of errors) console.error(`ERROR ${error}`)
  process.exit(1)
}
console.log('PASS: Pages workflow exposes Course 01-10-only mode with generated decks and bounded parallel Slidev builds.')
