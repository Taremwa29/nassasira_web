# Works Page — Cinematic Animation Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the works page with cinematic-quality animations — staggered hero text reveal, 3D card entrance, shimmer on hover, a custom cursor, and a zoom-from-card open/close on the stack viewer.

**Architecture:** All changes are pure CSS + vanilla JS, no new dependencies. Tasks are ordered feature-by-feature (CSS + JS for each feature together), so each task can be committed and verified independently in the browser.

**Tech Stack:** Vanilla JS (ES modules), CSS custom properties + keyframes, Tailwind CDN (existing), `requestAnimationFrame`, `IntersectionObserver`, `clip-path` animation.

---

## File Map

| File | What changes |
|------|-------------|
| `works.html` | Add `id="stack-glow"` to glow div; add `<div id="custom-cursor">` before `</body>` |
| `src/css/style.css` | Remove old `main` entrance block; add hero word styles, card entrance, shimmer, cursor, zoom transition, keyframes |
| `src/js/main.js` | Add `revealHeroWords()`, card stagger observer, `initCustomCursor()`, zoom open/close, `smoothScrollTo()`, letterbox squeeze, glow pulse |

---

## Task 1: Remove old main entrance CSS

**Files:**
- Modify: `src/css/style.css` (lines 116–125 — the `/* Entrance Animations */` block)

The current `main { opacity: 0 }` / `.content-ready main { opacity: 1 }` block fights with the per-word animation we're adding in Task 2. Remove it so `<main>` starts visible and the words do all the work.

- [ ] **Step 1: Delete the entrance animation block from style.css**

In `src/css/style.css`, find and remove these exact lines:

```css
/* Entrance Animations */
main {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 1.2s ease, transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.content-ready main {
    opacity: 1;
    transform: translateY(0);
}
```

After removal, `main` has no entrance transition. The page content is visible immediately after the preloader hides — that's intentional.

- [ ] **Step 2: Verify in browser**

Open `works.html` in a browser (serve from root with `python3 -m http.server 8080` or equivalent). After the preloader clears, the main content should appear instantly with no fade or slide. This is expected — words will animate in Task 2.

- [ ] **Step 3: Commit**

```bash
git add src/css/style.css
git commit -m "refactor: remove old main entrance animation from works page"
```

---

## Task 2: Hero Word Reveal

**Files:**
- Modify: `src/css/style.css` — add word reveal CSS after the loader styles
- Modify: `src/js/main.js` — add `revealHeroWords()`, call it after preloader hides

The `<h1>` on the works page reads:
```
Curating the Essence of <span class="text-primary italic">African Identity</span>
```

Each plain-text word gets wrapped in `.word-wrapper > .word-inner`. The entire `<span class="text-primary italic">` is treated as one unit and lands last. The subtitle `<p>` fades in after.

- [ ] **Step 1: Add word reveal CSS to style.css**

Append after the `/* Pre-loader Styles */` block (after line 113):

```css
/* Hero Word Reveal */
.word-wrapper {
    display: inline-block;
    overflow: hidden;
    vertical-align: bottom;
    line-height: inherit;
}

.word-inner {
    display: inline-block;
    transform: translateY(110%);
    transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}

.word-inner.word-revealed {
    transform: translateY(0);
}

.hero-subtitle {
    opacity: 0;
    transition: opacity 0.8s ease;
}

.hero-subtitle.subtitle-revealed {
    opacity: 1;
}
```

- [ ] **Step 2: Add revealHeroWords() to main.js**

Add this function just before `document.addEventListener('DOMContentLoaded', () => {` (i.e., after the Tailwind config block, before line 55):

```js
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
```

- [ ] **Step 3: Call revealHeroWords() after the preloader hides**

In `main.js`, the preloader hides in two places. Both call `loader.classList.add('hidden')`. In each, add `revealHeroWords()` right after that line.

Find the interval callback (around line 87):
```js
// BEFORE:
loader.classList.add('hidden');
document.body.style.overflow = '';
document.body.classList.add('content-ready');

// AFTER:
loader.classList.add('hidden');
document.body.style.overflow = '';
document.body.classList.add('content-ready');
revealHeroWords();
```

