---
layout: page
title: Proppant Embedment and Fracture Conductivity
description: Coupled solid–fluid simulation of proppant-rock contact mechanics using solids4Foam (UW, current)
img:
importance: 1
category: research
---

A hydraulic fracture is only as productive as its conductivity — and conductivity depends on how far the proppant grain sinks into the rock. This project models that process from first principles.

At the **University of Wyoming** (advised by Prof. Soheil Saraji), I am developing a coupled solid–fluid simulation framework in [solids4Foam](https://solids4foam.github.io) (OpenFOAM-based) to model a single proppant grain pressed between two shale fracture walls under closure stress.

**What makes this hard:**

- The grain is elastic; the rock yields plastically under sufficient stress
- Contact occurs at a point and spreads — the contact patch geometry determines everything
- The deformed fracture aperture directly sets the permeability for single-phase flow
- No prior study had applied solids4Foam contact mechanics to this class of problem

**Implementation:**

- Structured O-grid mesh concentrating resolution at the contact zone
- J2 perfect-plasticity rock constitutive model for Haynesville / Eagle Ford shale
- Penalty-based segment-to-segment contact algorithm
- Stress distribution validated against Hertz contact theory before introducing plasticity
- Rock material properties from triaxial cell and DCI compressibility testing (real data, not assumed values)

**Where this sits in the FSI picture:**

This is contact mechanics — solid on solid — with fluid behavior determined by the resulting geometry. The coupling is one-way at the grain scale: solid deformation sets the aperture, aperture sets the flow. The next step is two-way coupling at the fracture scale: fluid pressure changes the effective stress, which changes the embedment.

**Status:** first paper _in preparation_ — _Computers and Geotechnics_

**Tools:** solids4Foam · OpenFOAM-2212 · ParaView · Ubuntu/VirtualBox

---

I came into this project from ocean engineering — waves, vortices, elastic films. Geomechanics was a different language. The first weeks at Wyoming were spent unlearning assumptions that had been automatic for years and rebuilding intuition around stress, plasticity, and contact. OpenFOAM itself was familiar, but solids4Foam was not, and there was no roadmap for applying it to proppant contact. Some days the only progress was understanding one more line of the source code. That kind of slow start is uncomfortable, but it is also where the understanding actually forms.
