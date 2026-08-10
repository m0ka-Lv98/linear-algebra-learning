import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse } from 'yaml'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

// Compatibility view: topics.yml is authoritative for Topic metadata; the old
// curriculum remains only for Course/Unit presentation and legacy URLs.
export async function loadLegacyCurriculum(rootDir = root) {
  const [topicSource, curriculumSource] = await Promise.all([
    readFile(path.join(rootDir, 'content/topics.yml'), 'utf8'),
    readFile(path.join(rootDir, 'content/curriculum.yml'), 'utf8'),
  ])
  const topics = parse(topicSource)
  const curriculum = parse(curriculumSource)
  const byId = new Map(topics.map((topic) => [topic.id, topic]))
  return {
    ...curriculum,
    topics: curriculum.topics.map((legacy) => ({ ...legacy, taxonomy: byId.get(legacy.implementation_topic ?? legacy.id) ?? null })),
  }
}

if (process.argv.includes('--check')) {
  const result = await loadLegacyCurriculum()
  const missing = result.topics.filter((topic) => !topic.taxonomy && topic.status !== 'planned')
  if (missing.length) throw new Error(`legacy curriculum adapter missing taxonomy entries: ${missing.map((topic) => topic.id).join(', ')}`)
  console.log(`legacy curriculum adapter passed (${result.topics.length} legacy topics)`)
}
