// js/greeting-modal.js
document.addEventListener('DOMContentLoaded', function() {
    const greetingOverlay = document.getElementById('greeting-modal-overlay');
    const greetingContent = document.getElementById('greeting-modal-content');
    const greetingCloseBtn = document.getElementById('greeting-modal-close-btn');
    const body = document.body;

    // --- Placeholder functions: Replace with your actual implementations ---
    function showGreetingModal() {
        if (greetingOverlay && greetingContent) {
            greetingOverlay.classList.add('is-visible');
            greetingContent.classList.add('is-visible');
            body.style.overflow = 'hidden'; // Prevent background scroll
            greetingCloseBtn.focus(); // Set focus to close button
            console.log("Showing greeting modal.");
        }
    }

    function hideGreetingModal() {
        if (greetingOverlay && greetingContent) {
            greetingOverlay.classList.remove('is-visible');
            greetingContent.classList.remove('is-visible');
            body.style.overflow = ''; // Restore background scroll
            console.log("Hiding greeting modal.");
        }
    }
    // --- End Placeholder functions ---

    if (greetingOverlay && greetingContent && greetingCloseBtn) {
        // Triggering the modal (only on homepage and if not previously dismissed)
        if (body.classList.contains('page-home')) {
            // Example: Use sessionStorage to show only once per session
            if (!sessionStorage.getItem('greetingModalDismissed')) {
                showGreetingModal();
            }
        }

        // Closing the modal listeners
        greetingCloseBtn.addEventListener('click', () => {
            hideGreetingModal();
            sessionStorage.setItem('greetingModalDismissed', 'true'); // Remember dismissal
        });

        greetingOverlay.addEventListener('click', (event) => {
            if (event.target === greetingOverlay) { // Click on overlay itself
                hideGreetingModal();
                sessionStorage.setItem('greetingModalDismissed', 'true');
            }
        });

        // Escape key listener for greeting modal
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && greetingOverlay.classList.contains('is-visible')) {
                hideGreetingModal();
                sessionStorage.setItem('greetingModalDismissed', 'true');
            }
        });
    } else {
        if (!body.classList.contains('page-home')) {
            // Don't warn if not on homepage, as modal is only for homepage
        } else {
            console.warn("Greeting modal elements not found. Modal functionality disabled.");
        }
    }
});