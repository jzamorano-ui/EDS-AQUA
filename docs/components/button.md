# Button

Ejecuta acciones. Para navegar usar `link`; para opciones on/off usar `toggle`.

---

## Propiedades

| Propiedad | Valores |
|---|---|
| `variant` | Primary · Secondary · Tertiary |
| `tone` | Default · Destructive |
| `surface` | Default · Inverse |
| `size` | Large · Medium · Small |
| `state` | Default · Hover · Active · Focus · Disabled · Loading |

**Combos válidos (7):** Primary/Default/Default · Primary/Default/Inverse · Primary/Destructive/Default · Secondary/Default · Secondary/Destructive · Tertiary/Default · Tertiary/Destructive.

---

## Props

```typescript
interface ButtonProps {
  variant?: 'Primary' | 'Secondary' | 'Tertiary' | 'Ghost'  // default: 'Primary'
  tone?: 'Default' | 'Destructive'                     // default: 'Default'
  surface?: 'Default' | 'Inverse'                      // default: 'Default'
  size?: 'Large' | 'Medium' | 'Small'                  // default: 'Medium'
  label?: string                                        // requerido en button; omitir en button/icon
  icon?: React.ReactNode                               // opcional en button; requerido en button/icon
  iconPosition?: 'left' | 'right'                     // default: 'left'
  disabled?: boolean                                   // default: false
  loading?: boolean                                    // default: false
  ariaLabel?: string                                   // requerido si no hay label visible (button/icon)
  onClick?: () => void
}
```

---

## Tokens

### Color

| Combo | `background` | `color` | `icon` | `focus-ring` |
|---|---|---|---|---|
| Primary Default | `--color-action-primary-*` | `--color-text-inverse-default` | `--color-icon-system-inverse-default` | `--color-focus-ring-default` |
| Primary Inverse | `--color-action-inverse-*` | `--color-text-primary-default` | `--color-icon-system-primary-default` | `--color-focus-ring-inverse` |
| Primary Destructive | `--color-action-destructive-*` | `--color-text-inverse-default` | `--color-icon-system-inverse-default` | `--color-focus-ring-default` |
| Secondary Default | `--color-action-secondary-*` | `--color-text-primary-default` | `--color-icon-system-primary-default` | `--color-focus-ring-default` |
| Secondary Destructive | `--color-action-secondary-*` | `--color-text-status-danger-default` | `--color-icon-semantic-danger-default` | `--color-focus-ring-default` |
| Tertiary Default | `--color-action-tertiary-*` | `--color-text-primary-default` | `--color-icon-system-primary-default` | `--color-focus-ring-default` |
| Tertiary Destructive | `--color-action-tertiary-*` | `--color-text-status-danger-default` | `--color-icon-semantic-danger-default` | `--color-focus-ring-default` |
| **Disabled (todos)** | `--color-action-primary-disabled` | `--color-text-disabled-default` | `--color-icon-system-disabled-default` | — |

`*` = sufijo por estado interactivo: `-default` · `-hover` · `-active`

Focus: `outline: var(--focus-ring-width) solid var(--color-focus-ring-default); outline-offset: 2px`

### Layout

| Propiedad | Size | CSS custom property | Valor |
|---|---|---|---|
| altura del componente | Large | — | 52px |
| altura del componente | Medium | — | 44px |
| altura del componente | Small | — | 32px · touch target mínimo 44px |
| `padding-inline` | Large | `--space-lg` | 24px |
| `padding-inline` | Medium | `--space-md` | 16px |
| `padding-inline` | Small | `--space-sm` | 12px |
| `gap` (icon · label) | todos | `--space-xs` | 8px |
| `border-radius` | todos | `--radius-sm` | 8px |
| `focus-ring-width` | todos | `--focus-ring-width` | 2px |

### Tipografía

| Size | Estilo | font-size | font-weight | line-height |
|---|---|---|---|---|
| Large | `body/lg-bold` | 16px | 700 | 24px |
| Medium | `body/md-bold` | 14px | 700 | 20px |
| Small | `caption/sm-medium` | 12px | 500 | 16px |

---

## HTML

```html
<!-- button -->
<button type="button">Guardar</button>

<!-- button/icon — aria-label obligatorio -->
<button type="button" aria-label="Cerrar">
  <svg aria-hidden="true">…</svg>
</button>

<!-- Estado loading -->
<button type="button" disabled aria-busy="true" aria-label="Guardando…">
  <span class="spinner" aria-hidden="true"></span>
</button>

<!-- Estado disabled -->
<button type="button" disabled aria-disabled="true">Guardar</button>
```

---

## ARIA

| Elemento | Tag | Atributos requeridos |
|---|---|---|
| button con label | `<button type="button">` | — |
| button/icon | `<button type="button">` | `aria-label="[acción]"` |
| Disabled | `<button>` | `disabled` · `aria-disabled="true"` |
| Loading | `<button>` | `disabled` · `aria-busy="true"` · `aria-label="[acción en curso]"` |

---

## Teclado

| Tecla | Acción |
|---|---|
| `Tab` | Mueve el foco al botón |
| `Enter` · `Space` | Ejecuta la acción |

---

## Reglas

- Un solo `Primary` por vista — múltiples anulan la jerarquía.
- `surface=Inverse` solo aplica a `Primary Default`.
- `tone=Destructive` solo para acciones irreversibles (eliminar, cancelar proceso en curso).
- `Loading` solo en `button` — `button/icon` no soporta loading.
- No uses `button` para navegar → usar `link`.
- `button/icon` sin `aria-label` es un error, no un warning.

---

## Accesibilidad

- Touch target mínimo 44×44px en todos los tamaños.
- Focus visible siempre — no suprimir en ningún contexto.
- Contraste mínimo 3:1 texto sobre fondo del botón.
- **WCAG 2.5.3** — el `aria-label` de `button/icon` debe describir la acción, no el ícono.
