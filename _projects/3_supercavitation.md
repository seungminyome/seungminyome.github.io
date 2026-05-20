---
layout: page
title: 2D Ventilated Supercavitation Near a Free Surface
description: Analytical cavity model with wake-theory correction for free-surface asymmetry (KAIST)
img: assets/img/research/supercavitation.png
importance: 3
category: research
---

Classical 2D supercavity models predict a symmetric cavity. Near a free surface, the cavity is not symmetric — the upper wall contracts while the lower wall remains close to the predicted shape. This discrepancy is not numerical noise; it is real physics that the standard model ignores.

At **KAIST**, in parallel with the elastic-film wave project, I built a 2D analytical model for ventilated supercavity formation in a free-surface-bounded environment and identified the source of the asymmetry.

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/research/supercavitation.png" title="Experimental supercavity and analytical model" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  <em>Top:</em> Laboratory supercavity photographs at two cavitator conditions — note upper-wall contraction relative to the lower wall. <em>Bottom:</em> MATLAB analytical cavity outline after applying the wake-theory correction. The modified model captures the asymmetry that classical theory misses.
</div>

**The fix:** the standard cavity-closure condition treats the wake as a symmetric, pressure-matched region. Near the free surface, the wake interacts asymmetrically with the surface-deformation field. Adding a wake-theory correction term to the closure condition — derived from the free-surface boundary condition — substantially reduced the gap between theory and experiment.

**What this taught me:** in analytical fluid mechanics, the most important assumption is often the one that was made for convenience rather than correctness. Re-examining the closure condition, not adding new physics to the interior, was what closed the discrepancy.

**Tools:** MATLAB · experimental free-surface cavitation facility
