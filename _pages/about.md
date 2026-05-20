---
layout: about
title: about
permalink: /
subtitle: >
  M.S. · <a href="https://www.uwyo.edu">University of Wyoming</a> · Energy & Petroleum Engineering

profile:
  align: right
  image: prof_pic.jpg
  image_circular: false
  more_info: >
    <p>syome@uwyo.edu</p>
    <p>Laramie, WY 82072</p>

news: false
selected_papers: false
social: true
---

I build computational frameworks for **fluid–structure interaction** problems — situations where a deforming solid and a moving fluid cannot be understood separately because each one rewrites the boundary condition for the other.

The question has a deceptively simple form: *what does the solid do to the flow, and what does the flow do to the solid?* What makes it hard is that the answer is scale-dependent. At the meter scale, gravity and turbulent inertia dominate; the coupling is structural and blunt. At the millimeter scale, surface tension and elastic restoring forces become competitive, and the coupling becomes intimate — the solid does not merely respond to the fluid, it shapes the dispersion relation. At the sub-millimeter scale, the deformed geometry of a single grain contact determines whether a fracture transmits fluid or seals shut.

I have worked across all three of these regimes, and the path from one to the next was not a pivot — it was a pursuit. The physics I needed to understand kept living one scale smaller than where I was looking.

**The inflection point.** At Pusan National University, I studied large-scale naval FSI — vortex shedding near free surfaces, hull resistance, ship structural health monitoring. At **Samsung Heavy Industries**, building an LSTM autoencoder for defect detection on the Green Nuri vessel program, I encountered the central limitation of macroscale monitoring: the sensor signals were the macroscale fingerprints of microscale events. A reconstruction-error spike corresponded to a fatigue crack growing along a weld — a failure mode originating at the grain scale, six orders of magnitude below the hull. The system could detect the symptom with 99.49% accuracy. It had no vocabulary for the cause.

That asymmetry was not a data-science problem. It was a mechanics problem. The vibration modes the LSTM was learning to recognize were the large-scale resonances of a structure whose failure was governed by small-scale contact and material yielding. Understanding why ships fail — not merely detecting that they have — required descending in scale.

**The deliberate descent.** At **KAIST** (Graduate School of Mechanical Engineering, advised by Prof. Yeunwoo Cho), I stepped down systematically. I studied centimeter-scale supercavitation — where cavity asymmetry near a free surface revealed that the closure boundary condition, rather than the cavity geometry itself, is where the dominant physics lives. I derived the dispersion relation for gravity–capillary waves on an elastic silicone film, a three-phase gas–solid–liquid problem in which the solid is not a structural boundary but an active participant in wave propagation. I ran CFD simulations of von Kármán vortex shedding near a free surface — connecting back to the large-scale vortex dynamics I had studied at PNU, but now with the tools to analyze the coupling at the interface itself.

At each step, the dominant forces changed. Gravity gave way to surface tension; elastic restoring forces entered the dispersion relation; the coupling between solid deformation and fluid response became primary physics rather than a perturbation. But the *structure* of the problem was invariant: a deformable boundary, a fluid that cannot ignore it, and a contact condition that neither side determines alone.

**Current work.** I am an M.S. student at the University of Wyoming, advised by [Prof. Soheil Saraji](https://www.uwyo.edu). My thesis develops a coupled solid–fluid simulation framework in [solids4Foam](https://solids4foam.github.io) (OpenFOAM-based) for proppant embedment in hydraulic fractures — the sub-millimeter endpoint of the scale descent. The framework implements a J2 perfect-plasticity rock model, penalty-based contact algorithms, and structured O-grid meshes around the contact zone, validated against Hertz contact theory and calibrated with real triaxial and DCI laboratory data. To my knowledge, this is the first application of solids4Foam contact mechanics to proppant–fracture interaction.

**PhD direction.** I want to extend the proppant-embedment framework in two directions: (1) from a single grain to a realistic proppant pack under cyclic stress, and (2) into a unified poromechanical framework coupling mechanical damage to permeability loss — building the bridge from grain-scale contact mechanics to Darcy-scale flow that the field currently handles with empirical correlations.

**Long-term.** After my PhD I plan to return to Korea and contribute to the country's emerging subsurface energy engineering community — not as a user of commercial software, but as an engineer who understands what the equations are doing.
