# Changelog — Aqua DS · dist

Las versiones marcadas **⚠ BREAKING** requieren ajustes en el código consumidor.

---

## [0.2.0] — 2026-06-22

Versión **MINOR** (no breaking): suma 3 componentes y el set de íconos, y actualiza Text Field. **Tokens sin cambios** — `tokens.css`, `layout.css` y `tokens.js` son idénticos a v0.1.0. Carpeta `dist/V.0.1.0/` se conserva congelada.

### Added — 3 componentes nuevos

| Componente | Clase raíz | Doc |
|---|---|---|
| `menu.css` — `menu/list` público (+ `_menu/item`, `_divider`) | `.menu-list` | `docs/menu.md` |
| `select.css` | `.select` | `docs/select.md` |
| `combobox.css` | `.combobox` | `docs/combobox.md` |

`select` y `combobox` **reusan** `.menu-list`/`.menu-item` de `menu.css` — por eso `index.css` importa `menu` antes que ambos. ARIA dual-role en menu (`menu`/`menuitem` nativo · `listbox`/`option` adaptado en select/combobox).

### Added — Set de íconos (`icons/`)

157 íconos consumibles, **100% tokenizados** (cero color hardcodeado), themeable:

- **system (121)** → `fill="currentColor"`; color por defecto vía `icons.css` (`.icon` → `--color-icon-system-primary`).
- **semantic (5)** → color de estado bindeado al token (`--color-icon-status-*`) + knockout `--color-icon-system-inverse`.
- **brand (31)** → multicolor de marca (`--color-icon-brand-{primary, secondary, contrast}`).
- Entregables: `icons.svg` (sprite, ids `<familia>-<nombre>`) · `svg/<familia>/<nombre>.svg` · `icons.css` (tamaños + color) · `index.json` (manifest) · `README.md` (guía de consumo).

### Changed — Text Field

- **Afijo `suffix`** añadido (espejo del `prefix`, trailing).
- **A11y:** el anillo de focus se gobierna por la clase `.field--focus`, no por `:focus-visible` (que en un `<input>` de texto también dispara con mouse). Contrato documentado en `docs/text-field.md`.
- **`disabled`** background → `--color-action-primary-disabled` (alineado a Figma).
- Grosores por estado bindeados a tokens `--stroke-xs`/`--stroke-sm`.

### Docs

- **button.md** · **link.md** — casing de estados homologado a minúscula.
- Specs nuevas: `menu.md`, `select.md`, `combobox.md`.

### Sin cambios (heredado de v0.1.0)

`tokens.css` · `layout.css` · `tokens.js` · los 12 componentes restantes (alert · badge · button · checkbox · chips · link · radio-button · spinner · tabs · tag · toggle · tooltip).

---

## [0.1.0-patch] — 2026-05-29

### Fixed — Correcciones post-entrega 

- **button.css** — `.btn--secondary` y `.btn--secondary[disabled]`: `border-color` corregido a `transparent`. Figma no tiene stroke en Secondary/Default surface.
- **chips.css** — chip filled/selected: background y border actualizados a `--color-bg-fill-inverse-medium`. Chip outline hover: background actualizado a `--color-bg-fill-inverse-subtle`.
- **tabs.css** — Estado hover añadido: background `--color-action-tertiary-hover` e indicador `--color-action-primary-hover`. Faltaban en la implementación original.
- **text-field.css** — Read-only background corregido a `--color-bg-fill-inverse-subtle`. Disabled background corregido a `--color-bg-fill-neutral-medium`.
- **toggle.css** — Thumb en estado disabled corregido a `--color-icon-system-secondary` para garantizar visibilidad sobre el track.

Docs actualizados en `docs/` para los 4 componentes afectados.

---

## [0.1.0] — 2026-05-04

Primera entrega al equipo de desarrollo.

**`tokens.css`** — 219 custom properties: `color` · `space` · `radius` · `stroke` · `type` · `icon-size` · `layout`

**`layout.css`** — breakpoints y grid

**`components/`** — 13 componentes framework-agnostic

| Archivo | Clase raíz |
|---|---|
| `alert.css` | `.alert` |
| `badge.css` | `.badge` |
| `button.css` | `.btn` |
| `checkbox.css` | `.checkbox` |
| `chips.css` | `.chip` |
| `link.css` | `.link` |
| `radio-button.css` | `.radio` |
| `spinner.css` | `.spinner` |
| `tabs.css` | `.tabs` |
| `tag.css` | `.tag` |
| `text-field.css` | `.field` |
| `toggle.css` | `.toggle-field` |
| `tooltip.css` | `.tooltip` |
