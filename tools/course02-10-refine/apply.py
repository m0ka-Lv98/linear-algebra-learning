from __future__ import annotations
from pathlib import Path
import argparse, json, re

ROOT = Path(__file__).resolve().parents[2]
PROFILES = json.loads((Path(__file__).parent / 'topic_profiles.json').read_text(encoding='utf-8'))
START = '<!-- course02-10-refined:start -->'
END = '<!-- course02-10-refined:end -->'


def select_profiles(course: str | None):
    if course in (None, 'all'):
        return PROFILES
    course = str(course).zfill(2)
    if course not in {f'{i:02d}' for i in range(2, 11)}:
        raise SystemExit(f'Unsupported course: {course}')
    return [t for t in PROFILES if t['course'] == course]


def refinement_block(t):
    p = t['profile']
    c = t['course']
    iid = t['iid']
    png = f'/visuals/course-{c}/{iid}.png'
    gif = f'/visuals/course-{c}/{iid}.gif'
    conditions = '\n'.join(f'- {x}' for x in p['conditions'][:4])
    pitfalls = '\n'.join(f'- {x}' for x in p['pitfalls'][:4])
    block = f"""{START}

## このTopicの核心

{p['intuition']}

代表式は次の通りです。

$$
{t.get('formula', '')}
$$

式を暗記するのではなく、**入力 → 変換 → 出力**と、図のどの要素が各項に対応するかを確認します。

## 図解

<img src=\"{png}\" alt=\"{t['title']}の図解\" style=\"max-height: 380px; display: block; margin: 0 auto;\" />

### 図を見るポイント

- 軸・node・矢印・領域が何を表すかを最初に確認する。
- 代表式の各項と図の要素を1対1で対応づける。
- 条件を1つ変えたとき、図のどこが変化するかを予測してから確認する。

"""
    if p.get('animate'):
        block += f"""## アニメーションで確認

<img src=\"{gif}\" alt=\"{t['title']}のアニメーション\" style=\"max-height: 340px; display: block; margin: 0 auto;\" />

動きが本質的なTopicでは、各frameで**何が固定され、何が更新されるか**を追います。

"""
    block += f"""## 代表式を読む手順

1. **左辺**が何を出力しているかを言葉にする。
2. **右辺**を、入力・係数・変換・集約の役割に分ける。
3. 各記号の次元、shape、定義域、単位を確定する。
4. 極端な入力、ゼロ、対称な入力などで式の挙動を予測する。
5. 図の矢印・領域・曲線・分布のどこが各項に対応するかを確認する。

この順序で読むと、式変形だけを追って『何を計算しているのか』を見失うのを防げます。

## 最小例で考える

{p['example']}

最小の非自明な設定で手計算し、同じ入力をNumPy等でも計算して、shape・符号・大きさ・残差・確率などを照合します。数値を変えた2例目も作り、結論が特定の数値に依存していないことを確認します。

## このTopic固有の成立条件

{conditions}

成立条件は『公式を使ってよいか』を決めます。条件を外した場合、**未定義になるのか、解が一意でなくなるのか、近似誤差が増えるのか、数値的に不安定になるのか、統計的な解釈が崩れるのか**を区別してください。

## 数値・実装での検算

- まず2〜5要素程度の小さな入力を作る。
- 代表式を手計算し、期待する出力を先に書く。
- NumPy等で同じ計算を実行し、手計算と照合する。
- 配列なら `shape` と `dtype`、反復法なら残差と反復回数、確率なら総和・積分と範囲を確認する。
- 浮動小数点比較では完全一致ではなく適切な許容誤差を使う。
- 乱数を使う場合はseedだけでなく、標本数と生成分布も記録する。

## 後続Topicでどこに現れるか

{t.get('connection', '')}

後続でこの量が **入力表現・目的関数・制約・更新則・診断指標** のどれとして再登場するかを意識すると、Course間のつながりが見えやすくなります。

## このTopicで特に避ける誤解

{pitfalls}

## 自力説明チェック

- {t['title']}を式を見ずに一文で説明できるか。
- 代表式の左辺と右辺を日本語で説明できるか。
- 図のどの要素が代表式の各項に対応するか。
- 成立条件を1つ外した反例を作れるか。
- 小さな入力で手計算と実装を一致させられるか。
- 後続分野で何のために使われるか説明できるか。

## 理解を一段深めるための観点

### 1. 定義とアルゴリズムを分ける

{t['title']}そのものの**数学的・統計的な定義**と、それを計算するための**アルゴリズム**は別物です。同じ対象でも複数の計算法があり、計算方法を変えても定義は変わりません。逆に、似た計算手順でも前提条件が違えば別の対象を計算している場合があります。まず『何が定義なのか』を固定してから、実装を選びます。

### 2. 小さい例から一般式へ戻る

最初から一般式だけを追わず、2次元・2クラス・数個の標本・数回の反復など、目で追える大きさまで問題を縮めます。そこで各中間量をすべて書き出し、代表式の各項と対応づけます。その後で一般の次元へ戻ると、添字・shape・確率変数・反復indexの役割を見失いにくくなります。

### 3. 反例で境界を確認する

成立条件は暗記項目ではなく、**どこまで結論を信頼できるかの境界**です。条件を1つだけ意図的に壊し、何が起きるか確認します。未定義になる、解が複数になる、誤差が増幅する、収束しない、確率解釈が崩れる、汎化性能が落ちる、といった失敗の種類を区別すると、条件の意味が具体化します。

### 4. 図・式・実装の三者を往復する

図だけで分かった気にならず、代表式へ戻って図の形を説明します。式だけで計算せず、結果を図に戻して向き・距離・分布・残差・loss・計算量などの意味を確認します。最後に小さな実装で数値を再現し、手計算との差が丸め誤差なのか、shapeミスなのか、定義の取り違えなのかを切り分けます。

### 5. 後続Topicで役割が変わることを見る

同じ概念が後続では別の役割で現れます。あるCourseでは定義対象だった量が、次のCourseでは目的関数、制約、特徴量、更新則、評価指標として使われます。{t.get('connection', '')} この接続を意識すると、各Topicを独立した公式集ではなく、同じ数学を異なる目的で再利用する体系として理解できます。

## 数式を使う前のチェックリスト

1. **対象を定義したか**：スカラー、ベクトル、行列、確率変数、関数、graph、model parameterなど、何を扱っているかを明示する。
2. **記号を定義したか**：式に出る文字、添字、集合、期待値、norm、微分記号を未定義のまま使わない。
3. **shape・次元を確認したか**：積や加算が定義できるか、入力と出力の次元が意図通りかを確認する。
4. **成立条件を確認したか**：可逆性、独立性、滑らかさ、正定値性、凸性、分布仮定、有限精度、data splitなど、このTopic固有の条件を確認する。
5. **極端な例を試したか**：ゼロ、同じ値、完全相関、rank不足、非常に大きい/小さい値、標本数が少ない場合などで挙動を見る。
6. **結果を別の方法で検算したか**：手計算、図、別アルゴリズム、残差、保存量、simulationなど、少なくとも1つ独立な確認方法を使う。

## 学習ログに残すべきもの

このTopicを実装して確認した場合は、入力値だけでなく、shape、dtype、乱数seed、反復回数、停止条件、許容誤差、使用した正規化や前処理も記録します。『コードが動いた』だけでは再現性も数学的妥当性も保証されません。**何を期待し、何を観測し、どの基準で一致と判断したか**まで残すと、後で別のTopicへ接続するときに検算可能な知識になります。

{END}"""
    return block


