---
layout: page
title: Proppant Embedment and Fracture Conductivity
description: Finite-volume contact mechanics of proppant embedment using solids4Foam (UW, current)
img:
importance: 1
category: research
---

Six years after first running STAR-CCM+ on the KCS benchmark, the question I have been asking all along has a new form: a single proppant grain pressed between two fracture walls in a shale reservoir, three kilometers underground. The interface between solid and fluid — which was a free surface near a cylinder in one project, a vibrating elastic membrane in another, an asymmetric cavity wall in a water tank — is now the contact patch between a sand grain and rock. The geometry has changed. The question hasn't.

A hydraulic fracture is only as productive as its conductivity — and conductivity depends on how far the proppant grain sinks into the rock. This project models that process from first principles.

At the **University of Wyoming** (advised by Prof. Soheil Saraji), I am developing a finite-volume solid-mechanics framework in [solids4Foam](https://solids4foam.github.io) (OpenFOAM-based) for proppant–rock contact. The current study treats a deformable particle and a Montney siltstone specimen through loading and unloading. Fracture conductivity is the motivating application; fluid flow and conductivity are not calculated in the current study.

**What makes this hard:**

- The grain is elastic; the rock yields plastically under sufficient stress
- Contact occurs at a point and spreads — the contact patch geometry determines everything
- Embedment changes the geometry available for flow; predicting conductivity requires a separate flow model
- The original claim of a first solids4Foam application to this problem remains a literature-review question, not an established result

**Implementation:**

- Axisymmetric wedge mesh with refinement near the contact zone
- Mohr–Coulomb elastoplastic rock model for Montney siltstone and a deformable elastic particle
- Penalty-based normal contact with a loading–unloading cycle
- Comparison with published indentation measurements, with mesh and contact convergence still under investigation
- Published experimental material properties, with unreported quantities identified as modeling assumptions; no refitting to the target indentation measurements

**Where this sits in the FSI picture:**

The current calculation is solid–solid contact mechanics. It separates deformation under load from residual indentation after unloading. Passing the resulting geometry to a flow solver is a planned one-way coupling step. Two-way coupling, in which fluid pressure changes effective stress and embedment, is a further extension.

**Status:** first paper _in preparation_ — _Computers and Geotechnics_

**Tools:** solids4Foam · OpenFOAM-2212 · ParaView · Ubuntu/VirtualBox

<details>
<summary>Earlier project description — retained for verification</summary>

The earlier overview referred to a J2 perfect-plasticity model for Haynesville / Eagle Ford shale, a structured O-grid, segment-to-segment contact, Hertz stress validation, and material inputs from triaxial and DCI compressibility testing. These descriptions are retained as historical project notes. Their supporting cases and relationship to the current Montney study still need to be checked; they should not be read as verified features or validation results of the current implementation.

The earlier overview also described a coupled solid–fluid framework and claimed that no prior study had applied solids4Foam contact mechanics to this problem. Coupling is an extension goal of the current contact study, and the priority claim requires a literature check.

</details>

---

I came into this project from ocean engineering — waves, vortices, elastic films, supercavitation. Geomechanics was a different language. The first weeks at Wyoming were spent unlearning assumptions that had been automatic for years and rebuilding intuition around stress, plasticity, and contact. OpenFOAM itself was familiar from the KAIST years; solids4Foam was not, and there was no roadmap for applying it to proppant contact. Some days the only progress was understanding one more line of the source code.

That kind of slow start is uncomfortable, but it is also where the understanding actually forms. Every project before this — the mesh in STAR-CCM+, the sensor data at Samsung, the vortex simulations, the film experiments, the supercavitation tank — was building toward a specific kind of question: what exactly happens at the interface between a solid and a fluid when one pushes on the other? This project is the most concentrated form of that question I have encountered. I intend to answer it.
