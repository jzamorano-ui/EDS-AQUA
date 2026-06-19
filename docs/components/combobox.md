# Combobox

Selección única de una opción desde una lista **filtrable por texto**: el usuario escribe y la lista se reduce a las coincidencias. Para selección sin búsqueda usar **Select**; para texto libre usar **Text Field**; para ejecutar acciones usar **Menu**. Consume las primitivas compartidas **`menu/list`** (panel) y **`_menu/item`** (opción) — documentadas en [`menu.md`](menu.md); en Combobox toman rol ARIA `listbox`/`option`. Lista cerrada y estricta: no acepta valores fuera de las opciones (v1).

---

## Propiedades

### Combobox

| Propiedad | Valores |
|---|---|
| `state` | default · active · writing · no-results · filled · error · read-only · disabled · focus |
| `label` | texto visible — requerido |
| `placeholder` | texto visible en el campo antes de escribir/seleccionar |
| `helper-text` | true · false — instrucción contextual bajo el campo |
| `feedback` | mensaje de error — requerido si `state=error` |
| `icon-left` | true · false — ícono decorativo (leading) |
| `icon-right` | true · false — ícono funcional de limpiar (⊗) cuando hay valor |
| `icon-tooltip` | true · false — ícono de ayuda junto al label |
| `↪ tooltip` | true · false — tooltip del ícono de ayuda |

- **`focus`** = campo enfocado por teclado, cerrado (anillo de focus visible).
- **`active`** = panel desplegado (`menu/list` abierto), sin filtrar aún.
- **`writing`** = el usuario escribe → la lista se filtra (coincidencia *contains*).
- **`no-results`** = se escribió y ninguna opción coincide → el panel muestra el mensaje de vacío explícito.
- **`filled`** = opción seleccionada, campo cerrado, ícono ⊗ de limpiar disponible.

### menu/list (panel) · \_menu/item (opción)

Propiedades, estados y comportamiento (scroll, divisor, ícono de opción) → **[`menu.md`](menu.md)**. En Combobox toman rol ARIA `listbox`/`option`.

---

## Props

```typescript
interface ComboboxProps {
  label: string                    // requerido
  placeholder?: string
  helperText?: string              // texto informativo bajo el campo
  feedbackMessage?: string         // mensaje de error — requerido si state='error'
  state?: 'default' | 'active' | 'writing' | 'no-results' | 'filled' | 'error' | 'read-only' | 'disabled' | 'focus'
  leftIcon?: React.ReactNode       // decorativo
  clearable?: boolean              // muestra el ícono ⊗ de limpiar cuando hay valor — default: true
  iconTooltip?: boolean            // default: false
  tooltipText?: string             // requerido si iconTooltip=true
  options: ComboboxOption[]        // lista cerrada
  value?: string
  inputValue?: string              // texto tipeado (filtro)
  onChange?: (value: string) => void
  onInputChange?: (text: string) => void
  onClear?: () => void
  onOpen?: () => void
  onClose?: () => void
}

interface ComboboxOption {
  label: string                    // requerido
  value: string                    // requerido — identificador único
  icon?: React.ReactNode
  disabled?: boolean
}
```

---

## Tokens

### Color

**Combobox — campo y label**

| Elemento | Estado | Propiedad CSS | CSS custom property |
|---|---|---|---|
| `combobox-field` | default · active · writing · no-results · filled · error · focus | background | `--color-bg-fill-neutral-subtle` |
| `combobox-field` | read-only | background | `--color-bg-fill-inverse-subtle` |
| `combobox-field` | disabled | background | `--color-action-primary-disabled` |
| `combobox-field` | default · filled · read-only | border | `--color-border-default` (1px) |
| `combobox-field` | active · writing · no-results | border | `--color-border-focus` (2px) |
| `combobox-field` | error | border | `--color-border-danger-focus` (2px) |
| `combobox-field` | disabled | border | `--color-border-disabled` (1px) |
| `combobox-field` | focus | border + anillo | ver **Anillo de focus** |
| `label` | default · active · writing · no-results · filled · read-only · focus | color | `--color-text-primary` |
| `label` | error | color | `--color-text-status-danger` |
| `label` | disabled | color | `--color-text-disabled` |
| `input` (valor) | filled | color | `--color-text-primary` |
| `input` (texto tipeado) | writing · no-results | color | `--color-text-primary` |
| `input` (placeholder) | default · active | color | `--color-text-secondary` |
| `input` | disabled | color | `--color-text-disabled` |
| `icon-left` (decorativo) | default | fill | `--color-icon-system-secondary` |
| `icon-left` | disabled | fill | `--color-icon-system-disabled` |
| `clear` (⊗ icon-right) | filled · writing · no-results | fill | `--color-icon-system-secondary` |
| `clear` | disabled | fill | `--color-icon-system-disabled` |
| `chevron` | default · active · writing · no-results · error · read-only · focus | fill | `--color-icon-system-secondary` |
| `chevron` | filled | fill | `--color-icon-system-primary` |
| `chevron` | disabled | fill | `--color-icon-system-disabled` |
| `helper-text` | default · active · writing · no-results · filled · read-only · focus | color | `--color-text-secondary` |
| `helper-text` | disabled | color | `--color-text-disabled` |
| `feedback-message` | error | color | `--color-text-status-danger` |

