import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse } from 'yaml'
import { generateCourse0110SlideDecks } from '../../tools/generate-course01-10-slide-decks.mjs'
import { buildSlideDecks } from '../../tools/slidev-build-pool.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const topicData = parse(await readFile(path.join(root, 'content/topics.yml'), 'utf8'))
const curriculum = parse(await readFile(path.join(root, 'content/curriculum.yml'), 'utf8'))
const topicEntries = Array.isArray(topicData) ? topicData : topicData.topics
const implementationIds = new Set(topicEntries.map((item) => item.id))
const allDecks = [...new Set(curriculum.topics.map((item) => item.implementation_topic ?? item.id))]
  .filter((id) => implementationIds.has(id))
const course00Ids = new Set(curriculum.topics
  .filter((item) => String(item.course) === '00')
  .map((item) => item.implementation_topic ?? item.id))

const topicArgIndex = process.argv.indexOf('--topics')
const requested = topicArgIndex >= 0
  ? process.argv[topicArgIndex + 1].split(',').map((id) => id.trim()).filter(Boolean)
  : allDecks
const decks = requested.filter((id) => allDecks.includes(id))
const missing = requested.filter((id) => !allDecks.includes(id))
if (missing.length) throw new Error(`Unknown implementation Topic(s): ${missing.join(', ')}`)

const generatedIds = decks.filter((id) => !course00Ids.has(id))
if (generatedIds.length) {
  const generated = await generateCourse0110SlideDecks({ root, ids: generatedIds })
  console.log(`materialized Course 01-10 slide sources: ${generated.total} (${generated.changed.length} changed)`)
}

const slides = path.join(root, 'dist/slides')
await mkdir(slides, { recursive: true })
await buildSlideDecks({ root, ids: decks, outputDir: slides })

if (decks.length === allDecks.length) {
  await writeFile(
    path.join(slides, '.build-manifest.json'),
    `${JSON.stringify({ version: 2, topics: allDecks }, null, 2)}\n`,
  )
}
