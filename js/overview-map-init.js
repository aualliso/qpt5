// js/overview-map-init.js
document.addEventListener('DOMContentLoaded', function () {
    // Check if Leaflet is loaded
    if (typeof L === 'undefined') {
        console.error('Leaflet library is not loaded!');
        return;
    }

    // Check if the map container exists on this page
    const mapContainer = document.getElementById('overview-map');
    if (!mapContainer) {
        // console.log('Map container #overview-map not found on this page. Skipping Leaflet map initialization.');
        return; // Exit if no map container
    }

    // Access data passed from the global scope (from the inline script in HTML)
    // Ensure these are defined before this script runs.
    if (typeof allCountyFeatures === 'undefined' || typeof allArrowData === 'undefined') {
        console.error('Required map data (allCountyFeatures or allArrowData) is not defined globally. Make sure the inline data script runs before overview-map-init.js');
        return;
    }
    // baseCountyPageUrl and baseArrowDetailPageUrl are also expected to be global.
    // Default them if not found, though they should be provided.
    const baseCountyPage = typeof baseCountyPageUrl !== 'undefined' ? baseCountyPageUrl : '/';
    const baseArrowDetailPage = typeof baseArrowDetailPageUrl !== 'undefined' ? baseArrowDetailPageUrl : '/arrows/';
    const eleventyImgArrowUrl = typeof ELEVENTY_IMG_ARROW_URL !== 'undefined' ? ELEVENTY_IMG_ARROW_URL : '/img/arrow-logo.png';
    const eleventyImgArrowShadowUrl = typeof ELEVENTY_IMG_ARROW_SHADOW_URL !== 'undefined' ? ELEVENTY_IMG_ARROW_SHADOW_URL : '/img/arrow-logo-shadow.png';


    const map = L.map(mapContainer, {
        gestureHandling: true
    }).setView([34.8, -100.5], 6.5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Data CC-BY-SA'
    }).addTo(map);

    const countyLayerGroup = L.featureGroup().addTo(map);
    const arrowMarkersLayerGroup = L.featureGroup().addTo(map);

    const arrowIcon = L.icon({
        iconUrl: eleventyImgArrowUrl,
        shadowUrl: eleventyImgArrowShadowUrl,
        iconSize: [30, 50],
        shadowSize: [55, 45],
        iconAnchor: [25, 50],
        shadowAnchor: [50, 45],
        popupAnchor: [0, -45]
    });

    if (allCountyFeatures && allCountyFeatures.length > 0) {
        // console.log(`JS: Processing ${allCountyFeatures.length} county features...`);
        L.geoJSON(allCountyFeatures, {
            style: function (feature) {
                return {
                    color: "#004E89",
                    weight: 1.5,
                    opacity: 0.5,
                    fillColor: "#004E89",
                    fillOpacity: 0.35
                };
            },
            onEachFeature: function (feature, layer) {
                let popupContent = '';
                if (feature.properties) {
                    const countyDisplayName = feature.properties.namelsad || feature.properties.name || "Unnamed County";
                    popupContent += `<div class="qpt-popup-title">${String(countyDisplayName).replace(/[`$]/g, '')}</div>`;
                    popupContent += `<div class="qpt-popup-details">`;
                    if (feature.properties.name) {
                        const countySlug = String(feature.properties.name).toLowerCase().replace(/ /g, "-");
                        const countyPage = `/counties` + `${baseCountyPage}${countySlug}.html`;
                        popupContent += `<p><a href="${countyPage}" class="qpt-popup-link">View County Details</a></p>`;
                    }
                    if (feature.properties.description) {
                        popupContent += `<p>${String(feature.properties.description).replace(/[`$]/g, '')}</p>`;
                    }
                    popupContent += `</div>`;
                }
                layer.bindPopup(popupContent);
                countyLayerGroup.addLayer(layer);
            }
        });
        // console.log("JS: County GeoJSON layer created.");
    } else {
        // console.warn("JS: No county features to display or 'allCountyFeatures' is empty.");
    }

    if (allArrowData && allArrowData.length > 0) {
        // console.log(`JS: Processing ${allArrowData.length} arrow markers...`);
        allArrowData.forEach(function(arrow) {
            const lat = parseFloat(arrow.lat);
            const lon = parseFloat(arrow.lon);

            if (!isNaN(lat) && !isNaN(lon)) {
                const marker = L.marker([lat, lon], { icon: arrowIcon });
                let popupHtml = '';
                try {
                    let title = `Arrow ${arrow.arrowNumber || 'N/A'}: ${String(arrow.arrowName || 'Quanah Parker Trail Arrow').replace(/[`$]/g, '')}`;
                    popupHtml = `<div class="qpt-popup-title">${title}</div>`;
                    popupHtml += `<div class="qpt-popup-details">`;
                    if (arrow.countyName) popupHtml += `<p><strong>County:</strong> ${String(arrow.countyName).replace(/[`$]/g, '')}</p>`;
                    if (arrow.location && String(arrow.location).trim() !== '') popupHtml += `<p><strong>Location:</strong> ${String(arrow.location).replace(/[`$]/g, '')}</p>`;
                    if (arrow.address && String(arrow.address).trim() !== '') popupHtml += `<p><strong>Address:</strong> ${String(arrow.address).replace(/[`$]/g, '')}</p>`;
                    if (arrow.dateInstalled && String(arrow.dateInstalled).toLowerCase() !== 'none' && String(arrow.dateInstalled).trim() !== '') popupHtml += `<p><strong>Installed:</strong> ${String(arrow.dateInstalled).replace(/[`$]/g, '')}</p>`;
                    if (arrow.dateDedicated && String(arrow.dateDedicated).toLowerCase() !== 'none' && String(arrow.dateDedicated).trim() !== '') popupHtml += `<p><strong>Dedicated:</strong> ${String(arrow.dateDedicated).replace(/[`$]/g, '')}</p>`;
                    if (arrow.markerText && String(arrow.markerText).toLowerCase() !== 'none' && String(arrow.markerText).trim() !== '') {
                        const formattedMarkerText = String(arrow.markerText).replace(/[`$]/g, '').replace(/\n/g, '<br>');
                        popupHtml += `<p><strong>Marker Text:</strong><br>${formattedMarkerText}</p>`;
                    }

                    let linksHtml = '';
                    if (arrow.arrowNumber) {
                        const arrowPage = `${baseArrowDetailPage}${arrow.arrowNumber}.html`;
                        linksHtml += `<a href="${arrowPage}" class="qpt-popup-link">More Details</a>`;
                    }
                    if (!isNaN(lat) && !isNaN(lon)) {
                        if(linksHtml !== '') linksHtml += '<br style="margin-bottom: 5px;">';
                        linksHtml += `<a href="https://maps.google.com/?q=${lat},${lon}" target="_blank" rel="noopener noreferrer" class="qpt-popup-link">Navigate</a>`; // Corrected Google Maps link
                    }
                    if(linksHtml !== '') popupHtml += `<p style="margin-top:10px;">${linksHtml}</p>`;

                    popupHtml += `</div>`;
                    marker.bindPopup(popupHtml);
                    arrowMarkersLayerGroup.addLayer(marker);
                } catch (e) {
                    console.error("JS: Error creating popup for arrow:", arrow, "Error:", e);
                    marker.bindPopup(`Error in popup for Arrow ${arrow.arrowNumber || 'N/A'}.`);
                    arrowMarkersLayerGroup.addLayer(marker);
                }
            } else {
                // console.warn("JS: Invalid lat/lon for an arrow marker:", arrow);
            }
        });
        // console.log("JS: Arrow markers processed.");
    } else {
        // console.warn("JS: No arrow data to display or 'allArrowData' is empty.");
    }

    const allFeaturesGroup = L.featureGroup([...countyLayerGroup.getLayers(), ...arrowMarkersLayerGroup.getLayers()]);
    if (allFeaturesGroup.getLayers().length > 0) {
        map.fitBounds(allFeaturesGroup.getBounds().pad(0.05));
        // console.log("JS: Map bounds fitted to all features.");
    } else {
        // console.log("JS: No features to fit map bounds to. Using default view.");
    }

    const overlayMaps = {
        "Counties": countyLayerGroup,
        "Arrow Markers": arrowMarkersLayerGroup
    };
    if (countyLayerGroup.getLayers().length > 0 || arrowMarkersLayerGroup.getLayers().length > 0) {
        L.control.layers(null, overlayMaps, { collapsed: true }).addTo(map); // Set collapsed to true by default
    }

    map.whenReady(function() { map.invalidateSize(); });
    window.addEventListener('load', function() { if (map && typeof map.invalidateSize === 'function') { map.invalidateSize(); }});
});