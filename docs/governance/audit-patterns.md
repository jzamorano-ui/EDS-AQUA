# Auditoría de patterns

Protocolo de revisión para frames Figma y `.md` de cada pattern del DS. Aplicar en orden: Figma primero, `.md` al final.

---

## Proceso por pattern

1. Verificar que la página `→ {Nombre}` existe en DS-Piloto y contiene los 2 frames obligatorios
2. Revisar el frame **Patrón** — estructura, contenido y componentes
3. Aplicar ajustes en Figma si hay gaps
4. Verificar/crear el `.md` en `docs/patterns/`
5. Confirmar que el `.md` refleja el frame Patrón sin discrepancias

---

## Estándar del frame Patrón

### Artboard header

| Elemento | Requisito |
|---|---|
| Dimensiones | 1344 × 230px |
| Fill | Teal oscuro `#0F2029` |
| Title | Nombre del pattern — Noto Sans 54px Regular |
| Project | "Aqua Design System" — 16px Regular |
| Badge | Categoría visible (ej. "Acción", "Navegación", "Entrada") |

### Body

| Elemento | Requisito |
|---|---|
| Padding | `padT:96 padB:96 padL:112 padR:112` |
| Item spacing | 64px entre secciones |
| Lede | 1–2 líneas — qué hace el pattern y qué comunica |
| H2 de sección | 32px Regular — encabezado de la sección principal |
| cols | 2 columnas con ejemplos visuales de componentes DS reales |
| mob-row | Heading "Responsive" + bullets + 2 phones con componentes DS |
| section-estados | Heading "Reglas de composición" + tabla |

### Tabla de reglas

| Criterio | Requisito |
|---|---|
| Mínimo | 4 reglas |
| Máximo | 6 reglas |
| Lenguaje | Claro y directo — sin términos técnicos de implementación |
| Comportamiento | Accionable — describe qué pasa, no un principio abstracto |

---

## Estándar del frame Ejemplos

| Criterio | Requisito |
|---|---|
| Nombre | `{Nombre} - Ejemplos (referenciales)` |
| Header | Mismo estilo oscuro, título "Ejemplos (referenciales)" |
| Contextos | Al menos 1 ejemplo desktop + 1 ejemplo mobile |
| Componentes | Instancias reales del DS — sin mockups ni frames estáticos permanentes |
| Layout desktop | Definido por el pattern (ej. 2 columnas en Form) |
| Layout mobile | 1 columna — campos o elementos llenan el ancho del contenedor |

---

## Checklist de revisión

```
FRAME PATRÓN — ESTRUCTURA
[ ] Página `→ {Nombre}` existe en DS-Piloto (9FoTERLTyDXz3gmPLjjJ09)
[ ] Frame "{Nombre} - Patrón" existe en la página
[ ] Frame "{Nombre} - Ejemplos (referenciales)" existe en la página
[ ] Artboard header: Title correcto + badge de categoría presente
[ ] Lede presente — 1–2 líneas, lenguaje directo

FRAME PATRÓN — CONTENIDO
[ ] Sección principal con H2 + cols (2 columnas con ejemplos visuales)
[ ] Captions en las cards de ejemplo
[ ] mob-row: heading "Responsive" + bullets + 2 phones
[ ] section-estados: heading "Reglas de composición" + tabla
[ ] Reglas: mínimo 4, máximo 6
[ ] Reglas: lenguaje sin tecnicismos — comprensible sin contexto de implementación
[ ] Reglas: cada comportamiento es accionable y específico

COMPONENTES EN FIGMA
[ ] Cards de ejemplo usan instancias reales del DS (no frames estáticos)
[ ] Phones del mob-row usan instancias reales del DS
[ ] Sin wireframes grises como placeholders permanentes

.MD
[ ] Archivo existe en `docs/patterns/{nombre-kebab}.md`
[ ] Lede coincide con el frame Patrón (misma idea, mismo tono)
[ ] Sección principal con el mismo nombre que el H2 del frame
[ ] Responsive: mismas reglas que el mob-row del frame
[ ] Tabla de reglas: mismas reglas que el frame — texto idéntico
[ ] Sección Accesibilidad presente con criterios accionables
[ ] Sin términos técnicos que no estén también en el frame Figma
```

---

## Reglas globales

- **Figma es fuente de verdad** — el `.md` refleja el frame Patrón, nunca al revés.
- **Lenguaje claro** — reglas y captions deben ser comprensibles sin contexto técnico de implementación.
- **Componentes reales** — los ejemplos usan instancias del DS; los wireframes son temporales.
- **Consistencia entre patterns** — todos los frames siguen el template establecido con Button Group.

---

## Escala de evaluación (0–10)

| Dimensión | Peso | Qué se evalúa |
|---|---|---|
| **Estructura frame** | 30% | Header, body, secciones, mob-row y tabla presentes y correctos |
| **Contenido** | 30% | Lede claro, reglas accionables, lenguaje sin tecnicismos |
| **Componentes** | 20% | Instancias reales del DS en cards y phones — sin placeholders |
| **.md** | 20% | Existente y consistente con el frame Patrón sin discrepancias |

Un pattern llega al **10** cuando el frame sigue el template, las reglas son claras, los ejemplos usan componentes reales y el `.md` refleja el frame sin diferencias.

---

## Estado por pattern

_Última revisión: 2026-05-04_

| Pattern | Página Figma | Frame Patrón | Frame Ejemplos | .md | Score |
|---|---|---|---|---|---|
| Button Group | `→ Button group` | ✅ | ✅ | ✅ | 10 |
| Form | `→ Form` | ✅ | ✅ | ✅ | 10 |

`✅` completo · `🔄` en revisión · `⚠️` tiene issues · `—` pendiente

---

## Hallazgos abiertos

| ID | Pattern | Frame | Hallazgo | Severidad | Estado |
|---|---|---|---|---|---|
| — | — | — | — | — | — |

---

## Output por hallazgo

```
[P-{seq}] {Blocker | Warning | Info}
Pattern:   {nombre del pattern}
Frame:     {Patrón | Ejemplos | .md}
Hallazgo:  {descripción exacta de qué falla y por qué}
Acción:    {corrección específica}
Estado:    Pending | Resolved
```
