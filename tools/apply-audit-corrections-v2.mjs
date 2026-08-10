import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { parse, stringify } from 'yaml'

const root = process.cwd()
const curriculumPath = path.join(root, 'content/curriculum.yml')
const topicsPath = path.join(root, 'content/topics.yml')
const curriculum = parse(await readFile(curriculumPath, 'utf8'))
const topicData = parse(await readFile(topicsPath, 'utf8'))
const implTopics = Array.isArray(topicData) ? topicData : topicData.topics

const byId = new Map(curriculum.topics.map((t) => [t.id, t]))
const implById = new Map(implTopics.map((t) => [t.id, t]))

function requireTopic(id) {
  const t = byId.get(id)
  if (!t) throw new Error(`missing curriculum topic: ${id}`)
  return t
}
function ensureUnit(unit) {
  let found = curriculum.units.find((u) => u.id === unit.id)
  if (!found) {
    curriculum.units.push(unit)
    found = unit
  } else {
    Object.assign(found, unit)
  }
  return found
}
function setPrerequisites(id, prerequisites) {
  requireTopic(id).prerequisites = [...prerequisites]
  const impl = implById.get(id)
  if (impl) impl.prerequisites = [...prerequisites]
}
function orderUnit(unitId, preferredIds) {
  const members = curriculum.topics.filter((t) => t.unit === unitId)
  const preferred = preferredIds.map((id) => requireTopic(id)).filter((t) => t.unit === unitId)
  const preferredSet = new Set(preferred.map((t) => t.id))
  const rest = members.filter((t) => !preferredSet.has(t.id)).sort((a,b) => a.order - b.order)
  const target = [...preferred, ...rest]
  target.forEach((t,i) => { t.order = (i+1)*10 })
}
function orderCourseExplicit(course, ids, unitAssignments = {}) {
  const set = new Set(ids)
  const members = curriculum.topics.filter((t) => t.course === course)
  if (members.length !== ids.length || members.some((t) => !set.has(t.id))) {
    const missing = members.filter((t)=>!set.has(t.id)).map((t)=>t.id)
    const absent = ids.filter((id)=>!members.some((t)=>t.id===id))
    throw new Error(`explicit order mismatch for Course ${course}; unexpected=${missing}; absent=${absent}`)
  }
  for (const [id, unit] of Object.entries(unitAssignments)) requireTopic(id).unit = unit
  // Renumber within each unit according to the explicit global sequence.
  const grouped = new Map()
  for (const id of ids) {
    const t=requireTopic(id)
    if (!grouped.has(t.unit)) grouped.set(t.unit,[])
    grouped.get(t.unit).push(t)
  }
  for (const list of grouped.values()) list.forEach((t,i)=>{t.order=(i+1)*10})
}

// Course 01: every prerequisite must appear before the dependent topic.
const calcOrder = [
  'calc-functions-limits-continuity',
  'calc-derivatives-rates',
  'calc-differentiation-rules-chain-rule',
  'calc-implicit-inverse-functions',
  'calc-mean-value-theorem',
  'calc-one-variable-optimization',
  'calc-integrals-fundamental-theorem',
  'calc-taylor-approximation',
  'calc-infinite-series-convergence',
  'calc-taylor-series-remainder',
  'calc-multivariable-functions-partial-derivatives',
  'calc-gradient-directional-derivative',
  'calc-total-derivative-jacobian',
  'calc-hessian-second-order',
  'calc-multivariable-chain-rule',
  'calc-unconstrained-optimization',
  'calc-lagrange-multipliers',
  'calc-parametric-polar-curves',
  'calc-multiple-integrals',
  'calc-change-of-variables-jacobian',
  'calc-vector-fields-line-integrals',
]
const calcAssignments = Object.fromEntries(calcOrder.map((id,i)=>[id, i < 10 ? 'calc-single-variable' : 'calc-multivariable']))
orderCourseExplicit('01', calcOrder, calcAssignments)

// Course 08: RL is a separate final unit, not interleaved with supervised learning.
ensureUnit({ id:'ml-reinforcement-learning', course:'08', order:50, title:'強化学習' })
const rlIds = [
  'ml-mdp-bellman-equations',
  'ml-dynamic-programming-value-policy-iteration',
  'ml-monte-carlo-td-q-learning',
  'ml-policy-gradient-reinforce',
]
rlIds.forEach((id,i)=>{ const t=requireTopic(id); t.unit='ml-reinforcement-learning'; t.order=(i+1)*10 })

