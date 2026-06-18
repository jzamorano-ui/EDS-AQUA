# Auditoría base — Select

> Registro de auditoría del componente Select. **Fecha:** 2026-06-18. **Alcance:** Figma (OPS-Library) + repo (`.md`, `.css`, tokens-map, CHANGELOG). Baseline para evitar regresiones — re-auditar contra este checklist antes de cada corte a dist.

Jerarquía de verdad: **Figma (Tokens → DS) → .md → .css**. El `.md` y el `.css` reflejan Figma, nunca al revés.

---

## 1. Estado verificado en Figma — ✅

| Componente | Node | Estados | Tokens |
|---|---|---|---|
| `select` (trigger) | `40003102:19653` | default · focus · active · filled · error · read-only · disabled (7) | 100%* |
| `_menu/item` (opción) | `40003102:19674` | default · hover · active · focus · disabled (5) | 100% |
| `menu/list` (panel) | `40003104:25695` | scroll: none · top · mid · bottom | 100% |

- `focus` = navegación por teclado (cerrado, anillo **ring + gap** tokenizado: `color/focus/ring`, `color/focus/ring-gap`, `stroke/focus-ring-width`).
- `active` (trigger) = panel desplegado; `active` (opción) = highlight (antes `selected`).
- Panel: max-height **286px** (6 filas + 50%), scrollbar `radius/pill`, flotante `ABSOLUTE` + `STRETCH`, trigger min-width 160 / panel min-width 200 (constantes de layout, no token).
- Doc frames: `Select / System · Use · Matriz`, `Menu Item / System · Matriz`, `Menu List / Matriz`, `Select / Component - inspection`. Los 7 estados poblados en la Matriz.

\* *Único valor crudo en `select`: padding de `tooltip-body` — pertenece al componente **Tooltip** embebido, fuera del scope de Select.*

---

## 2. Estado del repo

| Archivo | Estado |
|---|---|
| `docs/components/select.md` | ✅ Contenido alineado (estados, scroll, 286, anillo+gap, naming, 8 secciones). |
| `docs/tokens-map.md` | ✅ Todos los tokens existen (`--color-focus-ring-default`, `--color-focus-ring-gap-default`, `--stroke-focus-ring-width`, `--color-action-tertiary-active`, `--radius-pill`). |
| `src/components/select.css` | ❌ **STALE** — ver §3. |
| `CHANGELOG.md` | ✅ Entrada `[0.15.0]`. |

---

## 3. 🔴 Punch-list — `select.css` (BLOCKERs antes de dist)

| ID | Problema | CSS actual | Debe ser |
|---|---|---|---|
| B1 | max-height del panel | `236px` | **`286px`** (6 filas + 50%) |
| B2 | min-width del panel ausente | — | **`min-width: 200px`** en `.listbox` |
| B3 | min-width del trigger ausente | — | **`min-width: 160px`** en `.select__trigger` |
| B4 | anillo de focus sin **gap** | solo `box-shadow` ring exterior | ring **+ gap** (`--color-focus-ring-default` + `--color-focus-ring-gap-default`, `--stroke-focus-ring-width`) |
| B5 | estado de opción mal nombrado | `.listbox__option--selected` | **`--active`** (Figma renombró `selected→active`) |
| B6 | opción `focus-visible` mal | `outline:none` + color hover | anillo de focus (ring+gap) como el trigger |
| B7 | naming inconsistente | css `.listbox`/`.listbox__option` vs md HTML `.menu-list`/`.menu-item` | **decidir** (ver §4) |
| W1 | scrollbar sin estilo | — | ancho 4px + `radius/pill` (`::-webkit-scrollbar*`) |

---

## 4. ⚠️ Decisiones abiertas

- **Naming de clase CSS del panel/opción:** `.listbox`/`.listbox__option` (actual, ARIA-aligned) **vs** `.menu-list`/`.menu-item` (primitiva compartida con Menu, lo que usa el HTML del `.md`). Recomendado **`.menu-list`/`.menu-item`** para reflejar la primitiva compartida; entonces actualizar `select.css`. (El rol ARIA sigue siendo `listbox`/`option`.)
- **Documentation link en Figma:** los 3 component sets **no tienen** `documentationLinks` configurado. El protocolo (audit-components §COMPONENT CONFIG) lo exige. Acción: setear el link a la página del componente en cada set.
- **Constraint de ancho < 200px** (panel se mantiene en 200 alineado izq): es lógica de layout/JS, no CSS puro. Documentar como responsabilidad del consumer/runtime.

---

## 5. Checklist reusable (re-auditar antes de cada dist)

**Figma (L3):**
- [ ] Tokens: 0 fills/strokes/effects/text/radius/padding/gap crudos (excepto width/height, que no se tokenizan).
- [ ] `strokeWeight` bindeado por lado (`strokeTopWeight`…), no uniforme (toma y revierte).
- [ ] Estados requeridos (interactivo): default · hover · active · focus · disabled. Trigger además: filled · error · read-only.
- [ ] Focus state con anillo ring+gap (`color/focus/ring`, `color/focus/ring-gap`, `stroke/focus-ring-width`).
- [ ] `documentationLinks` configurado en cada component set.

**Cadena (L4):**
- [ ] V3 — `.md` ↔ Figma: estados, props, tokens, naming sin discrepancias.
- [ ] V4 — `.css` ↔ Figma: medidas (max-height, min-width), estados, naming, sin propiedades visibles sin binding.
- [ ] tokens-map contiene todos los tokens usados.
- [ ] `.md` con las 8 secciones (Propiedades · Props · Tokens · HTML · ARIA · Teclado · Reglas · Accesibilidad).

**Veredicto inicial (2026-06-18):** Figma ✅ · `.md` ✅ · `.css` ❌ (7 BLOCKERs) · doc-links ⚠️.

**Resolución (2026-06-18):** ✅ **PASA.**
- `select.css` reescrito: max-height 286, min-width trigger 160 / panel 200, anillo focus ring+gap (trigger outset, opción inset), `--selected`→`--active`, scrollbar `radius/pill`, naming unificado `.menu-list`/`.menu-item` (alineado con el HTML del `.md`). Sin HEX, 100% tokens.
- Doc-links configurados en los 3 component sets (apuntan a la página Select `40003101-6382`).
- Decisión de naming cerrada: **`.menu-list` / `.menu-item`** (primitiva compartida; rol ARIA sigue `listbox`/`option`).
- Pendiente residual: constraint de ancho <200px (layout/JS, no CSS); padding de `tooltip-body` (componente Tooltip).
