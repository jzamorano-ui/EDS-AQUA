# Design System — OPS (Aqua DS)

> **Version:** dist v0.1.0 (delivered) · working v0.19.0 — see [CHANGELOG.md](CHANGELOG.md) · [dist/CHANGELOG.md](dist/CHANGELOG.md)
> **Stack:** DTCG design tokens · CSS custom properties · SVG icons — framework-agnostic output (no UI framework)
> **Source of truth:** Figma Tokens Library (`ml3ScFhJNwgs6xZpKUKuok`)
> **Not an official public design system — internal use and authorized AI agents only.**

OPS Design System (codename **Aqua**) is the design language for OPS Sucursal Virtual — a financial product platform built for accessibility, clarity, and operational trust. The visual voice is clean and institutional without being cold: white surfaces, a slate-navy action system, and a vivid red-coral brand accent that anchors the OPS identity. Every decision starts from WCAG 2.2 AA compliance and scales up from mobile. The token architecture separates primitives (raw values) from semantics (intent), so agents never hardcode hex — they reference the named semantic layer.

---

## 1. Token Architecture

Understanding this architecture prevents color hardcoding. **Always use semantic tokens — never primitives or hex values directly.**

### Three-layer model

```
primitives/   → raw values (hex, px, unitless) — never used in UI
semantics/    → named intent (alias to primitives) — use these
responsive/   → device rules (breakpoints, grid, type-modes)
```

### Token naming convention: `Topic/Property/Role/State`

| Segment | Definition | Examples |
|---|---|---|
| `Topic` | Value domain | `color`, `space`, `radius`, `stroke`, `elevation`, `type` |
| `Property` | Sub-domain | `bg`, `border`, `icon`, `text`, `action`, `focus` |
| `Role` | Semantic variant | `primary`, `secondary`, `brand`, `inverse`, `surface`, `status` |
| `State` | Interaction state | `default`, `hover`, `active`, `disabled`, `focus`, `inverse` |

**Figma/JSON format:** `color/action/primary/default`
**CSS output:** `--color-action-primary-default`

**Rules:**
- `default` only when the token has siblings (`hover`, `active`, `disabled`) — never as a domain name
- `neutral` for the base variant within a group (not `default`)
- No component names in semantic tokens (`button`, `card`, `modal` are prohibited)
- No raw hex values in components — always `var(--token-name)`

---

## 2. Color System

### Primitive palettes (reference only — do not use directly in UI)

| Family | Base (step 500) | Hue |
|---|---|---|
| `red`    | `#FF585C` | 22.9° — OPS brand |
| `slate`  | `#5B7F95` | 235.7° — system neutral |
| `blue`   | `#0043CE` | 262.6° — focus + info |
| `green`  | `#1E833A` | 148.0° — success |
| `yellow` | `#F59E0B` | 70.1° — warning |
| `gray`   | `#737373` | 89.9° — achromatic |
| `aqua`   | `#00A499` | 186.4° — decorative |
| `purple` | `#9753ED` | 300.0° — decorative |
| `pink`   | `#DC4ED0` | 339.2° — decorative |
| `sky`    | (blue/100) | 254.6° — decorative |
| `white`  | `#FFFFFF` | — |
| `black`  | `#000000` | — |

Scale steps: `50, 100, 200, 300, 400, 500, 600, 700, 800, 900`. Step 50 ≠ white; step 900 ≠ black.

---

### Semantic tokens — Background

| Token | Value | Use |
|---|---|---|
| `--color-bg-surface-default` | `#ffffff` | Page/component primary surface |
| `--color-bg-surface-subtle` | `#f4f7f9` | Secondary surface, section backgrounds |
| `--color-bg-surface-inverse` | `#0f202b` | Dark surface (inverse context) |
| `--color-bg-fill-neutral-subtle` | `#ffffff` | Input, field background |
| `--color-bg-fill-neutral-medium` | `#f7f7f7` | Read-only field, chips |
| `--color-bg-fill-neutral-strong` | `#e7e7e7` | Strong neutral fill |
| `--color-bg-fill-brand-subtle` | `#ffe5e3` | Brand secondary/ghost hover |
| `--color-bg-fill-brand-medium` | `#ff585c` | Brand primary button |
| `--color-bg-fill-brand-strong` | `#d2353f` | Brand hover, badge indicator |
| `--color-bg-fill-inverse-subtle` | `#e2e9ee` | Inverse secondary |
| `--color-bg-fill-inverse-medium` | `#5b7f95` | Inverse medium fill |
| `--color-bg-fill-inverse-strong` | `#0f202b` | Inverse strong fill |
| `--color-bg-status-info` | `#f3f7ff` | Info alert/badge background |
| `--color-bg-status-success` | `#f3f9f3` | Success alert/badge background |
| `--color-bg-status-warning` | `#fcf6ef` | Warning alert/badge background |
| `--color-bg-status-danger` | `#fff4f3` | Danger alert/badge background |
| `--color-bg-status-neutral` | `#f7f7f7` | Neutral badge background |
| `--color-bg-deco-1` | `#dbf0ed` | Decorative aqua surface |
| `--color-bg-deco-2` | `#ece4ff` | Decorative purple surface |
| `--color-bg-deco-3` | `#e2e9ee` | Decorative slate surface |
| `--color-bg-deco-4` | `#f8d3eb` | Decorative pink surface |
| `--color-bg-deco-5` | `#d1e3fa` | Decorative sky surface |
| `--color-bg-overlay` | `rgba(0,0,0,0.6)` | Modal/drawer backdrop |

