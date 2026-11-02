---
title: How the mechanics engine steps
description: Velocity Verlet, exact constraints, contact with friction, and the lessons learned making them agree with the textbook.
sidebar:
  order: 4
---

The full design is in the engine repository under `design/001` to `003`. This is the short version, with the
decisions that cost the most to get right.

## Integrator

Velocity Verlet: half a kick, a drift, half a kick. Symplectic, second order, and exact for constant acceleration,
so a projectile is reproduced to round-off at any time step. Forces that depend on velocity (drag) make the final kick
implicit; it is solved by a few fixed-point iterations to keep second order.

Forces that switch on or off at a given time are evaluated for the half-step they serve rather than at the instant, and
time is `steps × dt`, never accumulated, so "push 3 N for 2 s" gives exactly 4.000 m/s.

## Constraints: RATTLE

Rods, pins, slots and ropes are enforced exactly by impulses. After the drift, a SHAKE projection moves bodies back onto
the constraints along the gradients from the **start** of the step and corrects the half-step velocity to match; after
the final kick, a velocity projection along the **new** gradients removes any motion along the constraints.

Three things that looked harmless and were not:

- Using the current gradient instead of the start-of-step gradient in the position projection is a first-order energy
  error. A pendulum at 2 rad lost 10 % of its energy in ten periods. Fixed, the drift is 1.4e-7.
- Evaluating all constraint errors once per sweep is Jacobi iteration. It diverges on a seesaw with two masses pinned to
  the plank. Re-evaluating after each row is Gauss–Seidel and converges.
- Rope tension and rod tension are reported as the sum of the position and velocity multipliers over `dt`, each of which
  covers half the step. The position tolerance has to be tight because a residual `ε` reports as a force error `ε/dt²`.

## Contact and friction

Contacts are found after the drift and solved at the velocity level together with the constraints. Non-penetration
is an inequality with Newton restitution; friction decides per contact point whether static friction can hold, and
switches to kinetic friction otherwise. Penetration is removed by a position correction that leaves velocities alone,
because folding it into the velocity would corrupt the pre-impact speed.

Two more lessons:

- Friction acting only at the velocity level made a resting block creep downhill by half a gravity step per step and
  sliding distances first order. Each persistent contact's previous reaction is now applied as half an impulse in the
  opening kick, like an explicit force. Rest is exact and sliding distances are second order (stopping distance to 4e-9).
- A 1 µm contact margin let a resting box rock on alternate corners forever. A 0.1 mm margin keeps both corners in the
  contact set; a contact with a positive gap carries no force, so nothing hovers.

## Impacts

A contact is found after the drift, so an impact is detected up to one step late with the bodies overlapping by some
depth. The engine estimates how long ago the impact happened from the depth and the approach speed, corrects the
approach speed for the gravity gained in that time, aims the rebound at where the body would be had it bounced on
time, and reports the event at the interpolated instant. Bounce apex heights and landing times are then second
order: the first landing of a dropped ball is reported to 1e-6 s and successive apex ratios match $e^2$ to 3e-5.
