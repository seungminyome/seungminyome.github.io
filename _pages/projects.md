---
layout: page
title: projects
permalink: /projects/
description: Research projects and simulations
nav: true
nav_order: 3
---

{% assign sorted_projects = site.projects | sort: "importance" %}
{% for project in sorted_projects %}
{% include projects.liquid %}
{% endfor %}