Find the `window.addEventListener('load', ...)` fallback (around line 99):
```js
// BEFORE:
loader.classList.add('hidden');
document.body.style.overflow = '';
document.body.classList.add('content-ready');

// AFTER:
loader.classList.add('hidden');
document.body.style.overflow = '';
document.body.classList.add('content-ready');
revealHeroWords();
```

- [ ] **Step 4: Verify in browser**

Open `works.html`. After the preloader bar reaches 100% and hides:
- The words "Curating", "the", "Essence", "of" should slide up one at a time from below, ~60ms apart
- After a short pause, "African Identity" (teal italic) should slide up last
- ~400ms later, the subtitle paragraph fades in
- No layout shift — words should sit on their normal baseline after animating in

- [ ] **Step 5: Commit**

```bash
git add src/css/style.css src/js/main.js
git commit -m "feat: add cinematic word-by-word hero reveal on works page"
```

---

## Task 3: Category Card 3D Staggered Entrance

**Files:**
- Modify: `src/css/style.css` — add card entrance CSS
- Modify: `src/js/main.js` — set `--stagger-index`, add `card-entrance` class, add `IntersectionObserver`

Cards start tilted back (`rotateX(25deg)`) and below their final position, then snap forward to flat with a per-card delay.

- [ ] **Step 1: Add card entrance CSS to style.css**

Append after the `/* Hero Word Reveal */` block added in Task 2:

```css
/* Category Card 3D Entrance */
#categories-grid {
    perspective: 1000px;
    perspective-origin: 50% 0%;
}

.card-entrance {
    opacity: 0;
    transform: rotateX(25deg) translateY(40px) scale(0.95);
    transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
                transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
    transition-delay: calc(var(--stagger-index, 0) * 80ms);
}

.card-entrance.card-visible {
    opacity: 1;
    transform: none;
}
```

- [ ] **Step 2: Set stagger index and entrance class on each card in main.js**

In `main.js`, inside the `categoryOrder.forEach(cat => { ... })` loop (around line 390), right after the `categoriesGrid.insertAdjacentHTML('beforeend', cardHTML)` call, add:

```js
const renderedCard = categoriesGrid.lastElementChild;
renderedCard.style.setProperty('--stagger-index', categoryOrder.indexOf(cat));
renderedCard.classList.add('card-entrance');
```

- [ ] **Step 3: Add IntersectionObserver for card entrance in main.js**

Add this block right after the `categoryOrder.forEach` loop closes (after all cards are rendered, before the `// 3D Stack Logic` comment):

```js
const cardEntranceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('card-visible');
            cardEntranceObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.card-entrance').forEach(card => cardEntranceObserver.observe(card));
```

- [ ] **Step 4: Verify in browser**

Open `works.html`. After preloader clears:
- Cards should NOT appear all at once — they should stagger in from top-left to bottom-right
- Each card tips forward from a slight tilt to flat (the rotateX effect)
- The grid container gives them a shared perspective so the tilt reads as 3D, not flat
- Scroll-down and scroll-back: cards do NOT re-animate (observer unobserves after first trigger)

- [ ] **Step 5: Commit**

```bash
git add src/css/style.css src/js/main.js
git commit -m "feat: add staggered 3D tilt entrance for category cards on works page"
```

---

## Task 4: Card Shimmer on Hover

**Files:**
- Modify: `src/css/style.css` — add shimmer `::after` pseudo-element to `.category-card`

The shimmer is a diagonal white-gradient that sweeps across the card once per hover entry, resetting instantly on hover leave.

- [ ] **Step 1: Add shimmer CSS to style.css**

Append after the `/* Category Card 3D Entrance */` block:

```css
/* Category Card Shimmer */
.category-card::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
        105deg,
        transparent 30%,
        rgba(255, 255, 255, 0.08) 50%,
        transparent 70%
    );
    transform: translateX(-100%);
    transition: none;
    pointer-events: none;
    z-index: 10;
    border-radius: inherit;
    will-change: transform;
}

.category-card:hover::after {
    transform: translateX(200%);
    transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}
```

