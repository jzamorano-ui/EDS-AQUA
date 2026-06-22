# Aqua DS — Iconos

Set de íconos consumible por dev, generado desde la librería Figma con
`scripts/build-icons.mjs`. **Figma es la fuente de verdad** — re-correr el script resync.

## ⚡ Lo que dev tiene que saber sobre el color

Los íconos **no traen color hardcodeado** (salvo brand). El color sale de **tokens** del DS,
así un mismo SVG funciona en cualquier estado y respeta dark mode. Hay 3 comportamientos:

| Familia | En el SVG | Cómo se colorea | Dev hace… |
|---|---|---|---|
| **system** (121) | `fill="currentColor"` | hereda el `color` CSS del contenedor | nada (default) o cambia `color` |
| **semantic** (5) | `style="fill:var(--color-icon-status-*, #fallback)"` | **ya viene bindeado** a su token de estado | **nada** — ya sale con su color |
| **brand** (31) | `style="fill:var(--color-icon-brand-*, #fb)"` | bindeado a 3 tokens icon/brand (primary·secondary·contrast) | nada — themeable |

> **Gotcha (por qué semantic usa `style=` y no `fill=`):** `var()` **no se evalúa** en el atributo de
> presentación `fill="..."` (solo `currentColor`, que es keyword, funciona ahí). Por eso el color del token
> va en un `style="fill:var(...)"` (contexto CSS, sí evalúa `var()`). El hex queda como **fallback** para
> que el ícono se vea aunque no haya tokens cargados; cuando `tokens.css` está presente, **manda el token** (themeable).

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

## Inventario y novedades — saber qué cambió

El build es un **rebuild completo** (siempre en sync con Figma — captura íconos nuevos **y**
los que se modificaron). No exporta "solo los nuevos" a propósito: así no se escapa un ícono
redibujado. Para identificar qué cambió hay dos vías:

1. **Reporte del build** — al terminar imprime el diff contra la corrida anterior:
   ```
   · Cambios desde la corrida anterior:
     + Nuevos (2): system/qr, brand/vacuna
     ~ Modificados (1): system/buscar
     - Eliminados (0): —
   ```
2. **`index.json` versionado en git** — es el inventario (con un `hash` de contenido por ícono).
   Está **trackeado** (a diferencia de los SVG/sprite, que son output regenerable e ignorado).
   Tras un rebuild, `git diff src/icons/index.json` muestra:
   - íconos **nuevos** → líneas agregadas
   - **eliminados** → líneas quitadas
   - **modificados** → cambia el `hash`

Flujo al sumar íconos en Figma: re-correr el script → leer el reporte → `git diff` confirma →
commitear `index.json`. Los SVG nuevos quedan en `src/icons/svg/<familia>/` listos para el dist.

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
El fill va en `style="fill:var(--color-icon-status-danger, #9B1020)"` — **sale rojo solo**, sin clase, y
themeable (el token manda; el hex es fallback). El glifo interno es un knockout blanco.

### brand (multicolor de marca)
```html
<svg class="icon icon--lg"><use href="/icons/icons.svg#brand-hospital"/></svg>
```
Usan los 3 tokens `--color-icon-brand-{primary, secondary, contrast}`, bindeados en el SVG vía
`style="fill:var(...)"` (hex como fallback). Salen con su color de marca y son **themeable**.
`currentColor` no aplica; solo se les da tamaño.

## Accesibilidad

- **Decorativo** (junto a texto): `aria-hidden="true"` en el `<svg>`.
- **Funcional** (ícono solo): `<button>` con `aria-label`, o `role="img"` + `aria-label`.

## ⚠️ Prueba local

El sprite **externo** (`<use href="icons.svg#id">`) solo funciona servido por **HTTP**, no con
`file://`. Para validar local: abrí `_demo.html` (inlinea el sprite y los tokens) o serví con `npx serve`.
