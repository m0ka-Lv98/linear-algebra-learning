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
  } else if (!/^routerMode\s*:\s*hash\s*$/m.test(frontmatter)) {
    errors.push(`${id}: routerMode is not hash`)
  }

  const stripped = stripCode(source)
  if (/\\\(|\\\)|\\\[|\\\]/.test(stripped)) {
    errors.push(`${id}: legacy \\(...\\) or \\[...\\] math delimiter remains outside code`)
  }

  if (/\b(?:lim|sum|int|nabla|partial)\b/.test(stripped) && !/\$/.test(stripped)) {
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

console.log(`Course 00 implementations: ${course00Ids.size}`)
console.log(`Course 01-10 implementations: ${targetIds.length}`)
console.log(`Warnings: ${warnings.length}`)
for (const warning of warnings.slice(0, 20)) console.log(`WARN ${warning}`)
if (warnings.length > 20) console.log(`WARN ... ${warnings.length - 20} more`)

if (errors.length) {
  for (const error of errors) console.error(`ERROR ${error}`)
  process.exit(1)
}
console.log('PASS: Course 01-10 Slidev routing/rendering migration is complete.')

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
