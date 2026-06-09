# Design Spec: hagaiheshes.com Full Redesign
**Date:** 2026-06-09
**Status:** Approved

---

## 1. Feature Summary

Complete visual redesign of the single-page consulting website for Hagai Heshes ("The Crystallizer"). Moving from the current warm-cream/gold editorial aesthetic to a clean, tech-forward Navy + Indigo direction inspired by Stripe. The page remains a single `index.html` with no build step. Target audience: senior B2B decision-makers arriving via referral, who need to confirm — not be convinced.

## 2. Primary User Action

"This is the right person — let's talk." The design must communicate quiet confidence and professional authority fast enough that a referred visitor reaches the contact section without friction.

## 3. Design Direction

**Color strategy: Committed**
Indigo/navy carries 40–60% of major surfaces. Not a small accent — it is the visual identity. The crystal SVG motif is re-colored to indigo facets (was gold).

**Theme scene sentence:**
"A VP of Marketing at a B2B health-tech startup, referred by a VC partner, opens Hagai's link on a laptop in a well-lit meeting room, reading carefully before deciding whether to schedule a call."
→ Forces **light background**. Bright ambient, professional context, trust-building reading mode.

**Named references:**
- `stripe.com` — committed color on white, heavy grotesque type, confident layout
- `vercel.com` — precision spacing, breathing room, restrained but bold
- NOT: Linear/Notion (too editorial-monochromatic-restrained)

**Color tokens (OKLCH):**
```
--navy:        oklch(13% 0.04 265)     /* #0e1235 — deep navy */
--indigo:      oklch(50% 0.2 268)      /* #4550d4 — main accent */
--indigo-mid:  oklch(58% 0.18 268)     /* #6570e8 — lighter indigo */
--indigo-dim:  oklch(66% 0.15 268)     /* #8b96f0 — faint indigo */
--indigo-bg:   oklch(96% 0.02 268)     /* #eef0fe — indigo tint bg */
--bg:          oklch(98.5% 0.005 265)  /* #f9faff — near-white, blue-tinted */
--bg-alt:      oklch(96.5% 0.008 265)  /* #f2f4fd — section alt bg */
--text-body:   oklch(38% 0.04 265)     /* #3a4060 */
--text-dim:    oklch(52% 0.05 265)     /* #6272a4 */
--text-faint:  oklch(62% 0.04 265)     /* #8892b0 */
--line:        oklch(89% 0.015 265)    /* #dde2f5 */
```

## 4. Typography

**Decision: Bricolage Grotesque — single family, full weight range (300–800)**

Both current fonts (Gloock = Playfair Display equivalent, Figtree = Plus Jakarta Sans) are on the impeccable reflex-reject list. Bricolage Grotesque is geometric, has character, is available on Google Fonts, and is not on any ban list.

Hierarchy through weight only:
- Hero title: 800, -0.05em tracking, clamp(64px, 7.5vw, 96px)
- Section titles: 700, -0.04em, clamp(26px, 2.4vw, 34px)
- Body: 400, -0.02em, 15–15.5px
- Labels: 600, 0.12em, uppercase, 10–11px

**No serif fonts.** Single family throughout.

## 5. Absolute Bans in This Build

Per impeccable shared laws:
- No gradient text (`background-clip: text` + gradient background)
- No side-stripe borders (>1px colored border-left/right as accent)
- No glassmorphism used decoratively
- No hero-metric template (big number + small label + gradient)
- No identical card grids (icon + heading + text × N)

