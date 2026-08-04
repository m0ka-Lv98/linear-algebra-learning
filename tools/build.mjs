import { cp, mkdir, rm } from 'node:fs/promises'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'

const exec = promisify(execFile)
await rm('dist', { recursive: true, force: true })
await exec('pnpm', ['build:portal'], { stdio: 'inherit', maxBuffer: 50 * 1024 * 1024 })
await mkdir('dist', { recursive: true })
await cp('apps/portal/.vitepress/dist', 'dist', { recursive: true })
await exec('pnpm', ['--filter', '@linear-algebra/slides', 'build'], { stdio: 'inherit', maxBuffer: 50 * 1024 * 1024 })
console.log('combined static site written to dist/')