---

### Semantic tokens — Action (button backgrounds)

| Token | Value | State |
|---|---|---|
| `--color-action-primary-default` | `#1f3644` | Slate 800 — System Primary default |
| `--color-action-primary-hover` | `#304d5f` | Slate 700 |
| `--color-action-primary-active` | `#0f202b` | Slate 900 |
| `--color-action-primary-disabled` | `#f7f7f7` | Gray 50 |
| `--color-action-primary-inverse-default` | `#ffffff` | System Primary on dark — default |
| `--color-action-primary-inverse-hover` | `#f4f7f9` | Slate 50 |
| `--color-action-primary-inverse-active` | `#e2e9ee` | Slate 100 |
| `--color-action-secondary-default` | `#e2e9ee` | System Secondary default |
| `--color-action-secondary-hover` | `#becdd8` | Slate 200 |
| `--color-action-secondary-active` | `#9bb3c3` | Slate 300 |
| `--color-action-secondary-inverse-default` | `transparent` | |
| `--color-action-secondary-inverse-hover` | `rgba(255,255,255,0.08)` | |
| `--color-action-secondary-inverse-active` | `rgba(255,255,255,0.16)` | |
| `--color-action-tertiary-default` | `transparent` | System Tertiary default |
| `--color-action-tertiary-hover` | `#f4f7f9` | Slate 50 |
| `--color-action-tertiary-active` | `#e2e9ee` | Slate 100 |
| `--color-action-tertiary-inverse-default` | `transparent` | |
| `--color-action-tertiary-inverse-hover` | `rgba(255,255,255,0.08)` | |
| `--color-action-tertiary-inverse-active` | `rgba(255,255,255,0.16)` | |
| `--color-action-brand-primary-default` | `#ff585c` | Brand Primary default |
| `--color-action-brand-primary-hover` | `#d2353f` | Red 600 |
| `--color-action-brand-primary-active` | `#9b1020` | Red 700 |
| `--color-action-brand-secondary-default` | `#ffe5e3` | Brand Secondary default |
| `--color-action-brand-secondary-hover` | `#ffc7c3` | Brand Secondary hover |
| `--color-action-brand-secondary-active` | `#ffa7a3` | Brand Secondary active |
| `--color-action-brand-tertiary-default` | `transparent` | Brand Tertiary default |
| `--color-action-brand-tertiary-hover` | `#ffe5e3` | Brand Tertiary hover |
| `--color-action-brand-tertiary-active` | `#ffc7c3` | Brand Tertiary active |

---

### Semantic tokens — Text

| Token | Value | Use |
|---|---|---|
| `--color-text-primary` | `#0f202b` | Primary text — headings, body |
| `--color-text-secondary` | `#737373` | Secondary text — placeholder, captions |
| `--color-text-inverse` | `#ffffff` | Text on dark/color surfaces |
| `--color-text-disabled` | `#ababab` | Disabled state text |
| `--color-text-brand` | `#ff585c` | Brand text, red accent labels |
| `--color-text-brand-strong` | `#9b1020` | Strong brand text |
| `--color-text-link-default` | `#1f3644` | Link default |
| `--color-text-link-hover` | `#304d5f` | Link hover |
| `--color-text-link-active` | `#0f202b` | Link active |
| `--color-text-status-info` | `#002a90` | Info text (alert, badge) |
| `--color-text-status-success` | `#00531d` | Success text |
| `--color-text-status-warning` | `#8b5700` | Warning text |
| `--color-text-status-danger` | `#9b1020` | Danger text |

---

### Semantic tokens — Border & Focus

| Token | Value | Use |
|---|---|---|
| `--color-border-default` | `#c9c9c9` | Default border — inputs, cards |
| `--color-border-focus` | `#0f202b` | Focus border on inputs |
| `--color-border-disabled` | `#e7e7e7` | Disabled field border |
| `--color-border-inverse` | `#ffffff` | Border on dark surfaces |
| `--color-border-danger-focus` | `#9b1020` | Error state border |
| `--color-border-divider-default` | `#e7e7e7` | Horizontal/vertical dividers |
| `--color-border-divider-brand` | `#ff585c` | Brand divider (tabs active indicator) |
| `--color-border-status-info` | `#9ebefb` | Info alert border |
| `--color-border-status-success` | `#aed2b2` | Success alert border |
| `--color-border-status-warning` | `#fed9af` | Warning alert border |
| `--color-border-status-danger` | `#ffc7c3` | Danger alert border |
| `--color-focus-ring-default` | `#0043ce` | Focus ring — default surface |
| `--color-focus-ring-inverse` | `#ffffff` | Focus ring — inverse surface |
| `--color-focus-ring-gap-default` | `#f3f7ff` | Focus ring gap — default surface |
| `--color-focus-ring-gap-inverse` | `#1f3644` | Focus ring gap — inverse surface |

---

### Semantic tokens — Icon

