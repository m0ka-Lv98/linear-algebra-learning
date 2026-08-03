import { defineConfig } from 'vitepress'

const topics = [
  ['数式・記号・型・次元', 'prep-symbols-types-shapes'],
  ['集合・関数・写像', 'prep-sets-functions-mappings'],
  ['総和・積・添字', 'prep-sums-products-indices'],
  ['指数と対数', 'prep-exponents-logarithms'],
  ['定義・命題・証明の読み方', 'prep-definitions-theorems-proofs'],
  ['Pythonの式・変数・関数', 'prep-python-expressions-functions'],
  ['NumPy配列・shape・indexing', 'prep-numpy-arrays-shapes'],
  ['数値検算と再現性', 'prep-numerical-checks-reproducibility']
]
const items = (prefix: string) => topics.map(([text, id]) => ({ text, link: `/${prefix}/${id}` }))

export default defineConfig({
  title: '線形代数学習ポータル',
  description: '線形代数からWLSM、数値線形代数、機械学習へ',
  base: process.env.BASE_PATH ?? '/',
  cleanUrls: true,
  ignoreDeadLinks: [/^\/(slides|textbook|exercises)\//],
  themeConfig: {
    nav: [{ text: 'ホーム', link: '/' }, { text: 'コース', link: '/courses/' }, { text: '用語集', link: '/glossary/' }],
    sidebar: {
      '/courses/': [{ text: 'Course 00：学習準備', items: items('courses/foundation') }, { text: '線形代数の基礎', items: [{ text: '直交射影', link: '/courses/foundation/orthogonal-projection' }] }],
      '/textbook/': [{ text: 'Course 00 教科書', items: items('textbook') }, { text: '線形代数', items: [{ text: '直交射影', link: '/textbook/orthogonal-projection' }] }],
      '/exercises/': [{ text: 'Course 00 演習', items: items('exercises') }, { text: '線形代数', items: [{ text: '直交射影', link: '/exercises/orthogonal-projection' }] }]
    },
    socialLinks: []
  }
})
