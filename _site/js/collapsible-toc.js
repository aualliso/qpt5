// js/collapsible-toc.js
document.addEventListener('DOMContentLoaded', function() {
    const tocHeaderToggleButton = document.getElementById('toc-toggle-btn');
    const tocContentElement = document.getElementById('page-content-toc'); // The <nav> element

    if (tocHeaderToggleButton && tocContentElement) {
        tocHeaderToggleButton.setAttribute('aria-expanded', 'false'); // Assume hidden by default

        tocHeaderToggleButton.addEventListener('click', () => {
            const isCurrentlyVisible = tocContentElement.classList.contains('is-visible');
            tocContentElement.classList.toggle('is-visible');
            tocHeaderToggleButton.setAttribute('aria-expanded', !isCurrentlyVisible);
        });
    } else {
        // console.warn("Collapsible TOC button or content element not found. TOC functionality disabled.");
    }
});