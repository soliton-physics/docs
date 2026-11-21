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
| `fields()`, `field_at(x, y)`, `field_lines(n, cx, cy, reach)` | uniform fields to draw; `[Ex, Ey, V, Bz, Bx, By]` at a point; field lines of the charges |
| `field_on(body)`, `fixed_field_at(x, y)`, `magnetic_field_lines(n, cx, cy, reach)` | the same six at a body, without its own magnet's field; `[Bx, By]` of the fixed magnets; their field lines |
| `flux_through(cx, cy, r)`, `distributions()` | electric flux out of a sphere, summed over it; fixed wires, sheets and shells of charge |
| `scene_json()`, `scene_json_now()` | the scene as built, and as it stands at this moment |

## Ray optics

```js
import init, { OpticsBench, optics_catalogue } from '@soliton-physics/engine';

await init();
optics_catalogue();                                   // ids, titles, parameter schemas
const bench = new OpticsBench('convex-lens', { focal: 15, distance: 40 });
bench.answers();                                      // [{ name, value, measured }]
bench.rays();                                         // [{ points, events, end, angles, faint }]
bench.free();
```

A bench is traced once, when it is made; change a number by making another.

| Method | Returns |
|---|---|
| `elements()` | what is on the bench, as lines to draw: `{ kind: 'mirror' \| 'screen' \| 'glass' \| 'lens', points, index, focal }` |
| `rays()` | every ray: the points it turns at, and at each an event with its kind, normal and the two angles in degrees |
| `objects()` | each object arrow with its paraxial image, `{ base, tip, real }`, or `null` for one at infinity |
| `answers()` | the textbook's value for each answer and, where the rays can give it, the traced one |
| `marks()`, `axis()`, `view()`, `title()` | named points, the principal axis, a suggested frame |
| `index_at(x, y)` | the refractive index at a point |
| `scene_json()`, `OpticsBench.from_scene(json)` | the bench as data, and a bench from data |

## Thermal physics

```js
import init, { ThermalGas, thermal_catalogue } from '@soliton-physics/engine';

await init();
const gas = new ThermalGas('carnot-cycle', { hot: 450, cold: 300 });
gas.advance(25);                                      // picoseconds
gas.now();                                            // { time, temperature, pressure, volume, energy, work, heat }
gas.answers();                                        // [{ name, value, measured, tolerance }]
gas.free();
```

| Method | Returns |
|---|---|
| `advance(ps)`, `finished()`, `playback()` | run the gas on; whether its last stage has ended; picoseconds to show per second |
| `molecules()`, `size()`, `groups()` | `x, y, z, radius, species` for each molecule in nm; the box now; the kinds of molecule |
| `walls()`, `partition()`, `piston()` | each wall's temperature (`NaN` if insulated); where the partition is; which way the piston is moving |
| `stage()`, `stage_label()`, `stage_count()` | where the experiment has got to |
| `now()`, `ideal_pressure()` | the state at this moment; `NkT/V` for comparison, atm |
| `series(q)`, `series_share(species)` | the record kept once a picosecond: `time`, `volume`, `pressure`, `temperature`, `work`, `heat`, `energy`; share of a gas in the left half |
| `speed_histogram(species, bins, fastest)`, `ThermalGas.maxwell(mass, T, points, fastest)` | the molecules counted by speed, and Maxwell's curve, both as densities per m/s |
| `scene_json()`, `ThermalGas.from_scene(json)` | the experiment as data, and one from data |

## Circuits

```js
import init, { CircuitBench, circuits_catalogue } from '@soliton-physics/engine';

await init();
const bench = new CircuitBench('series-lcr', { frequency: 35.6 });
bench.readings();                                     // voltage, current for each component, now
bench.answers();                                      // [{ name, value, measured }]
bench.free();
```

| Method | Returns |
|---|---|
| `analysis()`, `playback()`, `duration()`, `frequency()` | `steady`, `transient` or `alternating`, and its pace, length and frequency |
| `advance(s)`, `time()`, `finished()` | move time on; a steady circuit only has its clock moved |
| `readings()` | `voltage, current` per component: volts with its `a` above its `b`, amperes from `a` to `b` |
| `phasors()` | `Re V, Im V, Re I, Im I` per component for an alternating circuit |
| `series_time()`, `series(index, 'voltage' \| 'current')` | the history of a circuit followed in time |
| `scene_json()`, `CircuitBench.from_scene(json)` | the circuit as data: junctions with places on the page, components, how it is solved |

## Statistical mechanics

```js
import init, { StatRun, statmech_catalogue } from '@soliton-physics/engine';

await init();
const run = new StatRun('ising-model', { temperature: 2.0 });
run.advance(100);                                     // sweeps
run.spins();                                          // Int8Array, row by row
run.free();
```

| Method | Returns |
|---|---|
| `kind()`, `playback()`, `advance(steps)`, `finished()` | `ising`, `sweep`, `darts` or `walk`; steps per second of watching |
| `size()`, `spins()`, `darts()`, `walkers()` | what to draw, for whichever model it is |
| `now()`, `history()`, `points()` | the present readings; a thinned record; the temperatures a sweep has measured |
| `StatRun.onsager(from, to, n)`, `StatRun.critical_temperature()` | the exact results for an infinite lattice |
| `answers()` | `[{ name, value, measured, within }]` |

## Modern physics

```js
import init, { ModernRun, modern_catalogue } from '@soliton-physics/engine';

await init();
const run = new ModernRun('rutherford-scattering', { energy: 7.7 });
run.advance(1 / 60);                                  // seconds of watching
run.picture();                                        // { kind: 'scattering', tracks, ... }
run.free();
```

| Method | Returns |
|---|---|
| `advance(seconds)`, `finished()`, `still()`, `clock()` | `still()` is true for a lesson with nothing to play |
| `picture()` | what is on the stage, `{ kind, ... }`: `tube`, `wave`, `crystal`, `scattering`, `orbits`, `spectrum`, `sample` or `chart` |
| `readings()` | `[{ label, value, unit, text }]` |
| `plots()` | `[{ title, x_label, y_label, curves, marker }]` |
| `answers()` | `[{ name, value, measured, within }]` |

## Properties of matter

`MatterRun` and `matter_catalogue` have the same methods as `ModernRun` above. The kinds of picture are `wire`,
`shear`, `squeeze`, `tank`, `lift`, `float`, `venturi`, `drain`, `column`, `capillary`, `rod`, `mixing`,
`beaker`, `bar`, `cup` and `chart`.

```js
import init, { MatterRun } from '@soliton-physics/engine';

await init();
const run = new MatterRun('torricelli', { level: 1.5 });
while (!run.finished()) run.advance(1 / 60);
run.answers();                                        // [{ name, value, measured, within }]
run.free();
```
