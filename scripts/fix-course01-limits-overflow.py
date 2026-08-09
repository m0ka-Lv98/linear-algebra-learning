from pathlib import Path
import sys

ROOT = Path.cwd()

deck_path = ROOT / 'apps/slides/decks/calc-functions-limits-continuity.md'
textbook_path = ROOT / 'apps/portal/textbook/calc-functions-limits-continuity.md'
generator_path = ROOT / 'tools/course01-visuals/generate_all.py'

for p in (deck_path, textbook_path, generator_path):
    if not p.exists():
        raise SystemExit(f'ERROR: missing required file: {p}')

# 1) Fix the currently generated Slidev deck: keep #/9 compact and move the GIF to its own slide.
deck = deck_path.read_text(encoding='utf-8')
old_deck = '''## 図を見るポイント

- 図の横軸・縦軸が何を表しているかを確認する。
- 変化している量と固定している量を区別する。
- 式の各記号が図のどこに対応するかを探す。

![図解2](./assets/course-01/limits_approach.gif)

このアニメーションでは、概念の「極限・累積・方向・反復」の動きが視覚化されている。
'''
new_deck = '''## 図を見るポイント

- 図の横軸・縦軸が何を表しているかを確認する。
- 変化している量と固定している量を区別する。
- 式の各記号が図のどこに対応するかを探す。

---

## アニメーションで極限を見る

<img src="./assets/course-01/limits_approach.gif" alt="x が a に近づくとき f(x) が L に近づく様子" style="max-height: 310px; width: auto; margin: 0.4rem auto 0.6rem;" />

- 動く点の横座標が $a$ に近づく様子を見る。
- 同時に $f(x)$ が $L$ に近づくことを確認する。
- 「$x=a$ での値」ではなく「近づく途中の振る舞い」が極限の本体。
'''
if old_deck in deck:
    deck = deck.replace(old_deck, new_deck, 1)
elif '## アニメーションで極限を見る' not in deck:
    raise SystemExit('ERROR: expected limits deck block not found; refusing to guess')
deck_path.write_text(deck, encoding='utf-8')

# 2) Fix the textbook source so the Course 01-10 deck generator naturally creates a separate slide.
textbook = textbook_path.read_text(encoding='utf-8')
old_textbook = '''### 図を見るポイント

- 図の横軸・縦軸が何を表しているかを確認する。
- 変化している量と固定している量を区別する。
- 式の各記号が図のどこに対応するかを探す。

![図解2](/visuals/course-01/limits_approach.gif)

このアニメーションでは、概念の「極限・累積・方向・反復」の動きが視覚化されている。
'''
new_textbook = '''### 図を見るポイント

- 図の横軸・縦軸が何を表しているかを確認する。
- 変化している量と固定している量を区別する。
- 式の各記号が図のどこに対応するかを探す。

## アニメーションで極限を見る

![x が a に近づくとき f(x) が L に近づく様子](/visuals/course-01/limits_approach.gif)

### アニメーションを見るポイント

- 動く点の横座標が $a$ に近づく様子を見る。
- 同時に $f(x)$ が $L$ に近づくことを確認する。
- 「$x=a$ での値」ではなく「近づく途中の振る舞い」が極限の本体。
'''
if old_textbook in textbook:
    textbook = textbook.replace(old_textbook, new_textbook, 1)
elif '## アニメーションで極限を見る' not in textbook:
    raise SystemExit('ERROR: expected limits textbook block not found; refusing to guess')
textbook_path.write_text(textbook, encoding='utf-8')

# 3) Prevent the visual generator from putting image2 back into the same textbook section.
gen = generator_path.read_text(encoding='utf-8')
old_gen_textbook = '''    if len(imgs)>1:
        parts.append(f"![図解2](/visuals/course-01/{imgs[1]})\\n")
        parts.append('このアニメーションでは、概念の「極限・累積・方向・反復」の動きが視覚化されている。\\n')
'''
new_gen_textbook = '''    if len(imgs)>1:
        parts.append('## アニメーションで確認\\n')
        parts.append(f"![アニメーション](/visuals/course-01/{imgs[1]})\\n")
        parts.append('### アニメーションを見るポイント\\n')
        parts.append('- 静止図から何が変化しているかを確認する。\\n- 動いている量を、中心式の記号と対応づける。\\n')
'''
if old_gen_textbook in gen:
    gen = gen.replace(old_gen_textbook, new_gen_textbook, 1)
elif "parts.append('## アニメーションで確認\\n')" not in gen:
    raise SystemExit('ERROR: expected textbook generator block not found; refusing to guess')

# Also bound the GIF height in the direct Slidev generator path.
old_gen_slide = '''# 6. 動きで確認

{f'![]({img2})' if img2 else '（このTopicでは静止図を中心に理解する）'}

- 極限・接線・累積・反復は、動かして見ると理解しやすい。'''
new_gen_slide = '''# 6. 動きで確認

{f'<img src="{img2}" alt="animation" style="max-height: 310px; width: auto; margin: 0.4rem auto 0.6rem;" />' if img2 else '（このTopicでは静止図を中心に理解する）'}

- 極限・接線・累積・反復は、動かして見ると理解しやすい。'''
if old_gen_slide in gen:
    gen = gen.replace(old_gen_slide, new_gen_slide, 1)
elif 'max-height: 310px' not in gen:
    raise SystemExit('ERROR: expected direct Slidev animation block not found; refusing to guess')

generator_path.write_text(gen, encoding='utf-8')

# 4) Assertions: scope and resulting layout.
deck2 = deck_path.read_text(encoding='utf-8')
textbook2 = textbook_path.read_text(encoding='utf-8')
gen2 = generator_path.read_text(encoding='utf-8')
assert '## 図を見るポイント' in deck2
assert '## アニメーションで極限を見る' in deck2
assert 'max-height: 310px' in deck2
assert '## アニメーションで極限を見る' in textbook2
assert "parts.append('## アニメーションで確認\\n')" in gen2

print('PASS: split Course 01 limits figure guidance and animation into separate slides.')
print('PASS: bounded animation height to 310px.')
print('PASS: updated textbook and visual generator to prevent regression.')
