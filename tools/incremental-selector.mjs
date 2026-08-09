import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { parse } from 'yaml'

export async function loadTopicSelection(root, options = {}) {
  const curriculum = parse(await readFile(path.join(root, 'content/curriculum.yml'), 'utf8'))
  const topicData = parse(await readFile(path.join(root, 'content/topics.yml'), 'utf8'))
  const topicEntries = Array.isArray(topicData) ? topicData : topicData.topics
  const implementationIds = new Set(topicEntries.map((item) => item.id))
  const requested = options.topics ?? (options.topic ? [options.topic] : undefined)
  const candidates = curriculum.topics.filter((item) => {
    if (options.course && item.course !== options.course) return false
    if (!requested) return true
    return requested.includes(item.id) || requested.includes(item.implementation_topic)
  })
  if (!candidates.length) throw new Error('No matching Course/Topic implementation found')
  const selected = [...new Set(candidates.map((item) => item.implementation_topic ?? item.id))]
  const missing = selected.filter((id) => !implementationIds.has(id))
  if (missing.length) throw new Error(`Topic content is missing for: ${missing.join(', ')}`)
  return selected
}

export async function allImplementationTopics(root) {
  return loadTopicSelection(root)
}
