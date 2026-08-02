import { access, readFile } from 'node:fs/promises'
import path from 'node:path'
import { parse } from 'yaml'

export const COURSES = ['foundation', 'wlsm', 'machine-learning', 'frontier']
export const STATUSES = ['planned', 'draft', 'review', 'published']
export const TOPIC_ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export function topicPaths(topic) {
  return {
    home: `apps/portal/courses/${topic.course}/${topic.id}.md`,
    textbook: `apps/portal/textbook/${topic.id}.md`,
    exercises: `apps/portal/exercises/${topic.id}.md`,
    slides: `apps/slides/decks/${topic.id}.md`
  }
}

export function expectedRoutes(topic) {
  return {
    home: `/courses/${topic.course}/${topic.id}`,
    slides: `/slides/${topic.id}/`,
    textbook: `/textbook/${topic.id}`,
    exercises: `/exercises/${topic.id}`
  }
}

export function validateTopic(topic, index = 0) {
  const errors = []
  const warnings = []
  const label = `topics[${index}]`
  const required = ['id', 'title', 'course', 'order', 'summary', 'status', 'prerequisites', 'estimated_minutes', 'routes']
  for (const field of required) if (!(field in (topic ?? {}))) errors.push(`${label}.${field} is required`)
  if (typeof topic?.id !== 'string' || !TOPIC_ID_PATTERN.test(topic.id)) errors.push(`${label}.id must contain lowercase letters, numbers, and hyphens only`)
  if (typeof topic?.title !== 'string' || !topic.title.trim()) errors.push(`${label}.title must not be empty`)
  if (!COURSES.includes(topic?.course)) errors.push(`${label}.course must be one of: ${COURSES.join(', ')}`)
  if (!Number.isInteger(topic?.order) || topic.order < 0) errors.push(`${label}.order must be a non-negative integer`)
  if (typeof topic?.summary !== 'string' || !topic.summary.trim()) errors.push(`${label}.summary must not be empty`)
  if (!STATUSES.includes(topic?.status)) errors.push(`${label}.status must be one of: ${STATUSES.join(', ')}`)
  if (!Array.isArray(topic?.prerequisites) || topic.prerequisites.some((item) => typeof item !== 'string')) errors.push(`${label}.prerequisites must be an array of strings`)
  if (topic?.prerequisites?.includes(topic?.id)) errors.push(`${label}.prerequisites must not include the topic itself`)
  for (const field of ['slides', 'textbook', 'exercises']) {
    if (!Number.isInteger(topic?.estimated_minutes?.[field]) || topic.estimated_minutes[field] <= 0) errors.push(`${label}.estimated_minutes.${field} must be a positive integer`)
  }
  const routes = topic?.routes
  for (const field of ['home', 'slides', 'textbook', 'exercises']) if (typeof routes?.[field] !== 'string') errors.push(`${label}.routes.${field} is required`)
  if (routes && typeof topic?.id === 'string' && typeof topic?.course === 'string') {
    const expected = expectedRoutes(topic)
    for (const field of Object.keys(expected)) if (routes[field] !== expected[field]) errors.push(`${label}.routes.${field} must be ${expected[field]}`)
  }
  return { errors, warnings }
}

export function validateTopics(topics) {
  const errors = []
  const warnings = []
  if (!Array.isArray(topics)) return { errors: ['content/topics.yml root must be an array'], warnings }
  const ids = new Set()
  topics.forEach((topic, index) => {
    const result = validateTopic(topic, index)
    errors.push(...result.errors)
    warnings.push(...result.warnings)
    if (ids.has(topic?.id)) errors.push(`topics[${index}].id duplicates ${topic.id}`)
    if (topic?.id) ids.add(topic.id)
    for (const prerequisite of topic?.prerequisites ?? []) if (!ids.has(prerequisite) && !topics.some((item) => item?.id === prerequisite)) warnings.push(`${topic.id}: prerequisite ${prerequisite} is not registered yet`)
  })
  return { errors, warnings }
}

export async function loadTopics(root) {
  const file = path.join(root, 'content/topics.yml')
  const source = await readFile(file, 'utf8')
  let topics
  try {
    topics = parse(source)
  } catch (error) {
    throw new Error(`content/topics.yml is not valid YAML: ${error.message}`)
  }
  const result = validateTopics(topics)
  if (result.errors.length) throw new Error(result.errors.join('\n'))
  return { topics, warnings: result.warnings, source }
}

export async function validateTopicFiles(root, topic) {
  const errors = []
  const paths = topicPaths(topic)
  for (const [kind, relative] of Object.entries(paths)) {
    try {
      await access(path.join(root, relative))
    } catch {
      errors.push(`${topic.id}: missing ${kind} file ${relative}`)
    }
  }
  const contents = {}
  for (const [kind, relative] of Object.entries(paths)) {
    try { contents[kind] = await readFile(path.join(root, relative), 'utf8') } catch { contents[kind] = '' }
  }
  if (!contents.home.includes(`/slides/${topic.id}/`) || !contents.home.includes(`/textbook/${topic.id}`) || !contents.home.includes(`/exercises/${topic.id}`)) errors.push(`${topic.id}: topic home must link to slides, textbook, and exercises`)
  if (!contents.textbook.includes(`/exercises/${topic.id}`)) errors.push(`${topic.id}: textbook must link to exercises`)
  if (!contents.exercises.includes(`/textbook/${topic.id}`)) errors.push(`${topic.id}: exercises must link to textbook`)
  if (!contents.slides.includes(`textbook/${topic.id}`) || !contents.slides.includes(`exercises/${topic.id}`)) errors.push(`${topic.id}: slides must link to textbook and exercises`)
  for (const content of Object.values(contents)) {
    if (/href=["']\/(?:slides|textbook|exercises)\//.test(content)) errors.push(`${topic.id}: raw root-relative cross-site link may break the GitHub Pages base path`)
    if (content.includes('/linear-algebra-learning/')) errors.push(`${topic.id}: repository-specific base path must not be hardcoded in content`)
  }
  return errors
}

export async function validateRepositoryContent(root) {
  const { topics, warnings } = await loadTopics(root)
  const errors = []
  for (const topic of topics) errors.push(...await validateTopicFiles(root, topic))
  return { topics, errors, warnings }
}
