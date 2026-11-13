---
title: Python API
description: The soliton package.
sidebar:
  order: 2
---

```python
from soliton import Simulation, kdv_soliton, nls_bright_soliton
```

## `Simulation(model, points, length, dt)`

`model` is `"kdv"` or `"nls"`.

| Member | Description |
| --- | --- |
| `x` | grid positions, `float64[points]` |
| `state` | field in physical space, `complex128[points]`; assignable |
| `spectrum` | Fourier coefficients in FFT order |
| `time`, `dt`, `points`, `length` | read-only properties |
| `step(n=1)` | advance `n` time steps |
| `invariants()` | `dict` of conserved quantities |
| `reset_time()` | set the clock back to zero |

## Exact solutions

```python
kdv_soliton(x, t, speed, center)                   # complex128 array (imaginary part zero)
nls_bright_soliton(x, t, amplitude, velocity, center)
```

## Example: measure the phase shift in a KdV collision

```python
import numpy as np
from soliton import Simulation, kdv_soliton

sim = Simulation("kdv", 1024, 80.0, 5e-4)
sim.state = kdv_soliton(sim.x, 0, 6.0, -25.0) + kdv_soliton(sim.x, 0, 1.5, -5.0)
sim.step(16000)

crest = sim.x[np.argmax(sim.state.real)]
free_flight = -25.0 + 6.0 * sim.time
print("fast soliton advanced by", crest - free_flight)
```

## Mechanics

```python
from soliton import mechanics

mechanics.catalogue()                         # list of scenario specs with parameter schemas
scene = mechanics.scenario("rolling", angle=30, inertia_ratio=1.0)
scene.title, scene.labels, scene.answers()
run = scene.run(until=3.0, record_every=10)
run.t                                         # (N,)
run.body("disc")                              # dict: position, velocity, acceleration (N, 2); angle, angular_velocity (N,)
run.force("disc", "friction")                 # (N, 2)
run.energy()                                  # dict of (N,) arrays: kinetic, potential, dissipated, external_work, conserved
run.events                                    # [{'time': 2.37, 'kind': 'contact_begin', 'bodies': ['ground', 'disc']}, ...]
run.finished                                  # {'time': 2.37, 'reason': 'disc touched ground'} once the problem has ended, else None
scene.save("rolling.json"); mechanics.load("rolling.json")
mechanics.Scene.from_json(text)               # validated; errors name the problem

# Class 12: charges and fields
scene = mechanics.scenario("field-of-two-charges")
scene.electric_field(0.0, 1.0)                # (Ex, Ey) in N/C at a point, as the scene starts
scene.electric_potential(0.0, 1.0)            # volts
run.force("test charge", "electric")          # also "magnetic"
mechanics.scenario("gauss-law").electric_flux(-1.0, 0.0, 0.7)        # N·m²/C out of a sphere: q inside / ε₀
mechanics.scenario("bar-magnet-field").magnetic_field(0.2, 0.0)      # (Bx, By) in tesla, in the page

# Ray optics
from soliton import optics
bench = optics.scenario("convex-lens", focal=15, distance=40)
bench.answers()                               # {'Image distance, v (cm)': 24.0, ...} from the formulas
bench.measured()                              # the same, read off the traced rays
bench.rays()                                  # list of (N, 2) arrays of points, metres
bench.images()                                # [{'base': (0.24, 0.0), 'tip': (0.24, -0.018), 'real': True}]
optics.Bench.from_json(bench.to_json())       # scenes are data here too
```
