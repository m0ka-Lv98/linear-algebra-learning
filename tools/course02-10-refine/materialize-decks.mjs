import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const COURSE_NAMES = {
  '02': '線形代数',
  '03': '確率統計',
  '04': '離散数学',
  '05': '数値計算',
  '06': '最適化',
  '07': 'データ解析',
  '08': '機械学習',
  '09': '深層学習',
  '10': 'Frontier',
}

const EXPECTED_COUNTS = {
  '02': 29,
  '03': 20,
  '04': 20,
  '05': 20,
  '06': 20,
  '07': 20,
  '08': 20,
  '09': 20,
  '10': 20,
}

export async function loadCourse0210RefinedProfiles(root = process.cwd()) {
  const profilePath = path.join(root, 'tools/course02-10-refine/topic_profiles.json')
  const raw = JSON.parse(await readFile(profilePath, 'utf8'))
  if (!Array.isArray(raw)) throw new Error(`${profilePath}: expected an array`)

  const byId = new Map()
  const counts = new Map(Object.keys(EXPECTED_COUNTS).map((course) => [course, 0]))
  for (const item of raw) {
    const id = item?.iid
    const course = String(item?.course ?? '').padStart(2, '0')
    if (!id || !(course in EXPECTED_COUNTS)) {
      throw new Error(`Invalid Course 02-10 profile: ${JSON.stringify({ id, course })}`)
    }
    if (byId.has(id)) throw new Error(`Duplicate Course 02-10 profile: ${id}`)
    byId.set(id, item)
    counts.set(course, counts.get(course) + 1)
  }

  const errors = []
  for (const [course, expected] of Object.entries(EXPECTED_COUNTS)) {
    const actual = counts.get(course)
    if (actual !== expected) errors.push(`Course ${course}: expected ${expected}, found ${actual}`)
  }
  if (byId.size !== 189) errors.push(`total: expected 189, found ${byId.size}`)
  if (errors.length) throw new Error(`Course 02-10 profile inventory mismatch: ${errors.join('; ')}`)
  return byId
}

export function renderCourse0210RefinedDeck(item) {
  const p = item.profile ?? {}
  const course = String(item.course).padStart(2, '0')
  const id = item.iid
  if (!COURSE_NAMES[course]) throw new Error(`${id}: unsupported course ${course}`)

  const formula = String(item.formula ?? '')
  const prereq = Array.isArray(item.prerequisites) && item.prerequisites.length
    ? item.prerequisites.join(', ')
    : 'なし'
  const conditions = bullets((p.conditions ?? []).slice(0, 3))
  const pitfalls = bullets((p.pitfalls ?? []).slice(0, 3))
  const png = `./assets/course-${course}/${id}.png`
  const gif = `./assets/course-${course}/${id}.gif`
  const animation = p.animate
    ? `<img src="${gif}" style="max-height: 310px; display:block; margin:0 auto;" />\n\n- 各frameで、何が固定され何が更新されるかを追う。`
    : '- このTopicでは静止図を中心に条件を1つずつ変える思考実験を行う。\n- 図の形がどう変わるか予測してから次へ進む。'

  const slides = [
`---
theme: default
routerMode: hash
generatedBy: course02-10-refined-v1
layout: cover
title: ${JSON.stringify(String(item.title ?? id))}
---

# ${item.title}

Course ${course}｜${COURSE_NAMES[course]}
`,
`---
layout: center
---

## 今回の問い

${p.question}
`,
`---

## 到達目標

- ${item.title}の定義と代表式を言葉で説明できる
- 図と式の対応を説明できる
- 小さな例で成立条件と失敗条件を検算できる
`,
`---

## 直感

${p.intuition}

**前提:** ${prereq}
`,
`---

## 図解

<img src="${png}" style="max-height: 330px; display:block; margin:0 auto;" />
`,
`---

## 図を見るポイント

- 軸・node・矢印・領域が何を表すか確認する
- 代表式の各項と図の要素を対応づける
- 条件を変えたとき、どこが変化するか予測する
`,
`---

## 代表式

$$
${formula}
$$

左辺の出力 → 右辺の操作 → 入力の型の順で読む。
`,
`---

## 式をどう読むか

- **対象:** ${p.concepts}
- shape・次元・定義域を先に確定する
- 計算後に符号・大きさ・残差・確率などを図と照合する
`,
`---

## 小さな例

${p.example}

最小の非自明な設定で、手計算と実装を照合する。
`,
`---

## 動き／思考実験で確認

${animation}
`,
`---

## 成立条件

${conditions}
`,
`---

## よくある誤解

${pitfalls}
`,
`---

## 数値・実装で検算

1. 小さい入力を作る
2. 定義式から期待値を手で求める
3. NumPy等の実装結果と比較する
4. shape・残差・許容誤差・seedを記録する
`,
`---

## 後続分野への接続

${item.connection ?? ''}

このTopicの量が、後続で入力・目的関数・制約・診断のどれとして使われるか確認する。
`,
`---

## 理解確認

- ${item.title}を図→式→小例の順で説明できるか
- 条件を1つ外した反例を作れるか

[教科書](../../textbook/${id})

[10問の演習](../../exercises/${id})
`,
  ]

  const source = `${slides.join('\n').trimEnd()}\n`
  assertRefinedDeck(item, source)
  return source
}

