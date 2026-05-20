---
layout: page
title: KCS Hull Resistance and Wave Pattern Analysis
description: RANS CFD validation against the 2010 Gothenburg Workshop benchmark — 1.16% error in total resistance (PNU, undergraduate)
img: assets/img/research/kcs-kelvin-wave.png
importance: 6
category: research
---

The KRISO Container Ship (KCS) is one of the most widely used benchmark hulls in ship hydrodynamics. Every major CFD code and turbulence model has been tested against it. For an undergraduate CFD course project, reproducing the 2010 Gothenburg Workshop results is a genuine validation exercise — not a toy problem.

**Test case:** Gothenburg 2010 Workshop, Case 2-1 (FX0). The hull advances at Fr = 0.26 (model speed 2.196 m/s, Re = 1.4 × 10⁷) with zero sinkage and trim. No propeller, no rudder. Outputs: Kelvin wave pattern, wave profile along the hull, and total resistance coefficient.

---

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/research/kcs-kelvin-wave.png" title="KCS Kelvin wave pattern" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  Top-view wave elevation contours showing the Kelvin wave system. The characteristic V-shaped pattern bounded by the Kelvin half-angle (≈19.5°) is well-captured. Bow and stern wave systems are clearly resolved; the wake region shows some numerical dissipation in the far field.
</div>

---

### Numerical Setup

| Parameter | Setting |
|-----------|---------|
| Mesh type | Structured hexahedral |
| Elements | ~4.4 million |
| y⁺ on hull | 50 |
| Turbulence model | k-ε |
| Solver | SIMPLE (implicit) |
| Timestep | 0.03 s |

The mesh was generated with three prism layers at the hull surface. My specific contribution was **mesh optimization** — tuning the refinement zones around the bow, stern, and free surface to balance accuracy against cell count.

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/research/kcs-mesh-bow.png" title="Structured mesh at the KCS bow" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  Structured hexahedral mesh at the KCS bow — the region with the steepest pressure gradients and the highest sensitivity to mesh quality. The cells follow the hull curvature without skewness.
</div>

---

### Results

**Total resistance:** converged to 82.79 N → C_T = 3.598 × 10⁻³

Experiment (Kim et al., 2001): C_T = 3.557 × 10⁻³ → **error: 1.16%**

<div class="row">
  <div class="col-sm-6 mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/research/kcs-resistance-convergence.png" title="Total resistance convergence" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm-6 mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/research/kcs-hull-wave.png" title="3D wave elevation on hull surface" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  <em>Left:</em> Total resistance time series — after an initial transient the solution converges cleanly to 82.79 N. <em>Right:</em> 3D wave elevation on the hull surface; the bow wave buildup and stern wave depression are clearly visible.
</div>

**Wave profile along the hull:**

<div class="row">
  <div class="col-sm-6 mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/research/kcs-wave-profile-cfd.png" title="CFD wave profile along KCS" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm-6 mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/research/kcs-wave-profile-efd.png" title="EFD wave profile along KCS (Kim et al. 2001)" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  <em>Left:</em> CFD wave configuration along the hull centerline. <em>Right:</em> EFD measurement (Kim et al., 2001). The overall shape — bow peak, mid-ship trough, stern recovery — matches well. The wake region shows larger discrepancy, attributed to numerical dissipation at the coarser far-field mesh.
</div>

---

### What I learned

The resistance prediction was accurate to 1.16% — better than expected for a coarse y⁺ = 50 wall treatment. The wave pattern was qualitatively correct but quantitatively off in the wake, which is a known limitation of k-ε for free-surface wake flows. Two specific lessons:

1. **Resistance is easier than waves.** Integrated forces average out local errors. Spatial distributions are far less forgiving — the wake discrepancy that barely moved C_T was clearly visible in the wave contours.

2. **The frame of reference matters.** We solved a fixed-hull / moving-fluid problem rather than a moving-hull problem. In the real towing tank, the model accelerates before reaching constant speed. That start-up transient creates wave patterns that persist into the measurement region. Our constant-speed assumption removed this effect, which partly explains the wake discrepancy.

**Role:** literature review, mesh optimization, post-processing (wave profiles, resistance extraction)

**Tools:** STAR-CCM+ · structured meshing · k-ε turbulence · SIMPLE

**References:**
- Kim, W. J., Van, S. H., & Kim, D. H. (2001). Measurement of flows around modern commercial ship models. *Experiments in Fluids*.
- ITTC – Recommended Procedures 7.5-03-02-03: Practical Guidelines for Ship CFD Applications.
- Gothenburg 2010 Workshop on CFD in Ship Hydrodynamics.
