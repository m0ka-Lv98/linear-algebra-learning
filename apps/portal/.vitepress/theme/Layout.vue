<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import TopicContext from './TopicContext.vue'
</script>

<template>
  <DefaultTheme.Layout>
    <template #doc-before><TopicContext /></template>
    <template #doc-after><TopicContext :footer="true" /></template>
  </DefaultTheme.Layout>
</template>
