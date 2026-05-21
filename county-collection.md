---
pagination:
  data: counties # This tells Eleventy to use _data/counties.json
  size: 1
  alias: county    # Each item from counties.json will be available as 'county'
layout: layouts/county.njk # Your existing county layout
permalink: "/counties/{{ county.id | slugify }}.html" # Or /{{ county.name | slugify | lower }}.html, ensure 'id' or 'name' provides the slug
eleventyComputed:
  title: "{{ county.displayName }} - Quanah Parker Trail" # Dynamically set the title here
  # This makes 'countyName' available to layouts/county.njk and layouts/base.njk as page.data.countyName
  # It's derived from the current 'county' object in the pagination.
  countyName: "{{ county.name }}"
tags:
  - countyPages # Optional: for creating a collection of these pages
---