| Token | Value | Use |
|---|---|---|
| `--color-icon-system-primary` | `#0f202b` | Primary icon on light surface |
| `--color-icon-system-secondary` | `#737373` | Secondary icon (close buttons) |
| `--color-icon-system-disabled` | `#ababab` | Disabled icon |
| `--color-icon-system-inverse` | `#ffffff` | Icon on dark/color surface |
| `--color-icon-status-info` | `#0036af` | Info status icon |
| `--color-icon-status-success` | `#006b27` | Success status icon |
| `--color-icon-status-warning` | `#bf7900` | Warning status icon |
| `--color-icon-status-danger` | `#9b1020` | Danger status icon |
| `--color-icon-brand-primary` | `#ff585c` | Brand icon on light surface |
| `--color-icon-brand-secondary` | `#ffc7c3` | Brand secondary icon |
| `--color-icon-brand-strong` | `#9b1020` | Brand strong icon |
| `--color-icon-brand-contrast` | `#ffffff` | Icon on brand background |

---

## 3. Typography

### Font family

**Noto Sans** — primary and only font family. Weights: 400 (Regular), 500 (Medium), 700 (Bold).
No display/serif font. No monospace font. No OpenType feature overrides. `letter-spacing: 0` across all roles.

### Scale

| Token | Size | Weight | Line Height | Use |
|---|---|---|---|---|
| `--type-display-xl-bold` | 64px | 700 | 72px | Hero display — marketing only |
| `--type-headline-lg-bold` | 48px | 700 | 64px | H1 section headings |
| `--type-headline-md-bold` | 40px | 700 | 48px | H2 major headings |
| `--type-headline-sm-bold` | 32px | 700 | 40px | H3 sub-headings |
| `--type-title-lg-bold` | 24px | 700 | 32px | Card / panel titles — bold |
| `--type-title-lg-medium` | 24px | 500 | 32px | Card / panel titles — medium |
| `--type-title-md-bold` | 20px | 700 | 28px | Component titles — bold |
| `--type-title-md-medium` | 20px | 500 | 28px | Component titles — medium |
| `--type-title-sm-bold` | 18px | 700 | 26px | Section labels — bold |
| `--type-title-sm-medium` | 18px | 500 | 26px | Section labels — medium |
| `--type-title-xs-bold` | 14px | 700 | 20px | Compact title |
| `--type-body-xl-regular` | 20px | 400 | 28px | Large body text |
| `--type-body-xl-medium` | 20px | 500 | 28px | Large body emphasized |
| `--type-body-xl-bold` | 20px | 700 | 28px | Large body strong |
| `--type-body-lg-regular` | 16px | 400 | 24px | Default body text |
| `--type-body-lg-medium` | 16px | 500 | 24px | Body emphasized |
| `--type-body-lg-bold` | 16px | 700 | 24px | Body strong — Large button label |
| `--type-body-md-regular` | 14px | 400 | 20px | Secondary body, input text, placeholder |
| `--type-body-md-medium` | 14px | 500 | 20px | Input label, medium emphasis |
| `--type-body-md-bold` | 14px | 700 | 20px | Medium button label, alert title |
| `--type-caption-sm-regular` | 12px | 400 | 16px | Helper text, timestamps, counters |
| `--type-caption-sm-medium` | 12px | 500 | 16px | Small button label, badge text, tabs |

### Principles

- Two weights in product UI: 400 (read) and 700 (structure/labels). 500 mediates where 700 is too heavy.
- `letter-spacing: 0` everywhere — no tracking adjustments in this system.
- Minimum heading line-height: 1.2. Minimum body line-height: 1.4.
- H1 maximum: 64px. Caption minimum: 12px.
- Brand button (`type=Brand`) uses `title/md-bold` (20px, 700) — required for WCAG AA contrast.

---

## 4. Spacing & Layout

### Spacing scale

| Token | Value | rem | Use |
|---|---|---|---|
| `--space-none` | 0px | 0 | Reset |
| `--space-2xs` | 4px | 0.25rem | Micro gaps — icon/label, title/desc |
| `--space-xs` | 8px | 0.5rem | Gap within components (icon·label in button) |
| `--space-sm` | 12px | 0.75rem | Padding compact (small button), field padding |
| `--space-md` | 16px | 1rem | Padding standard (medium button), alert padding |
| `--space-lg` | 24px | 1.5rem | Padding large (large button), section gap |
| `--space-xl` | 32px | 2rem | Section padding |
| `--space-2xl` | 48px | 3rem | Section vertical rhythm |
| `--space-3xl` | 64px | 4rem | Hero vertical rhythm |

### Border radius scale

| Token | Value | Use |
|---|---|---|
| `--radius-none` | 0px | Square — dividers, progress bars |
| `--radius-xs` | 4px | Tags, compact badges |
| `--radius-sm` | 8px | Inputs, alerts, cards |
| `--radius-md` | 12px | Panels, tooltips |
| `--radius-lg` | 16px | Modals, drawers |
| `--radius-xl` | 24px | Large panels |
| `--radius-2xl` | 32px | Hero cards |
| `--radius-pill` | 999px | Buttons, chips, indicator badges |

### Stroke scale

| Token | Value | Use |
|---|---|---|
| `--stroke-none` | 0px | No border |
| `--stroke-xs` | 1px | Default border on inputs, cards, alerts |
| `--stroke-sm` | 2px | Focus ring border, dividers |
| `--stroke-focus-ring-width` | 2px | Focus ring width — always 2px |

