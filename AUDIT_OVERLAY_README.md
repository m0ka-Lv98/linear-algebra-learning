# Audit overlay — modified files only

Baseline: `main` commit `54186a19ed5c93483755ce4392ded974a1bd367a` (2026-08-10).

This ZIP intentionally contains **only files that are new or changed by the audit remediation**. Unchanged repository files are not included.

## Included changes

- Build pipeline: Slidev build no longer regenerates/overwrites source decks; Pages CI is read-only for repository contents and fails if a build mutates source files.
- Quality gate: semantic-smell checks for generic slide regression, duplicate textbook paragraphs, duplicate exercise bodies, and missing visual references.
- Course 00: all eight existing textbooks/slides receive a visual layer; four missing prerequisites are added (trigonometry, inequalities, complex numbers, sequences).
- Course 01: missing undergraduate-calculus bridges are added (implicit/inverse functions, MVT, infinite series, Taylor remainder/series, multiple integrals, change of variables, parametric/polar curves, line integrals). Existing Taylor material is rewritten to remove repeated prose and separate polynomial/series/remainder.
- Course 03: t/chi-square sampling distributions, resampling, power, multiple testing/FDR, and Fisher-information/MLE asymptotics.
- Course 04: state machines/invariants, graph coloring, bipartite matching/Hall, generating functions.
- Course 06: subgradients, tangent/normal cones + constraint qualification, Fenchel duality, mirror descent; KKT page rewritten from feasible-direction geometry.
- Course 07/08/09/10: PCA, WLS, logistic regression, activation/loss, attention, RL prerequisites, SFT, explicit RLHF pipeline, DPO derivation, reasoning RL, inference/serving, data curation, RAG evaluation, and tool-security material.
- Visual assets: PNG for every new/revised Topic plus selected GIFs for inherently dynamic concepts.

## Applying curriculum additions

Copy this overlay on top of the repository, then run:

```bash
pnpm audit:apply
pnpm lint
pnpm test
pnpm build
```

`audit:apply` merges `content/audit-additions.yml` into the existing large `content/topics.yml` and `content/curriculum.yml`; those large unchanged baseline files are therefore not duplicated in this ZIP.

## Scope

The package implements the audit's structural fixes and P0/P1 curriculum/content fixes. Optional P2 expansion ideas (for example Jordan form, full PDE numerics, advanced tensor decompositions) are deliberately not added merely to increase Topic count.
