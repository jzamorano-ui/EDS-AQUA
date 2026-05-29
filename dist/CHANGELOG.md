# Changelog — Aqua DS · dist

Las versiones marcadas **⚠ BREAKING** requieren ajustes en el código consumidor.

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
