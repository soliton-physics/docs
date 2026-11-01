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
