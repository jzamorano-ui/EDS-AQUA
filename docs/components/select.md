# Select

Control de selección única que permite al usuario elegir una opción desde un conjunto predefinido. No admite entrada de texto.

El sistema está formado por tres componentes: **Select** (trigger y contenedor), **Listbox** (panel flotante) y **Select Option** (elemento seleccionable).

---

## Propiedades

### Select

| Propiedad | Valores |
|---|---|
| `state` | default · focus · open · filled · error · read-only · disabled |
| `label` | texto visible — requerido |
| `placeholder` | texto visible en el trigger antes de seleccionar — desaparece al interactuar |
| `helper-text` | true · false — instrucción contextual bajo el trigger |
| `icon-tooltip` | true · false — ícono de ayuda junto al label |

### Listbox

| Propiedad | Valores |
|---|---|
| `scroll` | false · true — `false` muestra hasta 5 opciones en alto automático; `true` fija el alto a 236px con scroll interno |

### Select Option

| Propiedad | Valores |
|---|---|
| `state` | default · hover · selected · focus · disabled |
| `icon` | true · false — muestra u oculta el ícono |
| `↪ icon` | instancia del ícono — intercambiable vía instance-swap |
| `label` | texto de la opción — requerido |

Si una opción tiene ícono, todas deben tenerlo.

---

## Props

```typescript
interface SelectProps {
  label: string                    // requerido
  placeholder?: string
  helperText?: string              // texto informativo bajo el trigger
  feedbackMessage?: string         // mensaje de error — requerido si state='error'
  state?: 'default' | 'focus' | 'open' | 'filled' | 'error' | 'read-only' | 'disabled'
  iconTooltip?: boolean            // default: false
  tooltipText?: string             // requerido si iconTooltip=true
  value?: string
  onChange?: (value: string) => void
  onOpen?: () => void
  onClose?: () => void
}

interface SelectOptionProps {
  label: string                    // requerido
  value: string                    // requerido — identificador único
  state?: 'default' | 'hover' | 'selected' | 'focus' | 'disabled'
  icon?: boolean                   // default: false
  iconNode?: React.ReactNode       // requerido si icon=true
}
```

---

## Tokens

### Color

**Select — Trigger y label**

| Elemento | Estado | Propiedad CSS | CSS custom property |
|---|---|---|---|
| `select-container` | default · focus · open · filled · error | background | `--color-bg-fill-neutral-subtle` |
| `select-container` | read-only | background | `--color-bg-fill-inverse-subtle` |
| `select-container` | disabled | background | `--color-action-primary-disabled` |
| `select-container` | default · filled · read-only | border | `--color-border-default` |
| `select-container` | focus · open | border | `--color-border-focus` |
| `select-container` | error | border | `--color-border-danger-focus` |
| `select-container` | disabled | border | `--color-border-disabled` |
| `label` | default · focus · open · filled · read-only | color | `--color-text-primary` |
| `label` | error | color | `--color-text-status-danger` |
| `label` | disabled | color | `--color-text-disabled` |
| `select-value` (placeholder) | default · focus · open · error | color | `--color-text-secondary` |
| `select-value` (valor seleccionado) | filled · read-only | color | `--color-text-primary` |
| `select-value` | disabled | color | `--color-text-disabled` |
| `chevron` | default · focus · open · error · read-only | fill | `--color-icon-system-secondary` |
| `chevron` | filled | fill | `--color-icon-system-primary` |
| `chevron` | disabled | fill | `--color-icon-system-disabled` |
| `helper-text` | default · focus · open · filled · read-only | color | `--color-text-secondary` |
| `helper-text` | disabled | color | `--color-text-disabled` |
| `feedback-message` | error | color | `--color-text-status-danger` |

**Listbox**

| Elemento | Estado | Propiedad CSS | CSS custom property |
|---|---|---|---|
| `listbox` | — | background | `--color-bg-surface-default` |
| `listbox` | — | border | `--color-border-default` |
| `listbox` | — | box-shadow | `--elevation-md` |

**Select Option**

| Elemento | Estado | Propiedad CSS | CSS custom property |
|---|---|---|---|
| `option` | default | background | `--color-action-tertiary-default` |
| `option` | hover | background | `--color-action-tertiary-hover` |
| `option` | selected | background | `--color-action-tertiary-active` |
| `option` | focus | background | `--color-action-tertiary-hover` |
| `option` | disabled | background | `--color-action-primary-disabled` |
| `option-label` | default · hover · selected · focus | color | `--color-text-primary` |
| `option-label` | disabled | color | `--color-text-disabled` |
| `option-icon` | default · hover · selected · focus | fill | `--color-icon-system-primary` |
| `option-icon` | disabled | fill | `--color-icon-system-disabled` |

### Layout

**Select**

