# [Componente]

[Una línea: qué hace. Si se confunde con otro componente, la diferencia clave aquí.]

---

## Propiedades

| Propiedad | Valores |
|---|---|
| `propiedad` | valor-a · valor-b |

[Combinatoria válida si aplica — inline como nota.]

---

## Props

```typescript
interface ComponentProps {
  prop: 'valor-a' | 'valor-b'  // default: 'valor-a'
  optionalProp?: boolean        // default: false
  requiredText: string
  children?: React.ReactNode
  onAction?: () => void
}
```

---

## Tokens

### Color

| Elemento | Estado | Propiedad CSS | CSS custom property |
|---|---|---|---|
| `elemento` | default | background | `--css-var` |

### Layout

| Propiedad | CSS custom property | Valor |
|---|---|---|
| `padding-block` | `--space-sm` | 12px |
| `padding-inline` | `--space-md` | 16px |
| `gap` | `--space-sm` | 12px |
| `border-radius` | `--radius-sm` | 8px |
| `border-width` | `--stroke-xs` | 1px |

### Tipografía

| Elemento | Estilo | font-size | font-weight | line-height |
|---|---|---|---|---|
| `texto` | `body/md-regular` | 14px | 400 | 20px |

---

## HTML

```html
<!-- Caso de uso principal -->
<element>…</element>
```

---

## ARIA

| Elemento | Tag · Role | Atributos requeridos |
|---|---|---|
| Elemento principal | `<tag>` | `aria-atributo="valor"` |

---

## Teclado

| Tecla | Acción |
|---|---|
| `Tab` | descripción |

[Si no aplica: "Este componente no es interactivo — no recibe foco."]

---

## Reglas

- Restricción crítica.
- Combinaciones inválidas.
- Diferencia clave con componentes similares.

---

## Accesibilidad

- **WCAG X.X.X** — criterio accionable en una línea.
