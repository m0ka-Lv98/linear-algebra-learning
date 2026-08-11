<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useData, withBase } from 'vitepress'

type Topic = { id: string; title: string; unit: string; unitTitle: string; index: number; total: number; link: string }
type Course = { course: string; name: string; topics: Topic[]; units: { id: string; title: string }[] }
type Progress = { completedTopicIds: string[]; currentTopicId?: string; currentSurface?: string; currentPath?: string; lastVisitedAt?: string }

const { frontmatter } = useData()
const course = computed<Course>(() => frontmatter.value.uxCourse)
const progress = ref<Progress>({ completedTopicIds: [] })
const key = 'linear-algebra-learning.progress.v1'

function load() {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) ?? '{}')
    const valid = new Set(course.value?.topics.map((topic) => topic.id) ?? [])
    progress.value = {
      ...parsed,
      completedTopicIds: (parsed.completedTopicIds ?? []).filter((id: string) => valid.has(id))
    }
    if (parsed.currentTopicId && !valid.has(parsed.currentTopicId)) progress.value.currentTopicId = undefined
    localStorage.setItem(key, JSON.stringify(progress.value))
  } catch { progress.value = { completedTopicIds: [] } }
}

onMounted(load)
const completed = computed(() => new Set(progress.value.completedTopicIds))
const completedCount = computed(() => course.value?.topics.filter((topic) => completed.value.has(topic.id)).length ?? 0)
const percent = computed(() => course.value?.topics.length ? Math.round(completedCount.value / course.value.topics.length * 100) : 0)
const current = computed(() => course.value?.topics.find((topic) => topic.id === progress.value.currentTopicId))
const firstIncomplete = computed(() => course.value?.topics.find((topic) => !completed.value.has(topic.id)))
const resume = computed(() => current.value ?? firstIncomplete.value ?? course.value?.topics[0])
const units = computed(() => (course.value?.units ?? []).map((unit) => ({
  ...unit,
  topics: course.value.topics.filter((topic) => topic.unit === unit.id),
  done: course.value.topics.filter((topic) => topic.unit === unit.id && completed.value.has(topic.id)).length
})))

function status(topic: Topic) {
  if (completed.value.has(topic.id)) return 'completed'
  if (topic.id === progress.value.currentTopicId) return 'current'
  return 'not-started'
}
</script>

<template>
  <div v-if="course" class="course-overview">
    <section class="course-progress-card" aria-labelledby="course-progress-title">
      <div>
        <p class="eyebrow">Course {{ course.course }}</p>
        <h2 id="course-progress-title">{{ course.name }}</h2>
        <p><strong>{{ completedCount }} / {{ course.topics.length }} Topics 完了</strong></p>
      </div>
      <div class="progress-meter" role="progressbar" :aria-valuenow="percent" aria-valuemin="0" aria-valuemax="100">
        <div class="progress-meter-bar" :style="{ width: `${percent}%` }"></div>
      </div>
      <p class="progress-percent">{{ percent }}%</p>
      <a class="vp-button brand" :href="withBase(resume?.link ?? '/')">{{ completedCount ? '続きから学ぶ' : '最初から学ぶ' }}</a>
    </section>

    <section v-for="unit in units" :id="`unit-${unit.id}`" :key="unit.id" class="course-unit" :aria-labelledby="`unit-title-${unit.id}`">
      <div class="course-unit-heading">
        <h2 :id="`unit-title-${unit.id}`">{{ unit.title }}</h2>
        <span>{{ unit.done }} / {{ unit.topics.length }} 完了</span>
      </div>
      <ol class="topic-list">
        <li v-for="topic in unit.topics" :key="topic.id" :class="`topic-row topic-row-${status(topic)}`">
          <span class="topic-state" aria-hidden="true">{{ status(topic) === 'completed' ? '✓' : status(topic) === 'current' ? '▶' : '○' }}</span>
          <a :href="withBase(topic.link)"><span class="topic-number">{{ topic.index }}</span> {{ topic.title }}</a>
          <span class="sr-only">{{ status(topic) === 'completed' ? 'completed' : status(topic) === 'current' ? 'current' : 'not started' }}</span>
        </li>
      </ol>
    </section>

    <div v-if="completedCount === course.topics.length" class="course-complete" role="status">
      <strong>Course {{ course.course }} を完了しました</strong>
      <div><a class="vp-button" :href="withBase(`/courses/${course.course}/`)">Courseを振り返る</a></div>
    </div>
  </div>
</template>
