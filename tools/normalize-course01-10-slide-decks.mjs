import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { parse } from 'yaml'

export async function normalizeCourse0110SlideDecks({ root = process.cwd(), ids } = {}) {
  const curriculum = parse(await readFile(path.join(root, 'content/curriculum.yml'), 'utf8'))
  if (!Array.isArray(curriculum?.topics)) {
    throw new Error('content/curriculum.yml: topics array not found')
  }

  const courseById = new Map()
  for (const topic of curriculum.topics) {
    const course = String(topic.course).padStart(2, '0')
    if (course === '00') continue
    const id = topic.implementation_topic ?? topic.id
    if (!courseById.has(id)) courseById.set(id, course)
  }

  const targetIds = ids?.length ? [...new Set(ids)] : [...courseById.keys()]
  const unknown = targetIds.filter((id) => !courseById.has(id))
  if (unknown.length) throw new Error(`Unknown Course 01-10 implementation topic(s): ${unknown.join(', ')}`)

  const changed = []
  const repairedPaths = []
  const repairedChecks = []

  for (const id of targetIds) {
    const course = courseById.get(id)
    const deckPath = path.join(root, 'apps/slides/decks', `${id}.md`)
    let source = await readFile(deckPath, 'utf8')
    const original = source

    // Portal assets live at /visuals/course-XX/... . Slidev decks must use the
    // deck-local assets directory so Vite can resolve/copy the file at build time.
    // This intentionally runs AFTER any source generator, making the invariant
    // independent of which generator path produced the deck.
    const portalPrefix = `/visuals/course-${course}/`
    const slidePrefix = `./assets/course-${course}/`
    if (source.includes(portalPrefix)) {
      source = source.replaceAll(portalPrefix, slidePrefix)
      repairedPaths.push(id)
    }

    // Course 02-10 refined decks are managed content. The repository-level
    // verifier requires an explicit 理解確認 section. Older refinement output
    // called the same final section まとめと演習; normalize that heading.
    if (/generatedBy:\s*course02-10-refined-v1/.test(source) && !/^##\s+理解確認\s*$/m.test(source)) {
      if (/^##\s+まとめと演習\s*$/m.test(source)) {
        source = source.replace(/^##\s+まとめと演習\s*$/m, '## 理解確認')
      } else {
        source = `${source.trimEnd()}\n\n---\n\n## 理解確認\n\n- このTopicの定義・代表式・成立条件を説明できるか。\n- 小さな例で手計算と実装を照合できるか。\n\n[教科書](../../textbook/${id})\n\n[10問の演習](../../exercises/${id})\n`
      }
      repairedChecks.push(id)
    }

    if (source !== original) {
      await writeFile(deckPath, source)
      changed.push(id)
    }
  }

  return { total: targetIds.length, changed, repairedPaths, repairedChecks }
}

async function cli() {
  const root = process.cwd()
  const topicArg = process.argv.indexOf('--topics')
  const ids = topicArg >= 0
    ? process.argv[topicArg + 1]?.split(',').map((id) => id.trim()).filter(Boolean)
    : undefined
  const result = await normalizeCourse0110SlideDecks({ root, ids })
  console.log(`normalized Course 01-10 Slidev decks: ${result.total}`)
  console.log(`changed: ${result.changed.length}`)
  console.log(`portal asset paths repaired: ${result.repairedPaths.length}`)
  console.log(`理解確認 headings repaired: ${result.repairedChecks.length}`)
}

const invokedPath = process.argv[1] ? pathToFileURL(path.resolve(process.argv[1])).href : null
if (invokedPath === import.meta.url) {
  await cli()
}
