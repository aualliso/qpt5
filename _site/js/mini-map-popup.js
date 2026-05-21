// js/mini-map-popup.js
document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggle-mini-map-btn');
    const miniMapPopup = document.getElementById('mini-map-popup-container');
    const miniMapTooltip = document.getElementById('mini-map-tooltip');

    // console.log('Mini-Map Elements Found:', { toggleButton, miniMapPopup, miniMapTooltip });

    if (toggleButton && miniMapPopup && miniMapTooltip) {
        toggleButton.addEventListener('click', () => {
            miniMapPopup.classList.toggle('is-visible');
            miniMapTooltip.style.display = 'none';
        });

        document.addEventListener('click', (event) => {
            if (miniMapPopup.classList.contains('is-visible') &&
                !miniMapPopup.contains(event.target) &&
                !toggleButton.contains(event.target)) {
                miniMapPopup.classList.remove('is-visible');
                miniMapTooltip.style.display = 'none';
            }
        }, true);

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && miniMapPopup.classList.contains('is-visible')) {
                miniMapPopup.classList.remove('is-visible');
                miniMapTooltip.style.display = 'none';
            }
        });

        const svgMap = miniMapPopup.querySelector('svg');
        if (svgMap) {
            const paths = svgMap.querySelectorAll('path');
            // console.log(`Found ${paths.length} paths in mini-map SVG`);

            function updateTooltipPosition(event) {
                miniMapTooltip.style.left = (event.pageX + 5) + 'px';
                miniMapTooltip.style.top = (event.pageY + 10) + 'px';
            }

            paths.forEach(path => {
                path.addEventListener('mouseover', (event) => {
                    const countyName = event.target.getAttribute('aria-label');
                    if (countyName) {
                        miniMapTooltip.textContent = countyName;
                        miniMapTooltip.style.display = 'block';
                        updateTooltipPosition(event);
                    }
                });
                path.addEventListener('mouseout', () => {
                    miniMapTooltip.style.display = 'none';
                });
                path.addEventListener('focus', (event) => {
                    const countyName = event.target.getAttribute('aria-label');
                    if (countyName) {
                        miniMapTooltip.textContent = countyName;
                        miniMapTooltip.style.display = 'block';
                    }
                });
                path.addEventListener('blur', () => {
                    miniMapTooltip.style.display = 'none';
                });
                path.addEventListener('mousemove', updateTooltipPosition);

                path.addEventListener('click', (event) => {
                    const countyId = event.target.id;
                    if (countyId && typeof window.siteBasePath !== 'undefined') {
                        const base = window.siteBasePath.endsWith('/') ? window.siteBasePath : window.siteBasePath + '/';
                        const targetPage = countyId.toLowerCase().replace(/ /g, "-") + '.html'; // Basic slugify
                        const countyUrl = base + targetPage;
                        // console.log(`Mini-Map: Constructing URL: ${countyUrl}`);
                        window.location.href = '/counties' + countyUrl;
                    } else if (!countyId) {
                        console.warn("Mini-map path clicked has no ID.");
                    } else {
                        console.warn("window.siteBasePath is not defined. Cannot construct URL for mini-map link.");
                    }
                });
            });
        } else {
            // console.warn("SVG Map element not found inside mini-map popup.");
        }
    } else {
        // Conditionally warn only if elements are expected (e.g., not on homepage if FAB is not there)
        // For simplicity, if any are missing and expected, a general warning might suffice or be removed.
        // if (document.querySelector('.map-fab')) { // Only warn if the FAB button exists (meaning we are on a county page)
        //     if (!toggleButton) console.warn("Mini-map toggle button (#toggle-mini-map-btn) expected but not found.");
        //     if (!miniMapPopup) console.warn("Mini-map popup container (#mini-map-popup-container) expected but not found.");
        //     if (!miniMapTooltip) console.warn("Mini-map tooltip element (#mini-map-tooltip) expected but not found.");
        // }
    }
});