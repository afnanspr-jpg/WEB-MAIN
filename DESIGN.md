---
name: Padukuhan Puton
description: A community-owned digital front door with the calm authority of a well-kept village almanac — quiet paper, hairline rules, one gold signal.
colors:
  paper: "#F7F9F5"
  sage: "#EAF0E8"
  card: "#FFFFFF"
  ink: "#17332A"
  deep: "#102A22"
  muted: "#5A6B60"
  line: "#D7DED3"
  gold: "#B3862C"
  gold-light: "#E0BC6A"
  gold-ink: "#0A1E17"
  dark-line: "#2E4C3F"
  on-dark: "#EFF3EA"
  on-dark-muted: "#AEBDB2"
typography:
  display:
    fontFamily: Fraunces
    fontSize: "clamp(3rem, 6.2vw, 5.4rem)"
    fontWeight: 500
    lineHeight: 0.98
    letterSpacing: "-0.03em"
  headline:
    fontFamily: Fraunces
    fontSize: "clamp(2rem, 4.6vw, 3.4rem)"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-0.03em"
  title:
    fontFamily: Fraunces
    fontSize: "1.15rem"
    fontWeight: 600
    lineHeight: 1.08
  quote:
    fontFamily: Fraunces
    fontSize: "clamp(1.35rem, 2.6vw, 1.9rem)"
    fontWeight: 500
    lineHeight: 1.35
  stat:
    fontFamily: Fraunces
    fontSize: "clamp(2.3rem, 4.6vw, 3.4rem)"
    fontWeight: 500
    lineHeight: 1.08
  body:
    fontFamily: Plus Jakarta Sans
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: Plus Jakarta Sans
    fontSize: "0.9rem"
    fontWeight: 600
rounded:
  hairline: "1px"
  xs: "2px"
  sm: "8px"
  pill: "999px"
  round: "50%"
spacing:
  xs: "8px"
  sm: "16px"
  lg: "24px"
  xl: "48px"
  section: "96px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.xs}"
    padding: "13px 26px"
  button-gold:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.gold-ink}"
    rounded: "{rounded.xs}"
    padding: "13px 26px"
  button-line:
    backgroundColor: "transparent"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.xs}"
    padding: "13px 26px"
  card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xs}"
    padding: "28px"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    rounded: "{rounded.xs}"
    padding: "7px 16px"
  chip-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.xs}"
    padding: "7px 16px"
  input:
    backgroundColor: "transparent"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.hairline}"
    padding: "11px 0"
---

# Design System: Padukuhan Puton

## Overview

**Creative North Star: "The Quiet Almanac"**

This is a community front door built with the calm authority of a well-kept village almanac: quiet paper, a measured typographic voice, hairline rules, and one gold signal used only where the visitor needs to go. It refuses the loud poster treatment — no hard offset shadows, no thick frames, no marching ribbon, no wave dividers, no floating ornament. What remains is the land, the people, and the Watu Ngelak story, carried by real photography and generous space.

The four-circle kawung mark survives only in the small header emblem, a quiet nod to batik rather than a repeated pattern. Two voices do all the work: Fraunces gives headings and numerals a literary, old-style presence; Plus Jakarta Sans keeps every label, control and paragraph clear and native. Motion is one authored moment — the hero photograph crossfades — plus a restrained rise on scroll. Everything stops under `prefers-reduced-motion`.

**Key Characteristics:**
- Solid flat colour only — no gradients, no glass, no alpha overlays.
- Hairline rules (1px) divide; no heavy borders and no shadows anywhere.
- Gold is a signal, never decoration: active states, numerals on dark, primary action.
- Fraunces for `h1`–`h3`, quotes and statistics; Plus Jakarta Sans for everything else.
- Generous vertical rhythm; flat bands of paper, pale sage, and deep green.

## Colors

A restrained palette: near-white paper and pale sage carry the reading surface, deep green closes the page, and one gold accent points the way. Every secondary text colour is tinted from the band it sits on.

