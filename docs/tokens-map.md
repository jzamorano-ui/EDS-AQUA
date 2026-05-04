# Tokens semánticos — Referencia completa

Todos los tokens semánticos del Aqua DS. CSS custom properties disponibles en `dist/tokens.css`.

> Para ver los valores resueltos (hex + oklch): `dist/tokens.css`. Para el mapa de alias: `tokens/semantics/*.json` (pipeline repo).

---

## Color — Background (`color/bg`)

### Surface — fondos de página y contenedor

| CSS custom property | Uso |
|---|---|
| `--color-bg-surface-default` | Superficie base — fondo de página, cards en reposo |
| `--color-bg-surface-subtle` | Superficie con contraste mínimo — sección alternada |
| `--color-bg-surface-inverse` | Superficie oscura — dark header, hero inverso |

### Fill — rellenos de elementos

| CSS custom property | Uso |
|---|---|
| `--color-bg-fill-neutral-subtle` | Relleno neutro suave — fondo de input deshabilitado |
| `--color-bg-fill-neutral-medium` | Relleno neutro medio — chips en reposo, tags |
| `--color-bg-fill-neutral-strong` | Relleno neutro fuerte — hover de fila de tabla |
| `--color-bg-fill-brand-subtle` | Relleno de marca suave — selected state ligero |
| `--color-bg-fill-brand-medium` | Relleno de marca medio — botón brand primary |
| `--color-bg-fill-brand-strong` | Relleno de marca fuerte — brand active state |
| `--color-bg-fill-inverse-subtle` | Relleno inverso suave — elemento sobre fondo oscuro |
| `--color-bg-fill-inverse-medium` | Relleno inverso medio — chips sobre fondo oscuro |
| `--color-bg-fill-inverse-strong` | Relleno inverso fuerte — elemento muy destacado sobre fondo oscuro |

### Status — fondos de alerta y notificación

| CSS custom property | Uso |
|---|---|
| `--color-bg-status-neutral` | Fondo neutral — mensaje sin estado semántico |
| `--color-bg-status-info` | Fondo informativo — alert info, toast info |
| `--color-bg-status-success` | Fondo de éxito — alert success, confirmación |
| `--color-bg-status-warning` | Fondo de advertencia — alert warning |
| `--color-bg-status-danger` | Fondo de error — alert danger, campo con error |

### Deco — fondos decorativos

| CSS custom property | Uso |
|---|---|
| `--color-bg-deco-1` | Decorativo aqua — categoría, etiqueta cromática 1 |
| `--color-bg-deco-2` | Decorativo púrpura — categoría, etiqueta cromática 2 |
| `--color-bg-deco-3` | Decorativo slate — categoría, etiqueta cromática 3 |
| `--color-bg-deco-4` | Decorativo pink — categoría, etiqueta cromática 4 |
| `--color-bg-deco-5` | Decorativo sky — categoría, etiqueta cromática 5 |

### Overlay

| CSS custom property | Uso |
|---|---|
| `--color-bg-overlay` | Overlay semitransparente — detrás de modal, drawer |

---

## Color — Action (`color/action`)

Backgrounds de elementos interactivos. `elevation-md` o superior implica interacción.

### System — botones primario, secundario, terciario

| CSS custom property | Uso |
|---|---|
| `--color-action-primary-default` | Botón primary — reposo |
| `--color-action-primary-hover` | Botón primary — hover |
| `--color-action-primary-active` | Botón primary — presionado |
| `--color-action-primary-disabled` | Cualquier botón — estado deshabilitado (token convergente) |
| `--color-action-primary-inverse-default` | Botón primary sobre fondo inverso — reposo |
| `--color-action-primary-inverse-hover` | Botón primary sobre fondo inverso — hover |
| `--color-action-primary-inverse-active` | Botón primary sobre fondo inverso — presionado |
| `--color-action-secondary-default` | Botón secondary — reposo |
| `--color-action-secondary-hover` | Botón secondary — hover |
| `--color-action-secondary-active` | Botón secondary — presionado |
| `--color-action-secondary-inverse-default` | Botón secondary sobre fondo inverso — reposo |
| `--color-action-secondary-inverse-hover` | Botón secondary sobre fondo inverso — hover |
| `--color-action-secondary-inverse-active` | Botón secondary sobre fondo inverso — presionado |
| `--color-action-tertiary-default` | Botón ghost/tertiary — reposo (transparente) |
| `--color-action-tertiary-hover` | Botón ghost/tertiary — hover |
| `--color-action-tertiary-active` | Botón ghost/tertiary — presionado |
| `--color-action-tertiary-inverse-default` | Botón tertiary sobre fondo inverso — reposo |
| `--color-action-tertiary-inverse-hover` | Botón tertiary sobre fondo inverso — hover |
| `--color-action-tertiary-inverse-active` | Botón tertiary sobre fondo inverso — presionado |

