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
- [x] The NCERT class 11 catalogue, 35 scenarios with textbook answers
- [x] Scenes as JSON, finish rules, snapshots
- [x] A hand on the physics: grab a body in a running simulation
- [x] Newtonian gravity: a circular orbit, an elliptical orbit and Kepler's laws, escape velocity
- [x] Damped and driven oscillators, resonance, coupled oscillators
- [ ] A resonance curve as a graph
- [x] The rest of the class 11 catalogue that fits in a plane: stopping distance, a projectile on a slope, circular
      motion, connected blocks, the lift, recoil, springs that are run into, a glancing collision, torque on a rod,
      a vertical spring, springs in series and in parallel
- [ ] Motion in a horizontal circle seen from the side (banked road, conical pendulum): needs the third dimension

## Playground

- [x] Canvas-first stage, timeline scrubbing, one inspector
- [x] Sandbox: build a world from balls, boxes, ropes, rods, springs and pins, and share it by link
- [x] Gravity between bodies in the sandbox, with an orbits world to start from
- [x] Draw any shape corner by corner; inclines and walls as tools
- [ ] Notebook widget that reuses the playground's renderer

## Waves, class 11

- [x] Travelling waves on a string and in air, and the speed of a wave on a string
- [x] Superposition, pulses crossing, reflection at a fixed and at a free end
- [x] Standing waves on a string, air columns closed and open, beats
- [x] Read any point of a wave: displacement, velocity, amplitude, phase, and the phase difference between two points
- [x] A wave lab: take any wave apart into its sine waves and pulses, change them, add more, share by link
- [ ] The Doppler effect
- [ ] Waves in two dimensions: ripples and two-source interference

## Electromagnetism, class 12

- [x] Charge on a body; Coulomb's law between charges, fixed or free
- [x] Uniform electric and magnetic fields, everywhere or between plates
- [x] Field and potential read at any point; field lines
- [x] Electric flux through a closed surface, summed numerically; Gauss's law
- [x] Fixed wires, sheets and shells of charge
- [x] Bar magnets, compass needles, a uniform background field, field lines and a lattice of needles
- [x] Diamagnetic and paramagnetic samples in a magnet's field
- [x] Nineteen scenarios with textbook answers. Electric charges and fields: Coulomb's law, the field of two
      charges, a charged bob, deflection between plates, a balanced drop, a dipole, Gauss's law, a charged wire,
      a sheet, a shell. Potential: closest approach, an accelerating voltage. Moving charges: a circle in a
      magnetic field, the velocity selector, the cyclotron. Magnetism and matter: a bar magnet's field, a compass
      needle, neutral points, magnetic materials
- [x] Electromagnetic waves, from their formulas: displacement current, the travelling wave of E and B, standing
      waves off a metal sheet, the spectrum
- [ ] Charges, magnets and fields in the sandbox
- [ ] Capacitors and dielectrics; equipotentials
- [ ] Current electricity: Ohm's law, Kirchhoff's rules, the Wheatstone bridge
- [ ] The magnetic field of a current, and the force between two wires
- [ ] Induction, inductance, alternating current and the LCR circuit
- [ ] Ferromagnets and hysteresis
- [ ] A magnetic field in the plane acting on a moving charge (helical paths): needs the third dimension

## Optics, class 12

- [x] Exact ray tracing: reflection, Snell's law, total internal reflection, through mirrors, glass of any outline
      made of lines and arcs, and ideal thin lenses
- [x] Paraxial images, real and virtual, found from the rays
- [x] Fifteen scenarios with textbook answers: concave and convex mirrors, refraction at a flat surface, a glass
      slab, apparent depth, total internal reflection, an optical fibre, a curved surface, convex and concave
      lenses, the lens maker's formula, lenses in contact, the prism, the telescope, the compound microscope
- [ ] A bench of your own: place and move mirrors, lenses and blocks
- [ ] Dispersion: a refractive index that depends on colour, the spectrum from a prism, the rainbow
- [ ] The eye and its defects; the simple microscope; reflecting telescopes
- [ ] Wave optics: Huygens' principle, Young's double slit, diffraction, polarisation

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
