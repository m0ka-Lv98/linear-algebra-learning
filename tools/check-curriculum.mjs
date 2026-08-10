import assert from 'node:assert/strict'
import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadCourses, loadCurriculum, validateCourses, validateCurriculum } from './curriculum-schema.mjs'
import { loadTopics } from './content-schema.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

export async function runCurriculumCheck(checkRoot = root) {
  const courses = await loadCourses(checkRoot)
  const curriculum = await loadCurriculum(checkRoot)
  const { topics } = await loadTopics(checkRoot)
  // Planned Knowledge Base entries intentionally have no legacy Course artifacts yet.
  // Keep the compatibility curriculum scoped to authored topics.
  const implementedTopics = topics.filter((topic) => topic.status !== 'planned')
  const courseResult = validateCourses(courses)
  const curriculumResult = validateCurriculum(curriculum, courses, implementedTopics.map((topic) => topic.id))
  const errors = [...courseResult.errors, ...curriculumResult.errors]
  const warnings = [...courseResult.warnings, ...curriculumResult.warnings]
  if (errors.length) throw new Error(errors.join('\n'))
  return { courses: courses.courses, units: curriculum.units, topics: curriculum.topics, implementedTopics, warnings }
}

function fixture() {
  return {
    version: 1,
    courses: [
      { id: '00', slug: 'preparation', title: '準備', layer: 'core', status: 'planned', prerequisites: [], mit_references: [] },
      { id: '01', slug: 'calculus', title: '微積分', layer: 'core', status: 'planned', prerequisites: ['00'], mit_references: [] }
    ]
  }
}

function curriculumFixture(overrides = {}) {
  return {
    version: 1,
    units: [{ id: 'unit-a', course: '00', order: 10, title: 'Unit A' }],
    topics: [{ id: 'topic-a', course: '00', unit: 'unit-a', order: 10, title: 'Topic A', summary: 'Summary', status: 'planned', kind: 'required', prerequisites: [], outcomes: ['one', 'two'] }],
    ...overrides
  }
}

function expectCourseError(courses) { assert.ok(validateCourses(courses).errors.length) }
function expectCurriculumError(curriculum, courses = fixture()) { assert.ok(validateCurriculum(curriculum, courses, []).errors.length) }

async function runTests() {
  const courses = fixture()
  assert.equal(validateCourses(courses).errors.length, 0)
  assert.equal(validateCurriculum(curriculumFixture(), courses, []).errors.length, 0)
  expectCourseError({ ...courses, courses: [{ ...courses.courses[0] }, { ...courses.courses[0] }] })
  expectCourseError({ ...courses, courses: [{ ...courses.courses[0] }, { ...courses.courses[1], slug: 'preparation' }] })
  expectCourseError({ ...courses, courses: [{ ...courses.courses[0], prerequisites: ['99'] }, courses.courses[1]] })
  expectCourseError({ ...courses, courses: [{ ...courses.courses[0], prerequisites: ['00'] }, courses.courses[1]] })
  expectCurriculumError(curriculumFixture({ units: [{ id: 'unit-a', course: '00', order: 10, title: 'A' }, { id: 'unit-a', course: '00', order: 20, title: 'B' }] }))
  expectCurriculumError(curriculumFixture({ units: [{ id: 'unit-a', course: '99', order: 10, title: 'A' }] }))
  expectCurriculumError(curriculumFixture({ units: [{ id: 'unit-a', course: '00', order: 10, title: 'A' }, { id: 'unit-b', course: '00', order: 10, title: 'B' }] }))
  expectCurriculumError(curriculumFixture({ topics: [{ ...curriculumFixture().topics[0] }, { ...curriculumFixture().topics[0] }] }))
  expectCurriculumError(curriculumFixture({ topics: [{ ...curriculumFixture().topics[0], course: '01' }] }))
  expectCurriculumError(curriculumFixture({ topics: [{ ...curriculumFixture().topics[0], prerequisites: ['missing'] }] }))
  expectCurriculumError(curriculumFixture({ topics: [{ ...curriculumFixture().topics[0], prerequisites: ['topic-a'] }] }))
  expectCurriculumError(curriculumFixture({ topics: [{ ...curriculumFixture().topics[0], outcomes: ['one'] }] }))
  expectCurriculumError(curriculumFixture({ topics: [{ ...curriculumFixture().topics[0], outcomes: ['one', 'two', 'three', 'four', 'five', 'six'] }] }))
  expectCurriculumError(curriculumFixture({ topics: [{ ...curriculumFixture().topics[0], implementation_topic: 'missing' }] }), courses)
  const duplicateImplementation = curriculumFixture({ topics: [{ ...curriculumFixture().topics[0], implementation_topic: 'implemented' }, { ...curriculumFixture().topics[0], id: 'topic-b', order: 20, implementation_topic: 'implemented' }] })
  assert.ok(validateCurriculum(duplicateImplementation, courses, ['implemented']).errors.some((error) => error.includes('duplicates')))

  const temp = await mkdtemp(path.join(os.tmpdir(), 'linear-algebra-curriculum-'))
  try {
    await writeFile(path.join(temp, 'fixture.json'), JSON.stringify({ ok: true }))
    assert.ok(temp)
  } finally {
    await rm(temp, { recursive: true, force: true })
  }
  const real = await runCurriculumCheck(root)
  assert.equal(real.courses.length, 11)
  // Unit count is intentionally not fixed: curriculum refactors may split or merge Units
  // without changing the 250-Topic contract. Structural validity is checked by the schema.
  assert.ok(real.units.length >= real.courses.length)
  assert.equal(real.topics.length, 250)
  assert.equal(real.topics.filter((topic) => topic.course === '00').length, 12)
  assert.equal(real.topics.filter((topic) => topic.course === '01').length, 21)
  assert.equal(real.topics.filter((topic) => topic.course === '02').length, 29)
  assert.equal(real.topics.filter((topic) => topic.course === '03').length, 25)
  assert.equal(real.topics.filter((topic) => topic.course === '04').length, 24)
  assert.equal(real.topics.filter((topic) => topic.implementation_topic === 'orthogonal-projection').length, 1)
  console.log('curriculum tests passed (schema, dependencies, implementation mapping)')
}

if (process.argv.includes('--test')) {
  await runTests()
} else {
  const result = await runCurriculumCheck()
  const counts = Object.fromEntries(result.courses.map((course) => [course.id, result.topics.filter((topic) => topic.course === course.id).length]))
  console.log(`Course数: ${result.courses.length}`)
  console.log(`Unit数: ${result.units.length}`)
  console.log(`Topic数: ${result.topics.length}`)
  console.log(`Course別Topic数: ${JSON.stringify(counts)}`)
  console.log(`実装済みTopicとの対応数: ${result.topics.filter((topic) => topic.implementation_topic).length}`)
  console.log(`警告: ${result.warnings.length ? result.warnings.join(' / ') : 'なし'}`)
}
