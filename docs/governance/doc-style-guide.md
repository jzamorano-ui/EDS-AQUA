# Guía de estilo — Documentación del DS

Referencia canónica para la documentación de Aqua DS, tanto los **frames de Figma** (System · Use · Matriz · Inspection) como los **`.md` del repo**. Su objetivo es que cualquier persona del equipo produzca documentación **consistente en idioma, tono, estructura y forma** al agregar componentes.

> **Regla de oro:** un componente nuevo se documenta **clonando el template maestro** (`_Template / *` en Figma · `_template.md` en repo), **nunca** copiando otro componente — copiar propaga inconsistencias.

---

## 1. Idioma — español neutro

Toda la documentación se escribe en **español neutro**: conjugación con "tú" o impersonal/infinitivo. **Prohibido el voseo** y los modismos rioplatenses.

| ❌ Voseo / modismo | ✅ Neutro |
|---|---|
| usá, separá, elegí, activá | usar, separar, elegir, activar (infinitivo) |
| tenés, querés, podés, hacés | tienes, quieres, puedes, haces (o impersonal) |
| componés, enganchás | se compone, se engancha |
| acá, dale, avisá, fijate | aquí, listo, avisa, fíjate |

**Patrón recomendado** (como el resto de los docs): **infinitivo** para reglas/acciones (*"Para ejecutar algo usar Menu"*) e **impersonal** para descripciones (*"El placeholder desaparece al escribir"*).

---

## 2. Tono

Voz de una profesional joven, clara y empática. Directo pero con calidez. **No robótico ni técnico de más.**

- Instrucciones en imperativo amigable; "tú" implícito.
- Las restricciones se explican **con el porqué**, no solo con "no se debe".
- Evitar jerga cuando hay una forma más natural.

| ❌ | ✅ |
|---|---|
| "El componente Button se utiliza para ejecutar acciones" | "Los botones son para acciones — cuando quieras que alguien haga algo" |
| "No usar Button para navegación" | "Si necesitas llevar a otra pantalla, usa un link — el botón es para hacer, no para ir" |

---

## 3. Estructura — los 4 frames de Figma

Cada componente tiene 4 frames con propósito fijo. **No mezclar contenido entre frames.**

| Frame | Contenido |
|---|---|
| **`/ System`** | Definición (1–2 líneas) · **Propiedades** (`Propiedad`/`Valores`) · **Estados** (`Estado`/`Cuándo aparece`) · **Reglas** (`Regla`/`Por qué`). Orden fijo. Estados en minúscula. |
| **`/ Matriz`** | Grid con instancias reales: filas = variantes, columnas = estados. Superficie Default. Sin mockups. |
| **`/ Component - inspection`** | Prototipo interactivo (modo play). Intro: *"Inspecciona este componente aquí 👇🏼"*. Instancias con interacciones reales. |
| **`/ Use`** | Intro (1 línea) · tabla **"Cuándo usar"** · cards **DO/DON'T** con instancias reales. (Componentes que se confunden entre sí — Badge/Tag/Chips — incluyen además el **bloque de comparación**.) |

### `.md` del repo — 8 secciones fijas
`Propiedades · Props · Tokens · HTML · ARIA · Teclado · Reglas · Accesibilidad` (ver `docs/components/_template.md`).

---

## 4. Tipografía de los frames doc

| Elemento | Tamaño / peso |
|---|---|
| Título del frame (header) | 54px |
| Encabezado de sección ("Cuándo usar", "Reglas", "Estado visual") | **32px Regular** |
| Header de columna de tabla | **13px Bold** |
| Body de tabla / descripciones | regular |

> Las tablas usan el **componente de tabla estándar** (`Table/body` / `Table/elements`): **header blanco**, se distingue por negrita + borde. **Nunca header con fondo de color.**

---

## 5. Label de sección (header de cada frame)

El label pequeño del header muestra la **categoría de página**, en **inglés** (igual que las secciones de página `↓ ...`):

| Página | Label |
|---|---|
| ❖ Button · ❖ Menu | **Actions** |
| ❖ Chips · ❖ Check box · ❖ Radio button · ❖ Toggle | **Selection** |
| ❖ Text Field · ❖ Select · ❖ Combobox | **Input** |
| ❖ Link · ❖ Tabs | **Navigation** |
| ❖ Alert · ❖ Spinner · ❖ Tooltip | **Feedback** |
| ❖ Badge · ❖ Tag | **Data display** |

> Es el error de copy-paste más común. Al clonar, **siempre actualizar este label.**

---

## 6. Bloque de comparación (Badge · Tag · Chips)

Los 3 componentes que los diseñadores confunden llevan, **cada uno en su `/ Use`**, el bloque que los diferencia (3 cards: Tag · Badge/state · Chip):

- **Mismo contenido** en los 3 (descripciones idénticas).
- Cada doc **lidera con su propio componente, destacado** (borde 2px `--color-action-primary-default`).
- Ej.: en `Chips / Use` la card **Chip** va primera y destacada.

---

## 7. Checklist al agregar un componente

- [ ] Clonado del **template maestro** (no de otro componente).
- [ ] Label de sección actualizado a la categoría correcta.
- [ ] Español neutro, sin voseo.
- [ ] Encabezados de sección 32px; tablas con header blanco.
- [ ] Estados en minúscula; reglas con su "Por qué".
- [ ] `.md` con las 8 secciones.
- [ ] (Si aplica) bloque de comparación con el componente propio destacado.

La validación de estos puntos está en el protocolo de auditoría, **capa L7 — Frames de documentación** (`ds-audit-protocol.md`).
</content>
