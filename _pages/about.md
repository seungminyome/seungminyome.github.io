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

I build computational models of **fluid–structure interaction**: problems where a deforming solid and a moving fluid cannot be understood separately, because each one sets the boundary condition for the other. I have worked on them at three scales — ship hulls and propellers at Pusan National University and Samsung Heavy Industries, centimetre-scale free-surface waves and cavities at KAIST, and now the sub-millimetre contact between a proppant grain and fracture rock.

**Current work.** I am an M.S. student at the University of Wyoming, advised by [Prof. Soheil Saraji](https://www.uwyo.edu). My thesis uses [solids4Foam](https://solids4foam.github.io) (OpenFOAM-based) to model proppant embedment in hydraulic fractures: a 1 mm grain pressed into Mohr–Coulomb Montney siltstone and unloaded, with published rock properties and nothing fitted to indentation data. Mesh-converged results feed a dimensionless residual-depth equation; because its most sensitive input, the dilation angle, has not been measured for this rock, I built a micro-indentation rig and am developing inverse models to identify it from indentation curves. A second thread connects a running OpenFOAM solver to a local language model ([PythonFOAM fork](https://github.com/seungminyome/PythonFOAM)).

**More.** The full [research statement]({{ '/research/' | relative_url }}) explains how the scale descent happened and where it is going; the [projects]({{ '/projects/' | relative_url }}) page has one page per study, and the [CV]({{ '/cv/' | relative_url }}) has the details. Code is on [GitHub](https://github.com/seungminyome).
