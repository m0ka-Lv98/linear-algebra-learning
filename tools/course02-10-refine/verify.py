from pathlib import Path
import argparse
import json
import re

ROOT = Path(__file__).resolve().parents[2]
PROFILES = json.loads((Path(__file__).parent / 'topic_profiles.json').read_text(encoding='utf-8'))
START = '<!-- course02-10-refined:start -->'
EXPECTED = {'02': 29, '03': 20, '04': 20, '05': 20, '06': 20, '07': 20, '08': 20, '09': 20, '10': 20}

ap = argparse.ArgumentParser()
ap.add_argument('--course', default='all')
args = ap.parse_args()
course = str(args.course).zfill(2) if args.course != 'all' else 'all'
targets = PROFILES if course == 'all' else [t for t in PROFILES if t['course'] == course]

errors = []
if course == 'all':
    if len(PROFILES) != 189:
        errors.append(f'profile inventory: expected 189, got {len(PROFILES)}')
    for c, n in EXPECTED.items():
        actual = sum(t['course'] == c for t in PROFILES)
        if actual != n:
            errors.append(f'Course {c}: expected {n} profiles, got {actual}')
elif_unsupported = course != 'all' and course not in EXPECTED
if elif_unsupported:
    errors.append(f'unsupported Course: {course}')
elif course != 'all' and len(targets) != EXPECTED[course]:
    errors.append(f'Course {course}: expected {EXPECTED[course]} profiles, got {len(targets)}')

for t in targets:
    c = t['course']
    iid = t['iid']
    p = t['profile']
    tb = ROOT / 'apps/portal/textbook' / f'{iid}.md'
    deck = ROOT / 'apps/slides/decks' / f'{iid}.md'

    if not tb.exists():
        errors.append(f'{iid}: textbook missing')
    else:
        txt = tb.read_text(encoding='utf-8')
        if START not in txt:
            errors.append(f'{iid}: textbook refinement marker missing')
        if f'/visuals/course-{c}/{iid}.png' not in txt:
            errors.append(f'{iid}: portal PNG ref missing')

    if not deck.exists():
        errors.append(f'{iid}: deck missing')
        continue
    d = deck.read_text(encoding='utf-8')
    if not re.search(r'^generatedBy:\s*course02-10-refined-v1\s*$', d, re.M):
        errors.append(f'{iid}: generatedBy missing or wrong')
    slide_count = 1 + len(re.findall(r'^##\s+.+$', d, re.M))
    if slide_count != 15:
        errors.append(f'{iid}: expected 15 slides, got {slide_count}')
    if not re.search(r'^##\s+理解確認\s*$', d, re.M):
        errors.append(f'{iid}: required section missing: 理解確認')
    if f'./assets/course-{c}/{iid}.png' not in d:
        errors.append(f'{iid}: Slidev PNG ref missing')
    if p.get('animate') and f'./assets/course-{c}/{iid}.gif' not in d:
        errors.append(f'{iid}: Slidev GIF ref missing')
    if re.search(r'/visuals/course-(?:0[2-9]|10)/', d):
        errors.append(f'{iid}: portal /visuals/course-XX path leaked into Slidev source')

    for base in [ROOT / f'apps/portal/public/visuals/course-{c}', ROOT / f'apps/slides/decks/assets/course-{c}']:
        if not (base / f'{iid}.png').exists():
            errors.append(f'{iid}: missing PNG in {base}')
        if p.get('animate') and not (base / f'{iid}.gif').exists():
            errors.append(f'{iid}: missing GIF in {base}')

if errors:
    print('ERROR')
    for e in errors[:200]:
        print('-', e)
    if len(errors) > 200:
        print(f'- ... {len(errors)-200} more')
    raise SystemExit(1)

print(f'PASS: {len(targets)} canonical refined topics verified for Course {args.course}.')
