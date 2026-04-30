# Auditoría de documentación de componentes

Protocolo de revisión para frames Figma y `.md` de cada componente del DS. Aplicar en orden: Figma completo primero, `.md` al final.

---

## Proceso por componente

1. Revisar todos los frames Figma del componente: **System → Matriz → Use**
2. Identificar hallazgos por frame
3. Aplicar ajustes en Figma
4. Verificar que el component set base está bien construido y es responsive
5. Verificar/aplicar rebind de tokens rotos o desactualizados
6. Verificar/aplicar documentation link en cada component set de la página
7. Preguntar si homologar el `.md`

---

## Estándar por frame

### / System

| Sección | Qué debe tener |
|---|---|
| Definición | 1–2 oraciones en lenguaje directo. No robótico. |
| Variantes | Tabla comparativa si el componente tiene sub-tipos (ej: input vs text-area) |
| Estados | Tabla completa — todos los estados del component set con su comportamiento |
| Propiedades | Tabla con props clave, valores posibles y defaults |
| Sub-componente | Sección propia si hay un sub-componente con diferencias relevantes |
| Reglas | 5–8 reglas directas — sin valores primitivos, siempre tokens semánticos |
| Capas | Nombres semánticos: `section-estados`, `section-propiedades`, `section-reglas`, etc. |

### / Matriz

| Criterio | Qué debe cumplir |
|---|---|
| Estructura | Auto layout puro — template estándar (VERTICAL outer → header → body → grid) |
| Cobertura | Todas las variantes y estados del component set presentes |
| Superficies | Default + Inverse donde aplique |
| Instancias | Masters reales del component set — no mockups ni frames estáticos |
| Responsive | Frames con `FILL`/`HUG` — no anchos fijos que rompen al escalar |
| Naming | Usar "/ Matriz" no "/ Component" para consistencia |

### / Use

| Criterio | Qué debe tener |
|---|---|
| Cuándo usar / no | Orientación práctica — no duplicar reglas técnicas del System |
| DO/DON'T | Con instancias reales del componente |
| Sin redundancia | No repetir tablas de estados o propiedades que ya están en System |

---

## Checklist de revisión

```
SYSTEM
[ ] Definición — lenguaje directo, no robótico
[ ] Variantes — tabla si hay sub-tipos
[ ] Estados — todos los del component set, ninguno faltante
[ ] Propiedades — props clave con valores y defaults
[ ] Sub-componente — sección propia si aplica
[ ] Reglas — sin primitivos, solo tokens semánticos
[ ] Capas — nombres semánticos (section-*)

MATRIZ
[ ] Auto layout — template estándar
[ ] Cobertura — todos los estados y variantes
[ ] Superficies Default + Inverse donde aplique
[ ] Instancias reales del component set
[ ] Naming — "/ Matriz" no "/ Component"
[ ] Responsive — FILL/HUG, no anchos fijos

USE
[ ] Cuándo usar / cuándo no — orientación práctica
[ ] DO/DON'T con instancias reales
[ ] Sin redundancia con System

TOKENS
[ ] Sin valores primitivos (hex, aliases raw) en ningún frame
[ ] Solo CSS custom properties semánticas
[ ] Rebind de variables rotas o con nombres desactualizados aplicado

COMPONENT CONFIG
[ ] Cada component set de la página tiene documentation link configurado
[ ] El link apunta a la página Figma correcta del componente
[ ] Formato: https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/OPS-Library-Aqua-DS-MVP?node-id={pageId}

ACCESIBILIDAD
[ ] ARIA documentado en System o .md
[ ] Navegación por teclado especificada
[ ] Touch target mínimo 44×44px donde aplique
[ ] Contraste referenciado con token semántico (no hex)
[ ] Focus visible siempre presente

RESPONSIVE
[ ] Component set usa auto layout — no posiciones absolutas innecesarias
[ ] Frames de doc con FILL horizontal — no anchos fijos
[ ] Variantes de tamaño (si existen) documentadas

.MD
[ ] Homologado con Figma — sin discrepancias en estados, props o reglas
[ ] Sin valores primitivos
[ ] Secciones: Propiedades · Props · Tokens · HTML · ARIA · Teclado · Reglas · Accesibilidad
```

