---
title: Roadmap
description: Where the engine is going.
---

The engine grows one validated solver at a time. Each new piece lands with its three-layer docs page and a playground
scenario.

## Classical mechanics (current)

- [x] Bodies, forces, velocity Verlet, the energy ledger
- [x] Pins, rods, ropes over pulleys, massive pulleys and flywheels
- [x] Contact with Coulomb friction and restitution, impact timing
- [x] The NCERT class 11 catalogue, 16 scenarios with textbook answers
- [x] Scenes as JSON, finish rules, snapshots
- [x] A hand on the physics: grab a body in a running simulation
- [ ] Newtonian gravity: orbits, Kepler's laws, escape velocity
- [ ] Damped and driven oscillators, resonance, coupled oscillators
- [ ] The rest of the class 11 catalogue: banked roads, conical pendulum, springs in series

## Playground

- [x] Canvas-first stage, timeline scrubbing, one inspector
- [x] Sandbox: build a world from balls, boxes, ropes, rods, springs and pins, and share it by link
- [ ] Draw any polygon; inclines and walls as tools
- [ ] Notebook widget that reuses the playground's renderer

## Nonlinear waves

- [x] Korteweg–de Vries
- [x] Focusing nonlinear Schrödinger
- [ ] Sine-Gordon (kinks, antikinks, breathers)
- [ ] Modified KdV
- [ ] Dealiasing and adaptive time stepping
- [ ] Inverse scattering diagnostics: soliton content of an initial condition

## Two-dimensional fields

- [ ] 2D NLS and Gross–Pitaevskii with vortices
- [ ] WebGPU field rendering in the playground

## Research tooling

- [x] PyPI and npm releases
- [ ] Differentiable simulations for inverse problems and parameter fitting
- [ ] Reproducible run manifests
