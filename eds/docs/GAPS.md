# GAPS — a resolver antes del build (Fase B/C)

Lo que el mapeo Aqua→MUI necesita y hoy **no está cerrado**. Cada uno con su resolución propuesta.

| # | Gap | Qué falta | Resolución propuesta | Bloquea |
|---|---|---|---|---|
| 1 | ✅ **grey 50–900** | RESUELTO — ramp **`color/gray/*`** de Figma: `50 #F7F7F7 · 100 #E7E7E7 · 200 #C9C9C9 · 300 #ABABAB · 400 #8F8F8F · 500 #737373 · 600 #5C5C5C · 700 #464646 · 800 #313131 · 900 #1E1E1E`. (primary usa `slate/*`, distinto.) | — | — |
| 2 | **light/dark tonales** | Para primary/secondary/error… MUI quiere `light`/`dark`. Hoy los asignamos de hover/active + bg/text-status. | Confirmar que esa asignación se ve bien; si no, sacar tonos exactos del ramp. (MUI deriva si no se dan, pero fijamos para paridad.) | No — hay fallback |
| 3 | **`text.icon`** | MUI lo referencia; no estaba en Aqua. | ✅ Resuelto: `text.icon ← icon/system/primary` (`#0f202b`). | No |
| 4 | ✅ **tier `h4` (32px)** | RESUELTO — **ya existía** `headline-sm-bold` = **32 / 700 / 40**. h4 ← headline-sm-bold. Sin token nuevo. | — | — |
| 5 | ✅ **`fontFamily`** | RESUELTO — `type/family/base` = **`Noto Sans`**. fontFamily: `'Noto Sans', system-ui, sans-serif`. | — | — |
| 6 | **`shadows[0..24]`** | MUI exige 25 slots; Aqua tiene 4 elevations. | Distribución propuesta: `0=none · 1–4=sm · 5–12=md · 13–24=lg`. Validar contra dónde MUI usa cada índice (Card=1, Menu=8, Modal=24…). | No — el POC ya funciona con esto |
| 7 | **`contrastText` por color** | Confirmar contraste de texto sobre cada color. | `#ffffff` salvo verificación WCAG por color (warning/info pueden necesitar oscuro). Chequear AA. | No |
| 8 | **token source único** | El POC tipeó los hex a mano. Para single-source hay que leerlos de Aqua. | Build que **lee `dist/V.0.2.0/tokens.css`** (o el export de Figma) y arma el theme. No tipear valores dos veces. | Sí — es el corazón de Fase B |

## Estado
- ✅ **Resueltos con valores exactos de Figma:** #1 (grey), #4 (h4), #5 (fontFamily).
- 🔜 **Fase B:** #8 (token source único — el build lee los valores de Aqua, no se tipean dos veces).
- 🔧 **Refinamiento (con fallback, se cierran en validación Fase D):** #2 light/dark tonales · #6 distribución shadows · #7 contrastText WCAG.

**Ya no queda nada que bloquee la Fase B.** Todos los valores de color/typography están cerrados con datos exactos; solo falta cablear el pipeline single-source (#8).
