---
title: Validation
description: How we know the numbers are right.
sidebar:
  order: 3
---

Every solver in the engine ships with tests that run in CI on every change. Three kinds:

1. **Exact solutions.** Start from a closed-form soliton, run for many periods, compare pointwise.
2. **Invariants.** Compute the conserved quantities before and after and demand they agree to round-off.
3. **Qualitative physics.** Two solitons must emerge from a collision with their original amplitudes.

## Current results

| Equation | Test | Error |
| --- | --- | --- |
| KdV | single soliton, $t = 5$ | $5 \times 10^{-8}$ |
| KdV | two-soliton invariants, 8000 steps | drift $< 10^{-8}$ |
| KdV | collision amplitude recovery | within $0.02$ of exact |
| NLS | moving bright soliton, $t = 10$ | $3 \times 10^{-9}$ |
| NLS | two-soliton invariants, 10000 steps | drift $< 10^{-8}$ |

Reproduce with:

```sh
git clone https://github.com/soliton-physics/soliton
cd soliton && cargo test --release
```

The playground shows the invariants and their drift live in the side panel, so you can watch the solver's accuracy
while it runs.
