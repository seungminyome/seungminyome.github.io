---
layout: page
title: MAU Propeller Design for a Container Ship
description: Full propeller design pipeline — Bp-δ chart, MOPTI optimization, KPA4 detailed design, tip unloading, KR strength evaluation (PNU, undergraduate)
img:
importance: 7
category: research
---

The KCS project asked: given this hull moving at this speed, what resistance does the fluid impose? This project asked the inverse: given that resistance, design the rotating surface that overcomes it. Same ship. Opposite direction of causality.

As an undergraduate at **Pusan National University** (advised by Prof. Munchan Kim), I carried out the full propeller design sequence for a container ship — from initial sizing through detailed blade geometry to Korean Register strength evaluation. The ship was real in the sense that matters: all specifications came from an actual design case, and the final geometry had to pass a regulatory fatigue criterion, not just look reasonable on paper.

---

### Design Specification

| Parameter           | Value                     |
| ------------------- | ------------------------- |
| Ship type           | Container vessel          |
| Design speed        | 22.5 knots                |
| MCR (Max. Cont.)    | 38,570 PS × 102.0 rpm     |
| NCR (Normal Cont.)  | 34,710 PS × 98,5 rpm      |
| Number of blades    | 4                         |
| Series              | MAU                       |
| Material            | Copper alloy (CU3, 60 MPa)|

---

### Step 1 — Initial Design: Taylor's B_p–δ Chart

The starting point for any propeller design is the B_p–δ diagram: a family of curves derived from systematic model tests, encoding the relationship between power coefficient B_p, advance coefficient δ, pitch ratio P/D, expanded blade area ratio A_E/A₀, and open-water efficiency η₀. Every line on the chart is the distillation of decades of tow-tank experiments.

I evaluated three MAU series types — 4-40, 4-55, and 4-70 (the suffix indicating the nominal expanded area ratio) — at the NCR condition:

$$B_p = \frac{N \cdot P^{0.5}}{V_A^{2.5}} = 15.667 \qquad \sqrt{B_p} = 3.958$$

Reading the intersection from the optimum-efficiency curve:

| Parameter | Value  |
| --------- | ------ |
| δ         | 48.1   |
| P/D       | 0.884  |
| η₀        | 0.657  |
| D         | 8.077 m|

Blade area ratio was checked against the **Burrill cavitation criterion** (5% back-cavitation limit). At the computed thrust loading, the minimum required A_E/A₀ came out to 0.625. The MAU 4-55 series (A_E/A₀ = 0.625) sat exactly on the boundary — acceptable, but with no margin. I used this as the initial value and carried it forward for verification.

---

### Step 2 — MOPTI Verification

The MOPTI optimization program runs the same B_p–δ logic numerically rather than graphically, iterating over blade number, area ratio, and advance coefficient to find the efficiency peak. Running MOPTI on the same inputs returned:

| Parameter | B_p–δ Chart | MOPTI  | Error  |
| --------- | ----------- | ------ | ------ |
| A_E/A₀    | 0.625       | 0.589  | 6.3%   |
| P/D       | 0.884       | 0.794  | 11.5%  |
| D (m)     | 8.077       | 8.313  | 2.8%   |

The diameter agreed well; the pitch ratio diverged. This is a known characteristic of the B_p–δ approach — the chart optimizes graphically along a single curve, while MOPTI sweeps the full parameter space. I treated the chart result as the starting geometry and proceeded to detailed design, with MOPTI as a consistency check.

**Open-water coefficients at design point:** K_T = 0.151, 10K_Q = 0.195, J_A = 0.642.

---

### Step 3 — Detailed Design: KPA4 and Tip Unloading

Detailed design converts the initial parameters into a full blade geometry: chord length, thickness, pitch, and camber at each radial station from r/R = 0.2 to 1.0. This was done using the KPA4 program, which solves the lifting-line circulation distribution and iterates toward a specified radial load shape.

