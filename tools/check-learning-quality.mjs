import { readFile, readdir, access } from 'node:fs/promises'
import path from 'node:path'
import { parse } from 'yaml'

const root = process.cwd()
const errors = []
const warnings = []

let manifest = { new_topics: [], restored_existing_topics: [] }
try {
  manifest = JSON.parse(await readFile(path.join(root, 'AUDIT_CORRECTIONS_V2.json'), 'utf8'))
} catch {}
const newIds = new Set(manifest.new_topics ?? [])
const restoredIds = new Set(manifest.restored_existing_topics ?? [])
const auditIds = new Set([...newIds, ...restoredIds])
const restoredExerciseIds = new Set([
  'la-singular-value-decomposition',
  'stat-confidence-intervals',
  'opt-inequality-constraints-kkt',
  'mat-pca-geometry',
  'mat-wls-inverse-variance',
  'ml-logistic-regression',
  'dl-activation-loss-functions',
  'dl-attention-mechanism',
  'frontier-rlhf-preference-optimization',
])
const exerciseAuditIds = new Set([...newIds, ...restoredExerciseIds])

const bannedPatterns = [
  /図を先に見て、式の記号がどの軸/i,
  /図を見るポイント/,
  /軸・(?:node|点)・矢印・領域.*対応/,
  /代表式の各項と図の要素を対応/,
  /条件を変えたとき、どこが変化するか予測/,
  /最小の非自明/,
  /このTopicでは静止図/,
  /各段階で適用条件を確認し、最後に検算/,
  /定義または成立条件のどこが壊れるかを明示/,
  /実装前に数学的条件をチェックリスト/,
  /採点者が式の根拠/,
]
const placeholderPatterns = [
  /TODO/i,
  /TBD/i,
  /各段階で適用条件を確認し/,
  /定義または成立条件のどこが壊れるかを明示/,
  /実装前に数学的条件をチェックリスト/,
]

