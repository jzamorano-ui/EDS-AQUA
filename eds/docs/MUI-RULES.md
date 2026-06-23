# MUI v5 — la base madre: qué se puede cambiar, agregar y qué NO

> Referencia de los límites de MUI. Toda decisión de arquitectura se valida contra esto.
> Fuente: docs oficiales v5.18 (customization, theme-components, palette, css-theme-variables).

---

## La estructura del theme (las llaves de MUI)
`palette · typography · spacing · shape · shadows · breakpoints · zIndex · transitions · components`
(+ `cssVarPrefix` y `colorSchemes` con el API de CSS variables).

---

## 🔒 FIJO — lo que MUI EXIGE (no se quita ni se renombra)
Los componentes leen estas llaves por nombre. Si no están, **MUI las deriva** (siempre existen) o el componente rompe:
- **Palette — colores con nombre:** `primary · secondary · error · warning · info · success`, cada uno con `main` (+ `light/dark/contrastText` derivados).
- **Palette — neutros del sistema:** `text.{primary,secondary,disabled}` · `background.{default,paper}` · `action.{active,hover,selected,disabled,disabledBackground,focus,…}` · `divider` · `common.{black,white}` · `grey.{50…900}` · `mode`.
- **Typography:** los 13 variants estándar (`h1–h6, subtitle1/2, body1/2, button, caption, overline`) + `fontFamily`.
- **Estructura:** `shape.borderRadius` (número) · `spacing` (factor) · `shadows[0…24]` (25 exactos) · `breakpoints` · `zIndex`.
- **Slots de componente** (`root`, etc.) y los valores estándar de `variant` (`contained/outlined/text`) y `color`.

→ **No podemos renombrar `palette.primary.main` ni quitar `grey`** — los componentes dependen de eso.

---

## ✏️ CAMBIAR — valores (libertad total)
- **Cualquier valor** de palette, typography, spacing, shape, shadows.
- **Estilos de cualquier componente** vía `components.MuiX.styleOverrides` (cualquier slot, cualquier CSS, condicional con `ownerState` = props + estado interno).
- **Props por defecto** vía `components.MuiX.defaultProps`.

---

## ➕ AGREGAR — lo que SÍ podemos sumar
1. **Colores custom** (ej. `brand`): se definen en palette y se usan con `color="brand"`. Requiere `augmentColor` (o dar main/light/dark/contrastText) + augmentación TS (`ButtonPropsColorOverrides`, `Palette`, `PaletteOptions`). *(Validado: funciona en runtime.)*
2. **Llaves/grupos custom en palette** (augmentation: `status`, `fill`, `deco`, `border`, etc.) → accesibles por `theme.vars.palette.*` y **emitidas como CSS vars** `--eds-palette-*`.
3. **Variants de typography custom** (ej. `titleSm`) → con `variant="titleSm"` tras augmentación TS + `variantMapping`. *(Validado.)*
4. **Variants de componente custom** vía `components.MuiX.variants` — matchean por props (`{ props:{variant:'x'}, style:{…} }` o callback). Se pueden crear variantes nuevas propias.
5. **Llaves top-level custom** en el theme (ej. `theme.eds.space`) → accesibles por JS, **PERO NO se emiten como CSS vars** (solo palette/shadows/shape/zIndex/opacity sí).

---

## ❌ NO se puede
- **Quitar/renombrar** las llaves fijas (rompe componentes).
- **`var()`-chaining** como valor de palette → rompe los `*Channel` (alpha de MUI). Los valores van reales (hex).
- **Volver CSS vars** a spacing/radius/typography (solo color/shadows/shape/zIndex/opacity emiten vars) → esas escalas se consumen por JS/`sx`, o las emitimos nosotros aparte.
- **Dark mode** → fuera de alcance (decisión).

---

## Mecanismos de override (de menor a mayor alcance)
1. **`sx` prop** — una instancia, cualquier CSS, incluye slots anidados (`'& .MuiX-part'`) y state classes (`.Mui-disabled/.Mui-selected/.Mui-error`).
2. **`styled(Component)`** — un componente reutilizable con acceso a `theme`/`ownerState`.
3. **`theme.components.MuiX.styleOverrides`** — global, por **slot**, callback con `ownerState` (props + estado interno) + `theme`. *(Es donde vive nuestra capa de tratamiento.)*
4. **`theme.components.MuiX.variants`** — crea variantes nuevas que matchean por props (`{props:{variant:'x'}, style}` o callback). + augmentación TS.
5. **`theme.components.MuiX.defaultProps`** — cambia props por defecto (ej. density: `size:'small'` global).
6. **`GlobalStyles` / `CssBaseline`** — estilos base de elementos HTML.

## Cómo se consume (CSS variables)
- **`CssVarsProvider`** (extiende ThemeProvider) inyecta un stylesheet `:root` con las vars `--eds-*`.
- En `styled`/`sx`: **`theme.vars.palette.primary.main`** (devuelve `var(--eds-palette-primary-main)`).
- En CSS plano: **`var(--eds-palette-primary-main)`** directo.

## Componentes propios (más allá de MUI)
Con **`useThemeProps` + `styled('div',{name:'EdsX',slot:'root'})`** podemos crear **componentes nuevos que participan del theme** (sus propios `styleOverrides`/`variants`/`defaultProps`), igual que uno nativo. → Escalable a componentes que MUI no trae.

## Otros ejes disponibles
- **Breakpoints:** `xs 0 · sm 600 · md 900 · lg 1200 · xl 1536` — customizables (mapear a Aqua layout).
- **Density:** vía `defaultProps size:'small'` global.
- **contrastThreshold** (default 3:1) decide `contrastText` — damos explícito para AA.
- **augmentColor** deriva `light/dark/contrastText` de `main` (lo usamos para los custom).

## Cómo encaja nuestra arquitectura de 2 capas

| Capa nuestra | Dónde vive en MUI |
|---|---|
| **Primitivos** (ramps: slate, gray, coral…) | **Fuera del theme** — son nuestra fuente; alimentan los valores. MUI no los conoce (salvo `grey`, que exige). |
| **Semánticos** (action/primary/brand, text, surface, border, status…) | **ES el `palette` de MUI** + augmentation. Es lo que dev/diseño usan. |

**Conclusión clave:** el `palette` de MUI **es** nuestra capa semántica. Los primitivos viven en el build (no en el theme). `grey` es el único primitivo que MUI fuerza adentro → lo marcamos "interno". Así las capas quedan separadas y consistentes, **sin pelear con MUI**.
