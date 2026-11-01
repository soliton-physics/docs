---
title: Pseudo-spectral methods
description: Why we solve wave equations in Fourier space.
sidebar:
  order: 1
---

## The idea

A periodic function is a sum of sine waves. Differentiating a sine wave just multiplies it by its wavenumber.
So if you store a field as its Fourier coefficients $\hat u_k$, every spatial derivative is a multiplication:

$$
\widehat{\partial_x u}_k = i k\, \hat u_k, \qquad \widehat{\partial_x^3 u}_k = (ik)^3\, \hat u_k .
$$

No finite-difference stencil, no truncation error in the derivative. For smooth fields the error decays faster than
any power of the grid spacing. This is called spectral accuracy.

## The "pseudo" part

Nonlinear terms like $u^2$ are awkward in Fourier space (they become convolutions). So the engine goes back and forth:

1. inverse FFT to get $u$ on the grid,
2. compute $u^2$ pointwise,
3. FFT back and multiply by $-3ik$.

That round trip is the pseudo-spectral method. The FFT makes it cost $O(N \log N)$ per evaluation.

## Grid and wavenumbers

The engine uses a periodic grid on $[-L/2, L/2)$ with $N$ points, and wavenumbers in FFT order
$k = \frac{2\pi}{L}\,(0, 1, \dots, N/2 - 1, -N/2, \dots, -1)$.
Pick $L$ large enough that nothing important reaches the boundary, and $N$ large enough that the Fourier spectrum of
the solution has decayed to round-off before the highest wavenumber.

## What is not yet here

- Dealiasing (the 2/3 rule) for strongly nonlinear or under-resolved runs.
- Non-periodic boundaries via Chebyshev or mapped domains.

Both are on the [roadmap](/roadmap/).
