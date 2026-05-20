---
layout: page
title: Vortex–Wave Interaction Near a Free Surface
description: CFD analysis of vortex–wave interaction and free-surface-induced asymmetry for a cylinder (KAIST)
img: assets/img/research/vortex-wave.png
importance: 4
category: research
---

I arrived at KAIST carrying two half-formed ideas: that CFD gives you a flow field, and that structures fail because of what flow fields do to them over time. This project was where those two ideas first appeared in the same place.

When a cylinder sheds vortices near a free surface, the top–bottom symmetry of the von Kármán street breaks down. The upper vortices weaken; the lower ones persist. The free surface is not just a boundary condition — it is an active participant in the flow. At **KAIST** (Graduate School of Mechanical Engineering, advised by Prof. Yeunwoo Cho), I ran CFD simulations of this problem in ANSYS Fluent using the Volume of Fluid (VOF) method to simultaneously resolve the vorticity field and the deforming free surface.

<div class="row">
  <div class="col-sm-7 mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/research/vortex-wave.png" title="Vorticity field near free surface" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm-5 mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/research/vortex-contour.png" title="Pressure contours around hull" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  <em>Left:</em> Vorticity field (blue = clockwise, red = counterclockwise) for a cylinder near the free surface — asymmetry between upper and lower shedding is clearly visible. <em>Right:</em> Pressure and streamline contours; the free surface deforms in response to the pressure field, which in turn modifies vortex dynamics.
</div>

**Key findings:**

- Free-surface proximity reduces the Strouhal number and shifts the shedding frequency
- Upper vortices are stretched and attenuated by surface deformation; lower vortices remain coherent
- The asymmetry grows with decreasing submergence depth (Fr-dependent)

**What this taught me:** a flow field is a connected story. Vorticity, pressure, and surface deformation are not three separate quantities — each one is a consequence of the other two. Reading them as a system, not a list, is the skill that carries across every problem I have worked on since.

**Tools:** ANSYS Fluent (VOF)

---

This was done at KAIST in parallel with the elastic film experiments — physical experiments in one corner of the lab, CFD in another. Running both at the same time was disorienting at first, but it turned out to be useful. When the simulation showed the upper vortex weakening near the surface, I already had an instinct for what that looked like physically, because I had been watching wave patterns in the tank every day. The two ways of seeing the same problem kept checking each other.

By this point I had a name for what I was working on: FSI. But the interfaces I had studied — the free surface, the hull boundary — were both essentially rigid or passive. The next question was already forming: what happens when the boundary itself is not fixed? What if the interface is the thing that deforms?
