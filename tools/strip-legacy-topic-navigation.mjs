import { readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const root = path.resolve('apps/portal/courses/foundation')
const removable = new Set(['Course・Unit内での位置付け', '学習順序', '教材', '前後Topic'])
const files = (await readdir(root)).filter((file) => file.endsWith('.md'))
let changed = 0
for (const file of files) {
  const source = await readFile(path.join(root, file), 'utf8')
  const lines = source.split(/\r?\n/)
  const output = []
  let skipping = false
  for (const line of lines) {
    const heading = line.match(/^##\s+(.+)$/)?.[1]
    if (heading && removable.has(heading)) { skipping = true; continue }
    if (skipping && heading) skipping = false
    if (!skipping) output.push(line)
  }
  const next = output.join('\n').replace(/\n{3,}/g, '\n\n')
  if (next !== source) { await writeFile(path.join(root, file), next); changed++ }
}
console.log(`legacy topic navigation removed: ${changed} files`)
