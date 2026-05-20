---
layout: post
title: "[Literature Review · KAIST #2] Vorticity at Deforming Interfaces: Free Surfaces, Two-Fluid Flows, and Froude Number Effects"
date: 2025-01-21 10:00:00 +0900
description: A review of vorticity generation at moving and deforming interfaces — two-fluid Couette and Taylor-Couette flows, free surface vs. viscous interface comparison, Lamb vortex pairs, and Froude number control of the vorticity distribution. Prepared for the KAIST Waves & Fluid Mechanics Lab meeting.
tags: vorticity fluid-mechanics literature-review KAIST waves free-surface interface
categories: research
related_posts: false
toc:
  sidebar: left
---

> Prepared for the KAIST Waves & Fluid Mechanics Laboratory weekly meeting, January 21, 2025. Continuing from KAIST #1, which covered vorticity at rigid boundaries. Here the boundary itself **moves and deforms**.

---

## The New Problem: Boundaries That Are Not Fixed

The first review established that all vorticity in a uniform-density, viscous flow originates at boundaries. A rigid no-slip wall is the simplest case: it generates vorticity in a fixed location at a rate set by the local wall shear stress.

The next level of difficulty is a **deforming interface** — a boundary whose shape, position, and stress state all evolve with the flow. The two physically important cases are:

1. **Free surface** — a liquid–gas interface where the gas exerts negligible tangential stress.
2. **Viscous interface** — a liquid–liquid boundary where both fluids have comparable viscosity and the stress is continuous across it.

The vorticity dynamics of these two cases is qualitatively different, and the difference has direct consequences for the lab's work on wave dynamics and film–water interactions.

---

## 1. Vorticity Generation at a Moving Interface

### Reference frame matters

Consider a flat interface moving in the x-direction at velocity U(t). In the **lab frame**, fluid particles at the interface move with the interface, and the velocity boundary condition is simply u = U at y = 0.

In the **interface-fixed (co-moving) frame**, the interface is stationary, but the fluid arrives at it with a relative velocity −U. The vorticity generated at the interface in the two frames must be equivalent by Galilean invariance — but the **apparent boundary condition** looks different.

This frame-dependence has practical consequences for numerical simulations: whether you track the interface as a fixed or moving boundary changes the implementation, even though the physics is the same.

### Rate of vorticity generation

For a flat interface at y = 0 with tangential velocity U_t and normal n pointing upward, the vorticity flux from the interface into the fluid is:

$$
\frac{d\Gamma}{dt}\bigg|_{\text{interface}} = \nu \int_{\text{interface}} \frac{\partial \omega}{\partial n} \, dl = -\frac{1}{\rho}\frac{\partial p}{\partial s} + \nu \frac{\partial^2 U_t}{\partial s^2}
$$

where s is the arc-length along the interface and p is the pressure evaluated at the interface. The pressure gradient term is the **dominant vorticity source** for inviscid-limit waves; the viscous term is a correction.

For a **pressure-driven** deformation — such as a wave crest where the pressure is lower than ambient — the pressure gradient along the surface is non-zero, and vorticity is generated at the interface even if the fluid is otherwise inviscid.

---

## 2. Two-Fluid Couette Flow

### Setup

Two immiscible fluids, fluid 1 (density ρ₁, viscosity μ₁) in the lower layer and fluid 2 (density ρ₂, viscosity μ₂) in the upper layer, confined between parallel plates separated by distance 2h. The bottom plate moves at velocity −U, the top plate at +U.

### Velocity profile

In each layer, the velocity satisfies ∇²u = (1/μ)(dp/dx). For a purely shear-driven flow (no pressure gradient), the velocity is piecewise linear:

$$
u_1(y) = A_1 y + B_1, \quad u_2(y) = A_2 y + B_2
$$

The coefficients are set by:

- No-slip at the plates
- **Continuity of velocity** across the interface: u₁ = u₂ at y = 0
- **Continuity of tangential stress**: μ₁ ∂u₁/∂y = μ₂ ∂u₂/∂y at y = 0

Solving these:

$$
u_1(y) = -U \frac{h\mu_2 + y\mu_2}{h(\mu_1 + \mu_2)}, \quad u_2(y) = U \frac{h\mu_1 + y\mu_1}{h(\mu_1 + \mu_2)}
$$

(for the symmetric case h₁ = h₂ = h). The interface velocity is:

$$
u_{\text{int}} = \frac{\mu_1 - \mu_2}{\mu_1 + \mu_2} \cdot 0 = 0
$$