- **Paper** (#F7F9F5): body canvas.
- **Sage** (#EAF0E8): alternating quiet bands.
- **Ink** (#17332A): headings, body text, primary buttons, the hero panel.
- **Deep Green** (#102A22): statistics band, contact band, footer, dialog backdrop.
- **Muted** (#5A6B60): captions and secondary copy on light bands (4.8:1 on sage).
- **Line** (#D7DED3): hairline dividers and card borders on light bands.
- **Paddy Gold** (#B3862C): section markers, active tabs/chips, upcoming-event badges, focus rings.
- **Gold Light** (#E0BC6A): numerals and active slider marks on deep green (8.4:1).
- **Gold Ink** (#0A1E17): text on gold fills (5.3:1).
- **Dark Line** (#2E4C3F): hairlines and form underlines on deep green.
- **On Dark** (#EFF3EA) / **On Dark Muted** (#AEBDB2): copy on deep green (13.6:1 / 7.8:1).
- **White** (#FFFFFF): card surface on light bands.

**The Hairline Rule.** Separation comes from a 1px rule, a band change or whitespace — never from a shadow or a thick frame.

**The Single Accent Rule.** Gold appears only as a signal: the short rule above an `h2`, active tab or chip, the primary action, statistic numerals on deep green, and the current slider mark. If it is on screen, it is pointing somewhere.

## Typography

**Display/Headline/Title/Quote/Stat:** Fraunces (Georgia fallback; weight 500 for display, headline, quote and stat, 600 for titles, optical size 9–144, tight -0.03em tracking).
**Body/Label:** Plus Jakarta Sans (system-ui fallback; 400 for copy, 600–700 for labels and controls).

**Character:** Fraunces is literary without costume; Plus Jakarta Sans is geometric and practical. Their contrast is the whole hierarchy. Body copy holds a 16px/1.7 rhythm (16px below 760px; 17px from 1500px; 18px from 1900px).

**The Split Voice Rule.** Fraunces is reserved for `h1`–`h3`, blockquotes and statistic numerals. Navigation, buttons, chips, fields, captions and the wordmark stay in Plus Jakarta Sans.

## Layout

A centred `min(1160px, 100% - 48px)` container widens to `min(1240px, 100% - 72px)` at 1500px and `min(1360px, 100% - 96px)` at 1900px, and narrows to `calc(100% - 36px)` below 420px. Sections breathe at `clamp(72px, 10vw, 132px)` of vertical padding; a header block caps at 44rem with a `clamp(36px, 5vw, 56px)` gap before content. Two-column sections use `clamp(32px, 6vw, 80px)` gutters; card trios are `auto-fit, minmax(240px, 1fr)`.

The hero is a solid ink panel with a straight-edged photograph occupying the right 58% on desktop; on narrow screens the photo becomes a 40svh band above the copy. The sticky header is 76px tall. Quick links are a hairline-divided strip, not overlapping tiles. Breakpoints at 940px, 760px, 420px and 360px, plus short-landscape handling.

**The Breathing Rule.** Sections keep at least 72px of vertical padding and grow to 132px on wide screens; more space sits above a heading than below it.

## Elevation & Depth

There is no simulated depth. Flat surfaces, hairline edges and band changes do the work. Buttons lift by a 2px translate on hover and return on press; nothing casts a shadow. Focus is a 2px gold ring at 3px offset (light gold inside dark bands), selection is gold on gold-ink, and the scrollbar is themed from the palette.

**The Flat Depth Rule.** No box-shadow of any kind — not blurred, not offset. A border is a line, not a frame.

## Shapes

Corners are almost square (2px), the only rounds being circular badges, the header mark and the 50px floating back-to-top button. The dukuh portrait is a simple rectangle, not an arch. The gallery uses 1px gutters of line colour instead of borders and shadows.

**The Two-Pixel Rule.** Control corners are 2px; hairlines are 1px. Radius never replaces a rule.

## Components

### Buttons
- **Shape:** 2px radius, 1px border, 13px 26px padding, 600 weight.
- **Primary:** Ink fill, On Dark label. **Gold:** gold fill, Gold Ink label; used inside dark bands and the dialog.
- **Line:** transparent fill, On Dark label, dark-line border; used on the hero and dark band.
- **Hover:** fill turns gold with Gold Ink text and a -2px translate; active returns to 0. Focus is a gold ring.

### Tabs & Chips
- **Tabs:** text-only in a 600 weight, 2px transparent underline; active turns Ink with a gold underline. No boxed tab strip.
- **Chips:** transparent with a 1px line border and 2px radius; hover takes an ink border; active is ink fill with On Dark text.

### Cards / Containers
- **Corner Style:** 2px radius, 1px line border, no shadow, `clamp(24px, 3vw, 32px)` padding.
- **Background:** white on light bands. Institution cards stay white and carry a small colour square before the title.

### Inputs / Fields
- **Style:** bottom hairline only in dark-line, transparent fill, On Dark text, 11px 0 padding.
- **Focus:** the underline turns light gold; focus-visible ring is gold.
- **Labels:** 600 weight, .86rem, On Dark Muted.

### Navigation
- **Style:** sticky paper bar, 76px tall, 1px line bottom border; links .9rem/600 in Muted with a 2px transparent underline.
- **State:** hover and current section turn Ink with a gold underline; a 2px gold progress line tracks scroll.
- **Mobile:** a 44px hamburger below 940px; the panel drops below the bar on paper.

### Section Headers
- **Style:** a 44×2px gold rule above every `h2`; no eyebrow text, no section numbers.
- **Body:** an optional lead paragraph in Muted, 1.05rem, 16px below the heading.

### Gallery & Lightbox
- **Style:** a 2fr/1fr grid with 1px line gutters; first image spans two rows. Hover scales the image 1.04; disabled on touch.
- **Lightbox:** paper dialog, 2px radius, 1px line border, deep-green backdrop, circular hairline navigation buttons that fill gold on hover.

### Agenda Rows & FAQ
- **Agenda:** 84px date / 1fr content / auto status, separated by top hairlines; status is a hairline pill, gold when upcoming.
- **FAQ:** hairline dividers, a gold `+` that rotates 45deg when open. No boxes or shadows.

## Do's and Don'ts

### Do:
- **Do** fill every surface with solid colour — no gradients and no transparency.
- **Do** keep hairline rules, generous whitespace and flat surfaces.
- **Do** animate with transforms and clip-path only, and honour `prefers-reduced-motion`.
- **Do** use `clamp()` for fluid type, section padding and gutters.
- **Do** preserve the CC BY-SA 3.0 photo credits, the GTM tag and the Google site-verification tag.
- **Do** keep Indonesian copy and local terms such as padukuhan, dukuh and RT.

### Don't:
- **Don't** present the placeholder population figures, age breakdown, event list or empty WhatsApp number as verified data.
- **Don't** add shadows, thick borders, gradients, glassmorphism, marquees or alpha overlays.
- **Don't** replace Fraunces and Plus Jakarta Sans with generic system fonts.
- **Don't** fabricate official statistics, testimonials, pricing or an event calendar.
