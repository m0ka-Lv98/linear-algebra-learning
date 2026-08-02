import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { parse } from 'yaml'

export const ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
export const LAYERS = ['core', 'applied', 'frontier']
export const COURSE_STATUSES = ['planned', 'active', 'stable', 'retired']
export const TOPIC_STATUSES = ['planned', 'draft', 'review', 'published']
export const TOPIC_KINDS = ['required', 'optional']

async function loadYaml(root, relative) {
  try {
    return parse(await readFile(path.join(root, relative), 'utf8'))
  } catch (error) {
    throw new Error(`${relative} is not valid YAML: ${error.message}`)
  }
}

export async function loadCourses(root) {
  return loadYaml(root, 'content/courses.yml')
}

export async function loadCurriculum(root) {
  return loadYaml(root, 'content/curriculum.yml')
}

function duplicateErrors(items, field, label) {
  const seen = new Set()
  const errors = []
  for (const [index, item] of items.entries()) {
    const value = item?.[field]
    if (seen.has(value)) errors.push(`${label}[${index}].${field} duplicates ${value}`)
    if (value !== undefined) seen.add(value)
  }
  return errors
}

export function detectCycles(nodes, dependencies) {
  const known = new Set(nodes)
  const state = new Map()
  const cycles = []
  const visit = (node, stack = []) => {
    if (state.get(node) === 'visiting') {
      cycles.push([...stack.slice(stack.indexOf(node)), node].join(' -> '))
      return
    }
    if (state.get(node) === 'visited') return
    state.set(node, 'visiting')
    for (const dependency of dependencies.get(node) ?? []) if (known.has(dependency)) visit(dependency, [...stack, node])
    state.set(node, 'visited')
  }
  for (const node of nodes) visit(node)
  return cycles
}

export function validateCourses(data) {
  const errors = []
  const warnings = []
  if (data?.version !== 1) errors.push('courses.yml.version must be 1')
  if (!Array.isArray(data?.courses)) return { errors: [...errors, 'courses.yml.courses must be an array'], warnings }
  const courses = data.courses
  errors.push(...duplicateErrors(courses, 'id', 'courses'))
  errors.push(...duplicateErrors(courses, 'slug', 'courses'))
  const ids = new Set(courses.map((course) => course?.id))
  courses.forEach((course, index) => {
    const label = `courses[${index}]`
    if (typeof course?.id !== 'string' || !/^\d{2}$/.test(course.id)) errors.push(`${label}.id must be a two-digit string`)
    if (typeof course?.slug !== 'string' || !ID_PATTERN.test(course.slug)) errors.push(`${label}.slug must contain lowercase letters, numbers, and hyphens only`)
    if (typeof course?.title !== 'string' || !course.title.trim()) errors.push(`${label}.title must not be empty`)
    if (!LAYERS.includes(course?.layer)) errors.push(`${label}.layer is invalid`)
    if (!COURSE_STATUSES.includes(course?.status)) errors.push(`${label}.status is invalid`)
    if (!Array.isArray(course?.prerequisites)) errors.push(`${label}.prerequisites must be an array`)
    else {
      for (const prerequisite of course.prerequisites) {
        if (!ids.has(prerequisite)) errors.push(`${label}.prerequisites references unknown Course ${prerequisite}`)
        if (prerequisite === course.id) errors.push(`${label}.prerequisites must not include itself`)
      }
    }
    if (!Array.isArray(course?.mit_references)) errors.push(`${label}.mit_references must be an array`)
    else course.mit_references.forEach((reference, refIndex) => {
      if (typeof reference?.code !== 'string' || !reference.code.trim()) errors.push(`${label}.mit_references[${refIndex}].code is required`)
      if (typeof reference?.title !== 'string' || !reference.title.trim()) errors.push(`${label}.mit_references[${refIndex}].title is required`)
    })
  })
  const dependencies = new Map(courses.map((course) => [course?.id, course?.prerequisites ?? []]))
  for (const cycle of detectCycles([...ids].filter(Boolean), dependencies)) errors.push(`Course dependency cycle: ${cycle}`)
  return { errors, warnings }
}

