---
layout: post
title: "[Literature Review · KAIST #1] Vorticity Generation and Conservation at Two-Dimensional Boundaries"
date: 2025-01-06 10:00:00 +0900
description: A review of vorticity dynamics at rigid walls — how Stokes' theorem, boundary conditions, and Poiseuille/rotating-cylinder flows build the physical intuition for vorticity generation and diffusion. Prepared for the KAIST Waves & Fluid Mechanics Lab meeting.
tags: vorticity fluid-mechanics literature-review KAIST waves boundary-layer
categories: research
related_posts: false
toc:
  sidebar: left
---

> Prepared for the KAIST Waves & Fluid Mechanics Laboratory weekly meeting, January 6, 2025. The central question: _"Where does vorticity come from, and where does it go?"_

---

## Why Vorticity Matters Here

At KAIST, the lab studies gravity–capillary waves, free-surface dynamics, and fluid–structure interactions. All of these problems involve **vorticity generation at boundaries and interfaces**: a wave breaking on a wall, a cylinder oscillating in a free stream, a thin film oscillating under air loading. Before any of those problems can be analyzed, a clean foundation for vorticity kinematics and dynamics is needed.

This review works through that foundation for two-dimensional flows — the simplest setting where the essential physics is not hidden by three-dimensional geometry.

---

## 1. Circulation and Stokes' Theorem

### Circulation defined

For a 2D velocity field **u** = (u, v), the **circulation** around a closed contour C is:

$$
\Gamma = \oint_C \mathbf{u} \cdot d\mathbf{l}
$$

It measures the net integrated tangential velocity along C — a scalar measure of how much the fluid "rotates" inside the loop.

### Stokes' theorem connects Γ to ω

By Stokes' theorem, circulation equals the flux of vorticity through the surface S bounded by C:

$$
\Gamma = \iint_S \omega \, dA
$$

where the scalar vorticity in 2D is:

$$
\omega = \frac{\partial v}{\partial x} - \frac{\partial u}{\partial y}
$$

This is the key identity: **circulation is the area integral of vorticity**. A region with no net vorticity has zero circulation regardless of the velocity field inside it.

### Planar vs. axisymmetric flows

In **planar (Cartesian)** flow, the above definitions hold directly. In **axisymmetric** flow — where the geometry is symmetric about an axis, as in a pipe or around a sphere — vorticity is the azimuthal component of the curl, and circulation must be computed along meridional contours. The physical interpretation remains the same, but the formulas carry an extra radial factor from the cylindrical coordinates.

This distinction matters practically: a 2D result derived in Cartesian coordinates cannot always be applied directly to a pipe flow or a rotationally symmetric geometry without checking whether the axisymmetric form changes the qualitative conclusions.

---

## 2. Vorticity Transport Equation

For a 2D incompressible flow of uniform-density fluid, the vorticity transport equation is:

$$
\frac{D\omega}{Dt} = \nu \nabla^2 \omega
$$

where D/Dt = ∂/∂t + **u**·∇ is the material derivative and ν is the kinematic viscosity.

Three physical statements are encoded in this equation:

1. **Vorticity is convected** with the fluid (the D/Dt term).
2. **Vorticity diffuses** through the fluid via viscosity (the ν∇²ω term).
3. In 2D uniform-density flow, **vorticity cannot be created in the interior** of the fluid — it can only be created at boundaries.

This last point is the most important one for the problems we study in the lab: **all vorticity originates at boundaries**. The interior just moves it around.

### What about density gradients?

If the density is not uniform — a stratified fluid or a two-fluid interface — a **baroclinic source term** appears:

$$
\frac{D\omega}{Dt} = \nu \nabla^2 \omega + \frac{1}{\rho^2} \left( \frac{\partial \rho}{\partial x} \frac{\partial p}{\partial y} - \frac{\partial \rho}{\partial y} \frac{\partial p}{\partial x} \right) = \nu \nabla^2 \omega - \frac{\nabla \rho \times \nabla p}{\rho^2}
$$

The baroclinic term is non-zero whenever **isopycnals (lines of constant density) are not parallel to isobars (lines of constant pressure)**. In a stratified fluid under gravity, horizontal pressure gradients — from a passing wave, from a density jump at the interface — can generate vorticity in the fluid interior, not just at walls.

