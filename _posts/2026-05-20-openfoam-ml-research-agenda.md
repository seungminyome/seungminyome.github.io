---
layout: post
title: "OpenFOAM as a Physics Engine: A Research Agenda for Neural Operator–Accelerated Solid–Fluid Simulation"
date: 2026-05-20 16:00:00-0600
description: A forward-looking research agenda connecting my solids4Foam simulation work to neural operators and physics-informed learning — and why this is the right next problem to solve.
tags: OpenFOAM solids4Foam machine-learning neural-operators PINN geomechanics FSI research-agenda
categories: research
related_posts: false
toc:
  sidebar: left
---

> This post is a research statement, not a literature review. I am writing it to make explicit something I have been thinking about since building the proppant embedment framework: the most important limitation of what I have built is not physics — it is _compute_. And that is a machine learning problem.

---

## The Bottleneck I Am Staring At

My current solids4Foam framework can simulate one proppant grain pressing into one rock surface under one load with one set of material parameters. A single case takes on the order of hours on a workstation.

But embedment is not a single-point prediction. The current joint surrogate already needs five inputs — normalized load, modulus ratio, compliance ratio, $$\tan\phi$$ and $$\tan\psi$$ — and the simulation campaigns behind it took 426 runs and about 1,400 core-hours. Every added input multiplies that count, and fracture conductivity, the quantity the field actually needs, is a **curve** over closure stress built from many such grain-scale answers.

Even once the model is fully verified, this remains a **sampling problem** — and the right tool for sampling a high-dimensional parameter space defined by an expensive simulator is _machine learning_.

---

## The Opportunity: Not Regression, But Operator Learning

The standard approach to surrogate modeling is regression: run $$N$$ simulations, fit a neural network from $$(\text{inputs}) \to (\text{scalar output})$$. For fracture conductivity, the output is not a scalar — it is a **field**: the stress tensor at every mesh cell, the displacement at every node, the aperture at every point along the fracture surface.

Learning a field-to-field mapping is not regression. It is **operator learning** — learning the mapping between function spaces. Two recent architectures made this tractable:

**Fourier Neural Operator (FNO).** Li et al. (2021, ICLR) parameterize the integral kernel in operator learning as a convolution in Fourier space, reducing the cost of learning the operator from $$O(n^2)$$ to $$O(n \log n)$$ per layer. The trained FNO is _discretization-invariant_: evaluated once at one resolution, it generalizes to finer grids without retraining. On Navier-Stokes benchmarks, inference is 440× faster than the numerical solver at comparable accuracy.

**DeepONet.** Lu et al. (2021, _Nature Machine Intelligence_) prove a universal approximation theorem for operators and implement it via a branch-trunk architecture: the branch network encodes the input function (boundary conditions, source terms), the trunk network encodes the output domain (spatial coordinates). The theoretical grounding matters: DeepONet is not a heuristic — it is the operator-space analogue of the classical universal approximation theorem for functions.

The key property both architectures share is **resolution invariance**. My solids4Foam simulations are already cell-centered field data on structured meshes — exactly the format FNO was designed for. The proppant embedment problem maps cleanly onto the operator learning framework:

$$\mathcal{F}: \;\underbrace{(\text{material parameters}, \; \text{grain geometry}, \; \text{closure stress})}_{\text{input function space}} \;\longrightarrow\; \underbrace{(\boldsymbol{\sigma}(\mathbf{x}), \; \mathbf{u}(\mathbf{x}), \; a(\mathbf{x}))}_{\text{output field: stress, displacement, aperture}}$$

A trained $$\mathcal{F}$$ would replace the solids4Foam solver entirely for prediction — not for physics discovery, but for rapid evaluation across the design space.

---

## Two Research Directions I Want to Pursue

### Direction 1: solids4Foam as a Data Engine for Neural Operators

The first direction is the most direct extension of what I already have.

**What I propose:** Run $$N = O(10^3)$$ solids4Foam simulations across a Latin hypercube sample of the parameter space described above. Use these to train an FNO surrogate mapping material parameters and boundary conditions to the full stress and aperture fields. Evaluate the surrogate on a held-out test set and compare against the simulator ground truth.

