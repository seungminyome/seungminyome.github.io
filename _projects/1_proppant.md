---
layout: page
title: Proppant Embedment and Fracture Conductivity
description: Finite-volume contact mechanics of proppant embedment using solids4Foam (UW, current)
img:
importance: 1
category: research
---

Six years after first running STAR-CCM+ on the KCS benchmark, the question I have been asking all along has a new form: a single proppant grain pressed between two fracture walls in a tight reservoir, three kilometers underground. The interface between solid and fluid — which was a free surface near a cylinder in one project, a vibrating elastic membrane in another, an asymmetric cavity wall in a water tank — is now the contact patch between a sand grain and rock. The geometry has changed. The question hasn't.

A hydraulic fracture is only as productive as its conductivity — and conductivity depends on how far the proppant grain sinks into the rock. This project models that process from first principles.

At the **University of Wyoming** (advised by Prof. Soheil Saraji), I am developing a finite-volume solid-mechanics framework in [solids4Foam](https://solids4foam.github.io) (OpenFOAM-based) for proppant–rock contact. The current study presses a 1 mm deformable ball into a Montney siltstone specimen and then unloads it. Fracture conductivity is the motivating application; fluid flow and conductivity are not calculated in the current study.

**What makes this hard:**

- The grain is elastic; the rock yields plastically under sufficient stress
- Contact occurs at a point and spreads — the contact patch geometry determines everything
- Embedment changes the geometry available for flow; predicting conductivity requires a separate flow model
- The target is a dimensionless law for peak-load and post-unloading depth; the finite-volume model is the data generator, not the claim

**Implementation:**

- Axisymmetric wedge mesh refined near the contact zone
- Mohr–Coulomb elasto-plastic rock model for Montney siltstone and a deformable elastic particle
- Penalty-based normal contact through a loading–unloading cycle
- Measured rock properties taken from published Montney siltstone data (Zheng et al., 2020); quantities that were never measured, such as the dilation angle, are stated as modeling assumptions, and nothing is fitted to the indentation data

**Verification status:**

- Against published Brinell tests (22 samples, 35 N), the computed peak depth on three finer meshes is 15.2–17.1 µm vs. 15.2 ± 2.4 µm measured; mesh and contact convergence are still under investigation
- A Hertz elastic benchmark currently recovers only 79% of the applied load; this is reported as an open check
- Blind predictions of eight published proppant-pack tests have a 69% mean absolute error, traced to grain-size scaling (R<sup>1.0</sup> in the model vs. R<sup>0.47</sup> measured, unchanged by mesh or dilation)

**Where this sits in the FSI picture:**

The current calculation is solid–solid contact mechanics. It separates deformation under load from residual indentation after unloading. Passing the resulting geometry to a flow solver is a planned one-way coupling step. Two-way coupling, in which fluid pressure changes effective stress and embedment, is a further extension.

**Status:** first manuscript _in preparation_ — _Acta Geotechnica_; a joint peak/end-depth surrogate reproduces the finite-volume data to 1.45% / 2.29% in 19-group nested cross-validation

**Tools:** solids4Foam · OpenFOAM-2212 · ParaView · Ubuntu/VirtualBox

---

I came into this project from ocean engineering — waves, vortices, elastic films, supercavitation. Geomechanics was a different language. The first weeks at Wyoming were spent unlearning assumptions that had been automatic for years and rebuilding intuition around stress, plasticity, and contact. OpenFOAM itself was familiar from the KAIST years; solids4Foam was not, and there was no roadmap for applying it to proppant contact. Some days the only progress was understanding one more line of the source code.

That kind of slow start is uncomfortable, but it is also where the understanding actually forms. Every project before this — the mesh in STAR-CCM+, the sensor data at Samsung, the vortex simulations, the film experiments, the supercavitation tank — was building toward a specific kind of question: what exactly happens at the interface between a solid and a fluid when one pushes on the other? This project is the most concentrated form of that question I have encountered. I intend to answer it.
