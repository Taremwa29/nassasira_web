---
name: Cinematic Luxury Portfolio
colors:
  surface: '#001713'
  surface-dim: '#001713'
  surface-bright: '#1e3f39'
  surface-container-lowest: '#00110e'
  surface-container-low: '#00201c'
  surface-container: '#012520'
  surface-container-high: '#0d2f2a'
  surface-container-highest: '#1a3a35'
  on-surface: '#c6eae2'
  on-surface-variant: '#bec9c5'
  inverse-surface: '#c6eae2'
  inverse-on-surface: '#153630'
  outline: '#89938f'
  outline-variant: '#3f4946'
  surface-tint: '#8ed4c4'
  primary: '#8ed4c4'
  on-primary: '#003730'
  primary-container: '#0f5f53'
  on-primary-container: '#90d6c7'
  inverse-primary: '#1f695d'
  secondary: '#d3c4b0'
  on-secondary: '#382f21'
  secondary-container: '#524838'
  on-secondary-container: '#c5b6a2'
  tertiary: '#cac6be'
  on-tertiary: '#32302b'
  tertiary-container: '#56544d'
  on-tertiary-container: '#cdc8c0'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#a9f0e0'
  primary-fixed-dim: '#8ed4c4'
  on-primary-fixed: '#00201b'
  on-primary-fixed-variant: '#005046'
  secondary-fixed: '#f0e0cb'
  secondary-fixed-dim: '#d3c4b0'
  on-secondary-fixed: '#221a0d'
  on-secondary-fixed-variant: '#4f4536'
  tertiary-fixed: '#e7e2d9'
  tertiary-fixed-dim: '#cac6be'
  on-tertiary-fixed: '#1d1c16'
  on-tertiary-fixed-variant: '#494740'
  background: '#001713'
  on-background: '#c6eae2'
  surface-variant: '#1a3a35'
typography:
  display-lg:
    fontFamily: Bodoni Moda
    fontSize: 84px
    fontWeight: '700'
    lineHeight: 92px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Bodoni Moda
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 52px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Bodoni Moda
    fontSize: 42px
    fontWeight: '400'
    lineHeight: 48px
  headline-md-mobile:
    fontFamily: Bodoni Moda
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 38px
  accent-italic:
    fontFamily: EB Garamond
    fontSize: 24px
    fontWeight: '400'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 24px
  margin-desktop: 80px
  margin-mobile: 24px
  section-gap: 160px
---

## Brand & Style

This design system establishes a high-end, futuristic African-modern aesthetic tailored for a visual communication designer. The mood is immersive and cinematic, utilizing deep organic tones paired with hyper-modern interface techniques.

The style is a fusion of **Minimalism** and **iOS-inspired Glassmorphism**. It prioritizes generous whitespace and high-contrast typography to create an editorial feel, while layering translucent surfaces to provide a sense of physical depth. The interface should feel like a premium digital gallery—quiet, confident, and technologically advanced. Visual interest is driven by light reflections, soft background blurs, and a "layered-glass" architecture that suggests a sophisticated, multi-dimensional workspace.

## Colors

The palette is rooted in a "Deep Forest" foundation, providing a cinematic backdrop for content. **Emerald Green** serves as the primary accent for interactive elements and brand moments. **Soft Beige** and **Creamy White** are used for high-contrast typography and subtle structural outlines, evoking a sense of natural ivory and fine linen.

The system operates primarily in a dark mode to maximize the impact of glassmorphism and light reflections. Backgrounds should use the Deep Forest shade, with Emerald Green used sparingly for focal points. Glass surfaces utilize a semi-transparent Deep Forest fill with a very fine Creamy White border to simulate the edge of a glass pane.

## Typography

The typographic hierarchy is built on contrast between classical elegance and modern utility. 

- **Bodoni Moda** is reserved for large, cinematic headings. It should be used with tight letter-spacing in display sizes to emphasize its high-contrast strokes.
- **Inter** provides a clean, neutral balance for body copy and UI labels, ensuring legibility against complex glass backgrounds.
- **EB Garamond** (representing Cormorant Garamond) acts as an emotional "voice" for pull quotes, artistic captions, and personal notes, almost always used in italics to provide a humanistic touch.

Maintain wide margins around text blocks to preserve the premium, editorial feel of the design system.

## Layout & Spacing

This design system employs a **fixed grid** approach for content alignment within a fluid viewport. A 12-column grid is used for desktop, while a 4-column grid is used for mobile. 

The spacing rhythm is aggressive and "breathable." Section gaps are intentionally large (160px+) to force the user to focus on one project or statement at a time, mimicking a physical gallery walk. Elements should often be offset from the grid to create a layered, organic flow, rather than a rigid, blocky structure. Use the 8px base unit for all internal component padding and smaller offsets.

## Elevation & Depth

Depth is achieved through **iOS 26-style Glassmorphism**. Surfaces do not use traditional drop shadows; instead, they rely on:

1.  **Backdrop Blur:** A heavy blur (20px to 40px) applied to the layer behind the surface.
2.  **Translucency:** A 60% opaque fill of Deep Forest (#082B26).
3.  **Inner Glow/Reflection:** A 1px top-left inner border of Creamy White at 20% opacity to simulate light hitting the edge of a lens.
4.  **Parallax:** Background elements (like large organic shapes in Emerald Green) should move at a slower speed than the glass foreground during scroll to enhance the "immersive" feeling.

## Shapes

The shape language is "Soft-Modern." All glass containers and buttons utilize a 0.5rem (8px) base radius, creating a look that is sophisticated but approachable. For large image containers or decorative background elements, use `rounded-xl` (1.5rem) to soften the cinematic photography. Buttons should remain consistently at the base roundedness to maintain a crisp, functional appearance.

## Components

### Buttons
Primary buttons are solid Emerald Green with Creamy White Inter text. Secondary buttons are "Ghost Glass"—transparent with a 1px Soft Beige border and a subtle backdrop blur.

### Glass Cards
Project cards use the glassmorphism stack described in Elevation. Imagery within cards should have a subtle "zoom" effect on hover, while the glass container gains a slight increase in border opacity to simulate a light reflection.

### Input Fields
Fields are minimalist: a single 1px bottom border in Soft Beige. Upon focus, the border glows with a soft Emerald Green outer shadow (0px 0px 8px).

### Navigation
The navigation bar is a floating glass pill at the top of the screen. It should be highly translucent with a 40px backdrop blur, making it almost disappear into the background while keeping the navigation links legible.

### Custom Component: "The Lens"
A unique cursor-following element—a large, soft Emerald Green blur that sits *behind* the glass UI layers, acting as a dynamic "backlight" that reveals the translucency of the containers as the user moves their mouse.