The target radial load distribution is **elliptical** — it minimizes induced losses by distributing circulation in a way that produces the smallest possible trailing vortex sheet for a given total thrust. In practice, the blade tips carry too much load in the initial geometry, so the process is iterative:

1. Run KPA4 with the initial pitch and camber distributions
2. Compare the resulting load distribution against the elliptical target
3. Reduce pitch and camber near the tip (tip unloading) to shift load inboard
4. Re-run; repeat

This cycle ran **10 iterations** before the load distribution converged to within tolerance of the elliptical target. Each iteration required manually adjusting the pitch and camber values at every radial station — six to eight numbers per iteration, rechecking the Burrill criterion at each step to confirm cavitation margin was not being eroded as tip loading decreased.

**Final performance at NCR:**

| Parameter         | Target  | Result  | Error  |
| ----------------- | ------- | ------- | ------ |
| Ship speed (knots)| 22.50   | 22.67   | +0.75% |
| RPM               | 96.837  | 96.89   | 0.05%  |

---

### Step 4 — KR Blade Strength Evaluation

The Korean Register requires a fatigue-based thickness check at two critical sections: 0.25R (the blade root, maximum bending moment) and 0.60R (a secondary check at higher rotational speed). The required chord-section thickness is derived from the blade torque, material fatigue allowable, and a geometry factor K_m.

Material: copper alloy CU3, tensile strength 60 MPa. Stress concentration factor K_m = 1.3.

| Section | Required thickness | Designed thickness | Result |
| ------- | ------------------ | ------------------ | ------ |
| 0.25R   | 231.97 mm          | 266.53 mm          | **PASS** (+14.9%) |
| 0.60R   | 109.45 mm          | 151.90 mm          | **PASS** (+38.8%) |

Both sections cleared the minimum with margin. The larger margin at 0.60R reflects the fact that mid-span thickness is set primarily by hydrodynamic requirements (camber and chord for the target lift) rather than driven to its structural minimum.

---

### Final Blade Geometry (offset table excerpt)

| r/R  | Pitch (mm) | Chord (mm) |
| ---- | ---------- | ---------- |
| 0.20 | 6,428      | 485        |
| 0.35 | 7,018      | 1,020      |
| 0.50 | 7,389      | 1,495      |
| 0.65 | 7,609      | 1,790      |
| 0.80 | 7,728      | 1,950      |
| 0.95 | 7,951      | 1,640      |
| 1.00 | 8,068      | —          |

---

### What this project taught me

The Bp–δ chart is disarmingly simple — locate a point, read off P/D and η₀. But everything behind that point is a century of systematic tow-tank experiments, non-dimensionalized and folded into a curve. Working through it by hand, verifying it against MOPTI, then carrying each parameter through to a blade section that either passes or fails the KR check — that sequence made the choices visible in a way that a software black-box would not.

Tip unloading in particular was instructive. The elliptical load distribution is an ideal. The physical blade can only approximate it, and each iteration of pitch and camber adjustment was a negotiation between the hydrodynamic ideal and the geometric reality. At some point the distribution was close enough. Deciding what "close enough" meant, and whether the cavitation margin had been maintained, required holding the whole design in mind at once.

The blade is a hydrofoil — a surface under differential pressure, suction face against pressure face. Cavitation initiates at the suction face when local pressure falls below vapor pressure. The KR check asks whether the blade can sustain that pressure loading without fatigue failure at the root. These are two faces of the same object under the same load, looked at from fluid mechanics and structural mechanics in turn.

At PNU I was treating them as separate calculations, run in sequence. The question that I would spend years learning to answer was: what happens when they are coupled?

**Tools:** Taylor's B_p–δ chart · MOPTI · KPA4 / KPA4b / SERVICE · KR Propeller Strength Rules

**References:**

- Korean Register of Shipping, _Rules for the Classification of Steel Ships_, Part 3: Machinery.
- Carlton, J. S. (2012). _Marine Propellers and Propulsion_, 3rd ed. Butterworth-Heinemann.
- ITTC – Recommended Procedures 7.5-02-03-01.4: Propulsion/Propeller Open Water Test.
