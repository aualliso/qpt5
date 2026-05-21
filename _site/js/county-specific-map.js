// js/county-specific-map.js
document.addEventListener('DOMContentLoaded', function () {
    if (typeof L === 'undefined') {
        console.error('Leaflet not loaded! Please ensure Leaflet.js is included before county-specific-map.js.');
        return;
    }

    const mapContainer = document.getElementById('county-specific-map');
    if (!mapContainer) {
        // console.log('Map container #county-specific-map not found on this page. Skipping county map initialization.');
        return;
    }

    // Data expected to be defined globally by an inline script before this file is loaded:
    // - COUNTY_MAP_GEOJSON_FEATURE
    // - COUNTY_MAP_ARROWS_DATA
    // - COUNTY_MAP_DISPLAY_NAME
    // - ELEVENTY_IMG_ARROW_URL (assumed global from base layout)
    // - ELEVENTY_IMG_ARROW_SHADOW_URL (assumed global from base layout)

    if (typeof COUNTY_MAP_GEOJSON_FEATURE === 'undefined' ||
        typeof COUNTY_MAP_ARROWS_DATA === 'undefined' ||
        typeof COUNTY_MAP_DISPLAY_NAME === 'undefined') {
        console.error('Required county map data (GEOJSON_FEATURE, ARROWS_DATA, or DISPLAY_NAME) not defined globally.');
        return;
    }
    
    // Ensure icon URLs are available, with fallbacks if the global ones aren't set for some reason
    const iconUrl = typeof ELEVENTY_IMG_ARROW_URL !== 'undefined' ? ELEVENTY_IMG_ARROW_URL : '/img/arrow-logo.png';
    const shadowUrl = typeof ELEVENTY_IMG_ARROW_SHADOW_URL !== 'undefined' ? ELEVENTY_IMG_ARROW_SHADOW_URL : '/img/arrow-logo-shadow.png';


    let mapInitialCenter = [34.5, -101.5]; // Default center for the region
    let mapInitialZoom = 7;               // Default zoom
    let countyPopupName = COUNTY_MAP_DISPLAY_NAME;

    if (COUNTY_MAP_GEOJSON_FEATURE && COUNTY_MAP_GEOJSON_FEATURE.properties) {
        const latStr = COUNTY_MAP_GEOJSON_FEATURE.properties.intptlat;
        const lonStr = COUNTY_MAP_GEOJSON_FEATURE.properties.intptlon;
        if (latStr && lonStr) {
            const parsedLat = parseFloat(latStr);
            const parsedLon = parseFloat(lonStr);
            if (!isNaN(parsedLat) && !isNaN(parsedLon)) {
                mapInitialCenter = [parsedLat, parsedLon];
                mapInitialZoom = 9;
            }
        }
        countyPopupName = COUNTY_MAP_GEOJSON_FEATURE.properties.namelsad || COUNTY_MAP_GEOJSON_FEATURE.properties.name || COUNTY_MAP_DISPLAY_NAME;
    }

    const map = L.map(mapContainer, {
        gestureHandling: true
    }).setView(mapInitialCenter, mapInitialZoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    let countyLayer;
    if (COUNTY_MAP_GEOJSON_FEATURE && COUNTY_MAP_GEOJSON_FEATURE.geometry) {
        countyLayer = L.geoJSON(COUNTY_MAP_GEOJSON_FEATURE, {
            style: function (feature) {
                return {
                    color: "#004E89",
                    weight: 3,
                    opacity: 0.8,
                    fillColor: "#004E89",
                    fillOpacity: 0.2
                };
            },
            onEachFeature: function (feature, layer) {
                let popupContent = `<div class="qpt-popup-title">${countyPopupName}</div>`;
                if (feature.properties && feature.properties.description) {
                    popupContent += `<div class="qpt-popup-details"><p>${feature.properties.description}</p></div>`;
                }
                layer.bindPopup(popupContent);
            }
        }).addTo(map);

        if (countyLayer.getLayers().length > 0) {
            map.fitBounds(countyLayer.getBounds().pad(0.1));
        }
    } else if (COUNTY_MAP_ARROWS_DATA && COUNTY_MAP_ARROWS_DATA.length > 0) {
        // If no county polygon, try to fit bounds to markers if they exist
        const markerCoords = COUNTY_MAP_ARROWS_DATA.map(arr => [parseFloat(arr.lat), parseFloat(arr.lon)]).filter(coords => !isNaN(coords[0]) && !isNaN(coords[1]));
        if (markerCoords.length > 0) {
            const markerBounds = L.latLngBounds(markerCoords);
            if (markerBounds.isValid()) map.fitBounds(markerBounds.pad(0.2));
        }
    }

    const arrowIcon = L.icon({
        iconUrl: iconUrl,
        shadowUrl: shadowUrl,
        iconSize: [30, 50], shadowSize: [55, 45],
        iconAnchor: [25, 50], shadowAnchor: [50, 45],
        popupAnchor: [0, -45]
    });

    if (COUNTY_MAP_ARROWS_DATA && COUNTY_MAP_ARROWS_DATA.length > 0) {
        COUNTY_MAP_ARROWS_DATA.forEach(function(arrow) {
            const lat = parseFloat(arrow.lat);
            const lon = parseFloat(arrow.lon);

            if (!isNaN(lat) && !isNaN(lon)) {
                const marker = L.marker([lat, lon], { icon: arrowIcon }).addTo(map);
                let popupHtml = '';
                try {
                    let title = `Arrow ${arrow.arrowNumber || 'N/A'}: ${String(arrow.name || 'Quanah Parker Trail Arrow').replace(/[`$]/g, '')}`;
                    popupHtml = `<div class="qpt-popup-title">${title}</div>`;
                    popupHtml += `<div class="qpt-popup-details">`;

                    if (arrow.countyName && String(arrow.countyName).trim() !== '') {
                        popupHtml += `<p><strong>County:</strong> ${String(arrow.countyName).replace(/[`$]/g, '')}</p>`;
                    }
                    if (arrow.location && String(arrow.location).trim() !== '') {
                        popupHtml += `<p><strong>Location:</strong> ${String(arrow.location).replace(/[`$]/g, '')}</p>`;
                    }
                    if (arrow.address && String(arrow.address).trim() !== '') {
                        popupHtml += `<p><strong>Address:</strong> ${String(arrow.address).replace(/[`$]/g, '')}</p>`;
                    }
                    if (arrow.dateInstalled && String(arrow.dateInstalled).toLowerCase() !== 'none' && String(arrow.dateInstalled).trim() !== '') {
                        popupHtml += `<p><strong>Installed:</strong> ${String(arrow.dateInstalled).replace(/[`$]/g, '')}</p>`;
                    }
                    if (arrow.dateDedicated && String(arrow.dateDedicated).toLowerCase() !== 'none' && String(arrow.dateDedicated).trim() !== '') {
                        popupHtml += `<p><strong>Dedicated:</strong> ${String(arrow.dateDedicated).replace(/[`$]/g, '')}</p>`;
                    }
                    if (arrow.markerText && String(arrow.markerText).toLowerCase() !== 'none' && String(arrow.markerText).trim() !== '') {
                        const formattedMarkerText = String(arrow.markerText).replace(/[`$]/g, '').replace(/\n/g, '<br>');
                        popupHtml += `<p><strong>Marker Text:</strong><br>${formattedMarkerText}</p>`;
                    }
                    
                    let linksHtml = '';
                    if (arrow.pageUrl) { // pageUrl is already processed by | url in Nunjucks
                        linksHtml += `<a href="${arrow.pageUrl}" class="qpt-popup-link osmbutton osmnavigation-button">More Details</a>`;
                    }

                    if (!isNaN(lat) && !isNaN(lon)) {
                        if (linksHtml !== '') linksHtml += '<br style="margin-bottom: 5px;">';
                        linksHtml += `<a href="https://www.google.com/maps?q=${lat},${lon}" target="_blank" rel="noopener noreferrer" class="qpt-popup-link osmbutton osmnavigation-button">Navigate</a>`;
                    }
                    if(linksHtml !== '') popupHtml += `<p style="margin-top:10px;">${linksHtml}</p>`;
                    
                    popupHtml += `</div>`;
                    marker.bindPopup(popupHtml);

                } catch (e) {
                    console.error("JS: Error creating popup for arrow:", arrow, "Error:", e);
                    marker.bindPopup(`Error in popup for Arrow ${arrow.arrowNumber || 'N/A'}.`);
                }
            } else {
                // console.warn("JS: Invalid lat/lon for arrow marker:", arrow);
            }
        });
    } else {
        // console.log("JS: No arrow markers to display for this county.");
    }

    map.whenReady(function() {
        map.invalidateSize();
    });
    window.addEventListener('load', function() {
        if (map && typeof map.invalidateSize === 'function') {
            map.invalidateSize();
        }
    });
});