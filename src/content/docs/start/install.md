---
title: Install
description: Run the engine in the browser, in Python, or in Rust.
---

## Browser

Nothing to install. Open the [playground](https://soliton-playground.vercel.app/). In a web page of your own:

```sh
npm install @soliton-physics/engine
```

## Python

The package wraps the Rust engine with NumPy arrays in and out. It installs as `soliton-physics` and imports as
`soliton`:

```sh
pip install soliton-physics
```

```python
from soliton import mechanics

scene = mechanics.scenario("atwood", m1=2, m2=3)
print(scene.answers())
run = scene.run(until=2.0)
print(run.body("m2")["velocity"][-1])
```

The wave solvers live beside it:

```python
from soliton import Simulation, kdv_soliton

sim = Simulation("kdv", points=512, length=60.0, dt=1e-3)
sim.state = kdv_soliton(sim.x, 0.0, speed=4.0, center=-10.0)
sim.step(5000)
print(sim.time, sim.invariants())
```

## Rust

```sh
cargo add soliton-fields soliton-mechanics --git https://github.com/soliton-physics/soliton
```

```rust
use soliton_fields::exact::kdv_soliton;
use soliton_fields::{Complex64, Kdv, PeriodicGrid, Simulate, Simulation};

let mut sim = Simulation::new(PeriodicGrid::new(512, 60.0), Kdv, 1e-3);
sim.set_profile(|x| Complex64::new(kdv_soliton(x, 0.0, 4.0, -10.0), 0.0));
sim.advance(5000);
```

## Running the tests

```sh
cargo test --release
```

The tests compare every solver against closed-form solutions. See [Validation](/numerics/validation/) for the
current numbers.
