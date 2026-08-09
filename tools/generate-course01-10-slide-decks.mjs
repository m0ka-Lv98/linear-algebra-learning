import { execFile } from 'node:child_process'
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'
import { parse } from 'yaml'
import { loadCourse0210RefinedProfiles, renderCourse0210RefinedDeck } from './course02-10-refine/materialize-decks.mjs'

const exec = promisify(execFile)

const COURSE_LABELS = {
  '01': '微積分',
  '02': '線形代数',
  '03': '確率・統計',
  '04': '離散数学',
  '05': '数値計算',
  '06': '最適化',
  '07': 'データ解析',
  '08': '機械学習',
  '09': '深層学習',
  '10': 'Frontier',
}

const SKIP_SECTIONS = new Set([
  'この章で理解すること',
  '前提知識',
  'この章の読み方',
  '今回扱う問い',
  '今回の問い',
  '演習',
  '演習へのリンク',
  '出典と位置付け',
])

export async function generateCourse0110SlideDecks({
  root = process.cwd(),
  ids,
  check = false,
} = {}) {
  const curriculum = parse(await readFile(path.join(root, 'content/curriculum.yml'), 'utf8'))
  if (!Array.isArray(curriculum?.topics)) throw new Error('content/curriculum.yml: topics array not found')

  const byImplementationId = new Map()
  for (const topic of curriculum.topics) {
    const course = String(topic.course)
    if (course === '00') continue
    const id = topic.implementation_topic ?? topic.id
    if (!byImplementationId.has(id)) byImplementationId.set(id, { ...topic, id })
  }

  const targetIds = ids?.length ? [...new Set(ids)] : [...byImplementationId.keys()]
  const unknown = targetIds.filter((id) => !byImplementationId.has(id))
  if (unknown.length) throw new Error(`Unknown Course 01-10 implementation topic(s): ${unknown.join(', ')}`)
  if (!ids?.length && targetIds.length !== 202) {
    throw new Error(`Expected 202 Course 01-10 implementation topics, found ${targetIds.length}`)
  }

  const refinedCourse0210Profiles = await loadCourse0210RefinedProfiles(root)

  const changed = []
  const unchanged = []
  const preservedCurated = []
  const regeneratedPlaceholder = []

  for (const id of targetIds) {
    const topic = byImplementationId.get(id)
    const refinedProfile = refinedCourse0210Profiles.get(id)
    if (refinedProfile) {
      const deckPath = path.join(root, 'apps/slides/decks', `${id}.md`)
      let current = ''
      try { current = await readFile(deckPath, 'utf8') } catch {}
      const generated = renderCourse0210RefinedDeck(refinedProfile)

      preservedCurated.push(id)
      if (current === generated) {
        unchanged.push(id)
        continue
      }
      changed.push(id)
      if (!check) await writeFile(deckPath, generated)
      continue
    }
    const textbookPath = path.join(root, 'apps/portal/textbook', `${id}.md`)
    const deckPath = path.join(root, 'apps/slides/decks', `${id}.md`)
    const textbook = await readFile(textbookPath, 'utf8')

    let current = ''
    try { current = await readFile(deckPath, 'utf8') } catch {}

    // The migration may already have overwritten a curated deck in the working tree.
    // When possible, classify and recover the committed HEAD version instead of
    // trusting the current worktree copy. This makes the migration safely rerunnable
    // before commit and prevents bespoke decks from being replaced by a generic deck.
    const headSource = await readHeadDeck(root, id)
    const currentIsCourse0210Refined = /generatedBy:\s*course02-10-refined-v1/.test(current)
    const baselineRaw = currentIsCourse0210Refined ? current : (headSource ?? current)
    const baseline = decodeSerializedDeckIfNeeded(baselineRaw)

    let generated
    if (/generatedBy:\s*course02-10-refined-v1/.test(baseline)) {
      generated = normalizeCourseVisualAssetPaths(topic, baseline)
      preservedCurated.push(id)
    } else if (baseline && isCuratedDeck(baseline)) {
      generated = upgradeCuratedDeck(topic, baseline)
      preservedCurated.push(id)
    } else {
      generated = renderDeck(topic, textbook)
      regeneratedPlaceholder.push(id)
    }

    if (current === generated) {
      unchanged.push(id)
      continue
    }
    changed.push(id)
    if (!check) await writeFile(deckPath, generated)
  }

  if (check && changed.length) {
    throw new Error(`${changed.length} deck(s) are stale: ${changed.slice(0, 20).join(', ')}${changed.length > 20 ? ', ...' : ''}`)
  }

  return {
    total: targetIds.length,
    changed,
    unchanged,
    preservedCurated,
    regeneratedPlaceholder,
  }
}

