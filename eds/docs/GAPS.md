# GAPS — a resolver antes del build (Fase B/C)

Lo que el mapeo Aqua→MUI necesita y hoy **no está cerrado**. Cada uno con su resolución propuesta.

| # | Gap | Qué falta | Resolución propuesta | Bloquea |
|---|---|---|---|---|
| 1 | **grey 50–900** | MUI usa `grey.*` internamente (disabled, tracks, etc.). El POC lo aproximó de neutrals. | Traer el **ramp slate exacto** de los Primitives de Figma (Tokens lib). | Sí — define grises de muchos componentes |
| 2 | **light/dark tonales** | Para primary/secondary/error… MUI quiere `light`/`dark`. Hoy los asignamos de hover/active + bg/text-status. | Confirmar que esa asignación se ve bien; si no, sacar tonos exactos del ramp. (MUI deriva si no se dan, pero fijamos para paridad.) | No — hay fallback |
| 3 | **`text.icon`** | MUI lo referencia; no estaba en Aqua. | ✅ Resuelto: `text.icon ← icon/system/primary` (`#0f202b`). | No |
| 4 | **tier `h4` (~32px)** | La escala type Aqua no tiene un 32px; MUI tiene h4. | Decidir: (a) **agregar** un token `title-xl` 32px, o (b) interpolar h4 de h3/h5. **Recomiendo (a)** — token nuevo que respeta la escala. | No — pero queda hueco visible |
| 5 | **`fontFamily`** | No se extrajo la familia real de tokens.css. | Confirmar `type/family/base` en Figma/tokens (¿Inter? ¿sistema?) y fijarla. | Sí — afecta toda la tipografía |
| 6 | **`shadows[0..24]`** | MUI exige 25 slots; Aqua tiene 4 elevations. | Distribución propuesta: `0=none · 1–4=sm · 5–12=md · 13–24=lg`. Validar contra dónde MUI usa cada índice (Card=1, Menu=8, Modal=24…). | No — el POC ya funciona con esto |
| 7 | **`contrastText` por color** | Confirmar contraste de texto sobre cada color. | `#ffffff` salvo verificación WCAG por color (warning/info pueden necesitar oscuro). Chequear AA. | No |
| 8 | **token source único** | El POC tipeó los hex a mano. Para single-source hay que leerlos de Aqua. | Build que **lee `dist/V.0.2.0/tokens.css`** (o el export de Figma) y arma el theme. No tipear valores dos veces. | Sí — es el corazón de Fase B |

## Orden de resolución
1. **Gaps 5, 8** (fontFamily + token source) — destraban la Fase B (pipeline).
2. **Gaps 1, 4** (grey ramp + h4) — requieren Figma; resolver cuando reconecte el bridge.
3. **Gaps 2, 6, 7** — refinamiento, tienen fallback; se cierran en la validación (Fase D).

## Notas
- Gaps 1 y 4 necesitan el **bridge de Figma** (hoy desconectado) para los valores exactos.
- Ninguno bloquea arrancar la **Fase B** con los valores del POC como provisorios; se reemplazan por los exactos al resolver 1/4/5.
