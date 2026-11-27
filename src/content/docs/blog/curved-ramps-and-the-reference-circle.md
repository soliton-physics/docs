---
title: 'Curved ramps, a reference circle, and springs that behave: Soliton 0.10'
description: Smooth tracks of lines, arcs and corners, simple harmonic motion drawn as the shadow of a circle, and a sandbox that joins things the way you meant.
sidebar:
  label: Curved ramps and the reference circle
  order: 1
---

*28 November 2026*

*Soliton is a free physics engine that runs in your browser. This release started with a short video someone sent: a block slides down a curved ramp and strikes a second block that sits on a spring with a pendulum hanging from it. Could Soliton do that? Almost. It had no curves.*

Everything below is live at [solitonplay.com](https://solitonplay.com). The engine is on npm and PyPI as 0.10.0.

## Curves with no seams

The obvious way to make a curved ramp is to chain many short flat pieces. It looks fine and behaves badly: a box sliding over the chain catches its corner on every joint, loses a little speed each time, and judders.

So curves are now part of the engine itself. A **track** is built from three kinds of piece, each starting where the last one ended:

- a straight line of some length,
- a circular arc of some radius, turning left or right through some angle,
- a sharp corner, where a floor meets a wall or a ledge drops away.

Because each piece leaves in the direction the last one was heading, the joins are smooth unless you ask for a corner. And because the pieces are lines and circles, the engine can find the exact nearest point of the track to anything and the exact direction of the surface there. No pieces to catch on, no approximation to drift.

A track is solid on both faces. The same curve holds a ball inside it as a bowl and carries a box over it as a hump.

In the sandbox, the new **curved ramp** tool (key **U**) drops a U-shaped valley. Select it and you can make each side curved or a straight vertical wall, and set the curve's radius, how far it turns, and the length of the floor.

## The tests are textbook problems

Like every scene in Soliton, tracks don't ship until they pass tests that hold them to exact physics:

- **A bead in a bowl is a pendulum.** Its period must match the exact large-swing pendulum period, not the small-angle formula. It does, to one part in a thousand.
- **A ball inside a ring** must go over the top above the textbook speed, √(5gr) at the bottom. Below it, the ball must leave the ring at the height where the surface stops pushing, (u² − 2gr)/3g above the centre. Predicted: 0.9225 m. Measured: 0.9225 m.
- **A box riding back and forth across a valley** for ten seconds keeps its energy to one part in a hundred thousand.
- **A box sliding into a vertical wall** bounces back elastically and never passes the corner.
- **A box hanging a quarter of its length over a ledge** rests perfectly still on the ledge's edge.

## Two things the tests caught

**A ball on a curve looked like it was being hit, over and over.** A ball pressed against a curve keeps closing the gap to it: going straight would carry it into the bend. The engine decides whether contact is a gentle push or an impact by how fast the gap closes, and on a curve the steady closing looked like a blow on every other step. The motion still looked right, but the force on the ball flickered between its true value and zero. The fix: every contact now carries how sharply the surface bends there, and the engine counts the turning motion as part of the steady push. Flat surfaces report no bend, so nothing that worked before changed.

**A box can't follow a curve that changes direction.** Slide a flat-bottomed box over a bump and, at the point where the curve switches from bending down to bending up, its leading corner strikes the surface. That isn't a bug. The box turns one way over the crest and must turn the other way in the dip, and a rigid box can only do that with a knock. A ball has no corners and rolls over the same bump losing nothing. The test checks both, and checks that the energy the box loses is accounted for.

One thing a flat world can't have: a loop-the-loop with a run-in and a run-out. The path would have to cross itself, and wherever it crosses, the track would block the ball. Real loops get round this by moving sideways in the third dimension. A closed ring works perfectly.

## Springs that do what you meant

Then people started building with it, and springs turned out to be the most frustrating thing in the sandbox. Not because the physics was wrong, but because nothing explained it:

- **A click just beside a block pinned the spring to empty air.** Now a click within a few pixels of anything joins it, and while you're placing a spring a dashed line follows the pointer with a label saying what the click will do: *joins box*, or *pins to this point*.
- **The end attached wherever you clicked**, so a spring tied a little above a block's middle twisted it and sent it tumbling. Now an end on a box goes to the middle of the side facing the other end, as a textbook draws it.
- **A spring could start squeezed and nobody knew.** Set a natural length by hand, move things around, and the spring may start out pushing hard. Its panel now says so, *squeezed by 3.59 m: it pushes its ends apart with 3.59 N*, with a button to relax it.
- **Boxes can stay upright.** Like the ball's *Slides only*, a box can now be the textbook's sliding block that never tips.

## Simple harmonic motion as a shadow

The prettiest addition is the **reference circle**. Beside any body hanging on a single spring, a point goes round a circle at a steady rate, level with the point where the spring balances gravity. A dashed line ties its shadow to the mass, and they stay level the whole time. Beside it, the displacement–time graph draws itself out of the circle as the mass moves, and the sine wave appears live.

It is worked out from the mass, the stiffness and the motion, not drawn from a formula. Knock the mass, or let friction take hold, and the circle grows or shrinks at once. On the vertical spring it reads *A 0.245 m · ω 6.32 rad/s · T 0.993 s*, the same values the scenario checks against the textbook.

Open [A mass on a vertical spring](https://solitonplay.com/play?mode=mechanics&scenario=vertical-spring) and press play.

## Try it

- **Playground:** [solitonplay.com](https://solitonplay.com). Free, in any browser, nothing to sign up for.
- **Build a curved ramp:** open the [sandbox](https://solitonplay.com/play?mode=mechanics&sandbox) and press **U**.
- **Docs:** [writing a track in a scene file](https://docs.solitonplay.com/mechanics/scenes/#curved-tracks)
- **JavaScript:** `npm install @soliton-physics/engine`
- **Python:** `pip install soliton-physics`

If you build something with it, teach with it, or find something that gets the physics wrong, write to developer.zang.000@gmail.com.
