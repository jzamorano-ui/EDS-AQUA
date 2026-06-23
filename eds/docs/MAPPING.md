# MAPPING — Aqua → EDS (estructura MUI v5.18)

> Referencia **canónica** de la que sale el theme. Valores = los ideales de Aqua (single-source).
> 🔒 = slot que **MUI exige** (sus componentes lo leen) · 🆓 = naming **nuestro** (augmentation/escala).
> Naming centralizado en `const NS='eds'` → rename futuro = 1 línea.

---

## 1. Palette 🔒 (slots fijos de MUI)

| EDS slot | Valor | Origen Aqua |
|---|---|---|
| `primary.main` | `#1f3644` | action/primary/default |
| `primary.light` | `#304d5f` | action/primary/hover |
| `primary.dark` | `#0f202b` | action/primary/active |
| `primary.contrastText` | `#ffffff` | text/inverse |
| `secondary.main` | `#ff585c` | action/brand/primary/default (coral) |
| `secondary.light` | `#ffc7c3` | icon/brand/secondary |
| `secondary.dark` | `#9b1020` | action/brand/primary/active |
| `secondary.contrastText` | `#ffffff` | text/inverse |
| `error.main` | `#9b1020` | icon/status/danger |
| `error.light` | `#fff4f3` | bg/status/danger |
| `error.dark` | `#9b1020` | text/status/danger |
| `error.contrastText` | `#ffffff` | text/inverse |
| `warning.main` | `#bf7900` | icon/status/warning |
| `warning.light` | `#fcf6ef` | bg/status/warning |
| `warning.dark` | `#8b5700` | text/status/warning |
| `info.main` | `#0036af` | icon/status/info |
| `info.light` | `#f3f7ff` | bg/status/info |
| `info.dark` | `#002a90` | text/status/info |
| `success.main` | `#006b27` | icon/status/success |
| `success.light` | `#f3f9f3` | bg/status/success |
| `success.dark` | `#00531d` | text/status/success |
| `text.primary` | `#0f202b` | text/primary |
| `text.secondary` | `#737373` | text/secondary |
| `text.disabled` | `#ababab` | text/disabled |
| `text.icon` | `#0f202b` | icon/system/primary *(MUI lo espera — ver GAPS)* |
| `background.default` | `#f4f7f9` | bg/surface/subtle |
| `background.paper` | `#ffffff` | bg/surface/default |
| `divider` | `#e7e7e7` | border/divider/default |
| `common.black` | `#0f202b` | bg/surface/inverse |
| `common.white` | `#ffffff` | — |
| `action.active` | `#0f202b` | icon/system/primary |
| `action.hover` | `#f4f7f9` | action/tertiary/hover |
| `action.selected` | `#e2e9ee` | action/tertiary/active |
| `action.disabled` | `#ababab` | text/disabled |
| `action.disabledBackground` | `#f7f7f7` | action/primary/disabled |
| `action.focus` | `#f3f7ff` | focus/ring/gap/default |
| `grey.50…900` | ramp `gray/*` ↓ | color/gray (neutro real) |

**`grey` exacto (← `color/gray/*` de Figma):**
`50 #F7F7F7 · 100 #E7E7E7 · 200 #C9C9C9 · 300 #ABABAB · 400 #8F8F8F · 500 #737373 · 600 #5C5C5C · 700 #464646 · 800 #313131 · 900 #1E1E1E`