This baroclinic term is the mechanism behind many important phenomena: the generation of vorticity at a density interface by an impinging pressure wave, the startup of circulation in a heated fluid layer, the roll-up of a mixing layer between two streams of different density.

---

## 3. Boundary Conditions and Their Vorticity Signatures

The transport equation tells us how vorticity moves; boundary conditions tell us how much vorticity is produced.

### No-slip boundary (rigid wall)

At a solid wall, the fluid velocity equals the wall velocity:

$$
\mathbf{u}\big|_{\text{wall}} = \mathbf{u}_{\text{wall}}
$$

For a stationary wall, **u** = 0 there. The normal derivative of the tangential velocity — which is directly proportional to the wall shear stress — is whatever is needed to satisfy the governing equations in the interior. This value is not prescribed; it is an **output** of the flow solution.

However, the **vorticity at the wall** is not free: for a flat wall with normal in the y-direction,

$$
\omega_{\text{wall}} = -\frac{\partial u}{\partial y}\bigg|_{\text{wall}}
$$

(with v = 0 everywhere on the wall). This vorticity is generated by the no-slip condition and then diffuses into the interior. The wall acts as a **vorticity source** whose strength adjusts dynamically to maintain no-slip.

### Stress-free (free-slip) boundary

At a stress-free surface — a model for a liquid–gas interface when surface tension is negligible — the tangential stress vanishes:

$$
\mu \frac{\partial u_t}{\partial n}\bigg|_{\text{surface}} = 0
$$

where u_t is the tangential velocity and n is the outward normal. Since shear stress ∝ ∂u_t/∂n = 0, **there is no vorticity at the stress-free surface** in the absence of surface tension or tangential forcing. The surface neither creates nor destroys vorticity in this limit.

This is why free-surface waves in deep water are well-described by irrotational (potential) flow theory for small amplitudes: the free surface does not generate vorticity, and away from the bottom boundary, the interior is effectively irrotational.

### The contrast in practice

The difference between no-slip and stress-free boundaries determines the overall vorticity budget of a flow:

