// js/mobile-menu.js
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.getElementById('main-navigation'); // The <nav> element

    if (menuToggle && mainNav) {
        const closeMobileMenu = () => {
            mainNav.classList.remove('is-open');
            menuToggle.classList.remove('is-active');
            menuToggle.setAttribute('aria-expanded', 'false');
        };

        // const openMobileMenu = () => { // If needed
        //     mainNav.classList.add('is-open');
        //     menuToggle.classList.add('is-active');
        //     menuToggle.setAttribute('aria-expanded', 'true');
        // };

        menuToggle.addEventListener('click', function() {
            const isOpen = mainNav.classList.contains('is-open');
            mainNav.classList.toggle('is-open');
            this.classList.toggle('is-active');
            this.setAttribute('aria-expanded', !isOpen);
        });

        document.addEventListener('click', function(event) {
            if (mainNav.classList.contains('is-open')) {
                const isClickInsideNav = mainNav.contains(event.target);
                const isClickOnToggle = menuToggle.contains(event.target);
                if (!isClickInsideNav && !isClickOnToggle) {
                    closeMobileMenu();
                }
            }
        });

        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && mainNav.classList.contains('is-open')) {
                closeMobileMenu();
            }
        });
    } else {
        // console.warn("Mobile menu toggle button or navigation container not found. Menu functionality disabled.");
    }
});