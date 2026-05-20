---
layout: about
title: about
permalink: /
subtitle: M.S. Student · <a href="https://www.uwyo.edu">University of Wyoming</a> · Energy & Petroleum Engineering

profile:
  align: right
  image: prof_pic.jpg
  image_circular: false
  more_info: >
    <p>syome@uwyo.edu</p>
    <p>Laramie, WY 82072</p>
    <p>University of Wyoming</p>

news: false
selected_papers: false
social: true
---

I am an M.S. student in Energy & Petroleum Engineering at the University of Wyoming, advised by [Dr. Soheil Saraji](https://www.uwyo.edu).

The question that has followed me since my undergraduate years is a simple one: **how do solids and fluids talk to each other when neither stays simple?** I have chased it across scales — from a thin elastic film floating on water to a single proppant grain pressed into shale — and across disciplines, from naval architecture to petroleum engineering and geomechanics. The setting changes. The question does not.

**Current research.** I am developing a coupled solid–fluid simulation framework in [solids4Foam](https://solids4foam.github.io) (OpenFOAM-based) to model how a single proppant grain embeds into deformable shale fracture walls under compressive loading. I implement elasto-plastic Mohr–Coulomb rock constitutive models with penalty-based contact algorithms, build structured O-grid meshes around the contact zone, and validate stress distributions against Hertz contact theory. The next step is coupling the deformed fracture geometry with single-phase fluid flow to quantify conductivity loss — the key parameter governing shale gas production. To ground the work in real data, I have trained on triaxial cell and DCI compressibility testing. To my knowledge, this is the first application of solids4Foam contact mechanics to proppant–fracture interaction.

**PhD research interests.** I want to extend this work in two directions: (1) from one or two grains to a realistic proppant pack, where embedment, crushing, and rearrangement occur together under cyclic stress; and (2) coupling deformed pore geometry with full transport simulation in a unified poromechanical framework, so that mechanical damage and permeability loss are captured consistently. These directions span computational solid mechanics, granular physics, and subsurface fluid mechanics — the same FSI regime that governs bearings, biological valves, soft robotics, and fractured rock alike.

**Background.** Before UW, I was a full-time research intern at **KAIST** (Graduate School of Mechanical Engineering, advised by Dr. Yeunwoo Cho), where I studied gravity–capillary wave dynamics on elastic silicone films and derived dispersion relations for gas–solid–liquid interfaces under nonlinear elastic coupling. I also built 2D ventilated supercavitation models with wake-theory corrections for cavity asymmetry near free surfaces. Earlier, I interned at **Samsung Heavy Industries**, developing neural network architectures for vessel defect classification. My undergraduate degree is in Naval Architecture & Ocean Engineering at Pusan National University (advised by Dr. Inwon Lee), where I conducted CFD simulations of vortex–wave interactions and built ANN-based structural health monitoring models using vibration and acoustic data.

**Long-term goal.** After my PhD, I plan to return to Korea and contribute to the country's emerging subsurface energy sector — not as a user of commercial software, but as an engineer who understands what the equations are doing.
