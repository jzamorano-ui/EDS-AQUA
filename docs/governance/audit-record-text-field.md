# Auditoría base — Text Field

> Registro de auditoría del componente Text Field. **Fecha:** 2026-06-18. **Alcance:** Figma (OPS-Library) + repo (`.md`, tokens-map) + `dist` (solo lectura, congelado). Baseline para el corte **v0.2.0**.

Jerarquía: **Figma (fuente de verdad) → `.md` → `.css`**.

---

## 1. Figma — ✅ listo para v0.2.0

| Aspecto | Estado |
|---|---|
| Variantes | 16 = 8 estados × {input, text-area} |
| Estados | `default · active · writing · filled · error · read-only · disabled · focus` (input y text-area, simétricos) |
| `active`/`writing` | borde `color/border/focus` 2px · `default`/`filled`/`read-only` = `color/border/default` 1px · `error` = `color/border/danger-focus` 2px · `disabled` = `color/border/disabled` |
| `focus` (teclado) | anillo **ring + gap** (`color/focus/ring` outside + `color/focus/ring-gap` inside, `stroke/focus-ring-width`) |
| Tokens | **100%** — gaps snapeados a `space/*` (10→8, 5→4) + grosores a `stroke/*`. Único crudo = padding de `tooltip-body` (componente Tooltip, fuera de scope). |
| Doc-links | configurados ✓ |
| Doc frames | Matriz (8 columnas con `focus`), System (8 estados + `active`, descripción `focus`=teclado), Use, inspection |

## 2. `docs/components/text-field.md` — ✅

8 estados, `focus` = anillo (tabla de Anillo de focus), border-width, combinatoria de estados, WCAG 2.4.7 / 2.4.11–2.4.13. Sin fila `hover` (el componente no tiene hover). 8 secciones estándar.

⚠️ Residual cosmético: el orden de los estados difiere ligeramente entre frames Figma (Matriz: `focus` al final; System/`.md`: `focus` tras `active`). No afecta contenido ni dev; unificar opcional.

## 3. tokens-map — ✅
`--color-focus-ring-default`, `--color-focus-ring-gap-default`, `--stroke-focus-ring-width` existen.

---

## 4. 🔒 Pendiente para v0.2.0 (al regenerar `text-field.css`)

`src/components/text-field.css` **no existe** (staging); el CSS vive solo en `dist/V.0.1.0` (congelado). Al regenerar para v0.2.0, el nuevo `text-field.css` debe incluir:

| # | Delta | Origen |
|---|---|---|
| 1 | Anillo de focus **ring + gap** (`--color-focus-ring-gap-default` inset) | el dist actual solo tiene el ring exterior |
| 2 | `disabled` bg → `--color-action-primary-disabled` | el dist tiene `--color-bg-fill-neutral-medium` (valor viejo) |
| 3 | Grosores `--stroke-xs` / `--stroke-sm` por estado | hoy crudos en el dist |
| 4 | Gaps snapeados (8 / 4) | reflejar el snap de Figma |

**No se toca `dist/V.0.1.0`** — estos deltas entran al duplicar a `dist/V.0.2.0`.

## 5. Checklist reusable
Mismo que `audit-record-select.md` §5 (L3 tokens/estados/focus/doc-links · L4 V3 .md↔Figma / V4 .css↔Figma).

**Veredicto:** Figma ✅ · `.md` ✅ · `.css` → deltas listados para v0.2.0. Source **listo para liberar**.