### Grid

Two layout modes: **Marketing** (public site, landings) and **Product** (Sucursal Virtual — authenticated app).

| Breakpoint | Width | Columns Marketing | Columns Product | Gutter |
|---|---|---|---|---|
| xs | 0px | 4 | 4 | 16px (`--space-md`) |
| sm | 576px | 4 | 4 | 16px (`--space-md`) |
| md | 768px | 8 | 8 | 24px (`--space-lg`) |
| lg | 1024px | 12 | 12 | 24px (`--space-lg`) |
| xl | 1440px | 12 | 12 | 24px (`--space-lg`) |

- **Marketing:** max-width 1280px centered. Desktop margin 80px.
- **Product:** sidebar fixed at 304px on desktop. Grid applies to content area only.
- Mobile-first: define base styles then override at `sm`, `md`, `lg`, `xl`.

---

## 5. Elevation

Elevation indicates hierarchy and interaction — not decoration. `elevation-md` and above signal that an element is actionable.

| Token | Value | Use | Interactive |
|---|---|---|---|
| `--elevation-none` | `0px 0px 0px 0px transparent` | Base surface, layout, backgrounds | No |
| `--elevation-sm` | `0px 2px 4px 0px rgba(49,49,49,0.08)` | Subtle separation between blocks | No |
| `--elevation-md` | `0px 4px 12px 0px rgba(49,49,49,0.10)` | Cards, actionable elements | Yes |
| `--elevation-lg` | `0px 8px 24px 0px rgba(49,49,49,0.12)` | Dropdowns, floating panels | Yes |
| `--elevation-top-md` | `0px -4px 8px 0px rgba(49,49,49,0.10)` | Modal, drawer, overlay (upward shadow) | Yes |

**Decision order — before applying elevation:**
1. Separate content → `spacing` or `divider`
2. Highlight content → `color` or `typography`
3. Group content → `background`
4. Signal interaction → only then `elevation`

---

## 6. Icon System

Icons come from the **Icons Library** (Figma: `zIbuWAvLhwTlwnVwbDgY5n`). All icons are sourced from this library — never draw ad-hoc icons in DS components.

### Size scale

| Token | Value | Use |
|---|---|---|
| `--icon-size-xs` | 16px | Inline text icons, compact badges |
| `--icon-size-sm` | 20px | Small button/icon, input icon, tag |
| `--icon-size-md` | 24px | Default — button, alert, checkbox, toggle |
| `--icon-size-lg` | 32px | Emphasized icons |
| `--icon-size-xl` | 40px | Feature icons |
| `--icon-size-2xl` | 48px | Hero icons |
| `--icon-size-3xl` | 56px | Display icons |
| `--icon-size-4xl` | 64px | Maximum — marketing only |

### Color binding rules

- **Never** bind fill/color directly on a vector node in a DS component.
- Icons resolve color via **context-color modes** — the `Icon/Context` collection applies the correct token by mode (`default` on light surface, `inverse` on dark/color surface).
- In CSS: apply the appropriate `--color-icon-*` token so the SVG inherits via `currentColor`.

```css
/* Default surface */
.icon { color: var(--color-icon-system-primary); }

/* Inverse surface */
.icon--inverse { color: var(--color-icon-system-inverse); }

/* Status */
.icon--danger { color: var(--color-icon-status-danger); }
```

---

## 7. Component Library

**13 certified components — v0.1.0.** Certified = token-complete, WCAG AA verified, Figma and documentation in sync.

---

### Button

Executes actions. Use `link` for navigation; `toggle` for on/off states.

**Properties:**

| Property | Values |
|---|---|
| `type` | `System` · `Brand` |
| `variant` | `Primary` · `Secondary` · `Tertiary` |
| `surface` | `Default` · `Inverse` |
| `size` | `Large` · `Medium` · `Small` (Brand: Large only) |
| `state` | `default` · `hover` · `active` · `focus` · `disabled` · `loading` |

**Token map:**

| Combo | `background` | `color` | `icon` |
|---|---|---|---|
| Primary Default | `--color-action-primary-*` | `--color-text-inverse` | icon/inverse mode |
| Primary Inverse | `--color-action-primary-inverse-*` | `--color-text-primary` | icon/default mode |
| Secondary Default | `--color-action-secondary-*` | `--color-text-primary` | icon/default mode |
| Secondary Inverse | `--color-action-secondary-inverse-*` | `--color-text-inverse` | icon/inverse mode |
| Tertiary Default | `--color-action-tertiary-*` | `--color-text-primary` | icon/default mode |
| Tertiary Inverse | `--color-action-tertiary-inverse-*` | `--color-text-inverse` | icon/inverse mode |
| Brand | `--color-action-brand-primary-*` | `--color-text-inverse` | icon/inverse mode |
| Disabled (all) | `--color-action-primary-disabled` | `--color-text-disabled` | icon/disabled mode |

`*` = state suffix: `-default` · `-hover` · `-active`

**Layout tokens:**

| Size | Height | `padding-inline` | `border-radius` | Typography |
|---|---|---|---|---|
| Large | 48px | `--space-lg` (24px) | `--radius-pill` | `body/lg-bold` (16px, 700) |
| Large / Brand | 48px | `--space-lg` (24px) | `--radius-pill` | `title/md-bold` (20px, 700) |
| Medium | 44px | `--space-md` (16px) | `--radius-pill` | `body/md-bold` (14px, 700) |
| Small | 32px | `--space-sm` (12px) | `--radius-pill` | `caption/sm-medium` (12px, 500) |