Wait — in the symmetric case with equal layer thicknesses, the interface is at rest. The velocity profile is **piecewise linear with a kink** at the interface: the slope in layer 1 is μ₂/(μ₁+μ₂) times the slope in layer 2 is μ₁/(μ₁+μ₂).

### Vorticity distribution

The vorticity is:

$$
\omega_i = -\frac{\partial u_i}{\partial y} = \text{constant in each layer}
$$

with a **jump discontinuity at the interface**:

$$
[\omega] = \omega_2 - \omega_1 = U\frac{\mu_1 - \mu_2}{h\mu_1} - \left(-U\frac{\mu_2 - \mu_1}{h\mu_2}\right) = U\frac{\mu_1^2 - \mu_2^2}{\mu_1 \mu_2 h}
$$

When μ₁ = μ₂ (same fluid everywhere), the vorticity jump is zero and the profile is uniformly linear — as expected for single-fluid Couette flow. When μ₁ ≠ μ₂, there is a **vorticity sheet at the interface** whose strength is proportional to the viscosity mismatch. This sheet is entirely real and physical: it is the consequence of the stress balance requiring different velocity gradients in the two fluids.

<figure style="text-align:center; margin: 2rem 0;">
  <img src="{{ '/assets/img/posts/kaist2_fig1_couette.svg' | relative_url }}" alt="Two-fluid Couette flow: velocity and vorticity profiles for three viscosity ratios" style="width:100%; max-width:700px;">
  <figcaption style="margin-top:0.6rem; font-size:0.9rem; color:#555;">
    <strong>Figure 1.</strong> Two-fluid Couette flow between plates at y/h = ±1 (bottom plate moves at u = −U, top plate at u = +U).
    Interface is at y = 0, with fluid 1 (viscosity μ₁) below and fluid 2 (μ₂) above.
    <strong>(a)</strong> Velocity profiles: all three are piecewise linear, but the slope — hence the vorticity — changes at the interface.
    The interface velocity u<sub>int</sub>/U = (μ₁ − μ₂)/(μ₁ + μ₂) shifts away from zero when μ₁ ≠ μ₂.
    <strong>(b)</strong> Vorticity profiles: constant per layer with a discontinuous jump at y = 0.
    The jump strength ∝ (μ₁ − μ₂) vanishes for the equal-viscosity case (green) and reverses sign when the viscosity ratio inverts.
  </figcaption>
</figure>

---

## 3. Two-Fluid Taylor-Couette Flow

### Setup

Replace the flat plates with coaxial cylinders: inner cylinder radius R₁ rotating at Ω₁, outer cylinder radius R₂ rotating at Ω₂. Two fluids fill the gap, separated by a cylindrical interface at some intermediate radius R_i.

### Why this is different from planar Couette

In planar Couette, the centrifugal force is absent. In Taylor-Couette flow, there is a centrifugal acceleration ∝ u²/r that modifies the radial pressure distribution and introduces an effective body force that competes with viscous diffusion.

The Rayleigh criterion for single-fluid stability requires that angular momentum increase outward: d(r²Ω)/dr > 0. In a two-fluid system, this criterion is modified by the density ratio, the viscosity ratio, and the interfacial tension at the cylindrical interface.

### Vorticity sheets in the annular geometry

As in the planar case, the stress-balance condition at the fluid–fluid interface requires:

$$
\mu_1 r_i \frac{\partial}{\partial r}\left(\frac{u_{\theta,1}}{r}\right)\bigg|_{r=R_i} = \mu_2 r_i \frac{\partial}{\partial r}\left(\frac{u_{\theta,2}}{r}\right)\bigg|_{r=R_i}
$$

This is the tangential stress continuity condition for azimuthal flow. The velocity gradient (hence vorticity) jumps across the interface whenever μ₁ ≠ μ₂, creating a cylindrical vorticity sheet analogous to the planar case.

For the lab's research on gravity–capillary waves on elastic films, the relevant geometry is more like a planar two-fluid system than a cylindrical one — but the Taylor-Couette analysis is useful for understanding **centrifugal instability**, which can also develop at a deforming interface when the flow has significant angular momentum.

---

## 4. Vorticity at a 2D Deforming Interface

### The general condition

For a 2D interface described by y = η(x, t), the kinematic condition (interface moves with normal velocity of the fluid) is:

$$
\frac{\partial \eta}{\partial t} + u \frac{\partial \eta}{\partial x} = v
$$

evaluated at y = η. The **dynamic conditions** depend on whether the interface is free or viscous.

### Free surface

At a free surface with no surface tension:

