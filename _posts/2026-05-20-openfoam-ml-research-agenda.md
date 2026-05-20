---
layout: post
title: "OpenFOAM as a Physics Engine: A Research Agenda for Neural Operator–Accelerated Solid–Fluid Simulation"
date: 2026-05-20 16:00:00-0600
description: A forward-looking research agenda connecting my solids4Foam simulation work to neural operators, physics-informed learning, and data-driven constitutive modeling — and why this is the right next problem to solve.
tags: OpenFOAM solids4Foam machine-learning neural-operators PINN geomechanics FSI research-agenda
categories: research
related_posts: false
toc:
  sidebar: left
---

> This post is a research statement, not a literature review. I am writing it to make explicit something I have been thinking about since finishing the proppant embedment framework: the most important limitation of what I have built is not physics — it is *compute*. And that is a machine learning problem.

---

## The Bottleneck I Am Staring At

My current solids4Foam framework can simulate one proppant grain pressing into one rock surface under one closure stress with one set of material parameters. A single converged case takes on the order of hours on a workstation. The framework is correct — stress distributions match Hertz contact theory, plastic yielding initiates at the right load, aperture reduction agrees with analytical estimates.

But fracture conductivity is not a single-point prediction. It is a **curve** — conductivity as a function of closure stress — and that curve depends on at least five parameters that matter:

| Parameter | Physically relevant range | # of values to sweep |
|-----------|--------------------------|----------------------|
| Grain diameter | 100–800 μm | 8 |
| Grain Young's modulus | 70–100 GPa (quartz) | 4 |
| Rock Young's modulus | 5–50 GPa (shale) | 8 |
| Rock yield stress $$\sigma_y$$ | 100–500 MPa | 6 |
| Closure stress | 5–70 MPa | 12 |

A full factorial sweep is $$8 \times 4 \times 8 \times 6 \times 12 = 18{,}432$$ simulations. At hours per case, this is years of compute.

This is not a physics problem. The physics is solved. This is a **sampling problem** — and the right tool for sampling a high-dimensional parameter space defined by an expensive simulator is *machine learning*.

---

## The Opportunity: Not Regression, But Operator Learning

The standard approach to surrogate modeling is regression: run $$N$$ simulations, fit a neural network from $$(\text{inputs}) \to (\text{scalar output})$$. For fracture conductivity, the output is not a scalar — it is a **field**: the stress tensor at every mesh cell, the displacement at every node, the aperture at every point along the fracture surface.

Learning a field-to-field mapping is not regression. It is **operator learning** — learning the mapping between function spaces. Two recent architectures made this tractable:

**Fourier Neural Operator (FNO).** Li et al. (2021, ICLR) parameterize the integral kernel in operator learning as a convolution in Fourier space, reducing the cost of learning the operator from $$O(n^2)$$ to $$O(n \log n)$$ per layer. The trained FNO is *discretization-invariant*: evaluated once at one resolution, it generalizes to finer grids without retraining. On Navier-Stokes benchmarks, inference is 440× faster than the numerical solver at comparable accuracy.

**DeepONet.** Lu et al. (2021, *Nature Machine Intelligence*) prove a universal approximation theorem for operators and implement it via a branch-trunk architecture: the branch network encodes the input function (boundary conditions, source terms), the trunk network encodes the output domain (spatial coordinates). The theoretical grounding matters: DeepONet is not a heuristic — it is the operator-space analogue of the classical universal approximation theorem for functions.

The key property both architectures share is **resolution invariance**. My solids4Foam simulations are already cell-centered field data on structured meshes — exactly the format FNO was designed for. The proppant embedment problem maps cleanly onto the operator learning framework:

$$\mathcal{F}: \;\underbrace{(\text{material parameters}, \; \text{grain geometry}, \; \text{closure stress})}_{\text{input function space}} \;\longrightarrow\; \underbrace{(\boldsymbol{\sigma}(\mathbf{x}), \; \mathbf{u}(\mathbf{x}), \; a(\mathbf{x}))}_{\text{output field: stress, displacement, aperture}}$$

A trained $$\mathcal{F}$$ would replace the solids4Foam solver entirely for prediction — not for physics discovery, but for rapid evaluation across the design space.

---