Gap icon·label: `--space-xs` (8px).

**Focus ring:**
```css
outline: var(--stroke-focus-ring-width) solid var(--color-focus-ring-default);
outline-offset: 2px;
box-shadow: 0 0 0 2px var(--color-focus-ring-gap-default);
```

**Constraints:** `Brand` = hero/landing/campaigns only — never in forms, payments, or critical flows. One `Primary` per view. `Loading` only on `button`, not `button/icon`.

---

### Button / Icon

Same as Button except: no `label`, no `iconPosition`, no `loading`. `aria-label` is always required.

---

### Badge

Non-interactive. Communicates status or activity count.

| Sub-component | Types | Use |
|---|---|---|
| `badge/state` | `neutral` · `info` · `success` · `warning` · `danger` | Semantic system status |
| `badge/indicator dot` | — | Unread / new activity signal |
| `badge/indicator number` | number (max display: `99+`) | Notification count |
| `notification` | badge composed on button/icon | Composed pattern |

**Tokens — `badge/state`:**

| Variant | background | border | label color |
|---|---|---|---|
| `info` | `--color-bg-status-info` | `--color-border-status-info` | `--color-text-status-info` |
| `success` | `--color-bg-status-success` | `--color-border-status-success` | `--color-text-status-success` |
| `warning` | `--color-bg-status-warning` | `--color-border-status-warning` | `--color-text-status-warning` |
| `danger` | `--color-bg-status-danger` | `--color-border-status-danger` | `--color-text-status-danger` |
| `neutral` | `--color-bg-status-neutral` | `--color-border-default` | `--color-text-primary` |

Typography: `caption/sm-medium` (12px, 500). Radius: `--radius-pill`. Padding-inline: `--space-sm`. Padding-block: `--space-2xs`. Border: `--stroke-xs`.

**Tokens — `badge/indicator`:**
- background: `--color-bg-fill-brand-strong` · text: `--color-text-inverse`
- Dot: 8×8px. Number: 20×20px.

---

### Alert

System messages the user must read. Not for decoration or navigation states.

**Variants:** `info` · `success` · `warning` · `danger`
**Props:** `title` (bool) · `close` (bool) · `link` (bool). `link=true` requires `title=true`.

| Variant | `background` | `border` | `title color` | `icon fill` |
|---|---|---|---|---|
| `info` | `--color-bg-status-info` | `--color-border-status-info` | `--color-text-status-info` | `--color-icon-status-info` |
| `success` | `--color-bg-status-success` | `--color-border-status-success` | `--color-text-status-success` | `--color-icon-status-success` |
| `warning` | `--color-bg-status-warning` | `--color-border-status-warning` | `--color-text-status-warning` | `--color-icon-status-warning` |
| `danger` | `--color-bg-status-danger` | `--color-border-status-danger` | `--color-text-status-danger` | `--color-icon-status-danger` |

Description: `--color-text-primary`. Link: `--color-text-link-default`.
Padding: `--space-md` inline / `--space-sm` block. Gap: `--space-sm`. Radius: `--radius-sm`. Border: `--stroke-xs`.
ARIA: `danger`/`warning` → `role="alert"` + `aria-live="assertive"`. `info`/`success` → `role="status"` + `aria-live="polite"`.

---

### Text Field

Two sub-components: `input` (single-line) and `text-area` (multi-line).

**States:** `default` · `focus` · `writing` · `filled` · `error` · `disabled` · `read-only`

| State | Container border |
|---|---|
| default / hover | `--color-border-default` |
| focus / writing | `--color-border-focus` |
| error | `--color-border-danger-focus` |
| disabled | `--color-border-disabled` |

Container bg: `--color-bg-fill-neutral-subtle` (all states). Read-only: `--color-bg-fill-neutral-medium`.
Label: `--color-text-primary` / error: `--color-text-status-danger` / disabled: `--color-text-disabled`.
Value text: `--color-text-primary`. Placeholder: `--color-text-secondary`. Error message: `--color-text-status-danger`.
Padding inline: `--space-sm`. Padding block: `--space-xs`. Radius: `--radius-sm`. Border: `--stroke-xs`.
Label: `body/md-medium` (14px, 500). Input text: `body/md-regular` (14px, 400). Helper/error: `caption/sm-regular` (12px, 400).

---

### Checkbox

Multiple independent selection. Use `radio button` for exclusive selection; `toggle` for immediate on/off.

**States:** `default` · `selected` · `focus` + `disabled` prop (true/false). Valid combos: 5. `focus + disabled` does not exist.

| Element | State | Property | Token |
|---|---|---|---|
| `checkbox-control` | default | background | `--color-bg-surface-default` |
| `checkbox-control` | selected · focus | background | `--color-action-primary-default` |
| `checkbox-control` | disabled | background | `--color-bg-fill-neutral-medium` |
| `checkbox-control` | default | border | `--color-border-default` |
| `checkbox-control` | hover | border | `--color-border-focus` |
| `checkbox-control` | selected · focus | border | `--color-action-primary-default` |
| `checkbox-control` | disabled | border | `--color-border-disabled` |
| `checkmark` icon | selected · focus | fill | `--color-icon-system-inverse` |
| `label` | default · selected · focus | color | `--color-text-primary` |
| `label` | disabled | color | `--color-text-disabled` |

