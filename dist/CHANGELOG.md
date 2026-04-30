# Changelog — Aqua DS · dist

Cambios en tokens, CSS de componentes y layout. Las versiones **⚠ BREAKING** requieren ajustes en el código consumidor.

> El versionado de `dist/` sigue releases de producción y es independiente del versionado de desarrollo registrado en `CHANGELOG.md` en la raíz del repo.

---

## [0.2.1] — 2026-04-30 · Piloto

Primera entrega al equipo de desarrollo.

### Tokens — `tokens.css`

219 custom properties. Categorías: `color` · `space` · `radius` · `stroke` · `type` · `icon-size` · `layout`

### Componentes — `components/`

13 componentes framework-agnostic. Importar individualmente o vía `index.css`.

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
| `toggle.css` | `.toggle` |
| `tooltip.css` | `.tooltip` |

> Pre-estable — pueden ocurrir cambios breaking antes de v1.0.0.
