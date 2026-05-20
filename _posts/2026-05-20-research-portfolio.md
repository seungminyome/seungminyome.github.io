---
layout: post
title: "Research Portfolio: Five Projects, One Question"
date: 2026-05-20 12:00:00-0600
description: A visual summary of my research across naval architecture, fluid mechanics, and petroleum engineering — each project a different scale, the same underlying question about how solids and fluids interact.
tags: research FSI OpenFOAM solids4foam KAIST proppant
categories: research
related_posts: false
toc:
  sidebar: left
---

<style>
.research-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 36px;
  background: var(--global-bg-color, #fff);
}
.research-card .card-number {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #888;
  margin-bottom: 4px;
}
.research-card .card-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--global-text-color, #333);
  margin-bottom: 2px;
}
.research-card .card-meta {
  font-size: 0.82rem;
  color: #888;
  margin-bottom: 16px;
  font-style: italic;
}
.research-card img {
  width: 100%;
  border-radius: 4px;
  margin-bottom: 8px;
}
.research-card .fig-caption {
  font-size: 0.78rem;
  color: #888;
  text-align: center;
  margin-bottom: 0;
}
.insight-block {
  background: #f7f9fc;
  border-left: 3px solid #4a90d9;
  border-radius: 0 4px 4px 0;
  padding: 12px 16px;
  margin-bottom: 14px;
}
.insight-block h5 {
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #4a90d9;
  margin-bottom: 8px;
}
.insight-block ul {
  margin-bottom: 0;
  padding-left: 18px;
  font-size: 0.88rem;
}
.reflection-block {
  background: #fdf6f0;
  border-left: 3px solid #e8904a;
  border-radius: 0 4px 4px 0;
  padding: 12px 16px;
}
.reflection-block h5 {
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #e8904a;
  margin-bottom: 8px;
}
.reflection-block p {
  font-size: 0.88rem;
  margin-bottom: 0;
  line-height: 1.6;
}
.layout-guide {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 10px;
  font-size: 0.75rem;
  color: #999;
  border-top: 1px solid #eee;
  padding-top: 10px;
}
.layout-guide span {
  background: #f0f0f0;
  padding: 2px 8px;
  border-radius: 3px;
}
</style>

The question I have carried since undergraduate is a simple one: **how do solids and fluids talk to each other when neither stays simple?** Below are five projects where I chased that question — from ship hulls to silicone films to shale fractures. The scale changes every time. The mechanics do not.

---

<!-- ======================================================= -->
<!-- CARD 1: Proppant Embedment -->
<!-- ======================================================= -->

<div class="research-card">
<div class="card-number">01 · CURRENT RESEARCH</div>
<div class="card-title">Proppant Embedment and Fracture Conductivity in Deformable Shale</div>
<div class="card-meta">University of Wyoming · 2025–Present · Advisor: Prof. Soheil Saraji</div>

<div class="row">
<div class="col-md-6">

<p style="font-size:0.88rem; color:#666; line-height:1.7; background:#f7f9fc; border-radius:4px; padding:16px;">
<strong>Setup.</strong> A single quartz proppant grain (dia. ~0.5 mm) pressed between two parallel shale fracture walls under 5–50 MPa closure stress.<br><br>
<strong>Mesh.</strong> Structured O-grid around the grain–rock contact zone. The grid concentrates resolution exactly where stress gradients are steepest — at the Hertzian contact patch.<br><br>
<strong>Key result.</strong> von Mises stress peaks at the contact patch and decays radially into the rock. Stress distribution matches Hertz contact theory. Plastic yielding (Mohr–Coulomb) initiates at ~15 MPa.
</p>
<p class="fig-caption">solids4Foam / OpenFOAM-2212 · Haynesville & Eagle Ford shale parameters</p>

</div>
<div class="col-md-6">

<div class="insight-block">
<h5>Key Insight</h5>
<ul>
<li>First application of solids4Foam contact mechanics to proppant–fracture interaction</li>
<li>Penalty-based segment-to-segment contact + Mohr–Coulomb elasto-plastic rock model</li>
<li>Hertz validation confirms framework correctness before introducing plasticity</li>
<li>Fracture aperture after embedment → directly feeds permeability calculation</li>
</ul>
</div>

<div class="reflection-block">
<h5>Research Reflection</h5>
<p>
The fracture is the highway for gas to reach the wellbore. The proppant is what keeps it open. When the grain embeds too deep, the highway closes. This project is about quantifying exactly how much it closes — and why. What drew me in is that this is the same contact-mechanics problem I kept seeing at other scales: an elastic object pressing into a deformable substrate, with fluid behavior determined by the deformed geometry. The material changes. The structure of the problem does not.
</p>
</div>

