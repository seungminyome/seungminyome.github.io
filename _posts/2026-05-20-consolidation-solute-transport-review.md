---
layout: post
title: "From Biot to OpenFOAM: A Genealogy of Consolidation-Induced Solute Transport"
date: 2026-05-20 10:00:00-0600
description: A paper review tracing how 80 years of porous media theory — from Biot (1941) to Wang & Jeng (2024) — was assembled into a 3D OpenFOAM solver. Includes a synthesis table, parametric findings, and my own extension ideas.
tags: geomechanics OpenFOAM solute-transport poromechanics literature-review
categories: research
related_posts: false
toc:
  sidebar: left
---

> This post is adapted from a paper review I prepared for my first research meeting with Prof. Soheil Saraji at the University of Wyoming. The central question I set out to answer: *"How were classical consolidation and porous media theories translated into a 3D OpenFOAM solver?"*

---

## The Problem in One Sentence

When a load is applied to a saturated porous medium — say, a landfill pressing on soft clay, or overburden compressing a shale layer — the resulting pore pressure changes drive fluid flow, and that flow carries dissolved solutes with it. The solid deforms. The fluid moves. The chemistry follows. This coupling across mechanics, hydraulics, and transport is **consolidation-induced solute transport**.

It sounds like one problem. Historically, it took six papers and eight decades to fully assemble it.

---

## The Genealogy Map

Rather than reading these papers as a list, I found it more useful to read them as a **relay race**: each paper picks up exactly one thing the previous one left unresolved. Here is that chain:

```
1941  Biot ──────────────────────────────── 3D coupled u–p (deformation + pore pressure)
        │
        ├── 1961  Bear ─────────────────── Tensor form of dispersion (how solutes spread)
        │
        ├── 1964  Coats & Smith ──────────── Dead-end pore volume (non-Fickian transport)
        │
        └── 1993  Fredlund ───────────────── Unsaturated extension (air + water in pores)
                    │
                    └── 2000  Smith ──────── 1D coupling: consolidation drives q and n,
                                              which drive the ADE
                                  │
                                  └── 2024  Wang & Jeng ── 3D OpenFOAM + parametric analysis
```

What I find elegant about this genealogy is that **no paper is redundant**. Biot gave the mechanical skeleton. Bear gave the transport description. Coats & Smith revealed that the pore space is not homogeneous. Fredlund extended the framework to unsaturated conditions. Smith finally **wired mechanics to transport** in a single algorithm. Wang & Jeng lifted that algorithm from 1D to 3D and handed it to an open-source solver.

---

## The Roots: Biot (1941) and Bear (1961)

### Biot — The mechanical backbone

Before Biot, consolidation was a 1D problem (Terzaghi, 1923). Biot's contribution was to write coupled governing equations for a 3D deforming porous solid saturated with fluid:

$$
\left(K + \frac{1}{3}G\right)\nabla(\nabla \cdot \mathbf{u}) + G\nabla^2\mathbf{u} - \alpha \nabla p = \mathbf{f}
$$

$$
\alpha \frac{\partial \varepsilon}{\partial t} + S_p \frac{\partial p}{\partial t} = \frac{\kappa}{\mu} \nabla^2 p
$$

The first equation is mechanical equilibrium (elastic solid + pore pressure gradient). The second is mass conservation (storage + Darcy flow). Together, they say: **the skeleton deforms because of effective stress, the pore pressure dissipates because of Darcy flow, and the two processes happen simultaneously.**

This is the foundation everything else builds on.

### Bear — The transport description

Bear (1961) addressed a different question: once fluid is moving through a porous medium, how do dissolved species spread? His key insight was that hydrodynamic dispersion is a **second-rank tensor** — the spreading is directional, governed by the local velocity field and the geometric tortuosity of the pore space. The advection–dispersion equation (ADE):

$$
\frac{\partial (n C)}{\partial t} + \nabla \cdot (\mathbf{q} C - n \mathbf{D} \nabla C) = 0
$$

Biot gave us $$\mathbf{q}$$ (Darcy velocity). Bear told us what to do with it to track a solute.

---

## The Extensions: Coats & Smith (1964) and Fredlund (1993)

### Coats & Smith — The pore space is not uniform

The standard ADE assumes all pore fluid participates in transport. Coats & Smith showed experimentally that effluent concentration profiles deviated systematically from this prediction: breakthrough came earlier than expected, and tailing was longer. Their explanation: some pore volume is **dead-end** (stagnant), and mass transfer between mobile and immobile fluid introduces an additional capacitance term. This matters whenever the pore structure is heterogeneous — which is almost always.