// Course 09: Deep RL follows the classical RL unit and lives after architecture/generative foundations.
ensureUnit({ id:'dl-reinforcement-learning', course:'09', order:35, title:'Deep Reinforcement Learning' })
const drl=requireTopic('dl-deep-reinforcement-learning'); drl.unit='dl-reinforcement-learning'; drl.order=10

// Course 10: understand SFT before parameter-efficient ways of doing fine-tuning.
const sft=requireTopic('frontier-supervised-finetuning-instruction-tuning')
const peft=requireTopic('frontier-parameter-efficient-finetuning')
const dpo=requireTopic('frontier-rlhf-preference-optimization')
const rlvr=requireTopic('frontier-reasoning-rl-rlvr')
sft.unit='frontier-foundation-models'
peft.unit='frontier-foundation-models'
dpo.unit='frontier-foundation-models'
rlvr.unit='frontier-foundation-models'
setPrerequisites('frontier-supervised-finetuning-instruction-tuning', ['dl-transformers'])
setPrerequisites('frontier-parameter-efficient-finetuning', ['frontier-supervised-finetuning-instruction-tuning'])
setPrerequisites('frontier-rlhf-reward-model-ppo-kl', [
  'frontier-supervised-finetuning-instruction-tuning',
  'ml-logistic-regression',
  'ml-policy-gradient-reinforce',
  'dl-deep-reinforcement-learning',
])
setPrerequisites('frontier-rlhf-preference-optimization', [
  'frontier-rlhf-reward-model-ppo-kl',
  'ml-logistic-regression',
])
setPrerequisites('frontier-reasoning-rl-rlvr', [
  'frontier-rlhf-reward-model-ppo-kl',
  'ml-policy-gradient-reinforce',
])

// Preserve the existing foundation-model topics, but force this conceptual subsequence.
const foundationMembers = curriculum.topics.filter((t)=>t.unit==='frontier-foundation-models').sort((a,b)=>a.order-b.order)
const special = [
  'frontier-supervised-finetuning-instruction-tuning',
  'frontier-parameter-efficient-finetuning',
  'frontier-rlhf-reward-model-ppo-kl',
  'frontier-rlhf-preference-optimization',
  'frontier-reasoning-rl-rlvr',
]
const specialSet=new Set(special)
const other=foundationMembers.filter((t)=>!specialSet.has(t.id))
// Insert SFT sequence after in-context learning if present; otherwise at the end.
const anchor=other.findIndex((t)=>t.id==='frontier-in-context-learning-prompting')
const ordered = anchor>=0 ? [...other.slice(0,anchor+1), ...special.map(requireTopic), ...other.slice(anchor+1)] : [...other,...special.map(requireTopic)]
ordered.forEach((t,i)=>{t.order=(i+1)*10})

// Renumber implementation-topic order bands to match curriculum order inside each course.
const prefixBand={prep:0,calc:100,la:200,prob:300,stat:300,dm:400,num:500,opt:600,mat:700,ml:800,dl:900,frontier:1000}
for (const course of [...new Set(curriculum.topics.map((t)=>t.course))]) {
  const units=curriculum.units.filter((u)=>u.course===course).sort((a,b)=>a.order-b.order)
  const unitRank=new Map(units.map((u,i)=>[u.id,i]))
  const orderedTopics=curriculum.topics.filter((t)=>t.course===course).sort((a,b)=>(unitRank.get(a.unit)-unitRank.get(b.unit)) || a.order-b.order)
  let n=0
  for (const ct of orderedTopics) {
    const impl=implById.get(ct.implementation_topic ?? ct.id)
    if (!impl) continue
    n += 1
    const prefix=impl.id.split('-')[0]
    impl.order=(prefixBand[prefix] ?? 2000)+n
  }
}

await writeFile(curriculumPath, stringify(curriculum,{lineWidth:0}), 'utf8')
if (Array.isArray(topicData)) await writeFile(topicsPath, stringify(implTopics,{lineWidth:0}), 'utf8')
else { topicData.topics=implTopics; await writeFile(topicsPath,stringify(topicData,{lineWidth:0}),'utf8') }
console.log('audit corrections v2 applied: calculus order, RL units, SFT→PEFT→RLHF sequence')