- Normal stress: p₁ − p₂ = 0 (pressure continuous across interface)
- Tangential stress: μ ∂u_t/∂n = 0

The tangential stress-free condition means that in the limit of inviscid flow, ω = 0 at the free surface. For viscous flow, ω at the surface is set by the curvature and the velocity distribution — it is no longer zero, but it is still an output of the solution, not an imposed condition.

### Viscous interface

At a viscous interface between fluids 1 and 2:

- Normal stress: p₁ − 2μ₁ ∂v₁/∂y = p₂ − 2μ₂ ∂v₂/∂y (continuous normal stress including viscous part)
- Tangential stress: μ₁(∂u₁/∂y + ∂v₁/∂x) = μ₂(∂u₂/∂y + ∂v₂/∂x)

This tangential stress continuity forces a **vorticity jump** unless μ₁ = μ₂:

$$
\mu_1 \omega_1 = \mu_2 \omega_2 \quad (\text{at the interface, in the tangential stress balance})
$$

More precisely, the jump in vorticity across the interface is related to the jump in μ and to the local interface curvature and strain rate. The interface acts as a **vorticity generator** whenever μ₁ ≠ μ₂, even in the absence of any pressure gradient or surface deformation.

### Free surface vs. viscous interface: a comparison

| Property                                | Free Surface                    | Viscous Interface                        |
| --------------------------------------- | ------------------------------- | ---------------------------------------- |
| Tangential stress                       | 0 (stress-free)                 | Continuous (μ₁ω₁ = μ₂ω₂)                 |
| Vorticity at interface (inviscid limit) | 0                               | Jump ∝ (μ₁ − μ₂)                         |
| Pressure condition                      | p continuous                    | p + normal viscous stress continuous     |
| Wave speed                              | √(gλ/2π) (deep water)           | Modified by density and viscosity ratios |
| Vorticity generation source             | Pressure gradient along surface | Viscosity mismatch + pressure gradient   |

The key physical conclusion: a free surface is a **vorticity sink** (it imposes ω → 0 at leading order), while a viscous interface is a **vorticity source** (it generates ω wherever there is viscosity mismatch). Replacing a rigid wall with a free surface generally reduces vorticity; replacing it with a viscous liquid interface can either increase or decrease vorticity depending on the viscosity ratio.

---

## 5. Lamb Vortex Pairs Below a Free Surface

### Configuration

Consider a pair of counter-rotating line vortices of strength ±Γ located at depth d below a flat free surface (y = 0 is the surface, y = −d is the vortex center). The fluid above the surface is air (density ≈ 0).

### Motion in the absence of the surface

In an unbounded fluid, the two vortices of equal and opposite circulation translate horizontally at constant velocity:

$$
U = \frac{\Gamma}{2\pi \cdot 2d} = \frac{\Gamma}{4\pi d}
$$

(by the Biot-Savart mutual induction). The separation 2d between vortices remains constant.

### Effect of the free surface

The free surface modifies the flow in two ways:

1. **Image vortices**: To satisfy the free-surface boundary condition (zero normal velocity for a rigid lid, or zero pressure for a true free surface in the inviscid limit), image vortices of **opposite sign** must be placed at y = +d. These images accelerate the real vortices toward the surface.

2. **Surface deformation**: The vortices induce a pressure depression at the surface above them. For finite Froude number, the surface deforms in response. This deformation feeds back into the vortex dynamics, slowing the vortex rise and eventually causing the vortex pair to **sweep out** sideways rather than surface.

### Circulation conservation at the surface

For a material contour enclosing both vortices and their mirror images, the total circulation is zero: Γ + (−Γ) = 0. This is consistent with the fact that the far-field flow is irrotational — the vortex pair looks like a dipole at large distances, with no net circulation.