### Brand — botones de marca (rojo)

| CSS custom property | Uso |
|---|---|
| `--color-action-brand-primary-default` | Botón brand primary — reposo |
| `--color-action-brand-primary-hover` | Botón brand primary — hover |
| `--color-action-brand-primary-active` | Botón brand primary — presionado |
| `--color-action-brand-secondary-default` | Botón brand secondary — reposo |
| `--color-action-brand-secondary-hover` | Botón brand secondary — hover |
| `--color-action-brand-secondary-active` | Botón brand secondary — presionado |
| `--color-action-brand-tertiary-default` | Botón brand tertiary — reposo (transparente) |
| `--color-action-brand-tertiary-hover` | Botón brand tertiary — hover |
| `--color-action-brand-tertiary-active` | Botón brand tertiary — presionado |

---

## Color — Text (`color/text`)

| CSS custom property | Uso |
|---|---|
| `--color-text-primary` | Texto principal — cuerpo, labels, headings |
| `--color-text-secondary` | Texto secundario — subtítulos, placeholders, helpers |
| `--color-text-inverse` | Texto sobre fondos oscuros / inversos |
| `--color-text-disabled` | Texto en estado deshabilitado |
| `--color-text-brand` | Texto de acento de marca — uso ≥ 18pt únicamente |
| `--color-text-brand-strong` | Texto de marca con mayor contraste |
| `--color-text-link-default` | Link — reposo |
| `--color-text-link-hover` | Link — hover |
| `--color-text-link-active` | Link — presionado |
| `--color-text-status-info` | Texto informativo — mensajes, labels de estado info |
| `--color-text-status-success` | Texto de éxito |
| `--color-text-status-warning` | Texto de advertencia |
| `--color-text-status-danger` | Texto de error — mensajes de validación |

---

## Color — Icon (`color/icon`)

### System — iconos de interfaz

| CSS custom property | Uso |
|---|---|
| `--color-icon-system-primary` | Ícono principal — contexto claro |
| `--color-icon-system-secondary` | Ícono secundario — contraste reducido |
| `--color-icon-system-disabled` | Ícono deshabilitado |
| `--color-icon-system-inverse` | Ícono sobre fondos oscuros |

### Status — iconos de estado

| CSS custom property | Uso |
|---|---|
| `--color-icon-status-info` | Ícono informativo |
| `--color-icon-status-success` | Ícono de éxito |
| `--color-icon-status-warning` | Ícono de advertencia |
| `--color-icon-status-danger` | Ícono de error |

### Brand — iconos de marca

| CSS custom property | Uso |
|---|---|
| `--color-icon-brand-primary` | Ícono de marca — nivel primario |
| `--color-icon-brand-secondary` | Ícono de marca — nivel secundario |
| `--color-icon-brand-strong` | Ícono de marca — alto contraste |
| `--color-icon-brand-contrast` | Ícono de marca sobre fondo rojo |

---

## Color — Border (`color/border`)

