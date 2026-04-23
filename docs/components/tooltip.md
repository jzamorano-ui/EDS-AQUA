# Tooltip

Etiqueta informativa contextual. No interactivo, no crítico. No reemplaza labels visibles ni contiene acciones.

---

## Propiedades

| Propiedad | Valores |
|---|---|
| `Type` | none · left · right · up · down · up-left · up-right · down-left · down-right |
| `Text` | texto breve, máximo ~40 caracteres |

`Type` indica el lado donde aparece la flecha — la posición del tooltip es la opuesta:
`Type=down` → flecha abajo → tooltip aparece encima del trigger.

| Type | Flecha en... | Tooltip aparece... |
|---|---|---|
| `none` | — | cualquier posición |
| `left` | izquierda | a la derecha del trigger |
| `right` | derecha | a la izquierda del trigger |
| `up` | parte superior | debajo del trigger |
| `down` | parte inferior | encima del trigger |
| `up-left` · `up-right` | esquina superior | abajo en diagonal |
| `down-left` · `down-right` | esquina inferior | arriba en diagonal |

---

## Props

```typescript
interface TooltipProps {
  text: string                          // requerido — máximo ~40 caracteres
  type?: 'none' | 'left' | 'right' | 'up' | 'down'
       | 'up-left' | 'up-right' | 'down-left' | 'down-right'  // default: 'down'
  children: React.ReactNode             // trigger — debe ser un elemento focusable
}
```

---

## Tokens

### Color

| Elemento | Propiedad CSS | CSS custom property |
|---|---|---|
| `tooltip-body` | background | `--color-bg-fill-inverse-default` |
| `label` | color | `--color-text-inverse-default` |
| `arrow` | fill | `--color-bg-fill-inverse-default` |

Tokens iguales en todas las variantes de `Type`.

### Layout

| Propiedad | CSS custom property | Valor |
|---|---|---|
| `padding-inline` | `--space-xs` | 8px |
| `padding-block` | `--space-2xs` | 4px |
| `border-radius` | `--radius-xs` | 4px |
| Tamaño arrow | — | 12×6px |

### Tipografía

| Elemento | Estilo | font-size | font-weight | line-height |
|---|---|---|---|---|
| `label` | `caption/sm-regular` | 12px | 400 | 16px |

---

## HTML

```html
<!-- Trigger con texto visible -->
<button type="button" aria-describedby="tooltip-1">
  Ver información
</button>
<span role="tooltip" id="tooltip-1" hidden>Texto explicativo breve</span>

<!-- button/icon sin texto visible -->
<button type="button" aria-label="Información del producto" aria-describedby="tooltip-2">
  <svg aria-hidden="true">…</svg>
</button>
<span role="tooltip" id="tooltip-2" hidden>Texto explicativo breve</span>
```

---

## ARIA

| Elemento | Tag · Role | Atributos requeridos |
|---|---|---|
| Tooltip | `<span role="tooltip">` | `id="[tooltip-id]"` · `hidden` cuando no está visible |
| Trigger con texto | elemento focusable | `aria-describedby="[tooltip-id]"` |
| Trigger sin texto | `<button>` | `aria-label="[acción]"` · `aria-describedby="[tooltip-id]"` |

---

## Teclado

Este componente no recibe foco — el foco es del trigger. El tooltip aparece al recibir foco el trigger.

| Dispositivo | Aparece | Se cierra |
|---|---|---|
| Desktop | hover · focus del trigger | al salir del trigger |
| Mobile | press del trigger | al interactuar fuera |

---

## Reglas

- Texto máximo ~40 caracteres — una sola línea.
- No dejar el placeholder `"My Tooltip"` en producción.
- Usar `Type=none` cuando el posicionamiento lo controla el layout.
- El `Type` elegido debe coincidir con la posición real del tooltip en la interfaz.
- No usar para información crítica — si el contenido es esencial, colocarlo visible en el layout.

---

## Accesibilidad

- El tooltip aparece al recibir `focus` el trigger — no solo en hover.
- **WCAG 1.4.13** — el tooltip permanece visible si el usuario mueve el cursor desde el trigger hacia el tooltip.
- No reemplaza `aria-label` — el trigger debe tener su propio label accesible.
- Texto breve — lectores de pantalla leen el contenido completo al recibir foco.
