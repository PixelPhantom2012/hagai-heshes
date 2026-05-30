# Redesign Spec: hagaiheshes.com
**Version:** 1.0 — 2026-05-30  
**Scope:** Visual redesign of `index.html` — CSS and minor HTML structural tweaks only. No content rewrites, no new dependencies, no framework changes.

---

## 1. Diagnosis

### 1.1 Hero — why it reads as empty

The hero is a 50/50 grid: text on the left, crystal on the right. On a full-viewport desktop screen (~1080px wide and ~700px+ tall), both columns have enormous height to fill. Neither column provides enough visual mass to feel intentional.

**Left column problems:**
- `font-size: clamp(52px, 6vw, 88px)` renders at ~65px on a 1080px-wide viewport. At that size, the two-word title ("The / Crystallizer") occupies roughly 160px of vertical space. The remaining ~540px of column height is filled with a tagline, a body paragraph, and two small buttons — none of which have visual weight. The result is a top-heavy column with a long void below the buttons.
- The background is flat `#fafaf9` — no texture, no zoning, no signal that this is a premium surface. The grain overlay (`hero::after`) has opacity `0.035` — effectively invisible.
- The thin gold ambient glow (`hero::before`) is at 7% opacity and positioned top-right. It does not read visually.

**Right column problems:**
- The crystal SVG renders at `width="300" height="394"` inside a column that is ~540px wide and ~700px tall. The SVG occupies roughly 55% of the column width and 56% of the column height — it floats in the remaining space.
- The `crystal-glow` element is `380px x 380px` at max 20% opacity. On a mid-range display, it is barely visible — it does not create a real halo effect.
- There is no background differentiation between the left and right columns. The `border-left: 1px solid var(--line)` on `.hero-crystal-col` is the only separator. The two halves read as one undifferentiated field.
- There is no typographic element, pattern, or secondary visual anchoring the crystal. It floats in an off-white void.

### 1.2 Color strategy — too timid for a brand surface

The current palette is "Restrained" — the gold (`#b8975a`) appears only as:
- Italic hero title word
- `pillar-rule` gold bars (32px wide)
- `deliv-group-title` italic text
- Crystal facets and glow

Gold coverage is well under 5% of any viewport. On a marketing surface aimed at senior decision-makers, a restrained palette reads as hesitant. The authority the brand claims in its copy ("The Crystallizer", "Senior clients") is not expressed in the visual register.

### 1.3 Overall visual hierarchy

The page lacks tonal rhythm as you scroll. The section sequence is:
- off-white (hero) → slightly warm off-white (pillars) → off-white (clients) → dark (how) → off-white (deliverables) → warm off-white (about) → dark (contact) → dark (footer)

The transitions between sections are abrupt at times — off-white to off-white with only a 1px line separator — and the two light sections between the dark "How I Work" and dark "Contact" feel flat. The gold never appears at full structural weight; it is always a hint.

---

## 2. Design Direction: "Distilled Authority"

The site should read like a well-produced piece of printed advisory material — think an independent board advisor's credentials sheet, not a SaaS landing page. The aesthetic register is: editorial, precise, unhurried, confident.

Key principles:
- **Negative space is used intentionally**, not by accident. If a column is sparsely populated, that sparseness is made to feel deliberate by giving the element that IS there real visual weight.
- **Gold operates structurally**, not decoratively. It marks entry points (above headings), carries emphasis (key words, rules), and gives the crystal weight — not just as color sprinkled in.
- **The crystal is a brand statement**, not a decoration. It should feel like the center of gravity in the hero, not an illustration that was added to fill space.
- **Typography earns its size.** The hero headline should be large enough that its presence alone signals authority.

---

## 3. Hero Redesign (Priority 1)

### 3.1 Hero title — size and rhythm

**Current:** `font-size: clamp(52px, 6vw, 88px)` / `line-height: 1.05` / `letter-spacing: -0.02em`

**Change to:**
```css
.hero-title {
  font-size: clamp(64px, 7.5vw, 104px);
  line-height: 0.98;
  letter-spacing: -0.03em;
}
```

The tighter leading (0.98 vs 1.05) gives the two-line title more visual mass — the lines compress into a single block rather than two separate lines with air between them. At 104px, "The" and "Crystallizer" together occupy approximately 220–240px of vertical height, which creates a genuine focal point.

**The `em` (italic gold word):** Currently the same size as the surrounding text. Add a size multiplier so "Crystallizer" reads at a slightly larger optical scale and commands the line:
```css
.hero-title em {
  font-style: italic;
  color: var(--gold);
  font-size: 1.06em;
  display: block;
}
```

