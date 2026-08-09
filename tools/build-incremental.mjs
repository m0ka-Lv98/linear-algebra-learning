import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { parse } from 'yaml'

const root = path.resolve(new URL('..', import.meta.url).pathname)
const args = process.argv.slice(2)

function value(name) {
  const index = args.indexOf(name)
  return index === -1 ? undefined : args[index + 1]
}

const course = value('--course')
const topic = value('--topic')

if (!course && !topic) {
  throw new Error('Specify --course <00-10> or --topic <topic-id>')
}
if (course && !/^\d{2}$/.test(course)) throw new Error('--course must be a two-digit Course ID')
if (topic && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(topic)) throw new Error('--topic must be a kebab-case Topic ID')

const curriculum = parse(await readFile(path.join(root, 'content/curriculum.yml'), 'utf8'))
const topics = parse(await readFile(path.join(root, 'content/topics.yml'), 'utf8'))
const topicEntries = Array.isArray(topics) ? topics : topics.topics
const implementationIds = new Set(topicEntries.map((item) => item.id))
const candidates = curriculum.topics.filter((item) => {
  const matchesCourse = !course || item.course === course
  const matchesTopic = !topic || item.id === topic || item.implementation_topic === topic
  return matchesCourse && matchesTopic
})

if (!candidates.length) throw new Error(`No matching Topic for ${course ? `Course ${course}` : ''}${topic ? ` Topic ${topic}` : ''}`)

const selected = candidates.map((item) => item.implementation_topic ?? item.id).filter((id) => implementationIds.has(id))
const missing = candidates.map((item) => item.implementation_topic ?? item.id).filter((id) => !implementationIds.has(id))
if (missing.length) throw new Error(`Topic content is missing for: ${missing.join(', ')}`)

const result = {
  course: course ?? null,
  topic: topic ?? null,
  topics: selected,
  slides: selected.map((id) => `slides/${id}/`),
  portal: selected.flatMap((id) => [`courses/foundation/${id}`, `textbook/${id}`, `exercises/${id}`])
}

if (args.includes('--json')) console.log(JSON.stringify(result, null, 2))
else {
  console.log(`Selected ${selected.length} Topic(s):`)
  for (const id of selected) console.log(`- ${id}`)
}
