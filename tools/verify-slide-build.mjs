import { access, readFile } from 'node:fs/promises'
import path from 'node:path'
import { parse } from 'yaml'

const root = path.resolve(new URL('..', import.meta.url).pathname)
const data = parse(await readFile(path.join(root, 'content/topics.yml'), 'utf8'))
const topics = Array.isArray(data) ? data : data.topics
await access(path.join(root, 'dist/index.html'))
const missing = []
for (const topic of topics) {
  try { await access(path.join(root, 'dist/slides', topic.id, 'index.html')) } catch { missing.push(topic.id) }
}
if (missing.length) throw new Error(`Missing Slidev outputs: ${missing.join(', ')}`)
console.log(`verified Slidev outputs: ${topics.length}`)
