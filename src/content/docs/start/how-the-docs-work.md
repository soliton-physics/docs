---
title: How the docs work
description: Three layers per topic, so you can stop wherever you are comfortable.
---

Every physics page follows the same shape.

### Layer 1: Intuition

Plain words, pictures, and a live simulation. No equations. If you only read this layer you will still understand what
the phenomenon is and why it happens.

### Layer 2: The mathematics

The governing equation, where it comes from, and its exact solutions. This is what you would find in a good textbook,
written to be read rather than skimmed.

### Layer 3: The numerics

How the engine actually solves it, which method, why that one, and the validation results that prove it works.
This layer links straight into the source code.

Live simulations are the real engine running in your browser through WebAssembly. They are not videos. Drag the sliders,
and the numbers you see are being computed as you watch.