> Nota: `primary` usa el ramp **`slate/*`** (navy de marca): slate/800 #1F3644 (main) · slate/700 #304D5F (light) · slate/900 #0F202B (dark). El `grey.*` de MUI usa **`gray/*`** (neutro). Son ramps distintos.
> `light/dark` de error/warning/info/success se asignan de nuestro bg/text-status. `contrastText` explícito = `#ffffff` salvo casos claros (ver GAPS #7).

---

## 2. Augmentation 🆓 (lo nuestro que MUI no tiene — naming definido)

### Estados por color (preserva nuestro modelo)
`palette.{primary,secondary}.{hover,active,disabled}` → emite `--eds-palette-primary-hover`, etc.
- `primary.hover #304d5f` · `primary.active #0f202b` · `primary.disabled #f7f7f7`
- `secondary.hover #d2353f` · `secondary.active #9b1020`

### `palette.brand` (coral de marca)
`main #ff585c · hover #d2353f · active #9b1020 · subtle #ffe5e3 · strong #9b1020 · contrast #ffffff`

### `palette.fill` (rellenos)
- neutral: `Subtle #ffffff · Medium #f7f7f7 · Strong #e7e7e7`
- inverse: `Subtle #e2e9ee · Medium #5b7f95 · Strong #0f202b`
- brand: `Subtle #ffe5e3 · Medium #ff585c · Strong #d2353f`

### `palette.deco.{1..5}`
`1 #dbf0ed · 2 #ece4ff · 3 #e2e9ee · 4 #f8d3eb · 5 #d1e3fa`

### `palette.status.{danger,info,success,warning}.{bg,text,icon,border}` (multi-canal)
| | bg | text | icon | border |
|---|---|---|---|---|
| danger | `#fff4f3` | `#9b1020` | `#9b1020` | `#ffc7c3` |
| info | `#f3f7ff` | `#002a90` | `#0036af` | `#9ebefb` |
| success | `#f3f9f3` | `#00531d` | `#006b27` | `#aed2b2` |
| warning | `#fcf6ef` | `#8b5700` | `#bf7900` | `#fed9af` |
| neutral | `#f7f7f7` | — | — | — |

### `palette.focus`
`ring #0043ce · gap #f3f7ff · inverse #ffffff · gapInverse #1f3644`

### `palette.link`
`default #1f3644 · hover #304d5f · active #0f202b`

---

## 3. Typography 🔒 (variants MUI ← escala Aqua)
| EDS variant | size/weight/lh | Origen |
|---|---|---|
| `h1` | 64 / 700 / 72 | display-xl-bold |
| `h2` | 48 / 700 / 64 | headline-lg-bold |
| `h3` | 40 / 700 / 48 | headline-md-bold |
| `h4` | 32 / 700 / 40 | headline-sm-bold |
| `h5` | 24 / 500 / 32 | title-lg-medium |
| `h6` | 20 / 500 / 28 | title-md-medium |
| `body1` | 16 / 400 / 24 | body-lg-regular |
| `body2` | 14 / 400 / 20 | body-md-regular |
| `button` | 14 / 500 / 20 · `textTransform:none` | body-md-medium |
| `caption` | 12 / 400 / 16 | caption-sm-regular |
| `fontFamily` | `'Noto Sans', system-ui, sans-serif` | type/family/base ✅ |

---

## 4. Escalas no-color 🆓 (doble salida: `theme.eds.*` + `--eds-*`)
| Escala | Valores |
|---|---|
| `eds.space` | none 0 · 2xs 4 · xs 8 · sm 12 · md 16 · lg 24 · xl 32 · 2xl 48 · 3xl 64 |
| `eds.radius` | none 0 · xs 4 · sm 8 · md 12 · lg 16 · xl 24 · 2xl 32 · pill 999 |
| `eds.stroke` | none 0 · xs 1 · sm 2 · md 4 · focusRing 2 |
| `eds.iconSize` | xs 16 · sm 20 · md 24 · lg 32 · xl 40 · 2xl 48 · 3xl 56 · 4xl 64 |

`shape.borderRadius` 🔒 = `8` (radius/sm, base de MUI). `spacing` 🔒 = `8` (base; la escala nombrada va en `eds.space`).

---

## 5. Shadows 🔒 `shadows[0..24]` ← elevation Aqua
| Aqua | Valor |
|---|---|
| none | `none` |
| sm | `0px 2px 4px 0px rgba(49,49,49,0.08)` |
| md | `0px 4px 12px 0px rgba(49,49,49,0.10)` |
| lg | `0px 8px 24px 0px rgba(49,49,49,0.12)` |

Distribución de los 25 slots → ver GAPS (decidir índices).

---

## 6. Reglas firmes
- **Valores reales (hex), NUNCA `var()`-chaining** → rompe los `*Channel` (alpha de MUI).
- **Solo color emite CSS vars** (palette). Escalas no-color = `theme.eds.*` + `eds-scales.css` (`:root`).
- **Single-source:** estos valores salen de los primitives de Aqua; el build los lee, no se tipean dos veces.
