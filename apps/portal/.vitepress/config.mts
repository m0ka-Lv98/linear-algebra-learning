import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '線形代数学習ポータル',
  description: '線形代数からWLSM、数値線形代数、機械学習へ',
  base: process.env.BASE_PATH ?? '/',
  cleanUrls: true,
  // Slidev is built separately into the combined dist/ directory.
  ignoreDeadLinks: [/^\/(slides|textbook|exercises)\/(orthogonal-projection|prep-symbols-types-shapes|prep-sets-functions-mappings|prep-sums-products-indices)/],
  themeConfig: {
    nav: [{ text: 'ホーム', link: '/' }, { text: 'コース', link: '/courses/' }, { text: '用語集', link: '/glossary/' }],
    sidebar: {
      '/courses/': [{ text: '学習準備', items: [{ text: '数式・記号・型・次元', link: '/courses/foundation/prep-symbols-types-shapes' }, { text: '集合・関数・写像', link: '/courses/foundation/prep-sets-functions-mappings' }, { text: '総和・積・添字', link: '/courses/foundation/prep-sums-products-indices' }] }, { text: '線形代数の基礎', items: [{ text: '直交射影', link: '/courses/foundation/orthogonal-projection' }] }],
      '/textbook/': [{ text: '教科書', items: [{ text: '数式・記号・型・次元', link: '/textbook/prep-symbols-types-shapes' }, { text: '集合・関数・写像', link: '/textbook/prep-sets-functions-mappings' }, { text: '総和・積・添字', link: '/textbook/prep-sums-products-indices' }, { text: '直交射影', link: '/textbook/orthogonal-projection' }] }],
      '/exercises/': [{ text: '演習', items: [{ text: '数式・記号・型・次元', link: '/exercises/prep-symbols-types-shapes' }, { text: '集合・関数・写像', link: '/exercises/prep-sets-functions-mappings' }, { text: '総和・積・添字', link: '/exercises/prep-sums-products-indices' }, { text: '直交射影', link: '/exercises/orthogonal-projection' }] }]
    },
    socialLinks: []
  }
})
