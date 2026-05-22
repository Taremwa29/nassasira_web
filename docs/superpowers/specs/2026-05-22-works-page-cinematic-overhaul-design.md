# Works Page — Cinematic Animation Overhaul

**Date:** 2026-05-22  
**Mood:** Cinematic / dramatic  
**Scope:** `works.html`, `src/css/style.css`, `src/js/main.js`  
**Approach:** Option A — Full Cinematic Overhaul  

---

## 1. Hero Text Reveal

**What:** Replace the single `opacity + translateY` entrance on `<main>` with a per-word clip-mask reveal.

**How:**
- On DOM load (after preloader hides), JS splits the `<h1>` text into individual word `<span>` elements, each wrapped in an `overflow: hidden` container
- Each word's inner span starts at `translateY(100%)` and transitions to `translateY(0)` 
- Words stagger at 60ms intervals left-to-right
- The italic "African Identity" span gets an additional 40ms delay so it lands last
- The `<p>` subtitle fades in (`opacity: 0 → 1`) after the last word settles (~500ms after first word)
- CSS: `transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)` on each word span

**Constraints:**
- The existing CSS rule `main { opacity: 0; transform: translateY(20px) }` and `.content-ready main { opacity: 1; ... }` must be **removed** from `style.css` — the word animations become the sole entrance, so main starts visible (`opacity: 1`) immediately after the preloader hides
- Words must re-join correctly — no layout shift after animation completes
- The `<h1>` contains a `<span class="text-primary italic">` — the inner word spans must preserve this nesting and class

---

## 2. Category Grid — Staggered 3D Tilt Entrance

**What:** Cards enter one-by-one with a `rotateX` tilt that flattens to flat, like cards being dealt onto a table.

**How:**
- Each card rendered by JS gets a `--stagger-index` CSS custom property (`card.style.setProperty('--stagger-index', idx)`)
- Cards start with `opacity: 0; transform: rotateY(0deg) rotateX(25deg) translateY(40px) scale(0.95)`
- An `IntersectionObserver` (threshold 0.1) adds class `card-visible` when card enters viewport
- `card-visible` transitions to `opacity: 1; transform: none`
- `animation-delay: calc(var(--stagger-index) * 80ms)` on the transition
- Existing hover behaviour (scale, brightness, glow) is unchanged

**Constraints:**
- Observer must `unobserve` after first trigger — no re-animation on scroll back
- `perspective` must be set on the grid container, not individual cards, to avoid distortion artefacts

---

## 3. Card Hover — Shimmer + Custom Cursor

### Shimmer
- `.category-card::after` — a `linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%)` pseudo-element
- Starts `translateX(-100%)`, transitions to `translateX(200%)` on hover in 700ms
- `transition` only triggers on `:hover` — no loop, one pass per hover entry
- Uses `will-change: transform` for GPU compositing

### Custom Cursor
- A single `<div id="custom-cursor">` appended to `<body>` on page load
- Styled: 48px circle, `border: 1px solid var(--primary)`, `background: transparent`, `pointer-events: none`, `position: fixed`, `z-index: 9998`
- Contains a `<span>View</span>` label, hidden by default (`opacity: 0`)
- Positioned via `transform: translate(x, y)` updated on `mousemove` using `requestAnimationFrame`
- **States:**
  - Default: 48px ring, no label
  - Hovering `.category-card`: scales to 80px, `background: rgba(142,212,196,0.1)`, label `opacity: 1`
  - Inside `#stack-viewer`: shrinks to 16px solid dot, no label
- `cursor: none` applied to `.category-card` and `#stack-viewer`
- Cursor is hidden on touch devices (`@media (pointer: coarse)`)

---

## 4. Stack Viewer Open/Close — Zoom-From-Card

### Open
1. Clicked card's rect captured via `getBoundingClientRect()`
2. Stack viewer `opacity` set to `1`, `pointer-events` enabled immediately
3. Stack viewer starts with `clip-path: inset(top right bottom left round 16px)` matching the card's position
4. Animates to `clip-path: inset(0px 0px 0px 0px round 0px)` in 600ms with `cubic-bezier(0.16, 1, 0.3, 1)`
5. Simultaneously: `#categories-view` transitions to `filter: blur(8px); opacity: 0; transform: scale(0.96)`

### Close
1. Stack viewer `clip-path` animates back to the originating card's rect (stored from open)
2. `#categories-view` unblurs and restores
3. Originating card gets class `card-pulse` for 800ms — a `box-shadow` pulse using `@keyframes` that glows primary colour then fades
4. After clip-path animation completes (600ms), stack container innerHTML is cleared

**Constraints:**
- `getBoundingClientRect()` returns viewport-relative coordinates — no scroll offset adjustment needed since the overlay is `position: fixed`
- Close button and Escape key both trigger the same close function

---

## 5. Stack Card Scroll — Cinematic Physics

### Letterbox Squeeze on Exit
- When `delta < 0` (card is exiting), add a `scaleY(0.95)` to the transform for the first 100ms of the exit (`-0.1 < delta < 0`)
- This creates a brief compression before the card launches away
- Implemented within the existing `updateStack()` function's `delta < 0` branch

### Custom Scroll Animation for Prev/Next Buttons
- Remove `stackViewer.scrollTo({ behavior: 'smooth' })`
- Replace with a `smoothScrollTo(target, duration)` function using `requestAnimationFrame`
- Easing: `easeOutExpo` — `1 - Math.pow(2, -10 * t)` — fast start, graceful settle
- Duration: 500ms

### Ambient Depth Glow
- Background glow element (`.absolute.w-[500px]...`) gets dynamic classes based on `activeCardIndex`
- On each card change: remove class `glow-pulse`, force reflow, add `glow-pulse`
- `@keyframes glow-pulse`: `opacity 0.3 → 0.6 → 0.3` + subtle `scale 1 → 1.05 → 1` over 800ms
- Glow hue stays `--primary` (no colour shifting — keeps palette consistent)

---

## Files Changed

| File | Changes |
|------|---------|
| `works.html` | Add `<div id="custom-cursor">` before `</body>` |
| `src/css/style.css` | Hero word spans, card entrance keyframes, shimmer `::after`, cursor styles, glow pulse keyframe, `card-pulse` keyframe |
| `src/js/main.js` | Hero word split, stagger observer, cursor tracking RAF, zoom open/close, `smoothScrollTo`, letterbox squeeze, glow pulse trigger |

---

## Non-Goals

- No changes to other pages (about, contact, exhibitions, videos, photography)
- No new npm dependencies or build tools
- No changes to the photo data or file paths
- No changes to mobile drawer or navbar behaviour