**Anillo de focus** (navegación por teclado — `state=focus`)

| Capa | Propiedad CSS | CSS custom property |
|---|---|---|
| anillo externo | border (outside) | `--color-focus-ring-default` |
| gap (separador) | border (inside del `combobox-field`) | `--color-focus-ring-gap-default` |
| grosor (ambos) | border-width | `--stroke-focus-ring-width` (2px) |

**Panel y opciones** (`menu/list` + `_menu/item`) → tokens de color en **[`menu.md`](menu.md)**. Específico de Combobox: `panel-empty` (mensaje `no-results`) → `--color-text-secondary`.

### Layout

**Combobox**

| Propiedad | CSS custom property | Valor |
|---|---|---|
| `gap` (label-row · field · helper) | `--space-2xs` | 4px |
| `padding-block` (field) | `--space-sm` | 12px |
| `padding-inline` (field) | `--space-sm` | 12px |
| `gap` (field: input · iconos · chevron) | `--space-xs` | 8px |
| `border-radius` (field) | `--radius-sm` | 8px |
| `border-width` (default · filled · read-only · disabled) | `--stroke-xs` | 1px |
| `border-width` (active · writing · no-results · error) | `--stroke-sm` | 2px |
| `min-width` (field) | — (constante de layout) | 160px |

**Panel y opciones** (`menu/list` + `_menu/item`) → layout en **[`menu.md`](menu.md)**.

### Tipografía

| Elemento | Estilo | font-size | font-weight | line-height |
|---|---|---|---|---|
| `label` | `body/lg-medium` | 16px | 500 | 24px |
| `input` (placeholder · texto · valor) | `body/lg-regular` | 16px | 400 | 24px |
| `option-label` · `panel-empty` | `body/lg-regular` | 16px | 400 | 24px |
| `helper-text` · `feedback-message` | `body/md-regular` | 14px | 400 | 20px |

---

## HTML

