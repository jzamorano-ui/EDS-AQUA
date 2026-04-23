# Badge

Comunica estado del sistema o conteo de actividad de forma compacta. No es interactivo.

`badge/indicator` → actividad o cantidad · `badge/state` → estado semántico del sistema · `notification` → composición badge sobre button/icon.

---

## Propiedades

| Propiedad | Valores |
|---|---|
| `type` | indicator · status |
| `semantic` | error · warning · success · info · neutral *(solo `type=status`)* |

---

## Props

```typescript
interface BadgeStateProps {
  semantic: 'error' | 'warning' | 'success' | 'info' | 'neutral'
  label: string   // máximo 1–2 palabras
}

interface BadgeIndicatorProps {
  type: 'dot' | 'number'
  count?: number  // requerido si type='number'; mostrar '99+' si count > 99
  ariaLabel: string  // requerido — describe el estado al lector de pantalla
}
```

---

## Tokens

### Color

| Elemento | Propiedad CSS | CSS custom property |
|---|---|---|
| `badge` (indicator · number) | background | `--color-bg-fill-attention-default` |
| `badge` texto | color | `--color-text-inverse-default` |
| `badge/state` error | background | `--color-bg-status-danger-default` |
| `badge/state` error | border | `--color-border-status-danger-default` |
| `badge/state` error · label | color | `--color-text-status-danger-default` |
| `badge/state` warning | background | `--color-bg-status-warning-default` |
| `badge/state` warning | border | `--color-border-status-warning-default` |
| `badge/state` warning · label | color | `--color-text-status-warning-default` |
| `badge/state` success | background | `--color-bg-status-success-default` |
| `badge/state` success | border | `--color-border-status-success-default` |
| `badge/state` success · label | color | `--color-text-status-success-default` |
| `badge/state` info | background | `--color-bg-status-info-default` |
| `badge/state` info | border | `--color-border-status-info-default` |
| `badge/state` info · label | color | `--color-text-status-info-default` |
| `badge/state` neutral | background | `--color-bg-status-neutral-default` |
| `badge/state` neutral | border | `--color-border-default` |
| `badge/state` neutral · label | color | `--color-text-primary-default` |

### Layout

| Propiedad | Elemento | CSS custom property | Valor |
|---|---|---|---|
| `border-radius` | badge/state · indicator number | `--radius-pill` | 999px |
| `padding-inline` | badge/state | `--space-sm` | 12px |
| `padding-block` | badge/state · indicator number | `--space-2xs` | 4px |
| `border-width` | badge/state | `--stroke-xs` | 1px |
| Tamaño indicator dot | — | — | 8×8px |
| Tamaño indicator number | — | — | 20×20px |

### Tipografía

| Elemento | Estilo | font-size | font-weight | line-height |
|---|---|---|---|---|
| `badge/state` label | `caption/sm-medium` | 12px | 500 | 16px |
| `indicator` number | `caption/sm-medium` | 12px | 500 | 16px |

---

## HTML

```html
<!-- badge/state -->
<span class="badge badge--error">Rechazada</span>
<span class="badge badge--success">Aprobada</span>

<!-- badge indicator dot -->
<span class="badge badge--dot" aria-label="Nuevo contenido disponible"></span>

<!-- badge indicator number -->
<span class="badge badge--number" aria-label="3 notificaciones pendientes">3</span>

<!-- notification: badge sobre button/icon -->
<div class="notification">
  <button type="button" aria-label="Ver notificaciones (3 pendientes)">
    <svg aria-hidden="true">…</svg>
  </button>
  <span class="badge badge--number" aria-hidden="true">3</span>
</div>
```

---

## ARIA

| Elemento | Tag | Atributos requeridos |
|---|---|---|
| `badge/state` | `<span>` | texto visible como contenido |
| `badge` indicator dot | `<span>` | `aria-label="[descripción del estado]"` |
| `badge` indicator number | `<span>` | `aria-label="[n] [contexto]"` ej: `"3 notificaciones pendientes"` |
| Badge en notification | `<span>` | `aria-hidden="true"` — el button/icon ya tiene su `aria-label` |

---

## Teclado

Este componente no es interactivo — no recibe foco.

---

## Reglas

- No usar el color semántico para otro propósito — cada variant comunica un significado fijo.
- `badge/state` máximo 1–2 palabras. `badge/indicator number` máximo "99+".
- No reemplazar botones con badge — el badge no ejecuta acciones.
- No usar badge para selección o filtros → usar `chip`.

---

## Accesibilidad

- No depender solo del color para comunicar el estado — siempre incluir texto en `badge/state`.
- `badge/indicator dot` debe tener `aria-label` si es la única señal de actividad.
- El badge no recibe foco ni requiere role de acción.
