import { access, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { parse, stringify } from 'yaml'
import { COURSES, STATUSES, TOPIC_ID_PATTERN, expectedRoutes, loadTopics, topicPaths, validateTopic } from './content-schema.mjs'

const scriptRoot = path.dirname(fileURLToPath(import.meta.url))
const defaultRoot = path.resolve(scriptRoot, '..')

export const HELP = `使い方:
  pnpm new:topic -- --id <id> --title "<title>" --course <course> --order <number> [options]

必須引数:
  --id       小文字英数字とハイフンのテーマID
  --title    テーマタイトル
  --course   foundation | wlsm | machine-learning | frontier
  --order    0以上の整数

任意引数:
  --summary  概要（省略時: TODO: 概要を記述）
  --status   planned | draft | review | published（省略時: planned）
  --dry-run  ファイルを書き込まず生成予定を表示
  --help     このヘルプを表示`

export function parseArgs(args) {
  if (args[0] === '--') args = args.slice(1)
  const values = { summary: 'TODO: 概要を記述', status: 'planned', dryRun: false }
  const required = new Set(['id', 'title', 'course', 'order'])
  const known = new Set(['id', 'title', 'course', 'order', 'summary', 'status'])
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index]
    if (arg === '--help') return { help: true }
    if (arg === '--dry-run') { values.dryRun = true; continue }
    if (!arg.startsWith('--') || !known.has(arg.slice(2))) throw new Error(`不明な引数です: ${arg}\n\n${HELP}`)
    const key = arg.slice(2)
    const value = args[index + 1]
    if (!value || value.startsWith('--')) throw new Error(`引数 ${arg} の値が不足しています\n\n${HELP}`)
    values[key] = value
    index += 1
  }
  const missing = [...required].filter((key) => values[key] === undefined)
  if (missing.length) throw new Error(`必須引数が不足しています: ${missing.map((key) => `--${key}`).join(', ')}\n\n${HELP}`)
  values.order = Number(values.order)
  if (typeof values.id !== 'string' || !TOPIC_ID_PATTERN.test(values.id)) throw new Error('--idは小文字英数字とハイフンのみで指定してください')
  if (typeof values.title !== 'string' || !values.title.trim()) throw new Error('--titleは空にできません')
  if (!COURSES.includes(values.course)) throw new Error(`--courseは次のいずれかで指定してください: ${COURSES.join(', ')}`)
  if (!Number.isInteger(values.order) || values.order < 0) throw new Error('--orderは0以上の整数で指定してください')
  if (!STATUSES.includes(values.status)) throw new Error(`--statusは次のいずれかで指定してください: ${STATUSES.join(', ')}`)
  return values
}

function replacements(topic) {
  return {
    TOPIC_ID: topic.id,
    TOPIC_TITLE: topic.title,
    COURSE: topic.course,
    SUMMARY: topic.summary,
    ORDER: String(topic.order),
    STATUS: topic.status,
    PREREQUISITES: topic.prerequisites.length ? topic.prerequisites.join(', ') : 'なし',
    SLIDES_MINUTES: String(topic.estimated_minutes.slides),
    TEXTBOOK_MINUTES: String(topic.estimated_minutes.textbook),
    EXERCISES_MINUTES: String(topic.estimated_minutes.exercises)
  }
}

function render(source, values) {
  return source.replace(/\{\{([A-Z_]+)\}\}/g, (_, key) => values[key] ?? `{{${key}}}`)
}

async function readTemplates(root) {
  const names = ['topic-home.md', 'textbook.md', 'exercises.md', 'slides.md', 'topic-entry.yml']
  const result = {}
  for (const name of names) result[name] = await readFile(path.join(root, 'templates', name), 'utf8')
  return result
}

export function candidateTopic(values) {
  return {
    id: values.id,
    title: values.title,
    course: values.course,
    order: values.order,
    summary: values.summary,
    status: values.status,
    prerequisites: [],
    estimated_minutes: { slides: 15, textbook: 30, exercises: 20 },
    routes: expectedRoutes(values)
  }
}

