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

## Mechanics

| Scenario | Checked | Result |
| --- | --- | --- |
| Projectile | position against the closed form at any time step | round-off |
| Mass on a spring | period against Verlet's known dispersion, energy drift | 1e-8, 1e-5 |
| Atwood machine, block and hanging mass | acceleration, tension, normal force | round-off |
| Simple pendulum, 2 rad | period against the elliptic integral, convergence order | 1.7e-8, order 2.0 |
| Block on incline | at rest with friction $m g \sin\theta$; sliding acceleration | 1e-10 |
| Sliding block | stopping distance, friction work, ledger drift | 4e-9, 5e-10, 3e-9 |
| Collisions | elastic and inelastic outgoing velocities, energy lost, 90° scattering of equal discs | 1e-10 |
| Rolling disc | rolling acceleration and $v = \omega R$; slipping when $\mu_s$ is too small | 1e-8 |
| Seesaw | balanced stays still; tipping angular acceleration | 1e-9 |
| Bouncing ball | apex ratios $e^2$ | 4e-4, first order in $dt$ |
| Every catalogue scenario | builds, runs, round-trips through JSON | passes |

## Waves

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
