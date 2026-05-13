// Tailwind Configuration
window.tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            "colors": {
                "primary": "#8ed4c4",
                "primary-container": "#0f5f53",
                "on-primary": "#003730",
                "background": "#14130e",
                "surface": "#14130e",
                "surface-variant": "#36352f",
                "on-surface": "#e7e2d9",
                "on-surface-variant": "#bec9c5",
                "secondary": "#abcec6",
                "secondary-container": "#2c4d47",
                "on-secondary": "#153630",
                "outline": "#89938f",
                "outline-variant": "#3f4946"
            },
            "spacing": {
                "margin-mobile": "20px",
                "margin-desktop": "64px",
                "gutter": "24px",
                "stack-sm": "16px",
                "stack-md": "32px",
                "stack-lg": "80px",
                "container-max": "1280px"
            },
            "fontFamily": {
                "display-lg": ["Montserrat"],
                "headline-md": ["Montserrat"],
                "headline-sm": ["Montserrat"],
                "body-lg": ["Montserrat"],
                "body-md": ["Montserrat"],
                "label-md": ["Montserrat"],
                "caption": ["Montserrat"]
            },
            "fontSize": {
                "display-lg": ["64px", { "lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "700" }],
                "display-lg-mobile": ["40px", { "lineHeight": "1.2", "letterSpacing": "-0.01em", "fontWeight": "700" }],
                "headline-md": ["32px", { "lineHeight": "1.3", "fontWeight": "600" }],
                "headline-sm": ["24px", { "lineHeight": "1.4", "fontWeight": "600" }],
                "body-lg": ["18px", { "lineHeight": "1.6", "fontWeight": "400" }],
                "body-md": ["16px", { "lineHeight": "1.6", "fontWeight": "400" }],
                "label-md": ["14px", { "lineHeight": "1", "letterSpacing": "0.1em", "fontWeight": "600" }],
                "caption": ["12px", { "lineHeight": "1.4", "fontWeight": "500" }]
            }
        }
    }
}

// Navigation Logic
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const drawer = document.getElementById('mobile-drawer');

    if (menuToggle && menuClose && drawer) {
        menuToggle.addEventListener('click', () => {
            drawer.classList.remove('translate-x-full');
            document.body.style.overflow = 'hidden';
        });

        menuClose.addEventListener('click', () => {
            drawer.classList.add('translate-x-full');
            document.body.style.overflow = '';
        });
    }

    // Pre-loader Logic
    const loader = document.getElementById('loader');
    const loaderBar = document.querySelector('.loader-bar');
    
    if (loader) {
        // Simulate progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 30;
            if (progress > 100) progress = 100;
            if (loaderBar) loaderBar.style.width = `${progress}%`;
            
            if (progress === 100) {
                clearInterval(interval);
                setTimeout(() => {
                    loader.classList.add('hidden');
                    document.body.style.overflow = '';
                    document.body.classList.add('content-ready');
                }, 500);
            }
        }, 200);

        // Fallback for long loads
        window.addEventListener('load', () => {
            progress = 100;
            if (loaderBar) loaderBar.style.width = '100%';
            setTimeout(() => {
                loader.classList.add('hidden');
                document.body.style.overflow = '';
                document.body.classList.add('content-ready');
            }, 500);
        });
    }

    // Scroll Animations (Simple Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
});
