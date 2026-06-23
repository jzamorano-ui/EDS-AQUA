// theme-config.mjs — opciones del theme, PURAS (sin import de MUI).
// Las consumen index.mjs (app, vía extendTheme ESM) y el harness (Node, vía require).
import { NS, palette, typography, scales, shadows } from './tokens.generated.mjs';
import { components } from './components.mjs';

export { NS, scales };

export const themeOptions = {
  cssVarPrefix: NS,                                       // --eds-*
  shape: { borderRadius: parseInt(scales.radius.sm, 10) }, // 8
  spacing: 8,
  shadows,
  typography,
  colorSchemes: { light: { palette } },                    // sin dark mode
  components,
};