| CSS custom property | Uso |
|---|---|
| `--color-border-default` | Borde estándar — input en reposo, card, divider |
| `--color-border-focus` | Borde de focus accesible — ring exterior |
| `--color-border-disabled` | Borde de elemento deshabilitado |
| `--color-border-inverse` | Borde sobre fondos oscuros |
| `--color-border-danger-focus` | Borde de campo con error + focus simultáneo |
| `--color-border-divider-default` | Divider horizontal/vertical estándar |
| `--color-border-divider-brand` | Divider de acento de marca |
| `--color-border-divider-inverse` | Divider sobre fondo oscuro |
| `--color-border-status-info` | Borde de alert/card info |
| `--color-border-status-success` | Borde de alert/card success |
| `--color-border-status-warning` | Borde de alert/card warning |
| `--color-border-status-danger` | Borde de alert/card danger |

---

## Color — Focus (`color/focus`)

| CSS custom property | Uso |
|---|---|
| `--color-focus-ring-default` | Anillo de focus — sobre fondos claros |
| `--color-focus-ring-inverse` | Anillo de focus — sobre fondos oscuros |
| `--color-focus-ring-gap-default` | Gap entre elemento y anillo — fondos claros |
| `--color-focus-ring-gap-inverse` | Gap entre elemento y anillo — fondos oscuros |

---

## Space (`space`)

| CSS custom property | Valor | Uso típico |
|---|---|---|
| `--space-none` | 0px | Sin espaciado intencional |
| `--space-2xs` | 4px | Micro separación — badge gap, chip internal |
| `--space-xs` | 8px | Separación mínima — icon-text gap, list tight |
| `--space-sm` | 12px | Separación corta — padding interno compacto |
| `--space-md` | 16px | Separación base — padding estándar de componente |
| `--space-lg` | 24px | Separación entre bloques cercanos |
| `--space-xl` | 32px | Separación entre grupos |
| `--space-2xl` | 48px | Separación entre bloques importantes |
| `--space-3xl` | 64px | Separación entre secciones |

---

## Radius (`radius`)

| CSS custom property | Valor | Uso típico |
|---|---|---|
| `--radius-none` | 0px | Sin redondeo — tablas, layouts cuadrados |
| `--radius-xs` | 4px | Tags, badges, chips compactos |
| `--radius-sm` | 8px | Botones, inputs, dropdowns, tooltips |
| `--radius-md` | 12px | Componentes medianos, selects, menús |
| `--radius-lg` | 16px | Cards pequeñas, popovers |
| `--radius-xl` | 24px | Cards grandes, modales |
| `--radius-2xl` | 32px | Bottom sheets, paneles flotantes |
| `--radius-pill` | 999px | Pills, avatares, badges circulares |

---

## Stroke (`stroke`)

| CSS custom property | Valor | Uso típico |
|---|---|---|
| `--stroke-none` | 0px | Sin borde |
| `--stroke-xs` | 1px | Bordes de input, dividers sutiles, cards |
| `--stroke-sm` | 2px | Bordes hover/focus, separadores visibles |
| `--stroke-md` | 4px | Bordes de énfasis, selección especial |
| `--stroke-focus-ring-width` | 2px | Ancho del anillo de focus — alias convergente de `stroke-sm` |

---

## Elevation (`elevation`)

| CSS custom property | Uso | ¿Implica interacción? |
|---|---|---|
| `--elevation-none` | Superficie base, layout, fondos | No |
| `--elevation-sm` | Separación sutil entre bloques | No |
| `--elevation-md` | Cards, botones accionables | Sí |
| `--elevation-lg` | Dropdown, tooltip, flotantes | Sí |
| `--elevation-top-md` | Modal, drawer, overlay | Sí |

> `elevation-md` o superior indica al usuario que el elemento es accionable. No aplicar a contenedores estáticos.

---

## Icon size (`icon/size`)

| CSS custom property | Valor | Uso típico |
|---|---|---|
| `--icon-size-xs` | 16px | Touch-only, badges muy compactos |
| `--icon-size-sm` | 20px | Labels inline, chips |
| `--icon-size-md` | 24px | **Default universal** — frame 24×24, área visual 20×20 |
| `--icon-size-lg` | 32px | Botones con ícono, inputs, formularios |
| `--icon-size-xl` | 40px | Navegación principal, tabs, secciones |
| `--icon-size-2xl` | 48px | Estados vacíos, ilustraciones de soporte |
| `--icon-size-3xl` | 56px | Hero sections, destacados editoriales |
| `--icon-size-4xl` | 64px | Onboarding, ilustraciones grandes |