The `display: block` forces it to its own line (the `<br>` in the HTML already does this, but the sizing is now intentional and consistent regardless of HTML structure).

### 3.2 Gold entry rule above the title

Add a gold rule above the hero title — the same pattern as `.pillar-rule` but slightly wider, placed as a brand entry signal. In the HTML, add a `<span>` immediately before the `<h1>`:

```html
<span class="hero-eyebrow-rule" aria-hidden="true"></span>
<h1 class="hero-title t-serif">…</h1>
```

```css
.hero-eyebrow-rule {
  display: block;
  width: 48px;
  height: 2px;
  background: var(--gold);
  margin-bottom: 28px;
}
```

This creates a visual anchor that says "the headline starts here" — the same treatment that already works well in the pillars section and about section.

### 3.3 Hero tagline — scale down relative to the larger title

With the title now substantially larger, the tagline should be positioned as a descriptor, not a competing statement:

**Current:** `clamp(16px, 1.6vw, 18px)` at `--ink-80`

**Change to:**
```css
.hero-tagline {
  font-size: clamp(14px, 1.3vw, 16px);
  font-weight: 400;
  line-height: 1.65;
  color: var(--ink-60);
  margin-bottom: 12px;
  max-width: 38ch;
}
```

Dropping from `--ink-80` to `--ink-60` further subordinates the tagline visually — it becomes a caption to the title rather than a second headline.

### 3.4 Right column — crystal at real scale

**Current crystal SVG:** `width="300" height="394"` — rendered inside a ~540px column.

**Change to:** `width="380" height="499"` (same viewBox `0 0 260 340`, same polygon geometry — only the outer `width`/`height` attributes scale up proportionally):

```html
<svg width="380" height="499" viewBox="0 0 260 340" …>
```

This fills approximately 70% of the column width. Do not change any polygon `points` coordinates.

**Crystal glow — increase radius and opacity:**

**Current:** `width: 380px; height: 380px;` single-stop radial at `20%`

**Change to:**
```css
.crystal-glow {
  width: 480px;
  height: 480px;
  background: radial-gradient(circle, rgba(184,151,90,0.28) 0%, rgba(184,151,90,0.08) 40%, transparent 70%);
}
```

The two-stop gradient (28% inner, 8% mid, 0% outer) creates a believable halo that feathers naturally rather than reading as a CSS circle.

### 3.5 Typographic watermark behind the crystal

Add a large, near-invisible text element behind the crystal that reads "CRYSTALLIZER". This creates visual density in the right column without adding any actual content.

In the HTML, inside `.crystal-container`, add before `.crystal-glow`:
```html
<span class="crystal-watermark" aria-hidden="true">CRYSTALLIZER</span>
```

```css
.crystal-watermark {
  position: absolute;
  font-family: 'Gloock', Georgia, serif;
  font-size: clamp(64px, 8vw, 96px);
  font-weight: 500;
  letter-spacing: 0.18em;
  color: var(--gold);
  opacity: 0.055;
  white-space: nowrap;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  transform: rotate(180deg);
  pointer-events: none;
  user-select: none;
  z-index: 1;
}
```

`writing-mode: vertical-rl` + `rotate(180deg)` runs the text bottom-to-top along the column. At 5.5% opacity it reads as texture, not legible text — exactly like a ghost watermark on premium printed material. It fills vertical space without competing with the crystal.

Hide on mobile (add to the existing `@media (max-width: 720px)` block):
```css
@media (max-width: 720px) {
  .hero-crystal-col { display: none; }
  .crystal-watermark { display: none; }
}
```

### 3.6 Background treatment — zone separation

The hero currently uses `background: var(--bg)` for the entire section.

**Change to a linear-gradient that creates a left-warm / right-cool split:**
```css
.hero {
  background: linear-gradient(
    to right,
    rgba(184,151,90,0.04) 0%,
    transparent 50%,
    rgba(244,243,240,0.6) 50%,
    var(--bg-alt) 100%
  );
}
```

This does three things simultaneously:
1. A very faint warm gold wash behind the text column (left half).
2. At the 50% midpoint (the column divider), a hard but low-contrast transition to the slightly darker `--bg-alt` (`#f4f3f0`) for the crystal column.
3. The crystal column now has a visually distinct background — the `border-left: 1px solid var(--line)` separator is reinforced by the tonal shift, so it no longer depends on a hairline alone.

**Update `hero::before`** — with the gradient handling left-side warmth, tighten the radial pseudo-element to avoid doubling up:
```css
.hero::before {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(184,151,90,0.09) 0%, transparent 70%);
  top: -100px;
  right: -60px;
}
```

