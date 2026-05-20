---
layout: post
title: "[Literature Review · UW #2] The Prescribed-Permeability Problem: Four Papers, One Bottleneck"
date: 2026-05-20 14:00:00-0600
description: A review of four recent papers on coupled flow–deformation in porous media — Dai et al. (2026), Wang et al. (2022), Ou et al. (2025), and Hilliard et al. (2024). Each paper attacks the same bottleneck from a different scale.
tags: FSI geomechanics OpenFOAM literature-review porous-media DEM
categories: research
related_posts: false
toc:
  sidebar: left
---

> Prepared for my second research meeting with Prof. Soheil Saraji at the University of Wyoming.

---

## The Common Bottleneck

In any coupled flow–deformation problem in porous media, there is one parameter that sits at the intersection of the solid and fluid physics: **permeability**. It governs how fluid moves. It depends on the pore geometry. And the pore geometry changes when the solid deforms.

Most existing frameworks sidestep this by **prescribing permeability** — either as a constant, or as a function of porosity via an empirical correlation (Kozeny-Carman, etc.). This works when deformation is small. It breaks down when the solid deforms significantly, when grains rearrange, or when fracturing changes the pore network entirely.

The four papers reviewed here all attack this bottleneck, but from different angles and scales:

| Paper | Scale | Approach | What they compute |
|-------|-------|----------|-------------------|
| Dai et al. (2026) | Macro | HM–DEM | Infiltration vs. fracturing regime transition |
| Wang et al. (2022) | Pore | CFD–DEM | Particle transport statistics |
| Ou et al. (2025) | Multi | Monolithic FSI | Permeability-free coupled solver |
| Hilliard et al. (2024) | Micro→Macro | DEM→CFD→Homogenization | κ(deformation) from first principles |

Reading them together, a clearer picture emerges: **none of them fully solves the problem**, but each one fills a gap the others leave open.

---

## Paper 1 — Dai et al. (2026): When Does Infiltration Become Fracturing?

**Full title:** *Confinement-controlled infiltration–fracturing transition in two-phase flow through deformable porous media*

### The gap they fill

Existing two-phase flow models in porous media treat the solid skeleton as **rigid**. In reality, pore pressure can deform the grain assembly — and past a threshold, it fractures rather than infiltrates. No prior model had quantified when and how this transition occurs.

### Their framework

A fully coupled hydro-mechanical DEM (HM–DEM) model where:
- Pore pressure ↔ grain deformation ↔ permeability evolution are all solved simultaneously
- Two phases (e.g., water–air, brine–CO₂) compete for pore space
- Confining stress is an explicit control parameter
- Benchmarked against Hele–Shaw experiments

### Key findings

The competition between stable infiltration and hydraulic fracturing is controlled by two dimensionless groups:

- **Ca\*** (modified capillary number): higher Ca\* → fracture-dominated regime
- **σc** (confining stress): higher σc → stabilized infiltration

They define a **composite morphology factor**:

$$R_c = 1 - S_f + \lambda$$

where $$S_f$$ is fracture saturation and $$\lambda$$ is a morphology parameter. The empirical transition band is $$R_c \in [0.19, 0.33]$$.

Viscosity ratio $$M$$ also matters: at $$M = 9778$$ (water–air), increasing confinement raises fracturing from random to directional. At $$M = 26$$ (brine–CO₂), confinement raises resistance uniformly.

**My take:** the transition band $$[0.19, 0.33]$$ is empirical. It works for their geometry and fluid pairs. The real question is whether $$R_c$$ is universal or just a correlation. For my proppant work, the analogous question is: under what closure stress does grain embedment transition from elastic deformation to plastic yielding and grain crushing? The structure of the problem is the same.

---

## Paper 2 — Wang et al. (2022): What Does a Single Particle Actually Do?

**Full title:** *Numerical simulation of flow behavior of particles in a porous media based on CFD-DEM*

### The gap they fill

Most pore-scale studies treat the fluid only — single-phase flow through a fixed solid geometry (Stokes/Darcy). Wang et al. introduce **actual particles** into the pore space and track them individually, quantifying how pore geometry, fluid viscosity, and flow velocity each affect particle transport.

### Their framework

CFD–DEM coupling where:
- Fluid phase: Navier–Stokes (continuum)
- Solid phase: Newton's equations for each grain + collision model
- Granular temperature $$\Theta$$ tracks velocity fluctuation intensity:

$$\Theta = \frac{1}{3}\langle v'^2 \rangle$$

### Key findings

**Effect of porosity (ε):**
- Low ε (0.55–0.60): particle blockage and deposition; residence time peaks
- ε ≈ 0.60: minimum residence time — the crossover between collision-dominated and mobility-dominated regimes
- High ε: smoother transport but longer path lengths

**Effect of fluid viscosity:**
- ↑ viscosity → ↓ axial velocity, ↑ residence time, ↑ contact force
- Higher viscosity damps fluctuations and pins particles near pore walls

**Effect of fluid velocity:**
- ↑ velocity → ↑ granular temperature (more chaotic motion)
- ↑ velocity → ↓ residence time (drag-dominated transport)

