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
  label: string                  // requerido — el componente renderiza un <span> externo con este texto, referenciado con aria-labelledby
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
| `track` | default | background | `--color-icon-system-secondary` |
| `thumb` | default | background | `--color-icon-system-inverse` |
| `track` | selected · focus | background | `--color-icon-status-success` |
| `thumb` | selected · focus | background | `--color-icon-system-inverse` |
| `focus-ring` | focus | outline | `--color-focus-ring-default` |
| `track` | disabled | background | `--color-icon-system-disabled` |
| `thumb` | disabled | background | `--color-icon-system-disabled` |

`disabled` aplica igual a `state=default` y `state=selected`.

### Layout

| Propiedad | CSS custom property | Valor |
|---|---|---|
| Área touch (componente) | — | 48×44px |
| Track | — | 48×24px |
| `border-radius` (track) | `--radius-pill` | 999px |
| Thumb | — | 16×16px |
| `border-radius` (thumb) | `--radius-pill` | 999px |
| `focus-ring-width` | `--stroke-focus-ring-width` | 2px |

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

- Es un control binario — activa o desactiva una única opción.
- El cambio se aplica inmediatamente, sin confirmación — no usar para acciones destructivas o irreversibles.
- `label` obligatorio en el layout consumidor — el componente no incluye texto propio.
- El área clickeable incluye el control y el label — ambos activan el toggle.
- No usar para selección entre más de dos opciones → `radio group`.

---

## Accesibilidad

- Touch target mínimo 44×44px — el componente cumple por su altura.
- Focus visible siempre.
- **WCAG 4.1.2** — `aria-checked` refleja el estado real (`true` activo / `false` inactivo).
- **WCAG 1.3.1** — label asociado programáticamente vía `aria-labelledby` o `aria-label`.