### 3.7 Mobile hero (<=720px — crystal hidden)

When the crystal column is hidden, the hero is text-only on mobile. Adjust title size for narrower viewports:

```css
@media (max-width: 860px) {
  .hero-title {
    font-size: clamp(40px, 9.5vw, 64px);
    line-height: 1.0;
  }
  .hero-eyebrow-rule {
    width: 36px;
    margin-bottom: 20px;
  }
}
```

### 3.8 Hero entrance animation — add eyebrow rule

The existing `body.loaded` entrance system must include the new `.hero-eyebrow-rule`. Add to the CSS animation block:

```css
.hero-text .hero-eyebrow-rule {
  opacity: 0;
  transform: scaleX(0);
  transform-origin: left;
  transition: opacity 0.4s ease, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
body.loaded .hero-text .hero-eyebrow-rule {
  opacity: 1;
  transform: scaleX(1);
  transition-delay: 0.08s;
}
```

This gives the gold rule a scale-in entrance that reads as a curtain-pull just before the title fades up (which triggers at `0.15s`).

---

## 4. Color Strategy Upgrade (Priority 2)

### 4.1 New token

Add to `:root`:
```css
--bg-warm: #ece9e2;
```

This is a warmer, clearly distinct off-white — deeper than `--bg-alt` (`#f4f3f0`) but still in the warm-neutral range. It will be used for sections that belong to the "service context" zone (pillars, about).

### 4.2 Pillars section background

**Current:** `background: var(--bg-alt)` (`#f4f3f0`)

**Change to:**
```css
.pillars-section {
  background: var(--bg-warm);
}
```

The deeper warm tone creates a legible tonal break between the hero and the pillars. Previously the two sections were nearly indistinguishable in tone.

### 4.3 About section background

**Current:** `background: var(--bg-alt)` (`#f4f3f0`)

**Change to:**
```css
.about-section {
  background: var(--bg-warm);
}
```

This gives the about section the same warm-zone identity as the pillars section — a visual rhyme that says "these two sections are the service/person context of the site."

### 4.4 Pillar rule width

**Current:** `width: 32px`

**Change to:**
```css
.pillar-rule {
  width: 40px;
}
```

On a desktop viewport, 32px reads as a typographic tick. 40px reads as a structural mark. The hero eyebrow rule is 48px — the slight size differentiation (hero > pillar/about) is intentional hierarchy.

### 4.5 Nav CTA border — gold tint

**Current:** `border: 1px solid var(--line-md)` which is `rgba(15,15,14,0.16)` — nearly invisible.

**Change to:**
```css
.nav-cta {
  border: 1px solid rgba(184,151,90,0.35);
}
.nav-cta:hover {
  border-color: var(--gold);
  background: rgba(184,151,90,0.06);
}
```

The gold-tinted CTA border signals brand color at the first scroll position. It is the one CTA in the nav and the gold border gives it identity without being loud.

---

## 5. Typography (Priority 3)

### 5.1 Hero title

Already specified in §3.1. Summary: `clamp(64px, 7.5vw, 104px)`, `line-height: 0.98`, `letter-spacing: -0.03em`.

### 5.2 Section headings — no changes needed

All section headings already use `.t-serif` (Gloock). Sizes are correct for their contexts.

### 5.3 "How I Work" heading — HTML line break

The heading "How I work" renders as a single short line in a `240px` label column. Adding a manual break gives it vertical presence in the dark section context:

**Current HTML:**
```html
<h2 class="section-title t-serif">How I work</h2>
```

**Change to:**
```html
<h2 class="section-title t-serif">How I<br>work</h2>
```

No CSS change required. The stacked heading occupies more vertical space in the label column and reads with more authority in the dark background section.

---

## 6. Section-by-Section Changes Summary (Priority 4)

| Section | Change |
|---|---|
| Nav | Gold-tinted CTA border (§4.5) |
| Hero | Full rework per §3 — title size, eyebrow rule, tagline, crystal scale, watermark, background gradient |
| Pillars | Background `--bg-warm`, pillar-rule `40px` |
| Clients | No changes |
| How I Work | `<br>` in heading HTML only |
| Deliverables | No changes |
| About | Background `--bg-warm` |
| Contact | No changes |
| Footer | No changes |

---

## 7. What NOT to Change

The following are explicitly out of scope for this redesign:

