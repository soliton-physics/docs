---
title: JavaScript API
description: The WebAssembly package used by the playground.
sidebar:
  order: 3
---

Published on npm as `@soliton-physics/engine`, built with `wasm-pack` from `crates/soliton-wasm`.

```sh
npm install @soliton-physics/engine
```

## Waves

```js
import init, { WaveSimulation } from '@soliton-physics/engine';

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

## Mechanics

```js
import init, { MechanicsWorld, mechanics_catalogue } from '@soliton-physics/engine';

await init();
const catalogue = mechanics_catalogue();                 // ids, titles, parameter schemas
const world = new MechanicsWorld('atwood', { m1: 2, m2: 3 }, 5);   // record every 5 steps
world.step(1000);
world.state();            // Float64Array: [x, y, angle, vx, vy, omega, ax, ay] per body
world.forces(world.focus());   // the free-body diagram of the focused body
world.energy();           // kinetic, potential, dissipated, external_work, conserved
world.free();
```

| Method | Description |
| --- | --- |
| `new MechanicsWorld(id, params, record_every)` | a catalogue scenario; missing parameters take their defaults |
| `MechanicsWorld.from_scene(json, record_every)` | any [scene](/mechanics/scenes/) as JSON |
| `step(n)` | advance `n` steps; returns `true` and stops early on the step the problem ends |
| `finished()`, `horizon()` | `{ time, reason }` once the problem has ended; the scene's time window |
| `bodies()`, `view()`, `focus()`, `title()`, `exact()` | what the scene is: labels, shapes, camera, textbook answers |
| `state()`, `forces(body)`, `sketches()`, `energy()`, `events()` | what is happening now |
| `series_time()`, `series(body, q)`, `series_force(body, label)`, `series_energy(q)` | recorded history for graphs |
| `grab(body, x, y)`, `drag_to(x, y)`, `release()`, `grabbed()` | take hold of a body with a spring to the pointer |
| `body_at(x, y, slop)` | the movable body under a point |
| `scene_json()`, `scene_json_now()` | the scene as built, and as it stands at this moment |
