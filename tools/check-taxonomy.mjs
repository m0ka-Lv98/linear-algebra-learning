import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse } from 'yaml'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const load = async (name) => parse(await readFile(path.join(root, 'content', name), 'utf8'))

export function validateTaxonomy({ categories, domains, modules, topics, paths, caseStudies }) {
  const errors = [], warnings = []
  const unique = (items, label) => {
    const seen = new Set()
    for (const item of items ?? []) {
      if (!item?.id) errors.push(`${label}: missing id`)
      else if (seen.has(item.id)) errors.push(`${label}: duplicate ${item.id}`)
      else seen.add(item.id)
    }
    return seen
  }
  const categoryIds = unique(categories.categories, 'categories')
  const domainIds = unique(domains.domains, 'domains')
  const moduleIds = unique(modules.modules, 'modules')
  const topicIds = unique(topics, 'topics')
  for (const domain of domains.domains) {
    if (!categoryIds.has(domain.category)) errors.push(`domain ${domain.id}: unknown category ${domain.category}`)
  }
  for (const module of modules.modules) {
    if (!domainIds.has(module.domain)) errors.push(`module ${module.id}: unknown domain ${module.domain}`)
  }
  const moduleDomain = new Map(modules.modules.map((module) => [module.id, module.domain]))
  for (const topic of topics) {
    if (!domainIds.has(topic.domain)) errors.push(`topic ${topic.id}: unknown domain ${topic.domain}`)
    if (!moduleIds.has(topic.module)) errors.push(`topic ${topic.id}: unknown module ${topic.module}`)
    if (moduleDomain.get(topic.module) !== topic.domain) errors.push(`topic ${topic.id}: module ${topic.module} does not belong to ${topic.domain}`)
    const seen = new Set()
    for (const prerequisite of topic.prerequisites ?? []) {
      if (seen.has(prerequisite)) errors.push(`topic ${topic.id}: duplicate prerequisite ${prerequisite}`)
      seen.add(prerequisite)
      if (!topicIds.has(prerequisite)) errors.push(`topic ${topic.id}: unknown prerequisite ${prerequisite}`)
      if (prerequisite === topic.id) errors.push(`topic ${topic.id}: self prerequisite`)
    }
  }
  const graph = new Map(topics.map((topic) => [topic.id, topic.prerequisites ?? []]))
  const visiting = new Set(), visited = new Set()
  const visit = (id, trail = []) => {
    if (visiting.has(id)) { errors.push(`prerequisite cycle: ${[...trail, id].join(' -> ')}`); return }
    if (visited.has(id)) return
    visiting.add(id); for (const prerequisite of graph.get(id) ?? []) if (graph.has(prerequisite)) visit(prerequisite, [...trail, id]); visiting.delete(id); visited.add(id)
  }
  for (const id of graph.keys()) visit(id)
  for (const learningPath of paths.paths ?? []) {
    const pathTopics = learningPath.topics ?? []
    const positions = new Map(pathTopics.map((id, index) => [id, index]))
    for (const id of pathTopics) if (!topicIds.has(id)) errors.push(`path ${learningPath.id}: unknown topic ${id}`)
    for (const id of pathTopics) for (const prerequisite of graph.get(id) ?? []) if (positions.has(prerequisite) && positions.get(prerequisite) >= positions.get(id)) errors.push(`path ${learningPath.id}: prerequisite ${prerequisite} appears after ${id}`)
  }
  for (const study of caseStudies.case_studies ?? []) {
    if (!domainIds.has(study.domain)) errors.push(`case study ${study.id}: unknown domain ${study.domain}`)
    for (const id of study.requires ?? []) if (!topicIds.has(id)) errors.push(`case study ${study.id}: unknown required topic ${id}`)
  }
  const referencedModules = new Set(topics.map((topic) => topic.module))
  for (const module of modules.modules) if (!referencedModules.has(module.id)) warnings.push(`orphan module: ${module.id}`)
  return { errors, warnings, topicCount: topics.length, pathCount: paths.paths?.length ?? 0, caseStudyCount: caseStudies.case_studies?.length ?? 0 }
}

export async function runTaxonomyCheck() {
  const data = { categories: await load('categories.yml'), domains: await load('domains.yml'), modules: await load('modules.yml'), topics: await load('topics.yml'), paths: await load('paths.yml'), caseStudies: await load('case-studies.yml') }
  const result = validateTaxonomy(data)
  if (result.errors.length) throw new Error(result.errors.join('\n'))
  return result
}

if (process.argv.includes('--test')) {
  const good = validateTaxonomy({ categories: { categories: [{ id: 'a' }] }, domains: { domains: [{ id: 'd', category: 'a' }] }, modules: { modules: [{ id: 'm', domain: 'd' }] }, topics: [{ id: 'x', domain: 'd', module: 'm', prerequisites: [] }], paths: { paths: [{ id: 'p', topics: ['x'] }] }, caseStudies: { case_studies: [] } })
  assert.equal(good.errors.length, 0)
  const bad = validateTaxonomy({ categories: { categories: [{ id: 'a' }] }, domains: { domains: [{ id: 'd', category: 'a' }] }, modules: { modules: [{ id: 'm', domain: 'd' }] }, topics: [{ id: 'x', domain: 'd', module: 'm', prerequisites: ['x'] }], paths: { paths: [] }, caseStudies: { case_studies: [] } })
  assert.ok(bad.errors.some((error) => error.includes('self prerequisite')))
  console.log('taxonomy tests passed (references, DAG, path order)')
} else {
  const result = await runTaxonomyCheck()
  console.log(`taxonomy checks passed (${result.topicCount} topics, ${result.pathCount} paths, ${result.caseStudyCount} case studies)`)
  for (const warning of result.warnings) console.warn(`warning: ${warning}`)
}