</div>
</div>
</div>

---

<!-- ======================================================= -->
<!-- CARD 2: Gravity-Capillary Waves on Elastic Film -->
<!-- ======================================================= -->

<div class="research-card">
<div class="card-number">02 · KAIST · 2024</div>
<div class="card-title">Gravity–Capillary Waves on an Elastic Silicone Film Under Air-Jet Loading</div>
<div class="card-meta">KAIST Graduate School of Mechanical Engineering · Advisor: Prof. Yeunwoo Cho</div>

<div class="row">
<div class="col-md-6">

<img src="{{ '/assets/img/research/elastic-film-waves.png' | relative_url }}" alt="Elastic film wave patterns at increasing air-jet speeds (19–44 cm/s)">
<p class="fig-caption">Wave patterns on elastic silicone film at six air-jet speeds (19–44 cm/s). At lower speeds, gravity waves dominate; beyond ~34 cm/s, the pattern transitions to a capillary-dominated regime with complex cross-hatching.</p>

</div>
<div class="col-md-6">

<div class="insight-block">
<h5>Key Insight</h5>
<ul>
<li>Derived the dispersion relation for a gas–solid–liquid three-phase interface with nonlinear elastic coupling</li>
<li>Elastic membrane suppresses capillary-wave formation at low speeds; shifts dispersion curve relative to a free surface</li>
<li>Film thickness and boundary fixity control whether the system behaves like a membrane or a plate</li>
<li>Minimum phase speed (transition to Kelvin wave) identified experimentally and matched to theory</li>
</ul>
</div>

<div class="reflection-block">
<h5>Research Reflection</h5>
<p>
Before this project, I thought FSI meant a structure responding to flow. Here the structure <em>was</em> the interface — the film was simultaneously the solid and the boundary condition for both the air and the water. Deriving the dispersion relation required treating three phases at once, which turned a standard wave problem into a nonlinear eigenvalue problem. The moment when the theoretical curve finally matched the experimental minimum-speed data was the clearest demonstration I had seen that a single equation can capture surprisingly complex physics.
</p>
</div>

</div>
</div>
</div>

---

<!-- ======================================================= -->
<!-- CARD 3: 2D Supercavitation Model -->
<!-- ======================================================= -->

<div class="research-card">
<div class="card-number">03 · KAIST · 2024</div>
<div class="card-title">2D Ventilated Supercavitation Near a Free Surface</div>
<div class="card-meta">KAIST Graduate School of Mechanical Engineering · Advisor: Prof. Yeunwoo Cho</div>

<div class="row">
<div class="col-md-6">

<img src="{{ '/assets/img/research/supercavitation.png' | relative_url }}" alt="Experimental supercavity photos and MATLAB analytical cavity outline">
<p class="fig-caption"><em>Top:</em> Laboratory supercavity photographs at two cavitator conditions — note asymmetry between upper and lower cavity walls due to free-surface proximity. <em>Bottom:</em> MATLAB analytical model cavity outline after wake-theory correction. The modified model captures upper-wall contraction that classical theory misses.</p>

</div>
<div class="col-md-6">

<div class="insight-block">
<h5>Key Insight</h5>
<ul>
<li>Classical 2D supercavity models predict symmetric cavities; near a free surface, the upper wall contracts</li>
<li>Root cause: the wake behind the cavity interacts asymmetrically with the free surface</li>
<li>Wake-theory correction term added to cavity closure condition — improved agreement with experimental contours</li>
<li>Cavity length and maximum diameter both sensitive to depth-to-cavitator-diameter ratio</li>
</ul>
</div>

<div class="reflection-block">
<h5>Research Reflection</h5>
<p>
Theory and experiment disagreed — the predicted cavity was symmetric, the observed one was not. The usual instinct is to add more physics to the model. Here, the gap closed by re-examining an assumption made 50 years earlier in how the wake was handled at closure. This project taught me that in analytical fluid mechanics, the boundary condition at the edge of your domain is often where the real physics lives — and where the assumptions are most likely to have been made for convenience rather than correctness.
</p>
</div>

</div>
</div>
</div>

---

<!-- ======================================================= -->
<!-- CARD 4: Vortex-Wave Interaction CFD -->
<!-- ======================================================= -->

