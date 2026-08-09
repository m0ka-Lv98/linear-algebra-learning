import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { parse } from 'yaml'

const root = process.cwd()
const curriculum = parse(await readFile(path.join(root, 'content/curriculum.yml'), 'utf8'))
if (!Array.isArray(curriculum?.topics)) throw new Error('curriculum topics array missing')

const course00Ids = new Set(curriculum.topics
  .filter((item) => String(item.course) === '00')
  .map((item) => item.implementation_topic ?? item.id))
const targetIds = [...new Set(curriculum.topics
  .filter((item) => String(item.course) !== '00')
  .map((item) => item.implementation_topic ?? item.id))]

const errors = []
const warnings = []
let curated = 0
let generated = 0
if (course00Ids.size !== 8) errors.push(`expected 8 Course 00 topics, found ${course00Ids.size}`)
if (targetIds.length !== 202) errors.push(`expected 202 Course 01-10 topics, found ${targetIds.length}`)

for (const id of targetIds) {
  const file = path.join(root, 'apps/slides/decks', `${id}.md`)
  let source
  try { source = await readFile(file, 'utf8') }
  catch { errors.push(`${id}: deck missing`); continue }

  const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1]
  if (!frontmatter) {
    errors.push(`${id}: YAML frontmatter missing`)
  } else {
    if (!/^routerMode\s*:\s*hash\s*$/m.test(frontmatter)) errors.push(`${id}: routerMode is not hash`)
    if (!/^layout\s*:\s*cover\s*$/m.test(frontmatter)) errors.push(`${id}: first slide is not cover layout`)
    const marker = frontmatter.match(/^generatedBy\s*:\s*(\S+)\s*$/m)?.[1]
    if (marker === 'course01-10-slide-decks-v2') generated += 1
    else if (marker === 'course01-10-curated-upgrade-v2' || marker === 'course02-10-refined-v1') curated += 1
    else errors.push(`${id}: v2 generatedBy marker missing`)
  }

  if (!hasQuestionSection(source)) errors.push(`${id}: question section missing`)
  for (const required of ['到達目標', '理解確認']) {
    if (!new RegExp(`^(?:#|##)\\s+${required}\\s*$`, 'm').test(source)) {
      errors.push(`${id}: required Course 00-style section missing: ${required}`)
    }
  }
  if (!hasTextbookAndExerciseLinks(source, id)) {
    errors.push(`${id}: textbook/exercise links missing`)
  }

  if (/\/visuals\/course-(?:0[1-9]|10)\//.test(source)) {
    errors.push(`${id}: portal /visuals/course-XX path leaked into Slidev source`)
  }

  // Do not use a raw character threshold as a quality proxy: Japanese text is
  // multi-byte on disk and concise curated decks can be perfectly valid. Also
  // avoid counting raw `---` markers because Slidev uses them both as slide
  // separators and per-slide frontmatter delimiters. Count visible headings instead.
  const headingCount = (source.match(/^(?:#|##)\s+\S.*$/gm) ?? []).length
  if (headingCount < 7) {
    errors.push(`${id}: too few content headings (${headingCount}); expected at least 7`)
  }
  if (/<!--[\s\S]*?TODO[\s\S]*?-->/i.test(source)) {
    warnings.push(`${id}: TODO-only HTML comment remains in curated source`)
  }

  if (/^#\s+\d+\.\s+主要概念\s*$/m.test(source) || source.includes('定義、直感、小さな例を一つずつ確認する。')) {
    errors.push(`${id}: legacy numbered placeholder content remains`)
  }

  const stripped = stripCode(source)
  if (/\\\(|\\\)|\\\[|\\\]/.test(stripped)) {
    errors.push(`${id}: legacy \\(...\\) or \\[...\\] math delimiter remains outside code`)
  }
  if (/(?:=|∈|→|≈|≤|≥|\^|\\(?:frac|sum|int|nabla|partial))/.test(stripped) && !/\$/.test(stripped)) {
    warnings.push(`${id}: math-like text found but no $ delimiter; inspect content quality manually`)
  }
}

const style = await readFile(path.join(root, 'apps/slides/decks/style.css'), 'utf8')
if (!style.includes('button.slidev-icon-btn[title="Show slide overview"]')) {
  errors.push('shared style: overview button selector missing')
}
if (!style.includes('.autocomplete-list')) {
  errors.push('shared style: .autocomplete-list selector missing')
}

const portalConfig = await readFile(path.join(root, 'apps/portal/.vitepress/config.mts'), 'utf8')
if (!portalConfig.includes("href?.startsWith('/slides/')") || !portalConfig.includes('basePrefix')) {
  errors.push('VitePress Slidev link base-path rewrite is missing')
}

const incremental = await readFile(path.join(root, 'tools/build-incremental.mjs'), 'utf8')
if (!incremental.includes('sharedDeckChanges')) {
  errors.push('incremental build does not invalidate all slides for shared deck assets such as style.css')
}
if (!incremental.includes('DIFF_BASE')) {
  errors.push('incremental build does not support a multi-commit push diff base')
}
if (!incremental.includes('buildSlideDecks')) {
  errors.push('incremental build does not use the bounded Slidev build pool')
}

console.log(`Course 00 implementations: ${course00Ids.size}`)
console.log(`Course 01-10 implementations: ${targetIds.length}`)
console.log(`Curated decks preserved/upgraded: ${curated}`)
console.log(`Placeholder decks regenerated: ${generated}`)
console.log(`Warnings: ${warnings.length}`)
for (const warning of warnings.slice(0, 20)) console.log(`WARN ${warning}`)
if (warnings.length > 20) console.log(`WARN ... ${warnings.length - 20} more`)

if (errors.length) {
  for (const error of errors) console.error(`ERROR ${error}`)
  process.exit(1)
}
console.log('PASS: Course 01-10 decks preserve curated content, remove placeholders, and satisfy Slidev routing/rendering rules.')

function hasQuestionSection(source) {
  return /^(?:#|##)\s+(?:今回の問い|このテーマで考える問い|今回扱う問い)\s*$/m.test(source)
}

function hasTextbookAndExerciseLinks(source, id) {
  const textbook = source.includes(`../../textbook/${id}`) || source.includes(`/textbook/${id}`)
  const exercises = source.includes(`../../exercises/${id}`) || source.includes(`/exercises/${id}`)
  return textbook && exercises
}

function stripCode(source) {
  const lines = source.split(/\r?\n/)
  const out = []
  let inFence = false
  let fenceMarker = null
  for (const line of lines) {
    const fence = line.trimStart().match(/^(```+|~~~+)/)?.[1]
    if (fence) {
      const marker = fence[0]
      if (!inFence) { inFence = true; fenceMarker = marker }
      else if (marker === fenceMarker) { inFence = false; fenceMarker = null }
      continue
    }
    if (inFence) continue
    out.push(line.replace(/`+[^`]*`+/g, ''))
  }
  return out.join('\n')
}
