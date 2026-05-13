---
name: Emerald Cinematic Portfolio
colors:
  surface: '#14130e'
  surface-dim: '#14130e'
  surface-bright: '#3b3933'
  surface-container-lowest: '#0f0e09'
  surface-container-low: '#1d1c16'
  surface-container: '#21201a'
  surface-container-high: '#2b2a24'
  surface-container-highest: '#36352f'
  on-surface: '#e7e2d9'
  on-surface-variant: '#bec9c5'
  inverse-surface: '#e7e2d9'
  inverse-on-surface: '#32302b'
  outline: '#89938f'
  outline-variant: '#3f4946'
  surface-tint: '#8ed4c4'
  primary: '#8ed4c4'
  on-primary: '#003730'
  primary-container: '#0f5f53'
  on-primary-container: '#90d6c7'
  inverse-primary: '#1f695d'
  secondary: '#abcec6'
  on-secondary: '#153630'
  secondary-container: '#2c4d47'
  on-secondary-container: '#9abcb5'
  tertiary: '#d3c4b0'
  on-tertiary: '#382f21'
  tertiary-container: '#5d5342'
  on-tertiary-container: '#d6c7b2'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#a9f0e0'
  primary-fixed-dim: '#8ed4c4'
  on-primary-fixed: '#00201b'
  on-primary-fixed-variant: '#005046'
  secondary-fixed: '#c6eae2'
  secondary-fixed-dim: '#abcec6'
  on-secondary-fixed: '#00201c'
  on-secondary-fixed-variant: '#2c4d47'
  tertiary-fixed: '#f0e0cb'
  tertiary-fixed-dim: '#d3c4b0'
  on-tertiary-fixed: '#221a0d'
  on-tertiary-fixed-variant: '#4f4536'
  background: '#14130e'
  on-background: '#e7e2d9'
  surface-variant: '#36352f'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Montserrat
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Montserrat
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Montserrat
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Montserrat
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.1em
  caption:
    fontFamily: Montserrat
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.4'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  stack-sm: 16px
  stack-md: 32px
  stack-lg: 80px
---

## Brand & Style

This design system centers on a "Cinematic Luxury" narrative, specifically tailored for a high-end personal portfolio. The aesthetic is defined by deep, immersive environments that evoke a sense of mystery and prestige. By utilizing a dark, tonal green foundation, the interface recedes to let the content—Nasasiira Patrick's work—take center stage with a spotlight effect.

The style is a refined execution of **Glassmorphism**. It moves away from flat layouts toward a layered, dimensional experience. Elements appear as panes of polished glass suspended in a thick, verdant atmosphere. The visual language should feel expensive, intentional, and modern, targeting a high-tier clientele in creative and executive spaces.

## Colors

The palette is anchored by the "Forest Depth" duo: **#082B26** serves as the primary canvas (background), while **#0F5F53** acts as the primary accent and surface tint. This deep green foundation creates a more sophisticated alternative to standard black or grey dark modes.

To provide warmth and legibility, **Soft Beige (#DCCDB8)** is used for secondary text and decorative accents, while **Creamy White (#F6F1E8)** is reserved for high-contrast headings and primary UI labels. These "off-white" tones prevent the harshness often found in pure white-on-black designs, maintaining the luxury feel. All glass surfaces should utilize a desaturated version of the primary green with low opacity to maintain color harmony.

## Typography

This design system exclusively employs **Montserrat** to achieve a geometric, architectural feel. 

- **Headlines:** Should be bold and impactful. Display sizes use tight letter spacing to create a "poster" effect.
- **Body:** Use the 400 weight for optimal readability against dark backgrounds. 
- **Labels:** Small labels and UI identifiers utilize all-caps and increased letter spacing to inject a sense of premium "labeling" akin to high-end fragrance or fashion branding.

Hierarchy is established through weight and color (Creamy White for headings, Soft Beige for body).

## Layout & Spacing

The layout follows a **Fixed Grid** model on desktop, centered to create a focused, cinematic viewing experience. 

- **Desktop (1200px+):** 12-column grid with generous 80px-120px vertical section spacing to allow the design to "breathe."
- **Mobile:** A single-column flow with 20px side margins. 

Spacing follows a strict 8px base unit. Use larger vertical gaps (`stack-lg`) between distinct portfolio projects to emphasize a gallery-like pacing. Elements within glass cards should use consistent internal padding (typically 32px) to maintain the "object" feel of the UI.

## Elevation & Depth

Depth is not achieved through traditional shadows, but through **Backdrop Blurs** and **Luminance**.

1.  **Base Layer:** The Forest Green (#082B26) background, potentially with a subtle noise grain or very soft radial gradient of Emerald (#0F5F53) in the corners.
2.  **Surface Layer (Glass):** Semi-transparent containers with a `backdrop-filter: blur(20px)`. 
3.  **Edge Definition:** Each glass surface must have a 1px solid border using the "border_glass" token (Creamy White at 15% opacity). This mimics the light catching the edge of a thick glass pane.
4.  **Interaction:** Upon hover, the backdrop blur should increase or the surface opacity should subtly lighten, creating a "lifted" effect.

## Shapes

The design system utilizes **ROUND_EIGHT** (0.5rem / 8px) as its base corner radius. 

- **Base Radius (8px):** Applied to standard buttons, input fields, and small chips.
- **Large Radius (16px):** Applied to portfolio cards and primary glass containers.
- **Full Radius:** Reserved for circular buttons (e.g., "scroll to top") or purely decorative pill-shaped tags.

The consistent use of the 8px-derived system ensures the geometric nature of Montserrat is complemented by a structured, modern frame.

## Components

### Buttons
- **Primary:** Solid Emerald (#0F5F53) background with Creamy White text. No border. Soft glow on hover.
- **Secondary (Glass):** Transparent background with a 1px Soft Beige border. Backdrop blur applied.

### Portfolio Cards
Large-scale glass containers. The image should be tucked inside with a slightly smaller border radius than the card itself, creating a nested "frame" effect. Use a subtle gradient overlay on the image to ensure beige text labels are legible.

### Inputs & Form Elements
Transparent backgrounds with a bottom-only border or a very subtle 4-sided glass border. Use Soft Beige for placeholders. Focused state should glow subtly with the Primary Emerald color.

### Navigation
A "Floating Dock" style navigation bar at the top or bottom of the screen. This should be a glassmorphic pill with high backdrop blur, making it appear as if it is floating over the content as the user scrolls.

### Tags / Chips
Small, pill-shaped elements with a low-opacity Emerald fill and Soft Beige text. Used for "Project Type" or "Skills."