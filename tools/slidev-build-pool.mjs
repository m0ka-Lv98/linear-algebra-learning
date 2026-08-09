import { execFile } from 'node:child_process'
import { availableParallelism } from 'node:os'
import path from 'node:path'
import { promisify } from 'node:util'

const exec = promisify(execFile)

export async function buildSlideDecks({
  root,
  ids,
  outputDir,
  basePath = process.env.BASE_PATH ?? '/',
  inputForId = (id) => `decks/${id}.md`,
  concurrency = resolveConcurrency(),
}) {
  if (!ids.length) return
  const slidesRoot = path.join(root, 'apps/slides')
  const workerCount = Math.min(concurrency, ids.length)
  let cursor = 0
  let firstError = null

  console.log(`Slidev build pool: ${ids.length} deck(s), concurrency=${workerCount}`)

  async function worker(workerIndex) {
    while (!firstError) {
      const index = cursor
      cursor += 1
      if (index >= ids.length) return
      const id = ids[index]
      const started = Date.now()
      console.log(`building slides [${index + 1}/${ids.length}] worker=${workerIndex + 1}: ${id}`)
      try {
        await exec(
          'pnpm',
          [
            'exec', 'slidev', 'build', inputForId(id),
            '--out', path.join(outputDir, id),
            '--base', `${basePath}slides/${id}/`,
            '--download', 'false',
          ],
          {
            cwd: slidesRoot,
            env: process.env,
            maxBuffer: 50 * 1024 * 1024,
          },
        )
        console.log(`built slides [${index + 1}/${ids.length}] ${id} in ${((Date.now() - started) / 1000).toFixed(1)}s`)
      } catch (error) {
        firstError = new Error(`Slidev build failed for ${id}: ${error?.message ?? error}`, { cause: error })
        return
      }
    }
  }

  await Promise.all(Array.from({ length: workerCount }, (_, index) => worker(index)))
  if (firstError) throw firstError
}

export function resolveConcurrency() {
  const requested = Number.parseInt(process.env.SLIDE_BUILD_CONCURRENCY ?? '', 10)
  if (Number.isFinite(requested) && requested > 0) return Math.min(requested, 8)
  return Math.max(1, Math.min(4, availableParallelism()))
}