export function renderDeck(topic, textbook) {
  const course = String(topic.course)
  const title = String(topic.title ?? topic.id)
  const sections = parseSections(textbook)
  const intro = findSection(sections, 'この章で理解すること')?.body.trim() || String(topic.summary ?? '')
  const questionSource = findSection(sections, '今回扱う問い', '今回の問い')?.body.trim()
  const question = cleanQuestion(questionSource, title)
  const outcomes = Array.isArray(topic.outcomes) ? topic.outcomes : []
  const prerequisites = Array.isArray(topic.prerequisites) ? topic.prerequisites : []

  const slides = []
  slides.push(`---\ntheme: default\nrouterMode: hash\ngeneratedBy: course01-10-slide-decks-v2\nlayout: cover\ntitle: ${yamlString(title)}\n---\n\n# ${title}\n\nCourse ${course}｜${COURSE_LABELS[course] ?? '発展'}\n`)
  slides.push(`---\nlayout: center\n---\n\n## 今回の問い\n\n${normalizeMath(question)}\n`)
  slides.push(`---\n\n## 到達目標\n\n${renderGoals(outcomes, title)}\n`)

  if (intro) {
    for (const [index, chunk] of splitMarkdown(intro, 560).entries()) {
      slides.push(`---\n\n## ${index === 0 ? 'まず全体像をつかむ' : '全体像（続き）'}\n\n${normalizeMath(chunk)}\n`)
    }
  }

  const formulae = extractFormulae(intro)
  const contentSections = sections.filter((section) => !SKIP_SECTIONS.has(section.title) && hasVisibleContent(section.body))
  const hasFormulaSection = contentSections.some((section) => /(?:代表式|基本式|数式|formula)/i.test(section.title))

  if (!hasFormulaSection && formulae.length) {
    slides.push(`---\n\n## 中心となる式・記号\n\n${formulae.map((item) => `- ${normalizeMath(item)}`).join('\n')}\n`)
  }

  for (const section of contentSections) {
    const cleanBody = sanitizeTextbookBody(section.body)
    if (!cleanBody) continue
    const chunks = splitMarkdown(cleanBody, 620)
    for (const [index, chunk] of chunks.entries()) {
      const heading = index === 0 ? section.title : `${section.title}（続き）`
      slides.push(`---\n\n## ${heading}\n\n${normalizeMath(chunk)}\n`)
    }
  }

  if (prerequisites.length) {
    slides.push(`---\n\n## 前提との接続\n\nこのTopicは次の内容を土台にする。式や用語が曖昧なら、先に対応するTopicへ戻る。\n\n${prerequisites.map((id) => `- \`${id}\``).join('\n')}\n`)
  }

  if (!contentSections.some((section) => /よくある誤解|注意|失敗|pitfall/i.test(section.title))) {
    slides.push(`---\n\n## 確認ポイント\n\n- ${title}の定義と具体例を混同しない。\n- 式や手順を使う前に、入力・出力・成立条件を確認する。\n- 計算結果だけでなく、単位・shape・極端な入力での挙動も検算する。\n`)
  }

  slides.push(`---\n\n## 理解確認\n\n${renderChecks(outcomes, title)}\n`)
  slides.push(`---\n\n## 演習へ\n\n[教科書](../../textbook/${topic.id})\n\n[10問の演習](../../exercises/${topic.id})\n`)

  const rendered = `${slides.join('\n')}\n`
  if (String(topic.course).padStart(2, '0') !== '01') return rendered
  return normalizeCourseVisualAssetPaths(topic, rendered)
    .replaceAll('/visuals/course-01/', './assets/course-01/')
    .replace(
      /!\[([^\]]+)\]\(\.\/assets\/course-01\/limits_approach\.gif\)/,
      '<img src="./assets/course-01/limits_approach.gif" alt="$1" style="max-height: 310px; width: auto; margin: 0.4rem auto 0.6rem;" />',
    )
}

