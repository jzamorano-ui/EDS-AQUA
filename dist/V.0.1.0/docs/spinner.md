# Spinner

Indicador de carga breve y localizada. No reemplaza al Loading Indicator en transiciones de página completa.

---

## Propiedades

| Propiedad | Valores |
|---|---|
| `size` | Small (20px) · Medium (24px) · Large (32px) |
| `step` | 1–8 (fotogramas de animación — solo Figma) |

El spinner no tiene propiedad `variant` — el color del arco es siempre `--color-border-focus`. El `step` existe únicamente en el component set de Figma para representar los fotogramas de la animación; no es una prop de código.

---

## Props

```typescript
interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'   // default: 'md'
  label?: string               // aria-label del contenedor, default: 'Cargando…'
}
```

---

## Tokens

### Color

| Elemento | Propiedad CSS | CSS custom property |
|---|---|---|
| `arco` | border-color | `--color-border-focus` |

### Layout

| Propiedad | Size | CSS custom property | Valor |
|---|---|---|---|
| Dimensión | sm | — | 20×20px |
| Dimensión | md | — | 24×24px |
| Dimensión | lg | — | 32×32px |
| `border-width` | sm · md | — | 2px |
| `border-width` | lg | — | 3px |
| `border-radius` | — | `--radius-pill` | 999px |

---

## HTML

```html
<!-- Standalone -->
<div aria-busy="true" aria-label="Cargando…">
  <span class="spinner spinner--md" aria-hidden="true"></span>
</div>

<!-- Dentro de button en estado loading -->
<button type="button" disabled aria-busy="true" aria-label="Guardando…">
  <span class="spinner spinner--md" aria-hidden="true"></span>
  Guardando…
</button>
```

---

## ARIA

| Elemento | Tag | Atributos requeridos |
|---|---|---|
| Contenedor de carga | cualquier elemento | `aria-busy="true"` · `aria-label="[estado]"` |
| Spinner | `<span>` | `aria-hidden="true"` |

---

## Teclado

Este componente no es interactivo — no recibe foco.

---

## Reglas

- En `button` usar siempre `size=md` — independiente del tamaño del botón.
- Solo para cargas breves y locales — no sustituye al Loading Indicator en transiciones de flujo principales.
- Colocar cerca del contenido que está cargando.
- No usar múltiples spinners simultáneos en la misma vista.
- `button/icon` no soporta loading.

---

## Accesibilidad

- **WCAG 2.3.3** — respetar `prefers-reduced-motion`: la animación se detiene con `animation: none`.
- **WCAG 1.4.11** — `--color-border-focus` sobre fondos claros cumple ≥ 3:1.
- El contenedor debe tener `aria-busy="true"` y un `aria-label` de estado accesible.
