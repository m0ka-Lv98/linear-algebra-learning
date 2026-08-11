<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useData, withBase } from 'vitepress'

type Entry = { id: string; title: string; course: string; path: string; textbook: string; exercises: string; slides: string }
type Progress = { completedTopicIds?: string[]; currentTopicId?: string; currentSurface?: string; currentPath?: string }
const { frontmatter, site } = useData()
const progress = ref<Progress>({})
const key = 'linear-algebra-learning.progress.v1'
const map = computed<Entry[]>(() => frontmatter.value.uxLearningMap ?? [])
const current = computed(() => map.value.find((entry) => entry.id === progress.value.currentTopicId))
const path = computed(() => {
  const value = progress.value.currentPath || current.value?.path
  if (!value) return undefined
  const base = site.value.base ?? '/'
  return base !== '/' && value.startsWith(base) ? value.slice(base.length - 1) : value
})
const surfaceLabel = computed(() => ({ topic: '概要', slides: 'スライド', textbook: '教科書', exercises: '演習' }[progress.value.currentSurface ?? 'topic'] ?? '概要'))
onMounted(() => {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) ?? '{}') as Progress
    const valid = new Set(map.value.map((entry) => entry.id))
    const completed = (parsed.completedTopicIds ?? []).filter((id) => valid.has(id))
    progress.value = { ...parsed, completedTopicIds: completed }
    if (parsed.currentTopicId && !valid.has(parsed.currentTopicId)) progress.value.currentTopicId = undefined
    localStorage.setItem(key, JSON.stringify(progress.value))
  } catch { progress.value = {} }
})
</script>

<template>
  <section v-if="current && path" class="resume-card">
    <p class="eyebrow">続きから</p>
    <h2>Course {{ current.course }} · {{ current.title }}</h2>
    <p>{{ surfaceLabel }}を学習中</p>
    <a class="vp-button brand" :href="withBase(path)">続きから学ぶ</a>
  </section>
</template>
