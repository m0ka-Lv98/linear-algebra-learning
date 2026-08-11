<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useData, withBase } from 'vitepress'

type Surface = 'topic' | 'slides' | 'textbook' | 'exercises'
type Progress = { completedTopicIds: string[]; currentTopicId?: string; currentSurface?: Surface; currentPath?: string; lastVisitedAt?: string }
const props = defineProps<{ footer?: boolean }>()
const { frontmatter } = useData()
const topic = computed<any>(() => frontmatter.value.uxTopic)
const progress = ref<Progress>({ completedTopicIds: [] })
const key = 'linear-algebra-learning.progress.v1'

function load() {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) ?? '{}')
    progress.value = { completedTopicIds: parsed.completedTopicIds ?? [], currentTopicId: parsed.currentTopicId, currentSurface: parsed.currentSurface, currentPath: parsed.currentPath, lastVisitedAt: parsed.lastVisitedAt }
  } catch { progress.value = { completedTopicIds: [] } }
}
function save() { localStorage.setItem(key, JSON.stringify(progress.value)) }
function visit() {
  if (!topic.value) return
  progress.value.currentTopicId = topic.value.id
  progress.value.currentSurface = topic.value.surface ?? 'topic'
  progress.value.currentPath = window.location.pathname + window.location.search + window.location.hash
  progress.value.lastVisitedAt = new Date().toISOString()
  save()
}
function completeAndNext() {
  if (!topic.value || topic.value.surface !== 'exercises') return
  if (!progress.value.completedTopicIds.includes(topic.value.id)) progress.value.completedTopicIds.push(topic.value.id)
  progress.value.currentTopicId = topic.value.next?.link ? topic.value.next.link.split('/').pop() : undefined
  progress.value.currentSurface = progress.value.currentTopicId ? 'topic' : undefined
  progress.value.currentPath = progress.value.currentTopicId ? topic.value.next.link : topic.value.courseOverview
  progress.value.lastVisitedAt = new Date().toISOString()
  save()
  window.location.href = withBase(topic.value.next?.link ?? topic.value.courseOverview)
}
const isCompleted = computed(() => topic.value && progress.value.completedTopicIds.includes(topic.value.id))
const surface = computed<Surface>(() => topic.value?.surface ?? 'topic')
const steps = computed(() => [
  { id: 'topic', label: '概要', link: topic.value?.home },
  { id: 'slides', label: 'スライド', link: topic.value?.slides },
  { id: 'textbook', label: '教科書', link: topic.value?.textbook },
  { id: 'exercises', label: '演習', link: topic.value?.exercises }
])
const primary = computed(() => ({
  topic: { label: '学習を始める', link: topic.value?.slides },
  slides: { label: '教科書へ進む', link: topic.value?.textbook },
  textbook: { label: '演習へ進む', link: topic.value?.exercises },
  exercises: { label: isCompleted.value ? '完了済み：次へ' : 'このTopicを完了して次へ', link: undefined }
}[surface.value]))
const secondary = computed(() => ({
  topic: { label: '教科書から読む', link: topic.value?.textbook },
  slides: { label: 'Topicへ戻る', link: topic.value?.home },
  textbook: { label: 'スライドへ戻る', link: topic.value?.slides },
  exercises: { label: '教科書へ戻る', link: topic.value?.textbook }
}[surface.value]))
onMounted(() => { load(); visit() })
</script>

<template>
  <div v-if="topic && !props.footer" class="topic-context">
    <nav class="topic-breadcrumb" aria-label="現在位置">
      <a :href="withBase(topic.courseOverview)">Course {{ topic.course }} {{ topic.courseName }}</a>
      <span aria-hidden="true">›</span><a :href="withBase(`${topic.courseOverview}#unit-${topic.unitId ?? topic.unitTitle}`)">{{ topic.unitTitle }}</a>
      <span aria-hidden="true">›</span><span>{{ topic.title }}</span>
    </nav>
    <div class="topic-position">Topic {{ topic.index }} / {{ topic.total }}</div>
    <nav class="learning-stepper" aria-label="学習ステップ">
      <a v-for="step in steps" :key="step.id" :href="step.id === surface ? undefined : withBase(step.link)" :aria-current="step.id === surface ? 'page' : undefined" :class="{ active: step.id === surface }">{{ step.label }}</a>
    </nav>
    <div class="topic-actions">
      <a v-if="primary.link" class="vp-button brand" :href="withBase(primary.link)">{{ primary.label }}</a>
      <button v-else class="vp-button brand" type="button" @click="completeAndNext">{{ primary.label }}</button>
      <a v-if="secondary.link" class="vp-button" :href="withBase(secondary.link)">{{ secondary.label }}</a>
      <span v-if="isCompleted && surface !== 'exercises'" class="completed-badge">✓ 完了済み</span>
    </div>
  </div>

  <div v-if="topic && props.footer && surface === 'exercises'" class="topic-footer">
    <a v-if="topic.previous" :href="withBase(topic.previous.link)">← {{ topic.previous.title }}</a><a v-else :href="withBase(topic.courseOverview)">← Course overview</a>
    <button class="vp-button brand" type="button" @click="completeAndNext">{{ isCompleted ? '完了済み：次へ' : 'このTopicを完了して次へ' }}</button>
    <a v-if="topic.next" :href="withBase(topic.next.link)">{{ topic.next.title }} →</a><a v-else :href="withBase(topic.courseOverview)">Course {{ topic.course }} の一覧へ</a>
  </div>
</template>
