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

What makes my work unusual is its range of scale. I have studied FSI from the **sub-millimeter** (a proppant grain embedding into shale under 50 MPa closure stress) to the **millimeter** (gravity–capillary waves on a three-phase elastic-film interface) to the **centimeter** (ventilated supercavity asymmetry near a free surface) to the **meter** (vortex shedding past a cylinder near a ship's waterline). The governing equations change at each scale. The structure of the problem — a solid boundary that deforms, a fluid domain that responds, and a coupling that must be resolved — does not.

**Current work.** I am an M.S. student at the University of Wyoming, advised by [Prof. Soheil Saraji](https://www.uwyo.edu). My thesis develops a coupled solid–fluid simulation framework in [solids4Foam](https://solids4foam.github.io) (OpenFOAM-based) for proppant embedment in hydraulic fractures. The framework implements elasto-plastic Mohr–Coulomb rock models, penalty-based contact algorithms, and structured O-grid meshes around the contact zone — validated against Hertz contact theory, calibrated with real triaxial and DCI laboratory data. To my knowledge, this is the first application of solids4Foam contact mechanics to proppant–fracture interaction.

**Before UW.** I was a full-time research intern at **KAIST** (Graduate School of Mechanical Engineering, advised by Prof. Yeunwoo Cho), where I derived the dispersion relation for gravity–capillary waves on an elastic silicone film under air-jet loading — a three-phase FSI problem with nonlinear elastic coupling — built a 2D analytical supercavitation model with a wake-theory correction for free-surface-induced cavity asymmetry, and ran CFD vortex–wave interaction simulations in ANSYS Fluent to analyze free-surface-induced von Kármán vortex asymmetry. Earlier, at **Pusan National University** (Naval Architecture & Ocean Engineering, advised by Prof. Inwon Lee), I conducted PIV and hull resistance experiments and developed an LSTM autoencoder for ship structural health monitoring (99.49% test accuracy).

**PhD direction.** I want to extend the proppant-embedment framework in two directions: (1) from a single grain to a realistic proppant pack under cyclic stress, and (2) into a unified poromechanical framework coupling mechanical damage to permeability loss. Both directions sit at the intersection of computational solid mechanics, granular physics, and subsurface fluid mechanics.

**Long-term.** After my PhD I plan to return to Korea and contribute to the country's emerging subsurface energy engineering community — not as a user of commercial software, but as an engineer who understands what the equations are doing.
