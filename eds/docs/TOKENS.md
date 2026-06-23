# TOKENS — sistema EDS (vista `--eds-*` que consume dev)

> Generado de `src/tokens.generated.mjs`. Valores: single-source desde Aqua.

## 1. Rol / intención  (prop `color=`)

Cada intención: tonos MUI (`main/light/dark/contrastText`) + **estados** (`hover/active/disabled`) + `subtle`.

| intención | main | light | dark | contrastText | hover | active | subtle |
|---|---|---|---|---|---|---|---|
| **primary** | `#1f3644` | `#304d5f` | `#0f202b` | `#ffffff` | `#304d5f` | `#0f202b` | `#f4f7f9` |
| **secondary** | `#e2e9ee` | `#f4f7f9` | `#9bb3c3` | `#0f202b` | `#becdd8` | `#9bb3c3` | `#f4f7f9` |
| **brand** | `#ff585c` | `#ffc7c3` | `#9b1020` | `#ffffff` | `#d2353f` | `#9b1020` | `#ffe5e3` |
| **error** | `#9b1020` | `#fff4f3` | `#9b1020` | `#ffffff` | `—` | `—` | `#fff4f3` |
| **warning** | `#bf7900` | `#fcf6ef` | `#8b5700` | `#ffffff` | `—` | `—` | `#fcf6ef` |
| **info** | `#0036af` | `#f3f7ff` | `#002a90` | `#ffffff` | `—` | `—` | `#f3f7ff` |
| **success** | `#006b27` | `#f3f9f3` | `#00531d` | `#ffffff` | `—` | `—` | `#f3f9f3` |

> CSS var: `--eds-palette-primary-main`, `--eds-palette-brand-hover`, etc. `brand` es color custom (`color="brand"`).

## 2. Superficies & neutrales

| token | valor |
|---|---|
| `--eds-palette-text-primary` | `#0f202b` |
| `--eds-palette-text-secondary` | `#737373` |
| `--eds-palette-text-disabled` | `#ababab` |
| `--eds-palette-text-inverse` | `#ffffff` |
| `--eds-palette-text-brand` | `#ff585c` |
| `--eds-palette-text-brandStrong` | `#9b1020` |
| `--eds-palette-text-icon` | `#0f202b` |
| `--eds-palette-background-default` | `#f4f7f9` |
| `--eds-palette-background-paper` | `#ffffff` |
| `--eds-palette-background-inverse` | `#0f202b` |
| `--eds-palette-divider` | `#e7e7e7` |
| `--eds-palette-grey-50` | `#f7f7f7` |
| `--eds-palette-grey-100` | `#e7e7e7` |
| `--eds-palette-grey-200` | `#c9c9c9` |
| `--eds-palette-grey-300` | `#ababab` |
| `--eds-palette-grey-400` | `#8f8f8f` |
| `--eds-palette-grey-500` | `#737373` |
| `--eds-palette-grey-600` | `#5c5c5c` |
| `--eds-palette-grey-700` | `#464646` |
| `--eds-palette-grey-800` | `#313131` |
| `--eds-palette-grey-900` | `#1e1e1e` |

_`action` = overlays de interacción de MUI (listas/menús/ripple): `active` · `hover` · `selected` · `disabled` · `disabledBackground` · `focus`_

## 3. Augmentation por rol 🆓

### fill

| token | valor |
|---|---|
| `--eds-palette-fill-neutralSubtle` | `#ffffff` |
| `--eds-palette-fill-neutralMedium` | `#f7f7f7` |
| `--eds-palette-fill-neutralStrong` | `#e7e7e7` |
| `--eds-palette-fill-inverseSubtle` | `#e2e9ee` |
| `--eds-palette-fill-inverseMedium` | `#5b7f95` |
| `--eds-palette-fill-inverseStrong` | `#0f202b` |
| `--eds-palette-fill-brandSubtle` | `#ffe5e3` |
| `--eds-palette-fill-brandMedium` | `#ff585c` |
| `--eds-palette-fill-brandStrong` | `#d2353f` |

### deco

| token | valor |
|---|---|
| `--eds-palette-deco-1` | `#dbf0ed` |
| `--eds-palette-deco-2` | `#ece4ff` |
| `--eds-palette-deco-3` | `#e2e9ee` |
| `--eds-palette-deco-4` | `#f8d3eb` |
| `--eds-palette-deco-5` | `#d1e3fa` |

### focus

| token | valor |
|---|---|
| `--eds-palette-focus-ring` | `#0043ce` |
| `--eds-palette-focus-gap` | `#f3f7ff` |
| `--eds-palette-focus-inverse` | `#ffffff` |
| `--eds-palette-focus-gapInverse` | `#1f3644` |

### link

| token | valor |
|---|---|
| `--eds-palette-link-default` | `#1f3644` |
| `--eds-palette-link-hover` | `#304d5f` |
| `--eds-palette-link-active` | `#0f202b` |

### border

| token | valor |
|---|---|
| `--eds-palette-border-default` | `#c9c9c9` |
| `--eds-palette-border-focus` | `#0f202b` |
| `--eds-palette-border-dangerFocus` | `#9b1020` |
| `--eds-palette-border-disabled` | `#e7e7e7` |
| `--eds-palette-border-dividerDefault` | `#e7e7e7` |
| `--eds-palette-border-dividerBrand` | `#ff585c` |
| `--eds-palette-border-dividerInverse` | `#ffffff` |
| `--eds-palette-border-inverse` | `#ffffff` |
| `--eds-palette-border-statusDanger` | `#ffc7c3` |
| `--eds-palette-border-statusInfo` | `#9ebefb` |
| `--eds-palette-border-statusSuccess` | `#aed2b2` |
| `--eds-palette-border-statusWarning` | `#fed9af` |