Layout: control 24×24px · touch area 40×44px · gap control/label `--space-md` (16px) · radius `--radius-xs` (4px).
Typography: label `body/md-regular` (14px, 400).
Group: always `<fieldset>` + `<legend>`. `indeterminate` not supported in MVP.

---

### Chips

Compact interactive filter/selection. Not for navigation (→ `tabs`) or status display (→ `badge`).

**Type:** `outline` (unselected) · `filled` (selected). **States:** `default` · `hover` · `focus` · `disabled`.
**Modes:** `multi` (each chip independent, `aria-pressed`) · `single` (one active at a time, `aria-selected`).

| Element | State | Property | Token |
|---|---|---|---|
| `chip` | outline | background | `--color-bg-fill-neutral-subtle` |
| `chip` | hover | background | `--color-bg-fill-neutral-medium` |
| `chip` | filled (selected) | background | `--color-action-primary-default` |
| `chip` | disabled | background | `--color-bg-fill-neutral-medium` |
| `chip` | outline | border | `--color-border-default` |
| `chip` | filled | border | `--color-action-primary-default` |
| `chip` | disabled | border | `--color-border-disabled` |
| `label` | outline | color | `--color-text-primary` |
| `label` | filled | color | `--color-text-inverse` |
| `label` | disabled | color | `--color-text-disabled` |
| `icon` | outline | fill | `--color-icon-system-secondary` |
| `icon` | filled | fill | `--color-icon-system-inverse` |
| `icon` | disabled | fill | `--color-icon-system-disabled` |

Layout: radius `--radius-pill` · padding-inline `--space-sm` (12px) · padding-block `--space-xs` (8px) · gap `--space-xs` (8px) · border `--stroke-xs`.
Typography: `body/md-medium` (14px, 500).
Trailing remove button requires its own `aria-label="Eliminar [label]"`.

---

### Link

Navigates to a URL, route, or anchor. Not for actions (→ `button`; if it looks like a link but fires logic → `button variant=Tertiary`).

**Sizes:** `xs` · `sm` · `md` · `lg`. **Props:** `underline` (bool) · `standalone` (bool — enables 44×44px touch area).
**States:** `default` · `hover` · `active` · `focus` · `disabled`.

| State | Token |
|---|---|
| default · focus | `--color-text-link-default` |
| hover | `--color-text-link-hover` |
| active | `--color-text-link-active` |
| disabled | `--color-text-disabled` |

Typography per size:

| Size | Style | font-size | weight |
|---|---|---|---|
| `xs` | `caption/sm-medium` | 12px | 500 |
| `sm` | `body/md-medium` | 14px | 500 |
| `md` | `body/lg-medium` | 16px | 500 |
| `lg` | `title/sm-medium` | 18px | 500 |

Underline: implement as `border-bottom: 1px solid currentColor` — **not** `text-decoration: underline`.
`underline=true` required when link coexists with same-color text (WCAG 1.4.1). Only supported on default (light) surfaces — no inverse variant.
Focus ring radius: `--radius-xs` (4px).

---

### Radio Button

Exclusive selection between mutually exclusive options. Always inside a `radio group`.

**States:** `default` · `selected` · `focus` + `disabled` prop. Valid combos: 5. `focus + disabled` does not exist.
Group directions: `vertical` · `horizontal`.

| Element | State | Property | Token |
|---|---|---|---|
| `radio-control` | default | background | `--color-bg-surface-default` |
| `radio-control` | selected · focus | background | `--color-action-primary-default` |
| `radio-control` | disabled | background | `--color-bg-fill-neutral-medium` |
| `radio-control` | default | border | `--color-border-default` |
| `radio-control` | hover | border | `--color-border-focus` |
| `radio-control` | selected · focus | border | `--color-action-primary-default` |
| `radio-control` | disabled | border | `--color-border-disabled` |
| `radio-dot` | selected · focus | fill | `--color-icon-system-inverse` |
| `label` | default · selected · focus | color | `--color-text-primary` |
| `label` | disabled | color | `--color-text-disabled` |

Layout: control 24×24px · touch area 40×44px · gap control/label `--space-md` (16px) · radius `--radius-pill` (50%).
Typography: label `body/md-regular` (14px, 400).
ARIA: group as `<fieldset>` + `<legend>`. Keyboard: radio group is a **single tab stop** — arrow keys `↑↓←→` navigate and select within the group.

---

### Spinner

Brief localized loading indicator. Non-interactive. Not a replacement for full-page loading transitions.

**Sizes:** `sm` (20px) · `md` (24px) · `lg` (32px). In buttons, always use `md` regardless of button size.

| Element | Property | Token |
|---|---|---|
| arc | border-color | `--color-border-focus` |

Layout: border-width 2px (sm/md) · 3px (lg) · radius `--radius-pill`.
ARIA: spinner element is `aria-hidden="true"`. The **container** must have `aria-busy="true"` + `aria-label="[status]"`.
`prefers-reduced-motion`: stop animation with `animation: none`.

---

### Tabs

