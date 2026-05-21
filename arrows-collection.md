---
layout: layouts/arrow.njk
pagination:
  data: arrows # From _data/arrows.json
  size: 1
  alias: arrow # Each item will be available as 'arrow' in the layout
  addAllPagesToCollections: true # Good for creating an 'arrows' collection
permalink: "/arrows/{{ arrow.arrowNumber }}.html" # Matches your existing permalink structure
tags: "arrows" # For collections

# Use eleventyComputed to set the title for each generated page,
# otherwise it would use the title of this generator file.
eleventyComputed:
  title: "{{ arrow.arrowName }} - Arrow #{{ arrow.arrowNumber }} - Quanah Parker Trail"
  countyName: "{{ arrow.countyName }}"
  # You can compute other front matter variables here if needed for each page
  # For example, if you wanted a meta description:
  # description: "Details for Quanah Parker Arrow #{{ arrow.arrowNumber }} ({{ arrow.arrowName }}) in {{ arrow.countyName }} County."
---

{# This file itself doesn't need content if it's just for generation. #}
{# If you wanted this URL (e.g., /arrows-collection/) to be an index page, #}
{# you could add that content here, but typically you'd have a separate index page. #}