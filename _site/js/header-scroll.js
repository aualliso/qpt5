// js/header-scroll.js
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.site-main-header');
    const mapSection = document.getElementById('map-section'); // This is specific to the homepage logic
    const body = document.body;

    // Exit if essential elements for this script are not found
    if (!header) {
        // console.warn("Header element (.site-main-header) not found. Skipping header scroll script.");
        return;
    }

    let triggerPoint = 0;

    function calculateTriggerPoint() {
        if (mapSection) { // mapSection is specific to the homepage logic for calculating triggerPoint
            const headerHeight = header.offsetHeight;
            // const headerTopGap = 15; // The 'top: 15px' value from your CSS
            triggerPoint = mapSection.offsetTop; // Example: Trigger when map section top hits viewport top

            if (triggerPoint < 0) {
                triggerPoint = 0;
            }
            // console.log(`Header trigger point calculated: ${triggerPoint}`);
        } else if (body.classList.contains('page-home')) {
            // If it's the homepage but mapSection isn't found (shouldn't happen if HTML is correct)
            // console.warn("map-section not found on page-home for header scroll trigger calculation.");
            triggerPoint = 50; // Default small trigger if mapSection is missing on homepage
        }
    }

    const handleScroll = () => {
        if (triggerPoint === 0 && body.classList.contains('page-home') && mapSection) {
             calculateTriggerPoint(); // Recalculate if somehow missed or elements loaded late
             if (triggerPoint === 0 && mapSection) return; // Exit if still can't calculate and mapSection should exist
        }

        const scrollY = window.scrollY || window.pageYOffset;

        if (scrollY >= triggerPoint) {
            if (!header.classList.contains('is-visible')) {
                header.classList.add('is-visible');
                body.classList.add('header-visible');
            }
        } else {
            if (header.classList.contains('is-visible')) {
                header.classList.remove('is-visible');
                body.classList.remove('header-visible');
            }
        }
    };

    if (body.classList.contains('page-home')) {
        if (!mapSection) {
            // console.warn("map-section not found on page-home. Header scroll effect might not trigger as intended.");
            // Fallback: make header visible immediately, or hide it and it might not reappear correctly.
            // For now, let's assume if it's home, it will have map-section or a small default trigger.
            calculateTriggerPoint(); // Attempt to set a default triggerPoint if mapSection missing
        }
        window.addEventListener('load', () => {
            calculateTriggerPoint();
            handleScroll(); // Run once after calculation
        });
        window.addEventListener('scroll', handleScroll);

        // Initial hide if near top on page load, before 'load' event fully establishes triggerPoint
        if ((window.scrollY || window.pageYOffset) < (triggerPoint > 0 ? triggerPoint : 50) && header.classList.contains('is-visible')) {
            header.classList.remove('is-visible');
            body.classList.remove('header-visible');
        } else if ((window.scrollY || window.pageYOffset) >= (triggerPoint > 0 ? triggerPoint : 50) && !header.classList.contains('is-visible')) {
            // If loaded scrolled past a potential small trigger point, show it.
            // This ensures 'load' event correctly sets visibility.
            // handleScroll after load will manage this properly.
        }

    } else { // Non-home pages
        header.classList.add('is-visible');
        body.classList.add('header-visible');
    }
});