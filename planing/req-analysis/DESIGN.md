---
name: Heritage Hub
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e4e2e1'
  on-surface: '#1b1c1c'
  on-surface-variant: '#4d4638'
  inverse-surface: '#303030'
  inverse-on-surface: '#f3f0f0'
  outline: '#7f7666'
  outline-variant: '#d1c5b2'
  surface-tint: '#785a09'
  primary: '#785a09'
  on-primary: '#ffffff'
  primary-container: '#c5a04d'
  on-primary-container: '#4c3700'
  inverse-primary: '#e9c16b'
  secondary: '#74584a'
  on-secondary: '#ffffff'
  secondary-container: '#fed8c5'
  on-secondary-container: '#795d4e'
  tertiary: '#645e49'
  on-tertiary: '#ffffff'
  tertiary-container: '#aca58d'
  on-tertiary-container: '#3f3b28'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdf9d'
  primary-fixed-dim: '#e9c16b'
  on-primary-fixed: '#251a00'
  on-primary-fixed-variant: '#5b4300'
  secondary-fixed: '#ffdbca'
  secondary-fixed-dim: '#e3bfad'
  on-secondary-fixed: '#2a170c'
  on-secondary-fixed-variant: '#5a4134'
  tertiary-fixed: '#ebe2c8'
  tertiary-fixed-dim: '#cec6ad'
  on-tertiary-fixed: '#1f1c0b'
  on-tertiary-fixed-variant: '#4c4733'
  background: '#fcf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e1'
typography:
  headline-lg:
    fontFamily: Libre Caslon Text
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Libre Caslon Text
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Libre Caslon Text
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 30px
  headline-sm:
    fontFamily: Libre Caslon Text
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 26px
  body-lg:
    fontFamily: Work Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Work Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-lg:
    fontFamily: Work Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Work Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  margin-mobile: 1.25rem
  margin-desktop: 2.5rem
  gutter: 1rem
  stack-sm: 0.5rem
  stack-md: 1rem
  stack-lg: 2rem
---

## Brand & Style

The design system is built upon a **Modern-Tactile** aesthetic that bridges the gap between ancient history and contemporary travel technology. It targets curious explorers, history enthusiasts, and luxury travelers seeking an immersive, curated experience of Egypt.

The personality is authoritative yet welcoming—evoking the feeling of a premium guided tour through a desert oasis at sunset. Visually, the design system utilizes a light, warm palette that mimics the natural textures of papyrus, sandstone, and limestone, accented by the regal brilliance of Egyptian gold. It avoids the coldness of standard tech apps, opting instead for a "museum-digital" feel that is sophisticated, academic, and deeply atmospheric.

## Colors

The palette is anchored in the warm spectrum of the Egyptian landscape.

- **Primary (Gold):** A rich, metallic-inspired gold used for primary actions, progression markers, and high-value accents. It should be applied as a subtle linear gradient (Top: #D4AF37 to Bottom: #B8860B) on large interactive surfaces to simulate luster.
- **Secondary (Burnt Umber):** A deep, earthy brown used for headings and navigational elements to provide strong contrast against light backgrounds.
- **Surface (Papyrus):** The foundational background is a soft, textured beige (#F5F0E1). Avoid pure white to reduce eye strain and maintain the historical theme.
- **Body (Charcoal):** A softened black (#2D2D2D) for long-form reading, ensuring high legibility without the harshness of pure black.

## Typography

This design system employs a sophisticated pairing of a classic serif for storytelling and a clean sans-serif for utility.

- **Headlines:** Use **Libre Caslon Text**. This typeface provides a literary, authoritative feel reminiscent of historical manuscripts and museum placards. It should primarily be rendered in the Secondary (Burnt Umber) color.
- **UI & Body:** Use **Work Sans**. Its clean, neutral proportions balance the decorative nature of the serif. Use varied weights (400 for body, 600 for labels) to establish a clear information hierarchy.
- **Styling:** Headings should use tight tracking, while labels and small captions benefit from a slight increase in letter-spacing (+0.05em) to maintain clarity against textured backgrounds.

## Layout & Spacing

The layout follows a **Fixed-Fluid hybrid** model. On mobile, content uses a 4-column system with generous 20px (1.25rem) side margins to create a "framed" feel. On desktop, the content centers within a 12-column grid capped at 1280px.

A strict vertical rhythm is maintained using 8px increments. Components like cards and list items should utilize "Internal Safe Areas" (padding) of 16px to 24px to ensure the content feels airy and premium. Group related elements with 8px gaps, while distinct sections should be separated by 32px or 48px to allow the "Papyrus" background to act as a visual breather.

## Elevation & Depth

Hierarchy is established through **Tonal Layers** and **Ambient Shadows**.

- **Level 0 (Base):** The textured background.
- **Level 1 (Cards):** Surfaces use a solid light cream color (#FCFAED) with a very soft, diffused shadow (0px 4px 20px rgba(78, 54, 41, 0.08)). The shadow color is tinted with the secondary brown rather than grey to maintain warmth.
- **Level 2 (Interactive):** Elements like "Primary Buttons" or "Active Quests" use a thin 1px gold border and a slightly more pronounced shadow to indicate clickability.
- **Overlays:** Modals and bottom sheets use a 20% opacity backdrop tint of the secondary color to dim the background while maintaining the warm atmosphere.

## Shapes

The shape language is defined by **Softened Geometry**. While the subject matter is ancient and structural, the UI is approachable.

- **Standard Radius:** 0.5rem (8px) for cards, input fields, and standard buttons.
- **Large Radius:** 1rem (16px) for main feature containers and "Quest" cards.
- **Decorative Frames:** Certain high-level containers (like the "Active Quest" header) may feature an inner 1px gold border with decorative corner "glyphs" or brackets, nodding to traditional Egyptian framing motifs without being overly ornate.

## Components

- **Buttons:** Primary buttons must feature the Gold gradient with white or dark-gold text. Secondary buttons are outlined in Burnt Umber with no fill.
- **Cards:** All cards should have a 1px border (#E5D9B6) and the Level 1 shadow. Image-heavy cards (like destination cards) should use a subtle dark-to-transparent gradient overlay at the bottom to ensure white text legibility.
- **Progress Bars:** Designed as "Gold Tubes." The unfilled portion is a desaturated tan, while the filled portion is the Primary Gold gradient.
- **Chips/Badges:** Small, rounded-pill shapes used for "Difficulty" or "Tags." Use high-contrast Burnt Umber text on a pale gold background.
- **Navigation:** The bottom navigation bar uses a blur-effect background with the Secondary color for active icons and labels.
- **Interactive Map Nodes:** Circular elements with a Gold "glow" outer shadow to represent the current active location in a quest.