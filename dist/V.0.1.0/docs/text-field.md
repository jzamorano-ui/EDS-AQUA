# Text Field

Dos componentes, un mismo sistema: `input` para texto corto en una línea; `text-area` para texto largo en múltiples líneas.

---

## Propiedades

| Propiedad | Valores | Aplica a |
|---|---|---|
| `type` | input · text-area | — |
| `state` | default · focus · writing · filled · error · disabled · read-only | input · text-area |
| `label` | texto visible (obligatorio) | input · text-area |
| `placeholder` | ejemplo del formato esperado | input · text-area |
| `helper-text` | instrucciones o mensaje de error | input · text-area |
| `icon-left` | visible · hidden — decorativo | solo input |
| `icon-right` | visible · hidden — funcional (limpiar, mostrar contraseña) | solo input |
| `prefix` | texto prefijo fijo (ej: "+56") | solo input |
| `counter` | visible · hidden — conteo de caracteres | solo text-area |
| `tooltip` | visible · hidden — ícono de ayuda junto al label | input · text-area |

---

## Props

```typescript
interface InputProps {
  label: string                   // requerido
  placeholder?: string
  helperText?: string             // texto informativo — ocultar en estado error
  feedbackMessage?: string        // mensaje de error — requerido si state='error'
  state?: 'default' | 'focus' | 'writing' | 'filled' | 'error' | 'disabled' | 'read-only'
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  value?: string
  onChange?: (value: string) => void
}

interface TextAreaProps {
  label: string                   // requerido
  placeholder?: string
  helperText?: string             // texto informativo — ocultar en estado error
  feedbackMessage?: string        // mensaje de error — requerido si state='error'
  state?: 'default' | 'focus' | 'writing' | 'filled' | 'error' | 'disabled' | 'read-only'
  counter?: boolean               // default: false
  maxLength?: number              // requerido si counter=true
  rows?: number
  value?: string
  onChange?: (value: string) => void
}
```

---

## Tokens

### Color

| Elemento | Estado | Propiedad CSS | CSS custom property |
|---|---|---|---|
| `input-container` | default · focus · writing · filled · error · disabled | background | `--color-bg-fill-neutral-subtle` |
| `input-container` | read-only | background | `--color-bg-fill-neutral-medium` |
| `input-container` | default | border | `--color-border-default` |
| `input-container` | hover | border | `--color-border-default` |
| `input-container` | focus · writing | border | `--color-border-focus` |
| `input-container` | error | border | `--color-border-danger-focus` |
| `input-container` | disabled | border | `--color-border-disabled` |
| `label` | default | color | `--color-text-primary` |
| `label` | error | color | `--color-text-status-danger` |
| `label` | disabled | color | `--color-text-disabled` |
| `input-text` (valor) | default | color | `--color-text-primary` |
| `input-text` (placeholder) | — | color | `--color-text-secondary` |
| `input-text` | disabled | color | `--color-text-disabled` |
| `helper-text` | default · focus · writing · filled · read-only | color | `--color-text-secondary` |
| `helper-text` | disabled | color | `--color-text-disabled` |
| `feedback-message` | error | color | `--color-text-status-danger` |
| `left-slot` · `right-slot` | default | fill | `--color-icon-system-primary` |
| `left-slot` · `right-slot` | disabled | fill | `--color-icon-system-disabled` |
| `counter` | default | color | `--color-text-secondary` |
| `counter` | error | color | `--color-text-status-danger` |

### Layout

| Propiedad | CSS custom property | Valor |
|---|---|---|
| `padding-inline` (container) | `--space-sm` | 12px |
| `padding-block` (container) | `--space-xs` | 8px |
| `gap` (label · container · helper) | `--space-2xs` | 4px |
| `border-radius` | `--radius-sm` | 8px |
| `border-width` | `--stroke-xs` | 1px |

### Tipografía

| Elemento | Estilo | font-size | font-weight | line-height |
|---|---|---|---|---|
| `label` | `body/md-medium` | 14px | 500 | 20px |
| `input-text` (valor) | `body/md-regular` | 14px | 400 | 20px |
| `input-text` (placeholder) | `body/md-regular` | 14px | 400 | 20px |
| `helper-text` · `feedback-message` | `caption/sm-regular` | 12px | 400 | 16px |
| `counter` | `caption/sm-regular` | 12px | 400 | 16px |

---

## HTML

```html
<!-- Input -->
<div class="field">
  <label for="email">Correo electrónico</label>
  <input type="email" id="email" placeholder="nombre@ejemplo.com"
         aria-describedby="email-helper">
  <span id="email-helper">Usaremos este correo para confirmaciones.</span>
</div>

<!-- Input en error -->
<div class="field field--error">
  <label for="email-err">Correo electrónico</label>
  <input type="email" id="email-err" aria-invalid="true"
         aria-describedby="email-error">
  <span id="email-error" role="alert">Ingresa un correo válido.</span>
</div>

<!-- Text area con counter -->
<div class="field">
  <label for="desc">Descripción</label>
  <textarea id="desc" aria-describedby="desc-counter"></textarea>
  <span id="desc-counter">0 / 200</span>
</div>
```

---

## ARIA

| Elemento | Tag | Atributos requeridos |
|---|---|---|
| Input | `<input type="text">` | `id` · `aria-labelledby` o `aria-label` |
| Text area | `<textarea>` | `id` · `aria-labelledby` o `aria-label` |
| Label | `<label>` | `for="[input-id]"` |
| Helper text | `<span>` | `id` · referenciado en `aria-describedby` del input (coexiste con `aria-labelledby`) |
| Error message | `<span>` | `role="alert"` · referenciado en `aria-describedby` (coexiste con `aria-labelledby`) |
| Campo con error | `<input>` | `aria-invalid="true"` · `aria-describedby="[error-id]"` |
| Disabled | `<input>` | `disabled` |
| Read-only | `<input>` | `readonly` · `aria-readonly="true"` |
| Right icon funcional | `<button>` | `aria-label="[acción]"` |
| Iconos decorativos | `<svg>` | `aria-hidden="true"` |

---

## Teclado

| Tecla | Acción |
|---|---|
| `Tab` | Mueve el foco al campo |
| `Shift + Tab` | Foco al elemento anterior |
| Caracteres | Ingresa texto |
| `Backspace` · `Delete` | Borra caracteres |
| `Enter` | En input: puede disparar submit · En text-area: inserta salto de línea |

---

## Reglas

- `label` siempre visible — el placeholder no lo reemplaza.
- `read-only` ≠ `disabled`: read-only permite leer y copiar; disabled excluye el campo del formulario.
- En `state=error` siempre incluir mensaje de texto — no depender solo del color de borde.
- Iconos con rol definido — decorativo (`aria-hidden`) o funcional (`<button>` con `aria-label`). Nunca ambiguo.
- Para texto libre únicamente — para elegir entre opciones usar `select` o `radio group`.

---

## Accesibilidad

- **WCAG 1.3.1** — label asociado programáticamente vía `<label for>` o `aria-labelledby`.
- **WCAG 2.4.6** — el texto del label identifica el propósito; no usar solo placeholder.
- **WCAG 3.3.1** — en error: `aria-invalid="true"` + mensaje visible referenciado con `aria-describedby`.
- **WCAG 3.3.2** — labels o instrucciones visibles siempre que se requieran datos del usuario.
