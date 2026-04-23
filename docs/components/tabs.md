# Tabs

Organiza contenido en secciones accesibles horizontalmente. Cambia la sección visible — no filtra contenido dentro de una misma vista (eso es `chips`).

---

## Propiedades

| Propiedad | Valores |
|---|---|
| `state` | default · active · focus · disabled |
| `label` | texto visible (obligatorio) |
| `left-icon` | opcional · decorativo |

Siempre exactamente un tab en `state=active`. Mínimo 2 tabs por grupo.

---

## Props

```typescript
interface TabItemProps {
  id: string
  label: string
  icon?: React.ReactNode
  disabled?: boolean           // default: false
  content: React.ReactNode     // contenido del panel asociado
}

interface TabsProps {
  tabs: TabItemProps[]         // mínimo 2 items
  defaultActiveId?: string     // default: tabs[0].id
  ariaLabel: string            // requerido para el tablist
  onChange?: (id: string) => void
}
```

---

## Tokens

### Color

| Elemento | Estado | Propiedad CSS | CSS custom property |
|---|---|---|---|
| `label` | default | color | `--color-text-secondary-default` |
| `label` | active | color | `--color-text-primary-default` |
| `label` | disabled | color | `--color-text-disabled-default` |
| `icon` | default | fill | `--color-icon-system-secondary-default` |
| `icon` | active | fill | `icon/system/context-color` (hereda del contenedor) |
| `icon` | disabled | fill | `--color-icon-system-disabled-default` |
| `indicator` | active | fill | `--color-border-focus` |
| `indicator` | default · disabled | fill | transparent |
| `tab-content` | focus | outline (outside) | `--color-focus-ring-default` |
| `tab-content` | focus | outline gap (inside) | `--color-focus-ring-gap` |
| `divider` | — | fill | `--color-border-default` |
| `tab-group` | — | background | `--color-bg-surface-primary-default` |

### Layout

| Propiedad | CSS custom property | Valor |
|---|---|---|
| `padding-inline` (tab) | `--space-md` | 16px |
| `padding-block` (tab) | `--space-sm` | 12px |
| `gap` (icon · label) | `--space-xs` | 8px |
| Altura `indicator` | — | 2px |
| `focus-ring-width` | `--focus-ring-width` | 2px |

### Tipografía

| Elemento | Estilo | font-size | font-weight | line-height |
|---|---|---|---|---|
| `label` default | `body/md-regular` | 14px | 400 | 20px |
| `label` active | `body/md-medium` | 14px | 500 | 20px |

---

## HTML

```html
<div role="tablist" aria-label="Secciones de cuenta">
  <button role="tab" id="tab-1" aria-selected="true" aria-controls="panel-1" tabindex="0">
    Datos personales
  </button>
  <button role="tab" id="tab-2" aria-selected="false" aria-controls="panel-2" tabindex="-1">
    Seguridad
  </button>
</div>

<div role="tabpanel" id="panel-1" aria-labelledby="tab-1" tabindex="0">
  <!-- contenido del panel activo -->
</div>
<div role="tabpanel" id="panel-2" aria-labelledby="tab-2" hidden>
  <!-- contenido oculto -->
</div>
```

---

## ARIA

| Elemento | Tag · Role | Atributos requeridos |
|---|---|---|
| Tab list | `<div role="tablist">` | `aria-label="[nombre del grupo]"` |
| Tab activo | `<button role="tab">` | `aria-selected="true"` · `aria-controls="[panel-id]"` · `tabindex="0"` |
| Tab inactivo | `<button role="tab">` | `aria-selected="false"` · `aria-controls="[panel-id]"` · `tabindex="-1"` |
| Tab disabled | `<button role="tab">` | `aria-disabled="true"` · `tabindex="-1"` |
| Panel activo | `<div role="tabpanel">` | `id` · `aria-labelledby="[tab-id]"` · `tabindex="0"` |
| Panel oculto | `<div role="tabpanel">` | `hidden` |
| Iconos | `<svg>` | `aria-hidden="true"` |

---

## Teclado

| Tecla | Acción |
|---|---|
| `Tab` | Foco al tab activo |
| `→` · `↓` | Foco al siguiente tab (con wrap) |
| `←` · `↑` | Foco al tab anterior (con wrap) |
| `Home` | Foco al primer tab |
| `End` | Foco al último tab |
| `Enter` · `Space` | Activa el tab con foco |

Las Arrow Keys mueven el foco sin activar (modelo "manual activation"). `Enter` o `Space` confirman.

---

## Reglas

- Siempre exactamente un tab `active` — cero o más de uno es un error.
- Mínimo 2 tabs, máximo ~6 — más opciones, considerar patrón alternativo.
- Label obligatorio en cada tab — no usar solo iconos.
- No usar tabs para filtrar contenido dentro de la misma vista → `chips`.
- No usar tabs para navegar entre páginas → `link`.

---

## Accesibilidad

- **WCAG 1.3.1** — roles `tablist` / `tab` / `tabpanel` correctos para lectores de pantalla.
- **WCAG 2.1.1** — navegación completa por teclado con Arrow Keys + Enter/Space.
- **WCAG 2.4.7** — focus visible siempre en el tab con foco activo.
- **WCAG 1.4.3** — `color/text/primary-default` y `color/text/secondary-default` cumplen ≥ 4.5:1 sobre el fondo.
