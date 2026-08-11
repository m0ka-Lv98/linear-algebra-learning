import { readFileSync } from 'node:fs'
import { defineConfig } from 'vitepress'
import { parse } from 'yaml'

const base = process.env.BASE_PATH ?? '/'
const curriculum = parse(readFileSync(new URL('../../../content/curriculum.yml', import.meta.url), 'utf8'))
const units = curriculum.units ?? []
const topics = curriculum.topics ?? []
const taxonomyTopics = parse(readFileSync(new URL('../../../content/topics.yml', import.meta.url), 'utf8'))
const courseNames: Record<string, string> = {
  '00': '学習準備', '01': '微積分', '02': '線形代数', '03': '確率統計',
  '04': '離散数学と証明', '05': '数値計算', '06': '最適化',
  '07': 'データ解析の行列手法', '08': '機械学習', '09': '深層学習', '10': 'Frontier'
}
const courseIds = [...new Set(topics.map((topic: any) => String(topic.course).padStart(2, '0')))].sort()
const topicPath = (topic: any) => `/courses/foundation/${topic.implementation_topic ?? topic.id}`
const courseSidebar = courseIds.map((course) => ({
  text: `Course ${course}：${courseNames[course] ?? ''}`,
  collapsed: true,
  items: units.filter((unit: any) => String(unit.course).padStart(2, '0') === course).sort((a: any, b: any) => a.order - b.order).map((unit: any) => ({
    text: unit.title,
    collapsed: true,
    items: topics.filter((topic: any) => topic.unit === unit.id).sort((a: any, b: any) => a.order - b.order).map((topic: any) => ({ text: topic.title, link: topicPath(topic) }))
  }))
}))
const allTopicPages = topics.slice().sort((a: any, b: any) => String(a.course).localeCompare(String(b.course)) || a.order - b.order)

function uxTopicForPath(path: string) {
  const match = path.match(/^\/(?:courses\/foundation|textbook|exercises)\/(.+?)(?:\.html)?\/?$/)
  if (!match) return undefined
  const id = match[1]
  const topic = topics.find((candidate: any) => (candidate.implementation_topic ?? candidate.id) === id)
  if (!topic) {
    const reference = taxonomyTopics.find((candidate: any) => candidate.id === id && candidate.delivery === 'knowledge-base')
    if (!reference) return undefined
    return {
      id, title: reference.title, course: 'KB', courseName: 'Knowledge Base', unitTitle: reference.module ?? reference.domain,
      index: 0, total: 0, home: `/knowledge-base/topics/${id}`, textbook: `/textbook/${id}`, exercises: `/exercises/${id}`, slides: `/slides/${id}/`,
      courseOverview: '/knowledge-base/topics'
    }
  }
  const course = String(topic.course).padStart(2, '0')
  const courseTopics = allTopicPages.filter((candidate: any) => String(candidate.course).padStart(2, '0') === course)
  const index = courseTopics.findIndex((candidate: any) => (candidate.implementation_topic ?? candidate.id) === id)
  const unit = units.find((candidate: any) => candidate.id === topic.unit)
  const previous = index > 0 ? courseTopics[index - 1] : undefined
  const next = index >= 0 && index < courseTopics.length - 1 ? courseTopics[index + 1] : undefined
  return {
    id, title: topic.title, course, courseName: courseNames[course] ?? `Course ${course}`,
    unitTitle: unit?.title ?? 'Course overview', index: index + 1, total: courseTopics.length,
    home: topicPath(topic), textbook: `/textbook/${id}`, exercises: `/exercises/${id}`, slides: `/slides/${id}/`,
    previous: previous ? { title: previous.title, link: topicPath(previous) } : undefined,
    next: next ? { title: next.title, link: topicPath(next) } : undefined,
    courseOverview: `/courses/${course}/`, nextCourse: course === '10' ? undefined : `/courses/${String(Number(course) + 1).padStart(2, '0')}/`
  }
}

export default defineConfig({
  title: '数学・データ解析・AI学習ポータル',
  description: '基礎数学から数値計算、最適化、機械学習、深層学習、Frontierへ',
  base,
  cleanUrls: true,
  head: [['style', {}, `.VPLocalNavOutlineDropdown { display: none !important; }`]],
  transformPageData(pageData) {
    const uxTopic = uxTopicForPath(`/${pageData.relativePath.replace(/\.md$/, '')}`)
    if (uxTopic) pageData.frontmatter.uxTopic = uxTopic
  },
  markdown: {
    math: true,
    config(md) {
      const defaultLinkOpen = md.renderer.rules.link_open ?? ((tokens, idx, options, _env, self) => self.renderToken(tokens, idx, options))
      md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
        const href = tokens[idx].attrGet('href')
        if (href?.startsWith('/slides/')) {
          const prefix = base === '/' ? '' : base.replace(/\/$/, '')
          tokens[idx].attrSet('href', `${prefix}${href}`)
          tokens[idx].attrSet('target', '_self')
        }
        return defaultLinkOpen(tokens, idx, options, env, self)
      }
    }
  },
  ignoreDeadLinks: [/^\/(slides|textbook|exercises)\//],
  themeConfig: {
    aside: false,
    outline: false,
    search: { provider: 'local' },
    nav: [
      { text: 'コース', link: '/courses/' },
      { text: 'Topicを探す', link: '/knowledge-base/topics' },
      { text: 'Knowledge Base', items: [
        { text: '数学分野から探す', link: '/knowledge-base/domains' },
        { text: '目的から学ぶ', link: '/knowledge-base/paths' },
        { text: '応用から探す', link: '/knowledge-base/case-studies' },
        { text: '全Topic', link: '/knowledge-base/topics' }
      ] }
    ],
    sidebar: {
      '/courses/': courseSidebar,
      '/textbook/': courseSidebar.map((group) => ({ ...group, text: `${group.text} 教科書`, items: group.items?.map((unit: any) => ({ ...unit, items: unit.items?.map((item: any) => ({ ...item, link: `/textbook/${item.link.split('/').pop()}` })) })) })),
      '/exercises/': courseSidebar.map((group) => ({ ...group, text: `${group.text} 演習`, items: group.items?.map((unit: any) => ({ ...unit, items: unit.items?.map((item: any) => ({ ...item, link: `/exercises/${item.link.split('/').pop()}` })) })) }))
    },
    socialLinks: []
  }
})
