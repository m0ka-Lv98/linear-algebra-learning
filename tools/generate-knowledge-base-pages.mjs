import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse } from 'yaml'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const kb = path.join(root, 'apps/portal/knowledge-base')
const load = async (file) => parse(await readFile(path.join(root, 'content', file), 'utf8'))
const topics = await load('topics.yml')
const domains = (await load('domains.yml')).domains
const modules = (await load('modules.yml')).modules
const paths = (await load('paths.yml')).paths
const cases = (await load('case-studies.yml')).case_studies
const byId = new Map(topics.map((topic) => [topic.id, topic]))
const domainById = new Map(domains.map((domain) => [domain.id, domain]))
const moduleById = new Map(modules.map((module) => [module.id, module]))
const slug = (value) => String(value).replace(/[^a-z0-9-]/gi, '-').toLowerCase()
const topicLink = (topic) => `[${topic.title}](/knowledge-base/topics/${topic.id})`
const artifactLinks = (topic) => topic.status === 'planned' ? '本文・演習・スライドは準備中です。' : `[テーマホーム](${topic.routes.home}) / [教科書](${topic.routes.textbook}) / [演習](${topic.routes.exercises}) / [スライド](${topic.routes.slides})`
const write = async (file, body) => { await mkdir(path.dirname(file), { recursive: true }); await writeFile(file, `<!-- GENERATED: knowledge-base -->\n${body.trim()}\n`) }

await rm(kb, { recursive: true, force: true })
await mkdir(kb, { recursive: true })
await write(path.join(kb, 'index.md'), `# Topic Knowledge Base

Courseの順番を保ったまま、数学分野・目的別の学習経路・応用事例からTopicへ入れるKnowledge Baseです。

- [数学分野から探す](./domains)
- [目的から学ぶ](./paths)
- [応用から探す](./case-studies)
- [全Topic](./topics)

既存のCourse、教科書、演習、SlidevのURLは維持し、ここから各Topicのメタデータと教材へ移動できます。`)
await write(path.join(kb, 'domains.md'), `# 数学分野から探す

Category → Domain → Module → Topicの順に整理しています。

${domains.map((domain) => `- [${domain.title_ja}（${domain.title}）](./domains/${domain.id})`).join('\n')}`)
for (const domain of domains) {
  const domainTopics = topics.filter((topic) => topic.domain === domain.id)
  const domainModules = modules.filter((module) => module.domain === domain.id)
  await write(path.join(kb, 'domains', `${domain.id}.md`), `# ${domain.title_ja}

**Domain:** \`${domain.id}\`
**Category:** \`${domain.category}\`

${domainModules.map((module) => `## ${module.title}\n\n${domainTopics.filter((topic) => topic.module === module.id).map(topicLink).join(' / ') || 'Topic metadata is being prepared.'}`).join('\n\n')}`)
}
await write(path.join(kb, 'paths.md'), `# 目的から学ぶ

Learning PathはTopicを複製せず、Prerequisite DAG上の順序として参照します。

${paths.map((learningPath) => `- [${learningPath.title}](./paths/${learningPath.id}) — ${learningPath.description}`).join('\n')}`)
for (const learningPath of paths) {
  await write(path.join(kb, 'paths', `${learningPath.id}.md`), `# ${learningPath.title}

${learningPath.description}

${learningPath.topics.map((id, index) => `${index + 1}. ${byId.has(id) ? topicLink(byId.get(id)) : `\`${id}\``}`).join('\n')}`)
}
await write(path.join(kb, 'case-studies.md'), `# 応用から探す

Case Studyは複数の数学Topicを組み合わせる応用入口です。数学Topicそのものの代替ではありません。

${cases.map((study) => `- [${study.title}](./case-studies/${study.id}) — ${study.status}`).join('\n')}`)
for (const study of cases) {
  const domain = domainById.get(study.domain)
  await write(path.join(kb, 'case-studies', `${study.id}.md`), `# ${study.title}

**Domain:** ${domain?.title_ja ?? study.domain}
**Status:** ${study.status}

## 必要なTopic

${study.requires.map((id) => byId.has(id) ? `- ${topicLink(byId.get(id))}` : `- \`${id}\``).join('\n')}

## 接続先

${study.connects.map((id) => `- \`${id}\``).join('\n')}`)
}
const topicPages = topics.map((topic) => {
  const next = topics.filter((candidate) => (candidate.prerequisites ?? []).includes(topic.id)).slice(0, 8)
  const relatedPaths = paths.filter((learningPath) => learningPath.topics.includes(topic.id))
  const relatedCases = cases.filter((study) => study.requires.includes(topic.id))
  const domain = domainById.get(topic.domain)
  const module = moduleById.get(topic.module)
  return { topic, body: `# ${topic.title}

**Domain:** [${domain?.title_ja ?? topic.domain}](../domains/${topic.domain})
**Module:** ${module?.title ?? topic.module}
**Level:** ${topic.level}
**Status:** ${topic.status}
**Tags:** ${(topic.tags ?? []).join(', ')}

## Prerequisites

${(topic.prerequisites ?? []).map((id) => byId.has(id) ? `- ${topicLink(byId.get(id))}` : `- \`${id}\``).join('\n') || 'なし'}

## 次に学ぶTopic

${next.map(topicLink).join(' / ') || '登録なし'}

## Learning Path

${relatedPaths.map((learningPath) => `[${learningPath.title}](../paths/${learningPath.id})`).join(' / ') || '登録なし'}

## Case Study

${relatedCases.map((study) => `[${study.title}](../case-studies/${study.id})`).join(' / ') || '登録なし'}

## 教材

${artifactLinks(topic)}` }
})
for (const page of topicPages) await write(path.join(kb, 'topics', `${page.topic.id}.md`), page.body)
await write(path.join(kb, 'topics.md'), `# 全Topic

全${topics.length} TopicをDomain・Module・Level・Statusで検索できます。各TopicページにPrerequisite、後続Topic、Learning Path、Case Study、教材リンクをまとめています。

${topics.map((topic) => `- ${topicLink(topic)} — ${topic.domain} / ${topic.module} / ${topic.status}`).join('\n')}`)
console.log(`knowledge-base pages generated: ${topics.length} topic pages, ${domains.length} domain pages, ${paths.length} paths, ${cases.length} case studies`)