Organizes content into sections within a single view. Not for filtering (→ `chips`) or page navigation (→ `link`).

**States per tab item:** `default` · `hover` · `active` · `focus` · `disabled`. Always exactly one `active`. Minimum 2 tabs.

| Element | State | Property | Token |
|---|---|---|---|
| `label` | default | color | `--color-text-secondary` |
| `label` | active | color | `--color-text-primary` |
| `label` | disabled | color | `--color-text-disabled` |
| `icon` | default | fill | `--color-icon-system-secondary` |
| `icon` | active | fill | `currentColor` (inherits `--color-text-primary`) |
| `icon` | disabled | fill | `--color-icon-system-disabled` |
| `indicator` | active | fill | `--color-border-focus` |
| `indicator` | default · disabled | fill | `transparent` |
| `divider` | — | fill | `--color-border-default` |
| `tab-group` | — | background | `--color-bg-surface-default` |
| focus ring | focus | outline | `--color-focus-ring-default` |

Layout: padding-inline `--space-md` (16px) · padding-block `--space-sm` (12px) · gap icon/label `--space-xs` (8px) · indicator height 2px.
Typography: default tab `body/md-regular` (14px, 400) · active tab `body/md-medium` (14px, 500).
ARIA: `role="tablist"` + `aria-label` on container. Active tab: `aria-selected="true"` + `tabindex="0"`. Inactive: `tabindex="-1"`. Panel: `role="tabpanel"` + `aria-labelledby`.
Keyboard: Tab → enters group focused on active tab. `←→↑↓` move focus (without activating). `Home`/`End` jump to first/last. `Enter`/`Space` activate. All icons `aria-hidden="true"`.

---

### Tag

Informative classification label. No size variants — single component. Not for status (→ `badge`) or selection (→ `chip`).

**Props:** `leadingIcon` (optional) · `trailingIcon` (optional). Max label ~15 characters.

| Element | Property | Token |
|---|---|---|
| tag frame | background | `--color-bg-fill-neutral-medium` |
| tag frame | border | `--color-border-default` |
| label | color | `--color-text-secondary` |
| icons | fill | `--color-icon-system-secondary` |

Layout: padding-inline `--space-xs` (8px) · padding-block `--space-2xs` (4px) · gap `--space-2xs` (4px) · radius `--radius-xs` (4px) · border `--stroke-xs`.
Typography: `caption/sm-medium` (12px, 500). Non-interactive — no focus, no hover states.

---

### Toggle

On/off binary control with immediate effect. Not for multi-selection (→ `checkbox` group).

**States:** `default` · `selected` · `focus` + `disabled` prop. Valid combos: 5. `focus + disabled` does not exist.

| Element | State | Property | Token |
|---|---|---|---|
| `track` | default | background | `--color-icon-system-secondary` |
| `track` | selected · focus | background | `--color-icon-status-success` |
| `track` | disabled | background | `--color-icon-system-disabled` |
| `thumb` | default · selected · focus | background | `--color-icon-system-inverse` |
| `thumb` | disabled | background | `--color-icon-system-disabled` |
| focus ring | focus | outline | `--color-focus-ring-default` |

Layout: touch area 48×44px · track 48×24px · thumb 16×16px · radius `--radius-pill` on both.
ARIA: `<button role="switch">` + `aria-checked="true/false"` + `aria-labelledby="[label-id]"`. Label is external and required — the component does not render its own text.

---

### Tooltip

Contextual informative hint. Non-interactive — no links or buttons inside. Not a replacement for visible labels.

**`Type` prop** (arrow position — tooltip appears on the opposite side):
`none` · `left` · `right` · `up` · `down` · `up-left` · `up-right` · `down-left` · `down-right`
Example: `Type=down` → arrow at the bottom → tooltip appears **above** the trigger.

| Element | Property | Token |
|---|---|---|
| `tooltip-body` | background | `--color-bg-fill-inverse-strong` |
| `label` | color | `--color-text-inverse` |
| `arrow` | fill | `--color-bg-fill-inverse-strong` |

Layout: padding-inline `--space-xs` (8px) · padding-block `--space-2xs` (4px) · radius `--radius-xs` (4px) · arrow 12×6px · margin trigger→tooltip `--space-xs` (8px).
Typography: `body/md-regular` (14px, 400). Max ~40 characters.
ARIA: `<span role="tooltip" id="[id]" hidden>`. Trigger: `aria-describedby="[id]"`. Tooltip appears on trigger `focus` — not only on hover (WCAG 1.4.13).

---

## 8. Accessibility Standards

All components are WCAG 2.2 AA compliant. These rules are non-negotiable.

### Contrast

| Pair | Ratio | Level |
|---|---|---|
| `--color-text-primary` on `--color-bg-surface-default` | ≥ 7:1 | AAA |
| `--color-text-secondary` on `--color-bg-surface-default` | ≥ 4.5:1 | AA |
| `--color-text-inverse` on `--color-action-primary-default` | ≥ 4.5:1 | AA |
| `--color-text-inverse` on `--color-action-brand-primary-default` | ≥ 3:1 (large text ≥ 20px bold) | AA Large |
| `--color-text-status-*` on `--color-bg-status-*` | ≥ 4.5:1 | AA |
| `--color-icon-status-*` on `--color-bg-status-*` | ≥ 3:1 | AA Non-text |

