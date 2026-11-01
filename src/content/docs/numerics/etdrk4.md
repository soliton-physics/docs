---
title: ETDRK4 time stepping
description: Exponential time differencing for stiff dispersive equations.
sidebar:
  order: 2
---

## The problem with dispersion

In Fourier space the KdV linear operator is $L(k) = i k^3$. At the highest resolved wavenumber this is enormous.
An ordinary explicit scheme such as RK4 would need a time step small enough to resolve the fastest oscillation on the
grid, which is far smaller than the physics requires. The equation is **stiff**.

## Treat the linear part exactly

Write the equation as $u_t = L u + N(u)$. The linear part alone has the exact solution $e^{L t} u_0$.
Exponential time differencing uses that exact solution and integrates only the nonlinear term approximately:

$$
u(t_{n+1}) = e^{L h}\, u(t_n) + \int_0^h e^{L (h - \tau)}\, N\big(u(t_n + \tau)\big)\, d\tau .
$$

ETDRK4 (Cox & Matthews 2002) approximates the integral with a fourth-order Runge–Kutta style set of stages.
The result: the time step is limited by the nonlinear dynamics, not by the grid.

## The coefficient trick

The scheme needs functions like $\varphi(z) = (e^z - 1)/z$ evaluated at $z = hL(k)$. For small $z$ these suffer
catastrophic cancellation. Kassam & Trefethen (2005) evaluate them as a mean over a circle in the complex plane
centred on $z$, which is exact for entire functions by the mean value property and numerically stable.

Their recipe uses a half circle and takes the real part, which is valid only when $L$ is real.
Our operators are purely imaginary, so the engine averages over the **full circle**. This matters: with the half-circle
version the NLS solver silently loses mass.

## Where it lives

[`crates/soliton-core/src/stepper/etdrk4.rs`](https://github.com/soliton-physics/soliton/blob/main/crates/soliton-core/src/stepper/etdrk4.rs).
The coefficients are precomputed once per simulation, so each step costs four nonlinear evaluations, eight FFTs in total.