Per design direction:
- No gold (#b8975a) anywhere
- No warm cream background
- No dark/black backgrounds except the contact section (navy --navy)

## 6. Layout Strategy

### Nav (sticky, 64px)
- Logo: crystal SVG (indigo facets) + "Hagai Heshes" in 700
- Links: Work · Approach · About (color: --text-dim, hover: --navy)
- CTA: "Get in touch" — solid indigo pill, hover → navy
- Mobile: hamburger + slide-down drawer

### Hero
- Full viewport minus nav height
- Grid: 50/50, text left, photo right
- Text col: badge pill (indigo-bg, indigo border, pulsing dot) → big title → tagline → lede → two CTAs
- Photo col: photo on indigo-bg shape, rounded corners, name tag pill below
- Title structure: "The" (weight 300, text-dim, 0.55em) + "Crystallizer" (weight 800, --indigo, full size)

### Statement strip
- Background: --navy
- Marquee: opacity 0.65 white text, italic em in --indigo-dim
- Indigo dot separators

### Pillars (Crystallization + GTM)
- 50/50 grid, border-right divider
- Indigo top-border reveal on hover (scaleX 0→1, ease-spring)
- Number label, large title 700, body text

### Clients
- bg-alt background
- 4-column logo grid with border-box grid pattern
- Logos: grayscale 0.35 opacity → full color on hover

### How I Work
- 50/50 grid: label col left, body text right
- Large title, 2–3 short paragraphs

### Deliverables
- Label col + 2-column grid (Crystallization · GTM)
- List items with indigo dot markers

### About
- 50/50 grid: title left, bio right
- Photo in About? (Currently text only — keep text-only per existing content)

### Contact
- Background: --navy (dark section)
- Large headline, sub text, email + WhatsApp CTAs
- Crystal SVG (indigo, faint) as decorative bg element

### Footer
- Dark bg (#0a0c24 darker than nav)
- Copyright + nav links

## 7. Animation Plan

All animations follow emil-design-eng principles:
- Never ease-in. Custom cubic-bezier curves throughout.
- UI animations under 300ms. Scroll reveals up to 750ms.
- Only animate `transform` and `opacity`.
- Full `prefers-reduced-motion` support.

### Easing tokens
```css
--ease-spring:  cubic-bezier(0.16, 1, 0.3, 1);
--ease-out:     cubic-bezier(0.23, 1, 0.32, 1);
--ease-in-out:  cubic-bezier(0.77, 0, 0.175, 1);
```

### Hero entrance (page load, once)
Triggered by `body.loaded` class on `window` load event.
- Nav: opacity 0→1, 350ms ease-out, delay 60ms
- Badge: translateX(-16px)→0 + opacity, 500ms ease-spring, delay 80ms
- Title words: split into word spans, each translateY(100%)→0 + opacity, 600ms ease-spring, stagger 60ms starting at delay 140ms
- Tagline words: same treatment, stagger 55ms, starting at ~420ms
- Lede: translateY(24px)→0 + opacity, 650ms ease-spring, delay 560ms
- CTAs: translateY(20px)→0 + opacity, 600ms ease-spring, delay 640ms
- Photo col: opacity 0→1, 1000ms ease-out, delay 450ms

### Scroll reveals (IntersectionObserver, `once: true`)
Classes: `.reveal` (translateY 40px→0), `.reveal-left` (translateX -28px→0), `.stagger` (children cascade 60ms apart)
Duration: 750ms ease-spring. Threshold: 0.08 desktop / 0.05 mobile.

### Micro-interactions
- All buttons: `transform: scale(0.97)` on `:active`, transition 160ms ease-out
- `.btn-primary` hover: translateY(-2px) + box-shadow deepens, 200ms ease-out
- Nav CTA + hero btn-primary: clip-path inset(100%→0%) fill on hover, 280ms ease-out
- Pillar top border: scaleX(0→1) on hover, 320ms ease-spring
- Client logos: opacity + filter on hover, 300ms ease-out
- Crystal (nav): mouse parallax lerp, rAF loop

### Decorative
- Badge dot: opacity pulse 2.5s ease-in-out infinite (not layout, purely decorative)
- Statement strip: marquee 26s linear infinite

## 8. Content Requirements

All copy unchanged from current site. Sections in order:
1. Nav
2. Hero
3. Statement strip (3 statements × 2 for seamless loop)
4. Pillars (Crystallization, GTM)
5. Clients (8 logos: TytoCare, QuantalX, Neurolief, BAND.ai, Western Digital, Seagate, Monday.com, Wix)
6. How I Work
7. Deliverables
8. About
9. Contact (email: hagaiheshes@gmail.com, WhatsApp: +972532851277)
10. Footer
11. Scroll-to-top button (fixed, bottom-right)

Assets unchanged: `logos/hagai.jpeg`, all client logo PNGs/webps.

## 9. Technical Constraints

- Single file: `index.html` — all CSS in `<style>`, all JS in one IIFE `<script>`
- No framework, no build step, no npm
- Google Fonts only (Bricolage Grotesque)
- Must work: Chrome, Safari, Firefox — last 2 major versions
- Accessibility: focus-visible outlines, 44px+ touch targets, aria-* on nav/drawer
- Performance: IntersectionObserver for scroll reveals, passive scroll listeners, `loading="lazy"` on below-fold images
- prefers-reduced-motion: all transforms/opacity snapped to final state, marquee slowed

## 10. Anti-Goals

- NOT a SaaS product page (no metrics, no pricing, no feature grids)
- NOT a portfolio site (no case study links, no project thumbnails)
- NOT dark mode (single light theme only, contact section is the only dark surface)
- NOT over-animated (every animation has a purpose; nothing animates just to animate)
