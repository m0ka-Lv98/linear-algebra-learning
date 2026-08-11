import { access, readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { parse } from 'yaml'

const root = path.resolve(process.argv[2] ?? 'apps/portal/.vitepress/dist')
const forbidden = [/href="\/(?:courses|textbook|exercises|slides)\//, /src="\/visuals\//]
const htmlFiles = []
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name)
    if (entry.isDirectory()) await walk(file)
    else if (entry.name.endsWith('.html')) htmlFiles.push(file)
  }
}
await walk(root)
const failures = []
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8')
  for (const pattern of forbidden) if (pattern.test(html)) failures.push(path.relative(root, file))
}
if (failures.length) {
  console.error(`ERROR: BASE_PATH root-relative links found in ${[...new Set(failures)].join(', ')}`)
  process.exit(1)
}

const curriculum = parse(await readFile('content/curriculum.yml', 'utf8'))
const topics = curriculum.topics ?? []
const missing = []
for (const topic of topics) {
  const id = topic.implementation_topic ?? topic.id
  const routes = [`courses/foundation/${id}`, `textbook/${id}`, `exercises/${id}`]
  for (const route of routes) {
    const candidates = [path.join(root, `${route}.html`), path.join(root, route, 'index.html')]
    let found = false
    for (const candidate of candidates) { try { await access(candidate); found = true; break } catch {} }
    if (!found) missing.push(route)
  }
}
if (missing.length) {
  console.error(`ERROR: missing generated Topic pages: ${missing.slice(0, 20).join(', ')}`)
  process.exit(1)
}
console.log(`PASS: BASE_PATH link audit and ${topics.length * 3} Topic page checks`)