### Focus ring — always visible, never suppressed

```css
/* Default surface */
outline: var(--stroke-focus-ring-width) solid var(--color-focus-ring-default);
outline-offset: 2px;
box-shadow: 0 0 0 2px var(--color-focus-ring-gap-default);

/* Inverse surface */
outline: var(--stroke-focus-ring-width) solid var(--color-focus-ring-inverse);
outline-offset: 2px;
box-shadow: 0 0 0 2px var(--color-focus-ring-gap-inverse);
```

### Touch targets

Minimum 44×44px for all interactive elements. Small button (32px height) must have a 44px invisible tap area.

### ARIA & keyboard requirements by pattern

| Pattern | WCAG | Rule |
|---|---|---|
| Error fields | 3.3.1 | `aria-invalid="true"` + visible error text via `aria-describedby` |
| Form labels | 1.3.1 / 2.4.6 | `<label for>` or `aria-labelledby` — placeholder alone is never sufficient |
| Decorative icons | — | `aria-hidden="true"` on SVG |
| Functional icons | 2.5.3 | `aria-label` on the button wrapper — describe the action, not the icon |
| Status messages | 4.1.3 | `role="alert"` (urgent) or `role="status"` (non-urgent) — never silent DOM updates |
| Links | 2.5.3 | Text must describe destination — "ver más" and "clic aquí" are prohibited |
| Icon-only buttons | 2.5.3 | `aria-label` is mandatory — component fails without it |

---

## 9. Do's and Don'ts

### Do
- Always use semantic tokens — `var(--color-action-primary-default)`, never `#1f3644`
- Use `--radius-pill` for buttons, chips, and pill-shaped badges
- Reserve `Brand` button for hero / landing / campaign contexts only
- One `Primary` action per view — multiple primaries cancel each other's hierarchy
- Use `role="alert"` + `aria-live="assertive"` for `danger` and `warning` alerts only
- Include `aria-label` on every `button/icon` and every `badge/indicator dot`
- Apply `elevation-md` or higher only to actionable elements — never on static containers
- Size icons from the `--icon-size-*` scale — never arbitrary pixel values
- Use `neutral` for the base role within a token group, not `default`
- Keep `letter-spacing: 0` — no tracking adjustments in this system

### Don't
- Don't hardcode hex values in component styles — token names are the public API
- Don't use `Brand` button in forms, payment flows, or critical actions
- Don't bind icon fill/color directly on SVG vector nodes — always via context-color mode
- Don't apply `elevation-md` or above on decorative or static containers
- Don't use `danger` where `warning` is appropriate — semantic variants are fixed contracts
- Don't use placeholder as a label substitute — `label` is always visible and required
- Don't remove or suppress focus rings in any context
- Don't skip ARIA attributes on icon-only buttons — `aria-label` is mandatory, not optional
- Don't use component names (`button`, `card`) in semantic token names
- Don't change prop structure or rename tokens without a version bump

---

## 10. Responsive Behavior

### Breakpoints

| Name | Width | Context |
|---|---|---|
| xs | 0px | Mobile base — all styles defined here first |
| sm | 576px | Large mobile / landscape |
| md | 768px | Tablet |
| lg | 1024px | Desktop transition / tablet landscape |
| xl | 1440px | Standard desktop |

Use `rem` in `@media` — not CSS custom properties (browser does not resolve vars in media queries):

```css
@media (min-width: 48rem)  { /* md — tablet */ }
@media (min-width: 64rem)  { /* lg — desktop */ }
@media (min-width: 90rem)  { /* xl — large desktop */ }
```

### Grid collapsing

- 4-col (xs/sm) → 8-col (md) → 12-col (lg/xl)
- Marketing max-width 1280px centered kicks in at `lg`
- Product sidebar (304px fixed) appears at `lg` — content grid adapts
- Navigation: horizontal → hamburger at `md`
- Alerts: always 100% of container width

### Type modes

Two responsive type modes: `mobile` and `desktop`. Display sizes may scale down on mobile — check responsive token values before setting fixed sizes in components.

---

## 11. Versioning & Governance

### Semver rules

| Change | Impact | Bump |
|---|---|---|
| Add new semantic token | Non-breaking | `MINOR` |
| Add new component | Non-breaking | `MINOR` |
| Add new variant/prop to existing component | Non-breaking | `MINOR` |
| Fix token value (same name) | Non-breaking | `PATCH` |
| Rename existing semantic token | **Breaking** | `MAJOR` + 2-sprint notice |
| Remove existing semantic token | **Breaking** | `MAJOR` + 2-sprint notice |
| Change naming convention | **Breaking** | `MAJOR` |

### What is frozen at v0.1.0

- Token naming convention (T/P/R/S format)
- 149 semantic token names — renaming any is a BREAKING CHANGE
- 13 component contracts (props, variants, states)
- Three-layer architecture (primitives → semantics → responsive)

### Source of truth hierarchy

```
Figma Tokens Library  ←  absolute source of truth for all values
Figma Icons Library   ←  source of truth for all icon components
Figma DS Library      ←  consumer only — never defines new values
JSON tokens           ←  exact mirror of Figma Tokens
dist/tokens.css       ←  Style Dictionary output from JSON
*.md docs             ←  exact mirror of Figma DS
```

No layer may introduce values that do not exist in the layer above it.
