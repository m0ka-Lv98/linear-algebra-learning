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
const linearAlgebra = [["ベクトルと線形結合","la-vectors-linear-combinations"],["行列をデータと線形写像として見る","la-matrices-data-linear-maps"],["行列積","la-matrix-multiplication"],["連立一次方程式とガウス消去法","la-linear-systems-elimination"],["可逆性と逆行列","la-invertibility-inverse-matrices"],["LU分解","la-lu-factorization"],["spanと部分空間","la-span-subspaces"],["列空間と零空間","la-column-space-null-space"],["線形独立と線形従属","la-linear-independence"],["基底・座標・次元","la-basis-coordinates-dimension"],["階数とrank-nullity","la-rank-rank-nullity"],["線形写像と基底変換","la-linear-maps-change-of-basis"],["内積・ノルム・角度","la-inner-products-norms-angles"],["直交基底と正規直交基底","la-orthogonal-orthonormal-bases"],["直交射影","orthogonal-projection"],["Gram–Schmidt法とQR分解","la-gram-schmidt-qr"],["最小二乗法の幾何学","la-least-squares-geometry"],["最小二乗法の計算と擬似逆行列","la-least-squares-computation-pseudoinverse"],["重み付き最小二乗法の導入","la-weighted-least-squares-introduction"],["行列式・体積・可逆性","la-determinants-volume-invertibility"],["固有値と固有ベクトル","la-eigenvalues-eigenvectors"],["対角化と行列の累乗","la-diagonalization-matrix-powers"],["対称行列とスペクトル定理","la-symmetric-matrices-spectral-theorem"],["二次形式と正定値行列","la-quadratic-forms-positive-definite"],["Cholesky分解","la-cholesky-factorization"],["特異値分解","la-singular-value-decomposition"],["擬似逆行列とrank不足の連立方程式","la-pseudoinverse-rank-deficient-systems"],["低ランク近似","la-low-rank-approximation"],["行列ノルムと条件数","la-matrix-norms-condition-number"]]
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
      '/courses/': [{ text: 'Course 00：学習準備', items: items('courses/foundation') }, { text: 'Course 01：微積分 / 一変数', items: calculusSingle.map(([text, id]) => ({ text, link: `/courses/foundation/${id}` })) }, { text: 'Course 01：微積分 / 多変数', items: calculusMulti.map(([text, id]) => ({ text, link: `/courses/foundation/${id}` })) }, { text: 'Course 02：線形代数', items: [{ text: 'ベクトル・行列・連立一次方程式', items: linearAlgebra.slice(0, 6).map(([text, id]) => ({ text, link: `/courses/foundation/${id}` })) }, { text: 'ベクトル空間と線形写像', items: linearAlgebra.slice(6, 12).map(([text, id]) => ({ text, link: `/courses/foundation/${id}` })) }, { text: '直交・射影・最小二乗法', items: linearAlgebra.slice(12, 19).map(([text, id]) => ({ text, link: `/courses/foundation/${id}` })) }, { text: '固有値・対称行列・正定値行列', items: linearAlgebra.slice(19, 25).map(([text, id]) => ({ text, link: `/courses/foundation/${id}` })) }, { text: '特異値分解と低ランク構造', items: linearAlgebra.slice(25).map(([text, id]) => ({ text, link: `/courses/foundation/${id}` })) }] }],
      '/textbook/': [{ text: 'Course 00 教科書', items: items('textbook') }, { text: 'Course 01 教科書', items: [...calculusSingle, ...calculusMulti].map(([text, id]) => ({ text, link: `/textbook/${id}` })) }, { text: 'Course 02 教科書', items: linearAlgebra.map(([text, id]) => ({ text, link: `/textbook/${id}` })) }],
      '/exercises/': [{ text: 'Course 00 演習', items: items('exercises') }, { text: 'Course 01 演習', items: [...calculusSingle, ...calculusMulti].map(([text, id]) => ({ text, link: `/exercises/${id}` })) }, { text: 'Course 02 演習', items: linearAlgebra.map(([text, id]) => ({ text, link: `/exercises/${id}` })) }]
    },
    socialLinks: []
  }
})
