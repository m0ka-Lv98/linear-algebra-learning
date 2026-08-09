from pathlib import Path
import re
import sys

TOPICS = [
    'calc-functions-limits-continuity',
    'calc-derivatives-rates',
    'calc-differentiation-rules-chain-rule',
    'calc-one-variable-optimization',
    'calc-integrals-fundamental-theorem',
    'calc-taylor-approximation',
    'calc-multivariable-functions-partial-derivatives',
    'calc-gradient-directional-derivative',
    'calc-total-derivative-jacobian',
    'calc-hessian-second-order',
    'calc-multivariable-chain-rule',
    'calc-unconstrained-optimization',
    'calc-lagrange-multipliers',
]

root = Path.cwd()
deck_dir = root / 'apps/slides/decks'
asset_dir = deck_dir / 'assets/course-01'
errors = []
changed = []

if not deck_dir.is_dir():
    raise SystemExit('ERROR: run this script from repository root (apps/slides/decks missing)')
if not asset_dir.is_dir():
    raise SystemExit('ERROR: Course 01 Slidev asset directory missing: apps/slides/decks/assets/course-01')

for topic in TOPICS:
    path = deck_dir / f'{topic}.md'
    if not path.is_file():
        errors.append(f'{topic}: deck missing')
        continue
    before = path.read_text(encoding='utf-8')
    # Repair only Course 01 image references. Do not touch textbook/portal paths or other links.
    after = before.replace('](/visuals/course-01/', '](./assets/course-01/')
    after = after.replace('src="/visuals/course-01/', 'src="./assets/course-01/')
    after = after.replace("src='/visuals/course-01/", "src='./assets/course-01/")
    if after != before:
        path.write_text(after, encoding='utf-8')
        changed.append(topic)

    if '/visuals/course-01/' in after:
        errors.append(f'{topic}: absolute Portal visual path remains in Slidev deck')

    refs = re.findall(r'(?:\]\(|src=["\'])(?:\./)?assets/course-01/([^\)"\']+)', after)
    if not refs:
        errors.append(f'{topic}: no Course 01 Slidev visual reference found')
    for name in refs:
        if not (asset_dir / name).is_file():
            errors.append(f'{topic}: referenced Slidev asset missing: {name}')

print(f'Course 01 decks checked: {len(TOPICS)}')
print(f'Decks repaired: {len(changed)}')
for topic in changed:
    print(f'REPAIRED {topic}')

if errors:
    for error in errors:
        print(f'ERROR {error}', file=sys.stderr)
    raise SystemExit(1)

print('PASS: all Course 01 Slidev decks use local ./assets/course-01 paths and every referenced asset exists.')
