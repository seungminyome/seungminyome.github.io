---
layout: page
title: projects
permalink: /projects/
description: FSI research across scales — from proppant grains in shale to elastic films on water to ship hull vortex dynamics.
nav: true
nav_order: 3
---

{% assign sorted_projects = site.projects | sort: "importance" %}
{% for project in sorted_projects %}
{% include projects.liquid %}
{% endfor %}
