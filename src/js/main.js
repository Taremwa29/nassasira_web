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
                "outline-variant": "#3f4946",
                "accent-brown": "#8B5E34"
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

function smoothScrollTo(element, target, duration) {
    const start = element.scrollTop;
    const distance = target - start;
    const startTime = performance.now();

    function easeOutExpo(t) {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    function step(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        element.scrollTop = start + distance * easeOutExpo(progress);
        if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
}

function revealHeroWords() {
    const h1 = document.querySelector('main h1');
    const subtitle = document.querySelector('main p.font-body-lg');
    if (!h1) return;

    const wordInners = [];

    Array.from(h1.childNodes).forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
            const words = node.textContent.split(/(\s+)/);
            const fragment = document.createDocumentFragment();
            words.forEach(word => {
                if (!word.trim()) {
                    fragment.appendChild(document.createTextNode(word));
                } else {
                    const wrapper = document.createElement('span');
                    wrapper.className = 'word-wrapper';
                    const inner = document.createElement('span');
                    inner.className = 'word-inner';
                    inner.textContent = word;
                    wrapper.appendChild(inner);
                    fragment.appendChild(wrapper);
                    wordInners.push(inner);
                }
            });
            node.parentNode.replaceChild(fragment, node);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            const wrapper = document.createElement('span');
            wrapper.className = 'word-wrapper';
            const inner = document.createElement('span');
            inner.className = 'word-inner';
            node.parentNode.insertBefore(wrapper, node);
            wrapper.appendChild(inner);
            inner.appendChild(node);
            wordInners.push(inner);
        }
    });

    const normalWords = wordInners.slice(0, -1);
    const lastWord = wordInners[wordInners.length - 1];

    normalWords.forEach((inner, idx) => {
        setTimeout(() => inner.classList.add('word-revealed'), idx * 60);
    });

    const lastDelay = normalWords.length * 60 + 100;
    setTimeout(() => lastWord.classList.add('word-revealed'), lastDelay);

    if (subtitle) {
        subtitle.classList.add('hero-subtitle');
        setTimeout(() => subtitle.classList.add('subtitle-revealed'), lastDelay + 400);
    }
}