<div class="research-card">
<div class="card-number">04 · PUSAN NATIONAL UNIVERSITY · 2022–2024</div>
<div class="card-title">Vortex–Wave Interaction Near a Free Surface (ANSYS Fluent)</div>
<div class="card-meta">PNU Department of Naval Architecture & Ocean Engineering · Advisor: Prof. Inwon Lee</div>

<div class="row">
<div class="col-md-6">

<img src="{{ '/assets/img/research/vortex-wave.png' | relative_url }}" alt="CFD vorticity field near free surface — blue clockwise, red counterclockwise">
<p class="fig-caption">Vorticity field (ANSYS Fluent) for flow past a circular cylinder near a free surface. Blue: clockwise vorticity; Red: counterclockwise. The free surface breaks the top–bottom symmetry of the von Kármán street — the upper vortices are stretched and weakened relative to the lower ones.</p>

</div>
<div class="col-md-6">

<div class="insight-block">
<h5>Key Insight</h5>
<ul>
<li>Free surface proximity breaks top–bottom symmetry of the vortex shedding pattern</li>
<li>Upper vortices weaken as they interact with the deforming surface; lower vortices remain relatively intact</li>
<li>Shedding frequency shifts with submergence depth — Strouhal number is depth-dependent near the surface</li>
<li>VOF method (ANSYS Fluent) captures both the vorticity field and the free-surface deformation simultaneously</li>
</ul>
</div>

<div class="reflection-block">
<h5>Research Reflection</h5>
<p>
This was the project where I first learned to read a flow field — not as isolated quantities (vorticity here, pressure there) but as a single connected story where each feature explains the next. The asymmetry of the vortex street was not an anomaly; it was the free surface doing what boundaries always do: imposing a constraint that the flow then works to satisfy. That lesson — that boundary conditions are load-bearing physics, not just numerical necessities — has shaped how I approach every problem since.
</p>
</div>

</div>
</div>
</div>

---

<!-- ======================================================= -->
<!-- CARD 5: Ship Defect Detection via LSTM ANN -->
<!-- ======================================================= -->

<div class="research-card">
<div class="card-number">05 · PNU / SAMSUNG HEAVY INDUSTRIES · 2024</div>
<div class="card-title">Ship Structural Defect Detection via LSTM Autoencoder</div>
<div class="card-meta">Pusan National University + Samsung Heavy Industries R&D · MATLAB & Python</div>

<div class="row">
<div class="col-md-6">

<img src="{{ '/assets/img/research/lstm-anomaly.png' | relative_url }}" alt="LSTM autoencoder reconstruction error and confusion matrix — 99.49% test accuracy">
<p class="fig-caption">LSTM autoencoder results on vibration/acoustic sensor data. <em>Top:</em> Reconstruction error per observation — anomalies (orange ×) spike clearly above the healthy baseline. <em>Bottom:</em> Confusion matrix — 621 true anomalies detected, 1 missed, 8 false positives. Test accuracy: 99.49%.</p>

</div>
<div class="col-md-6">

<div class="insight-block">
<h5>Key Insight</h5>
<ul>
<li>LSTM autoencoder trained only on healthy data; anomaly = reconstruction error above threshold</li>
<li>99.49% test accuracy on vibration + acoustic sensor data from the Green Nuri vessel program</li>
<li>1 missed anomaly out of 621 — far below the threshold for structural health monitoring applications</li>
<li>Architecture generalizes across defect types without requiring labeled anomaly examples during training</li>
</ul>
</div>

<div class="reflection-block">
<h5>Research Reflection</h5>
<p>
Data-driven methods and physics-based methods ask opposite questions. Physics asks: <em>given these equations, what will happen?</em> Data asks: <em>given these measurements, what is different?</em> For structural health monitoring, the data approach wins because you cannot write a governing equation for every failure mode. What this project gave me was respect for both approaches — and a clearer sense of when each one belongs. For well-understood physics, build the equation. For systems too complex to model from first principles, let the data define normal.
</p>
</div>

</div>
</div>
</div>

---

<div style="background:#f7f9fc; border-radius:6px; padding:16px 20px; font-size:0.82rem; color:#666; margin-top:8px;">
<strong>Layout guide (per card):</strong> &nbsp;
Figure ~45% &nbsp;·&nbsp;
Key Insight ~25% &nbsp;·&nbsp;
Research Reflection ~25% &nbsp;·&nbsp;
Meta ~5%
&nbsp;&nbsp;|&nbsp;&nbsp;
<em>One result figure + insight bullets + personal reflection = research identity</em>
</div>
