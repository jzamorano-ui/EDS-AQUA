# Design System — Contratos

**Stack:** MUI (base técnica) · DTCG Design Tokens Format (fuente única de verdad) · CSS / TypeScript

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

**Formato:** `kebab-case`
**Estructura:** `topic-property-role-state`

| Segmento | Definición | Ejemplos |
|---|---|---|
| `topic` | Categoría técnica | `color`, `space`, `type`, `radius`, `stroke`, `elevation`, `motion`, `layout` |
| `property` | Propiedad afectada | `bg`, `fg`, `border`, `icon`, `link`, `surface` |
| `role` | Intención | `primary`, `secondary`, `neutral`, `success`, `warning`, `danger`, `info`, `focus` |
| `state` | Estado | `default`, `hover`, `active`, `pressed`, `selected`, `disabled`, `focus`, `visited`, `inverse` |

**Ejemplo válido:** `color-bg-action-primary-default`

**Reglas:**
- `state` siempre explícito (incluyendo `default`)
- No mezclar idiomas dentro del mismo token
- Sin nombres de componentes (`button`, `card`, etc.)

---

### Capas del sistema

#### `primitives`
- Valores crudos, sin intención semántica
- No usar directamente en UI
- Ejemplo: `color-blue-500: #0043CE`

#### `semantics`
- Define la intención de uso
- Siempre alias a primitives — nunca valores directos (HEX)
- Ejemplo: `color-bg-action-primary-default → {color-blue-500}`

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

> Excepción documentada: stroke 1px/2px se puede salir de la escala — usar `--stroke-xs` (1px) y `--stroke-sm` (2px).

---

### Tipografía

- **Familia:** Noto Sans
- **Pesos:** Regular (400), Medium (500), Bold (700)
- H1 máximo: 64px · Caption mínimo: 12px
- Line-height headings mínimo: 1.2 · body mínimo: 1.4

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
**Breakpoints:** 3 · **Type modes:** `mobile`, `desktop`

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