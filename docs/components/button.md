# Button

Ejecuta acciones. Para navegar usar `link`; para opciones on/off usar `toggle`.

---

## Propiedades

| Propiedad | Valores |
|---|---|
| `variant` | Primary · Secondary · Tertiary · Brand |
| `surface` | Default · Inverse |
| `size` | Large · Medium · Small · _(Brand: solo Large)_ |
| `state` | Default · Hover · Active · Focus · Disabled · Loading |

**Combos válidos:** Primary/Default · Primary/Inverse · Secondary/Default · Secondary/Inverse · Tertiary/Default · Tertiary/Inverse · Brand (solo surface=Default) · Disabled (todos) · Loading (Primary/Secondary/Tertiary — solo `button`) · Focus (todos).

> **button/icon** soporta todos los combos anteriores excepto `Loading` — incluyendo `Brand`. `Brand` es exclusivamente talla `Large` en ambos componentes.

---

## Props

```typescript
interface ButtonProps {
  variant?: 'Primary' | 'Secondary' | 'Tertiary' | 'Brand'  // default: 'Primary'
  surface?: 'Default' | 'Inverse'                            // default: 'Default'
  size?: 'Large' | 'Medium' | 'Small'                       // default: 'Medium' — Brand: solo 'Large'
  label?: string                                             // requerido en button; omitir en button/icon
  icon?: React.ReactNode                                     // opcional en button; requerido en button/icon
  iconPosition?: 'left' | 'right'                           // default: 'left'
  disabled?: boolean                                         // default: false
  loading?: boolean                                          // default: false
  ariaLabel?: string                                         // requerido si no hay label visible (button/icon)
  onClick?: () => void
}
```

---

## Tokens

### Color

| Combo | `background` | `color` | `icon` | `focus-ring` |
|---|---|---|---|---|
| Primary Default | `--color-action-primary-*` | `--color-text-inverse` | context-color → **inverse** | `--color-focus-ring-default` |
| Primary Inverse | `--color-action-primary-inverse-*` | `--color-text-primary` | context-color → **default** | `--color-focus-ring-inverse` |
| Secondary Default | `--color-action-secondary-*` | `--color-text-primary` | context-color → **default** | `--color-focus-ring-default` |
| Secondary Inverse | `--color-action-secondary-inverse-*` | `--color-text-inverse` | context-color → **inverse** | `--color-focus-ring-inverse` |
| Tertiary Default | `--color-action-tertiary-*` | `--color-text-primary` | context-color → **default** | `--color-focus-ring-default` |
| Tertiary Inverse | `--color-action-tertiary-inverse-*` | `--color-text-inverse` | context-color → **inverse** | `--color-focus-ring-inverse` |
| Brand | `--color-action-brand-primary-*` | `--color-text-inverse` | context-color → **inverse** | `--color-focus-ring-default` |
| **Disabled (todos)** | `--color-action-primary-disabled` | `--color-text-disabled` | context-color → **disabled** | — |

`*` = sufijo por estado interactivo: `-default` · `-hover` · `-active`

**context-color**: el color del ícono se resuelve via la colección `Icon/Context` con modo `default` (sobre fondo claro) o `inverse` (sobre fondo oscuro/color). Nunca bindear el fill del vector directamente — siempre heredar del modo.

**Focus ring** (Figma): 2 capas de stroke — `color/focus/ring-*` en la capa exterior, `color/focus/ring-gap-*` en la capa interior. Secondary añade una tercera capa con el border de botón preservado.

```css
/* Default surface */
outline: var(--stroke-focus-ring-width) solid var(--color-focus-ring-default);
outline-offset: 2px;
box-shadow: 0 0 0 2px var(--color-focus-ring-gap-default);

/* Inverse surface */
outline: var(--stroke-focus-ring-width) solid var(--color-focus-ring-inverse);
outline-offset: 2px;
box-shadow: 0 0 0 2px var(--color-focus-ring-gap-inverse);
```

### Layout

| Propiedad | Size | CSS custom property | Valor |
|---|---|---|---|
| altura del componente | Large | — | 48px |
| altura del componente | Medium | — | 44px |
| altura del componente | Small | — | 32px · touch target mínimo 44px |
| `padding-inline` | Large | `--space-lg` | 24px |
| `padding-inline` | Medium | `--space-md` | 16px |
| `padding-inline` | Small | `--space-sm` | 12px |
| `gap` (icon · label) | todos | `--space-xs` | 8px |
| `border-radius` | todos | `--radius-pill` | 999px |
| `focus-ring-width` | todos | `--stroke-focus-ring-width` | 2px |

### Tipografía

| Size | Tipo | Estilo | font-size | font-weight | line-height |
|---|---|---|---|---|---|
| Large | System | `body/lg-bold` | 16px | 700 | 24px |
| Large | **Brand** | `title/md-bold` | **20px** | **700** | **28px** |
| Medium | System | `body/md-bold` | 14px | 700 | 20px |
| Small | System | `caption/sm-medium` | 12px | 500 | 16px |

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
- `surface=Inverse` aplica a `Primary`, `Secondary` y `Tertiary` — usar cuando el botón se sitúa sobre fondo oscuro o de color. `Brand` no tiene surface=Inverse.
- Acciones irreversibles (eliminar, cancelar proceso en curso) → usar `Primary` en modal de confirmación — el contexto hace el trabajo de señalar el peligro.
- `Loading` solo en `button` — `button/icon` no soporta loading.
- `button/icon` sin `aria-label` es un error, no un warning.

### Brand — uso restringido

El botón `Brand` es una variante expresiva de alto impacto visual. **No es un botón funcional general.**

| | |
|---|---|
| ✔ Usar en | Hero · Landings · Campañas |
| ✗ No usar en | Formularios · Pagos · Contratación · Acciones críticas · Navegación |
| Tamaño | Solo `Large` — no configurable en `sm`/`md` · no admite `surface=Inverse` |
| Tipografía mínima | 20px Bold (`title/md-bold`) — requerido para cumplir WCAG AA |
| Jerarquía | No reemplaza a `Primary` — si es una acción funcional → usar `Primary` |

---

## Accesibilidad

- Touch target mínimo 44×44px en todos los tamaños.
- Focus visible siempre — no suprimir en ningún contexto.
- Contraste mínimo 3:1 texto sobre fondo del botón.
- **WCAG 2.5.3** — el `aria-label` de `button/icon` debe describir la acción, no el ícono.
- **Brand** — el fondo `--color-action-brand-primary-default` pasa WCAG AA para texto grande: contraste 3.09:1 ≥ 3:1 requerido. Condición obligatoria: ≥14pt bold (≥19px) · ≥18pt regular (≥24px). No reducir el tamaño ni el peso del label — por debajo de ese umbral el contraste es insuficiente.
