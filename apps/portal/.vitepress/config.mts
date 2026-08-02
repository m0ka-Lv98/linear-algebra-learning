import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '線形代数学習ポータル',
  description: '線形代数からWLSM、数値線形代数、機械学習へ',
  base: process.env.BASE_PATH ?? '/',
  cleanUrls: true,
  // Slidev is built separately into the combined dist/ directory.
  ignoreDeadLinks: [/^\/(slides|textbook|exercises)\/orthogonal-projection/],
  themeConfig: {
    nav: [{ text: 'ホーム', link: '/' }, { text: 'コース', link: '/courses/' }, { text: '用語集', link: '/glossary/' }],
    sidebar: {
      '/courses/': [{ text: '線形代数の基礎', items: [{ text: '直交射影', link: '/courses/foundation/orthogonal-projection' }] }],
      '/textbook/': [{ text: '教科書', items: [{ text: '直交射影', link: '/textbook/orthogonal-projection' }] }],
      '/exercises/': [{ text: '演習', items: [{ text: '直交射影', link: '/exercises/orthogonal-projection' }] }]
    },
    socialLinks: []
  }
})
