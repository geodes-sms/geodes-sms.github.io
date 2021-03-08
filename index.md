---
layout: home
title: Home
permalink: /
order: 0
---

{% assign postdocs = site.data.people.people | where_exp: "person", "person.position == 'Postdoc'" %}
{% assign phds = site.data.people.people | where_exp: "person", "person.position == 'PhD'" %}
{% assign mscs = site.data.people.people | where_exp: "person", "person.position == 'MSc'" %}

GEODES is the software engineering group of the [University of Montreal](https://www.umontreal.ca/), Canada, as part of the [Department of Computer Cience and Operational Research (DIRO)](https://diro.umontreal.ca/english/home/).<br/>
There are {{ mscs.size }} master's students, {{ phds.size }} doctoral students, and {{ postdocs.size }} post-doctoral fellows affiliated with the group currently. The team is led by three DIRO faculty members: Houari Sahraoui, Eugene Syriani, and Michalis Famelis.<br/><br/>
GEODES was founded as part of DIRO in 1992. Since then, more than a hundred students have obtained a master's degree and more than thirty have graduated with a PhD. Many of these students are professors in Quebec, Canada, and around the world (ÉTS, Laval, Polytechnique, UQAM, Ottawa, DePaul, Houston, Indiana, Michigan, United Arab Emirates, etc.), and others occupy key positions at large tech companies. The team has developed several partnerships with local SMEs and large industrial groups working in the information technology sector.