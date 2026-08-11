import { mkdir, writeFile, readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse } from 'yaml'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const curriculum = parse(await readFile(path.join(root, 'content/curriculum.yml'), 'utf8'))
const names = { '00': '学習準備', '01': '微積分', '02': '線形代数', '03': '確率統計', '04': '離散数学と証明', '05': '数値計算', '06': '最適化', '07': 'データ解析の行列手法', '08': '機械学習', '09': '深層学習', '10': 'Frontier' }
const descriptions = { '00': '数式・記号・Pythonを学ぶための準備。', '01': '極限・微分・積分から多変数微積分まで。', '02': 'ベクトル・行列から最小二乗、固有値、SVDまで。', '03': '確率変数・分布・推定・情報量をつなぐ。', '04': '証明、離散構造、アルゴリズムの基礎。', '05': '誤差、数値線形代数、微分方程式、検証。', '06': '凸性、勾配法、制約、双対、近接法。', '07': 'PCA、回帰、WLS、信号、構造化行列。', '08': '教師あり・教師なし学習と評価・運用。', '09': '深層ネットワーク、系列、生成、評価、安全性。', '10': 'Foundation model、RAG、agent、alignment。' }
const topics = curriculum.topics ?? []
for (const course of Array.from({ length: 11 }, (_, i) => String(i).padStart(2, '0'))) {
  const courseTopics = topics.filter((t) => String(t.course).padStart(2, '0') === course).sort((a, b) => a.order - b.order)
  const units = (curriculum.units ?? []).filter((u) => String(u.course).padStart(2, '0') === course).sort((a, b) => a.order - b.order)
  const first = courseTopics[0]
  const body = `# Course ${course}：${names[course]}

${descriptions[course]}

**${courseTopics.length} Topics / ${units.length} Units**

<a class="vp-button brand" href="/courses/foundation/${first?.implementation_topic ?? first?.id ?? ''}">最初から学ぶ</a>

## Unit一覧

${units.map((unit) => `### ${unit.title}\n\n${courseTopics.filter((topic) => topic.unit === unit.id).map((topic, index) => `${index + 1}. [${topic.title}](/courses/foundation/${topic.implementation_topic ?? topic.id})`).join('\n') || '準備中です。'}`).join('\n\n')}
`
  const dir = path.join(root, 'apps/portal/courses', course)
  await mkdir(dir, { recursive: true })
  await writeFile(path.join(dir, 'index.md'), body)
}
console.log('course UX pages generated: 11 course overviews')
