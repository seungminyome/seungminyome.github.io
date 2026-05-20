---
layout: page
title: Ship Structural Defect Detection via LSTM Autoencoder
description: 99.49% accuracy anomaly detection from vibration/acoustic sensor data (PNU + Samsung HI)
img: assets/img/research/lstm-anomaly.png
importance: 5
category: research
---

The KCS project taught me that CFD gives you a flow field. This project taught me what that flow field does to the structure over time.

At **Pusan National University** and continuing at **Samsung Heavy Industries R&D**, I developed an LSTM autoencoder for structural health monitoring of ship hulls using vibration and acoustic sensor data from the Green Nuri vessel program. The question was simple: given sensor data from a structure under load, can you tell when something is wrong?

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/research/lstm-anomaly.png" title="LSTM autoencoder anomaly detection results" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  <em>Top:</em> Reconstruction error per observation — anomalous events (orange ×) spike sharply above the healthy baseline. <em>Bottom:</em> Confusion matrix — 621 true anomalies detected, 1 missed, 8 false positives. Test accuracy: 99.49%.
</div>

**Method:** the autoencoder is trained exclusively on healthy-condition data. At inference, reconstruction error above a learned threshold flags anomalies — no labeled defect examples needed during training. This makes the approach robust to novel defect types not seen during training.

**What this taught me:** the autoencoder reached 99.49% accuracy, but that number revealed its own limitation. The model could tell you _that_ something changed; it could not tell you _why_ it changed or at what scale the change originated. The reconstruction-error spike corresponded to a fatigue crack growing along a weld — a failure mode six orders of magnitude below the hull. That asymmetry between a detectable macroscale symptom and an invisible microscale cause was the observation that redirected my research toward smaller scales. Data-driven methods are powerful exactly where physics-based models are intractable — but knowing when you are in that regime requires understanding the physics well enough to recognize its limits.

**Tools:** MATLAB · Python · LSTM autoencoder · Samsung HI vibration/acoustic sensor suite

---

This started as undergraduate research at PNU and continued as an internship at Samsung Heavy Industries — the first time I worked with data from a real vessel program rather than a classroom dataset. The moment one reconstruction-error spike traced back to a fatigue crack propagating along a weld, the 99.49% number stopped feeling like an achievement and started feeling like a question. The model knew something had changed. I didn't know what, or why, or at what scale it had started.

I didn't have a name for the field I was being pulled toward yet. Fluid forces act on the hull; the hull responds; the response accumulates into structural change. The fluid and the structure are not two separate problems — they are the same problem told from two sides. I would spend the next two years at KAIST learning what that meant in practice.

**Tools:** MATLAB · Python · LSTM autoencoder · Samsung HI vibration/acoustic sensor suite
