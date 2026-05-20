---
layout: page
title: 2D Ventilated Supercavitation Near a Free Surface
description: Analytical cavity model with wake-theory correction for free-surface asymmetry (KAIST)
img: assets/img/research/supercavitation.png
importance: 3
category: research
---

Everything before this was either simulation or theory. This one was built with my hands.

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

---

## How it actually happened

The apparatus did not arrive ready-made. I ordered the parts and assembled it myself — screws, plastic framing, custom-cut glass panels. Each piece had to fit precisely because the optics mattered as much as the hydraulics: if the glass was warped or the seals leaked, the images would be useless.

Before every day of testing, I climbed into the tank and wiped it down with a rag. Morning until noon, most days. This sounds like maintenance. It was not optional. A water film left on the interior walls creates a thin layer of surface tension that adds resistance to the flow, shifting the pressure distribution just enough to corrupt the cavity shape. And the same film scatters light — the high-speed camera footage turns hazy, and the bubble boundary you need to measure becomes ambiguous. Every bubble in the frame mattered. One unclear boundary at the wrong location and the asymmetry measurement becomes noise.

So the cleaning was the research.

The scientific problem — why is the cavity asymmetric? — I worked on every night with a PhD student in the lab. We would sit with the footage, draw pressure diagrams, go back and forth. My background was in naval architecture, and at some point I brought up wake theory. The argument was this: in incompressible flow, pressure disturbances propagate in all directions. A downstream geometry can theoretically influence upstream conditions. But in a cavitating flow, the cavity itself acts as a partial pressure barrier — disturbances from behind are attenuated before they reach the cavitator at the front. So the influence is real but weak. Much weaker than standard potential flow would predict. The wake is a downstream phenomenon; it does not directly disturb the upstream cavity, but it modifies the global pressure distribution, and through that it acts on the cavity asymmetry indirectly. That distinction — direct versus indirect, strong versus weak — was what the existing closure models had not accounted for. I spent several nights modifying the wake correction term to capture that indirect effect.

When the corrected model finally matched the experimental cavity outline, I stayed at the desk for a while without doing anything. I had been told by people I respected that the asymmetry was probably measurement error, or an artifact of the setup, or just something that analytical models were not meant to capture. The result said otherwise.

I know this is a small result in the scope of fluid mechanics research. The correction is modest. The paper is not published. But I had built the tank, cleaned it every morning, stayed up night after night to understand a single asymmetric shape — and then I had understood it. That is the closest I have come to the feeling people describe when they talk about why they do research.

This remains the most thrilling moment I have had in science so far. When I arrived at Wyoming to study proppant embedment in hydraulic fractures, the problem looked completely different — different scale, different application, different language. But the question was the same one I had been asking since the first KCS mesh: what happens at the interface between solid and fluid under stress? KAIST had taught me to ask it clearly. Wyoming is where I am learning to answer it at depth.
