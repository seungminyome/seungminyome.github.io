---
layout: page
title: Proppant Embedment and Fracture Conductivity
description: Coupled solid–fluid simulation of proppant-rock contact mechanics using solids4Foam (UW, current)
img:
importance: 1
category: research
---

Six years after first running STAR-CCM+ on the KCS benchmark, the question I have been asking all along has a new form: a single proppant grain pressed between two fracture walls in a shale reservoir, three kilometers underground. The interface between solid and fluid — which was a free surface near a cylinder in one project, a vibrating elastic membrane in another, an asymmetric cavity wall in a water tank — is now the contact patch between a sand grain and rock. The geometry has changed. The question hasn't.

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

I came into this project from ocean engineering — waves, vortices, elastic films, supercavitation. Geomechanics was a different language. The first weeks at Wyoming were spent unlearning assumptions that had been automatic for years and rebuilding intuition around stress, plasticity, and contact. OpenFOAM itself was familiar from the KAIST years; solids4Foam was not, and there was no roadmap for applying it to proppant contact. Some days the only progress was understanding one more line of the source code.

That kind of slow start is uncomfortable, but it is also where the understanding actually forms. Every project before this — the mesh in STAR-CCM+, the sensor data at Samsung, the vortex simulations, the film experiments, the supercavitation tank — was building toward a specific kind of question: what exactly happens at the interface between a solid and a fluid when one pushes on the other? This project is the most concentrated form of that question I have encountered. I intend to answer it.
