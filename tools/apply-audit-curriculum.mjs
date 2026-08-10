import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { parse, stringify } from 'yaml'

const root = process.cwd()
const additions = parse(await readFile(path.join(root, 'content/audit-additions.yml'), 'utf8'))
const topicsPath = path.join(root, 'content/topics.yml')
const curriculumPath = path.join(root, 'content/curriculum.yml')
const topics = parse(await readFile(topicsPath, 'utf8'))
const curriculum = parse(await readFile(curriculumPath, 'utf8'))

function insertAfter(array, item, afterId, idOf = (x) => x.id) {
  if (array.some((x) => idOf(x) === item.id)) return false
  const index = array.findIndex((x) => idOf(x) === afterId)
  if (index < 0) throw new Error(`insert_after target not found: ${afterId} for ${item.id}`)
  array.splice(index + 1, 0, item)
  return true
}

for (const a of additions) {
  const implementation = {
    id: a.id,
    title: a.title,
    course: a.implementation_course ?? 'foundation',
    order: 0,
    summary: a.summary,
    status: 'draft',
    prerequisites: a.prerequisites ?? [],
    estimated_minutes: a.estimated_minutes,
    routes: {
      home: `/courses/${a.implementation_course ?? 'foundation'}/${a.id}`,
      slides: `/slides/${a.id}/`,
      textbook: `/textbook/${a.id}`,
      exercises: `/exercises/${a.id}`,
    },
  }
  insertAfter(topics, implementation, a.insert_after)

  const curriculumTopic = {
    id: a.id,
    course: String(a.course_id).padStart(2, '0'),
    unit: null,
    order: 0,
    title: a.title,
    summary: a.summary,
    status: 'draft',
    kind: 'required',
    prerequisites: a.prerequisites ?? [],
    outcomes: a.outcomes ?? [],
    implementation_topic: a.id,
  }
  const after = curriculum.topics.find((x) => (x.implementation_topic ?? x.id) === a.insert_after)
  if (!after) throw new Error(`curriculum insert_after target not found: ${a.insert_after}`)
  curriculumTopic.unit = after.unit
  insertAfter(curriculum.topics, curriculumTopic, a.insert_after, (x) => x.implementation_topic ?? x.id)
}

// Re-number implementation topics within their broad order band while preserving list order.
const bandCounters = new Map()
for (const t of topics) {
  const prefix = t.id.split('-')[0]
  const band = ({prep:0,calc:100,la:200,prob:300,stat:300,dm:400,num:500,opt:600,mat:700,ml:800,dl:900,frontier:1000})[prefix] ?? 2000
  const n = (bandCounters.get(band) ?? 0) + 1
  bandCounters.set(band, n)
  t.order = band + n
}

// Re-number curriculum topics inside each course according to the merged sequence.
const courseCounters = new Map()
for (const t of curriculum.topics) {
  const c = String(t.course).padStart(2, '0')
  const n = (courseCounters.get(c) ?? 0) + 1
  courseCounters.set(c, n)
  t.order = n * 10
}

await writeFile(topicsPath, stringify(topics, { lineWidth: 0 }), 'utf8')
await writeFile(curriculumPath, stringify(curriculum, { lineWidth: 0 }), 'utf8')
console.log(`merged ${additions.length} audit topics`)