**Why this is nontrivial:** The contact problem introduces a non-smooth nonlinearity — contact status changes discontinuously (open → closed → sliding) as load increases. Standard FNOs trained on smooth PDE data (Navier-Stokes, Darcy) may fail at the contact boundary. The physically meaningful question is whether the FNO can learn the _contact mechanics operator_ — including the activation/deactivation of the contact patch — from simulation data. I expect it will require either a specialized architecture or a physics-regularized training objective.

**Outcome:** A surrogate that predicts full-field embedment results in milliseconds, enabling Monte Carlo sampling of the conductivity curve across the entire proppant–rock design space in hours rather than years.

---

### Direction 2: Physics-Informed Learning for Inverse Problems in Poromechanics

The second direction inverts the problem.

My current framework solves the _forward problem_: given material properties, predict deformation. The _inverse problem_ — given measured fracture conductivity data, infer the in-situ rock properties — is what operators actually need in the field. Conductivity can be measured in the lab. Rock moduli can be estimated from triaxial tests. But the in-situ effective stress, the pore pressure, the fracture geometry — these are not directly observable. The question is whether they can be inferred.

**Physics-Informed Neural Networks (PINNs)**, introduced by Raissi, Perdikaris, and Karniadakis (2019, _J. Comput. Phys._ 378), encode the governing PDE residuals as penalty terms in the neural network loss function:

$$\mathcal{L} = \underbrace{\mathcal{L}_{\text{data}}}_{\text{fit measurements}} + \lambda \underbrace{\mathcal{L}_{\text{physics}}}_{\text{PDE residuals: Biot + Darcy}}$$

For poromechanics, the relevant physics is Biot consolidation: mechanical equilibrium coupled to fluid mass conservation. A PINN trained on sparse conductivity measurements, with Biot as the residual constraint, would be forced to find parameter values that are simultaneously consistent with the data _and_ with the governing equations — eliminating unphysical solutions that a pure regression model would allow.

The specific benchmark I would use is the Mandel consolidation problem — an analytical solution exists, which means the PINN can be verified before application to real data. The stress-split training protocol for poroelastic PINNs has already been demonstrated to resolve the numerical instabilities that naively penalizing both stress and displacement residuals creates (Haghighat et al., _arXiv:2110.03049_, 2021).

**Outcome:** A framework for inferring in-situ geomechanical properties from production data — turning the problem from simulation to data assimilation.

---

## Why I Am the Right Person to Do This

The gap between simulation and machine learning in computational geomechanics is not primarily a methods gap — it is a _data gap_. Most researchers who work on neural operators for PDEs do not have physical simulation data from their own solvers; they generate synthetic data from simple benchmarks (Darcy flow, Navier-Stokes). Researchers who run physics-accurate coupled simulations (solids4Foam, ABAQUS, commercial HF codes) rarely know the neural operator literature well enough to build the training pipeline.

I sit at the intersection:

- **I generate the data.** My solids4Foam framework is already producing field-level output (stress tensors, displacement vectors, contact pressure distributions) in a format directly compatible with operator learning architectures.

- **I understand the physics constraints.** I know which conservation laws must be enforced (mass, momentum, thermodynamic consistency) and which can be relaxed. This is the knowledge required to design a physics-regularized loss function that is not just a heuristic.

- **I have already built an ML system on physical sensor data.** The LSTM autoencoder I built at Samsung Heavy Industries (99.49% test accuracy on ship vibration data) was not a toy project — it was a real industrial system trained on real sensor data with real constraints. I know how deep networks fail in practice.

- **I work at the scale where surrogate speed-up matters most.** Scaling from a single grain to a realistic proppant pack requires evaluating the grain-scale contact model O(10⁴) times per macro-scale conductivity estimate. No amount of clever numerics changes this — only a fast surrogate can make it tractable. The surrogate is not a shortcut; it is the _only path_ to the science I want to do.

---

## Connection to the Research Community

The researchers whose work most directly intersects this agenda:

