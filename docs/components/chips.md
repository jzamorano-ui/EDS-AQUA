# Chips

Filtro o selección interactiva compacta dentro de la misma vista. Para navegar entre secciones usar `tabs`; para estados del sistema usar `badge`.

---

## Propiedades

| Propiedad | Valores |
|---|---|
| `type` | filled (activo) · outline (disponible) |
| `leading-icon` | opcional · referencial |
| `trailing-action` | opcional · solo en chips removibles |

---

## Props

```typescript
interface ChipProps {
  label: string
  selected?: boolean           // default: false — true = filled, false = outline
  leadingIcon?: React.ReactNode
  disabled?: boolean           // default: false
  onRemove?: () => void        // si se provee, muestra trailing-action (remove)
  onClick?: () => void
}

interface ChipGroupProps {
  mode: 'multi' | 'single'    // multi = aria-pressed, single = aria-selected
  chips: Array<ChipProps & { id: string }>
  ariaLabel: string            // requerido para el grupo
  onChange?: (selectedIds: string[]) => void
}
```

---

## Tokens

### Color

| Elemento | Estado | Propiedad CSS | CSS custom property |
|---|---|---|---|
| `chip` filled | — | background | `--color-bg-fill-active` |
| `chip` outline | — | background | `--color-bg-fill-default` |
| `chip` outline | — | border | `--color-border-default` |
| `Label chip` | — | color | `--color-text-primary-default` |
| `system` (iconos) | — | fill | `icon/system/context-color` (hereda del contenedor) |

> Estados hover, focus y active no tienen tokens definidos en el spec actual — pendiente de próxima iteración.

### Layout

| Propiedad | CSS custom property | Valor |
|---|---|---|
| `border-radius` | `--radius-pill` | 999px |
| `padding-inline` | `--space-sm` | 12px |
| `padding-block` | `--space-xs` | 8px |
| `gap` (icon · label · trailing) | `--space-xs` | 8px |
| `border-width` (outline) | `--stroke-xs` | 1px |

### Tipografía

| Elemento | Estilo | font-size | font-weight | line-height |
|---|---|---|---|---|
| `Label chip` | `body/md-medium` | 14px | 500 | 20px |

---

## HTML

```html
<!-- multi-select: cada chip es un toggle independiente -->
<button type="button" aria-pressed="true" class="chip chip--filled">Dental</button>
<button type="button" aria-pressed="false" class="chip chip--outline">Farmacia</button>

<!-- single-select: un chip activo a la vez -->
<div role="listbox" aria-label="Categoría de producto">
  <div role="option" aria-selected="true" tabindex="0" class="chip chip--filled">Dental</div>
  <div role="option" aria-selected="false" tabindex="-1" class="chip chip--outline">Farmacia</div>
</div>

<!-- chip removible -->
<button type="button" aria-pressed="true" class="chip chip--filled">
  Dental
  <button type="button" aria-label="Eliminar Dental">
    <svg aria-hidden="true">…</svg>
  </button>
</button>
```

---

## ARIA

| Contexto | Elemento | Tag · Role | Atributos requeridos |
|---|---|---|---|
| Multi-select | Chip | `<button>` | `aria-pressed="true/false"` |
| Single-select | Chip | `<div role="option">` | `aria-selected="true/false"` · `tabindex` |
| Single-select | Grupo | `<div role="listbox">` | `aria-label="[nombre del grupo]"` |
| Trailing action | Botón remove | `<button>` | `aria-label="Eliminar [label]"` |
| Iconos | `<svg>` | — | `aria-hidden="true"` |

---

## Teclado

| Tecla | Acción |
|---|---|
| `Tab` | Foco al chip (o al activo en el grupo) |
| `Shift + Tab` | Foco al elemento anterior |
| `Enter` · `Space` | Activa o desactiva el chip |
| `Delete` · `Backspace` | Elimina el chip (si tiene trailing-action) |

---

## Reglas

- `type=filled` = chip activo. `type=outline` = chip disponible. No mezclar semántica.
- Multi-select y single-select no se mezclan en el mismo grupo.
- El trailing-action (remove) tiene su propio `aria-label` — no hereda el del chip padre.
- No usar chips para navegar entre secciones → `tabs`.
- Labels máximo 1–2 palabras, ~20 caracteres.

---

## Accesibilidad

- Estado activo se comunica vía `aria-pressed` (multi-select) o `aria-selected` (single-select) — nunca ambos en el mismo grupo.
- No depender solo del color para comunicar el estado seleccionado.
- **WCAG 2.5.5** — touch target del trailing-action mínimo 44×44px.
