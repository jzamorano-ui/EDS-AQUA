# Design System — Contratos

**Stack:** MUI (base técnica) · DTCG Design Tokens Format (fuente única de verdad) · CSS / TypeScript

---

## Contrato de fundación — v0.2.1 (2026-04-30)

> **Regla a fuego — no negociable.**

A partir del release v0.2.1, este sistema es la base con la que se casa el proyecto. La arquitectura, la estructura de tokens y los 13 componentes certificados son el contrato con los consumidores.

**Lo que está congelado:**

- **Arquitectura de capas** — `primitives → semantics → responsive`. No se añaden colecciones, no se cambian modos.
- **Naming T/P/R/S** — la convención de naming es definitiva. No se renombran segmentos, no se cambia el separador, no se rompe la jerarquía.
- **Los 149 tokens semánticos** — sus nombres son el contrato con el código consumidor. Renombrar o eliminar un token es un BREAKING CHANGE (requiere MAJOR + 2 sprints de aviso).
- **Los 13 componentes y sus variantes/props** — estructura congelada. Eliminar o renombrar una prop es BREAKING.

**Lo que puede crecer:**

- Añadir nuevos tokens semánticos (MINOR)
- Añadir nuevos componentes (MINOR)
- Añadir nuevas variantes a componentes existentes (MINOR)
- Corregir valores de tokens sin cambiar nombres (PATCH)

**Lo que nunca ocurre sin MAJOR + proceso completo:**

- Renombrar un token semántico existente
- Eliminar un token semántico
- Cambiar la estructura de una colección de Figma Variables
- Cambiar el naming convention (T/P/R/S)
- Refactoring masivo del árbol de tokens

---

## Principios

1. Accesibilidad como criterio de diseño, no validación final (WCAG 2.2 AA)
2. Mobile-first y responsive-first
3. Arquitectura por capas: `primitives → semantics → responsive`
4. Semantics siempre como alias a primitives (sin valores directos)
5. Consistencia sistémica por sobre soluciones puntuales
6. Escalabilidad progresiva (MVP → madurez)

---

## Contratos

### Naming de tokens

**Formato en Figma/JSON:** `Topic/Property/Role/State` — separador `/`
**Formato en CSS:** `kebab-case` — separador `-` (generado por Style Dictionary)

| Segmento | Definición | Ejemplos |
|---|---|---|
| `Topic` | Tipo de valor | `color`, `space`, `type`, `radius`, `stroke`, `elevation`, `layout` |
| `Property` | Sub-dominio | `bg`, `border`, `icon`, `text`, `action`, `focus` |
| `Role` | Variante semántica | `primary`, `secondary`, `neutral`, `brand`, `inverse`, `surface`, `fill` |
| `State` | Estado de interacción | `default`, `hover`, `active`, `disabled`, `focus`, `inverse` |

**Ejemplo válido:**
- Figma/JSON: `color/bg/surface/default`
- CSS output: `--color-bg-surface-default`

**Reglas de naming:**

1. **`/` como separador** entre segmentos — el guion `-` solo dentro de un segmento para nombres compuestos (`ring-gap`, `brand-strong`, `danger-focus`).

2. **`default` únicamente como State** — solo cuando el token tiene al menos un hermano de estado (`hover`, `active`, `disabled`, `inverse`). Nunca como nombre de Role o dominio.
   - ✅ `color/action/primary/default` — tiene hermanos hover/active
   - ✅ `color/focus/ring/default` — tiene hermano inverse
   - ❌ `color/bg/fill/default/subtle` — "default" como dominio → usar `neutral`

3. **`neutral` para variante base sin estado** — cuando se necesita nombrar el dominio neutro/estándar dentro de un grupo (`neutral`, no `default`).
   - ✅ `color/bg/fill/neutral/subtle` · `color/bg/status/neutral`

4. **Profundidad variable, mínimo T/P/R** — el framework requiere al menos 3 segmentos. Dominios complejos pueden agregar un 5° nivel como calificador entre P y R:
   - 4 niveles: `color/action/primary/default` (T/P/R/S)
   - 5 niveles: `color/action/brand/primary/default` (T/P/calificador/R/S) — excepción documentada para variantes compuestas

5. **Sin nombres de componentes** — `button`, `card`, `modal` están prohibidos en tokens semánticos.

6. **Sin mezcla de idiomas** dentro del mismo token.

---

### Capas del sistema

#### `primitives`
- Valores crudos, sin intención semántica
- No usar directamente en UI
- Ejemplo: `color-blue-500: #0043CE`

#### `semantics`
- Define la intención de uso
- Siempre alias a primitives — nunca valores directos (HEX)
- Ejemplo: `color-action-primary-default → {color-blue-500}`

#### `responsive`
- Reglas por dispositivo: breakpoints, grid, type-modes
- No define colores nuevos

---

### Escala de sizing

**Base:** `8px = 100` (escala de primitives — no usar directamente en componentes)