- **No-slip walls** are vorticity sources. The boundary layer is the region where that vorticity is concentrated before diffusing or being convected into the main flow.
- **Free surfaces** (stress-free) are vorticity neutral in the inviscid, surface-tension-free limit. In viscous flows or when surface tension adds tangential stress, this changes — and is the subject of the next review (KAIST #2).

---

## 4. Poiseuille Flow — A Clean Test Case

Pressure-driven flow between two parallel plates (Poiseuille flow) is the simplest example that demonstrates both viscosity and wall-generated vorticity.

### The velocity profile

For flow in the x-direction between plates at y = ±h, driven by a pressure gradient dp/dx < 0:

$$
u(y) = \frac{1}{2\mu}\left(-\frac{dp}{dx}\right)(h^2 - y^2)
$$

The profile is parabolic: maximum at the centerline, zero at the walls (no-slip).

### The vorticity field

Differentiating:

$$
\omega(y) = -\frac{\partial u}{\partial y} = \frac{1}{\mu}\left(-\frac{dp}{dx}\right) y
$$

Vorticity is **linear in y**: it is zero at the centerline (by symmetry, the velocity profile is flat there), antisymmetric across the channel, and maximum in magnitude at the walls. The positive vorticity on the bottom wall and negative vorticity on the top wall represent the opposing shear stresses that keep the flow in mechanical equilibrium.

This linear distribution has a clean interpretation via Stokes' theorem: integrate ω over a rectangle of height 2h and length L, and you recover a circulation proportional to the velocity difference between the two walls (here, 0 − 0 = 0) plus the pressure-work done along the streamlines. The two wall vorticity sheets contribute equal and opposite circulations that sum to zero over the full channel width — consistent with the flow being pressure-driven, not circulation-driven.

<figure style="text-align:center; margin: 2rem 0;">
  <img src="{{ '/assets/img/posts/kaist1_fig1_poiseuille.svg' | relative_url }}" alt="Poiseuille flow: parabolic velocity profile (left) and linear vorticity profile (right)" style="width:100%; max-width:700px;">
  <figcaption style="margin-top:0.6rem; font-size:0.9rem; color:#555;">
    <strong>Figure 1.</strong> Poiseuille flow between parallel plates (y/h = ±1).
    <strong>(a)</strong> The parabolic velocity profile u = U(1 − y²/h²), with maximum at the centreline and zero at the no-slip walls.
    <strong>(b)</strong> The corresponding vorticity field ω·h/U = 2y/h is linear — zero at the centreline, maximum in magnitude at the walls, antisymmetric across the channel.
    The equal and opposite wall vorticity sheets cancel in total, consistent with zero net circulation in a pressure-driven flow.
  </figcaption>
</figure>

---

## 5. Rotating Cylinder — Vorticity Diffusion in Time

A solid cylinder of radius R suddenly set into rotation at angular velocity Ω in an otherwise quiescent fluid provides the cleanest illustration of how vorticity **diffuses outward from a wall**.

### Initial state

At t = 0⁺, the fluid is still. The no-slip condition requires the fluid immediately at the wall to move with the cylinder surface, imposing a vorticity spike at r = R. By Stokes' theorem, the circulation on a contour just outside the cylinder must jump from 0 to 2πΩR².

### Subsequent evolution

Vorticity diffuses radially outward according to:

$$
\frac{\partial \omega}{\partial t} = \nu \left( \frac{\partial^2 \omega}{\partial r^2} + \frac{1}{r}\frac{\partial \omega}{\partial r} - \frac{\omega}{r^2} \right)
$$

The viscous diffusion length at time t is δ ~ √(νt). The vorticity front propagates outward as √(νt), thickening the "vortical annulus" around the cylinder. At large times, the flow approaches the steady solid-body rotation solution ω = 2Ω everywhere inside and zero outside — but getting there requires the vorticity to diffuse all the way to infinity (or to another boundary).

### What the rotating cylinder teaches

This problem illustrates three things:

1. **Vorticity starts at the wall** and spreads inward/outward by diffusion.
2. **Circulation is conserved** on any material contour enclosing the same fluid — the total vorticity integrated over the growing vortical region is constant once generated.
3. **Viscosity sets the timescale** for vorticity reorganization. In high-Re flows (small ν), vorticity remains tightly wrapped around the cylinder for a long time; in low-Re flows, it diffuses quickly into the bulk.

<figure style="text-align:center; margin: 2rem 0;">
  <img src="{{ '/assets/img/posts/kaist1_fig2_diffusion.svg' | relative_url }}" alt="Vorticity diffusion from an impulsively started wall at three successive times" style="width:100%; max-width:640px;">
  <figcaption style="margin-top:0.6rem; font-size:0.9rem; color:#555;">
    <strong>Figure 2.</strong> Vorticity diffusion from an impulsively started flat plate (Stokes' first problem).
    At t = 0⁺ the plate at y = 0 suddenly moves at velocity U; the fluid above is initially at rest.
    The exact solution ω(y,t) = (U/h)(h/δ√π) exp(−y²/4δ²), with δ = √(νt), gives Gaussian profiles that
    broaden as δ ~ √t. Three successive times are shown (t₁ &lt; t₂ &lt; t₃); the dashed line is the
    steady-state Couette profile ω = U/h reached as t → ∞. The wall is the only source of vorticity —
    the interior is purely diffusive.
  </figcaption>
</figure>

---

## 6. Vorticity Conservation — What Can and Cannot Change Γ

### Kelvin's circulation theorem (inviscid, uniform density)

For an inviscid, uniform-density fluid, Kelvin's theorem states:

$$
\frac{D\Gamma}{Dt} = 0
$$

on any material contour moving with the fluid. Circulation is a conserved quantity. This is why potential flow theory (ω = 0 everywhere) is self-consistent: once irrotational, always irrotational, if viscosity and density variations are neglected.

### Breaking the conservation: four mechanisms

1. **Viscosity** — Diffusion carries vorticity across material lines, changing the circulation of any material contour. The rate of change equals the line integral of ν ∂ω/∂n along C.

2. **Baroclinicity** — As discussed above, non-parallel ∇ρ and ∇p generate vorticity in the interior.

3. **Solid boundary** — The no-slip condition at a wall injects vorticity into the fluid. The circulation changes at a rate equal to the net vorticity flux through the contour segments lying along the wall.

4. **Body forces with curl** — A non-conservative body force field (e.g., an electromagnetic body force, or a rotating reference frame's Coriolis term) can generate vorticity directly.

### The density-gradient case in detail

In a two-layer fluid at rest, gravity acts downward and the pressure gradient is hydrostatic: ∂p/∂y = −ρg. If a density interface is tilted — by a wave, by a lateral gradient — ∇ρ becomes non-horizontal. The cross-product ∇ρ × ∇p is now non-zero, and vorticity is generated along the interface. This is the mechanism by which interfacial waves generate vorticity on their own: the wave tilts the density jump, the tilted interface is in a non-equilibrium pressure field, and vorticity rolls up at the interface.

---

## 7. Synthesis: What Governs the Vorticity Budget

For the flows we encounter in the lab — oscillating plates, waves over a rigid bottom, bodies moving near a free surface — the vorticity budget is governed by:

| Mechanism                              | Location                 | Sign                                  |
| -------------------------------------- | ------------------------ | ------------------------------------- |
| No-slip wall                           | Solid boundary           | ±, depends on flow direction          |
| Pressure gradient at density interface | Interior, near interface | Depends on interface tilt             |
| Viscous diffusion                      | Interior                 | Redistributes, doesn't create         |
| Stress-free surface                    | Free surface             | 0 (in the absence of surface tension) |

The engineering consequence is that **vorticity management is boundary management**: to change the vorticity field, you change the boundaries (their motion, their shape, their permeability to stress).

This perspective — vorticity as a boundary-generated quantity transported into the interior — is the organizing principle for the more complex problem taken up in the next review: what happens when the boundary itself moves and deforms.

---

## Connection to Lab Research

The vorticity dynamics reviewed here connects directly to the KAIST lab's experimental work on oscillating elastic films. When a thin silicone film is loaded by an air jet above a water layer, the film deforms and oscillates. The film–water interface is neither a rigid no-slip wall nor a clean stress-free surface — it lies in between, with a compliance determined by the film's elastic properties.

Understanding how much vorticity the film interface generates (and how that compares to a rigid bottom at the same geometry) requires exactly the framework developed here: a clear accounting of which boundaries generate vorticity, at what rate, and how that vorticity propagates into the fluid interior.

The dispersion relation for gravity–capillary waves on an elastic film — which the lab is currently investigating — contains implicitly the assumption that the interface is vorticity-free at leading order. Corrections for viscosity and interface compliance are second-order in the wave steepness, but first-order in the vorticity budget.

---

## References

1. **Brøns, M., Thompson, M. C., Leweke, T., & Hourigan, K.** (2014). Vorticity generation and conservation for two-dimensional interfaces and boundaries. _Journal of Fluid Mechanics_, **758**, 63–93. [doi:10.1017/jfm.2014.520](https://doi.org/10.1017/jfm.2014.520)

   _Primary source for this review. Derives the generalised vorticity generation formula for no-slip and stress-free boundaries in planar and axisymmetric geometry, with Poiseuille flow, spinning cylinder, and submerged cylinder as worked examples._

2. **Terrington, S. J., Hourigan, K., & Thompson, M. C.** (2020). The generation and conservation of vorticity: deforming interfaces and boundaries in two-dimensional flows. _Journal of Fluid Mechanics_, **890**, A5. [doi:10.1017/jfm.2020.64](https://doi.org/10.1017/jfm.2020.64)

   _Companion paper (reviewed in KAIST #2) extending the framework to moving and deforming interfaces, two-fluid flows, and Froude-number-dependent vorticity redistribution._

3. **Sheridan, J., Lin, J.-C., & Rockwell, D.** (1997). Flow past a cylinder close to a free surface. _Journal of Fluid Mechanics_, **330**, 1–30.

   _Experimental velocity and vorticity fields for a submerged cylinder; cited in Brøns et al. (2014) as a reference case for vorticity generation near a free surface._

4. **Reichl, P., Hourigan, K., & Thompson, M. C.** (2005). Flow past a cylinder close to a free surface. _Journal of Fluid Mechanics_, **533**, 269–296.

   _Numerical counterpart to Sheridan et al. (1997); cited alongside the experimental data in the submerged-cylinder example of Brøns et al. (2014)._
