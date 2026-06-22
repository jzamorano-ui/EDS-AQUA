# Aqua DS — Iconos

Set de íconos consumible por dev, generado desde la librería Figma con
`scripts/build-icons.mjs`. **Figma es la fuente de verdad** — re-correr el script resync.

## ⚡ Lo que dev tiene que saber sobre el color

Los íconos **no traen color hardcodeado** (salvo brand). El color sale de **tokens** del DS,
así un mismo SVG funciona en cualquier estado y respeta dark mode. Hay 3 comportamientos:

| Familia | En el SVG | Cómo se colorea | Dev hace… |
|---|---|---|---|
| **system** (121) | `fill="currentColor"` | hereda el `color` CSS del contenedor | nada (default) o cambia `color` |
| **semantic** (5) | `fill="var(--color-icon-status-*)"` | **ya viene bindeado** a su token de estado | **nada** — ya sale con su color |
| **brand** (31) | colores propios | multicolor intrínseco | nada — no recolorear |

### `currentColor` (system) — esto es lo clave

Los íconos **system** pintan con **`currentColor`**: el `fill` del SVG **hereda la propiedad
`color` de CSS**. No tienen color propio. Esto significa:

```html
<!-- toma el color del contenedor -->
<span style="color: var(--color-icon-system-primary)">
  <svg class="icon"><use href="/icons/icons.svg#system-buscar"/></svg>
</span>
```

- Por defecto, `icons.css` ya les pone `color: var(--color-icon-system-primary)` → **salen con color sin hacer nada**.
- Para cambiarlo, seteás `color` (o usás un modifier): el ícono sigue al color del texto.
- **Un solo SVG sirve para todos los colores y estados** (primary, disabled, inverse, error…).

```css
.icon            { color: var(--color-icon-system-primary); }  /* default, en icons.css */
.icon--secondary { color: var(--color-icon-system-secondary); }
.icon--disabled  { color: var(--color-icon-system-disabled); }
.icon--inverse   { color: var(--color-icon-system-inverse); }  /* sobre fondo oscuro */
.field--error .icon { color: var(--color-icon-status-danger); }  /* contextual */
```

> ⚠️ `currentColor` **no es un color**: es "usá el `color` actual". Si el contenedor no define `color`,
> el ícono hereda el del texto. `icons.css` ya da un default sensato, así que no es un problema.

## Regenerar

```bash
FIGMA_TOKEN=figd_xxx node scripts/build-icons.mjs
```

## Contenido

| Archivo | Qué es |
|---|---|
| `icons.svg` | Sprite con `<symbol id="<familia>-<nombre>">` (157) |
| `icons.css` | Tamaños (`.icon--sm/md/lg…`) + color por defecto de system |
| `svg/<familia>/<nombre>.svg` | SVG individual |
| `index.json` | Manifest por familia `{ viewBox, color }` |
| `_demo.html` | Galería de validación |

> Los ids del sprite llevan **prefijo de familia**: `system-buscar`, `semantic-danger`, `brand-hospital`.

## Consumo

### Setup (una vez)
```html
<link rel="stylesheet" href="/dist/tokens.css">   <!-- define los tokens -->
<link rel="stylesheet" href="/icons/icons.css">    <!-- tamaños + default de color -->
```

### system
```html
<svg class="icon icon--md"><use href="/icons/icons.svg#system-buscar"/></svg>
```
Sale en `icon-system-primary`. Cambiás el color con `color` o un modifier (`.icon--disabled`, etc.).

### semantic (ya viene con su color)
```html
<svg class="icon icon--md"><use href="/icons/icons.svg#semantic-danger"/></svg>
```
El fill está bindeado a `--color-icon-status-danger` — **sale rojo solo**, sin clase. Themeable.
(El glifo interno es un knockout blanco; pensados para mostrarse en su color de estado.)

### brand (multicolor)
```html
<svg class="icon icon--lg"><use href="/icons/icons.svg#brand-hospital"/></svg>
```
Traen su color propio. `currentColor` no aplica: solo se les da tamaño.

## Accesibilidad

- **Decorativo** (junto a texto): `aria-hidden="true"` en el `<svg>`.
- **Funcional** (ícono solo): `<button>` con `aria-label`, o `role="img"` + `aria-label`.

## ⚠️ Prueba local

El sprite **externo** (`<use href="icons.svg#id">`) solo funciona servido por **HTTP**, no con
`file://`. Para validar local: abrí `_demo.html` (inlinea el sprite y los tokens) o serví con `npx serve`.
