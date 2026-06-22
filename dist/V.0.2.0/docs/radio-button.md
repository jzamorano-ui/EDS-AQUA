# Radio Button

Selección exclusiva entre opciones mutuamente excluyentes. Siempre dentro de un `radio group`. Para selección múltiple usar `checkbox`.

---

## Propiedades

### radio button

| Propiedad | Valores |
|---|---|
| `state` | default · selected · focus |
| `disabled` | true · false |
| `label` | texto visible (obligatorio) |

**Combinatoria válida (5):** default/false · selected/false · focus/false · default/true · selected/true.
`focus + disabled` no existe.

### radio group

| Propiedad | Valores |
|---|---|
| `direction` | vertical · horizontal |
| `option-1` … `option-5` | true · false |

---

## Props

```typescript
interface RadioButtonProps {
  name: string                   // requerido — identifica el grupo
  value: string                  // requerido
  label: string                  // requerido
  checked?: boolean              // default: false
  disabled?: boolean             // default: false
  onChange?: (value: string) => void
}

interface RadioGroupProps {
  name: string                   // requerido
  direction?: 'vertical' | 'horizontal'   // default: 'vertical'
  options: Array<{
    value: string
    label: string
    disabled?: boolean
  }>
  value?: string                 // valor actualmente seleccionado
  legend: string                 // requerido — texto del <legend>
  onChange?: (value: string) => void
}
```

---

## Tokens

### Color

| Elemento | Estado | Propiedad CSS | CSS custom property |
|---|---|---|---|
| `radio-control` | default | background | `--color-bg-surface-default` |
| `radio-control` | selected · focus | background | `--color-action-primary-default` |
| `radio-control` | disabled | background | `--color-bg-fill-neutral-medium` |
| `radio-control` | default | border | `--color-border-default` |
| `radio-control` | hover | border | `--color-border-focus` |
| `radio-control` | selected · focus | border | `--color-action-primary-default` |
| `radio-control` | disabled | border | `--color-border-disabled` |
| `radio-dot` | selected · focus | fill | `--color-icon-system-inverse` |
| `label` | default · selected · focus | color | `--color-text-primary` |
| `label` | disabled | color | `--color-text-disabled` |
| focus ring | focus | outline | `--color-focus-ring-default` |

### Layout

| Propiedad | CSS custom property | Valor |
|---|---|---|
| `gap` (control · label) | `--space-md` | 16px |
| Área touch (control-wrapper) | — | 40×44px |
| Control visual (radio-control) | — | 24×24px |
| `border-radius` (radio-control) | `--radius-pill` | 12px (50%) |
| `focus-ring-width` | `--stroke-focus-ring-width` | 2px |

### Tipografía

| Elemento | Estilo | font-size | font-weight | line-height |
|---|---|---|---|---|
| `label` | `body/md-regular` | 14px | 400 | 20px |

---

## HTML

```html
<fieldset>
  <legend>Frecuencia de pago</legend>
  <div>
    <input type="radio" id="mensual" name="freq" value="mensual">
    <label for="mensual">Mensual</label>
  </div>
  <div>
    <input type="radio" id="anual" name="freq" value="anual" checked>
    <label for="anual">Anual</label>
  </div>
</fieldset>
```

---

## ARIA

| Elemento | Tag · Role | Atributos requeridos |
|---|---|---|
| Radio group | `<fieldset>` o `<div role="radiogroup">` | `aria-labelledby="[legend-id]"` |
| Group legend | `<legend>` | texto descriptivo del grupo |
| Radio individual | `<input type="radio">` | `id` · `name="[grupo]"` · `aria-checked="true/false"` |
| Label | `<label>` | `for="[radio-id]"` |
| Disabled | `<input type="radio">` | `disabled` · `aria-disabled="true"` |

---

## Teclado

| Tecla | Acción |
|---|---|
| `Tab` | Entra al grupo; foco en el radio seleccionado (o el primero si ninguno) |
| `Shift + Tab` | Sale del radio group |
| `→` · `↓` | Mueve el foco y selecciona el siguiente radio |
| `←` · `↑` | Mueve el foco y selecciona el radio anterior |

El radio group es un único tab stop. Las flechas navegan y seleccionan dentro del grupo.

---

## Reglas

- Solo una opción puede estar `selected` por grupo — seleccionar una deselecciona las demás.
- No usar de forma aislada — un radio button sin grupo pierde su semántica de exclusividad.
- `label` obligatorio en cada opción — no ocultar para simular radio sin texto.
- El área clickeable incluye el control y el texto — ambos activan la selección.
- La selección se indica con el dot interior, no solo con color — no depender únicamente del relleno.
- Máximo ~6 opciones por grupo — más opciones sugieren un `<select>`.

---

## Accesibilidad

- Touch target mínimo 44×44px.
- Focus visible siempre.
- **WCAG 1.3.1** — usar `<fieldset>` + `<legend>` para agrupar radios relacionados.
- **WCAG 4.1.2** — `aria-checked` refleja el estado real; solo un radio por grupo puede tener `aria-checked="true"`.