## Three Research Directions I Want to Pursue

### Direction 1: solids4Foam as a Data Engine for Neural Operators

The first direction is the most direct extension of what I already have.

**What I propose:** Run $$N = O(10^3)$$ solids4Foam simulations across a Latin hypercube sample of the parameter space described above. Use these to train an FNO surrogate mapping material parameters and boundary conditions to the full stress and aperture fields. Evaluate the surrogate on a held-out test set and compare against the simulator ground truth.

**Why this is nontrivial:** The contact problem introduces a non-smooth nonlinearity — contact status changes discontinuously (open → closed → sliding) as load increases. Standard FNOs trained on smooth PDE data (Navier-Stokes, Darcy) may fail at the contact boundary. The physically meaningful question is whether the FNO can learn the *contact mechanics operator* — including the activation/deactivation of the contact patch — from simulation data. I expect it will require either a specialized architecture or a physics-regularized training objective.

**Outcome:** A surrogate that predicts full-field embedment results in milliseconds, enabling Monte Carlo sampling of the conductivity curve across the entire proppant–rock design space in hours rather than years.

---

### Direction 2: Physics-Informed Learning for Inverse Problems in Poromechanics

The second direction inverts the problem.

My current framework solves the *forward problem*: given material properties, predict deformation. The *inverse problem* — given measured fracture conductivity data, infer the in-situ rock properties — is what operators actually need in the field. Conductivity can be measured in the lab (I am doing this with DCI equipment). Rock moduli can be estimated from triaxial tests. But the in-situ effective stress, the pore pressure, the fracture geometry — these are not directly observable. The question is whether they can be inferred.

**Physics-Informed Neural Networks (PINNs)**, introduced by Raissi, Perdikaris, and Karniadakis (2019, *J. Comput. Phys.* 378), encode the governing PDE residuals as penalty terms in the neural network loss function:

$$\mathcal{L} = \underbrace{\mathcal{L}_{\text{data}}}_{\text{fit measurements}} + \lambda \underbrace{\mathcal{L}_{\text{physics}}}_{\text{PDE residuals: Biot + Darcy}}$$

For poromechanics, the relevant physics is Biot consolidation: mechanical equilibrium coupled to fluid mass conservation. A PINN trained on sparse conductivity measurements, with Biot as the residual constraint, would be forced to find parameter values that are simultaneously consistent with the data *and* with the governing equations — eliminating unphysical solutions that a pure regression model would allow.

The specific benchmark I would use is the Mandel consolidation problem — an analytical solution exists, which means the PINN can be verified before application to real data. The stress-split training protocol for poroelastic PINNs has already been demonstrated to resolve the numerical instabilities that naively penalizing both stress and displacement residuals creates (Haghighat et al., *arXiv:2110.03049*, 2021).

**Outcome:** A framework for inferring in-situ geomechanical properties from production data — turning the problem from simulation to data assimilation.

---

### Direction 3: Beyond J2 — Learning a Pressure-Dependent Yield Surface from Lab Data

The third direction addresses the most principled limitation of my current constitutive model.

My framework uses **J2 perfect plasticity** — the von Mises yield criterion with no hardening. Yield occurs when the von Mises stress reaches a material constant $$\sigma_y$$:

$$\sigma_{\text{vm}} = \sqrt{\tfrac{3}{2}\,\mathbf{s}:\mathbf{s}} \geq \sigma_y$$

where $$\mathbf{s}$$ is the deviatoric stress tensor. This is the correct choice for a tractable first-pass model: it is well-posed, differentiable, and gives a clean comparison with Hertz theory in the elastic regime. But J2 has a structural limitation that matters specifically for rock under geological confinement: **it is pressure-independent**.

The yield surface in J2 is a cylinder in principal stress space — the same diameter regardless of mean normal stress. Rock is not like this. Under higher confining pressure, rock is harder to shear. The triaxial tests I run in our laboratory measure exactly this pressure dependence — compressive strength increases with confining stress in a way that J2 cannot reproduce by construction, regardless of how $$\sigma_y$$ is calibrated.

This is not just an academic concern. Under high closure stress, the mean normal stress at the contact patch is large. J2 may overpredict the plastic zone extent relative to what the real rock would exhibit — which means the predicted aperture reduction is not conservative in the right direction.

