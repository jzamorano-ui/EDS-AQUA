# Tag

Etiqueta informativa de clasificación. Comunica a qué categoría pertenece un elemento. No comunica estado del sistema (`badge`) ni selección activa (`chip`).

---

## Propiedades

| Propiedad | Valores |
|---|---|
| `icon left` | true · false (default: true) |
| `icon right` | true · false (default: true) |
| `Text` | texto corto (máximo ~15 caracteres) |

Un único componente base sin variantes de color — el tag es neutral.

---

## Props

```typescript
interface TagProps {
  label: string                  // requerido — máximo ~15 caracteres
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
}
```

---

## Tokens

### Color

| Elemento | Propiedad CSS | CSS custom property |
|---|---|---|
| Tag (frame) | background | `--color-bg-fill-neutral-medium` |
| Tag (frame) | border | `--color-border-default` |
| `Label content` | color | `--color-text-secondary` |
| Iconos | fill | `--color-icon-system-secondary` |

### Layout

| Propiedad | CSS custom property | Valor |
|---|---|---|
| `padding-inline` | `--space-xs` | 8px |
| `padding-block` | `--space-2xs` | 4px |
| `gap` (icon · label) | `--space-2xs` | 4px |
| `border-radius` | `--radius-xs` | 4px |
| `border-width` | `--stroke-xs` | 1px |

### Tipografía

| Elemento | Estilo | font-size | font-weight | line-height |
|---|---|---|---|---|
| `Label content` | `caption/sm-medium` | 12px | 500 | 16px |

---

## HTML

```html
<!-- Sin iconos -->
<span class="tag">Dental</span>

<!-- Con icono leading -->
<span class="tag">
  <svg aria-hidden="true">…</svg>
  Dental
</span>
```

---

## ARIA

| Elemento | Tag | Atributos requeridos |
|---|---|---|
| Tag | `<span>` | texto visible como contenido |
| Iconos | `<svg>` | `aria-hidden="true"` |

Si el tag es la única indicación de categoría, el elemento padre debe tener `aria-label` o texto adyacente que lo contextualice.

---

## Teclado

Este componente no es interactivo — no recibe foco.

---

## Reglas

- Texto máximo 1–2 palabras. Sin puntuación al final.
- Iconos solo cuando aporten claridad semántica al label.

---

## Accesibilidad

- El label es obligatorio — no depender solo del borde para comunicar la categoría.
- Iconos son decorativos: `aria-hidden="true"`.
- El tag no recibe foco ni requiere role de acción.