As the vortex pair rises toward the surface, the near-surface vorticity distribution changes, but the total circulation enclosed remains conserved (Kelvin's theorem for the inviscid, uniform-density case). The surface acts as a mirror that rearranges — but does not create or destroy — the total circulation.

<figure style="text-align:center; margin: 2rem 0;">
  <img src="{{ '/assets/img/posts/kaist2_fig2_lamb.svg' | relative_url }}" alt="Streamlines of a Lamb vortex pair below a free surface, including image vortices" style="width:100%; max-width:660px;">
  <figcaption style="margin-top:0.6rem; font-size:0.9rem; color:#555;">
    <strong>Figure 2.</strong> Streamlines of a Lamb vortex pair in the low-Froude-number limit (flat free surface).
    The ⊕ and ⊖ symbols mark the real counter-rotating vortex pair at depth h<sub>v</sub>/d = 1.2 below the surface (y = 0, blue line).
    Faint mirror vortices above the surface enforce the zero-normal-velocity condition.
    The total circulation enclosed by any contour crossing the surface is zero (Γ + (−Γ) = 0), consistent with Kelvin's theorem.
    At higher Froude number the surface deforms, the symmetry breaks, and new vorticity is generated at the deformed interface.
  </figcaption>
</figure>

---

## 6. Froude Number Effects on Vorticity Distribution

### Definition

The Froude number for a vortex problem at depth d is:

$$
Fr = \frac{U}{\sqrt{gd}}
$$

where U is the translational velocity of the vortex pair. For Fr ≪ 1, surface deformation is negligible and the flat-surface image approximation is accurate. For Fr ~ 1, surface deformation becomes comparable to the vortex depth and strongly modifies the dynamics.

### Low Froude number (Fr ≪ 1)

The free surface is nearly flat. Vorticity remains concentrated in the vortex cores. The image vortex approximation is valid: the real vortices accelerate upward as they approach their images, and the circulation distribution is symmetric. In this limit, the free surface neither generates nor destroys vorticity — it only provides a reflective boundary condition for the induced velocity field.

### High Froude number (Fr ~ 1 or Fr > 1)

The surface deforms significantly above the vortex pair. The surface slope generates a non-zero pressure gradient along the interface, which by the vorticity generation formula above creates new vorticity at the surface. This newly generated surface vorticity is **opposite in sign** to the underlying vortex and partially cancels the rising vorticity. The result is that the vortex pair stalls below the surface: it cannot break through because the surface vorticity it induces opposes its own rise.

In extreme cases (Fr ≫ 1, as in a ship wake), the vortex pair interacts with surface waves strongly enough to deposit vorticity as a surface sheet — a mechanism for converting rotational kinetic energy into surface wave energy.

### Practical consequence for the lab

The elastic film experiments at KAIST involve oscillating interfaces where Fr is neither very small nor very large — it lies in the intermediate regime where both surface deformation and vorticity generation matter. The theoretical lesson from the Lamb vortex analysis is that **the vorticity distribution depends sensitively on Fr**, and a model that assumes a rigid or perfectly flat surface will systematically mispredict the near-surface vorticity field.

---

## 7. Circulation Conservation at Deforming Interfaces

### The general result for two-fluid flows

For a material contour C(t) that moves with the fluid and crosses a deforming interface, Kelvin's theorem is modified. In the absence of viscosity, gravity, and density jumps, the theorem still holds: DΓ/Dt = 0. But for real two-fluid flows:

$$
\frac{D\Gamma}{Dt} = -\oint_C \frac{dp}{\rho} + \oint_C \nu \frac{\partial \omega}{\partial n} dl
$$

The first term is the **barotropic pressure contribution**: for a single uniform fluid it vanishes (dp/ρ is an exact differential), but for a two-fluid system with a density jump, it does not.

When the contour C crosses the interface, the density ρ changes discontinuously, and the integral ∮ dp/ρ picks up a contribution from the interface pressure jump. This is physically equivalent to the baroclinic term identified in KAIST #1 — both are manifestations of the same underlying physics: **misaligned density and pressure gradients generate vorticity**.

### Implication for wave–vortex interaction

A gravity wave passing over a vortex pair changes the pressure field near the interface. If the interface is a free surface, the wave-induced pressure gradient along the surface generates vorticity according to the formula derived in §1. That vorticity — even if small — accumulates over many wave periods and eventually restructures the near-surface vorticity field in ways that affect wave propagation (wave–current interaction).

This feedback loop between waves and vorticity is the physical basis for the modified dispersion relation that the lab derives for waves on elastic films: the film compliance introduces an effective interfacial vorticity that shifts the wave speed relative to the pure free-surface case.

---

## Personal Reflection

### Why it caught my attention

The vorticity sheet at a viscous interface felt surprising in a way that the no-slip wall result didn't. A no-slip wall generating vorticity makes intuitive sense — the wall grabs the fluid and shears it. But a liquid–liquid interface with no wall, no external forcing, generating vorticity just because the two fluids have different viscosities? That took me a while to accept. The stress balance equation says it clearly: μ₁(∂u₁/∂y) = μ₂(∂u₂/∂y) at the interface, so if μ₁ ≠ μ₂ the velocity gradients must be different, meaning the vorticity is different, meaning there is a jump. The math is clean. But the physical picture — a thin vorticity sheet sitting at a fluid–fluid interface with nothing solid nearby — felt strange to me until I drew the Couette velocity profiles myself and saw the kink.

The Froude number discussion also caught me. I had been thinking of the free surface as a passive boundary that just reflects vorticity. Terrington et al. point out that at finite Fr, the surface deforms, and that deformation actively generates new vorticity. So the free surface is not passive at all — it's a vorticity generator that turns on as Fr increases. For the KAIST lab's oscillating film experiments, where Fr is never exactly zero, this felt directly relevant.

### What I couldn't figure out

The frame-dependence argument in Section 1 of the paper. Terrington et al. say that the vorticity generation rate at a moving interface depends on which reference frame you use to describe the interface — lab frame versus interface-fixed frame. The total vorticity flux must be frame-independent (it's a physical quantity), but the decomposition into different terms changes with the frame. I followed the algebra, but I could not build a clear physical picture of why a frame change would make one term vanish while another appears. I know it's a consequence of Galilean invariance, but the practical implication — that you have to be careful which frame you define your vorticity budget in — still felt slippery.

Also the ζ calibration in Ou et al. appeared in the previous review too, and I have the same confusion here.

### What makes it different from other papers

Most free-surface papers I had read treated the free surface as a simple boundary condition — either ω = 0 (inviscid) or some Stokes-flow approximation. Terrington et al. treat it as a _dynamical participant_: it generates or destroys vorticity, it responds to what the fluid does, and its response feeds back. That two-way picture is fundamentally different from using the free surface as just a boundary condition.

The comparison table between free surface and viscous interface (Table in Section 4) was the thing I found most useful to have written down explicitly. I knew intuitively that a liquid–liquid interface was different from a free surface, but I had never seen the exact differences laid out side by side like that — stress condition, vorticity condition, wave speed modification. That table alone made the paper worth reading.

---

## 8. Connection to the Lab's Research

The two reviews taken together define the theoretical space for interpreting the KAIST film experiments:

**From KAIST #1:** Rigid walls are vorticity sources; stress-free surfaces are vorticity neutral; density gradients create baroclinic vorticity in the interior.

**From KAIST #2:** Moving interfaces generate vorticity via the pressure gradient along the surface; viscous interfaces generate vorticity via the stress jump; Froude number controls how much the surface deforms and thus how much vorticity is fed back from the deformation.

The silicone film on water is an **elastic interface** — it has both the compliance of a free surface (it deforms under pressure) and a stress-jump condition (it transmits both normal and tangential forces like a membrane). Its vorticity signature is therefore a **combination** of the free-surface and viscous-interface cases, weighted by the film stiffness and the driving frequency.

Developing the correct vorticity boundary condition for this elastic film problem — one that recovers the free-surface limit when the film is very soft and the rigid-wall limit when the film is very stiff — is, in physical terms, the same problem as developing the correct dispersion relation. The dispersion relation and the vorticity balance are two faces of the same coin.

---

## References

1. **Terrington, S. J., Hourigan, K., & Thompson, M. C.** (2020). The generation and conservation of vorticity: deforming interfaces and boundaries in two-dimensional flows. _Journal of Fluid Mechanics_, **890**, A5. [doi:10.1017/jfm.2020.64](https://doi.org/10.1017/jfm.2020.64)

   _Primary source for this review. Develops the vorticity generation framework for moving/deforming interfaces, applies it to two-fluid Couette and Taylor-Couette flows, Lamb vortex pairs, and Froude-number-dependent surface vorticity._

2. **Brøns, M., Thompson, M. C., Leweke, T., & Hourigan, K.** (2014). Vorticity generation and conservation for two-dimensional interfaces and boundaries. _Journal of Fluid Mechanics_, **758**, 63–93. [doi:10.1017/jfm.2014.520](https://doi.org/10.1017/jfm.2014.520)

   _Predecessor paper (reviewed in KAIST #1) establishing the general vorticity generation formula for fixed no-slip and stress-free boundaries._

3. **Sheridan, J., Lin, J.-C., & Rockwell, D.** (1997). Flow past a cylinder close to a free surface. _Journal of Fluid Mechanics_, **330**, 1–30.

   _Experimental data on velocity and vorticity fields for a submerged cylinder; used in the companion paper as a reference case._

4. **Reichl, P., Hourigan, K., & Thompson, M. C.** (2005). Flow past a cylinder close to a free surface. _Journal of Fluid Mechanics_, **533**, 269–296.

   _Numerical counterpart to Sheridan et al. (1997)._
