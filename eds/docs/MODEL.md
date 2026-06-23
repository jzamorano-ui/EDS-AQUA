# EDS — el modelo en 1 página

> Un solo idioma para **diseño** y **dev**. Todo en el sistema se describe con **3 ejes**.

---

## Los 3 ejes

| Eje | Pregunta | Valores |
|---|---|---|
| **1 · Rol / intención** | ¿qué *es*? | `primary` (system) · `secondary` (system 2º) · `brand` (marca) · `success` · `warning` · `error` · `info` |
| **2 · Tratamiento** | ¿cómo se *muestra*? | **acciones:** relleno · contorno · texto — **superficies:** subtle · medium · strong |
| **3 · Estado** | ¿en qué *situación*? | default · hover · active · disabled · focus |

**Una cosa = rol + tratamiento + estado.** Nada más que memorizar.

---

## Cómo se dice lo mismo en los dos lados

| Diseñador dice… | Dev escribe… |
|---|---|
| botón **primario** | `<Button color="primary">` |
| botón de **marca** | `<Button color="brand">` |
| el mismo, **contorno** | `variant="outlined"` |
| el mismo, **texto** | `variant="text"` |
| en **hover** | *(automático)* |
| **peligro** | `<Button color="error">` |
| fondo **sutil de marca** | `sx={{ bgcolor: 'brand.subtle' }}` |
| color en CSS plano | `var(--eds-palette-brand-main)` |

→ **El nombre que elige diseño es el que escribe dev.** Esa es la sinergia.

---

## El botón, completo (system + brand conviven)

| | relleno | contorno | texto |
|---|---|---|---|
| **system** (navy) | `color="primary" variant="contained"` | `…variant="outlined"` | `…variant="text"` |
| **marca** (coral) | `color="brand" variant="contained"` | `…variant="outlined"` | `…variant="text"` |

Son **2 intenciones × 3 tratamientos**. El "botón secundario" no es otro color — es el mismo, otro **tratamiento**.

---

## Estructura de tokens (3 capas)

1. **Rol / intención** → `palette.{primary,secondary,brand,error,warning,info,success}` con `main/light/dark/contrastText + hover/active/disabled + subtle`.
2. **Superficies & neutrales** → `text · background · divider · grey · border · fill · deco`.
3. **Feedback & detalle** → `status` (multi-canal) · `focus` · `link` · `icon`.

> `action` (de MUI) = overlays de interacción (hover en listas/menús). **No** es el "action" de Aqua —
> ese concepto se disolvió en *rol + tratamiento + estado*, que es más claro.

---

## Reglas de oro
- **El color es la intención; el tratamiento es la variante; el estado es automático.**
- Diseño y dev nombran igual → consistencia.
- Para escalar: un color nuevo = un rol nuevo, con sus mismos tratamientos y estados. No se reinventa nada.

Detalle completo de valores: [`TOKENS.md`](./TOKENS.md).