---

## Reglas globales

- **Sin valores primitivos** — siempre tokens semánticos (`--color-action-brand-default`, no `#FF585C` ni `red/500`). Excepción: medidas WCAG sin token asociado (44px touch target, 2px focus ring).
- **`surface=Inverse`** aplica a Primary, Secondary y Tertiary — nunca a Brand.
- **Nombres de capa semánticos** en todos los frames de documentación.
- **Lenguaje directo** en definiciones y reglas — no robótico, no técnico innecesario.
- **Component set** es la fuente de verdad — la documentación refleja lo que el componente realmente tiene.
- **Documentation link** obligatorio en cada component set — apunta a la página Figma de ese componente (`node-id` = ID de la página, no del set). Si la página tiene varios sets (ej: `radio button` + `radio group`) todos apuntan al mismo `node-id`.

---

## Escala de evaluación (0–10)

| Dimensión | Peso | Qué se evalúa |
|---|---|---|
| **Contenido System** | 25% | Definición · Variantes · Estados · Propiedades · Reglas completas y correctas |
| **Matriz** | 20% | Auto layout · cobertura de estados · instancias reales · responsive |
| **Use** | 15% | DO/DON'T con instancias · sin redundancia con System |
| **Tokens** | 20% | Solo semánticos en toda la documentación · sin primitivos |
| **Accesibilidad** | 10% | ARIA · teclado · touch target · contraste · focus documentados |
| **Responsive** | 10% | Component set y frames doc con FILL/HUG — no anchos fijos |

Un componente llega al **10** cuando todas las dimensiones están cubiertas sin errores ni placeholders.

---

## Estado por componente

_Última revisión: 2026-04-30 — Doc links añadidos a todos los component sets_

| Componente | System | Matriz | Use | Tokens | A11y | Responsive | .md | Doc link | Score |
|---|---|---|---|---|---|---|---|---|---|
| Button | ✅ | ✅ | ✅ | ✅ | — | — | ✅ | ✅ | 10 |
| Text Field | ✅ | ✅ | ✅ | ✅ | — | — | ✅ | ✅ | 9 |
| Check box | ✅ | ✅ | ✅ | ✅ | — | — | ✅ | ✅ | 10 |
| Radio button | ✅ | ✅ | ✅ | ✅ | — | — | ✅ | ✅ | 10 |
| Toggle | ✅ | ✅ | ✅ | ✅ | — | — | ✅ | ✅ | 10 |
| Chips | ✅ | ✅ | ✅ | ✅ | — | — | ✅ | ✅ | 10 |
| Link | ✅ | ✅ | ✅ | ✅ | — | — | ✅ | ✅ | 10 |
| Tabs | ✅ | ✅ | ✅ | ✅ | — | — | ✅ | ✅ | 10 |
| Alert | ✅ | ✅ | ✅ | ✅ | — | — | ✅ | ✅ | 10 |
| Spinner | ✅ | ✅ | ✅ | ✅ | — | — | ✅ | ✅ | 10 |
| Tooltip | ✅ | ✅ | ✅ | ✅ | — | — | ✅ | ✅ | 10 |
| Badge | ✅ | ✅ | ✅ | ✅ | — | — | ✅ | ✅ | 10 |
| Tag | ✅ | ✅ | ✅ | ✅ | — | — | ✅ | ✅ | 10 |

`✅` completo · `🔄` en revisión · `⚠️` tiene issues · `—` pendiente

---

## Hallazgos abiertos

| ID | Componente | Frame | Hallazgo | Severidad | Estado |
|---|---|---|---|---|---|
| C-01 | Button | CSS | `.btn--ghost` existía en `dist/components/button.css` sin contraparte en Figma ni en `button.md`. Verificado en DS-Piloto (126 variantes): no existe. Eliminado del CSS. | Minor | Resolved |

---

## Output por hallazgo

```
[Frame] Hallazgo
Problema:  descripción exacta
Acción:    corrección específica
Estado:    Pending | Resolved
```