function normalize(text) {
  return text
    .replace(/<[^>]+>/g, ' ')
    .replace(/https?:\/\/\S+/g, ' URL ')
    .replace(/`[^`]+`/g, ' CODE ')
    .replace(/\$\$[\s\S]*?\$\$/g, ' MATH ')
    .replace(/\$[^$]+\$/g, ' MATH ')
    .replace(/\s+/g, ' ')
    .trim()
}
function paragraphs(text) {
  return text.split(/\n\s*\n/).map(normalize).filter((p) => p.length >= 90 && !p.startsWith('#'))
}
function bigrams(text) {
  const compact = text.replace(/\s+/g, '')
  const set = new Set()
  for (let i = 0; i < compact.length - 1; i += 1) set.add(compact.slice(i, i + 2))
  return set
}
function jaccard(a, b) {
  if (!a.size || !b.size) return 0
  let intersection = 0
  for (const item of a) if (b.has(item)) intersection += 1
  return intersection / (a.size + b.size - intersection)
}
function parseExercises(text) {
  const rows = []
  const re = /^##\s+問題\d+[^\n]*\n+([\s\S]*?)\n+<details><summary>完全解答<\/summary>\s*\n+([\s\S]*?)\n+<\/details>/gm
  for (const match of text.matchAll(re)) rows.push({ question: match[1].trim(), answer: match[2].trim() })
  return rows
}
function checkMathDelimiters(text, label) {
  let inDisplay = false
  for (const [index, line] of text.split(/\r?\n/).entries()) {
    const stripped = line.trim()
    if (stripped === '$$') {
      inDisplay = !inDisplay
      continue
    }
    if (!inDisplay) {
      const withoutDisplayPairs = line.replaceAll('$$', '')
      if ((withoutDisplayPairs.match(/\$/g) ?? []).length % 2 !== 0) {
        errors.push(`${label}:${index + 1}: unmatched inline $ delimiter`)
      }
    }
  }
  if (inDisplay) errors.push(`${label}: unclosed $$ display math`)
}
async function markdownFiles(dir) {
  try { return (await readdir(dir)).filter((name) => name.endsWith('.md')) } catch { return [] }
}
async function exists(relative) {
  try { await access(path.join(root, relative)); return true } catch { return false }
}

const textbookDir = path.join(root, 'apps/portal/textbook')
const exerciseDir = path.join(root, 'apps/portal/exercises')
const slideDir = path.join(root, 'apps/slides/decks')

// Textbooks: ban generic prose, require topic-specific figures/derivations, and detect repeated paragraphs.
const paragraphOwners = new Map()
for (const id of auditIds) {
  const file = path.join(textbookDir, `${id}.md`)
  let text
  try { text = await readFile(file, 'utf8') } catch { errors.push(`${id}: missing textbook`); continue }
  checkMathDelimiters(text, `textbook/${id}`)
  for (const pattern of bannedPatterns) if (pattern.test(text)) errors.push(`${id}: banned/generic textbook phrase ${pattern}`)
  for (const paragraph of paragraphs(text)) {
    const owners = paragraphOwners.get(paragraph) ?? new Set()
    owners.add(id)
    paragraphOwners.set(paragraph, owners)
  }
  if (newIds.has(id)) {
    const required = [
      '## 図の各要素は何を表しているか',
      '## 中心式を前提から導く',
      '## 例題1：具体的な数値・構造で解く',
      '## 例題2：別の条件で確認する',
      '## 結果の検算',
      '## 条件を外すと何が壊れるか',
    ]
    for (const heading of required) if (!text.includes(heading)) errors.push(`${id}: missing required section ${heading}`)
    const visual = text.match(/<img\s+src="(\/visuals\/[^\"]+\.(?:png|gif|webp))"/i)?.[1]
    if (!visual) errors.push(`${id}: textbook has no topic visual reference`)
    else if (!(await exists(`apps/portal/public${visual}`))) errors.push(`${id}: referenced visual does not exist: ${visual}`)
  }
}
for (const [paragraph, owners] of paragraphOwners) {
  if (owners.size >= 3) errors.push(`cross-topic repeated textbook paragraph in ${[...owners].slice(0, 8).join(', ')}: ${paragraph.slice(0, 120)}...`)
}

// Regression sentinels for restored high-value pages. These are intentionally semantic markers, not length checks.
const sentinels = new Map([
  ['la-singular-value-decomposition', ['もう一段丁寧に：SVDを', '\\mathbf u_i=\\frac{\\mathbf A\\mathbf v_i}{\\sigma_i}', 'reduced SVDのshape']],
  ['stat-confidence-intervals', ['ランダムなのは区間端点', '標準化統計量を作る']],
  ['opt-inequality-constraints-kkt', ['complementary slacknessはactive constraintだけがforceを持つ', 'stationarity']],
  ['mat-pca-geometry', ['project variance', 'Lagrange condition']],
  ['mat-wls-inverse-variance', ['なぜinverse varianceか', 'weighted normal equation']],
  ['ml-logistic-regression', ['log-oddsからprobability', 'binary cross entropy']],
  ['dl-activation-loss-functions', ['binary CE from likelihood', 'p-y']],
  ['dl-attention-mechanism', ['なぜ1/√d_k', 'weighted sum']],
  ['frontier-rlhf-preference-optimization', ['KL正則化policy objectiveから最適policyを導く', 'policy–reward relation', 'DPO']],
])
for (const [id, markers] of sentinels) {
  if (!auditIds.has(id)) continue
  const text = await readFile(path.join(textbookDir, `${id}.md`), 'utf8')
  for (const marker of markers) if (!text.includes(marker)) errors.push(`${id}: regression sentinel missing: ${marker}`)
}

// Slides: generic/meta slides must not reappear; math delimiters must be valid.
for (const id of auditIds) {
  const file = path.join(slideDir, `${id}.md`)
  let text
  try { text = await readFile(file, 'utf8') } catch { errors.push(`${id}: missing slide deck`); continue }
  checkMathDelimiters(text, `slides/${id}`)
  for (const pattern of bannedPatterns) if (pattern.test(text)) errors.push(`${id}: banned/generic slide phrase ${pattern}`)
}

// Audited exercises: 10 per topic, actual answers, and no cross-topic templating.
const exerciseRows = []
for (const id of exerciseAuditIds) {
  const file = path.join(exerciseDir, `${id}.md`)
  let text
  try { text = await readFile(file, 'utf8') } catch { errors.push(`${id}: missing exercises`); continue }
  checkMathDelimiters(text, `exercises/${id}`)
  for (const pattern of bannedPatterns) if (pattern.test(text)) errors.push(`${id}: banned/generic exercise phrase ${pattern}`)
  const blocks = parseExercises(text)
  if (blocks.length !== 10) errors.push(`${id}: expected 10 exercises, found ${blocks.length}`)
  blocks.forEach((block, index) => {
    if (block.answer.trim().length < 20) errors.push(`${id}#${index + 1}: answer is too short to be a complete solution`)
    for (const pattern of placeholderPatterns) if (pattern.test(block.answer)) errors.push(`${id}#${index + 1}: placeholder/generic answer ${pattern}`)
    const question = normalize(block.question)
    const answer = normalize(block.answer)
    if (question === answer) errors.push(`${id}#${index + 1}: answer merely repeats the question`)
    exerciseRows.push({ id, index: index + 1, question, answer, qgrams: bigrams(question), agrams: bigrams(answer) })
  })
}
for (const field of ['question', 'answer']) {
  const groups = new Map()
  for (const row of exerciseRows) {
    if (row[field].length < 50) continue
    const list = groups.get(row[field]) ?? []
    list.push(row)
    groups.set(row[field], list)
  }
  for (const [text, rows] of groups) {
    const topics = new Set(rows.map((row) => row.id))
    if (topics.size >= 2) errors.push(`exact cross-topic duplicate ${field}: ${rows.slice(0, 8).map((r) => `${r.id}#${r.index}`).join(', ')}: ${text.slice(0, 120)}...`)
  }
}
for (let i = 0; i < exerciseRows.length; i += 1) {
  for (let j = i + 1; j < exerciseRows.length; j += 1) {
    const a = exerciseRows[i]
    const b = exerciseRows[j]
    if (a.id === b.id) continue
    if (a.question.length > 120 && b.question.length > 120 && jaccard(a.qgrams, b.qgrams) > 0.93) {
      errors.push(`near-duplicate exercise questions: ${a.id}#${a.index} vs ${b.id}#${b.index}`)
    }
    if (a.answer.length > 180 && b.answer.length > 180 && jaccard(a.agrams, b.agrams) > 0.96) {
      errors.push(`near-duplicate exercise answers: ${a.id}#${a.index} vs ${b.id}#${b.index}`)
    }
  }
}

// Curriculum: a same-course prerequisite must be earlier in the actual unit/topic order.
try {
  const curriculum = parse(await readFile(path.join(root, 'content/curriculum.yml'), 'utf8'))
  const units = new Map(curriculum.units.map((unit) => [unit.id, unit]))
  const byId = new Map(curriculum.topics.map((topic) => [topic.id, topic]))
  const position = (topic) => ((units.get(topic.unit)?.order ?? 1e6) * 100000 + (topic.order ?? 1e6))
  for (const topic of curriculum.topics) {
    for (const prerequisiteId of topic.prerequisites ?? []) {
      const prerequisite = byId.get(prerequisiteId)
      if (prerequisite?.course === topic.course && position(prerequisite) >= position(topic)) {
        errors.push(`${topic.id}: prerequisite ${prerequisiteId} is not earlier in Course ${topic.course}`)
      }
    }
  }
  for (const id of ['ml-mdp-bellman-equations', 'ml-dynamic-programming-value-policy-iteration', 'ml-monte-carlo-td-q-learning', 'ml-policy-gradient-reinforce']) {
    if (byId.get(id)?.unit !== 'ml-reinforcement-learning') errors.push(`${id}: must be in ml-reinforcement-learning`)
  }
  if (byId.get('dl-deep-reinforcement-learning')?.unit !== 'dl-reinforcement-learning') errors.push('dl-deep-reinforcement-learning: must be in dl-reinforcement-learning')
  const chain = [
    'frontier-supervised-finetuning-instruction-tuning',
    'frontier-parameter-efficient-finetuning',
    'frontier-rlhf-reward-model-ppo-kl',
    'frontier-rlhf-preference-optimization',
    'frontier-reasoning-rl-rlvr',
  ]
  for (let i = 1; i < chain.length; i += 1) {
    if (!(position(byId.get(chain[i - 1])) < position(byId.get(chain[i])))) errors.push(`Course 10 order must satisfy ${chain[i - 1]} -> ${chain[i]}`)
  }
} catch (error) {
  errors.push(`curriculum ordering audit failed: ${error.message}`)
}

if (warnings.length) console.warn(warnings.join('\n'))
if (errors.length) {
  console.error(errors.join('\n'))
  process.exit(1)
}
console.log(`learning-quality audit v4 passed; audited topics=${auditIds.size}; audited exercise rows=${exerciseRows.length}`)