### icon

| token | valor |
|---|---|
| `--eds-palette-icon-systemPrimary` | `#0f202b` |
| `--eds-palette-icon-systemSecondary` | `#737373` |
| `--eds-palette-icon-systemDisabled` | `#ababab` |
| `--eds-palette-icon-systemInverse` | `#ffffff` |
| `--eds-palette-icon-brandPrimary` | `#ff585c` |
| `--eds-palette-icon-brandSecondary` | `#ffc7c3` |
| `--eds-palette-icon-brandStrong` | `#9b1020` |
| `--eds-palette-icon-brandContrast` | `#ffffff` |

### onInverse

| token | valor |
|---|---|
| `--eds-palette-onInverse-primary` | `#ffffff` |
| `--eds-palette-onInverse-primaryHover` | `#f4f7f9` |
| `--eds-palette-onInverse-primaryActive` | `#e2e9ee` |

### status — multi-canal (feedback: alert/badge)

| | bg | text | icon | border |
|---|---|---|---|---|
| danger | `#fff4f3` | `#9b1020` | `#9b1020` | `#ffc7c3` |
| info | `#f3f7ff` | `#002a90` | `#0036af` | `#9ebefb` |
| success | `#f3f9f3` | `#00531d` | `#006b27` | `#aed2b2` |
| warning | `#fcf6ef` | `#8b5700` | `#bf7900` | `#fed9af` |

## Escalas no-color 🆓 (CSS vars + theme.eds.*)

**space:** `--eds-space-none`=0px · `--eds-space-2xs`=4px · `--eds-space-xs`=8px · `--eds-space-sm`=12px · `--eds-space-md`=16px · `--eds-space-lg`=24px · `--eds-space-xl`=32px · `--eds-space-2xl`=48px · `--eds-space-3xl`=64px

**radius:** `--eds-radius-none`=0px · `--eds-radius-xs`=4px · `--eds-radius-sm`=8px · `--eds-radius-md`=12px · `--eds-radius-lg`=16px · `--eds-radius-xl`=24px · `--eds-radius-2xl`=32px · `--eds-radius-pill`=999px

**stroke:** `--eds-stroke-none`=0px · `--eds-stroke-xs`=1px · `--eds-stroke-sm`=2px · `--eds-stroke-md`=4px · `--eds-stroke-focusRing`=2px

**iconSize:** `--eds-icon-size-xs`=16px · `--eds-icon-size-sm`=20px · `--eds-icon-size-md`=24px · `--eds-icon-size-lg`=32px · `--eds-icon-size-xl`=40px · `--eds-icon-size-2xl`=48px · `--eds-icon-size-3xl`=56px · `--eds-icon-size-4xl`=64px

## Typography — Noto Sans

**fontFamily:** `'Noto Sans', system-ui, sans-serif`

### 22 variants de la propuesta 🆓

| variant | size / weight / lh |
|---|---|
| `bodyLgBold` | 16px / 700 / 24px |
| `bodyLgMedium` | 16px / 500 / 24px |
| `bodyLgRegular` | 16px / 400 / 24px |
| `bodyMdBold` | 14px / 700 / 20px |
| `bodyMdMedium` | 14px / 500 / 20px |
| `bodyMdRegular` | 14px / 400 / 20px |
| `bodyXlBold` | 20px / 700 / 28px |
| `bodyXlMedium` | 20px / 500 / 28px |
| `bodyXlRegular` | 20px / 400 / 28px |
| `captionSmMedium` | 12px / 500 / 16px |
| `captionSmRegular` | 12px / 400 / 16px |
| `displayXlBold` | 64px / 700 / 72px |
| `headlineLgBold` | 48px / 700 / 64px |
| `headlineMdBold` | 40px / 700 / 48px |
| `headlineSmBold` | 32px / 700 / 40px |
| `titleLgBold` | 24px / 700 / 32px |
| `titleLgMedium` | 24px / 500 / 32px |
| `titleMdBold` | 20px / 700 / 28px |
| `titleMdMedium` | 20px / 500 / 28px |
| `titleSmBold` | 18px / 700 / 26px |
| `titleSmMedium` | 18px / 500 / 26px |
| `titleXsBold` | 14px / 700 / 20px |

### aliases estándar MUI 🔒

| variant | size / weight / lh |
|---|---|
| `h1` | 64px / 700 / 72px |
| `h2` | 48px / 700 / 64px |
| `h3` | 40px / 700 / 48px |
| `h4` | 32px / 700 / 40px |
| `h5` | 24px / 500 / 32px |
| `h6` | 20px / 500 / 28px |
| `subtitle1` | 18px / 500 / 26px |
| `subtitle2` | 14px / 500 / 20px |
| `body1` | 16px / 400 / 24px |
| `body2` | 14px / 400 / 20px |
| `button` | 14px / 500 / 20px · none |
| `caption` | 12px / 400 / 16px |
| `overline` | 12px / 500 / 16px · uppercase |
