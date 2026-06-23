# EDS — Design System nativo de Material UI

> **EDS** es un nombre **placeholder** (se renombra después — centralizado en `const NS='eds'`).
> Sistema **nuevo y separado**. La base **Aqua** (v0.2.0, `../src` `../dist` `../docs`) queda **congelada e intacta**.

## Qué es
Un theme de **MUI v5.18** generado desde los **valores ideales de Aqua** (single-source), expresados en la **estructura de MUI** + augmentation para lo que MUI no tiene. Dev consume MUI con su vocabulario; los valores siguen siendo los nuestros.

## Principios
- **Valores = single-source (primitives Aqua).** Nunca se duplican. EDS reestructura naming/semántica, no valores.
- **Estructura MUI respetada; naming nuestro** (ver `docs/MAPPING.md`).
- **Sin dark mode.** `cssVarPrefix:'eds'`. **Valores reales, no `var()`-chaining** (rompe los channels).
- **Color → CSS vars** (`--eds-palette-*`, vía MUI). **Escalas no-color → doble salida:** `theme.eds.*` (sx) + `--eds-*` (`eds-scales.css`).

## Estructura
```
eds/
├─ src/        palette · typography · scales · shadows · components · index (extendTheme)
├─ eds-scales.css   :root con escalas no-color
├─ build/      generador desde el token source (1 fuente → theme + css + tipos)
├─ tests/      harness de validación (render + 0 refs rotas + paridad vs Aqua)
└─ docs/       MAPPING.md (canónico) · GAPS.md
```

## Estado
**Fase A** — spec & mapping. POC validado en `../exploration/mui-token-poc/`.
Ver decisión completa: memoria `project_eds_mui_decision`.
