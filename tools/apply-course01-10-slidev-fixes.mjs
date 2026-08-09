import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { parse } from 'yaml'

const root = process.cwd()
const curriculumPath = path.join(root, 'content/curriculum.yml')
const curriculum = parse(await readFile(curriculumPath, 'utf8'))

if (!Array.isArray(curriculum?.topics)) {
  throw new Error('content/curriculum.yml: topics array not found')
}

const targetTopics = curriculum.topics.filter((item) => String(item.course) !== '00')
const targetIds = [...new Set(targetTopics.map((item) => item.implementation_topic ?? item.id))]

if (targetIds.length !== 202) {
  throw new Error(`Expected 202 Course 01-10 implementation topics, found ${targetIds.length}. Refusing to apply a partial migration.`)
}

let changedDecks = 0
let normalizedMathFiles = 0
let decodedSerializedDecks = 0
const missing = []

for (const id of targetIds) {
  const file = path.join(root, 'apps/slides/decks', `${id}.md`)
  let source
  try {
    source = await readFile(file, 'utf8')
  } catch {
    missing.push(id)
    continue
  }

  const decoded = decodeSerializedDeckIfNeeded(source, id)
  if (decoded.changed) decodedSerializedDecks += 1

  let updated = ensureHashRouter(decoded.source, id)
  const beforeMath = updated
  updated = normalizeLegacyMathDelimiters(updated)
  if (updated !== beforeMath) normalizedMathFiles += 1

  if (updated !== source) {
    await writeFile(file, updated)
    changedDecks += 1
  }
}

if (missing.length) {
  throw new Error(`Missing Slidev deck(s): ${missing.join(', ')}`)
}

const stylePath = path.join(root, 'apps/slides/decks/style.css')
let style = ''
try { style = await readFile(stylePath, 'utf8') } catch {}
const styleUpdated = ensureSharedStyle(style)
if (styleUpdated !== style) await writeFile(stylePath, styleUpdated)

console.log(`Course 01-10 topics: ${targetIds.length}`)
console.log(`Deck files changed: ${changedDecks}`)
console.log(`Serialized deck files decoded: ${decodedSerializedDecks}`)
console.log(`Deck files with legacy math delimiters normalized: ${normalizedMathFiles}`)
console.log(`Shared Slidev style: ${styleUpdated === style ? 'already current' : 'updated'}`)
console.log('Run: node tools/verify-course01-10-slidev-fixes.mjs')


function decodeSerializedDeckIfNeeded(source, id) {
  const noBom = source.replace(/^\uFEFF/, '')
  if (/^---\r?\n/.test(noBom)) return { source: noBom, changed: noBom !== source }

  // Some legacy generated decks were written as a JSON-escaped string body,
  // so their line breaks exist as the two literal characters "\\n". Decode
  // that serialization before parsing Slidev frontmatter. JSON decoding is used
  // deliberately so escaped LaTeX backslashes (for example \\nabla) survive.
  if (noBom.startsWith('---\\n') || noBom.startsWith('---\\r\\n') ||
      (noBom.startsWith('"') && /---\\(?:r\\)?n/.test(noBom.slice(1, 12)))) {
    const candidates = []
    if (noBom.startsWith('"') && noBom.endsWith('"')) candidates.push(noBom)
    candidates.push(`"${noBom}"`)

    for (const candidate of candidates) {
      try {
        const decoded = JSON.parse(candidate)
        if (typeof decoded === 'string' && /^---\r?\n/.test(decoded)) {
          return { source: decoded, changed: true }
        }
      } catch {}
    }

    // Conservative fallback for JSON-string-body files that contain an
    // unescaped quote. Protect doubled backslashes first; those represent
    // original literal backslashes in the serialized Markdown.
    const sentinel = `__SLIDEV_BACKSLASH_${Math.random().toString(36).slice(2)}__`
    if (!noBom.includes(sentinel)) {
      let decoded = noBom.replace(/\\\\/g, sentinel)
      decoded = decoded
        .replace(/\\r\\n/g, '\n')
        .replace(/\\n/g, '\n')
        .replace(/\\r/g, '\n')
        .replace(/\\t/g, '\t')
        .replaceAll(sentinel, '\\')
      if (/^---\r?\n/.test(decoded)) return { source: decoded, changed: true }
    }
  }

  throw new Error(`${id}: Slidev deck has neither normal nor decodable serialized YAML frontmatter`)
}

function ensureHashRouter(source, id) {
  if (!source.startsWith('---\n') && !source.startsWith('---\r\n')) {
    throw new Error(`${id}: Slidev deck has no YAML frontmatter`)
  }

  const newline = source.includes('\r\n') ? '\r\n' : '\n'
  const lines = source.split(/\r?\n/)
  let end = -1
  for (let i = 1; i < lines.length; i += 1) {
    if (lines[i].trim() === '---') { end = i; break }
  }
  if (end === -1) throw new Error(`${id}: unterminated YAML frontmatter`)

  const routerIndex = lines.slice(1, end).findIndex((line) => /^routerMode\s*:/.test(line.trim()))
  if (routerIndex >= 0) {
    lines[routerIndex + 1] = 'routerMode: hash'
  } else {
    const themeIndex = lines.slice(1, end).findIndex((line) => /^theme\s*:/.test(line.trim()))
    const insertAt = themeIndex >= 0 ? themeIndex + 2 : 1
    lines.splice(insertAt, 0, 'routerMode: hash')
  }

  return lines.join(newline)
}

function normalizeLegacyMathDelimiters(source) {
  const lines = source.split(/(?<=\n)/)
  let inFence = false
  let fenceMarker = null

  return lines.map((line) => {
    const trimmed = line.trimStart()
    const fence = trimmed.match(/^(```+|~~~+)/)?.[1]
    if (fence) {
      const marker = fence[0]
      if (!inFence) {
        inFence = true
        fenceMarker = marker
      } else if (marker === fenceMarker) {
        inFence = false
        fenceMarker = null
      }
      return line
    }
    if (inFence) return line
    return replaceOutsideInlineCode(line)
  }).join('')
}

function replaceOutsideInlineCode(line) {
  const parts = line.split(/(`+[^`]*`+)/g)
  for (let i = 0; i < parts.length; i += 1) {
    if (/^`/.test(parts[i])) continue
    parts[i] = parts[i]
      .replace(/\\\[/g, () => '$$')
      .replace(/\\\]/g, () => '$$')
      .replace(/\\\(/g, () => '$')
      .replace(/\\\)/g, () => '$')
  }
  return parts.join('')
}

function ensureSharedStyle(style) {
  let out = style.trimEnd()
  const overviewSelector = 'button.slidev-icon-btn[title="Show slide overview"]'
  const panelSelector = '.autocomplete-list'

  if (!out.includes(overviewSelector)) {
    out += `${out ? '\n\n' : ''}/* Hide Slidev's slide-overview button in the navigation controls. */\n${overviewSelector} {\n  display: none !important;\n}`
  }
  if (!out.includes(panelSelector)) {
    out += `${out ? '\n\n' : ''}/* Hide the right-side Slidev overview/autocomplete panel. */\n${panelSelector} {\n  display: none !important;\n}`
  }
  return `${out}\n`
}
