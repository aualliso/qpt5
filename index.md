---
layout: layouts/base.njk
title: Home
---
<div class="panel-container">
    <a href="{{ '/' | url }}"><h1 class="main-title">Quanah Parker Trail</h1></a>
    <a href="{{ '/story.html' | url }}" class="image-panel">
        <img alt=""> {# Consider adding descriptive alt text #}
        <span class="panel-text">The Story</span>
    </a>
    <a href="{{ '/arrows.html' | url }}" class="image-panel">
        <img alt=""> {# Consider adding descriptive alt text #}
        <span class="panel-text">The Arrows</span>
    </a>
    <a href="{{ '/' | url }}#your-link-destination-3" class="image-panel">
        <img alt=""> {# Consider adding descriptive alt text #}
        <span class="panel-text">The People</span>
    </a>
    <div class="scroll-hint">
        <span>Scroll Down</span>
        <span class="arrow">↓↓↓</span>
    </div>
</div>
<section id="map-section">
        <h2>Map of the Quanah Parker Trail Arrows</h2>
        <p>Explore the locations of arrow markers across the 52-county Texas Plains Trail Region. Click on a county to see that county's arrows. Click on an arrow to view information about that arrow and follow the links to learn more. For a comprehensive list of all Quanah Parker Trail arrows, please click <a href="{{ '/list/' | url }}">here</a>.</p>
        <div id="overview-map"></div>
        {# If you are still using the SVG map in addition to Leaflet, its HTML (like div#map-display) would go here or nearby. #}
        {# Example: <div id="map-display"> Your SVG map code would be here... </div> #}
</section>
<section id="about-section" class="content-section alt-background">
    <div class="text-content-container"> {# Wrapper to control text width #}
        <h2>About the Quanah Parker Trail</h2>
        <p>
            The Quanah Parker Trail (QPT) is a heritage tourism initiative established in 2010 to map the history of the Native American presence in the Texas Panhandle. Covering 51 counties of the 52-county <a href="https://texastimetravel.com/regions/plains-trail/" target="_blank" rel="noopener">Texas Plains Trail Region</a>, the project does not follow a single linear route; rather, it connects specific landmarks, museums, and historical sites to mark the region historically known as the Comancheria. This area is recognized as the "Last Frontier" in the 48 contiguous United States where the Comanche people roamed freely before the reservation era.
        </p>
        <p>
            The trail is dedicated to the legacy of the Comanche people and Quanah Parker, the last Chief of the Quahadi Comanche. The son of Comanche leader Peta Nocona and Anglo captive Cynthia Ann Parker, Quanah Parker is a central figure in Texas history who transitioned from a warrior defending his territory to a statesman, rancher, and diplomat. The trail highlights authenticated locations associated with his life, ranging from sites of military conflicts, such as the Red River War, to communities he visited peacefully in the early 20th century to hunt or conduct business.
        </p>
        <p>
            The defining features of the trail are the giant steel arrows installed in participating counties. Sculpted by New Home, Texas, artist and cotton farmer Charles A. Smith, these monuments stand approximately 22 feet tall. The concept originated from a prototype Smith created for a crop insurance agency to illustrate Henry Wadsworth Longfellow’s poem The Arrow and the Song. While the prototype was painted red, white, and black, the official markers for the trail are painted in the traditional Comanche colors of red, blue, and gold. The arrows are designed with fletching made of quarter-inch steel rods; this construction allows the sculptures to vibrate in the wind, creating an audible humming or "singing" sound. As of 2026, most arrows are accompanied by a granite marker with relevant text to describe why that arrow was placed at that particular location. These granite markers were carved by the Wallace Monument Company from Clarendon.
        </p>
        <p>
            The Quanah Parker Trail represents a collaborative effort between regional historians, the Comanche Nation, and the Parker family. Descendants of the chief and other members of the Comanche Nation have been integral to the installation process, frequently attending dedication ceremonies to perform traditional cedar smoke blessings. The project aims to foster cultural exchange and education, serving as a permanent physical reminder of the region's indigenous history
        </p>
    </div> {# End text-content-container #}
</section>
<section id="content-section" class="content-section alt-background2">
    {# Add class to this container to enable flexbox via CSS #}
    <div class="text-content-container about-flex-container">
        {# --- Column 1: Image --- #}
        <div class="about-image-wrap">
            {# Uncommented and moved image - Apply url filter #}
            <img src="{{ '/img/smith1.jpg' | url }}" alt="Charles Smith, Arrow Maker" class="about-section-image">
        </div>
        {# --- Column 2: Text Content --- #}
        <div class="about-text-wrap">
            <h2>Remembering Charles Smith (1943-2018)</h2>
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
<section id="about-section" class="content-section alt-background"> {# MODIFIED ID for uniqueness #}
    <div class="text-content-container"> {# Wrapper to control text width #}
        <h2>Quanah Parker Day 2026</h2>
        <p>
            Quanah Parker Day Text1
        </p>
        <p>
            Quanah Parker Day Text2
        </p>
        <p style="text-align: center;">
           <a href="/" class="button navigation-button">More Information</a>
        </p>
    </div>
</section>

{# This is for the SVG map tooltip, if you are keeping the SVG map #}
<div id="map-tooltip"></div>

{# Script for passing Eleventy data to JavaScript (MUST BE BEFORE scripts that use this data like overview-map-init.js) #}
<script>
    // Pass data from Eleventy to JavaScript
    const allCountyFeatures = {{ plainstrailcounties.features | jsonify | safe if plainstrailcounties and plainstrailcounties.features else '[]' }};
    const allArrowData = {{ arrows | jsonify | safe if arrows else '[]' }};
    const baseCountyPageUrl = "{{ '/' | url }}";
    const baseArrowDetailPageUrl = "{{ '/arrows/' | url }}";
    // Pass image URLs for Leaflet marker, processed by Eleventy
    const ELEVENTY_IMG_ARROW_URL = "{{ '/img/arrow-logo.png' | url }}";
    const ELEVENTY_IMG_ARROW_SHADOW_URL = "{{ '/img/arrow-logo-shadow.png' | url }}";
</script>

{# Link to your external JavaScript files #}
{# Ensure paths are correct relative to your output directory structure (e.g., _site/js/) #}
<script src="{{ '/js/rotate-themed-images.js' | url }}"></script>
<script src="{{ '/js/map-interactivity.js' | url }}"></script> {# For the SVG map, if present and you've placed its HTML above #}
<script src="{{ '/js/header-scroll.js' | url }}"></script>
<script src="{{ '/js/overview-map-init.js' | url }}"></script> {# For the Leaflet map #}