---
title: Scenes as JSON
description: Every scenario is a JSON file you can export, edit, load back and run in a notebook.
sidebar:
  order: 7
---

A scene is data. The scenario catalogue produces one, the playground loads one, and the Python package runs one.
Exactly the same engine runs in every case, so a scene a teacher edits in the playground gives the same numbers in a
student's notebook.

## Export, edit, load

In the playground, **Scene as JSON → Download** saves the current scenario with its parameters and textbook answers.
Edit it in any text editor and **Load file** to run it. The engine validates the file and names the problem if it cannot
build it: an unknown body id, a missing mass, an unsupported schema.

## The format

```json
{
  "schema": 1,
  "title": "Block pulled by a hanging mass",
  "world": { "gravity": [0, -9.8], "dt": 0.001 },
  "bodies": [
    { "id": "table", "kind": "static", "shape": { "polygon": [[-3, -0.4], [3, -0.4], [3, 0], [-3, 0]] }, "friction": [0.2, 0.15] },
    { "id": "block", "kind": "rigid", "mass": 2, "shape": { "rectangle": [0.6, 0.4] }, "position": [0, 0.2] },
    { "id": "weight", "kind": "particle", "mass": 1, "shape": { "circle": 0.1 }, "position": [3.1, -1] }
  ],
  "constraints": [
    { "rope": { "nodes": [
      { "attach": { "body": "block", "local": [0.3, 0] } },
      { "pulley": { "center": [3, 0.1], "radius": 0.1, "wrap": "clockwise" } },
      { "attach": { "body": "weight" } }
    ] } }
  ],
  "focus": "block",
  "answers": [ { "name": "Acceleration (m/s²)", "value": 2.0 } ],
  "finish": [ { "when": { "contact": ["weight", "ground"] } }, { "when": { "time": 3 } } ]
}
```

### Bodies

