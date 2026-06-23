// validate.mjs — harness: render headless de componentes MUI con el theme EDS.
// Gate: 0 referencias rotas (excluyendo artefactos de dark-mode, que no usamos).
import { createRequire } from 'module';
import { themeOptions } from '../src/theme-config.mjs';
const require = createRequire(import.meta.url);
const React = require('react');
const { renderToString } = require('react-dom/server');
const createCache = require('@emotion/cache').default;
const createEmotionServer = require('@emotion/server/create-instance').default;
const { CacheProvider } = require('@emotion/react');
const { Experimental_CssVarsProvider: CssVarsProvider, experimental_extendTheme: extendTheme } = require('@mui/material/styles');
const h = React.createElement;
const C = (n) => require(`@mui/material/${n}`).default;

const theme = extendTheme(themeOptions); // mismas opciones que index.mjs

// DEFINIDAS = root + light scheme
const defined = new Set();
const add = (o) => { for (const k of Object.keys(o || {})) defined.add(k); };
add(theme.generateCssVars().css);
add(theme.generateCssVars('light').css);

// render de 9 componentes representativos
const cache = createCache({ key: 'css' });
const srv = createEmotionServer(cache);
const html = renderToString(h(CacheProvider, { value: cache }, h(CssVarsProvider, { theme },
  h(C('Button'), { variant: 'contained', color: 'primary' }, 'P'),
  h(C('Button'), { variant: 'outlined', color: 'secondary' }, 'S'),
  h(C('Alert'), { severity: 'error' }, 'E'),
  h(C('Alert'), { severity: 'success' }, 'OK'),
  h(C('TextField'), { label: 'L', defaultValue: 'x' }),
  h(C('Chip'), { label: 'C', color: 'primary' }),
  h(C('Switch'), { defaultChecked: true }),
  h(C('Checkbox'), { defaultChecked: true }),
  h(C('Paper'), { elevation: 2 }, 'card'),
)));
const cssOut = srv.extractCriticalToChunks(html).styles.map((s) => s.css).join('\n');
const referenced = [...new Set((cssOut.match(/--eds-[a-z0-9-]+/gi) || []))];

// dark-mode features que NO usamos (sin dark scheme resuelven a vacío, inofensivo)
const DARKMODE = /^--eds-(overlays-|palette-AppBar-dark)/;
const broken = referenced.filter((r) => !defined.has(r) && !DARKMODE.test(r));
const darkOnly = referenced.filter((r) => !defined.has(r) && DARKMODE.test(r));

const aug = [...defined].filter((k) => /palette-(brand|fill|deco|status|focus|link)/.test(k));
console.log('vars DEFINIDAS:', defined.size, '· refs por componentes:', referenced.length);
console.log('augmentation emitida:', aug.length, 'vars (brand/fill/deco/status/focus/link)');
console.log('namespaces:', [...new Set([...defined].map((k) => k.replace(/^--eds-/, '').split('-')[0]))].sort().join(', '));
console.log('');
console.log(broken.length ? `❌ ${broken.length} REFERENCIAS ROTAS:\n  ${broken.join('\n  ')}`
                          : '✅ 0 referencias rotas (light-mode)');
console.log(`(${darkOnly.length} refs de dark-mode ignoradas — sin dark scheme, inofensivas)`);
process.exit(broken.length ? 1 : 0);