def remove_old_block(md):
    return re.sub(re.escape(START) + r'.*?' + re.escape(END) + r'\n*', '', md, flags=re.S)


def insert_after_section(md, heading, block):
    pattern = re.compile(rf'(^##\s+{re.escape(heading)}\s*$\n.*?)(?=^##\s+|\Z)', re.M | re.S)
    m = pattern.search(md)
    if not m:
        return None
    return md[:m.end(1)].rstrip() + '\n\n' + block + '\n\n' + md[m.end(1):].lstrip()


def refine_textbook(md, t):
    md = remove_old_block(md)
    block = refinement_block(t)
    for heading in ['直感的な説明', '今回扱う問い', 'この章で理解すること']:
        out = insert_after_section(md, heading, block)
        if out is not None:
            return out.rstrip() + '\n'
    lines = md.splitlines()
    if lines and lines[0].startswith('# '):
        return lines[0] + '\n\n' + block + '\n\n' + '\n'.join(lines[1:]).lstrip() + '\n'
    return block + '\n\n' + md


def slide_deck(t):
    p = t['profile']
    formula = t.get('formula', '')
    c = t['course']
    iid = t['iid']
    png = f'./assets/course-{c}/{iid}.png'
    gif = f'./assets/course-{c}/{iid}.gif'
    prereq = ', '.join(t.get('prerequisites') or ['なし'])
    pitfalls = '\n'.join(f'- {x}' for x in p['pitfalls'][:3])
    conditions = '\n'.join(f'- {x}' for x in p['conditions'][:3])
    if p.get('animate'):
        anim = f'<img src="{gif}" style="max-height: 310px; display:block; margin:0 auto;" />\n\n- 各frameで、何が固定され何が更新されるかを追う。'
    else:
        anim = '- このTopicでは静止図を中心に条件を1つずつ変える思考実験を行う。\n- 図の形がどう変わるか予測してから次へ進む。'
    course_names = {'02':'線形代数','03':'確率統計','04':'離散数学','05':'数値計算','06':'最適化','07':'データ解析','08':'機械学習','09':'深層学習','10':'Frontier'}
    slides = [
        f'''---\ntheme: default\nrouterMode: hash\ngeneratedBy: course02-10-refined-v1\nlayout: cover\ntitle: "{t['title']}"\n---\n\n# {t['title']}\n\nCourse {c}｜{course_names[c]}\n''',
        f'''---\nlayout: center\n---\n\n## 今回の問い\n\n{p['question']}\n''',
        f'''---\n\n## 到達目標\n\n- {t['title']}の定義と代表式を言葉で説明できる\n- 図と式の対応を説明できる\n- 小さな例で成立条件と失敗条件を検算できる\n''',
        f'''---\n\n## 直感\n\n{p['intuition']}\n\n**前提:** {prereq}\n''',
        f'''---\n\n## 図解\n\n<img src="{png}" style="max-height: 330px; display:block; margin:0 auto;" />\n''',
        '''---\n\n## 図を見るポイント\n\n- 軸・node・矢印・領域が何を表すか確認する\n- 代表式の各項と図の要素を対応づける\n- 条件を変えたとき、どこが変化するか予測する\n''',
        f'''---\n\n## 代表式\n\n$$\n{formula}\n$$\n\n左辺の出力 → 右辺の操作 → 入力の型の順で読む。\n''',
        f'''---\n\n## 式をどう読むか\n\n- **対象:** {p['concepts']}\n- shape・次元・定義域を先に確定する\n- 計算後に符号・大きさ・残差・確率などを図と照合する\n''',
        f'''---\n\n## 小さな例\n\n{p['example']}\n\n最小の非自明な設定で、手計算と実装を照合する。\n''',
        f'''---\n\n## 動き／思考実験で確認\n\n{anim}\n''',
        f'''---\n\n## 成立条件\n\n{conditions}\n''',
        f'''---\n\n## よくある誤解\n\n{pitfalls}\n''',
        '''---\n\n## 数値・実装で検算\n\n1. 小さい入力を作る\n2. 定義式から期待値を手で求める\n3. NumPy等の実装結果と比較する\n4. shape・残差・許容誤差・seedを記録する\n''',
        f'''---\n\n## 後続分野への接続\n\n{t.get('connection', '')}\n\nこのTopicの量が、後続で入力・目的関数・制約・診断のどれとして使われるか確認する。\n''',
        f'''---\n\n## 理解確認\n\n- {t['title']}を図→式→小例の順で説明できるか\n- 条件を1つ外した反例を作れるか\n\n[教科書](../../textbook/{iid})\n\n[10問の演習](../../exercises/{iid})\n''',
    ]
    return '\n'.join(slides).rstrip() + '\n'


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--course', default='all')
    args = ap.parse_args()
    targets = select_profiles(args.course)
    changed_tb = 0
    changed_deck = 0
    for t in targets:
        iid = t['iid']
        tb = ROOT / 'apps/portal/textbook' / f'{iid}.md'
        deck = ROOT / 'apps/slides/decks' / f'{iid}.md'
        if not tb.exists():
            raise SystemExit(f'Missing textbook: {tb}')
        old = tb.read_text(encoding='utf-8')
        new = refine_textbook(old, t)
        if old != new:
            tb.write_text(new, encoding='utf-8')
            changed_tb += 1
        oldd = deck.read_text(encoding='utf-8') if deck.exists() else ''
        newd = slide_deck(t)
        if oldd != newd:
            deck.parent.mkdir(parents=True, exist_ok=True)
            deck.write_text(newd, encoding='utf-8')
            changed_deck += 1
    print(f'PASS: refined {len(targets)} topics; textbooks changed={changed_tb}; decks changed={changed_deck}')


if __name__ == '__main__':
    main()
