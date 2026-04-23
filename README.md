# Aqua Design System — v0.1.0 Piloto

Sistema de diseño para OPS. Pre-estable — validado internamente, en fase piloto UX.

---

## Estructura del repositorio

```
System_OK/
├── tokens/               Fuente de tokens (no consumir directo)
│   ├── primitives/       Valores base: colores, escalas, tipografía
│   ├── semantics/        Aliases con intención: surface, action, status...
│   └── responsive/       Configuración de breakpoints y grid
│
├── dist/                 Output compilado — esto es lo que consume dev
│   ├── tokens.css        CSS custom properties semánticos
│   ├── layout.css        Breakpoints y grid
│   ├── tokens.js         ES module para frameworks JS/TS
│   └── components/       CSS por componente (framework-agnostic)
│       ├── index.css     Importa todos los componentes
│       └── *.css         Un archivo por componente
│
├── docs/                 Documentación
│   ├── components/       Specs de los 13 componentes (Markdown)
│   └── governance/       Reglas del sistema, protocolo de auditoría
│
├── CHANGELOG.md          Historial de versiones
├── VERSION               Versión actual (0.1.0)
├── sd.config.mjs         Pipeline Style Dictionary (tokens → dist)
└── package.json          Dependencias del pipeline
```

---

## Cómo consumir

### Solo tokens

```css
/* En tu CSS global — ajusta la ruta relativa a tu proyecto */
@import '../aqua-ds/dist/tokens.css';
@import '../aqua-ds/dist/layout.css';
```

### Tokens + componentes

```css
@import '../aqua-ds/dist/tokens.css';
@import '../aqua-ds/dist/components/index.css';  /* todos */
```

O por componente (tree-shaking manual):

```css
@import '../aqua-ds/dist/components/button.css';
@import '../aqua-ds/dist/components/alert.css';
```

### JS / TypeScript

```js
import { colorBgSurfacePrimaryDefault } from '../aqua-ds/dist/tokens.js';
```

> La ruta `../aqua-ds/` asume que el repo está un nivel arriba de tu proyecto. Ajusta según tu estructura.

---

## Regenerar dist/

```bash
npm install
npm run build
```

---

## Componentes disponibles (v0.1.0)

| Componente | Variantes | CSS |
|---|---|---|
| alert | info · success · warning · danger | `components/alert.css` |
| badge | number · dot · 5 estados semánticos | `components/badge.css` |
| button | Primary/Secondary/Tertiary/Ghost · L/M/S · icon-only | `components/button.css` |
| checkbox | default · checked · indeterminate · disabled | `components/checkbox.css` |
| chips | default · selected · disabled | `components/chips.css` |
| link | sm · md · lg · inline · standalone | `components/link.css` |
| radio-button | default · checked · disabled · group | `components/radio-button.css` |
| spinner | sm · md · lg | `components/spinner.css` |
| tabs | default · active · disabled · con/sin icono | `components/tabs.css` |
| tag | neutro · con/sin icono | `components/tag.css` |
| text-field | default · focus · error · read-only · disabled | `components/text-field.css` |
| toggle | default · checked · disabled | `components/toggle.css` |
| tooltip | 9 posiciones | `components/tooltip.css` |

Specs completas en [docs/components/](docs/components/).

---

## Estado

| Criterio | Estado |
|---|---|
| DIM-C audit (sin HEX hardcoded) | 13/13 PASS |
| Tokens semánticos certificados | ✅ |
| Docs dev-ready (Props + Layout + Tipografía) | ✅ |
| Gobernanza y changelog operativos | ✅ |
| Validación con equipo consumidor real | Pendiente → requerido para v1.0.0 |

Ver [CHANGELOG.md](CHANGELOG.md) para los criterios de promoción a v1.0.0.
