import { readFile } from 'node:fs/promises'
import { access } from 'node:fs/promises'

const required = [
  'apps/portal/index.md', 'apps/portal/courses/foundation/orthogonal-projection.md',
  'apps/portal/textbook/orthogonal-projection.md', 'apps/portal/exercises/orthogonal-projection.md',
  'apps/slides/decks/orthogonal-projection.md', 'content/topics.yml', 'README.md', 'AGENTS.md'
]
for (const file of required) await access(file)
const home = await readFile('apps/portal/courses/foundation/orthogonal-projection.md', 'utf8')
const slides = await readFile('apps/slides/decks/orthogonal-projection.md', 'utf8')
for (const text of [home, slides]) if (!text.includes('orthogonal-projection')) throw new Error('Missing topic link')
console.log(`content checks passed (${required.length} required files)`)