| px | Primitive value | Token semántico |
|----|----------------|----------------|
| 0  | 0 | — |
| 4  | 50 | `--space-2xs` |
| 8  | 100 | `--space-xs` |
| 12 | 150 | `--space-sm` |
| 16 | 200 | `--space-md` |
| 24 | 300 | `--space-lg` |
| 32 | 400 | `--space-xl` |
| 48 | 600 | `--space-2xl` |
| 64 | 800 | `--space-3xl` |

> Excepción documentada: stroke 1px/2px se puede salir de la escala — usar `--stroke-xs` (1px) y `--stroke-sm` (2px).

---

### Tipografía

- **Familia:** Noto Sans
- **Pesos:** Regular (400), Medium (500), Bold (700)
- H1 máximo: 64px · Caption mínimo: 12px
- Line-height headings mínimo: 1.2 · body mínimo: 1.4

---

### Elevation

El sistema de elevación representa jerarquía e interacción entre elementos. No es decorativo: indica capas, foco o elementos accionables.

| Token | CSS value | Uso | Interactivo |
|---|---|---|---|
| `--elevation-none` | `0px 0px 0px 0px transparent` | Superficie base — layout, fondos | — |
| `--elevation-sm` | `0px 2px 4px 0px rgba(49,49,49,0.08)` | Separación sutil entre bloques | — |
| `--elevation-md` | `0px 4px 12px 0px rgba(49,49,49,0.10)` | Cards, elementos accionables | Sí |
| `--elevation-lg` | `0px 8px 24px 0px rgba(49,49,49,0.12)` | Dropdown, tooltip, flotantes | Sí |
| `--elevation-top-md` | `0px -4px 8px 0px rgba(49,49,49,0.10)` | Modal, drawer, overlay | Sí |

**Regla crítica:** `elevation-md` o superior implica interacción — el usuario esperará que el elemento sea accionable. No usar en contenedores estáticos.

**Orden de decisión — antes de usar sombra:**

1. Separar contenido → `spacing` o `divider`
2. Destacar contenido → `color` o `tipografía`
3. Agrupar contenido → `background`
4. Indicar interacción → **recién entonces `elevation`**

---

### Sistema de color

**Flujo:** Figma RGB → HEX → OKLCH (CSS)
**Rampas:** Steps `50, 100, 200, 300, 400, 500, 600, 700, 800, 900`

- `50` NO es blanco puro · `900` NO es negro puro
- `white` y `black` son tokens separados
- `hue` estable; ajustar `L` y `C` con criterio

---

### Familias cromáticas (primitives)

Formato: `color-palette-<color>-<step>-default`

| Familia | HEX base (500) |
|---|---|
| `blue`   | `#0043CE` |
| `green`  | `#1E833A` |
| `yellow` | `#F59E0B` |
| `red`    | `#FF585C` |
| `gray`   | `#737373` |
| `aqua`   | `#00A499` |
| `slate`  | `#5B7F95` |
| `pink`   | `#DC4ED0` |
| `purple` | `#9753ED` |
| `white`  | `#FFFFFF` → `color-palette-white-0-default` |
| `black`  | `#000000` → `color-palette-black-1000-default` |

> Primitives usan únicamente nombres cromáticos — sin prefijos semánticos. La asignación semántica se define en semantics como alias.

---

### Scope MVP

**Dominios semánticos:** `surface`, `text`, `action`, `border`, `status`, `focus`, `overlay`
**Estados requeridos:** `default`, `disabled`, `hover`, `active`, `focus`
**Breakpoints:** 5 · **Type modes:** `mobile`, `desktop`

---

## Versionado

Esquema **MAJOR.MINOR.PATCH** (semver):

| Tipo | Cuándo | Ejemplo |
|---|---|---|
| `MAJOR` | Eliminar o renombrar tokens/componentes — rompe implementaciones | `0.1.0 → 1.0.0` |
| `MINOR` | Nuevos tokens, componentes o documentación — no breaking | `0.1.0 → 0.2.0` |
| `PATCH` | Corrección de valores, docs o alias rotos | `0.1.0 → 0.1.1` |

**Registrar la versión en:** `CHANGELOG.md` · Cover de OPS-Library-[Aqua] DS en Figma · Canal Teams Dev+UX.

### Cómo añadir una entrada al CHANGELOG

Añadir sección `## [X.Y.Z] — YYYY-MM-DD` encima de la versión anterior:

```
### Added    — elemento nuevo (no breaking)
### Changed  — cambio en existente (puede ser breaking)
### Deprecated — obsoleto (aún funciona)
### Removed  — eliminado (breaking — requirió ≥ 2 sprints de aviso)
### Fixed    — corrección de valor o documento
```

### Proceso de breaking change

1. Documentar en CHANGELOG como `Deprecated`
2. Notificar a consumidores con **≥ 2 sprints** de anticipación via Teams
3. Marcar como `deprecated` en JSON de tokens y/o Figma Variables
4. Eliminar en la release marcada y publicar el `MAJOR`

*Ningún elemento se elimina sin aviso previo documentado.*