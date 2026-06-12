# CLAUDE.md

## Project
Personal consulting website for **Hagai Heshes ("The Crystallizer")** — positioning & go-to-market consulting. Single-page marketing site.

## Architecture
- **Single file:** everything lives in `index.html` — vanilla HTML, a `<style>` block, and one IIFE `<script>`. No build step, no framework, no dependencies beyond Google Fonts.
- **Assets:** `logos/` holds client logo images (PNG/webp) and `hagai.jpeg` (portrait).

## Conventions
- **CSS:** design tokens as CSS custom properties in `:root` (`--ink`, `--gold`, `--bg`, `--line`, `--maxw: 1080px`, `--nav-h: 64px`, etc.). Always reuse tokens; do not hardcode the palette.
- **Fonts:** `Playfair Display` (serif, headings — via `.t-serif`) and `Plus Jakarta Sans` (body/labels). `.t-label` = uppercase tracked eyebrow style.
- **Layout:** `.wrap` / inner containers use `max-width: var(--maxw)` centered with `padding: 0 32px` (20px on mobile).
- **Sections:** each major block is a `<section>` with an `id` for anchor nav; styles grouped under banner comments.
- **Animation:** scroll reveals via `.reveal` / `.reveal-left` / `.stagger` toggled by `IntersectionObserver`; `body.loaded` drives hero entrance. Respect `prefers-reduced-motion` (a global reduce rule exists).
- **Crystal motif:** an inline faceted-polygon SVG (gold `#b8975a` facets) reused at several sizes (nav mark, hero, contact). Scale via `width`/`height`; never alter polygon geometry.
- **Accessibility:** focus-visible outlines, 44px+ touch targets, `aria-*` on nav/drawer, meaningful `alt`. Preserve these when editing.

## Mobile
- Breakpoints in use: 480, 600, 680, 720, 840, 860px. Mobile nav uses a hamburger + `.mobile-drawer`. Hero crystal column is hidden ≤720px.

## Visual Direction
- **Light site** — keep the light background (`--bg`) as the base tone. No full dark-mode redesign.
- **Tone:** blend of B (Light & Premium — clean, precise, Vercel/Resend feel) and C (Warm & Human — warm neutrals, personal senior-consultant feel). Not cold SaaS.
- Dark sections (statement strip, how I work, contact) are fine as accent sections, but the overall site reads light.

## Working agreement
- This is a spec/docs agent context: produce `spec.md`, do not write application code.
- Preserve color palette, fonts, crystal geometry, existing mobile CSS, and accessibility features unless a change explicitly requires otherwise.

## Deployment — NEVER auto-push
- **The site is live at https://pixelphantom2012.github.io/dad-pro-web/**
- **NEVER run `git commit` or `git push` without explicit user confirmation.** Always show what will be committed and ask first.
- After making file changes, stop and ask: "Ready to push?" — do not proceed automatically.