export async function planTopic(root, values) {
  const { topics, source } = await loadTopics(root)
  if (topics.some((topic) => topic.id === values.id)) throw new Error(`テーマID ${values.id} はtopics.ymlに既に存在します`)
  const topic = candidateTopic(values)
  const schema = validateTopic(topic)
  if (schema.errors.length) throw new Error(schema.errors.join('\n'))
  const paths = topicPaths(topic)
  for (const relative of Object.values(paths)) {
    try { await access(path.join(root, relative)); throw new Error(`既存ファイルを上書きしません: ${relative}`) } catch (error) { if (error.message.startsWith('既存ファイル')) throw error }
  }
  const templates = await readTemplates(root)
  const valuesForTemplate = replacements(topic)
  const generated = {
    [paths.home]: render(templates['topic-home.md'], valuesForTemplate),
    [paths.textbook]: render(templates['textbook.md'], valuesForTemplate),
    [paths.exercises]: render(templates['exercises.md'], valuesForTemplate),
    [paths.slides]: render(templates['slides.md'], valuesForTemplate)
  }
  if (Object.values(generated).some((content) => /\{\{[A-Z_]+\}\}/.test(content))) throw new Error('生成物に未置換のプレースホルダーが残っています')
  const entry = parse(render(templates['topic-entry.yml'], valuesForTemplate))
  if (!Array.isArray(entry) || entry.length !== 1) throw new Error('templates/topic-entry.yml must contain one YAML entry')
  if (JSON.stringify(entry[0]) !== JSON.stringify(topic)) throw new Error('topic-entry.ymlのテンプレートがスキーマと一致しません')
  return { topic, paths, generated, entry: entry[0], source }
}

export async function generateTopic(root, values) {
  const plan = await planTopic(root, values)
  const entrySource = `${plan.source.trimEnd()}\n${stringify([plan.entry])}`
  if (values.dryRun) return { ...plan, entrySource, wrote: false }
  const created = []
  try {
    for (const [relative, content] of Object.entries(plan.generated)) {
      const absolute = path.join(root, relative)
      await mkdir(path.dirname(absolute), { recursive: true })
      await writeFile(absolute, content, { encoding: 'utf8', flag: 'wx' })
      created.push(absolute)
    }
    await writeFile(path.join(root, 'content/topics.yml'), entrySource, 'utf8')
  } catch (error) {
    await Promise.all(created.map((file) => rm(file, { force: true })))
    await writeFile(path.join(root, 'content/topics.yml'), plan.source, 'utf8')
    throw error
  }
  return { ...plan, entrySource, wrote: true }
}

export function printPlan(plan) {
  console.log('生成予定ファイル')
  for (const relative of Object.keys(plan.generated)) console.log(`- ${relative}`)
  console.log('\n追加予定のtopics.ymlエントリ')
  console.log(stringify([plan.entry]).trimEnd())
  console.log('\n検証結果')
  console.log('- 引数、スキーマ、重複ID、既存ファイル: OK')
}

async function main() {
  const values = parseArgs(process.argv.slice(2))
  if (values.help) { console.log(HELP); return }
  const root = process.env.TOPIC_REPO_ROOT ? path.resolve(process.env.TOPIC_REPO_ROOT) : defaultRoot
  const plan = await generateTopic(root, values)
  if (values.dryRun) {
    printPlan(plan)
    console.log('\n書き込みは行っていません。')
  } else {
    console.log(`テーマ ${values.id} を生成しました。`)
    console.log('次に編集するファイル:')
    for (const relative of Object.keys(plan.generated)) console.log(`- ${relative}`)
    console.log('\n検査コマンド: pnpm lint && pnpm typecheck && pnpm test && pnpm build')
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => { console.error(`エラー: ${error.message}`); process.exitCode = 1 })
}
