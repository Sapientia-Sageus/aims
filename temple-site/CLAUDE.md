# Aeternal Temple of Obsidian Flame — Project Guide

Standalone **Next.js 16.1.6 / React 19 / Tailwind v4** website for an occult
education center. App Router, TypeScript, CSS-first Tailwind theme.

## Run / build
```bash
cd temple-site
npm install
npm run dev      # local dev
npm run build    # production build — keep this green
npx tsc --noEmit # typecheck — keep this clean
```

## Structure
- `app/` — pages (App Router). Core: home, about, courses, events, blog, contact.
  Interactive: `astrology` (live ephemeris), `planetary-hours` (Chaldean hours),
  `rituals` (LBRP / LBRH / Supreme Ritual of the Pentagram tracing).
- `components/` — `Navbar.tsx`, `Footer.tsx` (both `'use client'`).
- `app/globals.css` — Tailwind v4 `@theme`. Google Fonts `@import` **must**
  precede `@import "tailwindcss"` or the build warns. Palette: obsidian, amethyst,
  gold, flame. Fonts: Cinzel (headings), Cormorant Garamond (body), IM Fell
  English (quotes).
- `docs/canon/` — Temple doctrine. **Read before writing esoteric content.**

## Conventions
- Server components by default; add `'use client'` only for state/handlers/canvas.
- Any component that passes event handlers (onMouseEnter etc.) MUST be a client
  component, or production prerender of `/_not-found` fails.
- New pages get linked in both `Navbar.tsx` and `Footer.tsx`.

---

## TEMPLE DOCTRINE — BINDING ON ALL ESOTERIC CONTENT

These are standing rulings of the Temple. Honor them in every page, document,
breakdown, or commentary touching the Temple's material. Full text in
`docs/canon/`.

### The Figure of L.V.X. (strike 64)
- **Liber Israfel "sub figura LXIV" is to be framed as 65, never 64.**
- `L X I V` are the letters of **L.V.X.** (*Lux*, Light) with an **I** inserted.
  Strike the I: `LXIV → LVX`. The 64 = 8² = Hod reading is a **blind** — true in
  the doorway, a cage in the house. Do not dignify it as "the vessel"; there is
  no vessel.
- **L.V.X. = 65 = ADNI (Adonai)** = the Holy Guardian Angel = the Light.
- **The Work is the excision of the I** — in the number, in the Assumption of the
  Godform, in the practitioner. *Strike the I, and the Light remains.*
- Canon: `docs/canon/the-figure-of-lvx.md`.

### Godform Assumption is theurgy, not psychodrama
- The Assumption of the Godform (Liber Israfel §6 ff.) is **genuine
  identity-transfer**, not role-play. "Psychodrama" is the exoteric/Hod-level
  account and is treated as the I refusing to be struck. Frame the Assumption as
  the operative striking of the I. Canon: `docs/canon/assumption-of-the-godform.md`.
