document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const closeBtn = document.getElementById('close-btn');

    if (mobileMenuBtn && mobileNav && closeBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileNav.classList.add('open');
        });

        closeBtn.addEventListener('click', () => {
            mobileNav.classList.remove('open');
        });
    }
});

