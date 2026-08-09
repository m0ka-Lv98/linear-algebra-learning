from pathlib import Path
import argparse, json

ROOT = Path(__file__).resolve().parents[2]
PROFILES = json.loads((Path(__file__).parent / 'topic_profiles.json').read_text(encoding='utf-8'))
START = '<!-- course02-10-refined:start -->'

ap = argparse.ArgumentParser()
ap.add_argument('--course', default='all')
args = ap.parse_args()
targets = PROFILES if args.course == 'all' else [t for t in PROFILES if t['course'] == str(args.course).zfill(2)]
errors = []
for t in targets:
    c = t['course']; iid = t['iid']; p = t['profile']
    tb = ROOT / 'apps/portal/textbook' / f'{iid}.md'
    deck = ROOT / 'apps/slides/decks' / f'{iid}.md'
    if not tb.exists():
        errors.append(f'{iid}: textbook missing'); continue
    txt = tb.read_text(encoding='utf-8')
    if START not in txt: errors.append(f'{iid}: textbook refinement marker missing')
    if f'/visuals/course-{c}/{iid}.png' not in txt: errors.append(f'{iid}: portal PNG ref missing')
    if not deck.exists():
        errors.append(f'{iid}: deck missing'); continue
    d = deck.read_text(encoding='utf-8')
    if 'generatedBy: course02-10-refined-v1' not in d: errors.append(f'{iid}: generatedBy missing')
    slides = 1 + sum(1 for line in d.splitlines() if line.startswith('## '))
    if slides != 15: errors.append(f'{iid}: expected 15 slides, got {slides}')
    if f'./assets/course-{c}/{iid}.png' not in d: errors.append(f'{iid}: Slidev PNG ref missing')
    if '/visuals/course-' in d: errors.append(f'{iid}: portal path leaked into Slidev')
    for base in [ROOT / f'apps/portal/public/visuals/course-{c}', ROOT / f'apps/slides/decks/assets/course-{c}']:
        if not (base / f'{iid}.png').exists(): errors.append(f'{iid}: missing PNG in {base}')
        if p.get('animate') and not (base / f'{iid}.gif').exists(): errors.append(f'{iid}: missing GIF in {base}')
if errors:
    print('ERROR')
    for e in errors[:100]: print('-', e)
    raise SystemExit(1)
print(f'PASS: {len(targets)} refined topics verified for Course {args.course}.')
