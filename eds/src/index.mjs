// index.mjs — entrada del paquete @eds/mui. Para apps con bundler (Vite/Next/webpack).
import { experimental_extendTheme as extendTheme } from '@mui/material/styles';
import { themeOptions, NS, scales } from './theme-config.mjs';

export { NS, scales };
export const buildTheme = () => extendTheme(themeOptions);
export const theme = buildTheme();
