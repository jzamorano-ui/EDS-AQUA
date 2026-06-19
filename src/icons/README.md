# Aqua DS — Iconos

Set de íconos consumible por dev, generado desde la librería Figma con
`scripts/build-icons.mjs`. **Figma es la fuente de verdad** — re-correr el script resync.

## Regenerar

```bash
FIGMA_TOKEN=figd_xxx node scripts/build-icons.mjs
```

## Tres familias

| Familia | Cant. | Color | Cómo se consume |
|---|---|---|---|
| **system** | 121 | mono, `currentColor` | dev aplica el color con un token (`--color-icon-system-*`) |
| **semantic** | 5 | dos tonos: `currentColor` + knockout blanco | dev aplica el token de estado (`--color-icon-status-*`) |
| **brand** | 31 | **multicolor** (color propio) | se usa tal cual — **no recolorear** |

## Contenido

| Archivo | Qué es |
|---|---|
| `icons.svg` | Sprite con `<symbol id="<familia>-<nombre>">` (157) |
| `svg/<familia>/<nombre>.svg` | SVG individual |
| `index.json` | Manifest por familia `{ viewBox, mono }` |
| `_demo.html` | Galería de validación |

> Los ids del sprite llevan **prefijo de familia**: `system-chevron-abajo`, `semantic-danger`, `brand-hospital`.

## Consumo

### system (recomendado vía sprite)

```html
<svg class="icon icon--md"><use href="/icons/icons.svg#system-chevron-abajo"/></svg>
```
```css
.icon--sm { width: var(--icon-size-sm); height: var(--icon-size-sm); }
.icon--md { width: var(--icon-size-md); height: var(--icon-size-md); }
.icon     { color: var(--color-icon-system-primary); }   /* el fill hereda este color */
/* contextual */
.btn:disabled .icon { color: var(--color-icon-system-disabled); }
```

### semantic (pintar con el token de estado)

```html
<svg class="icon icon--md" style="color: var(--color-icon-status-danger)">
  <use href="/icons/icons.svg#semantic-danger"/>
</svg>
```
El círculo toma el color; el símbolo interno es un knockout blanco. Pensados para mostrarse
en su color de estado — no recolorear a tonos claros.

### brand (multicolor — no recolorear)

```html
<svg class="icon icon--lg"><use href="/icons/icons.svg#brand-hospital"/></svg>
```
Traen su color propio. `currentColor` no aplica: solo se les da tamaño.

## Accesibilidad

- **Decorativo** (junto a texto): `aria-hidden="true"` en el `<svg>`.
- **Funcional** (ícono solo): `<button>` con `aria-label`, o `role="img"` + `aria-label`.

## ⚠️ Prueba local

El sprite **externo** (`<use href="icons.svg#id">`) solo funciona servido por **HTTP**, no con
`file://`. Para validar local: abrí `_demo.html` (inlinea el sprite) o serví con `npx serve`.
