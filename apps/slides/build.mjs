import { execFile } from 'node:child_process'
import { readFile } from 'node:fs/promises'
import { promisify } from 'node:util'
import { parse } from 'yaml'
const exec = promisify(execFile)
const topicData = parse(await readFile(new URL("../../content/topics.yml", import.meta.url), "utf8"))
const curriculum = parse(await readFile(new URL("../../content/curriculum.yml", import.meta.url), "utf8"))
const implementationIds = new Set((Array.isArray(topicData) ? topicData : topicData.topics).map((item) => item.id))
const allDecks = [...new Set(curriculum.topics.map((item) => item.implementation_topic ?? item.id))].filter((id) => implementationIds.has(id))
const requested = process.argv.includes("--topics") ? process.argv[process.argv.indexOf("--topics") + 1].split(",") : allDecks
const decks = requested.filter((id) => allDecks.includes(id))
const missing = requested.filter((id) => !allDecks.includes(id))
if (missing.length) throw new Error(`Unknown implementation Topic(s): ${missing.join(', ')}`)
for (const id of decks) {
  console.log(`building slides: ${id}`)
  await exec('pnpm', ['exec', 'slidev', 'build', `decks/${id}.md`, '--out', `../../../dist/slides/${id}`, '--base', `${process.env.BASE_PATH ?? '/'}slides/${id}/`, '--download', 'false'], { maxBuffer: 50 * 1024 * 1024 })
}
