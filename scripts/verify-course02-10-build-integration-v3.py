from pathlib import Path
import json
import re

ROOT = Path.cwd()
errors = []

profiles_path = ROOT / 'tools/course02-10-refine/topic_profiles.json'
renderer_path = ROOT / 'tools/course02-10-refine/materialize-decks.mjs'
generator_path = ROOT / 'tools/generate-course01-10-slide-decks.mjs'

if not profiles_path.exists(): errors.append('topic_profiles.json missing')
if not renderer_path.exists(): errors.append('materialize-decks.mjs missing')
if not generator_path.exists(): errors.append('generate-course01-10-slide-decks.mjs missing')

profiles = json.loads(profiles_path.read_text(encoding='utf-8')) if profiles_path.exists() else []
expected = {'02':29,'03':20,'04':20,'05':20,'06':20,'07':20,'08':20,'09':20,'10':20}
if len(profiles) != 189: errors.append(f'profile total expected 189, got {len(profiles)}')
for c, n in expected.items():
    actual = sum(str(x.get('course')).zfill(2) == c for x in profiles)
    if actual != n: errors.append(f'Course {c} profiles expected {n}, got {actual}')

if generator_path.exists():
    g = generator_path.read_text(encoding='utf-8')
    for token in [
        'loadCourse0210RefinedProfiles',
        'renderCourse0210RefinedDeck',
        'const refinedProfile = refinedCourse0210Profiles.get(id)',
    ]:
        if token not in g: errors.append(f'generator integration missing: {token}')

for t in profiles:
    iid = t['iid']; c = str(t['course']).zfill(2)
    deck = ROOT / 'apps/slides/decks' / f'{iid}.md'
    if not deck.exists():
        errors.append(f'{iid}: deck missing')
        continue
    d = deck.read_text(encoding='utf-8')
    if not re.search(r'^generatedBy:\s*course02-10-refined-v1\s*$', d, re.M):
        errors.append(f'{iid}: canonical generatedBy missing')
    nslides = 1 + len(re.findall(r'^##\s+.+$', d, re.M))
    if nslides != 15: errors.append(f'{iid}: expected 15 slides, got {nslides}')
    if not re.search(r'^##\s+理解確認\s*$', d, re.M): errors.append(f'{iid}: 理解確認 missing')
    if f'./assets/course-{c}/{iid}.png' not in d: errors.append(f'{iid}: Slidev PNG ref missing')
    if '/visuals/course-' in d: errors.append(f'{iid}: portal path leaked into Slidev source')

if errors:
    print('ERROR')
    for e in errors[:200]: print('-', e)
    if len(errors) > 200: print(f'- ... {len(errors)-200} more')
    raise SystemExit(1)

print('PASS: canonical Course 02-10 renderer is integrated and all 189 deck sources are exactly 15 slides.')
