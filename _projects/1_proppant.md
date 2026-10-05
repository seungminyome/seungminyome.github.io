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

- Residual depth converges slowly with mesh; every condition is being re-run on three mesh levels with Richardson extrapolation and uncertainty bands (≈750 runs, UW MedicineBow, Oct. 2026)
- The Hertz elastic benchmark passes with the revised contact settings (depth within 1% of the analytical solution, full load recovered)
- Blind predictions of eight published proppant-pack tests show a grain-size-dependent mismatch (R<sup>1.0</sup> scaling in the model vs. R<sup>0.47</sup> measured) that neither mesh refinement nor dilation angle removes; reported as a model limit

**Where this sits in the FSI picture:**

The current calculation is solid–solid contact mechanics. It separates deformation under load from residual indentation after unloading. Passing the resulting geometry to a flow solver is a planned one-way coupling step. Two-way coupling, in which fluid pressure changes effective stress and embedment, is a further extension.

**Status:** manuscript _in preparation_ — a dimensionless predictive equation for residual embedment, fitted by nested leave-family-out cross-validation, with its range of validity stated by factor

**Tools:** solids4Foam · OpenFOAM-2212 · ParaView · Ubuntu/VirtualBox

---

I came into this project from ocean engineering — waves, vortices, elastic films, supercavitation. Geomechanics was a different language. The first weeks at Wyoming were spent unlearning assumptions that had been automatic for years and rebuilding intuition around stress, plasticity, and contact. OpenFOAM itself was familiar from the KAIST years; solids4Foam was not, and there was no roadmap for applying it to proppant contact. Some days the only progress was understanding one more line of the source code.

That kind of slow start is uncomfortable, but it is also where the understanding actually forms. Every project before this — the mesh in STAR-CCM+, the sensor data at Samsung, the vortex simulations, the film experiments, the supercavitation tank — was building toward a specific kind of question: what exactly happens at the interface between a solid and a fluid when one pushes on the other? This project is the most concentrated form of that question I have encountered. I intend to answer it.