```html
<!-- Combobox default (cerrado) -->
<div class="combobox">
  <div class="combobox__label-row">
    <label id="comuna-label" class="combobox__label">Comuna</label>
  </div>
  <div class="combobox__field">
    <input class="combobox__input"
           role="combobox"
           aria-labelledby="comuna-label"
           aria-expanded="false"
           aria-controls="comuna-listbox"
           aria-autocomplete="list"
           placeholder="Selecciona tu comuna">
    <svg class="combobox__chevron" aria-hidden="true">…</svg>
  </div>
  <span class="combobox__helper">Escribe para filtrar.</span>
</div>

<!-- Combobox writing (escribiendo → lista filtrada) -->
<div class="combobox combobox--writing">
  <div class="combobox__label-row">
    <label id="comuna-label-w" class="combobox__label">Comuna</label>
  </div>
  <div class="combobox__field">
    <input class="combobox__input"
           role="combobox"
           aria-labelledby="comuna-label-w"
           aria-expanded="true"
           aria-controls="comuna-listbox-w"
           aria-autocomplete="list"
           aria-activedescendant="comuna-opt-1"
           value="ma">
    <button class="combobox__clear" aria-label="Limpiar">
      <svg aria-hidden="true">…</svg>
    </button>
    <svg class="combobox__chevron" aria-hidden="true">…</svg>
  </div>
  <ul class="menu-list" id="comuna-listbox-w" role="listbox" aria-labelledby="comuna-label-w">
    <li class="menu-item" id="comuna-opt-1" role="option" aria-selected="false">
      <span class="menu-item__label">Maipú</span>
    </li>
    <li class="menu-item" id="comuna-opt-2" role="option" aria-selected="false">
      <span class="menu-item__label">Macul</span>
    </li>
  </ul>
</div>

<!-- Combobox no-results (sin coincidencias) -->
<div class="combobox combobox--no-results">
  <div class="combobox__label-row">
    <label id="comuna-label-nr" class="combobox__label">Comuna</label>
  </div>
  <div class="combobox__field">
    <input class="combobox__input"
           role="combobox"
           aria-labelledby="comuna-label-nr"
           aria-expanded="true"
           aria-controls="comuna-listbox-nr"
           aria-autocomplete="list"
           value="zzz">
    <button class="combobox__clear" aria-label="Limpiar"><svg aria-hidden="true">…</svg></button>
    <svg class="combobox__chevron" aria-hidden="true">…</svg>
  </div>
  <ul class="menu-list" id="comuna-listbox-nr" role="listbox" aria-labelledby="comuna-label-nr">
    <li class="menu-list__empty" role="presentation">Sin coincidencias, intenta con otras palabras claves.</li>
  </ul>
</div>

<!-- Combobox filled (valor seleccionado) -->
<div class="combobox combobox--filled">
  <div class="combobox__label-row">
    <label id="comuna-label-f" class="combobox__label">Comuna</label>
  </div>
  <div class="combobox__field">
    <input class="combobox__input"
           role="combobox"
           aria-labelledby="comuna-label-f"
           aria-expanded="false"
           aria-controls="comuna-listbox-f"
           aria-autocomplete="list"
           value="Maipú">
    <button class="combobox__clear" aria-label="Limpiar selección"><svg aria-hidden="true">…</svg></button>
    <svg class="combobox__chevron" aria-hidden="true">…</svg>
  </div>
</div>

<!-- Combobox error -->
<div class="combobox combobox--error">
  <div class="combobox__label-row">
    <label id="comuna-label-err" class="combobox__label">Comuna</label>
  </div>
  <div class="combobox__field">
    <input class="combobox__input"
           role="combobox"
           aria-labelledby="comuna-label-err"
           aria-expanded="false"
           aria-controls="comuna-listbox-err"
           aria-autocomplete="list"
           aria-invalid="true"
           aria-describedby="comuna-feedback"
           placeholder="Selecciona tu comuna">
    <svg class="combobox__chevron" aria-hidden="true">…</svg>
  </div>
  <span id="comuna-feedback" class="combobox__feedback" role="alert">Selecciona una comuna para avanzar.</span>
</div>

<!-- Combobox disabled -->
<div class="combobox combobox--disabled">
  <div class="combobox__label-row">
    <label id="comuna-label-dis" class="combobox__label">Comuna</label>
  </div>
  <div class="combobox__field">
    <input class="combobox__input" role="combobox" aria-expanded="false"
           aria-controls="comuna-listbox-dis" placeholder="Selecciona tu comuna" disabled>
    <svg class="combobox__chevron" aria-hidden="true">…</svg>
  </div>
  <span class="combobox__helper">Texto de ayuda explicando por qué está deshabilitado.</span>
</div>
```

---

## ARIA

| Elemento | Tag · Role | Atributos requeridos |
|---|---|---|
| Combobox input | `<input role="combobox">` | `aria-expanded` · `aria-controls="[panel-id]"` · `aria-autocomplete="list"` · `aria-labelledby="[label-id]"` |
| Opción destacada (teclado) | input | `aria-activedescendant="[option-id]"` |
| Combobox en error | `<input role="combobox">` | `aria-invalid="true"` · `aria-describedby="[feedback-id]"` |
| Label | `<label>` | `id` — referenciado en `aria-labelledby` del input |
| Panel (menu/list) | `<ul role="listbox">` | `id` · `aria-labelledby="[label-id]"` |
| Opción (\_menu/item) | `<li role="option">` | `id` · `aria-selected="true\|false"` |
| Opción deshabilitada | `<li role="option">` | `aria-disabled="true"` |
| Mensaje sin resultados | `<li>` | `role="presentation"` — texto informativo, no seleccionable |
| Botón limpiar (⊗) | `<button>` | `aria-label="Limpiar"` |
| Feedback de error | `<span>` | `role="alert"` · `id` referenciado en `aria-describedby` |
| Íconos decorativos | `<svg>` | `aria-hidden="true"` |