**My take:** the non-monotonic porosity effect is the most interesting result. There is an optimal porosity for transport efficiency — too tight causes clogging, too loose wastes travel distance. In a proppant pack, embedment reduces the effective pore aperture and can shift the pack from one regime to the other. Wang et al. give a framework for quantifying that shift.

---

## Paper 3 — Ou et al. (2025): Can We Ditch Prescribed Permeability Entirely?

**Full title:** *A monolithic fluid–structure interaction approach for multiscale flows with deformable porous media*

### The gap they fill

Every coupled flow–deformation solver eventually needs to evaluate permeability. Even sophisticated models compute it from porosity via Kozeny-Carman or similar — which is an empirical fit, not derived mechanics. Ou et al. ask: **can we write a single governing equation where permeability emerges from the physics rather than being prescribed?**

### Their framework

A **one-field monolithic FSI formulation**:
- Solid and fluid share one velocity field (the mixture momentum equation)
- Solid dynamics are embedded via **analytical penalization terms** — no explicit interface tracking or reconstruction
- Valid from pore scale to macro scale in a single framework

The key bridging parameter is a **heterogeneity factor ζ**, calibrated from a brief pore-scale run. ζ calibrates macro-scale momentum transfer based on pore-scale dynamics. Once calibrated, the macro-scale solver runs without further pore-scale input.

### Validation

Single cylinder sedimentation benchmark: settling velocity matches analytical solution within **1–3%**. The clean result demonstrates that the penalization approach correctly captures the solid–fluid interface without explicit tracking.

**My take:** the ζ calibration step is elegant but raises a question. If ζ depends on the pore geometry, and the pore geometry changes with deformation, does ζ need to be recalibrated at every deformation state? The paper does not fully address this. For problems with large deformation — like proppant packs under cyclic closure stress — this would be the critical limitation.

---

## Paper 4 — Hilliard et al. (2024): Computing κ(deformation) From First Principles

**Full title:** *Modeling flow and deformation in porous media from pore-scale to the Darcy-scale*

### The gap they fill

Hilliard et al. ask the most direct version of the bottleneck question: **how does permeability actually change as a granular assembly deforms?** Not via a correlation — from the mechanics.

### Their framework

A three-step micro-to-macro bridging workflow:

$$\text{DEM (load)} \;\longrightarrow\; \text{Pore geometry (voxelized)} \;\longrightarrow\; \text{CFD (Stokes flow)} \;\longrightarrow\; \text{Homogenization} \;\longrightarrow\; \kappa(\varepsilon)$$

At each load step, the DEM gives a new grain configuration. The pore space is voxelized into a hexahedral mesh. Stokes flow is solved. Homogenization extracts the effective permeability scalar. The result is a **permeability–deformation curve** derived from physics, not correlation.

### Key finding: hysteresis

Loading path (100 → 1000 kPa) and unloading path (1000 → 100 kPa) give **different permeability values** at the same load. The hysteresis is caused by **irreversible particle rearrangement** — grains that shift under load do not return to their original positions on unloading. This is a non-recoverable microstructural change.

**My take:** hysteresis is exactly what matters for hydraulic fractures under cyclic stress. If permeability is path-dependent, models that use only the current load state will be wrong whenever the loading history matters. Hilliard et al. demonstrate this clearly. The limitation they acknowledge — scalar permeability, no anisotropy — is significant: real grain assemblies under anisotropic loading will develop directional permeability, and the three principal values (K₁₁, K₂₂, K₃₃) they report but do not use suggest an anisotropic tensor extension is the natural next step.

---

## Synthesis: What Each Paper Leaves Open

Reading the four papers as a system:

| Paper | What they solved | What they left open |
|-------|-----------------|---------------------|
| Dai et al. | Macro-scale regime transition | Transition band is empirical; geometry-dependent |
| Wang et al. | Pore-scale particle transport statistics | Fixed pore geometry; no grain rearrangement |
| Ou et al. | Permeability-free monolithic FSI | ζ recalibration under large deformation unclear |
| Hilliard et al. | κ(deformation) from DEM+CFD | Scalar only; no anisotropic tensor |

The gap none of them fully fills: **a framework that derives anisotropic, path-dependent permeability from the evolving grain microstructure and feeds it back into a macro-scale coupled solver — consistently, without empirical closures.** Hilliard et al. come closest on the micro-to-macro side. Ou et al. come closest on the solver side. The combination of their approaches is an open problem.

---

## Connection to My Own Work

My proppant embedment work starts from the contact-mechanics side: how does the grain deform the rock, and what aperture does it leave? These four papers approach the same physical system from the fluid side: given a deforming grain pack, how does the fluid move through it?

The handoff point between the two approaches is exactly the permeability: my framework computes the deformed geometry; their frameworks need the deformed geometry to compute permeability. Building that bridge — from my solid mechanics output to a pore-scale permeability computation to a Darcy-scale flow solver — is the longer-term research direction these papers collectively motivate.

---

## References

- Dai, I. et al. (2026). Confinement-controlled infiltration–fracturing transition in two-phase flow through deformable porous media.
- Wang et al. (2022). Numerical simulation of flow behavior of particles in a porous media based on CFD-DEM.
- Ou et al. (2025). A monolithic fluid–structure interaction approach for multiscale flows with deformable porous media.
- Hilliard et al. (2024). Modeling flow and deformation in porous media from pore-scale to the Darcy-scale.
