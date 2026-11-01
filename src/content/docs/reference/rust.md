---
title: Rust API
description: The soliton-core crate.
sidebar:
  order: 1
---

```rust
use soliton_core::{Complex64, Kdv, Nls, PeriodicGrid, Simulation};
use soliton_core::exact::{kdv_soliton, nls_bright_soliton};
```

## Core types

| Type | Role |
| --- | --- |
| `PeriodicGrid::new(points, length)` | uniform grid on $[-L/2, L/2)$; `positions()`, `wavenumbers()`, `spacing()` |
| `SpectralSpace` | grid plus FFT plans; `to_spectral`, `to_physical`, `differentiate`, `integrate` |
| `SemiLinear` | trait for `u_t = L u + N(u)`: `linear_symbol(k)`, `nonlinear(...)`, `invariants(...)` |
| `Kdv`, `Nls` | equations implementing `SemiLinear` |
| `Etdrk4` | the time stepper; implements `Stepper` |
| `Simulation<E, S>` | drives an equation with a stepper on a grid |

## Simulation

```rust
let mut sim = Simulation::new(PeriodicGrid::new(512, 60.0), Kdv, 1e-3);
sim.set_profile(|x| Complex64::new(kdv_soliton(x, 0.0, 4.0, -10.0), 0.0));
sim.add_profile(|x| Complex64::new(kdv_soliton(x, 0.0, 1.0, 5.0), 0.0));
sim.advance(5000);

let field = sim.state();          // Vec<Complex64> in physical space
let spectrum = sim.spectrum();    // &[Complex64], unnormalised FFT order
let invariants = sim.invariants();
```

## Adding an equation

Implement `SemiLinear` in one file under `equations/`. The stepper and simulation are generic, so nothing else changes.

```rust
impl SemiLinear for MyEquation {
    fn linear_symbol(&self, k: f64) -> Complex64 { /* L(k) */ }
    fn nonlinear(&self, space: &mut SpectralSpace, spectrum: &[Complex64], out: &mut [Complex64]) { /* N(u) */ }
    fn invariants(&self, space: &mut SpectralSpace, spectrum: &[Complex64]) -> Vec<Invariant> { /* ... */ }
}
```
