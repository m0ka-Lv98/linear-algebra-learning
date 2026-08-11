<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useData, withBase } from 'vitepress'

type Course = { course: string; name: string; description: string; topicCount: number; unitCount: number; firstPath: string; topicIds: string[] }
const { frontmatter } = useData()
const courses = computed<Course[]>(() => frontmatter.value.uxCatalog ?? [])
const completedIds = ref<string[]>([])
onMounted(() => { try { completedIds.value = JSON.parse(localStorage.getItem('linear-algebra-learning.progress.v1') ?? '{}').completedTopicIds ?? [] } catch {} })
const groups = computed(() => [
  { title: '基礎', courses: courses.value.filter((course) => ['00', '01', '02', '03', '04'].includes(course.course)) },
  { title: '数値・データ解析', courses: courses.value.filter((course) => ['05', '06', '07'].includes(course.course)) },
  { title: 'AI', courses: courses.value.filter((course) => ['08', '09', '10'].includes(course.course)) }
])
function completedCount(course: Course) { return course.topicIds.filter((id) => completedIds.value.includes(id)).length }
</script>

<template>
  <div class="course-catalog">
    <section v-for="group in groups" :key="group.title" class="catalog-group">
      <h2>{{ group.title }}</h2>
      <div class="course-card-grid">
        <article v-for="course in group.courses" :key="course.course" class="course-card">
          <p class="eyebrow">Course {{ course.course }}</p>
          <h3>{{ course.name }}</h3>
          <p class="course-card-meta">{{ course.topicCount }} Topics · {{ course.unitCount }} Units</p>
          <p v-if="completedCount(course)">{{ completedCount(course) }} Topics 完了</p>
          <p>{{ course.description }}</p>
          <a class="vp-button brand" :href="withBase(`/courses/${course.course}/`)">開く</a>
        </article>
      </div>
    </section>
  </div>
</template>
