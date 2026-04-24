# Changelog — Aqua Design System

Historial de cambios notables. Sigue [Semantic Versioning](https://semver.org/): **MAJOR.MINOR.PATCH**
Ver proceso de contribución y versionado en [docs/governance/design-system-rules.md](docs/governance/design-system-rules.md).

---

## [0.2.0] — 2026-04-24

### Changed — Tokens (Breaking)
- `color/bg/fill/*` — reestructura completa. Nomenclatura anterior eliminada: `fill-default`, `fill-subtle-default`, `fill-hover`, `fill-active`, `fill-brand-default`, `fill-attention-default`, `fill-inverse-default`. Nueva estructura en tres grupos semánticos: neutral (`primary/secondary/tertiary`), brand (`brand-subtle/medium/strong`) e inverse (`inverse-subtle/medium/strong`).
- `color/action/destructive/*` → renombrado a `color/action/brand/*`. Valores actualizados: default red/500 · hover red/600 · active red/700.

### Added — Tokens
- `color/bg/fill/primary-default` · `secondary-default` · `tertiary-default`
- `color/bg/fill/brand-subtle-default` · `brand-medium-default` · `brand-strong-default`
- `color/bg/fill/inverse-subtle-default` · `inverse-medium-default` · `inverse-strong-default`
- `color/action/brand/default` · `hover` · `active`

### Changed — Componentes (Breaking)
- **Button** — eliminada variante `tone=Destructive`. Acciones irreversibles → usar `Primary` en modal de confirmación.
- **Button** — añadida variante `Brand` (solo LG, uso restringido: Hero / Landings / Campañas). No reemplaza a Primary en flujos funcionales.

### Removed
- `color-bg-fill-hover`, `color-bg-fill-active` — redundantes con surface tokens y estados de action
- `color-action-destructive-*` — reemplazados por `color-action-brand-*`

---

## [0.1.0] — 2026-04-23 · Piloto

Primera entrega certificada del piloto. Pre-estable — puede recibir cambios breaking antes de v1.0.0.

### Added — Tokens
- **Color** — surface, text, action, border, icon, status (info/success/warning/danger), focus, overlay, inverse
- **Space** — `2xs` (4px) · `xs` (8px) · `sm` (12px) · `md` (16px) · `lg` (24px) · `xl` (32px) · `2xl` (48px)
- **Radius** — `xs` (4px) · `sm` (8px) · `md` (12px) · `pill` (999px)
- **Stroke** — `xs` (1px) · `sm` (2px) · `md` (4px) · `focus-ring-width` (2px)
- **Typography** — Noto Sans: caption/sm · body/md · body/lg con pesos 400/500/700
- **Layout** — breakpoints xs/sm/md/lg/xl, grid configs, container max-widths

### Added — Dist
- `dist/tokens.css` — CSS custom properties (dual hex + oklch)
- `dist/layout.css` — breakpoints y grid
- `dist/tokens.js` — ES module
- `dist/components/` — CSS framework-agnostic para los 13 componentes + `index.css`

### Added — Componentes (DIM-C: 13/13 PASS)
- **alert** — info/success/warning/danger · con/sin título, close, link
- **badge** — número · dot · 5 variantes semánticas
- **button** — Primary/Secondary/Tertiary/Ghost · L/M/S · Default/Destructive/Inverse · button/icon
- **checkbox** — default/checked/indeterminate/disabled · group
- **chips** — default/selected/disabled · con/sin icono
- **link** — sm/md/lg · inline/standalone
- **radio-button** — default/checked/disabled · group
- **spinner** — sm (20px) · md (24px) · lg (32px)
- **tabs** — default/active/disabled · con/sin icono
- **tag** — neutro · con/sin icono
- **text-field** — default/focus/error/read-only/disabled · con label, helper, counter
- **toggle** — default/checked/disabled
- **tooltip** — 9 posiciones

### Added — Documentación
- Specs Markdown para 13 componentes en `docs/components/`
- `docs/governance/design-system-rules.md` — contratos del sistema
- `docs/governance/ds-audit-protocol.md` — protocolo DIM-C

### Audit
- DIM-C 2026-04-23: **13/13 PASS** — cero HEX hardcoded, cero token drift

---

## Criterios para v1.0.0

- [ ] Validación con al menos un equipo consumidor real
- [ ] Tokens de chips hover/focus/active definidos y certificados
- [ ] Decisión sobre estrategia de distribución (npm · CDN · Git submodule)
- [ ] Aprobación del DS Owner
