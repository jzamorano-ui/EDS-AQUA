# Toggle

Control on/off con efecto inmediato. No incluye label propio — el texto visible es obligatorio en el layout consumidor.

---

## Propiedades

| Propiedad | Valores |
|---|---|
| `state` | default · selected · focus |
| `disabled` | true · false |

**Combinatoria válida (5):** default/false · selected/false · focus/false · default/true · selected/true.
`focus + disabled` no existe.

---

## Props

```typescript
interface ToggleProps {
  label: string                  // requerido — mostrado externamente en el layout
  checked?: boolean              // default: false
  disabled?: boolean             // default: false
  onChange?: (checked: boolean) => void
}
```

---

## Tokens

### Color

| Elemento | Estado | Propiedad CSS | CSS custom property |
|---|---|---|---|
| `track` | default | background | `--color-icon-system-secondary-default` |
| `thumb` | default | background | `--color-icon-system-inverse-default` |
| `track` | selected · focus | background | `--color-icon-semantic-success-default` |
| `thumb` | selected · focus | background | `--color-icon-system-inverse-default` |
| `focus-ring` | focus | outline (outside) | `--color-focus-ring-default` |
| `track` | focus | outline (inside) | `--color-focus-ring-gap` |
| `track` | disabled | background | `--color-icon-system-disabled-default` |
| `thumb` | disabled | background | `--color-icon-system-tertiary-default` |

`disabled` aplica igual a `state=default` y `state=selected`.

### Layout

| Propiedad | CSS custom property | Valor |
|---|---|---|
| Área touch (componente) | — | 48×44px |
| Track | — | 48×24px |
| `border-radius` (track) | `--radius-pill` | 999px |
| Thumb | — | 16×16px |
| `border-radius` (thumb) | `--radius-pill` | 999px |
| `focus-ring-width` | `--focus-ring-width` | 2px |

---

## HTML

```html
<div class="toggle-field">
  <span id="notif-label">Activar notificaciones</span>
  <button role="switch" aria-checked="false" aria-labelledby="notif-label">
    <span class="toggle__track" aria-hidden="true">
      <span class="toggle__thumb"></span>
    </span>
  </button>
</div>

<!-- Disabled -->
<button role="switch" aria-checked="false" aria-labelledby="notif-label"
        disabled aria-disabled="true">
  <span class="toggle__track" aria-hidden="true">
    <span class="toggle__thumb"></span>
  </span>
</button>
```

---

## ARIA

| Elemento | Tag · Role | Atributos requeridos |
|---|---|---|
| Toggle | `<button role="switch">` | `aria-checked="true/false"` · `aria-labelledby="[id]"` o `aria-label` |
| Label externo | `<label>` o `<span>` | `id` — referenciado por `aria-labelledby` |
| Disabled | `<button role="switch">` | `disabled` · `aria-disabled="true"` |

---

## Teclado

| Tecla | Acción |
|---|---|
| `Tab` | Mueve el foco al toggle |
| `Shift + Tab` | Foco al elemento anterior |
| `Space` | Activa o desactiva el toggle |

---

## Reglas

- Label externo obligatorio — el componente no incluye label propio.
- El cambio se aplica inmediatamente — no requiere confirmación adicional.
- No usar para acciones destructivas o irreversibles → flujo con confirmación explícita.
- No usar para selección entre más de dos opciones → `radio group`.
- `focus + disabled` no existe.

---

## Accesibilidad

- Touch target mínimo 44×44px — el componente cumple por su altura.
- Focus visible siempre.
- **WCAG 4.1.2** — `aria-checked` refleja el estado real (`true` activo / `false` inactivo).
- **WCAG 1.3.1** — label asociado programáticamente vía `aria-labelledby` o `aria-label`.