### Fredlund — What happens when the soil is not fully saturated?

Classical consolidation assumed fully water-filled pores. Fredlund (1993) introduced two independent stress state variables — net normal stress $(\sigma - u_a)$ and matric suction $(u_a - u_w)$ — to describe soils where air and water coexist. This extension is critical for near-surface geotechnical problems and contamination scenarios where the vadose zone plays a role.

**My observation:** Fredlund's contribution is often treated as a parallel track to the main consolidation–transport story. But it becomes essential as soon as you want to model a landfill liner or a contaminated vadose zone — settings where partial saturation is the norm, not the exception.

---

## The Coupling Blueprint: Smith (2000)

This is the paper I consider the **keystone** of the entire genealogy.

Smith (2000) asked: *"How does consolidation-induced flow change solute transport?"* The answer seems obvious in hindsight — consolidation changes the Darcy velocity $$\mathbf{q}$$ and the porosity $$n$$, and both appear directly in the ADE — but writing it down as a coupled, solvable algorithm required careful bookkeeping.

The one-way coupling chain is:

$$
\text{Loading} \;\xrightarrow{\text{Biot}}\; p(x,t),\; \mathbf{u}(x,t) \;\xrightarrow{\text{Darcy}}\; \mathbf{q}(x,t) \;\xrightarrow{\text{ADE + adsorption}}\; C(x,t)
$$

The coupling is **one-way**: mechanics drives flow, flow drives transport, but transport does not feed back into mechanics. This is a simplification, but it is a tractable one, and it captures the dominant physics for most consolidation-transport problems.

Smith demonstrated this for a 1D quasi-steady-state reference problem. The framework was later extended to finite-strain formulations (Peters & Smith, 2002). But the 1D constraint remained the main limitation — real loads produce fully 3D pressure and velocity fields.

---

## Wang & Jeng (2024): Lifting 1D to 3D

Wang & Jeng (2024) made the move that was overdue: they implemented Smith's coupling framework in three dimensions using OpenFOAM (v8). The key contributions:

1. **Integrated Biot storage + elasticity + ADE** in a single numerical procedure
2. **Developed two new OpenFOAM solvers** — one for consolidation, one for solute transport
3. **One-way coupling**: consolidation solver → Darcy velocity field → transport solver
4. **Validated** against Smith's (2000) 1D analytical solution (under effectively 1D boundary conditions)
5. **Parametric sensitivity analysis** across six physical parameters

### What the parametric analysis revealed

The model domain is a 3D box with a centrally loaded region. Load increases linearly over two years, then holds constant. The observable quantities are excess pore pressure $$p$$, vertical displacement $$u_z$$, and fluid-phase solute concentration $$C_f$$.

| Parameter | Direction | Effect on $$p$$ | Effect on $$u_z$$ | Effect on $$C_f$$ |
|-----------|-----------|-----------------|-------------------|-------------------|
| Hydraulic conductivity $$K$$ ↑ | Faster drainage | Dissipates faster | Larger early deformation | Faster vertical migration |
| Shear modulus $$G$$ ↓ | Softer skeleton | Moderate | Larger total settlement | Faster solute migration |
| Saturation $$S_r$$ | Affects storage | Minor | Minor | Minor |
| Poisson's ratio $$\nu$$ ↓ | More compressible | Moderate | — | Faster vertical migration |
| Partitioning coefficient $$K_d$$ ↑ | Stronger adsorption | — | — | Reduced vertical transport; accumulation in upper layers |
| Anisotropy ratio $$K_x/K_z \gg 1$$ | Horizontal preference | — | — | Directional plume elongation |

**The insight that stood out to me:** the concentration field is controlled through three *separate* pathways. $$K$$ acts through flow speed. $$G$$ acts through deformation magnitude. $$K_d$$ acts through chemistry. In 1D, these pathways superpose along a single axis and their effects are hard to isolate. In 3D, they produce distinct spatial signatures — which is exactly why 3D modeling matters.

### The anisotropy cases

The anisotropy results are particularly instructive. Three cases:

- **Isotropic** ($$K_x = K_y = K_z$$): symmetric concentration plume, no directional preference
- **Symmetric horizontal anisotropy** ($$K_x = K_y > K_z$$): larger horizontal spreading, vertical penetration similar to isotropic
- **Asymmetric horizontal anisotropy** ($$K_y > K_x > K_z$$): the plume elongates toward the high-permeability direction

