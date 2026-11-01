---
title: JavaScript API
description: The WebAssembly package used by the playground.
sidebar:
  order: 3
---

Built with `wasm-pack` from `crates/soliton-wasm`.

```js
import init, { WaveSimulation } from '@soliton-physics/soliton-wasm';

await init();
const sim = new WaveSimulation('kdv', 512, 60, 1e-3);
sim.add_kdv_soliton(4, -15);
sim.step(100);
const u = sim.real();        // Float64Array
const x = sim.positions();   // Float64Array
console.log(sim.time(), sim.invariants());
sim.free();
```

| Method | Description |
| --- | --- |
| `new WaveSimulation(model, points, length, dt)` | `model` is `'kdv'` or `'nls'` |
| `set_state(re, im)` | load a field from two `Float64Array`s |
| `add_kdv_soliton(speed, center)` | superpose an exact KdV soliton |
| `add_nls_soliton(amplitude, velocity, center)` | superpose an exact NLS soliton |
| `step(n)` | advance `n` steps |
| `real()`, `imag()`, `magnitude()` | field views as `Float64Array` |
| `positions()`, `time()`, `dt()`, `points()`, `length()` | grid and clock |
| `invariants()` | plain object of conserved quantities |
| `clear()` | zero the field and reset time |