| Propiedad | CSS custom property | Valor |
|---|---|---|
| `gap` (label-row · trigger · helper) | `--space-2xs` | 4px |
| `padding-block` (trigger) | `--space-sm` | 12px |
| `padding-inline` (trigger) | `--space-sm` | 12px |
| `gap` (trigger: valor · chevron) | `--space-xs` | 8px |
| `border-radius` (trigger) | `--radius-sm` | 8px |
| `border-width` (trigger) | `--stroke-xs` | 1px |

**Listbox**

| Propiedad | CSS custom property | Valor |
|---|---|---|
| `padding-block` | `--space-xs` | 8px |
| `border-radius` | `--radius-sm` | 8px |
| `border-width` | `--stroke-xs` | 1px |
| `max-height` (scroll=true) | — | 236px |

**Select Option**

| Propiedad | CSS custom property | Valor |
|---|---|---|
| `padding-block` | `--space-sm` | 12px |
| `padding-inline` | `--space-md` | 16px |
| `gap` (icon · label) | `--space-sm` | 12px |

### Tipografía

| Elemento | Estilo | font-size | font-weight | line-height |
|---|---|---|---|---|
| `label` | `body/lg-medium` | 16px | 500 | 24px |
| `select-value` (placeholder · valor) | `body/lg-regular` | 16px | 400 | 24px |
| `option-label` | `body/lg-regular` | 16px | 400 | 24px |
| `helper-text` · `feedback-message` | `body/md-regular` | 14px | 400 | 20px |

---

## HTML

```html
<!-- Select default -->
<div class="select">
  <div class="select__label-row">
    <label id="region-label" class="select__label">Región</label>
  </div>
  <button class="select__trigger"
          role="combobox"
          aria-labelledby="region-label"
          aria-expanded="false"
          aria-haspopup="listbox"
          aria-controls="region-listbox">
    <span class="select__value select__value--placeholder">Selecciona una región</span>
    <svg class="select__chevron" aria-hidden="true">…</svg>
  </button>
  <span class="select__helper">Texto de ayuda.</span>
</div>

<!-- Select open con Listbox -->
<div class="select select--open">
  <div class="select__label-row">
    <label id="plan-label" class="select__label">Plan</label>
  </div>
  <button class="select__trigger"
          role="combobox"
          aria-labelledby="plan-label"
          aria-expanded="true"
          aria-haspopup="listbox"
          aria-controls="plan-listbox"
          aria-activedescendant="plan-opt-2">
    <span class="select__value">Plan 2</span>
    <svg class="select__chevron" aria-hidden="true">…</svg>
  </button>
  <ul class="listbox" id="plan-listbox" role="listbox" aria-labelledby="plan-label">
    <li class="listbox__option" id="plan-opt-1" role="option" aria-selected="false">
      <span class="listbox__option-label">Plan 1</span>
    </li>
    <li class="listbox__option listbox__option--selected" id="plan-opt-2" role="option" aria-selected="true">
      <span class="listbox__option-label">Plan 2</span>
    </li>
    <li class="listbox__option" id="plan-opt-3" role="option" aria-selected="false">
      <span class="listbox__option-label">Plan 3</span>
    </li>
  </ul>
</div>

<!-- Select open con ícono en opciones -->
<div class="select select--open">
  <div class="select__label-row">
    <label id="canal-label" class="select__label">Canal de contacto</label>
  </div>
  <button class="select__trigger"
          role="combobox"
          aria-labelledby="canal-label"
          aria-expanded="true"
          aria-haspopup="listbox"
          aria-controls="canal-listbox">
    <span class="select__value select__value--placeholder">Seleccionar</span>
    <svg class="select__chevron" aria-hidden="true">…</svg>
  </button>
  <ul class="listbox" id="canal-listbox" role="listbox" aria-labelledby="canal-label">
    <li class="listbox__option" role="option" aria-selected="false">
      <svg class="listbox__option-icon" aria-hidden="true">…</svg>
      <span class="listbox__option-label">Correo electrónico</span>
    </li>
    <li class="listbox__option" role="option" aria-selected="false">
      <svg class="listbox__option-icon" aria-hidden="true">…</svg>
      <span class="listbox__option-label">Llamada telefónica</span>
    </li>
  </ul>
</div>

<!-- Select error -->
<div class="select select--error">
  <div class="select__label-row">
    <label id="region-label-err" class="select__label">Región</label>
  </div>
  <button class="select__trigger"
          role="combobox"
          aria-labelledby="region-label-err"
          aria-expanded="false"
          aria-haspopup="listbox"
          aria-controls="region-listbox-err"
          aria-invalid="true"
          aria-describedby="region-feedback">
    <span class="select__value select__value--placeholder">Selecciona una región</span>
    <svg class="select__chevron" aria-hidden="true">…</svg>
  </button>
  <span id="region-feedback" class="select__feedback" role="alert">Selecciona una opción para avanzar.</span>
</div>

<!-- Select scroll=true con Listbox scrolleable -->
<div class="select select--open">
  <div class="select__label-row">
    <label id="region-scroll-label" class="select__label">Región</label>
  </div>
  <button class="select__trigger"
          role="combobox"
          aria-labelledby="region-scroll-label"
          aria-expanded="true"
          aria-haspopup="listbox"
          aria-controls="region-scroll-listbox">
    <span class="select__value select__value--placeholder">Selecciona una región</span>
    <svg class="select__chevron" aria-hidden="true">…</svg>
  </button>
  <ul class="listbox listbox--scroll" id="region-scroll-listbox" role="listbox" aria-labelledby="region-scroll-label">
    <li class="listbox__option" role="option" aria-selected="false"><span class="listbox__option-label">Región 1</span></li>
    <li class="listbox__option" role="option" aria-selected="false"><span class="listbox__option-label">Región 2</span></li>
    <!-- … hasta Región 10 -->
  </ul>
</div>

<!-- Select disabled -->
<div class="select select--disabled">
  <div class="select__label-row">
    <label id="region-label-dis" class="select__label">Región</label>
  </div>
  <button class="select__trigger"
          role="combobox"
          aria-labelledby="region-label-dis"
          aria-expanded="false"
          aria-haspopup="listbox"
          disabled>
    <span class="select__value select__value--placeholder">Seleccionar</span>
    <svg class="select__chevron" aria-hidden="true">…</svg>
  </button>
  <span class="select__helper">Texto de ayuda explicando por qué está deshabilitado.</span>
</div>
```

