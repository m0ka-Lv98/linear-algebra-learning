<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useData, withBase } from 'vitepress'

const props = defineProps<{ footer?: boolean }>()
const { frontmatter } = useData()
const topic = computed<any>(() => frontmatter.value.uxTopic)
const progress = ref<{ completedTopicIds: string[]; currentTopicId?: string; lastVisitedAt?: string }>({ completedTopicIds: [] })
const key = 'linear-algebra-learning.progress.v1'

function load() {
  try { progress.value = JSON.parse(localStorage.getItem(key) ?? '{"completedTopicIds":[]}') } catch { progress.value = { completedTopicIds: [] } }
}
function save() { localStorage.setItem(key, JSON.stringify(progress.value)) }
function visit() {
  if (!topic.value) return
  progress.value.currentTopicId = topic.value.id
  progress.value.lastVisitedAt = new Date().toISOString()
  save()
}
function completeAndNext() {
  if (!topic.value) return
  if (!progress.value.completedTopicIds.includes(topic.value.id)) progress.value.completedTopicIds.push(topic.value.id)
  progress.value.currentTopicId = topic.value.next?.link ? topic.value.next.link.split('/').pop() : undefined
  progress.value.lastVisitedAt = new Date().toISOString()
  save()
  window.location.href = withBase(topic.value.next?.link ?? topic.value.courseOverview)
}
const isCompleted = computed(() => topic.value && progress.value.completedTopicIds.includes(topic.value.id))
onMounted(() => { load(); visit() })
</script>

<template>
  <div v-if="topic && !props.footer" class="topic-context">
    <nav class="topic-breadcrumb" aria-label="現在位置">
      <a :href="withBase(topic.courseOverview)">Course {{ topic.course }} {{ topic.courseName }}</a>
      <span aria-hidden="true">›</span><a :href="withBase(topic.courseOverview + '#' + topic.id)">{{ topic.unitTitle }}</a>
      <span aria-hidden="true">›</span><span>{{ topic.title }}</span>
    </nav>
    <div class="topic-position">Topic {{ topic.index }} / {{ topic.total }}</div>
    <nav class="learning-stepper" aria-label="学習ステップ">
      <a :href="withBase(topic.slides)">1 概要</a><a :href="withBase(topic.textbook)">2 教科書</a><a :href="withBase(topic.exercises)">3 演習</a>
    </nav>
    <div class="topic-actions">
      <a class="vp-button brand" :href="withBase(topic.textbook)">教科書を読む</a>
      <a class="vp-button" :href="withBase(topic.slides)">スライドで概要を見る</a>
      <a class="vp-button" :href="withBase(topic.exercises)">演習問題を解く</a>
    </div>
  </div>

  <div v-if="topic && props.footer" class="topic-footer">
    <a v-if="topic.previous" :href="withBase(topic.previous.link)">← {{ topic.previous.title }}</a><a v-else :href="withBase(topic.courseOverview)">← Course overview</a>
    <button class="vp-button brand" type="button" @click="completeAndNext">{{ isCompleted ? '完了済み：次へ' : 'このTopicを完了して次へ' }}</button>
    <a v-if="topic.next" :href="withBase(topic.next.link)">{{ topic.next.title }} →</a><a v-else :href="withBase(topic.courseOverview)">Course {{ topic.course }} の一覧へ</a>
  </div>
</template>
