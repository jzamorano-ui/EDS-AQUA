# Spinner

Indicador de carga breve y localizada. No reemplaza al Loading Indicator en transiciones de página completa.

---

## Propiedades

| Propiedad | Valores |
|---|---|
| `size` | sm (20px) · md (24px) · lg (32px) |
| `variant` | default · inverse · destructive |

`variant` no es una propiedad Figma — es un concepto de contexto resuelto por el color del contenedor.

---

## Props

```typescript
interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'                          // default: 'md'
  variant?: 'default' | 'inverse' | 'destructive'    // default: 'default'
  label?: string                                      // aria-label, default: 'Cargando…'
}
```

---

## Tokens

### Color

| Variant | Color del arco | Hex | Superficie |
|---|---|---|---|
| `default` | `icon/system/context-color` → slate-900 | `#0F202B` | Fondos claros |
| `inverse` | `icon/system/context-color` → white | `#FFFFFF` | Fondos oscuros · botones Primary/Destructive |
| `destructive` | `icon/system/context-color` → red-700 | `#A31425` | Fondos claros · botones Destructive |

El arco SVG usa `currentColor`. Implementar en CSS:

```css
.spinner--default     { color: var(--color-icon-system-primary-default); }
.spinner--inverse     { color: #ffffff; }
.spinner--destructive { color: var(--color-text-status-danger-default); }

@keyframes spin { to { transform: rotate(360deg); } }
.spinner { animation: spin 800ms linear infinite; }

@media (prefers-reduced-motion: reduce) {
  .spinner { animation: none; }
}
```

### Layout

| Propiedad | Size | Valor |
|---|---|---|
| Dimensión | sm | 20×20px |
| Dimensión | md | 24×24px |
| Dimensión | lg | 32×32px |

---

## HTML

```html
<!-- Standalone -->
<div aria-busy="true" aria-label="Cargando…">
  <svg class="spinner spinner--md" aria-hidden="true">…</svg>
</div>

<!-- Dentro de button (estado loading) -->
<button type="button" disabled aria-busy="true" aria-label="Guardando…">
  <svg class="spinner spinner--md" aria-hidden="true"></svg>
</button>
```

---

## ARIA

| Elemento | Tag | Atributos requeridos |
|---|---|---|
| Contenedor de carga | cualquier elemento | `aria-busy="true"` · `aria-label="[estado]"` |
| SVG del spinner | `<svg>` | `aria-hidden="true"` |

---

## Teclado

Este componente no es interactivo — no recibe foco.

---

## Reglas

- En `button` usar siempre `size=md` — independiente del tamaño del botón.
- `default` y `destructive` solo sobre superficies claras. `inverse` solo sobre fondos oscuros o botones Primary/Destructive.
- No usar múltiples spinners simultáneos en la misma vista.
- No acompañar de texto de estado dentro del componente — el texto contextual va en el layout externo.
- `button/icon` no soporta loading.

---

## Accesibilidad

- **WCAG 1.4.11** — contraste del arco ≥ 3:1 contra su superficie en los tres variants.
- **WCAG 2.3.3** — respetar `prefers-reduced-motion`: detener o reemplazar la animación.
- El contenedor debe tener `aria-busy="true"` y un label de estado accesible.