**The proposal:** replace the analytic J2 yield surface with a *learned* one. Vlassis and Sun (2021, *CMAME* 373) showed that elastoplastic constitutive behavior can be encoded in a **Thermodynamics-Informed Neural Network (TANN)** by structuring the network architecture to satisfy the second law of thermodynamics by construction — stored elastic energy is a positive-definite output, dissipation is non-negative, plastic consistency is enforced via level-set representation. The yield surface is not prescribed; it is learned from data while remaining thermodynamically admissible.

The result is a constitutive model that:
- Is calibrated directly from triaxial stress–strain curves
- Satisfies thermodynamic consistency by architecture, not by penalty
- Captures pressure dependence that J2 ignores — naturally, from the data
- Embeds in solids4Foam as a user-defined constitutive law (the solver does not care about the form of the material model, only its stress–strain response)

**Why this is the right starting point:** J2 perfect plasticity is not a misguided choice — it is a *deliberate simplification*. Starting simple, verifying against Hertz theory, and then systematically adding complexity is the correct scientific workflow. The TANN direction is the next step in that workflow, not a correction of an error. It is only possible to argue for a data-driven model coherently if you first understand the analytic one you are replacing.

**Why I am positioned to do this:** I am already running triaxial tests and DCI compressibility tests in the laboratory — real experimental data, not synthetic data from another simulation. The training set for a TANN calibrated to shale already exists in my own experimental records. Closing the loop from physical experiment → learned constitutive model → OpenFOAM simulation is, to my knowledge, something no one has done at the grain-scale contact level.

**Outcome:** A shale constitutive model capturing pressure-dependent yielding, calibrated from lab data, embedded in solids4Foam — enabling contact simulations that are both computationally tractable and physically faithful beyond the J2 approximation.

---

## Why I Am the Right Person to Do This

The gap between simulation and machine learning in computational geomechanics is not primarily a methods gap — it is a *data gap*. Most researchers who work on neural operators for PDEs do not have physical simulation data from their own solvers; they generate synthetic data from simple benchmarks (Darcy flow, Navier-Stokes). Researchers who run physics-accurate coupled simulations (solids4Foam, ABAQUS, commercial HF codes) rarely know the neural operator literature well enough to build the training pipeline.

I sit at the intersection:

- **I generate the data.** My solids4Foam framework is already producing field-level output (stress tensors, displacement vectors, contact pressure distributions) in a format directly compatible with operator learning architectures.

- **I understand the physics constraints.** I know which conservation laws must be enforced (mass, momentum, thermodynamic consistency) and which can be relaxed. This is the knowledge required to design a physics-regularized loss function that is not just a heuristic.

- **I have already built an ML system on physical sensor data.** The LSTM autoencoder I built at Samsung Heavy Industries (99.49% test accuracy on ship vibration data) was not a toy project — it was a real industrial system trained on real sensor data with real constraints. I know how deep networks fail in practice.

- **I work at the scale where surrogate speed-up matters most.** Scaling from a single grain to a realistic proppant pack requires evaluating the grain-scale contact model O(10⁴) times per macro-scale conductivity estimate. No amount of clever numerics changes this — only a fast surrogate can make it tractable. The surrogate is not a shortcut; it is the *only path* to the science I want to do.

---

## Connection to the Research Community

The researchers whose work most directly intersects this agenda:

**Romit Maulik** (Purdue, formerly Argonne) — the `TensorFlowFoam` module (Maulik et al., AIAA SciTech 2021) demonstrates in-situ deployment of TensorFlow models inside the OpenFOAM solver using the C API. This is exactly the integration layer I would need to run a neural constitutive model inside solids4Foam without rewriting the solver.

**WaiChing Sun** (Columbia) — the TANN framework for data-driven constitutive models (Vlassis & Sun, *CMAME* 2021) is, to my knowledge, the most rigorous approach to thermodynamics-preserving learned constitutive laws in geomechanics. The inverse problem direction I outlined above — inferring in-situ properties from conductivity measurements — connects directly to his group's work on data-driven poromechanics.

