---
layout: page
title: Proppant Embedment Simulation
description: Computational solid mechanics of proppant-rock interaction using solids4Foam
img:
importance: 1
category: research
---

Proppant grains placed inside hydraulic fractures must withstand enormous compressive loads — sometimes equivalent to the weight of kilometers of overlying rock. If they embed too deeply into the fracture walls, the fracture closes and gas cannot flow. This project models exactly that process.

Using **solids4Foam** (an OpenFOAM-based solid mechanics solver), I simulate a single quartz proppant grain compressed between two shale fracture walls. The rock is modeled with a **Mohr-Coulomb elasto-plastic** constitutive law, capturing realistic yielding behavior. Stress distributions are validated against **Hertz contact theory**.

The longer-term goal is coupling the deformed fracture geometry with single-phase fluid flow to quantify how embedment reduces fracture conductivity — a key parameter in shale gas production.

**Tools:** solids4Foam, OpenFOAM-2212, ParaView, Ubuntu/VirtualBox

**Formation targets:** Haynesville Shale, Eagle Ford Shale
