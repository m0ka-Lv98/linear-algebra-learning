import assert from 'node:assert/strict'
import { access, cp, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { generateTopic, parseArgs } from './new-topic.mjs'
import { validateRepositoryContent, validateTopic, validateTopicFiles, validateTopics } from './content-schema.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const requiredTemplates = {
  'topic-home.md': ['{{TOPIC_ID}}', '{{TOPIC_TITLE}}', '{{COURSE}}', '{{SUMMARY}}'],
  'textbook.md': ['{{TOPIC_ID}}', '{{TOPIC_TITLE}}'],
  'exercises.md': ['{{TOPIC_ID}}', '{{TOPIC_TITLE}}'],
  'slides.md': ['{{TOPIC_ID}}', '{{TOPIC_TITLE}}'],
  'topic-entry.yml': ['{{TOPIC_ID}}', '{{TOPIC_TITLE}}', '{{COURSE}}', '{{SUMMARY}}', '{{ORDER}}', '{{STATUS}}']
}

async function checkTemplates() {
  const errors = []
  for (const [file, placeholders] of Object.entries(requiredTemplates)) {
    const source = await readFile(path.join(root, 'templates', file), 'utf8')
    for (const placeholder of placeholders) if (!source.includes(placeholder)) errors.push(`templates/${file} is missing ${placeholder}`)
  }
  return errors
}

async function checkRequiredFiles() {
  const files = ['README.md', 'AGENTS.md', 'content/topics.yml', 'tools/content-schema.mjs', 'tools/new-topic.mjs']
  for (const file of files) await access(path.join(root, file))
}

export async function runContentCheck() {
  await checkRequiredFiles()
  const templateErrors = await checkTemplates()
  const result = await validateRepositoryContent(root)
  const errors = [...templateErrors, ...result.errors]
  if (errors.length) throw new Error(errors.join('\n'))
  return result
}

function validTopic(overrides = {}) {
  return {
    id: 'sample-topic', title: 'サンプル', course: 'foundation', order: 10,
    summary: '概要', status: 'draft', prerequisites: [],
    estimated_minutes: { slides: 15, textbook: 30, exercises: 20 },
    routes: {
      home: '/courses/foundation/sample-topic', slides: '/slides/sample-topic/',
      textbook: '/textbook/sample-topic', exercises: '/exercises/sample-topic'
    }, ...overrides
  }
}

async function runTests() {
  const good = validateTopic(validTopic())
  assert.deepEqual(good.errors, [])
  assert.equal(validateTopics([validTopic(), validTopic({ id: 'other-topic', routes: { home: '/courses/foundation/other-topic', slides: '/slides/other-topic/', textbook: '/textbook/other-topic', exercises: '/exercises/other-topic' } })]).errors.length, 0)
  assert.ok(validateTopics([validTopic(), validTopic()]).errors.some((error) => error.includes('duplicates')))
  assert.ok(validateTopic(validTopic({ course: 'invalid' })).errors.length)
  assert.ok(validateTopic(validTopic({ status: 'invalid' })).errors.length)
  assert.ok(validateTopic(validTopic({ id: 'Invalid ID' })).errors.length)
  assert.ok(validateTopic(validTopic({ routes: { ...validTopic().routes, textbook: undefined } })).errors.length)
  assert.ok(validateTopic(validTopic({ prerequisites: ['sample-topic'] })).errors.some((error) => error.includes('itself')))
  assert.ok(validateTopics([validTopic({ prerequisites: ['not-registered'] })]).warnings.some((warning) => warning.includes('not-registered')))

  const temp = await mkdtemp(path.join(os.tmpdir(), 'linear-algebra-topic-'))
  try {
    await cp(path.join(root, 'templates'), path.join(temp, 'templates'), { recursive: true })
    await mkdir(path.join(temp, 'content'), { recursive: true })
    await writeFile(path.join(temp, 'content/topics.yml'), '[]\n')
    const before = await readFile(path.join(temp, 'content/topics.yml'), 'utf8')
    const values = { id: 'vector-basics', title: 'ベクトルの基礎', course: 'foundation', order: 20, summary: 'TODO: 概要を記述', status: 'planned', dryRun: true }
    const dryRun = await generateTopic(temp, values)
    assert.equal(dryRun.wrote, false)
    assert.equal(await readFile(path.join(temp, 'content/topics.yml'), 'utf8'), before)
    await mkdir(path.join(temp, 'apps/portal/courses/foundation'), { recursive: true })
    await writeFile(path.join(temp, 'apps/portal/courses/foundation/vector-basics.md'), 'existing')
    await assert.rejects(() => generateTopic(temp, { ...values, id: 'vector-basics', dryRun: false }), /既存ファイル|topics.yml/)
    await writeFile(path.join(temp, 'content/topics.yml'), '- id: vector-basics\n  title: 既存\n  course: foundation\n  order: 1\n  summary: 概要\n  status: planned\n  prerequisites: []\n  estimated_minutes: { slides: 1, textbook: 1, exercises: 1 }\n  routes: { home: /courses/foundation/vector-basics, slides: /slides/vector-basics/, textbook: /textbook/vector-basics, exercises: /exercises/vector-basics }\n')
    await assert.rejects(() => generateTopic(temp, values), /既に存在します/)
    assert.throws(() => parseArgs(['--id', 'only-id']), /必須引数/)
    assert.throws(() => parseArgs(['--unknown']), /不明な引数/)
    const missingErrors = await validateTopicFiles(temp, validTopic())
    assert.ok(missingErrors.some((error) => error.includes('missing')))
  } finally {
    await rm(temp, { recursive: true, force: true })
  }
  console.log('content tests passed (schema, links, templates, generator safety)')
}

if (process.argv.includes('--test')) {
  await runTests()
} else {
  const result = await runContentCheck()
  for (const warning of result.warnings) console.warn(`warning: ${warning}`)
  console.log(`content checks passed (${result.topics.length} topics, 4 artifacts each, templates validated)`)
}