function initCustomCursor() {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const cursor = document.getElementById('custom-cursor');
    const grid = document.getElementById('categories-grid');
    const viewer = document.getElementById('stack-viewer');
    if (!cursor || !grid || !viewer) return;

    let mouseX = -200;
    let mouseY = -200;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
        requestAnimationFrame(animateCursor);
    }
    requestAnimationFrame(animateCursor);

    grid.addEventListener('mouseover', (e) => {
        if (e.target.closest('.category-card')) {
            cursor.classList.add('cursor-hover-card');
        }
    });

    grid.addEventListener('mouseout', (e) => {
        if (e.target.closest('.category-card')) {
            cursor.classList.remove('cursor-hover-card');
        }
    });

    viewer.addEventListener('mouseenter', () => {
        cursor.classList.remove('cursor-hover-card');
        cursor.classList.add('cursor-in-stack');
    });

    viewer.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-in-stack');
    });
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

    initCustomCursor();

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
                    revealHeroWords();
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
                revealHeroWords();
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

    // Smart Navbar Logic
    const nav = document.getElementById('main-nav');
    let lastScrollY = window.scrollY;
    let scrollUpAmount = 0;
    const scrollThreshold = 50;
    const scrollUpThreshold = 40; // Pixels to scroll up before showing nav

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        const delta = currentScrollY - lastScrollY;
        
        // Handle nav-scrolled state (compact look)
        if (currentScrollY > scrollThreshold) {
            nav.classList.add('nav-scrolled');
        } else {
            nav.classList.remove('nav-scrolled');
        }

        // Handle nav-hidden state (hide on scroll down, show on scroll up)
        if (currentScrollY > 150) {
            if (delta > 0) {
                // Scrolling down
                nav.classList.add('nav-hidden');
                scrollUpAmount = 0; // Reset scroll up counter
            } else {
                // Scrolling up
                scrollUpAmount += Math.abs(delta);
                if (scrollUpAmount > scrollUpThreshold) {
                    nav.classList.remove('nav-hidden');
                }
            }
        } else {
            // Near the top, always show
            nav.classList.remove('nav-hidden');
            scrollUpAmount = 0;
        }

        lastScrollY = currentScrollY;
    }, { passive: true });

    // --- 3D Photography Stack & Category Selection (Works Page) ---
    const categoriesGrid = document.getElementById('categories-grid');
    const stackViewer = document.getElementById('stack-viewer');
    
    if (categoriesGrid && stackViewer) {
        const photoCategories = {
            "POTRAITS": [
                "4L7B3929.jpg",
                "4L7B4040.JPG",
                "4L7B4051.JPG",
                "4L7B4054.JPG",
                "4L7B4059.JPG",
                "4L7B4132.JPG",
                "4L7B4435.JPG",
                "4L7B4483.JPG",
                "7TKL1252.JPG",
                "DEBL1348.JPG",
                "IMG_1.jpg",
                "IMG_15.jpg",
                "IMG_1500.jpg",
                "IMG_156.jpg",
                "IMG_157.jpg",
                "IMG_22.jpg",
                "IMG_28.jpg",
                "IMG_3.jpg",
                "IMG_3191.jpg",
                "IMG_51.jpg",
                "IMG_7.jpg",
                "KUHI4575.jpg",
                "KUHI4578.jpg",
                "KUHI9911.JPG",
                "_80A0944.jpg",
                "_80A6703.jpg",
                "_80A9646.jpg"
            ],
            "BLACK & WHITE": [
                "7B2502bw.jpg",
                "7TKL1250.JPG",
                "IMG-77bw.jpg",
                "IMG_110.jpg",
                "IMG_111.jpg",
                "IMG_113.jpg",
                "IMG_152.jpg",
                "IMG_159.jpg",
                "IMG_94.jpg",
                "KUHI4708.jpg",
                "KUHI8625.jpg",
                "_80A0475.jpg"
            ],
            "CULTURE": [
                "IMG-11.jpg",
                "IMG-111.jpg",
                "IMG-135.jpg",
                "IMG-14.jpg",
                "IMG-47.jpg",
                "IMG-49.jpg",
                "IMG-59.jpg",
                "IMG-62.jpg",
                "IMG-71.jpg",
                "IMG-84.jpg",
                "KUHI8721.JPG",
                "af0.jpg",
                "afri(122).jpg",
                "afri(13).jpg",
                "afri(135).jpg",
                "afri(142).jpg",
                "afri(153).jpg",
                "afri(172).jpg",
                "afri(21).jpg",
                "afri(213).jpg",
                "afri(3).jpg",
                "afri(65).jpg",
                "afrii(111).jpg",
                "afrii(16).jpg",
                "afriii(1).jpg",
                "afriii(102).jpg",
                "afriii(121).jpg",
                "afriii(128).jpg",
                "afriii(23).jpg",
                "afriii(28).jpg",
                "afriii(34).jpg",
                "afriii(45).jpg",
                "afriii(6).jpg",
                "afriii(70).jpg",
                "afriii(88).jpg"
            ],
            "NATURE": [
                "080A0915.JPG",
                "080A4601.jpg",
                "7TKL0641.JPG",
                "DEBL1608.JPG",
                "DEBL1609.JPG",
                "DEBL1618.JPG",
                "DEBL1628.JPG",
                "DEBL1631.JPG",
                "DEBL1633.JPG",
                "DEBL2198.JPG",
                "DEBL2211.JPG",
                "KUHI7488.jpg",
                "KUHI7490.jpg",
                "KUHI7496.jpg",
                "af0(4).jpg"
            ],
            "EVENTS": [
                "7shots.jpg",
                "GIL_7994.JPG",
                "GIL_8000.JPG",
                "GIL_8014.JPG",
                "GIL_8029.JPG",
                "GIL_8059.JPG",
                "GIL_8305.JPG",
                "GIL_8308.JPG",
                "GIL_8355.JPG",
                "GIL_8473.JPG",
                "IMG_14.jpg",
                "IMG_32.jpg",
                "KUHI4607.jpg",
                "KUHI4612.jpg",
                "KUHI4613.jpg",
                "KUHI4614.jpg",
                "KUHI4635.jpg",
                "_80A9564.jpg",
                "_80A9685.jpg",
                "_80A9792.jpg",
                "board 1 (1).jpg",
                "board 1 (2).jpg"
            ],
            "BRANDING & PRINTING": [
                "Artboard 1nd0017tk.jpg",
                "Artboard 2nd0017tk.jpg",
                "Artboard 3nd0017tk.jpg",
                "Artboard 5@hard.jpg",
                "IMG_30.jpg",
                "IMG_32.jpg",
                "IMG_37.jpg",
                "IMG_41.jpg"
            ],
            "GRADUATIONS": [
                "IMG_11.jpg",
                "IMG_15.jpg",
                "IMG_16.jpg",
                "IMG_22.jpg",
                "IMG_25.jpg",
                "IMG_3200.jpg",
                "IMG_3201.jpg",
                "IMG_5.jpg",
                "IMG_6.jpg",
                "IMG_82.jpg",
                "IMG_9.jpg",
                "ddd (1).jpg",
                "ddd (4).jpg",
                "hhh (1).jpg",
                "hhh (11).jpg",
                "hhh (16).jpg",
                "hhh (24).jpg",
                "hhh (38).jpg",
                "ttt (4).jpg",
                "ttt (6).jpg",
                "ttt (9).jpg"
            ],
            "GRAPHIC DESIGN": [
                "7SHOTS CONFERENCE PACKAGES.jpg",
                "7SHOTS MIKOLO PACKAGES.jpg",
                "7SHOTS PHOTOSHOOT PACKAGES.jpg",
                "7SHOTS SERVICES.jpg",
                "Artboard 1 copy 5@4x.png",
                "Artboard 1 copy2nd LEG.jpg",
                "Artboard 1@4x-100.jpg",
                "Artboard 1@FFD.jpg",
                "Artboard 1@floral.jpg",
                "Artboard 1bk4g.jpg",
                "Artboard 1clty.jpg",
                "Artboard 1ffff.jpg",
                "Artboard 1mak.jpg",
                "Artboard 1next.jpg",
                "Artboard 1thankyoo.jpg",
                "Artboard 1wwww.jpg",
                "Artboard 2@FFD.jpg",
                "Artboard 2@FFDl.jpg",
                "Artboard 2next.jpg",
                "Artboard 2ttt.jpg",
                "Artboard 3 copyoct.jpg",
                "Artboard 3@4xmd.png",
                "Artboard 3@FFD.jpg",
                "Artboard 3@fasting.jpg",
                "Artboard 3axa.jpg",
                "Artboard 4@FFD.jpg",
                "Artboard 5@FFD.jpg",
                "Artboard 6@FFD.jpg",
                "Artboard 801-may.jpg"
            ],
            "ARCHITECTURE": [
                "148A8139.JPG",
                "7TKL0546.JPG",
                "7TKL0552.JPG",
                "7TKL0557.JPG",
                "DEBL1822.JPG",
                "DEBL1837.JPG",
                "DEBL2209.JPG",
                "IMG_2.jpg",
                "IMG_4.jpg"
            ]
        };
        const categoryDisplayNames = {
            "POTRAITS": "Portraits",
            "BLACK & WHITE": "Black & White",
            "CULTURE": "Culture",
            "NATURE": "Nature",
            "EVENTS": "Events",
            "GRADUATIONS": "Graduations",
            "ARCHITECTURE": "Architecture",
            "GRAPHIC DESIGN": "Graphic Design",
            "BRANDING & PRINTING": "Branding & Printing"
        };

        const categoryOrder = [
            "POTRAITS",
            "BLACK & WHITE",
            "CULTURE",
            "NATURE",
            "EVENTS",
            "GRADUATIONS",
            "ARCHITECTURE",
            "GRAPHIC DESIGN",
            "BRANDING & PRINTING"
        ];

        // Dynamically Render Category Cards
        categoryOrder.forEach(cat => {
            const displayName = categoryDisplayNames[cat] || cat;
            const photos = photoCategories[cat] || [];
            if (photos.length === 0) return;
            
            const coverPhoto = photos[0];
            const coverUrl = encodeURI(`/photos/NP/${cat}/${coverPhoto}`);
            
            const cardHTML = `
                <div class="category-card relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer group glass-card" data-category="${cat}">
                    <img src="${coverUrl}" alt="${displayName}" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-50 group-hover:brightness-[0.4]" loading="lazy">
                    <div class="absolute inset-0 border border-white/10 group-hover:border-primary/30 rounded-2xl transition-colors duration-500"></div>
                    <div class="absolute inset-0 flex flex-col justify-end p-6 md:p-8 bg-gradient-to-t from-background/90 via-background/20 to-transparent">
                        <span class="font-caption text-primary tracking-[0.2em] text-[10px] md:text-xs uppercase mb-2">${photos.length} Photos</span>
                        <h3 class="font-display-lg text-base md:text-lg text-on-surface tracking-wide uppercase">${displayName}</h3>
                    </div>
                </div>
            `;
            categoriesGrid.insertAdjacentHTML('beforeend', cardHTML);
            const renderedCard = categoriesGrid.lastElementChild;
            renderedCard.style.setProperty('--stagger-index', categoryOrder.indexOf(cat));
            renderedCard.classList.add('card-entrance');
        });

        const cardEntranceObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('card-visible');
                    cardEntranceObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.card-entrance').forEach(card => cardEntranceObserver.observe(card));

        // 3D Stack Logic
        const stackContainer = document.getElementById('stack-container');
        const scrollTrack = document.getElementById('stack-scroll-track');
        const categoryLabel = document.getElementById('stack-category-label');
        const counter = document.getElementById('stack-counter');
        const progressBar = document.getElementById('stack-progress-bar');
        const closeBtn = document.getElementById('stack-close-btn');
        const prevBtn = document.getElementById('stack-prev-btn');
        const nextBtn = document.getElementById('stack-next-btn');
        
        let currentCategory = '';
        let categoryPhotos = [];
        const scrollPerCard = 600;
        let activeCardIndex = 0;
        let isTransitioning = false;
        let scrollTimeout = null;

        function initStack(category) {
            currentCategory = category;
            categoryPhotos = photoCategories[category] || [];
            activeCardIndex = 0;
            
            categoryLabel.textContent = categoryDisplayNames[category] || category;
            stackContainer.innerHTML = '';
            
            categoryPhotos.forEach((photo, idx) => {
                const photoUrl = encodeURI(`/photos/NP/${category}/${photo}`);
                const card = document.createElement('div');
                card.className = 'stack-card rounded-2xl overflow-hidden glass-card shadow-2xl flex flex-col border border-white/10 bg-surface-variant/40 p-2 md:p-3 pb-4 md:pb-6';
                card.style.display = 'none';
                
                const imgSrc = idx < 5 ? photoUrl : '';
                
                card.innerHTML = `
                    <div class="relative w-full h-[85%] rounded-xl overflow-hidden bg-black/20 flex-1">
                        <img ${idx < 5 ? `src="${imgSrc}"` : `data-src="${photoUrl}"`} alt="${category} ${idx + 1}" class="w-full h-full object-cover shadow-inner pointer-events-none" ${idx >= 5 ? 'loading="lazy"' : ''}>
                    </div>
                    <div class="mt-3 md:mt-4 text-center">
                        <span class="font-label-md text-on-surface-variant/60 tracking-[0.2em] text-[10px] md:text-xs uppercase">
                            ${idx + 1} / ${categoryPhotos.length}
                        </span>
                    </div>
                `;
                stackContainer.appendChild(card);
            });
            
            const trackHeight = (categoryPhotos.length - 1) * scrollPerCard + window.innerHeight;
            scrollTrack.style.height = `${trackHeight}px`;
            stackViewer.scrollTop = 0;
            
            updateStack(0);
        }

        function updateStack(scrollTop) {
            if (!categoryPhotos.length) return;
            
            const rawProgress = scrollTop / scrollPerCard;
            const activeIdx = Math.floor(rawProgress);
            activeCardIndex = Math.min(categoryPhotos.length - 1, Math.max(0, activeIdx));
            
            const currentCardProgress = rawProgress - activeIdx;
            
            counter.textContent = `${String(activeCardIndex + 1).padStart(2, '0')} / ${String(categoryPhotos.length).padStart(2, '0')}`;
            const totalScrollableHeight = scrollTrack.clientHeight - window.innerHeight;
            const totalProgress = totalScrollableHeight > 0 ? (scrollTop / totalScrollableHeight) * 100 : 0;
            progressBar.style.width = `${Math.min(100, Math.max(0, totalProgress))}%`;
            
            const cards = stackContainer.querySelectorAll('.stack-card');
            
            cards.forEach((card, idx) => {
                const delta = idx - rawProgress;
                
                if (delta < -1 || delta > 4) {
                    card.style.display = 'none';
                    return;
                }
                
                card.style.display = 'flex';
                
                const img = card.querySelector('img');
                if (img && !img.src && img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                
                if (delta < 0) {
                    // Exited card transition
                    const progress = -delta;
                    const translateY = -progress * 120;
                    const translateX = (idx % 2 === 0 ? -1 : 1) * progress * 30;
                    const rotate = -progress * 12 * (idx % 2 === 0 ? 1 : -1);
                    const scale = 1 + progress * 0.1;
                    const opacity = Math.max(0, 1 - progress * 2.5);
                    
                    card.style.transform = `translate3d(${translateX}vw, ${translateY}vh, 0) rotate(${rotate}deg) scale(${scale})`;
                    card.style.opacity = opacity;
                    card.style.pointerEvents = 'none';
                    card.style.zIndex = 100 + idx;
                } else {
                    // Stacked cards positioning
                    const depth = delta;
                    const scale = 1 - depth * 0.04;
                    const translateY = depth * 14;
                    const translateZ = -depth * 35;
                    const rotate = (idx % 2 === 0 ? 1 : -1) * 1.5 * (depth + 1);
                    const opacity = Math.max(0, 1 - depth * 0.22);
                    
                    card.style.transform = `translate3d(0, ${translateY}px, ${translateZ}px) rotate(${rotate}deg) scale(${scale})`;
                    card.style.opacity = opacity;
                    card.style.pointerEvents = idx === activeCardIndex ? 'auto' : 'none';
                    card.style.zIndex = 100 - Math.floor(depth);
                }
            });
        }

        // Scroll listener
        stackViewer.addEventListener('scroll', () => {
            stackContainer.classList.add('scrolling');
            updateStack(stackViewer.scrollTop);
            
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                stackContainer.classList.remove('scrolling');
            }, 100);
        });

        // Category click triggers
        categoriesGrid.addEventListener('click', (e) => {
            const card = e.target.closest('.category-card');
            if (!card) return;
            
            const category = card.dataset.category;
            if (!category) return;
            
            initStack(category);
            
            document.body.style.overflow = 'hidden';
            stackViewer.classList.remove('pointer-events-none', 'opacity-0');
            
            const categoriesView = document.getElementById('categories-view');
            categoriesView.classList.add('opacity-0', 'scale-95');
        });

        // Close triggers
        closeBtn.addEventListener('click', () => {
            document.body.style.overflow = '';
            stackViewer.classList.add('pointer-events-none', 'opacity-0');
            
            const categoriesView = document.getElementById('categories-view');
            categoriesView.classList.remove('opacity-0', 'scale-95');
            
            setTimeout(() => {
                stackContainer.innerHTML = '';
            }, 700);
        });

        // Smooth Scroll Navigation to Card
        function scrollToCard(index) {
            isTransitioning = true;
            stackContainer.classList.remove('scrolling');
            
            stackViewer.scrollTo({
                top: index * scrollPerCard,
                behavior: 'smooth'
            });
            
            setTimeout(() => {
                isTransitioning = false;
            }, 600);
        }

        nextBtn.addEventListener('click', () => {
            if (isTransitioning) return;
            const targetIndex = Math.min(categoryPhotos.length - 1, activeCardIndex + 1);
            if (targetIndex === activeCardIndex) return;
            scrollToCard(targetIndex);
        });

        prevBtn.addEventListener('click', () => {
            if (isTransitioning) return;
            const targetIndex = Math.max(0, activeCardIndex - 1);
            if (targetIndex === activeCardIndex) return;
            scrollToCard(targetIndex);
        });

        // Keyboard navigation
        window.addEventListener('keydown', (e) => {
            if (stackViewer.classList.contains('pointer-events-none')) return;
            
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                nextBtn.click();
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                prevBtn.click();
            } else if (e.key === 'Escape') {
                closeBtn.click();
            }
        });

        // Mobile swipe gestures
        let touchStartY = 0;
        let touchStartX = 0;
        stackContainer.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
            touchStartX = e.touches[0].clientX;
        }, { passive: true });
        
        stackContainer.addEventListener('touchend', (e) => {
            const touchEndY = e.changedTouches[0].clientY;
            const touchEndX = e.changedTouches[0].clientX;
            
            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;
            
            if (Math.abs(deltaX) > 60 && Math.abs(deltaX) > Math.abs(deltaY)) {
                if (deltaX < 0) {
                    nextBtn.click();
                } else {
                    prevBtn.click();
                }
            }
        }, { passive: true });
    }
});
