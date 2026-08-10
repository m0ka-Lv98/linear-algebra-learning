import { readFile, readdir, stat } from 'node:fs/promises'
import path from 'node:path'
import { parse } from 'yaml'

const root = process.cwd()
const topics = parse(await readFile(path.join(root, 'content/topics.yml'), 'utf8'))
const errors = []
const warnings = []

const banned = [
  '軸・node・矢印・領域が何を表すか確認する',
  '最小の非自明な設定で、手計算と実装を照合する',
  'このTopicでは静止図を中心に条件を1つずつ変える思考実験を行う',
]

function normalizeParagraph(s) {
  return s.replace(/`[^`]+`/g, '`CODE`').replace(/\$[^$]+\$/g, '$MATH$').replace(/\s+/g, ' ').trim()
}
function paragraphs(text) {
  return text.split(/\n\s*\n/).map(normalizeParagraph).filter((p) => p.length >= 80 && !p.startsWith('#'))
}
function duplicateRatio(ps) {
  if (!ps.length) return 0
  const counts = new Map()
  for (const p of ps) counts.set(p, (counts.get(p) ?? 0) + 1)
  const duplicated = [...counts.values()].reduce((s, n) => s + Math.max(0, n - 1), 0)
  return duplicated / ps.length
}

for (const topic of topics) {
  const id = topic.id
  const textbookPath = path.join(root, 'apps/portal/textbook', `${id}.md`)
  const slidePath = path.join(root, 'apps/slides/decks', `${id}.md`)
  const exPath = path.join(root, 'apps/portal/exercises', `${id}.md`)
  let textbook = '', slides = '', exercises = ''
  try { textbook = await readFile(textbookPath, 'utf8') } catch { continue }
  try { slides = await readFile(slidePath, 'utf8') } catch {}
  try { exercises = await readFile(exPath, 'utf8') } catch {}

  for (const phrase of banned) if (slides.includes(phrase)) errors.push(`${id}: generic regressed slide phrase: ${phrase}`)
  const ratio = duplicateRatio(paragraphs(textbook))
  if (ratio > 0.12) warnings.push(`${id}: textbook repeated-paragraph ratio ${(ratio * 100).toFixed(1)}%`)

  const problemBodies = [...exercises.matchAll(/^##\s+問題\d+\s*\n+([\s\S]*?)(?=\n<details>|\n##\s+問題|$)/gm)]
    .map((m) => normalizeParagraph(m[1]))
  if (problemBodies.length && new Set(problemBodies).size !== problemBodies.length) errors.push(`${id}: duplicated exercise problem bodies`)

  const imgRefs = [...textbook.matchAll(/(?:src=|!\[[^\]]*\]\()\"?([^\"\)]+\.(?:png|gif|webp))/gi)].map((m) => m[1])
  if (!imgRefs.length && !/^prep-(?:python|definitions)/.test(id)) warnings.push(`${id}: no textbook visual reference`)
}

if (warnings.length) console.warn(warnings.join('\n'))
if (errors.length) {
  console.error(errors.join('\n'))
  process.exit(1)
}
console.log(`learning-quality audit passed; warnings=${warnings.length}`)
