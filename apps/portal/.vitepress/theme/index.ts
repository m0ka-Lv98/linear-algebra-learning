import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import Layout from './Layout.vue'
import HomeResume from './HomeResume.vue'
import CourseOverview from './CourseOverview.vue'
import CourseCatalog from './CourseCatalog.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('HomeResume', HomeResume)
    app.component('CourseOverview', CourseOverview)
    app.component('CourseCatalog', CourseCatalog)
  }
} satisfies Theme
