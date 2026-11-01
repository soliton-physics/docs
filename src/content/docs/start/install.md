---
title: Install
description: Run the engine in the browser, in Python, or in Rust.
---

## Browser

Nothing to install. Open the [playground](https://soliton-playground.vercel.app/).

## Python

The `soliton` package wraps the Rust engine with NumPy arrays in and out. Until it is published on PyPI, build it
from source:

```sh
git clone https://github.com/soliton-physics/soliton
cd soliton/crates/soliton-py
uv venv && source .venv/bin/activate
uv pip install maturin numpy
maturin develop --release
```

```python
import numpy as np
from soliton import Simulation, kdv_soliton

sim = Simulation("kdv", points=512, length=60.0, dt=1e-3)
sim.state = kdv_soliton(sim.x, 0.0, speed=4.0, center=-10.0)
sim.step(5000)
print(sim.time, sim.invariants())
```

## Rust

```sh
cargo add soliton-core --git https://github.com/soliton-physics/soliton
```

```rust
use soliton_core::exact::kdv_soliton;
use soliton_core::{Complex64, Kdv, PeriodicGrid, Simulation};

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