---

## Teclado

| Tecla | Acción |
|---|---|
| `Tab` | Mueve el foco al campo → `state=focus` (anillo de focus visible) |
| `Shift + Tab` | Foco al elemento anterior |
| Escribir (letras) | Abre el panel y **filtra** la lista (`state=writing`) — coincidencia *contains* |
| `↓` | Abre el panel · Mueve foco a la siguiente opción |
| `↑` | Mueve foco a la opción anterior |
| `Home` | Mueve foco a la primera opción |
| `End` | Mueve foco a la última opción |
| `Enter` | Selecciona la opción destacada (`state=filled`) |
| `Escape` | Cierra el panel; si hay texto de filtro, lo limpia |
| `Backspace` · `Delete` | Borra caracteres del filtro · Re-amplía la lista |
| `Tab` (dentro del panel) | Cierra el panel y mueve el foco al siguiente elemento |

---

## Reglas

- `label` siempre visible — el placeholder desaparece al interactuar.
- **`focus` vs `active` vs `writing`:** `focus` = enfocado por teclado y cerrado (anillo de focus); `active` = panel desplegado sin filtrar; `writing` = escribiendo → lista filtrada. La navegación por teclado **siempre** muestra el anillo de focus.
- **Combinatoria de estados:** `filled` · `error` · `read-only` (estado del dato) son **ortogonales** a `focus` · `active` · `writing` (interacción) y coexisten. `disabled` y `read-only` **anulan** la interacción.
- **Filtrado:** coincidencia *contains* sobre el label de la opción. **Lista cerrada y estricta** — no acepta valores fuera de las opciones (v1). Si no hay coincidencias, mostrar siempre `no-results` con mensaje — **nunca** un panel vacío en silencio.
- **Scroll:** hasta 6 opciones → `scroll=none` (hug, sin scrollbar). Con 7 o más → `scroll` con alto fijo **286px** mostrando 50% de la siguiente opción como pista.
- **Ancho:** el `field` tiene min-width **160px**. El panel iguala el ancho del campo; si baja de 200px, el panel se mantiene en **200px alineado a la izquierda** (no se centra).
- El panel **flota** (`position: absolute`) — nunca empuja el layout. **Debe renderizarse en un portal (o con `z-index` alto)** para no quedar tapado por los campos siguientes del formulario.
- El label de opción **trunca a 1 línea con ellipsis** — nunca hace wrap.
- En `state=error` siempre incluir `feedbackMessage` — no depender solo del color de borde.
- `read-only` ≠ `disabled`: read-only muestra el valor y permite leerlo; disabled excluye el campo del formulario y del orden de teclado.
- **Cuándo usar Combobox vs alternativas:** lista **larga** donde buscar agiliza → Combobox. Lista corta y estable (≤6) → **Select**. Texto libre / valores fuera de lista → **Text Field**. Solo 2 opciones → **radio group**. Ejecutar acciones → **Menu**.
- Si una opción tiene ícono, todas deben tenerlo — íconos mixtos crean jerarquía falsa.

---

## Accesibilidad

- **WCAG 1.3.1** — label asociado programáticamente vía `aria-labelledby` en el input.
- **WCAG 4.1.2** — input con `role="combobox"`, `aria-expanded`, `aria-autocomplete="list"` y `aria-controls` apuntando al panel; opción destacada vía `aria-activedescendant`.
- **WCAG 2.1.1** — teclado completo: escribir para filtrar, flechas para navegar, Enter para seleccionar, Escape para cerrar/limpiar.
- **WCAG 2.4.7 (Focus Visible)** — el `state=focus` muestra siempre el anillo de focus en navegación por teclado.
- **WCAG 2.4.11 / 2.4.13 (Focus Appearance)** — el anillo usa dos capas (ring + gap de contraste) con grosor `--stroke-focus-ring-width`, garantizando visibilidad sobre cualquier fondo.
- **WCAG 3.3.1** — en error: `aria-invalid="true"` en el input + mensaje visible referenciado con `aria-describedby`.
- **WCAG 2.4.6** — el label identifica el propósito; no usar solo placeholder.
</content>
</invoke>