export function validateCurriculum(data, courses, implementedTopics = []) {
  const errors = []
  const warnings = []
  if (data?.version !== 1) errors.push('curriculum.yml.version must be 1')
  if (!Array.isArray(data?.units)) errors.push('curriculum.yml.units must be an array')
  if (!Array.isArray(data?.topics)) errors.push('curriculum.yml.topics must be an array')
  if (errors.length) return { errors, warnings }
  const courseIds = new Set((courses?.courses ?? []).map((course) => course.id))
  const units = data.units
  const topics = data.topics
  errors.push(...duplicateErrors(units, 'id', 'units'))
  errors.push(...duplicateErrors(topics, 'id', 'topics'))
  const unitIds = new Set(units.map((unit) => unit?.id))
  const topicIds = new Set(topics.map((topic) => topic?.id))
  const unitById = new Map(units.map((unit) => [unit?.id, unit]))
  const topicById = new Map(topics.map((topic) => [topic?.id, topic]))
  const unitOrders = new Map()
  units.forEach((unit, index) => {
    const label = `units[${index}]`
    if (typeof unit?.id !== 'string' || !ID_PATTERN.test(unit.id)) errors.push(`${label}.id is invalid`)
    if (!courseIds.has(unit?.course)) errors.push(`${label}.course references unknown Course ${unit?.course}`)
    if (!Number.isInteger(unit?.order) || unit.order < 0) errors.push(`${label}.order must be a non-negative integer`)
    if (typeof unit?.title !== 'string' || !unit.title.trim()) errors.push(`${label}.title must not be empty`)
    const key = `${unit?.course}:${unit?.order}`
    if (unitOrders.has(key)) errors.push(`${label}.order duplicates within Course ${unit.course}`)
    unitOrders.set(key, true)
  })
  const topicOrders = new Map()
  topics.forEach((topic, index) => {
    const label = `topics[${index}]`
    if (typeof topic?.id !== 'string' || !ID_PATTERN.test(topic.id)) errors.push(`${label}.id is invalid`)
    if (!courseIds.has(topic?.course)) errors.push(`${label}.course references unknown Course ${topic?.course}`)
    if (!unitIds.has(topic?.unit)) errors.push(`${label}.unit references unknown Unit ${topic?.unit}`)
    if (unitById.get(topic?.unit)?.course !== topic?.course) errors.push(`${label}.course does not match its Unit`)
    if (!Number.isInteger(topic?.order) || topic.order < 0) errors.push(`${label}.order must be a non-negative integer`)
    if (typeof topic?.title !== 'string' || !topic.title.trim()) errors.push(`${label}.title must not be empty`)
    if (typeof topic?.summary !== 'string' || !topic.summary.trim()) errors.push(`${label}.summary must not be empty`)
    if (!TOPIC_STATUSES.includes(topic?.status)) errors.push(`${label}.status is invalid`)
    if (!TOPIC_KINDS.includes(topic?.kind)) errors.push(`${label}.kind is invalid`)
    if (!Array.isArray(topic?.prerequisites)) errors.push(`${label}.prerequisites must be an array`)
    else for (const prerequisite of topic.prerequisites) {
      if (!topicIds.has(prerequisite)) errors.push(`${label}.prerequisites references unknown Topic ${prerequisite}`)
      if (prerequisite === topic.id) errors.push(`${label}.prerequisites must not include itself`)
    }
    if (!Array.isArray(topic?.outcomes) || topic.outcomes.length < 2 || topic.outcomes.length > 5 || topic.outcomes.some((outcome) => typeof outcome !== 'string' || !outcome.trim())) errors.push(`${label}.outcomes must contain 2 to 5 non-empty strings`)
    if (topic?.implementation_topic !== undefined && !implementedTopics.includes(topic.implementation_topic)) errors.push(`${label}.implementation_topic references unknown implemented Topic ${topic.implementation_topic}`)
    const key = `${topic?.unit}:${topic?.order}`
    if (topicOrders.has(key)) errors.push(`${label}.order duplicates within Unit ${topic.unit}`)
    topicOrders.set(key, true)
  })
  const implementationOwners = new Map()
  topics.forEach((topic, index) => {
    if (topic?.implementation_topic === undefined) return
    if (implementationOwners.has(topic.implementation_topic)) errors.push(`topics[${index}].implementation_topic duplicates ${topic.implementation_topic}`)
    implementationOwners.set(topic.implementation_topic, topic.id)
  })
  const dependencies = new Map(topics.map((topic) => [topic?.id, topic?.prerequisites ?? []]))
  for (const cycle of detectCycles([...topicIds].filter(Boolean), dependencies)) errors.push(`Topic dependency cycle: ${cycle}`)
  const courseTopics = new Set(topics.map((topic) => topic.course))
  for (const course of courses?.courses ?? []) if (!courseTopics.has(course.id)) warnings.push(`Course ${course.id} has no curriculum Unit`)
  const implementedSet = new Set(implementedTopics)
  const assignedSet = new Set(topics.map((topic) => topic.implementation_topic).filter(Boolean))
  for (const topic of implementedSet) if (!assignedSet.has(topic)) warnings.push(`implemented Topic ${topic} is not assigned to curriculum`)
  for (const course of courses?.courses ?? []) if (course.status === 'active' && !topics.some((topic) => topic.course === course.id && topic.implementation_topic)) warnings.push(`active Course ${course.id} has no implemented Topic`)
  return { errors, warnings, units, topics }
}
