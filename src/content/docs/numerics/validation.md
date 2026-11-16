---
title: Validation
description: How we know the numbers are right.
sidebar:
  order: 3
---

Every solver in the engine ships with tests that run in CI on every change. Three kinds:

1. **Exact solutions.** Start from a closed-form soliton, run for many periods, compare pointwise.
2. **Invariants.** Compute the conserved quantities before and after and demand they agree to round-off.
3. **Qualitative physics.** Two solitons must emerge from a collision with their original amplitudes.

## Mechanics

| Scenario | Checked | Result |
| --- | --- | --- |
| Projectile | position against the closed form at any time step | round-off |
| Mass on a spring | period against Verlet's known dispersion, energy drift | 1e-8, 1e-5 |
| Atwood machine, block and hanging mass | acceleration, tension, normal force | round-off |
| Simple pendulum, 2 rad | period against the elliptic integral, convergence order | 1.7e-8, order 2.0 |
| Block on incline | at rest with friction $m g \sin\theta$; sliding acceleration | 1e-10 |
| Sliding block | stopping distance, friction work, ledger drift | 4e-9, 5e-10, 3e-9 |
| Collisions | elastic and inelastic outgoing velocities, energy lost, 90° scattering of equal discs | 1e-10 |
| Rolling disc | rolling acceleration and $v = \omega R$; slipping when $\mu_s$ is too small | 1e-8 |
| Seesaw | balanced stays still; tipping angular acceleration | 1e-9 |
| Bouncing ball | apex ratios $e^2$, first landing time | 3e-5, 1e-6 s |
| Massive pulley, flywheel | acceleration, both tensions, rim speed | 1e-8 |
| Circular orbit | speed constant, closes after one period, energy | 1e-4, one step, 1e-9 |
| Elliptical orbit | farthest point and slowest speed; areal velocity (Kepler's second law) | 1e-5, 1e-10 |
| Escape velocity | maximum height below it; speed far away above it | 1e-5 |
| Two free masses | circle their common centre: separation, momentum, energy | 1e-7, 1e-12, 1e-9 |
| Damped oscillator | position against the closed form over six seconds | 1e-5 m |
| Driven oscillator | steady amplitude below, near and above resonance | 2e-3 |
| Coupled oscillators | each normal mode against one cosine; beats against the sum of two | 2e-5 m, 5e-5 m |
| Stopping distance | distance and time to stop | 1e-6, 2 ms |
| Projectile on an incline | time of flight and range on three slopes | 5e-4, 8 cm |
| Uniform circular motion | speed, radius, tension | round-off, round-off, 1e-5 |
| Two blocks and a string | acceleration and tension, with and without friction | 1e-8 |
| Lift | the floor's push at four accelerations, including free fall | 1e-6 N |
| Recoil | both speeds, total momentum | 1e-10, 1e-9 |
| Block and ball on a spring | greatest compression, energy | 1e-4 |
| Glancing collision | right angle, momentum, energy; angle and speeds | round-off; 0.5°, 1 % |
| Torque on a rod | angular speed and angle after two seconds | 1e-8, 1e-5 |
| Vertical spring, springs in parallel and in series | period | 1e-5, 1e-5, 2e-3 |
| Coulomb's law | force and acceleration at the start; speed at twice the distance; energy | round-off, 2e-3, 1e-7 |
| Field of two charges | field and force at a test charge; zero potential on the midline | round-off |
| Charged bob in a field | furthest angle; rest at the equilibrium angle, with its tension | 1e-4, 1e-9 |
| Charge between plates | deflection on leaving and on the screen, either sign of charge | 3e-3 |
| Balanced drop | stays still at the balancing field; acceleration away from it | 1e-9 |
| Dipole in a field | centre does not move; small-swing period; energy | 1e-9 m, 2e-3, 1e-6 |
| Closest approach | turning distance; energy | 1e-5, 1e-7 |
| Accelerating voltage | leaving speed at two gaps; supply's work equals kinetic energy | 1e-3, 1e-6 |
| Charge in a magnetic field | speed, radius, return to the start, zero work | round-off, 1e-5, two steps, exact |
| Velocity selector | lands on the centre line at E/B; bent the right way either side | 1e-9 m |
| Cyclotron | time per turn; supply's work equals kinetic energy; leaves near qBR/m | 3 %, 1e-4, within 20 % |
| Two free charges | orbit each other: momentum, energy | 1e-15, 1e-6 |
| Gauss's law | flux summed over a sphere round one charge, both, neither; part of a wire or a shell inside | 1e-3, 2e-3 |
| Charged wire | circle and speed at two distances; energy | 1e-4, 1e-6 |
| Charged sheet | same acceleration at two distances; an opposite charge returns to its start | 1e-6, 1 cm |
| Charged shell | velocity unchanged inside; speed outside from the energy equation | 1e-12, 1e-3 |
| Bar magnet | field on the axis and beside the middle against the formulas; ratio far away | round-off, 1e-3 |
| Compass needle | small-swing period; fastest spin from 60°; centre does not move | 2e-3, 1e-4, 1e-9 m |
| Neutral points | field at the predicted point, either way round | 1e-9 of the earth's |
| Magnetic materials | force at the start, pushed or pulled the right way; energy | 1e-6, 1e-6 |
| Free magnets and a magnetised bead | momentum, angular momentum, energy | 1e-15, 1e-12, 1e-6 |
| Every catalogue scenario | builds, runs, round-trips through JSON | passes |

## Thermal physics

A few hundred molecules fluctuate, so these are tested within a stated tolerance, on a fixed random seed.

| What | Test | Error |
|---|---|---|
| Energy of an insulated gas | 300 molecules, 20 000 steps, over a thousand collisions | 1e-12 |
| First law | piston moving and walls at a temperature: ΔU = Q + W | 1e-9 |
| Reproducibility | the same seed gives the same gas, molecule for molecule | exact |
| A wall at a temperature | brings the gas to that temperature | 3 % |
| Gas law | pressure from wall blows against NkT/V, four combinations of N, T, V | 4 % |
| Maxwell's distribution | mean and root mean square speed after relaxing from equal speeds | 2 %, 1 % |
| Mixture | each gas alone reaches the common temperature; rms speeds | 6 %, 4 % |
| Isothermal compression | work; final pressure; mean temperature | 6 %, 5 %, 3 % |
| Adiabatic compression and expansion | final temperature and pressure; work; zero heat | 3 %, 5 %, 7 %, exact |
| Free expansion | temperature unchanged; zero work; pressure halves | 1e-12, exact, 6 % |
| Mixing | share of each gas in each half | 8 % |
| Brownian grain | its mean temperature and rms speed | 25 %, 15 % |
| Carnot cycle | efficiency; work in each isothermal stroke; first law over the cycle | 10 %, 6 %, 1e-9 |
| Every thermal scenario | builds, round-trips through JSON; an overfull box is refused | passes |

## Modern physics

| What | Test | Error |
|---|---|---|
| Einstein's equation | caesium: threshold 579 nm; 400 nm light gives 0.96 eV | 1e-3 eV |
| Photoelectrons counted | at +1 V, 0 V, half the stopping potential and beyond it | 2.5 of 40 a second |
| Below the threshold | no electrons at full brightness | exact |
| de Broglie wavelength | 100 V and 54 V | 1e-4 nm |
| Davisson–Germer | hump for 54 V on nickel at 50.9°; read off the pattern | 0.2°, 1.5° |
| Alpha, head on | 7.7 MeV on gold turns back at 29.5 fm | 0.1 fm |
| Alpha, integrated path against Rutherford's formula | impact parameters 10, 30, 80, 200 fm | 0.15° |
| Bohr atom | −13.6 eV, 0.0529 nm, 656.3 nm, 121.5 nm, Balmer limit 364.5 nm | 0.5 nm or better |
| Radioactive decay, 2500 nuclei | left after one and two half-lives; mean life | 3 σ; 0.4 s |
| Liquid-drop formula | iron-56 and uranium-238; every measured value from calcium up | 0.1; 0.12 MeV per nucleon |
| D + T fusion | from measured binding energies | 17.59 ± 0.02 MeV |

## Statistical mechanics

| What | Test | Error |
|---|---|---|
| Onsager's formulas | critical temperature; magnetisation at T = 1; energy at T = 0 and at the critical point | 1e-14, 1e-6, 1e-9, 1e-6 |
| Ising lattice at absolute zero | stays ordered; energy −2 J, and −2.5 J in a field of 0.5 | exact |
| Ising lattice when hot | no magnetisation; energy −2 tanh(1/T) | 0.06, 0.02 |
| Metropolis against Onsager | energy and magnetisation at T = 1.5, 2, 3, 4 | 0.06 J; 0.04 below T꜀, 0.12 above |
| Cooling through the transition | specific heat peaks at T꜀; every point away from it against Onsager | 0.2; 0.06 J |
| Darts | π after 400 000 points, against its expected error | 3 σ |
| Random walkers | rms distance against √N at 100, 400, 1600 steps | 5 % |
| Reproducibility | the same seed gives the same run | exact |

## Circuits

| What | Test | Error |
|---|---|---|
| A cell and a resistor | current, terminal voltage, power supplied equals power taken | round-off |
| Junction rule | currents into every junction of the Wheatstone bridge | 1e-12 A |
| A loop of ideal cells; a battery across a wire | refused as having no answer | passes |
| An open switch | the part cut off carries nothing; closing it restores the current | exact |
| Charging capacitor | voltage against the exponential over three time constants | 1e-6 |
| A switch thrown part way | charging starts then, from the state just before | 5e-3 |
| LC circuit | energy and voltage after five periods | 1e-9, 1e-4 |
| Series LCR | amplitude by complex numbers against the formula; against stepping in time | 1e-12, 1e-4 |
| Bridges and potentiometer | zero at the balance point; opposite signs either side | 1e-9 mA |
| Steady scenarios across their sliders | every measured answer | 1e-12 |
| Series LCR at 10, 50, 200 Hz and at resonance | impedance, current, lag, voltages | 1e-9 |
| Every circuit scenario | measured answers; round trip through JSON | 1e-3, passes |

## Ray optics

| What | Test | Error |
|---|---|---|
| Reflection | angle of reflection equals angle of incidence, 0° to 80° | round-off |
| Refraction | Snell's law at 5° to 85°; a ray sent back retraces its path | round-off |
| Total internal reflection | refracts 0.01° inside the critical angle, reflects 0.01° beyond it | exact |
| Ideal thin lens | five rays from one point, to the edge of the lens, all through the image point | round-off |
| Spherical mirror | near-axis rays cross at R/2; a ray at half the radius crosses well short | 1e-6 |
| Mirror formula, concave and convex | image distance and magnification at five object distances | 1e-6 |
| Lens formula, convex and concave | the same; no image reported with the object at the focus | 1e-6 |
| Flat surface, slab, apparent depth, curved surface | traced angles and image against the formulas | 1e-9, 1e-6 |
| Prism | deviation at four angles; least at the predicted angle and larger either side | 1e-9 |
| Optical fibre | only total reflections inside the acceptance angle; leaks 5° outside it | exact |
| Lens maker's formula | a real lens 8 mm thick against the thin-lens focus; marginal focus short of it | 2 % |
| Lenses in contact, telescope, microscope | focal length and magnifying power | 1e-4, 1e-9, 1e-6 |
| Every optics scenario | builds, traces, round-trips through JSON | passes |

## Waves

| Equation | Test | Error |
| --- | --- | --- |
| KdV | single soliton, $t = 5$ | $5 \times 10^{-8}$ |
| KdV | two-soliton invariants, 8000 steps | drift $< 10^{-8}$ |
| KdV | collision amplitude recovery | within $0.02$ of exact |
| NLS | moving bright soliton, $t = 10$ | $3 \times 10^{-9}$ |
| NLS | two-soliton invariants, 10000 steps | drift $< 10^{-8}$ |

Reproduce with:

```sh
git clone https://github.com/soliton-physics/soliton
cd soliton && cargo test --release
```

The playground shows the invariants and their drift live in the side panel, so you can watch the solver's accuracy
while it runs.
