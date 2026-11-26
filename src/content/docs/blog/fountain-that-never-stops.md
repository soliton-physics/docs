---
title: 'A fountain that never stops: four new scenes in Soliton 0.9.2'
description: The butterfly effect, the pendulum wave, three stars on a figure eight and the collision fountain, and the rounding error that nearly broke the fountain.
sidebar:
  label: A fountain that never stops
  order: 1
---

*26 November 2026*

*Soliton is a free physics engine that runs in your browser. This release adds four scenes that sit beyond the syllabus. They aren't there to teach a chapter. They're there because they're beautiful, and because each one has an exact fact the engine must get right.*

You can open all four at [solitonplay.com/play](https://solitonplay.com/play), under **Showcase**.

## Nothing is animated

Most physics on the web is animation: someone wrote down the answer and moved a picture along it. Soliton works the other way round. An engine written in Rust and compiled to WebAssembly takes the bodies, the forces and the constraints, and steps them forward in time. It uses velocity Verlet, a method that keeps energy honest over long runs.

So every scene can be checked. Each one comes with an automated test that holds it to a fact, and a scene that fails its fact doesn't ship.

## 1. The butterfly effect

Three double pendulums are let go side by side, each started a thousandth of a degree from the one before. For about five seconds you can't tell them apart. Then the tiny difference doubles, and doubles again, and the three trace completely different paths.

The test holds the scene to two facts:

- the pendulums really do part, from under a thousandth of a metre apart at 2 s to more than 30 cm apart at 30 s;
- through all of it, each pendulum keeps its energy to within 2%.

The chaos is in the physics, not in rounding errors.

## 2. The pendulum wave

Fifteen pendulums hang from one support, each a little shorter than the last. In one cycle the longest swings 18 times, the next 19, the next 20, and so on. Started together, they drift out of step into travelling waves, split into two rows, then three, scatter completely, and at the end of the cycle fall back into one perfect line.

The catch is that the textbook's period formula, T = 2π√(L/g), is only true for small swings. At a 22° swing it is wrong enough that the row would never come back together. So each length is tuned to the pendulum's true period at that swing. The test checks that after 45 seconds every pendulum is back at its starting angle to within half a degree.

## 3. Three stars on a figure eight

The three-body problem has no general solution. Three masses pulling on one another usually end in chaos or an ejection. But in 1993 Cris Moore found, by computer, an orbit in which three equal stars chase one another round a figure eight for ever. Alain Chenciner and Richard Montgomery proved it exists in 2000.

Soliton starts the three stars from the published initial conditions and lets gravity do the rest. The test runs five full laps and checks that each star is back where it started, and that the total energy hasn't moved by more than a hundredth of a percent. There's a slider to nudge the middle star, so you can see how much the dance can take before it breaks.

## 4. The collision fountain

This one is new, and it is the one I'm proudest of.

Two smooth inclines make a V. Inside it, pairs of balls fly in nested arcs. Each pair meets over the middle at the very top of its arc, where the two balls are moving straight at each other. When two equal balls collide elastically head-on, they swap velocities, so each goes straight back the way it came. It then falls to its incline.

The arc is chosen so that the ball strikes the incline **square on**, at exactly 90°. A ball that hits a wall square on bounces straight back, so it climbs back up the very arc it came down and meets its partner again. Projectile, incline, collision, and repeat for ever.

Each arc is tuned so that its pair meets once more per cycle than the pair outside it. They start together, ripple out of step in waves that run up and down the fountain, and after 30 seconds every pair meets at once again.

The test runs a full cycle and checks that every ball is back where it started. The worst drift is under 0.05 mm, after hundreds of bounces and collisions.

### The bug that almost killed it

My first version had the balls slide up ramps and leap off the end. It fell apart within seconds. A 0.05% loss of speed on landing moved the return path by about a centimetre, so the ball clipped the lip of its ramp and flew off the screen.

The second version, the one above, should have worked, and it did for a few seconds. Then the left and right sides drifted apart and pairs started crashing into each other.

The reason is that two balls colliding in mid-air are a balance on a knife edge. If one ball is even slightly higher than its partner at the moment they meet, the line between their centres tilts, and the collision sends them off at an angle. I modelled it separately: a lopsided error of one part in 100,000 grew to several metres within 20 seconds.

The lopsided error came from the computer itself. The two inclines were mirror images on paper, but inside the engine they were built from their corners by arithmetic that rounded a hair differently on each side, around one part in 10¹⁶. That was enough.

The fix was to describe each incline as a pure mirror image of the other, with nothing that could round differently. Now the left and right sides stay identical to the very last bit, and the fountain plays for as long as you let it run.

## Also in 0.9.2

- **Drawn paths.** Scenes can mark bodies whose paths are drawn as glowing, fading trails. Trails show up in the playground, and you can use them in your own scenes.
- **Bodies that pass through each other.** A scene can now let chosen pairs of bodies pass through each other, so several separate experiments can share one picture.
- **151 simulations in all**, covering every chapter of NCERT physics for class 11 and 12.

## Try it

- **Playground:** [solitonplay.com](https://solitonplay.com). Free, in any browser, nothing to sign up for.
- **Docs:** [docs.solitonplay.com](https://docs.solitonplay.com)
- **JavaScript:** `npm install @soliton-physics/engine`
- **Python:** `pip install soliton-physics`

If you teach, build something with it, or find a scene that gets the physics wrong, I'd love to hear from you: developer.zang.000@gmail.com.