- **Crystal SVG geometry** — the polygon `points` coordinates in all three crystal instances (nav mark, hero, contact) are sacred. Only the outer `width`/`height` attributes on the hero crystal may change.
- **Single-file architecture** — all changes stay within `index.html`. No new files, no build step, no framework.
- **Font choices** — Gloock and Figtree are final. Do not introduce any other typefaces.
- **Accessibility** — `aria-*` attributes, `focus-visible` outlines, `alt` text, `min-height: 44px` touch targets, and `prefers-reduced-motion` rules must be preserved exactly.
- **Mobile breakpoints** — the existing breakpoints at 480, 600, 680, 720, 840, 860px are correct. The only addition is a `.crystal-watermark { display: none }` rule that slots into the existing ≤720px block.
- **"How I Work" dark section CSS** — only the heading HTML changes.
- **"Contact" dark section** — no changes.
- **Scroll reveal system** — `.reveal`, `.reveal-left`, `.stagger`, `IntersectionObserver` JS, and `body.loaded` entrance animation all remain intact.

---

## 8. Implementation Order

Complete each phase before moving to the next. Phase 1 accounts for 80% of the visual impact.

**Phase 1 — Hero (highest impact)**
1. Add `--bg-warm: #ece9e2` to `:root`.
2. Add `.hero-eyebrow-rule` CSS block.
3. Add `.hero-eyebrow-rule` entrance animation to the `body.loaded` block.
4. Update `.hero-title` — `font-size`, `line-height`, `letter-spacing`.
5. Add `.hero-title em { font-size: 1.06em; display: block; }` override.
6. Update `.hero-tagline` — size and color.
7. Add `.crystal-watermark` CSS block.
8. Add `@media (max-width: 720px) { .crystal-watermark { display: none; } }`.
9. Update `.crystal-glow` — size and gradient.
10. Update `.hero` `background` to the linear-gradient.
11. Update `.hero::before` — size and opacity.
12. Add `@media (max-width: 860px)` overrides for `.hero-title` and `.hero-eyebrow-rule`.
13. In HTML: add `<span class="hero-eyebrow-rule" aria-hidden="true">` before `<h1>` inside `.hero-text`.
14. In HTML: add `<span class="crystal-watermark" aria-hidden="true">CRYSTALLIZER</span>` inside `.crystal-container` before `.crystal-glow`.
15. In HTML: update crystal SVG `width="380" height="499"`.

**Phase 2 — Color rhythm**
16. Apply `background: var(--bg-warm)` to `.pillars-section`.
17. Apply `background: var(--bg-warm)` to `.about-section`.
18. Update `.pillar-rule { width: 40px; }`.
19. Update `.nav-cta` border and hover state.

**Phase 3 — Typography**
20. Add `<br>` to "How I work" heading HTML.

**Phase 4 — Review pass**
21. Check the hero at viewport widths: 1440px, 1080px, 900px, 768px, 375px.
22. Verify `prefers-reduced-motion` collapses all new animations (the `.hero-eyebrow-rule` entrance uses `transition`, which is covered by the existing `transition-duration: 0.01ms !important` rule).
23. Verify keyboard focus order is unchanged — both new `<span>` elements have `aria-hidden="true"` and are not focusable.
24. Verify the contact crystal (`.contact-crystal`) is unaffected — it uses a separate inline SVG with its own `width`/`height`.

---

## 9. Before / After Reference

| Element | Before | After |
|---|---|---|
| Hero title font-size | `clamp(52px, 6vw, 88px)` | `clamp(64px, 7.5vw, 104px)` |
| Hero title line-height | `1.05` | `0.98` |
| Hero title letter-spacing | `-0.02em` | `-0.03em` |
| `em` gold word | same size as title | `font-size: 1.06em; display: block` |
| Gold rule before title | none | `48px x 2px` block, scale-in entrance |
| Hero tagline font-size | `clamp(16px, 1.6vw, 18px)` | `clamp(14px, 1.3vw, 16px)` |
| Hero tagline color | `--ink-80` | `--ink-60` |
| Crystal SVG dimensions | `300 x 394` | `380 x 499` |
| Crystal glow dimensions | `380px` circle, 20% peak opacity | `480px` circle, 28% inner / 8% mid |
| Crystal watermark | none | vertical `CRYSTALLIZER` at `5.5%` opacity |
| Hero background | flat `var(--bg)` | linear-gradient with `--bg-alt` right zone |
| Pillars background | `var(--bg-alt)` `#f4f3f0` | `var(--bg-warm)` `#ece9e2` |
| About background | `var(--bg-alt)` `#f4f3f0` | `var(--bg-warm)` `#ece9e2` |
| Pillar rule width | `32px` | `40px` |
| Nav CTA border | `rgba(15,15,14,0.16)` | `rgba(184,151,90,0.35)` gold tint |
| "How I work" heading | single line | `How I<br>work` two-line stack |