**Romit Maulik** (Purdue, formerly Argonne) — the `TensorFlowFoam` module (Maulik et al., AIAA SciTech 2021) demonstrates in-situ deployment of TensorFlow models inside the OpenFOAM solver using the C API. This is exactly the integration layer I would need to call a trained grain-scale surrogate from inside an OpenFOAM pack-scale simulation without rewriting the solver.

**WaiChing Sun** (Columbia) — the inverse problem in Direction 2, inferring in-situ properties from conductivity measurements, connects directly to his group's work on data-driven poromechanics.

**George Em Karniadakis** (Brown) — the PINN framework (Raissi, Perdikaris, Karniadakis, _J. Comput. Phys._ 2019) and its extensions to operator learning (DeepONet, Kovachki et al. _JMLR_ 2023) define the methodological foundation for everything in Direction 2. The Mandel consolidation benchmark I want to use first appeared in Karniadakis group's early work on PINNs for poromechanics.

**Anima Anandkumar** (Caltech) — the FNO architecture (Li et al., ICLR 2021) is the architecture I would train for Direction 1. The discretization-invariance property matters specifically because my training data comes from one specific simulation mesh, but I want the trained surrogate to be deployable on unstructured meshes from industrial fracture simulators.

**Louis Durlofsky** (Stanford) — Tang, Liu, and Durlofsky (_CMAME_ 376, 2021) demonstrated deep learning surrogates for 3D subsurface flow systems. The multi-fidelity training strategy (combining expensive high-fidelity runs with many cheap low-fidelity runs) they use is applicable to my problem: I can use coarse-mesh solids4Foam runs for volume data and fine-mesh runs for accuracy calibration.

---

## What This Is Not

I want to be precise about the scope of this agenda, because vagueness is where these projects go wrong.

This is **not** "apply machine learning to geomechanics." Every proposal says that. The specific claim I am making is:

1. The proppant embedment operator — mapping (material parameters, geometry, loading) → (stress field, aperture field) — is a well-posed operator learning problem with a natural FNO formulation and a simulator that can generate training data.

2. The inverse version of this problem — inferring rock properties from conductivity measurements — is a well-posed Bayesian inference problem that PINNs with Biot constraints can solve.

These are two _specific_ research problems, each with a _specific_ methodology, each grounded in a _specific_ limitation of my current framework. The connections to existing literature are not decorative — they define the baseline I intend to extend.

---

## References

- Li, Z., Kovachki, N., Azizzadenesheli, K., Liu, B., Bhattacharya, K., Stuart, A., & Anandkumar, A. (2021). Fourier Neural Operator for Parametric Partial Differential Equations. _ICLR 2021_. arXiv:2010.08895
- Lu, L., Jin, P., Pang, G., Zhang, Z., & Karniadakis, G.E. (2021). Learning nonlinear operators via DeepONet based on the universal approximation theorem of operators. _Nature Machine Intelligence_, 3, 218–229. doi:10.1038/s42256-021-00302-5
- Raissi, M., Perdikaris, P., & Karniadakis, G.E. (2019). Physics-informed neural networks: A deep learning framework for solving forward and inverse problems involving nonlinear partial differential equations. _Journal of Computational Physics_, 378, 686–707. doi:10.1016/j.jcp.2018.10.045
- Maulik, R., Sharma, H., Patel, S., Lusch, B., & Jennings, E. (2021). Deploying deep learning in OpenFOAM with TensorFlow. _AIAA SciTech 2021 Forum_. arXiv:2012.00900
- Kovachki, N., Li, Z., Liu, B., Azizzadenesheli, K., Bhattacharya, K., Stuart, A., & Anandkumar, A. (2023). Neural Operator: Learning Maps Between Function Spaces With Applications to PDEs. _Journal of Machine Learning Research_, 24(1). doi:10.5555/3648699.3648788
- Tang, M., Liu, Y., & Durlofsky, L.J. (2021). A deep-learning-based surrogate model for data assimilation in dynamic subsurface flow problems. _Journal of Computational Physics_, 413, 109456. doi:10.1016/j.jcp.2020.109456
- Haghighat, E., Bekar, A.C., Madenci, E., & Juanes, R. (2022). A nonlocal physics-informed deep learning framework using the peridynamic differential operator. _Computer Methods in Applied Mechanics and Engineering_, 385, 114012.