---

## ARIA

| Elemento | Tag · Role | Atributos requeridos |
|---|---|---|
| Select trigger | `<button role="combobox">` | `aria-expanded` · `aria-haspopup="listbox"` · `aria-controls="[listbox-id]"` · `aria-labelledby="[label-id]"` |
| Select en error | `<button role="combobox">` | `aria-invalid="true"` · `aria-describedby="[feedback-id]"` |
| Label | `<label>` | `id` — referenciado en `aria-labelledby` del trigger |
| Listbox | `<ul role="listbox">` | `id` · `aria-labelledby="[label-id]"` |
| Option | `<li role="option">` | `id` · `aria-selected="true\|false"` |
| Option deshabilitada | `<li role="option">` | `aria-disabled="true"` |
| Opción activa por teclado | trigger | `aria-activedescendant="[option-id]"` |
| Feedback de error | `<span>` | `role="alert"` · `id` referenciado en `aria-describedby` |
| Íconos decorativos | `<svg>` | `aria-hidden="true"` |

---

## Teclado

| Tecla | Acción |
|---|---|
| `Tab` | Mueve el foco al trigger |
| `Shift + Tab` | Foco al elemento anterior |
| `Enter` · `Space` | Abre el listbox (trigger cerrado) · Selecciona la opción activa (listbox abierto) |
| `↓` | Abre el listbox · Mueve foco a la siguiente opción |
| `↑` | Mueve foco a la opción anterior |
| `Home` | Mueve foco a la primera opción |
| `End` | Mueve foco a la última opción |
| `Escape` | Cierra el listbox sin seleccionar |
| `Tab` (dentro del listbox) | Cierra el listbox y mueve el foco al siguiente elemento |

---

## Reglas

- `label` siempre visible — el placeholder desaparece al interactuar.
- `scroll=false` admite hasta 5 opciones. Con 6 o más, usar `scroll=true` (alto fijo 236px con scroll interno).
- En `state=error` siempre incluir `feedbackMessage` — no depender solo del color de borde.
- `read-only` ≠ `disabled`: read-only muestra el valor y permite leerlo; disabled excluye el campo del formulario y del orden de teclado.
- Solo para selección — si la acción ejecuta algo usar `button` o `menu`; si hay solo 2 opciones usar `radio group`.
- Si una opción tiene ícono, todas deben tenerlo — íconos mixtos crean jerarquía falsa.
- El Listbox siempre flota sobre el contenido (`position: absolute`) — nunca empuja el layout.

---

## Accesibilidad

- **WCAG 1.3.1** — label asociado programáticamente vía `aria-labelledby` en el trigger.
- **WCAG 4.1.2** — trigger con `role="combobox"`, `aria-expanded`, `aria-haspopup="listbox"` y `aria-controls` apuntando al listbox.
- **WCAG 2.1.1** — teclado completo: flechas para navegar, Enter para seleccionar, Escape para cerrar.
- **WCAG 3.3.1** — en error: `aria-invalid="true"` en el trigger + mensaje visible referenciado con `aria-describedby`.
- **WCAG 2.4.6** — el label identifica el propósito; no usar solo placeholder.