The key trick: `transition: none` on the default state means on hover-leave the gradient snaps back to `translateX(-100%)` instantly, so the next hover always starts fresh.

- [ ] **Step 2: Verify in browser**

Hover over a category card:
- A subtle diagonal glint sweeps left-to-right across the card in ~700ms
- Move the mouse off: the glint resets instantly (no reverse sweep)
- Hover again: a fresh sweep starts from the left
- The shimmer should be subtle — barely visible, like light catching a print surface

- [ ] **Step 3: Commit**

```bash
git add src/css/style.css
git commit -m "feat: add one-shot shimmer sweep on category card hover"
```

---

## Task 5: Custom Cursor

**Files:**
- Modify: `works.html` — add `<div id="custom-cursor">` before `</body>`
- Modify: `src/css/style.css` — add cursor styles
- Modify: `src/js/main.js` — add `initCustomCursor()`, call it inside `DOMContentLoaded`

The cursor is a 48px ring that follows the mouse, expands with a "View" label over cards, and shrinks to a dot inside the stack viewer. Hidden on touch devices.

- [ ] **Step 1: Add cursor HTML to works.html**

In `works.html`, add this immediately before the closing `</body>` tag:

```html
<div id="custom-cursor">
    <span class="cursor-label">View</span>
</div>
```

- [ ] **Step 2: Add cursor CSS to style.css**

Append after the `/* Category Card Shimmer */` block:

```css
/* Custom Cursor */
#custom-cursor {
    position: fixed;
    top: 0;
    left: 0;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 1px solid var(--primary);
    background: transparent;
    pointer-events: none;
    z-index: 9998;
    transform: translate(-50%, -50%);
    transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                height 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                background 0.3s ease,
                border-color 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    mix-blend-mode: normal;
}

#custom-cursor .cursor-label {
    font-family: 'Montserrat', sans-serif;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--primary);
    opacity: 0;
    transition: opacity 0.2s ease;
    white-space: nowrap;
}

#custom-cursor.cursor-hover-card {
    width: 80px;
    height: 80px;
    background: rgba(142, 212, 196, 0.1);
}

#custom-cursor.cursor-hover-card .cursor-label {
    opacity: 1;
}

#custom-cursor.cursor-in-stack {
    width: 16px;
    height: 16px;
    background: var(--primary);
    border-color: var(--primary);
}

.category-card {
    cursor: none;
}

#stack-viewer {
    cursor: none;
}

@media (pointer: coarse) {
    #custom-cursor {
        display: none;
    }
    .category-card,
    #stack-viewer {
        cursor: auto;
    }
}
```

- [ ] **Step 3: Add initCustomCursor() to main.js**

Add this function after the `revealHeroWords` function (before the `DOMContentLoaded` listener):

```js
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
```

- [ ] **Step 4: Call initCustomCursor() inside DOMContentLoaded**

Add the call at the top of the `DOMContentLoaded` callback, right after the mobile drawer logic (after line 70 — after the `if (menuToggle && menuClose && drawer)` block closes):

```js
initCustomCursor();
```

- [ ] **Step 5: Verify in browser**

On a desktop (mouse device):
- The OS cursor should be invisible over the works page grid and stack viewer
- A teal ring should follow the mouse across the whole page
- Hovering a category card: ring expands to 80px and "VIEW" appears inside
- Mousing off the card: ring shrinks back to 48px, label disappears
- Opening the stack viewer and moving inside: ring shrinks to a 16px solid teal dot
- On a touch device (or DevTools touch emulation): the cursor div is hidden, OS cursor is normal

- [ ] **Step 6: Commit**

```bash
git add works.html src/css/style.css src/js/main.js
git commit -m "feat: add custom cursor with card hover and stack viewer states"
```

---

## Task 6: Stack Viewer Zoom Open/Close

**Files:**
- Modify: `works.html` — add `id="stack-glow"` to the background glow div inside `#stack-viewer`; remove `transition-all duration-700` from `#stack-viewer` Tailwind classes
- Modify: `src/css/style.css` — add zoom transition, categories blur, card-pulse keyframe
- Modify: `src/js/main.js` — replace open/close logic with clip-path zoom

Instead of a plain opacity fade, the stack viewer expands from the exact position of the clicked card.

