// js/map-interactivity.js
document.addEventListener('DOMContentLoaded', function() {
    const tooltip = document.getElementById('map-tooltip');
    const svgPaths = document.querySelectorAll('#map-display svg .st0'); // Assuming #map-display is the container for this SVG

    // Check if the specific SVG map elements exist on this page
    if (!document.getElementById('map-display') || svgPaths.length === 0) {
        // console.warn("SVG Map elements (#map-display or .st0 paths) not found. Skipping SVG map interactivity setup.");
        return; // Exit if this specific map isn't on the page
    }
    if (!tooltip) {
        console.warn("Map tooltip element not found for SVG map.");
        // Depending on design, you might still want path navigation even if tooltip is missing.
        // For now, we'll assume tooltip is crucial for this script's full functionality.
    }

    function navigateToCounty(pathElement) {
        const countyId = pathElement.id;
        if (countyId) {
            // Generate relative URL for the static site
            const targetUrl = `${countyId.toLowerCase()}.html`;
            console.log('Navigating to:', targetUrl);
            window.location.href = targetUrl;
        } else {
            console.warn("Path is missing an ID, cannot navigate.", pathElement);
        }
    }

    svgPaths.forEach(path => {
        let countyName = path.getAttribute('aria-label') || path.id || 'Unknown Area';
        path.setAttribute('tabindex', '0'); // Keep focusable

        if (tooltip) { // Only add tooltip listeners if tooltip element exists
            // Tooltip Listeners
            path.addEventListener('mouseover', (event) => {
                tooltip.innerHTML = countyName;
                tooltip.style.display = 'block';
            });
            path.addEventListener('mousemove', (event) => {
                tooltip.style.left = (event.pageX + 15) + 'px';
                tooltip.style.top = (event.pageY + 15) + 'px';
            });
            path.addEventListener('mouseout', () => {
                tooltip.style.display = 'none';
            });
        }

        // Click Listener
        path.addEventListener('click', () => {
            navigateToCounty(path);
        });

        // Keyboard Listener
        path.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                navigateToCounty(path);
            }
        });
    });
});