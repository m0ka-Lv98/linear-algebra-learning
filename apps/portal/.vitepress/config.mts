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
const calculusSingle = [
  ['関数・極限・連続', 'calc-functions-limits-continuity'], ['微分と変化率', 'calc-derivatives-rates'], ['微分法則と一変数の連鎖律', 'calc-differentiation-rules-chain-rule'], ['一変数の最適化', 'calc-one-variable-optimization'], ['積分と微積分学の基本定理', 'calc-integrals-fundamental-theorem'], ['Taylor展開と局所近似', 'calc-taylor-approximation']
]
const calculusMulti = [
  ['多変数関数と偏微分', 'calc-multivariable-functions-partial-derivatives'], ['勾配と方向微分', 'calc-gradient-directional-derivative'], ['全微分とJacobian', 'calc-total-derivative-jacobian'], ['Hessianと二次近似', 'calc-hessian-second-order'], ['多変数の連鎖律', 'calc-multivariable-chain-rule'], ['多変数の制約なし最適化', 'calc-unconstrained-optimization'], ['Lagrange乗数法', 'calc-lagrange-multipliers']
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
      '/courses/': [{ text: 'Course 00：学習準備', items: items('courses/foundation') }, { text: 'Course 01：微積分 / 一変数', items: calculusSingle.map(([text, id]) => ({ text, link: `/courses/foundation/${id}` })) }, { text: 'Course 01：微積分 / 多変数', items: calculusMulti.map(([text, id]) => ({ text, link: `/courses/foundation/${id}` })) }, { text: 'Course 02：線形代数', items: [{ text: '直交射影', link: '/courses/foundation/orthogonal-projection' }] }],
      '/textbook/': [{ text: 'Course 00 教科書', items: items('textbook') }, { text: 'Course 01 教科書', items: [...calculusSingle, ...calculusMulti].map(([text, id]) => ({ text, link: `/textbook/${id}` })) }, { text: '線形代数', items: [{ text: '直交射影', link: '/textbook/orthogonal-projection' }] }],
      '/exercises/': [{ text: 'Course 00 演習', items: items('exercises') }, { text: 'Course 01 演習', items: [...calculusSingle, ...calculusMulti].map(([text, id]) => ({ text, link: `/exercises/${id}` })) }, { text: '線形代数', items: [{ text: '直交射影', link: '/exercises/orthogonal-projection' }] }]
    },
    socialLinks: []
  }
})
