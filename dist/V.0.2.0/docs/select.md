# Select

Selección única de una opción desde un conjunto predefinido; no admite entrada de texto. Para acciones usar **Menu**; para 2 opciones, **radio button**. Consume las primitivas compartidas **`menu/list`** (panel) y **`_menu/item`** (opción) — documentadas en [`menu.md`](menu.md); en Select toman rol ARIA `listbox`/`option`.

---

## Propiedades

### Select

| Propiedad | Valores |
|---|---|
| `state` | default · focus · active · filled · error · read-only · disabled |
| `label` | texto visible — requerido |
| `placeholder` | texto visible en el trigger antes de seleccionar — desaparece al interactuar |
| `helper-text` | true · false — instrucción contextual bajo el trigger |
| `icon-tooltip` | true · false — ícono de ayuda junto al label |

- **`focus`** = campo enfocado por teclado, cerrado (anillo de focus visible).
- **`active`** = panel desplegado (`menu/list` abierto).

### menu/list (panel) · \_menu/item (opción)

Propiedades, estados y comportamiento (scroll, divisor, ícono de opción) → **[`menu.md`](menu.md)**. En Select toman rol ARIA `listbox`/`option`.

---

## Props

```typescript
interface SelectProps {
  label: string                    // requerido
  placeholder?: string
  helperText?: string              // texto informativo bajo el trigger
  feedbackMessage?: string         // mensaje de error — requerido si state='error'
  state?: 'default' | 'focus' | 'active' | 'filled' | 'error' | 'read-only' | 'disabled'
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
  state?: 'default' | 'hover' | 'active' | 'focus' | 'disabled'
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
| `select-container` | default · focus · active · filled · error | background | `--color-bg-fill-neutral-subtle` |
| `select-container` | read-only | background | `--color-bg-fill-inverse-subtle` |
| `select-container` | disabled | background | `--color-action-primary-disabled` |
| `select-container` | default · filled · read-only | border | `--color-border-default` |
| `select-container` | active | border | `--color-border-focus` |
| `select-container` | error | border | `--color-border-danger-focus` |
| `select-container` | disabled | border | `--color-border-disabled` |
| `select-container` | focus | border + anillo | ver **Anillo de focus** |
| `label` | default · focus · active · filled · read-only | color | `--color-text-primary` |
| `label` | error | color | `--color-text-status-danger` |
| `label` | disabled | color | `--color-text-disabled` |
| `select-value` (placeholder) | default · focus · active · error | color | `--color-text-secondary` |
| `select-value` (valor) | filled · read-only | color | `--color-text-primary` |
| `select-value` | disabled | color | `--color-text-disabled` |
| `chevron` | default · focus · active · error · read-only | fill | `--color-icon-system-secondary` |
| `chevron` | filled | fill | `--color-icon-system-primary` |
| `chevron` | disabled | fill | `--color-icon-system-disabled` |
| `helper-text` | default · focus · active · filled · read-only | color | `--color-text-secondary` |
| `helper-text` | disabled | color | `--color-text-disabled` |
| `feedback-message` | error | color | `--color-text-status-danger` |

**Anillo de focus** (navegación por teclado — `state=focus`)

| Capa | Propiedad CSS | CSS custom property |
|---|---|---|
| anillo externo | border (outside) | `--color-focus-ring-default` |
| gap (separador) | border (inside del `select-container`) | `--color-focus-ring-gap-default` |
| grosor (ambos) | border-width | `--stroke-focus-ring-width` (2px) |

**Panel y opciones** (`menu/list` + `_menu/item`) → tokens de color en **[`menu.md`](menu.md)**.

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
| `min-width` (trigger) | — (constante de layout) | 160px |

**Panel y opciones** (`menu/list` + `_menu/item`) → layout en **[`menu.md`](menu.md)**.

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
<!-- Select default (cerrado) -->
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

<!-- Select focus (enfocado por teclado, cerrado — anillo de focus) -->
<div class="select select--focus">
  <div class="select__label-row">
    <label id="plan-label-f" class="select__label">Plan</label>
  </div>
  <button class="select__trigger"
          role="combobox"
          aria-labelledby="plan-label-f"
          aria-expanded="false"
          aria-haspopup="listbox"
          aria-controls="plan-listbox-f">
    <span class="select__value select__value--placeholder">Seleccionar</span>
    <svg class="select__chevron" aria-hidden="true">…</svg>
  </button>
</div>

<!-- Select active (panel desplegado) -->
<div class="select select--active">
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
  <ul class="menu-list" id="plan-listbox" role="listbox" aria-labelledby="plan-label">
    <li class="menu-item" id="plan-opt-1" role="option" aria-selected="false">
      <span class="menu-item__label">Plan 1</span>
    </li>
    <li class="menu-item menu-item--active" id="plan-opt-2" role="option" aria-selected="true">
      <span class="menu-item__label">Plan 2</span>
    </li>
    <li class="menu-item" id="plan-opt-3" role="option" aria-selected="false">
      <span class="menu-item__label">Plan 3</span>
    </li>
  </ul>
</div>

<!-- Select active con íconos en opciones (≥6 opciones distintas) -->
<div class="select select--active">
  <div class="select__label-row">
    <label id="tramite-label" class="select__label">¿Qué necesitas?</label>
  </div>
  <button class="select__trigger"
          role="combobox"
          aria-labelledby="tramite-label"
          aria-expanded="true"
          aria-haspopup="listbox"
          aria-controls="tramite-listbox">
    <span class="select__value select__value--placeholder">Selecciona una opción</span>
    <svg class="select__chevron" aria-hidden="true">…</svg>
  </button>
  <ul class="menu-list" id="tramite-listbox" role="listbox" aria-labelledby="tramite-label">
    <li class="menu-item" role="option" aria-selected="false">
      <svg class="menu-item__icon" aria-hidden="true">…</svg>
      <span class="menu-item__label">Reembolso</span>
    </li>
    <li class="menu-item" role="option" aria-selected="false">
      <svg class="menu-item__icon" aria-hidden="true">…</svg>
      <span class="menu-item__label">Licencia médica</span>
    </li>
    <!-- … Hora médica · Mi plan · Bono de atención · Soporte -->
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

<!-- Select active con panel scrolleable (7+ opciones) -->
<div class="select select--active">
  <button class="select__trigger" role="combobox" aria-expanded="true"
          aria-haspopup="listbox" aria-controls="region-scroll-listbox">
    <span class="select__value select__value--placeholder">Selecciona una región</span>
    <svg class="select__chevron" aria-hidden="true">…</svg>
  </button>
  <ul class="menu-list menu-list--scroll" id="region-scroll-listbox" role="listbox">
    <li class="menu-item" role="option" aria-selected="false"><span class="menu-item__label">Región 1</span></li>
    <li class="menu-item" role="option" aria-selected="false"><span class="menu-item__label">Región 2</span></li>
    <!-- … 7+ opciones → scroll interno, 286px -->
  </ul>
</div>

<!-- Select disabled -->
<div class="select select--disabled">
  <div class="select__label-row">
    <label id="region-label-dis" class="select__label">Región</label>
  </div>
  <button class="select__trigger" role="combobox" aria-expanded="false"
          aria-haspopup="listbox" disabled>
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
| Select trigger | `<button role="combobox">` | `aria-expanded` · `aria-haspopup="listbox"` · `aria-controls="[panel-id]"` · `aria-labelledby="[label-id]"` |
| Select en error | `<button role="combobox">` | `aria-invalid="true"` · `aria-describedby="[feedback-id]"` |
| Label | `<label>` | `id` — referenciado en `aria-labelledby` del trigger |
| Panel (menu/list) | `<ul role="listbox">` | `id` · `aria-labelledby="[label-id]"` |
| Opción (\_menu/item) | `<li role="option">` | `id` · `aria-selected="true\|false"` |
| Opción deshabilitada | `<li role="option">` | `aria-disabled="true"` |
| Opción activa por teclado | trigger | `aria-activedescendant="[option-id]"` |
| Feedback de error | `<span>` | `role="alert"` · `id` referenciado en `aria-describedby` |
| Íconos decorativos | `<svg>` | `aria-hidden="true"` |

---

## Teclado

| Tecla | Acción |
|---|---|
| `Tab` | Mueve el foco al trigger → `state=focus` (anillo de focus visible) |
| `Shift + Tab` | Foco al elemento anterior |
| `Enter` · `Space` | Abre el panel (`state=active`) · Selecciona la opción activa (panel abierto) |
| `↓` | Abre el panel · Mueve foco a la siguiente opción |
| `↑` | Mueve foco a la opción anterior |
| `Home` | Mueve foco a la primera opción |
| `End` | Mueve foco a la última opción |
| Escribir (letras) | Type-ahead: mueve el foco a la primera opción que coincide |
| `Escape` | Cierra el panel sin seleccionar |
| `Tab` (dentro del panel) | Cierra el panel y mueve el foco al siguiente elemento |

---

## Reglas

- `label` siempre visible — el placeholder desaparece al interactuar.
- **`focus` vs `active`:** `focus` = enfocado por teclado y cerrado (anillo de focus); `active` = panel desplegado. La navegación por teclado **siempre** muestra el anillo de focus.
- **Combinatoria de estados:** `filled` · `error` · `read-only` (estado del dato) son **ortogonales** a `focus` · `active` (interacción) y coexisten — ej. `filled` + `focus` + `error`. `disabled` y `read-only` **anulan** la interacción.
- **Scroll:** hasta 6 opciones → `scroll=none` (hug, sin scrollbar). Con 7 o más → `scroll` con alto fijo **286px** mostrando 50% de la siguiente opción como pista.
- **Ancho:** el `trigger` tiene min-width **160px**. El panel iguala el ancho del input; si el input baja de 200px, el panel se mantiene en **200px alineado a la izquierda** (no se centra).
- El panel **flota** (`position: absolute`) — nunca empuja el layout, solo se superpone. **Debe renderizarse en un portal (o con `z-index` alto)** para no quedar tapado por los campos siguientes del formulario.
- El label de opción **trunca a 1 línea con ellipsis** — nunca hace wrap.
- En `state=error` siempre incluir `feedbackMessage` — no depender solo del color de borde.
- `read-only` ≠ `disabled`: read-only muestra el valor y permite leerlo; disabled excluye el campo del formulario y del orden de teclado.
- Solo para selección de valor — si la acción ejecuta algo usar **Menu**; si hay solo 2 opciones usar **radio group**.
- Si una opción tiene ícono, todas deben tenerlo — íconos mixtos crean jerarquía falsa.

---

## Accesibilidad

- **WCAG 1.3.1** — label asociado programáticamente vía `aria-labelledby` en el trigger.
- **WCAG 4.1.2** — trigger con `role="combobox"`, `aria-expanded`, `aria-haspopup="listbox"` y `aria-controls` apuntando al panel.
- **WCAG 2.1.1** — teclado completo: flechas para navegar, Enter para seleccionar, Escape para cerrar.
- **WCAG 2.4.7 (Focus Visible)** — el `state=focus` muestra siempre el anillo de focus en navegación por teclado.
- **WCAG 2.4.11 / 2.4.13 (Focus Appearance)** — el anillo usa dos capas (ring + gap de contraste) con grosor `--stroke-focus-ring-width`, garantizando visibilidad sobre cualquier fondo.
- **WCAG 3.3.1** — en error: `aria-invalid="true"` en el trigger + mensaje visible referenciado con `aria-describedby`.
- **WCAG 2.4.6** — el label identifica el propósito; no usar solo placeholder.
