---
layout: page
title: Articles
permalink: /blog/
---

{% for post in site.posts %}
<div class="post-list-item">
  <div class="post-list-title"><a href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a></div>
  <div class="post-list-meta">{{ post.date | date: "%B %-d, %Y" }}</div>
  <div class="post-list-excerpt">{{ post.excerpt }}</div>
</div>
{% endfor %}
