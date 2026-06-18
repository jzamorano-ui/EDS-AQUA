# Changelog — Aqua Design System

Historial de cambios notables. Sigue [Semantic Versioning](https://semver.org/): **MAJOR.MINOR.PATCH**
Ver proceso de contribución y versionado en [docs/governance/design-system-rules.md](docs/governance/design-system-rules.md).

---

## [0.15.0] — 2026-06-18

### Changed — Select + primitivas compartidas Menu (Figma + spec)

Refactor de la familia de listas flotantes (Select aún no liberado a dist, por lo que estos cambios son MINOR). Se definió la arquitectura **base visual compartida + dos contratos semánticos** (decision record en `docs/governance/menu-select-architecture.md`).

**Primitivas compartidas (antes Listbox / Select Option):**
- `_Listbox` → **`menu/list`** · `_select/option` → **`_menu/item`**. Las consume Select (rol ARIA `listbox`/`option`) y Menu (rol `menu`/`menuitem`).
- **Estado de opción `selected` → `active`**.
- **Scroll** reconstruido de `false/true` a **`none · top · mid · bottom`**. Alto scrolleado **236px → 286px** (6 filas + 50% de la 7ª). Scroll se genera con 7+ opciones; `none` soporta hasta 6 (se agregó el 6º slot).
- **Anillo de focus** tokenizado en `_menu/item` (patrón chips/button): ring `color/focus/ring/default` + gap `color/focus/ring-gap/default`, grosor `stroke/focus-ring-width`, vía padding (inset bindeado).
- Scrollbar radius → `radius/pill`; focus gap → `space/xs` (eliminados valores crudos).

**Select (trigger):**
- Estados: `default · active · filled · error · read-only · disabled` + **nuevo `focus`** (navegación por teclado, cerrado, con anillo ring+gap). `open` → `active` (panel desplegado).
- **`min-width: 160px`** en el trigger (constante de layout). Panel flotante `ABSOLUTE` + `STRETCH` (iguala el ancho del input; min 200px alineado a la izquierda cuando el input < 200).

### Fixed — Documentación Select sincronizada con Figma

- **`docs/components/select.md`** reescrito al estado final: estados `active`/`focus`, scroll `none/top/mid/bottom`, naming `menu/list`/`_menu/item`, 286px, min-width, tabla de anillo de focus, tokens, HTML/ARIA/teclado/reglas/accesibilidad (WCAG 2.4.7 / 2.4.11–2.4.13). Intro homologada al formato del resto de docs.
- **Directivas dev añadidas:** combinatoria de estados (dato ortogonal a interacción), panel en **portal / `z-index`** alto (no quedar tapado por campos siguientes), **type-ahead** (teclado) y truncado de label a 1 línea.
- **Doc frames Figma:** `Select Option / Matriz` → **`Menu Item / Matriz`** (estado `active`, sin columna `read-only`/`disabled` duplicada); `Listbox / Matriz` → **`Menu List / Matriz`** (scroll `none/top/mid/bottom`); `Select / Matriz` y `Select / System` con los 7 estados (`open→active`, columna `focus` poblada).
- Ejemplo del DO "íconos en opciones" reemplazado por **"¿Qué necesitas?"** (6 trámites Isapre con íconos system distintos) — caso que sí justifica un select.

### Fixed — `select.css` (staging) sincronizado con Figma

Auditoría base completa en `docs/governance/audit-record-select.md`. `select.css` reescrito al estado final (pasa V4):
- `max-height` 236→**286px**; `min-width` trigger **160** / panel **200**.
- Anillo de focus **ring + gap** (trigger outset, opción inset) con `--color-focus-ring-default` + `--color-focus-ring-gap-default` + `--stroke-focus-ring-width`.
- Estado de opción `--selected`→**`--active`**; scrollbar `--radius-pill`.
- Naming unificado **`.menu-list` / `.menu-item`** (primitiva compartida; ARIA sigue `listbox`/`option`).
- Documentation links configurados en los 3 component sets de Figma.

### Auditoría
Cobertura de tokens del Select **100%** (los 3 componentes; único crudo restante = padding de `tooltip-body`, que pertenece al componente Tooltip). Consistencia componente ↔ documentación ↔ CSS verificada end-to-end.

### Changed — Text Field: estado `focus` de teclado

Agregado el estado **`focus`** (navegación por teclado, anillo ring+gap tokenizado: `color/focus/ring` + `color/focus/ring-gap` + `stroke/focus-ring-width`) a **input** y **text area**:
- input: duplicado de `active` → `focus`. text-area: su `focus` (estado de escritura, mal nombrado) renombrado a **`active`** para alinear con input + duplicado → nuevo `focus`.
- Ambos tipos quedan simétricos: `default · active · writing · filled · error · read-only · disabled · focus`. `active` = escritura/foco; `focus` = anillo de teclado.
- `docs/components/text-field.md` sincronizado (estado `active`, `focus` = anillo, tabla de Anillo de focus, border-width, Reglas + nota de **combinatoria de estados**, WCAG 2.4.7 / 2.4.11–2.4.13). Eliminada la fila `hover` (no existe ese estado).
- **Tokenización (Figma):** gaps de layout fuera de escala snapeados a `space/*` (Label/prefix/suffix/helper 10→8 `space/xs`; Helper Container 5→4 `space/2xs`) y grosores de trazo a `stroke/*`. Cobertura de tokens del componente **100%** (único crudo = `tooltip-body`, del componente Tooltip).
- **Doc frames Figma:** Matriz (8 columnas, `focus` agregado en input + text-area), System (fila `active`, `state` con `focus`, descripción de `focus` = navegación por teclado).

**Pendiente para el corte v0.2.0** (al regenerar `text-field.css`, hoy solo en `dist` congelado): anillo de focus **ring + gap** (el dist actual solo tiene ring), bg de `disabled` → `--color-action-primary-disabled` (el dist tiene el valor viejo), y grosores `--stroke-xs`/`--stroke-sm`.

El `dist/V.0.1.0` sigue **congelado** — el focus de Text Field entra en v0.2.0.

### Added — `text-field.css` (staging) + auditoría de cobertura total de componentes

Auditoría completa de componentes DS (live Figma + repo) con foco en cobertura 100%. Registros en `audit-record-select.md` / `audit-record-text-field.md`.

- **`src/components/text-field.css`** creado (antes solo existía en `dist` congelado). Refleja el estado final de Figma: 8 estados, anillo de focus **ring + gap**, afijos **prefix/suffix**, `disabled` bg → `--color-action-primary-disabled`, grosores `--stroke-xs/sm` por estado. Importado en `src/components/index.css`. Pasa V4 (0 HEX, 100% tokens).
- **`_divider`** (primitiva interna del menú, Figma `40003146:80675`) reflejado en dev: `.menu-divider` en `select.css` (`--color-border-divider-default`) + fila en `select.md`.
- **Registry de auditoría ampliado** (`ds-audit-protocol.md`, 3 lugares): sumados 8 componentes que estaban fuera de scope (familia Select + `chips/group`, `tabs/group`, `checkbox group`, `notification`). Exclusión explícita del `→ Navegador kit` (mockups de browser-chrome). Verificado live: unregistered = 0, missing = 0.
- **Exención C4.4 `hover`** documentada para `text fields` y `select` (inputs sin hover por diseño); script con `HOVER_EXEMPT`.

---

## [0.14.0] — 2026-06-17

### Fixed — Text Fields .md sincronizado con Figma (auditoría)

Auditoría completa de Text Fields (CS `40002482:2745`, 14 variantes) vía MCP en vivo. C1–C5 limpios (0 bindings sin resolver, 0 dangling). Ajustes en `docs/components/text-field.md` para reflejar la definición final de Figma:

- **Disabled fill:** `--color-bg-fill-neutral-medium` → `--color-action-primary-disabled` (mismo valor #f7f7f7, token que usa Figma).
- **Grosor de borde por estado:** documentado 2px (`--stroke-sm`) en focus/writing/error y 1px (`--stroke-xs`) en default/filled/read-only/disabled. Antes solo se documentaba 1px.
- **Fila `filled`** añadida a la tabla de tokens (completitud de estados).
- **Props faltantes:** sumadas `feedback` y `prefix-text` a la tabla de Propiedades.

Pendiente para el corte de v0.2.0 del dist: `text-field.css` (disabled bg) + bindear `strokeWeight` del `input-container` en Figma a `--stroke-xs`/`--stroke-sm` (hoy valores crudos).

### Changed — Gobernanza de release formalizada

- `design-system-rules.md §Versionado`: añadidas reglas de **dos tracks de versión** (raíz vs dist, independientes), **inmutabilidad de releases** (duplicar sin reemplazar, sin parches in-place — con la excepción documentada del `0.1.0-patch` pre-consumo) y corte de versión decidido por el owner.
- `ds-audit-protocol.md §7`: cadencia hacia un nuevo dist = una sola Full audit en el gate (no Triggered por componente).

### Added — Text Fields: afijo `suffix` (MINOR)

Nuevo afijo de texto trailing, espejo del `prefix`. Construido en Figma y documentado:

- **Figma:** props nuevas `suffix` (BOOLEAN, default ON) + `suffix-text` (TEXT, default "UF") en el set; bloque `suffix` agregado a las 7 variantes input (entre `Input Field` e `icon-right`), color heredado por estado (`color/text/primary`, disabled → `color/text/disabled`). Solo input (espejo del prefix; text-area no lo lleva).
- **Doc Figma (frame System):** fila `suffix` añadida a la tabla Propiedades; además se unificó idioma `Visible · hidden` → `Visible · oculto` en las filas de afijos/iconos/counter/tooltip.
- **`text-field.md`:** filas `suffix` + `suffix-text` añadidas; mismo `visible · hidden → visible · oculto`.

Pendiente para el corte de v0.2.0: estilo del suffix en `text-field.css`.

---

## [0.13.0] — 2026-05-05

### Added — Select component (Figma + spec)

Nuevo componente de selección única. Cubre tres sub-componentes coordinados:

**Select** — trigger con 7 estados (default · focus · open · filled · error · read-only · disabled), props label, placeholder, helper-text, icon-tooltip. Listbox posicionado absolute — nunca empuja el layout.

**Listbox** — panel flotante con dos variantes:
- `scroll=false` — hasta 5 opciones, alto automático (236px con 5 ítems)
- `scroll=true` — hasta 10 opciones, alto fijo 236px con scroll interno

**Select Option** — ítem seleccionable con 5 estados (default · hover · selected · focus · disabled) y soporte de ícono intercambiable. Si una opción tiene ícono, todas deben tenerlo.

**Entregables:**
- `docs/components/select.md` — spec completa: propiedades, props TypeScript, tokens color/layout/tipografía, HTML (combobox pattern), ARIA, teclado, reglas, accesibilidad
- `select.css` — pendiente para próximo dist

**Figma (OPS-Library-Aqua DS MVP):**
- Propiedades de Listbox renombradas de `item N` a `option N`
- `scroll=false`: max 5 opciones, `primaryAxisSizingMode=AUTO`
- `scroll=true`: 10 opciones, `primaryAxisSizingMode=FIXED`
- `state=open` en Select: Listbox con `layoutPositioning=ABSOLUTE` — no desplaza el form
- Frame Select / Use: correcciones de contenido (DON'T 2: listbox reducido a 2 opciones reales; DO 2: opciones Región 1–10 con nombres reales; DON'T 1: anti-pattern clarificado con label vacío; trailing space en tabla "Cuándo usar" eliminado)
- Frame Select / System: prop `placeholder` añadida a tabla de Propiedades; `tooltip` renombrado a `icon-tooltip`

### Fixed — Text Field disabled fill en Figma

Variante `state=disabled` del componente Text Field: corregido el fill del `input-container`. El token aplicado era incorrecto — ajustado al valor que corresponde al estado disabled.

---

## [0.12.0] — 2026-05-04

### Added — Patterns layer: Button Group + Form

Primera capa de patrones de composición. Documentados en Figma (page Componentes Documentación) con frames /System y /Use siguiendo el estándar de componentes.

**Button Group** — patrón de agrupación de acciones primaria + secundaria. Define espaciado, alineación y jerarquía entre botones en un mismo contexto.

**Form** — patrón de formulario que combina Text Field, Select, Checkbox y Radio Button. Define layout vertical, gap entre campos, agrupación de secciones y comportamiento en error.

Auditoría L6 de la capa de patterns completada post-entrega.

---

## [0.11.0] — 2026-04-30

### Fixed — Auditoría exhaustiva pre-release v0.2.1

Correcciones de documentación y gobernanza identificadas en el segundo audit completo antes del release.

**button.md — B01:** `outline-offset` usaba token de color (`--color-focus-ring-gap-default`, hex #f3f7ff) que es inválido como valor de tamaño. Corregido a `outline-offset: 2px` + `box-shadow: 0 0 0 2px var(--color-focus-ring-gap-*)` para el gap coloreado.

**chips.md — B02:** Tabla de tokens documentaba `--color-text-primary` / `--color-action-primary-default` para label/icon en estado filled. Figma usa `--color-text-inverse` / `--color-icon-system-inverse` (texto e icono blancos sobre fondo azul). Corregido.

**chips.md — W08:** Chip removible usaba `<button>` anidado dentro de `<button>` (HTML inválido). Cambiado chip container a `<div role="option" tabindex="0">`.

**radio-button.md — W09:** HTML usaba label implícito (wrapping). Alineado con tabla ARIA que especifica `for="[radio-id]"` → label explícito con `for=`.

**tabs.md — W06:** Referencia `color/text/primary-default` y `color/text/secondary-default` (tokens inexistentes con sufijo `-default`) → `--color-text-primary` y `--color-text-secondary`.

**ds-audit-protocol.md — W04:** Check de secciones decía "7 secciones" pero listaba 8 → corregido a 8.

**ds-audit-protocol.md — W05:** `function auditStructure` → `async function auditStructure`.

**design-system-rules.md — W02:** Ejemplo en capa semantics usaba `color-bg-action-primary-default` (token inexistente) → `color-action-primary-default`.

**design-system-rules.md — W03:** Tabla de sizing faltaba `--space-3xl` (64px, primitive 800) → añadido.

**design-system-rules.md — I06:** Scope MVP decía "Breakpoints: 3" → corregido a 5 (breakpoints reales del sistema).

**tokens-map.md — I03:** Typo "element" → "elemento".

**component-guide.md — I04:** Patrón de formulario con error usaba `--color-border-status-danger` (borde de alerta, rojo muy claro) → `--color-border-danger-focus` (token correcto para borde de input en error).

---

## [0.10.0] — 2026-04-30

### Fixed — CSS custom property names en docs de componentes (96 correcciones, 12 archivos)

Corrección masiva de nombres de CSS custom properties en los docs que no correspondían al token real en el JSON/Figma.

**Patrón 1 — Sufijo `-default` incorrecto en tokens sin estado** (23 tokens):
Tokens stateless como `color/text/primary`, `color/bg/status/info`, `color/icon/system/secondary` no tienen variantes de estado — el sufijo `-default` no corresponde al nombre real del token.

| ❌ Incorrecto | ✅ Correcto |
|---|---|
| `--color-text-primary-default` | `--color-text-primary` |
| `--color-text-inverse-default` | `--color-text-inverse` |
| `--color-text-disabled-default` | `--color-text-disabled` |
| `--color-bg-status-{info\|success\|warning\|danger\|neutral}-default` | `--color-bg-status-{…}` |
| `--color-border-status-{…}-default` | `--color-border-status-{…}` |
| `--color-icon-system-{primary\|secondary\|disabled\|inverse}-default` | `--color-icon-system-{…}` |
| `--color-bg-fill-brand-strong-default` | `--color-bg-fill-brand-strong` |
| `--color-bg-fill-inverse-strong-default` | `--color-bg-fill-inverse-strong` |

**Patrón 2 — Dominio `semantic` → `status`** (4 tokens en alert.md / toggle.md):
| ❌ Incorrecto | ✅ Correcto |
|---|---|
| `--color-icon-semantic-{danger\|info\|success\|warning}-default` | `--color-icon-status-{…}` |

**Patrón 3 — Nombres incorrectos** (7 tokens):
| ❌ Incorrecto | ✅ Correcto | Archivos |
|---|---|---|
| `--color-bg-fill-primary-default` | `--color-bg-fill-neutral-subtle` | chips, text-field |
| `--color-bg-fill-secondary-default` | `--color-bg-fill-neutral-medium` | chips, text-field |
| `--color-bg-fill-selected-default` | `--color-action-primary-default` | chips |
| `--color-bg-fill-subtle-default` | `--color-bg-fill-neutral-medium` | checkbox, chips, radio, tag |
| `--color-bg-surface-primary-default` | `--color-bg-surface-default` | checkbox, radio, tabs |
| `--color-border-hover` | `--color-border-default` | text-field |
| `--color-icon-system-tertiary-default` | `--color-icon-system-disabled` | toggle |

### Files modified
- `docs/components/alert.md`, `badge.md`, `button.md`, `checkbox.md`, `chips.md`, `link.md`, `radio-button.md`, `tabs.md`, `tag.md`, `text-field.md`, `toggle.md`, `tooltip.md`

---

## [0.9.0] — 2026-04-30

### Changed — `color/bg/fill/default/*` → `color/bg/fill/neutral/*` (Breaking)

Renombrados los 3 tokens de fill neutro para eliminar el uso ambiguo de `default` como nombre de dominio. `default` queda reservado exclusivamente como State (cuando el token tiene hermanos hover/active/inverse). `neutral` es el término correcto para la variante base dentro de un grupo.

| Antes | Después |
|---|---|
| `color/bg/fill/default/subtle` | `color/bg/fill/neutral/subtle` |
| `color/bg/fill/default/medium` | `color/bg/fill/neutral/medium` |
| `color/bg/fill/default/strong` | `color/bg/fill/neutral/strong` |

### Changed — Convención de naming formalizada en design-system-rules.md

Documentadas 6 reglas explícitas de T/P/R/S:
- `default` solo como State (con hermanos de estado)
- `neutral` para variante base sin estado
- Excepción de 5 niveles para dominios con calificadores (action/brand)
- Separadores `/` en Figma/JSON, `-` en CSS

### Files modified
- `tokens/semantics/semantics-color.json` — `fill/neutral` actualizado
- `docs/governance/design-system-rules.md` — sección naming reescrita

---

## [0.8.0] — 2026-04-30

### Changed — Restauración prefijo `color/` en tokens semánticos de color (Breaking)

Restaurado el prefijo `color/` como Topic en los **92 tokens semánticos de color**, alineando con el framework T/P/R/S completo de 4 niveles. Los tokens no-color (`space/`, `radius/`, `stroke/`, `type/`, `icon/size/`, `elevation/`) no cambian.

**Motivación:** sin `color/`, tokens simples como `text/primary` o `border/default` quedan en solo 2 segmentos (T/R o T/S), mientras que tokens compuestos tienen 3–4 segmentos. Con `color/` como Topic, todos los tokens de color pasan a T/P/R(/S) consistente.

**Patrón:** `{dominio}/...` → `color/{dominio}/...`

| Dominio | Antes | Después |
|---|---|---|
| bg | `bg/surface/default` | `color/bg/surface/default` |
| action | `action/primary/default` | `color/action/primary/default` |
| text | `text/primary` | `color/text/primary` |
| border | `border/default` | `color/border/default` |
| focus | `focus/ring/default` | `color/focus/ring/default` |
| icon | `icon/system/primary` | `color/icon/system/primary` |

### Files modified
- `tokens/semantics/semantics-color.json` — wrapper `color` añadido bajo `Semantics`

---

## [0.7.0] — 2026-04-30

### Changed — Alineación con agrupaciones de documentación (Breaking)

**22 operaciones** para que la colección Semantics refleje exactamente la jerarquía definida en los frames de documentación del archivo Tokens.

**1. Status domain-centric — revertir consolidación v0.6.0 (18 renames)**  
Los tokens de estado vuelven como sub-grupo de su dominio (`bg/status/`, `text/status/`, `border/status/`, `icon/status/`) en lugar de un grupo top-level `status/`. El token `status/border/danger/focus` se mueve al grupo global de border como `border/danger-focus`.

| Antes | Después |
|---|---|
| `status/bg/neutral·info·success·warning·danger` | `bg/status/neutral·info·success·warning·danger` |
| `status/text/info·success·warning·danger` | `text/status/info·success·warning·danger` |
| `status/border/info·success·warning` | `border/status/info·success·warning` |
| `status/border/danger/default` | `border/status/danger` |
| `status/border/danger/focus` | `border/danger-focus` |
| `status/icon/info·success·warning·danger` | `icon/status/info·success·warning·danger` |

**2. Border: eliminar sub-grupo "trazo" (3 renames)**  
Los tokens de trazo pasan al nivel directo de `border/`, consistente con la sección "Border — Global" del doc.

| Antes | Después |
|---|---|
| `border/trazo/default` | `border/default` |
| `border/trazo/focus` | `border/focus` |
| `border/trazo/disabled` | `border/disabled` |

**3. Adición (1)**  
- `border/inverse` → `global.white` (presente en doc "Border — Global", faltaba en variables)

### Files modified
- `tokens/semantics/semantics-color.json` — estructura domain-centric, trazo eliminado, border/inverse añadido

---

## [0.6.0] — 2026-04-30

### Changed — Estructura de tokens semánticos de color (Breaking)

**38 tokens renombrados** en dos operaciones:

**1. `status/` como grupo top-level (18 renames)**  
Todos los tokens de estado unificados bajo `status/`, organizados por dominio. `icon/semantic` renombrado a `status/icon`.

| Antes | Después |
|---|---|
| `bg/status/neutral` `text/status/info` `border/status/info` `icon/semantic/info` | `status/bg/neutral` `status/text/info` `status/border/info` `status/icon/info` |

`status/border/danger` conserva `/default` y `/focus` por tener dos estados.

**2. Eliminación de `/default` en tokens single-state (20 renames)**  
Tokens con un único estado eliminan el subfolder `/default` innecesario. Tokens con siblings de estado (action, border/trazo, focus/ring) lo conservan.

| Grupo | Ejemplos |
|---|---|
| text | `text/primary` · `text/secondary` · `text/inverse` · `text/disabled` · `text/brand` · `text/brand/strong` |
| icon | `icon/system/primary` · `icon/brand/primary` · (todos los icon system/brand) |
| bg | `bg/surface/inverse` · `bg/overlay` |
| border | `border/inverse` · `border/divider` · `border/divider/brand` |

### Files modified
- `tokens/semantics/semantics-color.json` — `status` promovido a top-level; tokens flat sin subfolder `/default`

---

## [0.5.0] — 2026-04-30

### Changed — Nomenclatura tokens semánticos de color (Breaking)

Eliminado el prefijo `color/` de los 92 tokens semánticos de color. Cada dominio pasa al top level, consistente con los tokens no-color (`space/`, `radius/`, `stroke/`, etc.). Los tokens `icon/size/*` y los nuevos `icon/system|brand|semantic/*` quedan unificados bajo un único grupo `icon/`.

**Patrón anterior → nuevo:**

| Dominio | Antes | Después |
|---|---|---|
| bg | `color/bg/surface/default` | `bg/surface/default` |
| action | `color/action/primary/default` | `action/primary/default` |
| text | `color/text/primary/default` | `text/primary/default` |
| icon | `color/icon/system/primary/default` | `icon/system/primary/default` |
| border | `color/border/trazo/default` | `border/trazo/default` |
| focus | `color/focus/ring/default` | `focus/ring/default` |

**92 tokens renombrados** (eliminación de prefijo `color/`).

### Files modified
- `tokens/semantics/semantics-color.json` — wrapper `color` eliminado, dominios al top level

---

## [0.4.0] — 2026-04-30

### Changed — Nomenclatura global de tokens semánticos (Breaking)

Adopción completa del framework **Topic/Property/Role/State** con slash `/` como separador en todos los niveles. El guión `-` queda reservado exclusivamente para nombres compuestos dentro de un segmento (`ring-gap`, `brand-strong`).

**Regla aplicada:** Role y State siempre separados por `/`. Estado siempre último segmento explícito.

**76 tokens renombrados + 1 eliminado + 1 valor corregido:**

| Grupo | Patrón anterior | Patrón nuevo | Cantidad |
|---|---|---|---|
| `action` | `primary-default` | `primary/default` | 28 |
| `bg/status` | `neutral-default` | `neutral/default` | 5 |
| `bg/surface` | `inverse-default` | `inverse/default` | 1 |
| `bg/overlay` | `overlay-default` | `overlay/default` | 1 |
| `text` | `primary-default` | `primary/default` | 13 |
| `icon` | `system/primary-default` | `system/primary/default` | 13 |
| `border` | `default/hover/disabled/focus` | `trazo/default·disabled·focus` | 4 |
| `border` | `inverse-default` / `divider/divider-default` / etc. | slash T/P/R/S | 8 |
| `focus` | `ring-default` / `ring-inverse` | `ring/default` / `ring/inverse` | 4 |
| Primitives | `type/family/base-default` | `type/family/base` | 1 |

**Cambios adicionales:**
- `color/border/hover` — **eliminado** (sin caso de uso activo)
- `color/border/trazo/disabled` — valor corregido: `gray.200` → `gray.100`
- `color/text/brand-strong` — reestructurado: `brand-strong/default` → `brand/strong/default` (consistente con `icon/brand/strong`)
- `color/border/danger-focus` → `color/border/status/danger/focus` (movido bajo `status/danger`)

### Files modified
- `tokens/semantics/semantics-color.json` — estructura completa reescrita en T/P/R/S

---

## [0.3.0] — 2026-04-30

### Changed — Tokens `bg/surface` (Breaking)
- `color/bg/surface/primary-default` → `color/bg/surface/default` (white)
- `color/bg/surface/secondary-default` → `color/bg/surface/subtle` (slate.50)
- `color/bg/surface/tertiary-default` — eliminado (no había uso real en componentes; gray.50 quedó solo en fill)

### Changed — Tokens `bg/fill` (Breaking — reestructura domain×intensity)
Arquitectura anterior (plana con sufijo `-default`) reemplazada por matriz dominio × intensidad:

| Token anterior | Token nuevo | Alias |
|---|---|---|
| `fill/primary-default` | `fill/default/subtle` | white |
| `fill/tertiary-default` | `fill/default/medium` | gray.50 |
| `fill/subtle-default` | `fill/default/strong` | gray.100 |
| `fill/brand-subtle-default` | `fill/brand/subtle` | red.50 → **red.100** |
| `fill/brand-medium-default` | `fill/brand/medium` | red.500 |
| `fill/brand-strong-default` | `fill/brand/strong` | red.600 |
| `fill/inverse-subtle-default` | `fill/inverse/subtle` | slate.200 → **slate.100** |
| `fill/inverse-medium-default` | `fill/inverse/medium` | slate.500 |
| `fill/inverse-strong-default` | `fill/inverse/strong` | slate.900 |

Tokens eliminados: `fill/secondary-default` (slate.50), `fill/selected-default` (slate.100), `fill/attention-default` (slate.900).

### Added — Tokens `layout/viewport`
- `layout/viewport/width` — mobile:375 · tablet:768 · desktop:1440 · desktop-lg:1920 (FLOAT, scope WIDTH_HEIGHT)
- `layout/viewport/height` — mobile:812 · tablet:1024 · desktop:1024 · desktop-lg:1080 (FLOAT, scope WIDTH_HEIGHT)

### Files modified
- `tokens/semantics/semantics-color.json` — surface + fill actualizados
- `tokens/responsive/layout.json` — añadido bloque `viewport`

---

## [0.2.1] — 2026-04-28

### Fixed — Tokens (Audit)
- Añadidos 5 tokens semánticos faltantes: `color/bg/fill/subtle-default` (gray.100), `color/bg/fill/selected-default` (slate.100), `color/bg/fill/attention-default` (slate.900), `color/border-disabled` (gray.200), `color/border-hover` (slate.400).
- `dist/components/chips.css` — corregido `--color-bg-fill-default` → `--color-bg-fill-primary-default`, `--color-bg-fill-active` → `--color-bg-fill-selected-default`, `--focus-ring-width` → `--stroke-focus-ring-width`. Añadido estado hover faltante.
- `dist/components/button.css` — corregido `.btn--destructive` → `.btn--brand`, eliminados selectores `destructive.*secondary/tertiary` obsoletos, `--focus-ring-width` → `--stroke-focus-ring-width`.
- `dist/components/*.css` — `--focus-ring-width` → `--stroke-focus-ring-width` en alert, radio-button, text-field, tabs, link, checkbox, toggle.
- `docs/components/*.md` — sincronizados tokens de `chips`, `button`, `link`, `toggle`, `tabs`, `radio-button`, `checkbox` con `dist/tokens.css`.

### Added — Componentes
- **Chips** — estado `hover` implementado en Figma y CSS: `bg/fill/secondary-default` (slate.50).
- **Radio Group** — `layoutMode` habilitado en COMPONENT_SET para soporte de `fill container` en variantes.

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
