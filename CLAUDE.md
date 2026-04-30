# Aqua Design System — Contexto para Claude Code

## Qué es este repo

Repo de **distribución** del Aqua DS (OPS platform). Contiene los outputs compilados (`dist/`) y la documentación (`docs/`). El pipeline de build (tokens fuente, Style Dictionary) vive en un repo separado.

---

## Arquitectura de capas

```
Figma Tokens library  →  JSON (pipeline repo)  →  dist/tokens.css · tokens.js · layout.css
Figma Icons library   →  consumer de Tokens
Figma DS-Piloto       →  consumer de Tokens + Icons  →  docs/components/*.md
```

### Las 3 librerías Figma

| Librería | File key | Rol |
|---|---|---|
| Tokens | `ml3ScFhJNwgs6xZpKUKuok` | Fuente de verdad — primitives + semánticos |
| Icons | `zIbuWAvLhwTlwnVwbDgY5n` | Componentes de ícono |
| DS-Piloto | `9FoTERLTyDXz3gmPLjjJ09` | Consumer — componentes de interfaz |

**Figma es siempre la fuente de verdad.** Los JSON y `dist/` reflejan Figma — nunca al revés.

---

## Estructura del repo

```
dist/                   ← output auto-generado — NO editar a mano
  tokens.css            ← CSS custom properties semánticos (hex + oklch)
  layout.css            ← breakpoints y grid
  tokens.js             ← ES module para JS/TS

docs/
  components/           ← specs de 13 componentes
    _template.md        ← template base para nuevos componentes
  governance/
    design-system-rules.md    ← naming T/P/R/S, capas, reglas
    ds-audit-protocol.md      ← protocolo maestro de auditoría (5 layers)
    audit-tokens.md           ← protocolo auditoría librería Tokens
    audit-icons.md            ← protocolo auditoría librería Icons
    audit-components.md       ← protocolo auditoría componentes DS
  tokens-map.md         ← referencia plana de todos los tokens semánticos
  figma-scripts/        ← scripts para Figma Console (operacional, equipo DS)

CHANGELOG.md            ← historial semver (versión actual: v0.10.0)
README.md               ← guía de consumo para devs
```

---

## Naming convention — T/P/R/S

```
Topic / Property / Role / State
color / bg     / surface / default    →  --color-bg-surface-default
color / action / primary / hover      →  --color-action-primary-hover
space / md                            →  --space-md
```

- Separador de jerarquía: `/` (Figma/JSON) → `-` (CSS)
- Todo lowercase kebab-case
- **Tokens stateful** (tienen hermanos hover/active/disabled) → llevan `/default`
- **Tokens stateless** (sin hermanos) → sin sufijo: `--color-text-primary`, `--color-icon-system-primary`
- Prohibido: nombres de componentes, HEX hardcoded fuera de primitives, alias semántico → semántico

---

## Reglas críticas

### Fundación congelada — v0.2.1 (2026-04-30)

> **A fuego — no negociable.**

Este release es la base del proyecto. A partir de aquí el sistema solo escala hacia arriba.

- **Los 149 tokens semánticos son el contrato con el código consumidor.** Renombrar o eliminar un token existente es BREAKING CHANGE — requiere MAJOR semver + 2 sprints de aviso previo.
- **El naming T/P/R/S está congelado.** No se cambia la convención, no se renombran segmentos.
- **La arquitectura de capas `primitives → semantics → responsive` es definitiva.** No se añaden colecciones, no se cambian modos en Semantics ni Primitives.
- **Los 13 componentes y sus props/variantes son contrato.** Eliminar o renombrar una prop es BREAKING.
- **Solo se permite:** añadir tokens (MINOR), añadir componentes (MINOR), corregir valores sin renombrar (PATCH).

### Técnicas

- `dist/` es auto-generado — nunca editar directamente
- DS-Piloto no tiene variables locales propias — consume solo de Tokens e Icons
- Toda propiedad visual en DS-Piloto debe estar bindeada a una variable semántica de Tokens
- Para resolver variables cross-library en Figma plugin: `getVariableByIdAsync()` (async) — `getVariableById()` sync retorna null
- Para setear codeSyntax: `v.setVariableCodeSyntax('WEB', value)` — asignación directa `v.codeSyntax = {}` falla silenciosamente

---

## Componentes disponibles (v0.10.0)

13 componentes certificados: alert · badge · button · checkbox · chips · link · radio-button · spinner · tabs · tag · text-field · toggle · tooltip

Specs en `docs/components/`. Referencia de tokens en `docs/tokens-map.md`.

---

## Auditoría

El sistema tiene 5 layers de auditoría:

| Layer | Qué verifica | Protocolo |
|---|---|---|
| L1 — Tokens | Naming, alias chain, codeSyntax, sync JSON | `docs/governance/audit-tokens.md` |
| L2 — Icons | Bindings fill, modos, snapshot publicado | `docs/governance/audit-icons.md` |
| L3 — DS | Token bindings, dangling, doc links | `docs/governance/audit-components.md` |
| L4 — Chain | Figma→JSON→dist→.md sin quiebres | `docs/governance/ds-audit-protocol.md` |
| L5 — Release | Gate unificado | `docs/governance/ds-audit-protocol.md` |

Protocolo maestro: `docs/governance/ds-audit-protocol.md`

---

## IDs de referencia (Figma)

| Elemento | ID |
|---|---|
| `icon/system/context-color` | `VariableID:40002056:1518` |
| Colección Icon/Context | `VariableCollectionId:40002056:1517` |
| Semantics collection key | `82b667cada655a4698f3d29b1b303cb413212d3d` |
| Doc page (Tokens) | `41:106` |
