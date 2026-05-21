// js/footer-scripts.js
document.addEventListener('DOMContentLoaded', function() {
    // Set the current year in the footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Optional: JavaScript for dynamic scrolling banner content ---
    // This is the commented-out logic from your footer.
    // It's kept here, still commented out, for your reference or future use.
    // For the current CSS setup with HTML duplication, this JS is NOT strictly needed.
    /*
    const track = document.querySelector('.scrolling-banner-track');
    if (track && track.children.length > 0) { // Check if there are items
        // const contentWidth = track.offsetWidth / 2; // Assuming content is already duplicated once in HTML
                                                    // Or calculate based on original items if not duplicated in HTML

        // If you weren't duplicating in HTML, you might do it here:
        // const originalContent = track.innerHTML;
        // track.innerHTML += originalContent; // Duplicate content

        // You might also use JS to set the animation duration based on content width
        // For example:
        // const desiredSpeed = 50; // pixels per second
        // const animationDuration = contentWidth / desiredSpeed;
        // track.style.animationDuration = animationDuration + 's';
    }
    */
    // The pure CSS animation with content duplicated in HTML is often sufficient and simpler.
});