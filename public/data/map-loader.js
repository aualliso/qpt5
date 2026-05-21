// js/all-arrows-map-loader.js

document.addEventListener('DOMContentLoaded', function () {
    const mapElement = document.getElementById('osm-map-all');

    if (!mapElement) {
        // console.error('Map element (#osm-map-all) not found on this page.');
        return; // Exit if map element doesn't exist
    }

    // Retrieve simple data attributes
    const iconUrl = mapElement.dataset.iconUrl;
    const shadowUrl = mapElement.dataset.shadowUrl;
    const geoJsonDataUrl = mapElement.dataset.geojsonUrl; // Renamed for clarity

    // Retrieve and parse the arrow data JSON string
    let quanahArrowData = [];
    try {
        quanahArrowData = JSON.parse(mapElement.dataset.arrowData);
    } catch (e) {
        console.error("Error parsing arrow data:", e);
        // Fallback or error handling if JSON is malformed
    }

    // Initialize the map
    const map = L.map('osm-map-all', {
        gestureHandling: true
    }).setView([33.8, -100.7], 6); // Centered on the general TPTR area

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, County data from local source'
    }).addTo(map);

    // --- 1. Define your Custom Arrow Icon ---
    const arrowIcon = L.icon({
        iconUrl: iconUrl,         // From data attribute
        shadowUrl: shadowUrl,     // From data attribute
        iconSize:   [30, 50],
        shadowSize: [55, 45],
        iconAnchor: [15, 50],
        shadowAnchor: [39, 45],
        popupAnchor: [0, -45]
    });

    // --- 2. Data for your Quanah Parker Trail Arrow Markers ---
    // quanahArrowData is now populated from the parsed JSON

    // --- 3. List of the 54 County Names for your Target Region ---
    const targetCountyNames = [
        "Armstrong", "Bailey", "Borden", "Briscoe", "Carson", "Castro", "Childress",
        "Cochran", "Collingsworth", "Cottle", "Crosby", "Dallam", "Dawson",
        "Deaf Smith", "Dickens", "Donley", "Floyd", "Foard", "Gaines",
        "Garza", "Gray", "Hale", "Hall", "Hansford", "Hardeman", "Hartley",
        "Hemphill", "Howard", "Hockley", "Hutchinson", "Kent", "King", "Knox",
        "Lamb", "Lipscomb", "Lubbock", "Lynn", "Mitchell", "Moore", "Motley", "Ochiltree",
        "Oldham", "Parmer", "Potter", "Randall", "Roberts", "Scurry", "Sherman",
        "Swisher", "Terry", "Wheeler", "Yoakum"
    ];

    // --- 4. Feature Groups to Manage Layers ---
    const countyLayerGroup = L.featureGroup().addTo(map);
    const arrowMarkersLayerGroup = L.featureGroup().addTo(map);

    // --- 5. Load and Display County GeoJSON Data ---
    fetch(geoJsonDataUrl) // From data attribute
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok for ${geoJsonDataUrl}: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Texas County GeoJSON data loaded successfully.");
            L.geoJSON(data, {
                filter: function(feature) {
                    if (feature.properties && feature.properties.statefp === '48') { // Ensure 'statefp' and 'name' match your GeoJSON properties
                        return targetCountyNames.includes(feature.properties.name);
                    }
                    return false;
                },
                style: function(feature) {
                    return {
                        color: '#004E89',
                        weight: 2,
                        opacity: 0.5,
                        fillColor: '#004E89',
                        fillOpacity: 0.3
                    };
                },
                onEachFeature: function(feature, layer) {
                    let popupContentHtml = '';
                    if (feature.properties && feature.properties.name) {
                        popupContentHtml += `<div class="qpt-popup-title">${feature.properties.name} County</div>`;
                        popupContentHtml += `<div class="qpt-popup-details"><p>${feature.properties.name} County is part of the Texas Plains Trail Region.</p></div>`;
                    }
                    if (popupContentHtml) {
                        layer.bindPopup(popupContentHtml);
                    }
                    countyLayerGroup.addLayer(layer);
                }
            });
            console.log(`Filtered and added ${countyLayerGroup.getLayers().length} counties.`);
            fitMapToAllFeatures();
        })
        .catch(error => {
            console.error('Error loading or processing GeoJSON for counties:', error);
            fitMapToAllFeatures(); // Still try to fit to markers
        });

    // --- 6. Add Arrow Markers to the Map ---
    if (quanahArrowData && quanahArrowData.length > 0) {
        console.log(`Processing ${quanahArrowData.length} arrow markers...`);
        quanahArrowData.forEach(arrow => {
            if (typeof arrow.lat !== 'number' || typeof arrow.lng !== 'number') {
                console.warn(`Skipping arrow "${arrow.arrowName || arrow.arrowNumber || 'Unknown'}" due to invalid lat/lng.`);
                return;
            }
            const marker = L.marker([arrow.lat, arrow.lng], { icon: arrowIcon });
            let popupHtml = `<div class="qpt-popup-title">Arrow ${arrow.arrowNumber || 'N/A'}: ${arrow.arrowName || 'Quanah Parker Trail Arrow'}</div>`;
            popupHtml += `<div class="qpt-popup-details">`;
            if (arrow.arrowCounty && arrow.arrowCountyUrl) { // Check both exist
                 popupHtml += `<p><strong>County:</strong> <a href="${arrow.arrowCountyUrl}" rel="noopener noreferrer">${arrow.arrowCounty}</a></p>`;
            } else if (arrow.arrowCounty) {
                 popupHtml += `<p><strong>County:</strong> ${arrow.arrowCounty}</p>`;
            }
            if (arrow.installed) popupHtml += `<p><strong>Installed:</strong> ${arrow.installed}</p>`;
            if (arrow.dedicated) popupHtml += `<p><strong>Dedicated:</strong> ${arrow.dedicated}</p>`;
            if (arrow.markerText) popupHtml += `<p><strong>Marker Text:</strong> ${arrow.markerText}</p>`;
            // Assuming 'details' was a placeholder, if you have it in your data, you can add it:
            // if (arrow.details) popupHtml += `<p>${arrow.details}</p>`;
            
            if (arrow.arrowPageUrl) {
                popupHtml += `<a href="${arrow.arrowPageUrl}" class="qpt-popup-link" rel="noopener noreferrer">More Details</a>`;
            }
            // Note: The original navigate link had a typo, corrected to use `maps.google.com?q=` for coordinates.
            if (arrow.lat && arrow.lng) { // Ensure lat/lng exist for navigate link
                 popupHtml += `<br><a href="https://maps.google.com/?q=${arrow.lat},${arrow.lng}" class="qpt-popup-link" target="_blank" rel="noopener noreferrer">Navigate</a>`;
            }
            popupHtml += `</div>`;

            marker.bindPopup(popupHtml);
            arrowMarkersLayerGroup.addLayer(marker);
        });
        console.log("Finished processing arrow markers.");
    } else {
        console.warn("quanahArrowData array is empty or not defined after processing. No arrow markers will be added.");
    }

    // --- 7. Function to Fit Map Bounds to All Loaded Features ---
    function fitMapToAllFeatures() {
        const layersToConsider = [];
        if (countyLayerGroup.getLayers().length > 0) {
            layersToConsider.push(countyLayerGroup);
        }
        if (arrowMarkersLayerGroup.getLayers().length > 0) {
            layersToConsider.push(arrowMarkersLayerGroup);
        }

        if (layersToConsider.length > 0) {
            const combinedBounds = L.featureGroup(layersToConsider).getBounds();
            if (combinedBounds.isValid()) {
                console.log("Fitting map to all loaded features.");
                map.fitBounds(combinedBounds.pad(0.05)); // Small padding
            } else {
                console.warn("Could not determine valid combined bounds to fit the map. Using default view.");
                map.setView([33.8, -100.7], 6);
            }
        } else {
            console.warn("No features (counties or markers) loaded to fit map bounds. Using default view.");
            map.setView([33.8, -100.7], 6);
        }
    }

    // Initial fit attempt (mainly for markers if county data is slow or fails)
    if (arrowMarkersLayerGroup.getLayers().length > 0) {
        fitMapToAllFeatures();
    }

    // --- 8. Ensure Map Size is Correct After Everything ---
    window.addEventListener('load', function() {
        if (map) {
            console.log('Window fully loaded, invalidating map size for final adjustments.');
            map.invalidateSize();
            fitMapToAllFeatures(); // Refit after all resources and layout changes
        }
    });
});