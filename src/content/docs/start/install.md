---
title: Install
description: Run the engine in the browser, or in Python.
---

## Browser

Nothing to install. Open the [playground](https://soliton-playground.vercel.app/). It always runs the latest engine,
and every live simulation in these docs is the playground embedded in the page.

## Packages

The engine is published on npm and PyPI as compiled packages. They are free to use, including commercially; see
the licence that ships with each package. Versions 0.8.0 and earlier are under MIT OR Apache-2.0.

### JavaScript

```sh
npm install @soliton-physics/engine
```

See the [JavaScript API](/reference/javascript/).

### Python

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

The engine is tested against closed-form solutions on every change. See [Validation](/numerics/validation/) for the
current numbers.
