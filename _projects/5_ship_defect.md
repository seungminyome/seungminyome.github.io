---
layout: page
title: Ship Structural Defect Detection via LSTM Autoencoder
description: 99.49% accuracy anomaly detection from vibration/acoustic sensor data (PNU + Samsung HI)
img: assets/img/research/lstm-anomaly.png
importance: 5
category: research
---

Not every FSI problem is about governing equations. Sometimes the question is: given sensor data from a structure under load, can you tell when something is wrong? This project answered that question with 99.49% test accuracy.

At **Pusan National University** and continuing at **Samsung Heavy Industries R&D**, I developed an LSTM autoencoder for structural health monitoring of ship hulls using vibration and acoustic sensor data from the Green Nuri vessel program.

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/research/lstm-anomaly.png" title="LSTM autoencoder anomaly detection results" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  <em>Top:</em> Reconstruction error per observation — anomalous events (orange ×) spike sharply above the healthy baseline. <em>Bottom:</em> Confusion matrix — 621 true anomalies detected, 1 missed, 8 false positives. Test accuracy: 99.49%.
</div>

**Method:** the autoencoder is trained exclusively on healthy-condition data. At inference, reconstruction error above a learned threshold flags anomalies — no labeled defect examples needed during training. This makes the approach robust to novel defect types not seen during training.

**What this taught me:** data-driven and physics-based methods ask opposite questions. Physics asks, given these equations, what will happen? Data asks, given these measurements, what is different? For structural health monitoring, where failure modes are too numerous to enumerate, the data approach wins. But knowing *why* the reconstruction error spikes — which frequency band, which structural mode — still requires the physics intuition. The two approaches are not alternatives; they are complements.

**Tools:** MATLAB · Python · LSTM autoencoder · Samsung HI vibration/acoustic sensor suite