export async function materializeCourse0210RefinedDecks({ root = process.cwd(), ids, course, check = false } = {}) {
  const profiles = await loadCourse0210RefinedProfiles(root)
  let selected
  if (ids?.length) {
    const unknown = ids.filter((id) => !profiles.has(id))
    if (unknown.length) throw new Error(`Unknown Course 02-10 refined topic(s): ${unknown.join(', ')}`)
    selected = [...new Set(ids)].map((id) => profiles.get(id))
  } else if (course && course !== 'all') {
    const c = String(course).padStart(2, '0')
    if (!COURSE_NAMES[c]) throw new Error(`Unsupported Course: ${course}`)
    selected = [...profiles.values()].filter((item) => String(item.course).padStart(2, '0') === c)
  } else {
    selected = [...profiles.values()]
  }

  const changed = []
  const unchanged = []
  for (const item of selected) {
    const deckPath = path.join(root, 'apps/slides/decks', `${item.iid}.md`)
    let current = ''
    try { current = await readFile(deckPath, 'utf8') } catch {}
    const generated = renderCourse0210RefinedDeck(item)
    if (current === generated) {
      unchanged.push(item.iid)
      continue
    }
    changed.push(item.iid)
    if (!check) await writeFile(deckPath, generated)
  }

  if (check && changed.length) {
    throw new Error(`${changed.length} Course 02-10 refined deck(s) are stale: ${changed.slice(0, 20).join(', ')}${changed.length > 20 ? ', ...' : ''}`)
  }
  return { total: selected.length, changed, unchanged }
}

function bullets(items) {
  return items.map((item) => `- ${item}`).join('\n')
}

function assertRefinedDeck(item, source) {
  const course = String(item.course).padStart(2, '0')
  const id = item.iid
  if (!source.includes('generatedBy: course02-10-refined-v1')) throw new Error(`${id}: generatedBy missing`)
  const slideCount = 1 + (source.match(/^##\s+/gm) ?? []).length
  if (slideCount !== 15) throw new Error(`${id}: renderer produced ${slideCount} slides, expected 15`)
  if (!/^##\s+理解確認\s*$/m.test(source)) throw new Error(`${id}: 理解確認 missing`)
  if (source.includes('/visuals/course-')) throw new Error(`${id}: portal visual path leaked into Slidev source`)
  if (!source.includes(`./assets/course-${course}/${id}.png`)) throw new Error(`${id}: Slidev PNG reference missing`)
  if (item.profile?.animate && !source.includes(`./assets/course-${course}/${id}.gif`)) {
    throw new Error(`${id}: Slidev GIF reference missing`)
  }
}

async function cli() {
  const root = process.cwd()
  const args = process.argv.slice(2)
  const value = (name) => {
    const i = args.indexOf(name)
    return i >= 0 ? args[i + 1] : undefined
  }
  const course = value('--course') ?? 'all'
  const topics = value('--topics')?.split(',').map((id) => id.trim()).filter(Boolean)
  const check = args.includes('--check')
  const result = await materializeCourse0210RefinedDecks({ root, ids: topics, course, check })
  console.log(`Course 02-10 refined decks: ${result.total}`)
  console.log(`changed: ${result.changed.length}`)
  console.log(`unchanged: ${result.unchanged.length}`)
  console.log(check ? 'PASS: Course 02-10 refined decks match canonical renderer.' : 'PASS: Course 02-10 refined decks materialized from canonical renderer.')
}

const invokedPath = process.argv[1] ? pathToFileURL(path.resolve(process.argv[1])).href : null
if (invokedPath === import.meta.url) await cli()
