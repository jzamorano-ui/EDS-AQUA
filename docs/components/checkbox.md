# Checkbox

Selección múltiple independiente. Para selección exclusiva usar `radio button`; para on/off inmediato usar `toggle`.

---

## Propiedades

| Propiedad | Valores |
|---|---|
| `state` | default · selected · focus |
| `disabled` | true · false |
| `label` | texto visible (obligatorio) |

**Combinatoria válida (5):** default/false · selected/false · focus/false · default/true · selected/true.
`focus + disabled` no existe.

### checkbox group

| Propiedad | Valores |
|---|---|
| `option-1` … `option-5` | true · false |

Solo soporta layout vertical en MVP.

---

## Props

```typescript
interface CheckboxProps {
  label: string                             // requerido
  checked?: boolean                         // default: false
  disabled?: boolean                        // default: false
  onChange?: (checked: boolean) => void
}

interface CheckboxGroupProps {
  options: Array<{
    id: string
    label: string
    checked?: boolean
    disabled?: boolean
  }>
  onChange?: (id: string, checked: boolean) => void
}
```

---

## Tokens

### Color

| Elemento | Estado | Propiedad CSS | CSS custom property |
|---|---|---|---|
| `Vector` | default | fill | `--color-border-default` |
| `Vector` | selected · focus | fill | `--color-action-primary-default` |
| `Vector` | disabled default | fill | `--color-border-disabled` |
| `Vector` | disabled selected | fill | `--color-action-primary-disabled` |
| `checkbox-control` | focus | outline (outside) | `--color-focus-ring-default` |
| `Vector` | focus | outline (inside) | `--color-focus-ring-gap` |
| `label` | default · selected | color | `--color-text-primary-default` |
| `label` | disabled | color | `--color-text-disabled-default` |

### Layout

| Propiedad | CSS custom property | Valor |
|---|---|---|
| `gap` (control · label) | `--space-md` | 16px |
| Área touch (control-wrapper) | — | 40×44px |
| Control visual (checkbox-control) | — | 24×24px |
| `border-radius` (checkbox-control) | `--radius-xs` | 4px |
| `focus-ring-width` | `--focus-ring-width` | 2px |

### Tipografía

| Elemento | Estilo | font-size | font-weight | line-height |
|---|---|---|---|---|
| `label` | `body/md-regular` | 14px | 400 | 20px |

---

## HTML

```html
<!-- Checkbox aislado -->
<label>
  <input type="checkbox" id="terms">
  <span>Acepto los términos</span>
</label>

<!-- Checkbox group -->
<fieldset>
  <legend>Opciones adicionales</legend>
  <label>
    <input type="checkbox" id="opt1" name="opts" checked>
    <span>Dental</span>
  </label>
  <label>
    <input type="checkbox" id="opt2" name="opts">
    <span>Farmacia</span>
  </label>
</fieldset>
```

---

## ARIA

| Elemento | Tag · Role | Atributos requeridos |
|---|---|---|
| Checkbox | `<input type="checkbox">` | `id` · `aria-checked="true/false"` |
| Label | `<label>` | `for="[checkbox-id]"` |
| Group container | `<fieldset>` | — |
| Group legend | `<legend>` | texto descriptivo del grupo |
| Disabled | `<input type="checkbox">` | `disabled` · `aria-disabled="true"` |
| Indeterminado | `<input type="checkbox">` | `aria-checked="mixed"` *(no soportado en MVP)* |

---

## Teclado

| Tecla | Acción |
|---|---|
| `Tab` | Mueve el foco al checkbox (cada opción es un tab stop) |
| `Shift + Tab` | Foco al elemento anterior |
| `Space` | Activa o desactiva el checkbox con foco |

---

## Reglas

- `label` obligatorio — no ocultar para simular checkbox sin texto.
- `focus + disabled` no existe.
- `checkbox group` solo layout vertical en MVP.
- No usar para selección exclusiva → `radio button`.
- No usar para acciones con efecto inmediato → `toggle`.

---

## Accesibilidad

- Touch target mínimo 44×44px — `control-wrapper` cumple (40×44px).
- Focus visible siempre.
- **WCAG 1.3.1** — usar `<fieldset>` + `<legend>` para grupos relacionados.
- **WCAG 4.1.2** — `aria-checked` debe reflejar el estado real en todo momento.