- [ ] **Step 1: Update works.html**

**Change 1** — Remove `transition-all duration-700` from `#stack-viewer`'s class list (line 96). The `opacity-0` and `pointer-events-none` classes stay.

```html
<!-- BEFORE -->
<div id="stack-viewer" class="fixed inset-0 z-[150] bg-background/98 backdrop-blur-2xl opacity-0 pointer-events-none transition-all duration-700 overflow-y-scroll">

<!-- AFTER -->
<div id="stack-viewer" class="fixed inset-0 z-[150] bg-background/98 backdrop-blur-2xl opacity-0 pointer-events-none overflow-y-scroll">
```

**Change 2** — Add `id="stack-glow"` to the background glow div inside `#stack-viewer` (line 100):

```html
<!-- BEFORE -->
<div class="absolute w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none"></div>

<!-- AFTER -->
<div id="stack-glow" class="absolute w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none"></div>
```

- [ ] **Step 2: Add zoom transition CSS to style.css**

Append after the `/* Custom Cursor */` block:

```css
/* Stack Viewer Zoom Transition */
#stack-viewer {
    transition: clip-path 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Categories view blur when stack opens */
#categories-view {
    transition: filter 0.6s cubic-bezier(0.16, 1, 0.3, 1),
                opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
                transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

#categories-view.categories-blurred {
    filter: blur(8px);
    opacity: 0;
    transform: scale(0.96);
}

/* Card pulse after stack closes */
@keyframes card-pulse-anim {
    0%   { box-shadow: 0 0 0 0 rgba(142, 212, 196, 0); }
    30%  { box-shadow: 0 0 30px 8px rgba(142, 212, 196, 0.4); }
    100% { box-shadow: 0 0 0 0 rgba(142, 212, 196, 0); }
}

.card-pulse {
    animation: card-pulse-anim 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
```

- [ ] **Step 3: Declare originCard and originRect variables in main.js**

In `main.js`, inside the `if (categoriesGrid && stackViewer)` block, find where `currentCategory`, `categoryPhotos`, `activeCardIndex`, `isTransitioning`, and `scrollTimeout` are declared (around line 421). Add two more variables right after them:

```js
let originCard = null;
let originRect = null;
```

- [ ] **Step 4: Replace open logic in the categoriesGrid click handler**

Find the `categoriesGrid.addEventListener('click', ...)` handler (around line 538). Replace its body with:

```js
categoriesGrid.addEventListener('click', (e) => {
    const card = e.target.closest('.category-card');
    if (!card) return;

    const category = card.dataset.category;
    if (!category) return;

    originCard = card;
    originRect = card.getBoundingClientRect();

    initStack(category);
    document.body.style.overflow = 'hidden';

    const { top, right, bottom, left } = originRect;
    const rClip = window.innerWidth - right;
    const bClip = window.innerHeight - bottom;

    stackViewer.style.transition = 'none';
    stackViewer.style.clipPath = `inset(${top}px ${rClip}px ${bClip}px ${left}px round 16px)`;
    stackViewer.classList.remove('opacity-0', 'pointer-events-none');

    stackViewer.offsetHeight; // force reflow so clip-path starts at card rect

    stackViewer.style.transition = 'clip-path 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    stackViewer.style.clipPath = 'inset(0px 0px 0px 0px round 0px)';

    const categoriesView = document.getElementById('categories-view');
    categoriesView.classList.add('categories-blurred');
});
```

- [ ] **Step 5: Replace close logic**

Create a shared `closeStack()` function. Find the `closeBtn.addEventListener('click', ...)` handler (around line 555). Replace it with:

```js
function closeStack() {
    document.body.style.overflow = '';

    if (originRect) {
        const { top, right, bottom, left } = originRect;
        const rClip = window.innerWidth - right;
        const bClip = window.innerHeight - bottom;
        stackViewer.style.transition = 'clip-path 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        stackViewer.style.clipPath = `inset(${top}px ${rClip}px ${bClip}px ${left}px round 16px)`;
    }

    const categoriesView = document.getElementById('categories-view');
    categoriesView.classList.remove('categories-blurred');

    setTimeout(() => {
        stackViewer.classList.add('opacity-0', 'pointer-events-none');
        stackViewer.style.clipPath = '';
        stackViewer.style.transition = '';
        stackContainer.innerHTML = '';

        if (originCard) {
            originCard.classList.add('card-pulse');
            setTimeout(() => originCard.classList.remove('card-pulse'), 800);
            originCard = null;
        }
        originRect = null;
    }, 600);
}

closeBtn.addEventListener('click', closeStack);
```

