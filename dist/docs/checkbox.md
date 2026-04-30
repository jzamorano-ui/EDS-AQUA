# Checkbox

Selección múltiple independiente. Para selección exclusiva usar `radio button`; para on/off inmediato usar `toggle`.

---

## Propiedades

| Propiedad | Valores |
|---|---|
| `state` | default · selected · focus |
| `disabled` | true · false |
| `label` | string (requerido) |

**Combinatoria válida (5):** default/false · selected/false · focus/false · default/true · selected/true.
`focus + disabled` no existe — un campo deshabilitado no recibe foco.

### checkbox group

| Propiedad | Valores |
|---|---|
| `option-1` … `option-5` | true · false — visibilidad de cada opción |

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
| `checkbox-control` | default | background | `--color-bg-surface-default` |
| `checkbox-control` | selected · focus | background | `--color-action-primary-default` |
| `checkbox-control` | disabled | background | `--color-bg-fill-neutral-medium` |
| `checkbox-control` | default | border | `--color-border-default` |
| `checkbox-control` | hover | border | `--color-border-focus` |
| `checkbox-control` | selected · focus | border | `--color-action-primary-default` |
| `checkbox-control` | disabled | border | `--color-border-disabled` |
| `checkmark` (ícono) | selected · focus | fill | `--color-icon-system-inverse` |
| `label` | default · selected · focus | color | `--color-text-primary` |
| `label` | disabled | color | `--color-text-disabled` |
| focus ring | focus | outline | `--color-focus-ring-default` |

### Layout

| Propiedad | CSS custom property | Valor |
|---|---|---|
| `gap` (control · label) | `--space-md` | 16px |
| Área touch (`checkbox-wrapper`) | — | 40×44px |
| Control visual (`checkbox-control`) | — | 24×24px |
| `border-radius` (`checkbox-control`) | `--radius-xs` | 4px |
| `focus-ring-width` | `--stroke-focus-ring-width` | 2px |

### Tipografía

| Elemento | Estilo | font-size | font-weight | line-height |
|---|---|---|---|---|
| `label` | `body/md-regular` | 14px | 400 | 20px |

---

## HTML

```html
<!-- Checkbox aislado -->
<label class="checkbox">
  <input type="checkbox" id="terms">
  <span class="checkbox__label">Acepto los términos</span>
</label>

<!-- Checkbox deshabilitado -->
<label class="checkbox checkbox--disabled">
  <input type="checkbox" id="opt-off" disabled aria-disabled="true">
  <span class="checkbox__label">Opción no disponible</span>
</label>

<!-- Checkbox group -->
<fieldset>
  <legend>Coberturas adicionales</legend>
  <label class="checkbox">
    <input type="checkbox" id="opt1" name="coberturas" checked aria-checked="true">
    <span class="checkbox__label">Dental</span>
  </label>
  <label class="checkbox">
    <input type="checkbox" id="opt2" name="coberturas">
    <span class="checkbox__label">Farmacia</span>
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
| Indeterminado | `<input type="checkbox">` | `aria-checked="mixed"` *(no soportado en MVP — no implementar)* |

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
- Cada opción funciona de forma independiente — marcar una no afecta a las demás.
- El área clickeable incluye el control y el texto — ambos activan el checkbox.
- No usar para selección exclusiva — cuando solo una opción es válida, usar `radio button`.
- Agrupar opciones relacionadas con `<fieldset>` + `<legend>` para dar contexto al grupo.
- `checkbox group` solo layout vertical en MVP.

---

## Accesibilidad

- Touch target mínimo 44×44px — `checkbox-wrapper` cumple (40×44px con padding-block 10px).
- Focus visible siempre — no suprimir el outline en ningún contexto.
- **WCAG 1.3.1** — usar `<fieldset>` + `<legend>` para grupos; el `<label>` asocia texto a cada control.
- **WCAG 2.5.3** — el texto del label describe la opción, no el estado.
- **WCAG 4.1.2** — `aria-checked` debe reflejar el estado real en todo momento.