| Field | Meaning |
| --- | --- |
| `id` | name used by forces, constraints, `focus` and the free-body diagram |
| `kind` | `particle` (no rotation), `rigid`, or `static` (never moves) |
| `shape` | `{"circle": r}`, `{"rectangle": [w, h]}`, `{"polygon": [[x, y], ...]}`, `{"halfplane": {"normal": [nx, ny], "offset": d}}`, `{"track": {...}}` (see [Curved tracks](#curved-tracks)) |
| `mass` | required for `particle` and `rigid` |
| `position`, `angle`, `velocity`, `angular_velocity` | initial state; default zero. Polygon vertices may be given about any origin; the centre of mass becomes the body's position |
| `friction` | `[static, kinetic]`; default smooth |
| `restitution` | default 1 (elastic); the pair uses the smaller of the two bodies' values |
| `inertia` | override the shape's moment of inertia |
| `charge` | electric charge in coulombs, at the body's centre; default none. A charged `static` body is a fixed charge |
| `magnet` | `{"moment", "length"}`: makes the body a bar magnet along its own x axis, with moment in A·m² from south pole to north and `length` metres between the poles |
| `magnetisable` | `{"susceptibility", "volume"}`: a small sphere of a material a magnet magnetises; χ negative for a diamagnet, positive for a paramagnet |

### Curved tracks

A track is a fixed surface made of straight pieces and circular arcs, joined end to end. The joins are smooth unless you put a sharp corner in, so balls and boxes ride along it without catching. It is solid on both faces: a body can ride inside a bowl or over a hump of the same track. A track must be `static`.

The track starts at the body's `position` and sets off in the direction of its `angle`. Each piece carries on from where the last one ended, heading the same way:

- `{"line": length}` goes straight ahead for `length` metres.
- `{"arc": {"radius": r, "angle": a}}` turns through `a` radians on a circle of radius `r`. A positive angle turns left (counter-clockwise), a negative one turns right. An arc turns at most a full circle (2π).
- `{"corner": a}` turns sharply on the spot through `a` radians, positive left, where a floor meets a wall or a ledge drops away. A corner sits between two pieces that are not corners, and turns less than a half turn (π).

`thickness` is the track's full thickness in metres, default 0.1. The surface lies half of it either side of the line the pieces trace.

A U-shaped valley, 2 m deep with a 2 m flat floor whose surface is at y = 0.05. It starts at the top of the left wall heading straight down (`angle` −π/2), turns a quarter circle to level, runs along the floor, and turns another quarter circle back up:

```json
{ "id": "valley", "kind": "static", "position": [-3, 2], "angle": -1.5707963267948966,
  "shape": { "track": { "pieces": [
    { "arc": { "radius": 2, "angle": 1.5707963267948966 } },
    { "line": 2 },
    { "arc": { "radius": 2, "angle": 1.5707963267948966 } }
  ] } } }
```

A full circle (`{"arc": {"radius": r, "angle": 6.283185307179586}}`) is a ring: a ball launched along its inside needs the textbook √(5 g r) at the bottom to go over the top. In a flat world a loop cannot have a run-in and a run-out, because the path would have to cross itself.

A ramp that curves down on the left and meets a vertical wall on the right, in a sharp corner:

```json
"pieces": [
  { "arc": { "radius": 2, "angle": 1.5707963267948966 } },
  { "line": 3 },
  { "corner": 1.5707963267948966 },
  { "line": 2 }
]
```

In the playground sandbox, the curved ramp tool (U) places a valley. Select it to make each side curved or vertical and to change the curve's radius, how far it turns, the length of the floor and the thickness.

### Forces

`{"applied": {"body", "force", "point"?, "from"?, "until"?}}`, `{"torque": {"body", "torque"}}`,
`{"spring": {"a", "b", "stiffness", "rest_length"?, "pushes_only"?}}`, `{"linear_drag": {"body", "coefficient"}}`,
`{"quadratic_drag": {...}}`, `{"driving": {"body", "amplitude", "angular_frequency", "phase"?}}`,
`{"gravitation": {"constant", "fixed"?: [{"at": [x, y], "mass"}]}}`,
`{"electrostatics": {"fixed"?: [...]}}`, `{"electric_field": {"field": [Ex, Ey], "region"?, "angular_frequency"?, "phase"?}}`,
`{"magnetic_field": {"strength", "region"?}}`, `{"magnetostatics": {"background"?: [Bx, By]}}`.

A spring with `"pushes_only": true` has a free end: it pushes when squeezed shorter than its natural length and does
nothing otherwise, which is the spring a block runs into.

`gravitation` is Newton's law between every pair of moving bodies, and from each fixed mass: the planet a satellite
goes round. A scene in space sets `world.gravity` to `[0, 0]`. If it takes hours, add `"playback": 400` at the top
level, the seconds of simulation to show per second of watching.

`electrostatics` is Coulomb's law between every pair of charged bodies. `electric_field` is a uniform field in N/C
and `magnetic_field` one in tesla, perpendicular to the page and positive towards you. Either fills the plane, or
only the rectangle `"region": {"min": [x, y], "max": [x, y]}`. An electric field with an `angular_frequency`
alternates as a cosine.

`electrostatics` can also hold fixed spreads of charge in `fixed`: `{"wire": {"at": [x, y], "density"}}`, a long
wire through the page in C/m; `{"sheet": {"point": [x, y], "normal": [nx, ny], "density"}}`, a large sheet seen
edge on in C/m²; and `{"shell": {"centre": [x, y], "radius", "charge"}}`. A top-level
`"surface": {"centre": [x, y], "radius"}` is a closed sphere to total the electric flux through.

`magnetostatics` makes every body with a `magnet` act on every other, pole on pole, and on every `magnetisable`
body, in a uniform `background` field in tesla that lies in the page: the earth's.

Anchors are `{"fixed": [x, y]}` or `{"body": {"id": "...", "local": [x, y]}}`.

### Constraints

`{"pin": {"a", "b"}}`, `{"rod": {"a", "b", "length"?}}`, `{"slot": {"body", "origin", "direction", "local"?}}`,
`{"fixed_angle": {"body", "angle"}}`, and `{"rope": {"nodes": [...], "length"?}}` whose nodes are
`{"attach": {"body", "local"?}}`, `{"peg": [x, y]}`, `{"pulley": {"center", "radius", "wrap"}}` for a massless
pulley, or `{"wheel": {"body", "radius", "wrap"}}` for a rigid body the rope turns without slipping.
A rope or rod without a length is taut at the start.

### Other fields

`focus` names the body the free-body diagram shows first; `answers` carries textbook values to show beside the
simulation; `view` is `{"center": [x, y], "half_height": h}` for the camera, with an optional `half_width` when the
whole flight must fit; `ignore_collisions` lists body pairs that should not touch. Bodies joined by a pin or rod never
collide with each other.

`finish` says where the problem ends. The playground pauses there, so the graphs show exactly the motion the question
is about, and Play carries on past it. The first rule to fire wins:

| Rule | Fires when |
| --- | --- |
| `{"contact": ["a", "b"]}` | the two bodies first touch |
| `{"separation": ["a", "b"]}` | two touching bodies come apart |
| `{"rest": 0.5}` | every moving body has been still for that many seconds |
| `{"time": 3}` | the clock reaches that time |

A rule may add `"hold": 1` to keep going for a second after it fires, which lets a collision be watched to separation.
Contacts that exist at the start are never announced as events, and a launched ball starts a hair above the ground so
it begins free.

## In the playground

Choose **Remix** on any scenario and it opens in the sandbox as your own copy. Move bodies, add balls, boxes, shapes you
draw corner by corner, inclines, walls, ropes, rods, springs and pins, change masses and friction, and press play.
Click a rope, rod or spring to change its length or stiffness. Shift-click selects several bodies, which move, copy
(Ctrl+C, Ctrl+V), duplicate (Ctrl+D) and delete together. **Save** downloads the scene as JSON, **Open**
loads one, and **Share** copies a link that carries the whole scene. Under **Gravity** you choose the downward pull
(Earth, Mars, the Moon, none) and how strongly bodies pull on each other; the **Orbits sandbox** in the gallery starts
you with a sun and two planets. Edit a paused run and the playground first takes
the world as it stands, so the change applies to what you see.

## In a notebook

```python
from soliton import mechanics

scene = mechanics.scenario("atwood", m1=2, m2=3)
scene.answers()                     # {'Acceleration (m/s²)': 1.96, 'Tension (N)': 23.52}
run = scene.run(until=2.0)
run.t, run.body("m2")["velocity"]   # NumPy arrays, shape (N,) and (N, 2)
run.force("m2", "tension")          # (N, 2)
run.energy()["dissipated"]
scene.save("atwood.json")           # the file the playground loads

edited = mechanics.load("atwood.json")
```
