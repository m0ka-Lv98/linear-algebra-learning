import { cp, mkdir, rm } from 'node:fs/promises'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'

const exec = promisify(execFile)
await rm('dist', { recursive: true, force: true })

// Portal and Slidev outputs are independent until the final merge, so build
// them concurrently. Slidev itself uses a bounded worker pool.
const portalBuild = exec('pnpm', ['build:portal'], {
  env: process.env,
  maxBuffer: 50 * 1024 * 1024,
})
const slideBuild = exec('pnpm', ['--filter', '@linear-algebra/slides', 'build'], {
  env: process.env,
  maxBuffer: 50 * 1024 * 1024,
})
await Promise.all([portalBuild, slideBuild])

await mkdir('dist', { recursive: true })
await cp('apps/portal/.vitepress/dist', 'dist', { recursive: true })
console.log('combined static site written to dist/')
