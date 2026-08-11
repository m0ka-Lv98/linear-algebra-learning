import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse, stringify } from 'yaml'
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const ids = new Set(JSON.parse(await readFile(path.join(root,'content/engineering-math-four-groups.json'),'utf8')).map(x=>x.id))
const file=path.join(root,'content/topics.yml')
const topics=parse(await readFile(file,'utf8'))
let changed=0
for (const t of topics) if (ids.has(t.id)) {
  t.status='draft'; t.delivery='knowledge-base'
  t.routes={home:`/knowledge-base/topics/${t.id}`,slides:`/slides/${t.id}/`,textbook:`/textbook/${t.id}`,exercises:`/exercises/${t.id}`}
  delete t.course; delete t.order; changed++
}
if (changed!==ids.size) throw new Error(`expected ${ids.size} target topics, updated ${changed}`)
await writeFile(file,stringify(topics,{lineWidth:0}),'utf8')
console.log(`updated ${changed} engineering-math topics to draft/knowledge-base delivery`)
