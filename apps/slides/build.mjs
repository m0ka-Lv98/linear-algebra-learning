import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse } from 'yaml'
import { buildSlideDecks } from '../../tools/slidev-build-pool.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const topicData = parse(await readFile(path.join(root, 'content/topics.yml'), 'utf8'))
const curriculum = parse(await readFile(path.join(root, 'content/curriculum.yml'), 'utf8'))
const topicEntries = Array.isArray(topicData) ? topicData : topicData.topics
const implementationIds = new Set(topicEntries.map((item) => item.id))
const allDecks = [...new Set(curriculum.topics.map((item) => item.implementation_topic ?? item.id))]
  .filter((id) => implementationIds.has(id))

const topicArgIndex = process.argv.indexOf('--topics')
const requested = topicArgIndex >= 0
  ? process.argv[topicArgIndex + 1].split(',').map((id) => id.trim()).filter(Boolean)
  : allDecks
const decks = requested.filter((id) => allDecks.includes(id))
const missing = requested.filter((id) => !allDecks.includes(id))
if (missing.length) throw new Error(`Unknown implementation Topic(s): ${missing.join(', ')}`)

// IMPORTANT: a build is a pure read of apps/slides/decks.  Do not run a generator or
// normalizer here.  Curated source decks must never be overwritten as a side effect of
// rendering the site.  Explicit materialization, if needed, belongs in a separate manual command.
const slides = path.join(root, 'dist/slides')
await mkdir(slides, { recursive: true })
await buildSlideDecks({ root, ids: decks, outputDir: slides })

if (decks.length === allDecks.length) {
  await writeFile(
    path.join(slides, '.build-manifest.json'),
    `${JSON.stringify({ version: 3, topics: allDecks, sourceMutation: false }, null, 2)}\n`,
  )
}
