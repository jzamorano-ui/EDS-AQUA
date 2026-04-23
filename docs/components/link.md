# Link

Navega a una URL, ruta o ancla. Para ejecutar acciones usar `button`; si visualmente parece link pero dispara lógica, usar `button variant=Tertiary`.

---

## Propiedades

| Propiedad | Valores |
|---|---|
| `size` | sm (12px) · md (14px) · lg (16px) |
| `underline` | True · False |
| `touch area` | False (inline) · True (standalone) |
| `state` | default · hover · active · focus · disabled |

`size` debe coincidir con el tipo de texto circundante.

---

## Props

```typescript
interface LinkProps {
  href: string                                       // requerido
  size?: 'sm' | 'md' | 'lg'                         // default: 'md'
  underline?: boolean                                // default: true
  standalone?: boolean                               // default: false — activa touch area 44×44px
  disabled?: boolean                                 // default: false
  children: React.ReactNode                          // texto del link — requerido
  onClick?: (e: React.MouseEvent) => void
}
```

---

## Tokens

### Color

| Estado | Propiedad CSS (label + underline) | CSS custom property |
|---|---|---|
| default · focus | color | `--color-text-link-default` |
| hover | color | `--color-text-link-hover` |
| active | color | `--color-text-link-active` |
| disabled | color | `--color-text-disabled-default` |
| focus | outline | `--color-focus-ring-default` · `--focus-ring-width` |

El `underline` es un RECT de 1px con el mismo token de color que el label — no usar `text-decoration: underline`.

### Layout

| Propiedad | CSS custom property | Valor |
|---|---|---|
| `focus-ring-width` | `--focus-ring-width` | 2px |
| `border-radius` (focus ring) | `--radius-xs` | 4px |
| Touch target (standalone) | — | mínimo 44×44px |

### Tipografía

| Size | Estilo | font-size | font-weight | line-height |
|---|---|---|---|---|
| `sm` | `caption/sm-regular` | 12px | 400 | 16px |
| `md` | `body/md-regular` | 14px | 400 | 20px |
| `lg` | `body/lg-regular` | 16px | 400 | 24px |

---

## HTML

```html
<!-- Inline (dentro de párrafo) -->
<p>Revisa nuestra <a href="/privacy">política de privacidad</a> para más información.</p>

<!-- Standalone con touch area -->
<a href="/terms" class="link link--standalone">Ver términos y condiciones</a>

<!-- Disabled -->
<a aria-disabled="true" class="link link--disabled">Ver más</a>
```

---

## ARIA

| Elemento | Tag | Atributos requeridos |
|---|---|---|
| Link | `<a href="…">` | texto descriptivo — prohibido "clic aquí" · "ver" · "más info" |
| Link disabled | `<a>` | `aria-disabled="true"` · sin `href` |

---

## Teclado

| Tecla | Acción |
|---|---|
| `Tab` | Mueve el foco al link |
| `Shift + Tab` | Foco al elemento anterior |
| `Enter` | Navega al destino |

---

## Reglas

- `underline=True` obligatorio cuando el link convive con texto del mismo color (WCAG 1.4.1).
- `underline=False` solo en contextos donde el link es inequívoco por posición: nav, breadcrumb, menú footer.
- `standalone=true` en interfaces táctiles cuando el link está aislado — activa el touch target de 44×44px.
- Solo soportado sobre superficies claras — no existe variante inverse.
- Usar con moderación el estado disabled — preferir eliminar el link si no es navegable.

---

## Accesibilidad

- **WCAG 1.4.1** — `underline=True` cuando convive con texto circundante; el color solo no distingue el link.
- **WCAG 2.4.4** — texto del link descriptivo por sí solo.
- **WCAG 2.4.7** — focus visible siempre. No suprimir `state=focus`.
- **WCAG 2.5.5** — `standalone=true` cuando el link está aislado (target mínimo 44×44px).
