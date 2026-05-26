---
layout: layouts/base.njk
title: The People - Quanah Parker Trail
permalink: /people.html
# Add bodyClass if you want specific body styles for this page
# bodyClass: page-contact
---

<section id="about-section" class="content-section alt-background">
    <h2>Comanche People</h2>
    <div class="text-content-container">
             <p>
              Text 1 About Comanche
            </p>
            <p>
              Text 2 About Comanche
            </p>
            <p>
              Text 3 About Comanche
            </p>
            <p>
              Text 4 About Comanche
            </p>
            {# Keep button paragraph inside text wrap #}
           </div> {# End about-text-wrap #}
</section>
<section id="content-section" class="content-section alt-background2">
    <div class="text-content-container about-flex-container">
        {# --- Column 1: Image --- #}
        <div class="about-image-wrap">
            {# Uncommented and moved image - Apply url filter #}
            <img src="{{ '/img/smith1.jpg' | url }}" alt="Charles Smith, Arrow Maker" class="about-section-image">
        </div>
        {# --- Column 2: Text Content --- #}
        <div class="about-text-wrap">
            <h2>Charles Smith (1943-2018)</h2>
            <p>
                Charles Allen Smith passed away peacefully at his home in New Home, Texas, on Saturday, March 3, 2018. Family and friends gathered to celebrate his life on March 6, 2018, at Calvary Baptist Church in Brownfield, Texas.
            </p>
            <p>
                Charles is greatly missed by his family and friends. An artisan in steel, he blessed the Quanah Parker Trail with his talents, his generosity and his leadership. The tall roadside arrows are both his design and his handiwork. His grandson and protégé, Landon Smith, aims to follow in his bootprints and uphold the legacy. On June 13, 2015, Ardith Parker Leming, great-granddaughter of Quanah Parker, honored Charles Smith by adopting him into her family at a ceremony at dawn at Quanah’s Star House. She gave him the Comanche name Paaka-Hani-Eta, meaning “Arrow Maker.”
            </p>
            {# Keep button paragraph inside text wrap #}
            <p style="text-align: center;"> {# Button alignment handled by CSS below #}
               <a href="https://www.legacy.com/us/obituaries/lubbockonline/name/charles-smith-obituary?id=11214033" target="_blank" rel="noopener noreferrer" class="button navigation-button">Obituary</a>
            </p>
           </div> {# End about-text-wrap #}
    </div> {# End about-flex-container #}
</section>
<section id="about-section" class="content-section alt-background">
    <h2>Person 3</h2>
    <div class="text-content-container">
             <p>
              Text 1 About Person 1
            </p>
            <p>
              Text 2 About Person 1
            </p>
            <p>
              Text 3 About Person 1
            </p>
            <p>
              Text 4 About Person 1
            </p>
            {# Keep button paragraph inside text wrap #}
           </div> {# End about-text-wrap #}
</section>