function normalizeCourseVisualAssetPaths(topic, source) {
  const course = String(topic.course).padStart(2, '0')
  if (!/^(?:0[1-9]|10)$/.test(course)) return source
  return source.replaceAll(`/visuals/course-${course}/`, `./assets/course-${course}/`)
}

export function upgradeCuratedDeck(topic, source) {
  let out = ensureFrontmatterMetadata(source, 'course01-10-curated-upgrade-v2')
  out = normalizeCourseVisualAssetPaths(topic, out)
  const title = String(topic.title ?? topic.id)
  const outcomes = Array.isArray(topic.outcomes) ? topic.outcomes : []

  const additions = []
  if (!hasQuestionSection(out)) {
    additions.push(`---\n\n## 今回の問い\n\n${cleanQuestion('', title)}\n`)
  }
  if (!/^(?:#|##)\s+到達目標\s*$/m.test(out)) {
    additions.push(`---\n\n## 到達目標\n\n${renderGoals(outcomes, title)}\n`)
  }
  if (!/^(?:#|##)\s+理解確認\s*$/m.test(out)) {
    additions.push(`---\n\n## 理解確認\n\n${renderChecks(outcomes, title)}\n`)
  }
  if (!hasTextbookAndExerciseLinks(out, topic.id)) {
    additions.push(`---\n\n## 演習へ\n\n[教科書](../../textbook/${topic.id})\n\n[10問の演習](../../exercises/${topic.id})\n`)
  }

  if (additions.length) {
    out = `${out.trimEnd()}\n\n${additions.join('\n')}\n`
  }
  return out
}

function ensureFrontmatterMetadata(source, generatedBy) {
  const decoded = decodeSerializedDeckIfNeeded(source)
  if (!decoded.startsWith('---\n') && !decoded.startsWith('---\r\n')) {
    throw new Error('Curated Slidev deck has no YAML frontmatter')
  }
  const newline = decoded.includes('\r\n') ? '\r\n' : '\n'
  const lines = decoded.split(/\r?\n/)
  let end = -1
  for (let index = 1; index < lines.length; index += 1) {
    if (lines[index].trim() === '---') { end = index; break }
  }
  if (end === -1) throw new Error('Curated Slidev deck has unterminated YAML frontmatter')

  setFrontmatter(lines, 1, end, 'routerMode', 'hash')
  end = findFrontmatterEnd(lines)
  setFrontmatter(lines, 1, end, 'layout', 'cover')
  end = findFrontmatterEnd(lines)
  setFrontmatter(lines, 1, end, 'generatedBy', generatedBy)
  return `${lines.join(newline).trimEnd()}${newline}`
}

function setFrontmatter(lines, start, end, key, value) {
  const matcher = new RegExp(`^${escapeRegExp(key)}\\s*:`)
  const relative = lines.slice(start, end).findIndex((line) => matcher.test(line.trim()))
  if (relative >= 0) lines[start + relative] = `${key}: ${value}`
  else lines.splice(end, 0, `${key}: ${value}`)
}

function findFrontmatterEnd(lines) {
  for (let index = 1; index < lines.length; index += 1) {
    if (lines[index].trim() === '---') return index
  }
  throw new Error('Slidev frontmatter end marker not found')
}

function isCuratedDeck(source) {
  if (!source) return false
  const placeholderHeadingCount = (source.match(/^#\s+\d+\.\s+主要概念\s*$/gm) ?? []).length
  const genericCount = (source.match(/定義、直感、小さな例を一つずつ確認する。/g) ?? []).length
  if (placeholderHeadingCount >= 3 || genericCount >= 2) return false
  if (/generatedBy:\s*course01-10-slide-decks-v1/.test(source)) return false
  if (/generatedBy:\s*course01-10-slide-decks-v2/.test(source)) return false
  if (/generatedBy:\s*course01-10-curated-upgrade-v2/.test(source)) return true
  if (/generatedBy:\s*course02-10-refined-v1/.test(source)) return true

  // A deck with multiple bespoke headings/visual markup should be preserved even
  // when it is concise. Character count is deliberately not used as a quality proxy.
  const headingCount = (source.match(/^#\s+.+$/gm) ?? []).length
  const customMarkup = /<(?:div|svg|style|img|canvas)\b/i.test(source)
  return headingCount >= 4 || customMarkup
}

async function readHeadDeck(root, id) {
  try {
    const { stdout } = await exec('git', ['show', `HEAD:apps/slides/decks/${id}.md`], {
      cwd: root,
      maxBuffer: 10 * 1024 * 1024,
    })
    return stdout
  } catch {
    return null
  }
}

function decodeSerializedDeckIfNeeded(source) {
  if (!source) return ''
  const noBom = source.replace(/^\uFEFF/, '')
  if (/^---\r?\n/.test(noBom)) return noBom

  if (noBom.startsWith('---\\n') || noBom.startsWith('---\\r\\n') ||
      (noBom.startsWith('"') && /---\\(?:r\\)?n/.test(noBom.slice(1, 12)))) {
    const candidates = []
    if (noBom.startsWith('"') && noBom.endsWith('"')) candidates.push(noBom)
    candidates.push(`"${noBom}"`)
    for (const candidate of candidates) {
      try {
        const decoded = JSON.parse(candidate)
        if (typeof decoded === 'string' && /^---\r?\n/.test(decoded)) return decoded
      } catch {}
    }

    const sentinel = `__SLIDEV_BACKSLASH_${Math.random().toString(36).slice(2)}__`
    let decoded = noBom.replace(/\\\\/g, sentinel)
    decoded = decoded
      .replace(/\\r\\n/g, '\n')
      .replace(/\\n/g, '\n')
      .replace(/\\r/g, '\n')
      .replace(/\\t/g, '\t')
      .replaceAll(sentinel, '\\')
    if (/^---\r?\n/.test(decoded)) return decoded
  }
  return noBom
}

function parseSections(source) {
  const lines = source.replace(/^\uFEFF/, '').split(/\r?\n/)
  const sections = []
  let current = null
  let inFence = false
  let fenceMarker = null

  const flush = () => {
    if (!current) return
    current.body = sanitizeTextbookBody(current.lines.join('\n'))
    delete current.lines
    sections.push(current)
    current = null
  }

  for (const line of lines) {
    const fence = line.trimStart().match(/^(```+|~~~+)/)?.[1]
    if (fence) {
      const marker = fence[0]
      if (!inFence) { inFence = true; fenceMarker = marker }
      else if (marker === fenceMarker) { inFence = false; fenceMarker = null }
    }

    if (!inFence) {
      const h2 = line.match(/^##\s+(.+?)\s*$/)
      if (h2) {
        flush()
        current = { title: h2[1].trim(), level: 2, lines: [] }
        continue
      }
      const h3 = line.match(/^###\s+(.+?)\s*$/)
      if (h3) {
        flush()
        current = { title: h3[1].trim(), level: 3, lines: [] }
        continue
      }
    }
    if (current) current.lines.push(line)
  }
  flush()
  return sections
}

function sanitizeTextbookBody(source) {
  return source
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/^\s*TODO\s*:?.*$/gim, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

function hasVisibleContent(source) {
  return sanitizeTextbookBody(source).length > 0
}

function findSection(sections, ...titles) {
  return sections.find((section) => titles.includes(section.title))
}

function splitMarkdown(source, maxChars) {
  const blocks = markdownBlocks(source)
  if (!blocks.length) return []
  const chunks = []
  let current = ''

  const push = () => {
    if (current.trim()) chunks.push(current.trim())
    current = ''
  }

  for (const block of blocks) {
    if (block.length > maxChars && !block.startsWith('```') && !block.startsWith('~~~')) {
      push()
      const pieces = splitSentences(block, maxChars)
      chunks.push(...pieces)
      continue
    }
    const candidate = current ? `${current}\n\n${block}` : block
    if (current && candidate.length > maxChars) push()
    current = current ? `${current}\n\n${block}` : block
  }
  push()
  return chunks
}

function markdownBlocks(source) {
  const lines = source.split(/\r?\n/)
  const blocks = []
  let current = []
  let inFence = false
  let fenceMarker = null
  const push = () => {
    if (current.length) blocks.push(current.join('\n').trim())
    current = []
  }

  for (const line of lines) {
    const fence = line.trimStart().match(/^(```+|~~~+)/)?.[1]
    if (fence) {
      const marker = fence[0]
      if (!inFence) {
        push()
        inFence = true
        fenceMarker = marker
        current.push(line)
      } else {
        current.push(line)
        if (marker === fenceMarker) {
          inFence = false
          fenceMarker = null
          push()
        }
      }
      continue
    }
    if (inFence) { current.push(line); continue }
    if (!line.trim()) { push(); continue }
    current.push(line)
  }
  push()
  return blocks.filter(Boolean)
}

function splitSentences(text, maxChars) {
  const sentences = text.split(/(?<=。|！|？)\s*/).filter(Boolean)
  if (sentences.length <= 1) return [text]
  const chunks = []
  let current = ''
  for (const sentence of sentences) {
    const candidate = current + sentence
    if (current && candidate.length > maxChars) {
      chunks.push(current.trim())
      current = sentence
    } else current = candidate
  }
  if (current.trim()) chunks.push(current.trim())
  return chunks
}

function cleanQuestion(source, title) {
  const fallback = `「${title}」は何を表し、どの条件で使え、結果をどう検算するのか？`
  if (!source) return fallback
  const first = source.split(/\n\n/)[0].trim()
  if (!first.includes(title)) return fallback
  if (/[？?]$/.test(first)) return first
  return `${first.replace(/[。.]$/, '')}？`
}

function renderGoals(outcomes, title) {
  const items = outcomes.length ? outcomes : [
    `${title}の定義と成立条件を説明できる`,
    `${title}を小さな例で計算・実装し、結果を検算できる`,
  ]
  return items.slice(0, 4).map((item) => `- ${normalizeMath(String(item))}`).join('\n')
}

function renderChecks(outcomes, title) {
  const items = outcomes.length ? outcomes : [
    `${title}を自分の言葉で定義できるか。`,
    '代表式または手順に現れる記号・入力・出力を説明できるか。',
    '成立条件と典型的な失敗例を説明できるか。',
  ]
  const expanded = [...items]
  if (expanded.length < 3) expanded.push('代表式・計算手順・成立条件を小さな例で検算できるか。')
  return expanded.slice(0, 4).map((item, index) => `${index + 1}. ${normalizeMath(String(item))}`).join('\n')
}

function extractFormulae(text) {
  if (!text) return []
  const found = []
  for (const segment of text.split(/[、。；;]/)) {
    const trimmed = segment.trim()
    if (looksMathematical(trimmed)) found.push(trimmed)
  }
  return [...new Set(found)].slice(0, 6)
}

function looksMathematical(text) {
  return /(?:=|∈|→|≈|≤|≥|\^|\\[a-zA-Z]+|\$)/.test(text) && text.length <= 180
}

function normalizeMath(text) {
  return text.split(/(```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`]*`|\$\$[\s\S]*?\$\$|\$[^$\n]+\$)/g)
    .map((part) => {
      if (!part || /^(?:```|~~~|`|\$)/.test(part)) return part
      return wrapMathFragments(part)
    })
    .join('')
}

function wrapMathFragments(text) {
  const pattern = /([A-Za-z0-9|∇∂ΔλμσπθρΣ∑∫∞][A-Za-z0-9_{}()[\].,+\-*/^'=:|∈→←≈×≤≥∇∂ΔλμσπθρΣ∑∫∞²³−]*[=∈→←≈×≤≥^∇∂ΔλμσπθρΣ∑∫∞²³][A-Za-z0-9_{}()[\].,+\-*/^'=:|∈→←≈×≤≥∇∂ΔλμσπθρΣ∑∫∞²³−]*)/gu
  return text.replace(pattern, (raw) => `$${toLatex(raw)}$`)
}

function toLatex(raw) {
  return raw
    .replaceAll('−', '-')
    .replaceAll('²', '^2')
    .replaceAll('³', '^3')
    .replaceAll('∈', '\\in ')
    .replaceAll('→', '\\to ')
    .replaceAll('←', '\\leftarrow ')
    .replaceAll('≈', '\\approx ')
    .replaceAll('×', '\\times ')
    .replaceAll('≤', '\\le ')
    .replaceAll('≥', '\\ge ')
    .replaceAll('∇', '\\nabla ')
    .replaceAll('∂', '\\partial ')
    .replaceAll('Δ', '\\Delta ')
    .replaceAll('λ', '\\lambda ')
    .replaceAll('μ', '\\mu ')
    .replaceAll('σ', '\\sigma ')
    .replaceAll('π', '\\pi ')
    .replaceAll('θ', '\\theta ')
    .replaceAll('ρ', '\\rho ')
    .replaceAll('Σ', '\\Sigma ')
    .replaceAll('∑', '\\sum ')
    .replaceAll('∫', '\\int ')
    .replaceAll('∞', '\\infty ')
    .replace(/\bR\^\(([^)]+)\)/g, '\\mathbb{R}^{$1}')
    .replace(/\bR\^([A-Za-z0-9{}]+)/g, '\\mathbb{R}^{$1}')
}

function hasQuestionSection(source) {
  return /^(?:#|##)\s+(?:今回の問い|このテーマで考える問い|今回扱う問い)\s*$/m.test(source)
}

function hasTextbookAndExerciseLinks(source, id) {
  const textbook = source.includes(`../../textbook/${id}`) || source.includes(`/textbook/${id}`)
  const exercises = source.includes(`../../exercises/${id}`) || source.includes(`/exercises/${id}`)
  return textbook && exercises
}

function yamlString(value) {
  return JSON.stringify(String(value))
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function parseCli(argv) {
  const value = (name) => {
    const index = argv.indexOf(name)
    return index === -1 ? undefined : argv[index + 1]
  }
  const topics = value('--topics')?.split(',').map((id) => id.trim()).filter(Boolean)
  const topic = value('--topic')
  return { ids: topic ? [topic] : topics, check: argv.includes('--check') }
}

const invokedPath = process.argv[1] ? path.resolve(process.argv[1]) : null
if (invokedPath && invokedPath === fileURLToPath(import.meta.url)) {
  const options = parseCli(process.argv.slice(2))
  const result = await generateCourse0110SlideDecks(options)
  console.log(`Course 01-10 decks: ${result.total}`)
  console.log(`Preserved/upgraded curated decks: ${result.preservedCurated.length}`)
  console.log(`Regenerated placeholder decks: ${result.regeneratedPlaceholder.length}`)
  console.log(`Changed: ${result.changed.length}`)
  console.log(`Unchanged: ${result.unchanged.length}`)
}