---

## Tipografía — estilos de texto

Los estilos de tipo no se exponen como CSS custom properties individuales — se aplican como clases de texto o variables compuestas. Noto Sans en 3 pesos: Regular (400), Medium (500), Bold (700).

| Estilo | Size | Weight | Line-height |
|---|---|---|---|
| `display/xl-bold` | 64px | 700 | 72px |
| `headline/lg-bold` | 48px | 700 | 64px |
| `headline/md-bold` | 40px | 700 | 48px |
| `headline/sm-bold` | 32px | 700 | 40px |
| `title/lg-bold` | 24px | 700 | 32px |
| `title/lg-medium` | 24px | 500 | 32px |
| `title/md-bold` | 20px | 700 | 28px |
| `title/md-medium` | 20px | 500 | 28px |
| `title/sm-bold` | 18px | 700 | 26px |
| `title/sm-medium` | 18px | 500 | 26px |
| `title/xs-bold` | 14px | 700 | 20px |
| `body/xl-bold` | 20px | 700 | 28px |
| `body/xl-medium` | 20px | 500 | 28px |
| `body/xl-regular` | 20px | 400 | 28px |
| `body/lg-bold` | 16px | 700 | 24px |
| `body/lg-medium` | 16px | 500 | 24px |
| `body/lg-regular` | 16px | 400 | 24px |
| `body/md-bold` | 14px | 700 | 20px |
| `body/md-medium` | 14px | 500 | 20px |
| `body/md-regular` | 14px | 400 | 20px |
| `caption/sm-medium` | 12px | 500 | 16px |
| `caption/sm-regular` | 12px | 400 | 16px |

---

## Layout — Breakpoints

Disponibles en `dist/layout.css`. No usar como CSS vars en `@media` — usar rem directamente.

| Token CSS | Valor |
|---|---|
| `--breakpoint-xs` | 0px — mobile-first base |
| `--breakpoint-sm` | 576px / 36rem |
| `--breakpoint-md` | 768px / 48rem |
| `--breakpoint-lg` | 1024px / 64rem |
| `--breakpoint-xl` | 1440px / 90rem |

---

## Layout — Grid

Tres sistemas de grid responsivos. Cada uno tiene variantes por breakpoint: `-mobile` · `-tablet` · `-desktop` · `-desktop-lg`.

### Grid Base — layouts de producto estándar

| CSS custom property | mobile | tablet | desktop | desktop-lg |
|---|---|---|---|---|
| `--grid-base-columns-{bp}` | 4 | 8 | 12 | 12 |
| `--grid-base-gutter-{bp}` | 16px | 24px | 24px | 24px |
| `--grid-base-margin-{bp}` | 16px | 24px | 32px | 32px |

### Grid Product — interfaces de aplicación

| CSS custom property | mobile | tablet | desktop | desktop-lg |
|---|---|---|---|---|
| `--grid-product-columns-{bp}` | 4 | 8 | 12 | 12 |
| `--grid-product-gutter-{bp}` | 16px | 24px | 24px | 24px |
| `--grid-product-margin-{bp}` | 16px | 24px | 32px | 32px |

### Grid Marketing — páginas de landing y comunicación

| CSS custom property | mobile | tablet | desktop | desktop-lg |
|---|---|---|---|---|
| `--grid-marketing-columns-{bp}` | 4 | 8 | 12 | 12 |
| `--grid-marketing-gutter-{bp}` | 16px | 24px | 24px | 24px |
| `--grid-marketing-margin-{bp}` | 16px | 24px | 80px | 320px |

---

## Layout — Container y Viewport

| CSS custom property | mobile | tablet | desktop | desktop-lg |
|---|---|---|---|---|
| `--container-max-width-{bp}` | 0 (full) | 0 (full) | 1280px | 1280px |
| `--viewport-width-{bp}` | 375px | 768px | 1440px | 1920px |
| `--viewport-height-{bp}` | 812px | 1024px | 1024px | 1080px |
