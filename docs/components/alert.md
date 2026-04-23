# Alert

Comunica mensajes del sistema que el usuario necesita leer. No usar para decoración ni estados de navegación.

---

## Propiedades

| Propiedad | Tipo | Valores |
|---|---|---|
| `variant` | Variant | info · success · warning · danger |
| `title` | Boolean | true · false |
| `close` | Boolean | true · false |
| `link` | Boolean | true · false |

`link=true` requiere `title=true`. `close=true` y `link=true` no coexisten.

---

## Props

```typescript
interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'danger'  // default: 'info'
  title?: boolean       // default: true
  titleText?: string    // requerido si title=true
  description: string   // requerido
  close?: boolean       // default: true
  link?: boolean        // default: false
  linkText?: string     // requerido si link=true
  linkHref?: string     // requerido si link=true
  onClose?: () => void
}
```

---

## Tokens

### Color

| Elemento | Variant | Propiedad CSS | CSS custom property |
|---|---|---|---|
| Componente | info | background | `--color-bg-status-info-default` |
| Componente | info | border | `--color-border-status-info-default` |
| Componente | success | background | `--color-bg-status-success-default` |
| Componente | success | border | `--color-border-status-success-default` |
| Componente | warning | background | `--color-bg-status-warning-default` |
| Componente | warning | border | `--color-border-status-warning-default` |
| Componente | danger | background | `--color-bg-status-danger-default` |
| Componente | danger | border | `--color-border-status-danger-default` |
| `título` | info | color | `--color-text-status-info-default` |
| `título` | success | color | `--color-text-status-success-default` |
| `título` | warning | color | `--color-text-status-warning-default` |
| `título` | danger | color | `--color-text-status-danger-default` |
| `descripción` | todos | color | `--color-text-primary-default` |
| `ícono semántico` | info | fill | `--color-icon-semantic-info-default` |
| `ícono semántico` | success | fill | `--color-icon-semantic-success-default` |
| `ícono semántico` | warning | fill | `--color-icon-semantic-warning-default` |
| `ícono semántico` | danger | fill | `--color-icon-semantic-danger-default` |
| `botón cierre` | — | icon fill | `--color-icon-system-secondary-default` |

### Layout

| Propiedad | CSS custom property | Valor |
|---|---|---|
| `padding-inline` | `--space-md` | 16px |
| `padding-block` | `--space-sm` | 12px |
| `gap` (icon · text · button) | `--space-sm` | 12px |
| `gap` interno (title · desc · link) | `--space-2xs` | 4px |
| `border-radius` | `--radius-sm` | 8px |
| `border-width` | `--stroke-xs` | 1px |

### Tipografía

| Elemento | Estilo | font-size | font-weight | line-height |
|---|---|---|---|---|
| `título` | `body/md-bold` | 14px | 700 | 20px |
| `descripción` | `body/md-regular` | 14px | 400 | 20px |
| `link` | `caption/sm-regular` | 12px | 400 | 16px |

---

## HTML

```html
<!-- Alert info con título y cierre -->
<div role="status" aria-live="polite" class="alert alert--info">
  <span class="alert__icon" aria-hidden="true"><!-- icon/semantic/info --></span>
  <div class="alert__body">
    <p class="alert__title">Título informativo</p>
    <p class="alert__description">Descripción del mensaje.</p>
  </div>
  <button type="button" aria-label="Cerrar alerta" class="btn-icon btn-icon--tertiary">
    <svg aria-hidden="true">…</svg>
  </button>
</div>

<!-- Alert danger sin cierre — el error debe resolverse antes de continuar -->
<div role="alert" aria-live="assertive" class="alert alert--danger">
  <span class="alert__icon" aria-hidden="true"><!-- icon/semantic/danger --></span>
  <div class="alert__body">
    <p class="alert__title">Error de validación</p>
    <p class="alert__description">Descripción del error.</p>
  </div>
</div>
```

---

## ARIA

| Elemento | Tag · Role | Atributos requeridos |
|---|---|---|
| Alert urgente (danger · warning) | `<div role="alert">` | `aria-live="assertive"` |
| Alert no urgente (info · success) | `<div role="status">` | `aria-live="polite"` |
| Botón de cierre | `<button type="button">` | `aria-label="Cerrar alerta"` |
| Ícono semántico | `<svg>` o wrapper | `aria-hidden="true"` |
| Link embebido | `<a>` | texto descriptivo — prohibido "ver más" · "clic aquí" |

---

## Teclado

| Tecla | Acción |
|---|---|
| `Tab` | Foco al botón de cierre (`close=true`) o al link (`link=true`) |
| `Enter` · `Space` | Activa el elemento con foco |
| `Shift + Tab` | Retrocede al elemento anterior |

El contenedor del alert no recibe foco — solo sus elementos internos accionables.

---

## Reglas

- Un solo alert por contexto — consolidar mensajes si hay varios.
- `danger` con `close=false` indica que el error debe resolverse antes de continuar.
- No usar `danger` para advertencias → `warning`. No usar `info` para confirmaciones → `success`.
- El alert ocupa el 100% del ancho del contenedor padre.
- No ocultar con `display: none` al cerrar — usar `aria-hidden` o remover del DOM.

---

## Accesibilidad

- **WCAG 1.4.3** — tokens `text/status/*` sobre `bg/status/*` cumplen ≥ 4.5:1 AA en todos los variants.
- **WCAG 1.4.11** — iconos semánticos sobre fondos de status cumplen ≥ 3:1.
- `role="alert"` dispara `aria-live="assertive"` — usar solo cuando la atención es inmediata. Para `info` y `success` usar `role="status"`.