**George Em Karniadakis** (Brown) — the PINN framework (Raissi, Perdikaris, Karniadakis, *J. Comput. Phys.* 2019) and its extensions to operator learning (DeepONet, Kovachki et al. *JMLR* 2023) define the methodological foundation for everything in Direction 2. The Mandel consolidation benchmark I want to use first appeared in Karniadakis group's early work on PINNs for poromechanics.

**Anima Anandkumar** (Caltech) — the FNO architecture (Li et al., ICLR 2021) is the architecture I would train for Direction 1. The discretization-invariance property matters specifically because my training data is on a structured O-grid mesh, but I want the trained surrogate to be deployable on unstructured meshes from industrial fracture simulators.

**Louis Durlofsky** (Stanford) — Tang, Liu, and Durlofsky (*CMAME* 376, 2021) demonstrated deep learning surrogates for 3D subsurface flow systems. The multi-fidelity training strategy (combining expensive high-fidelity runs with many cheap low-fidelity runs) they use is applicable to my problem: I can use coarse-mesh solids4Foam runs for volume data and fine-mesh runs for accuracy calibration.

---

## What This Is Not

I want to be precise about the scope of this agenda, because vagueness is where these projects go wrong.

This is **not** "apply machine learning to geomechanics." Every proposal says that. The specific claim I am making is:

1. The proppant embedment operator — mapping (material parameters, geometry, loading) → (stress field, aperture field) — is a well-posed operator learning problem with a natural FNO formulation and a simulator that can generate training data.

2. The inverse version of this problem — inferring rock properties from conductivity measurements — is a well-posed Bayesian inference problem that PINNs with Biot constraints can solve.

3. The constitutive modeling problem — learning the rock yield surface from triaxial data while preserving thermodynamic consistency — is solved in principle by TANN (Vlassis & Sun), but has never been applied to shale under the loading conditions relevant to hydraulic fracturing.

These are three *specific* research problems, each with a *specific* methodology, each grounded in a *specific* limitation of my current framework. The connections to existing literature are not decorative — they define the baseline I intend to extend.

---

## References

- Li, Z., Kovachki, N., Azizzadenesheli, K., Liu, B., Bhattacharya, K., Stuart, A., & Anandkumar, A. (2021). Fourier Neural Operator for Parametric Partial Differential Equations. *ICLR 2021*. arXiv:2010.08895
- Lu, L., Jin, P., Pang, G., Zhang, Z., & Karniadakis, G.E. (2021). Learning nonlinear operators via DeepONet based on the universal approximation theorem of operators. *Nature Machine Intelligence*, 3, 218–229. doi:10.1038/s42256-021-00302-5
- Raissi, M., Perdikaris, P., & Karniadakis, G.E. (2019). Physics-informed neural networks: A deep learning framework for solving forward and inverse problems involving nonlinear partial differential equations. *Journal of Computational Physics*, 378, 686–707. doi:10.1016/j.jcp.2018.10.045
- Vlassis, N.N., & Sun, W.C. (2021). Sobolev training of thermodynamic-informed neural networks for interpretable elasto-plasticity models with level set hardening. *Computer Methods in Applied Mechanics and Engineering*, 373, 113695. doi:10.1016/j.cma.2021.113695
- Maulik, R., Sharma, H., Patel, S., Lusch, B., & Jennings, E. (2021). Deploying deep learning in OpenFOAM with TensorFlow. *AIAA SciTech 2021 Forum*. arXiv:2012.00900
- Kovachki, N., Li, Z., Liu, B., Azizzadenesheli, K., Bhattacharya, K., Stuart, A., & Anandkumar, A. (2023). Neural Operator: Learning Maps Between Function Spaces With Applications to PDEs. *Journal of Machine Learning Research*, 24(1). doi:10.5555/3648699.3648788
- Tang, M., Liu, Y., & Durlofsky, L.J. (2021). A deep-learning-based surrogate model for data assimilation in dynamic subsurface flow problems. *Journal of Computational Physics*, 413, 109456. doi:10.1016/j.jcp.2020.109456
- Haghighat, E., Bekar, A.C., Madenci, E., & Juanes, R. (2022). A nonlocal physics-informed deep learning framework using the peridynamic differential operator. *Computer Methods in Applied Mechanics and Engineering*, 385, 114012.
