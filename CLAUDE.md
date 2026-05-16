# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```
npm run dev      # Vite dev server (hot reload)
npm run build    # Production build to dist/
npm run preview  # Preview production build locally
```

Deployed to Netlify. `netlify.toml` configures a catch-all redirect (`/* → /index.html`, status 200) so React Router handles client-side routing. It also sets security headers (CSP, X-Frame-Options, etc.) site-wide.

## Architecture

React Router 18 SPA — no server, no SSR, no API.

`src/main.jsx` is the entry point. All routes are children of a single `<Layout />` element (React Router's nested layout pattern via `<Outlet />`), so every page shares the sticky header and footer automatically.

Route → page mapping:
- `/` → `src/pages/Home.jsx`
- `/build` → `src/pages/BuildPlanner.jsx`
- `/checklist` → `src/pages/Checklist.jsx`
- `/weapons` → `src/pages/WeaponReference.jsx`
- `/armour` → `src/pages/ArmourReference.jsx`
- `/random` → `src/pages/LoadoutRandomizer.jsx`

`src/components/Layout.jsx` owns the sticky nav, mobile drawer, and footer. Nav items are declared as a `navItems` array at the top of that file — add new routes there alongside adding the `<Route>` in `main.jsx`.

No TypeScript — everything is plain `.jsx` / `.js`.

## Data layer

All game data is **static JS exports** in `src/data/`. There is no database, no API call, no build step that pulls live data. When the game patches, update these files by hand from [wiki.avakot.org](https://wiki.avakot.org).

| File | Exports | Notes |
|------|---------|-------|
| `weapons.js` | `WEAPONS`, `COMBAT_ARTS` | Each entry has `rank0Damage`, `baseDamage` (= Rank 30), `attunement {courage, spirit, grace}`, `virtueReq`, `slot` (Primary/Sidearm), `location` |
| `armour.js` | `ARMOUR_HELMS`, `ARMOUR_CUIRASSES`, `ARMOUR_LEGGINGS`, `ARMOUR_SETS` | Each piece has `physDef`, `magDef`, `stability`, `attunement: { physical, magick, stability }` with per-virtue pip counts |
| `runes.js` | `RUNES` | Rune data; Preludes 14 changed activation (fully charged Heavy Attack/Shot) |
| `pacts.js` | `PACTS`, `PACT_ART_VIRTUE_VALUES` | Virtue bonus costs updated in Preludes 13 |
| `prisms.js` | `calculateVirtues` | Virtue Lith system (replaced Prisms): players directly allocate virtue points; total = envoyRank × 2 (max 60 at Rank 30) |
| `joineries.js` | `JOINERIES`, `getJoineriesForWeapon`, `formatJoineryStats` | Preludes 14 rework: joineries now add Virtue Attunement pips (1–3), not flat damage |
| `talismans.js` | `TALISMANS` | Neck accessories; cannot be leveled |
| `totems.js` | `TOTEMS` | Three slots per weapon (Attack, Defense, Utility); 4th unlocked with a Rune; `stats` arrays are `[rank0, rank1, rank2, rank3]` — UI always uses index 3 |
| `gameData.js` | `gameData`, helper functions | Flat checklist registry — weapons/armour/etc. listed by id and name only, no stat data |
| `calculations.js` | stat formula functions | See below |

When adding a new weapon patch: copy an existing entry in `weapons.js` and update every field. `attuneCap` is the wiki's `VirtueAttuneCap` field — it is **not** an enforced bonus cap in the calculation logic (see the comment at the top of `calculations.js`). Also add the new weapon to `gameData.js` under the appropriate category so it appears in the Checklist.

## calculations.js

All stat formulas live here. Data sourced from wiki.avakot.org and verified against in-game screenshots.

**Key functions:**

- `calculateWeaponAttunement(weapon, virtues, rank, joineryDamage, blessedPip, joineryPips)` — computes total attack. Formula:
  - `attackAtRank = rank0 + floor(rank * (rank30 - rank0) / 30)`
  - Attunement bonus: `Courage*(couragePips/2) + Spirit*(spiritPips/2) + Grace*(gracePips/2 + 5/16)`
  - Rounded with `Math.round`. Safety cap at `1.5 × rank0Damage`.

- `calculateChargedAttack(...)` — returns `Math.round(totalAttack * 2)`.

- `calculateTotalLife(pact, virtues)` — base 2 + Courage×10 + Spirit×1 + Grace×4 + pact bonus.

- `calculateTotalDefense(armourPieces, virtues)` — armour attunement bonus: `floor(sum(pips[v] * virtue[v]) / 9)` per defence type.

- `calculateCooldownReduction(spirit)` — returns `(spirit - 2) * 1.5` for spirit > 2.

- `calculateWeaponWithTotems(...)` — applies totem effects on top of base weapon calc. Only the bonus matching the equipped slot (Attack/Defense/Utility) is parsed; the other two are ignored.

- `parseTotemAttackEffect / parseTotemDefenseEffect / parseTotemUtilityEffect` — regex parsers that classify a totem's free-text bonus string into a structured `{ type, value, condition }` object. When new totems are added, check that their bonus strings match an existing regex pattern or add a new branch.

Update `calculations.js` when Digital Extremes changes a formula (patch notes mentioning attunement, rank scaling, or life values). The comment block at the top of the file lists confirmed test cases — update those after verifying changes in-game.

## useProgress hook

`src/hooks/useProgress.js` — tracks checklist completion.

**Storage:** `localStorage` under the key `soulframe-checklist-progress`. Shape is a flat object where each key is a checklist item id and its value is always `true` (absent = unchecked). Parsed with `sanitizeProgress` on load to block prototype pollution attacks.

**Item ids:** Sections with `trackLevel: true` in `gameData.js` (weapons, pacts) produce two ids per item: `${item.id}:collected` and `${item.id}:leveled`. All other sections produce a single id equal to `item.id`. This is handled by `getItemTrackingIds` in `gameData.js`.

**API returned by the hook:**
`toggle(id)`, `isChecked(id)`, `getCheckedCount(ids[])`, `resetAll()`, `resetSection(ids[])`, `checkAll(ids[])`, `exportProgress()` (downloads JSON file), `importProgress()` (file picker, sanitizes on load), `totalChecked`.

## Fonts

Fonts are loaded from `@fontsource` npm packages (self-hosted, no Google Fonts CDN) and imported in `src/main.jsx`:

- **Cinzel** (weights 400, 600, 700) — headings and fantasy/branded UI elements. Applied via `font-['Cinzel']` in Tailwind classes or the `font-cinzel` family if configured.
- **Inter** (weights 300, 400, 500, 600) — body text and UI. Applied via `font-sans` (Tailwind default).

## Styling

Dark fantasy color palette — all custom colors are prefixed `sf-` in Tailwind (defined in `tailwind.config.js`):

| Token | Hex | Role |
|-------|-----|------|
| `sf-bg` | `#0a0f0a` | Page background |
| `sf-panel` | `#0f1a0f` | Nav / sidebar panels |
| `sf-card` | `#142014` | Card backgrounds |
| `sf-border` | `#1e3a1e` | Borders, dividers |
| `sf-hover` | `#1a2e1a` | Hover state fills |
| `sf-accent` | `#2d5a2d` | Active nav, focus rings |
| `sf-green` | `#4a8c4a` | Secondary accent |
| `sf-bright` | `#6abf6a` | Highlighted text, links |
| `sf-text` | `#c8e6c8` | Primary body text |
| `sf-muted` | `#7a9f7a` | Secondary / placeholder text |
| `sf-dim` | `#3a5a3a` | Tertiary / disabled |

Three virtue colours also defined for stat indicators:
- `courage` / `courage-light` — red (`#e57373` / `#ffcdd2`)
- `spirit` / `spirit-light` — green (`#81c784` / `#c8e6c9`)
- `grace` / `grace-light` — indigo (`#7986cb` / `#c5cae9`)

Tailwind's `content` glob covers `./index.html` and `./src/**/*.{js,ts,jsx,tsx}`. No Tailwind plugins are used.

Icons are from `lucide-react` — destructure named exports directly (`import { Sword, Shield } from 'lucide-react'`).