This third case is the most realistic for natural geologic formations, where depositional history creates different permeabilities in each principal direction. The model captures this directly.

---

## Synthesis Table

This table summarizes what each paper *defined*, *solved*, and *left open* — the three questions I used to organize the review.

| Reference | Main contribution | Dim. | Key physics | Role in chain |
|-----------|------------------|------|-------------|---------------|
| Biot (1941) | 3D consolidation theory; $$\mathbf{u}$$–$$p$$ coupling | 3D | Poroelastic coupling | Base: storage + elasticity |
| Bear (1961) | Tensor form of dispersion in porous media | — | Directional dispersion | Standard ADE terms |
| Coats & Smith (1964) | Dead-end pore volume; capacitance model | 1D exp. | Non-Fickian transport | Better transport closure |
| Fredlund (1993) | State variables for unsaturated soils | — | Suction, compressibility | Unsaturated extension |
| Smith (2000) | Coupled consolidation–transport algorithm | 1D | Deformation affects $$\mathbf{q}$$ and $$n$$ | **Coupling blueprint** |
| Wang & Jeng (2024) | 3D OpenFOAM solver + sensitivity analysis | 3D | $$K$$, $$G$$, $$S_r$$, $$\nu$$, $$K_d$$, anisotropy | Reproducible 3D platform |

---

## My Extension Ideas

Reading this genealogy, I immediately started thinking about what is *still* missing. A few directions that seem tractable:

**1. Two-way coupling.** Wang & Jeng use one-way coupling (mechanics → transport). In systems where solute concentration affects fluid density or viscosity — dense contaminant plumes, high-salinity brines — this assumption breaks down. A two-way coupled solver would let concentration feed back into the flow field.

**2. Dead-end pore volume in 3D.** Coats & Smith's capacitance model has never (to my knowledge) been implemented in a 3D OpenFOAM setting. In natural soils and fractured rock, stagnant pore volume is ubiquitous. Adding it would make the transport solver substantially more realistic.

**3. Layered anisotropy as a field variable.** Currently, the anisotropy ratio is a scalar applied uniformly. Real geological formations have spatially varying fabric. Implementing $$K$$ and elastic parameters as spatially distributed fields — read from CT images or geostatistical models — would connect this framework to digital rock physics.

**4. Coupling with reactive transport.** The current model handles linear adsorption ($$K_d$$). Extending to nonlinear isotherms or kinetic reactions would matter for contaminant remediation and CO₂ storage.

**5. Validation against laboratory consolidation–transport tests.** The 3D model is validated against a 1D analytical solution. A dedicated laboratory experiment — measuring pore pressure, settlement, and effluent concentration simultaneously in a 3D geometry — would substantially strengthen the framework's credibility.

---

## Why This Paper Matters for My Own Work

My current research focuses on proppant embedment in hydraulic fractures — a contact mechanics problem with coupled solid–fluid behavior. The physics is different, but the OpenFOAM methodology is directly shared: implementing custom constitutive models, managing two-way (or one-way) coupling between solid and fluid solvers, and validating against analytical solutions (in my case, Hertz contact theory).

Reading Wang & Jeng carefully made one thing clear: the challenge in coupled OpenFOAM work is almost never the physics. It is the **numerical coupling strategy** — when to update which field, how to ensure convergence, and how to handle the mesh near regions of high gradient. Smith's 1D blueprint and Wang & Jeng's 3D implementation are both fundamentally about that challenge. So is my own work.

---

## References

- Biot, M. A. (1941). General Theory of Three-Dimensional Consolidation. *J. Appl. Phys.*, 12, 155–164.
- Bear, J. (1961). On the Tensor Form of Dispersion in Porous Media. *Journal of Geophysical Research*, 55(4).
- Coats, K. H., & Smith, B. D. (1964). Dead-End Pore Volume and Dispersion in Porous Media. *SPE Journal*, 4(1), 73–84.
- Fredlund, D. G. (1993). *Soil Mechanics for Unsaturated Soils*. Wiley.
- Smith, D. W. (2000). One-dimensional contaminant transport through a deforming porous medium. *Int. J. Numer. Anal. Meth. Geomech.*, 24, 693–722.
- Wang, B., & Jeng, D.-S. (2024). Parametric Analysis for 3D Modeling of Consolidation-Induced Solute Transport Using OpenFOAM. *Applied Sciences*, 14, 11749. https://doi.org/10.3390/app142411749
