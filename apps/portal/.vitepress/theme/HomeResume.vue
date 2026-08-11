<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { withBase } from 'vitepress'
const item = ref<string>()
const key = 'linear-algebra-learning.progress.v1'
onMounted(() => { try { item.value = JSON.parse(localStorage.getItem(key) ?? '{}').currentTopicId } catch {} })
</script>

<template>
  <section v-if="item" class="resume-card">
    <p class="eyebrow">続きから</p>
    <h2>前回のTopicへ戻る</h2>
    <a class="vp-button brand" :href="withBase(`/courses/foundation/${item}`)">続きから学ぶ</a>
  </section>
</template>
