---
title: Scenes as JSON
description: Every scenario is a JSON file you can export, edit, load back and run in a notebook.
sidebar:
  order: 6
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
  "answers": [ { "name": "Acceleration (m/s²)", "value": 2.0 } ]
}
```

### Bodies

| Field | Meaning |
| --- | --- |
| `id` | name used by forces, constraints, `focus` and the free-body diagram |
| `kind` | `particle` (no rotation), `rigid`, or `static` (never moves) |
| `shape` | `{"circle": r}`, `{"rectangle": [w, h]}`, `{"polygon": [[x, y], ...]}`, `{"halfplane": {"normal": [nx, ny], "offset": d}}` |
| `mass` | required for `particle` and `rigid` |
| `position`, `angle`, `velocity`, `angular_velocity` | initial state; default zero. Polygon vertices may be given about any origin; the centre of mass becomes the body's position |
| `friction` | `[static, kinetic]`; default smooth |
| `restitution` | default 1 (elastic); the pair uses the smaller of the two bodies' values |
| `inertia` | override the shape's moment of inertia |

### Forces

`{"applied": {"body", "force", "point"?, "from"?, "until"?}}`, `{"torque": {"body", "torque"}}`,
`{"spring": {"a", "b", "stiffness", "rest_length"?}}`, `{"linear_drag": {"body", "coefficient"}}`,
`{"quadratic_drag": {...}}`, `{"driving": {"body", "amplitude", "angular_frequency", "phase"?}}`.

Anchors are `{"fixed": [x, y]}` or `{"body": {"id": "...", "local": [x, y]}}`.

### Constraints

`{"pin": {"a", "b"}}`, `{"rod": {"a", "b", "length"?}}`, `{"slot": {"body", "origin", "direction", "local"?}}`,
`{"fixed_angle": {"body", "angle"}}`, and `{"rope": {"nodes": [...], "length"?}}` whose nodes are
`{"attach": {"body", "local"?}}`, `{"peg": [x, y]}`, `{"pulley": {"center", "radius", "wrap"}}` for a massless
pulley, or `{"wheel": {"body", "radius", "wrap"}}` for a rigid body the rope turns without slipping.
A rope or rod without a length is taut at the start.

### Other fields

`focus` names the body the free-body diagram shows first; `answers` carries textbook values to show beside the
simulation; `view` is `{"center": [x, y], "half_height": h}` for the camera; `ignore_collisions` lists body pairs that
should not touch. Bodies joined by a pin or rod never collide with each other.

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