- [ ] **Step 6: Update Escape key handler to call closeStack()**

Find the `keydown` listener (around line 597). Update the `Escape` case:

```js
} else if (e.key === 'Escape') {
    closeStack();
}
```

Remove the old `closeBtn.click()` call for Escape — replace it with `closeStack()`.

- [ ] **Step 7: Verify in browser**

Click a category card:
- The stack viewer should expand from the exact position/size of that card outward to fullscreen in ~600ms
- The categories grid should simultaneously blur and fade
- Click the close (×) button: the viewer should compress back to where the card is
- After close, the originating card should emit a brief teal glow pulse
- Press Escape while viewer is open: same close animation

- [ ] **Step 8: Commit**

```bash
git add works.html src/css/style.css src/js/main.js
git commit -m "feat: add zoom-from-card open/close animation on stack viewer"
```

---

## Task 7: Smooth Scroll Navigation (easeOutExpo)

**Files:**
- Modify: `src/js/main.js` — add `smoothScrollTo()`, replace `scrollTo({ behavior: 'smooth' })` in `scrollToCard()`

The browser's built-in smooth scroll is inconsistent. Replace it with a custom `requestAnimationFrame` loop using an exponential ease-out.

- [ ] **Step 1: Add smoothScrollTo() to main.js**

Add this function right before `revealHeroWords` (before line 53):

```js
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
```

- [ ] **Step 2: Verify easeOutExpo correctness inline (in browser console)**

Open `works.html`, open browser DevTools console, paste:

```js
function easeOutExpo(t) { return t === 1 ? 1 : 1 - Math.pow(2, -10 * t); }
console.assert(easeOutExpo(0) === 0, 'should be 0 at t=0');
console.assert(easeOutExpo(1) === 1, 'should be 1 at t=1');
console.assert(easeOutExpo(0.5) > 0.9, 'should be > 0.9 at midpoint (fast start)');
console.log('easeOutExpo checks passed');
```

Expected output: `easeOutExpo checks passed` with no assertion errors.

- [ ] **Step 3: Replace scrollToCard() body in main.js**

Find `scrollToCard` (around line 568). Replace its body:

```js
function scrollToCard(index) {
    isTransitioning = true;
    stackContainer.classList.remove('scrolling');
    smoothScrollTo(stackViewer, index * scrollPerCard, 500);
    setTimeout(() => { isTransitioning = false; }, 500);
}
```

- [ ] **Step 4: Verify in browser**

Open a category in the stack viewer. Click the next (→) and previous (←) arrow buttons:
- The card transition should feel snappy at the start and settle gracefully (not floaty)
- Navigation should complete in ~500ms
- Compare to the old behaviour by temporarily reverting if needed — it should feel noticeably crisper

- [ ] **Step 5: Commit**

```bash
git add src/js/main.js
git commit -m "feat: replace smooth scroll with easeOutExpo RAF animation for stack navigation"
```

---

## Task 8: Letterbox Squeeze + Ambient Glow Pulse

**Files:**
- Modify: `src/css/style.css` — add `@keyframes glow-pulse` and `.glow-active` class
- Modify: `src/js/main.js` — update `updateStack()` exit branch for squeeze; add glow pulse trigger

### Letterbox Squeeze

The exiting card briefly compresses vertically before flying away — a "shutter click" moment.

### Ambient Glow Pulse

The background glow behind the stack pulses every time the active card changes.

- [ ] **Step 1: Add glow-pulse CSS to style.css**

Append after the `/* Stack Viewer Zoom Transition */` block:

```css
/* Ambient Stack Glow Pulse */
@keyframes glow-pulse {
    0%   { opacity: 0.3; transform: scale(1); }
    50%  { opacity: 0.6; transform: scale(1.05); }
    100% { opacity: 0.3; transform: scale(1); }
}

#stack-glow.glow-active {
    animation: glow-pulse 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
```

- [ ] **Step 2: Add previousActiveCardIndex tracking variable in main.js**

Inside the `if (categoriesGrid && stackViewer)` block, find the variable declarations (alongside `activeCardIndex`, `isTransitioning`, etc.). Add:

```js
let previousActiveCardIndex = -1;
```

- [ ] **Step 3: Update the exit branch in updateStack() for letterbox squeeze**

Find the `if (delta < 0)` branch inside `updateStack()` (around line 496). Replace the `translateY`, `translateX`, `rotate`, `scale`, `opacity` block with:

```js
if (delta < 0) {
    const progress = -delta;
    const squeezeY = 1 - Math.min(progress, 0.1) * 0.5;
    const translateY = -progress * 120;
    const translateX = (idx % 2 === 0 ? -1 : 1) * progress * 30;
    const rotate = -progress * 12 * (idx % 2 === 0 ? 1 : -1);
    const scale = 1 + progress * 0.1;
    const opacity = Math.max(0, 1 - progress * 2.5);

    card.style.transform = `translate3d(${translateX}vw, ${translateY}vh, 0) rotate(${rotate}deg) scale(${scale}) scaleY(${squeezeY})`;
    card.style.opacity = opacity;
    card.style.pointerEvents = 'none';
    card.style.zIndex = 100 + idx;
}
```

The only addition is `squeezeY` and the `scaleY(${squeezeY})` appended to the transform. When `progress` is between 0 and 0.1, `squeezeY` drops from 1.0 to 0.95 — a subtle compression before the card launches.

- [ ] **Step 4: Add glow pulse trigger in updateStack()**

At the top of `updateStack()`, after `activeCardIndex` is calculated (after line 469: `activeCardIndex = Math.min(...)`), add:

```js
if (activeCardIndex !== previousActiveCardIndex) {
    previousActiveCardIndex = activeCardIndex;
    const glowEl = document.getElementById('stack-glow');
    if (glowEl) {
        glowEl.classList.remove('glow-active');
        void glowEl.offsetWidth; // force reflow to restart animation
        glowEl.classList.add('glow-active');
    }
}
```

- [ ] **Step 5: Reset previousActiveCardIndex in initStack()**

In `initStack()` (around line 428), after `activeCardIndex = 0;`, add:

```js
previousActiveCardIndex = -1;
```

This ensures the glow pulses on the first card when a new category opens.

- [ ] **Step 6: Verify in browser**

Open a category in the stack viewer:
- The background glow should pulse (subtle scale + brightness) each time a new card becomes active
- Scroll through cards: each card transition should have a very brief vertical compression as the old card exits — watch the top and bottom edges of the exiting card
- The squeeze is subtle — if it looks too dramatic, the `0.5` multiplier on `squeezeY` can be reduced to `0.3`

- [ ] **Step 7: Commit**

```bash
git add src/css/style.css src/js/main.js
git commit -m "feat: add letterbox squeeze on card exit and ambient glow pulse on card change"
```

---

## Final Verification Checklist

After all 8 tasks are committed, do a full end-to-end walkthrough:

- [ ] Load `works.html` — preloader runs, then words animate in one at a time, italic phrase lands last, subtitle fades in
- [ ] Category grid — cards stagger in with 3D tilt on load
- [ ] Hover a card — shimmer sweeps across, custom cursor expands with "VIEW" label
- [ ] Click a card — stack viewer expands from card position, grid blurs behind it
- [ ] Custom cursor inside viewer — shrinks to 16px dot
- [ ] Scroll through cards — smooth, with squeeze on exit and glow pulse per card
- [ ] Click prev/next buttons — snappy easeOutExpo animation
- [ ] Press arrow keys — same navigation behaviour
- [ ] Click close (×) — viewer compresses back to originating card position, card pulses teal
- [ ] Press Escape — same as close
- [ ] No console errors throughout
- [ ] On mobile (DevTools touch emulation) — no custom cursor visible, OS cursor used, everything else functional
