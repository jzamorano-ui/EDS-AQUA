#!/usr/bin/env node
/**
 * build.mjs — EDS theme generator (Fase B)
 *
 * Single-source: LEE los valores de Aqua (dist/V.0.2.0/tokens.css) y los mapea a la
 * estructura de MUI (ver docs/MAPPING.md). Los ramps neutros (gray/slate) son primitives
 * que no se exportan a tokens.css → van como constantes (valores exactos de Figma).
 *
 * Emite:
 *   src/tokens.generated.mjs   palette + typography + scales + shadows (config plano)
 *   ../eds-scales.css          :root con las escalas no-color (--eds-*)
 *
 * No se tipean valores de color dos veces: Aqua es la fuente.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const EDS = resolve(ROOT, 'eds');
const NS = 'eds'; // ← nombre centralizado (rename futuro = esta línea)

// ---------- 1) leer valores de Aqua ----------
const css = readFileSync(resolve(ROOT, 'dist/V.0.2.0/tokens.css'), 'utf8');
const A = {};
for (const m of css.matchAll(/^\s*(--[a-z0-9-]+)\s*:\s*([^;]+);/gm)) {
  const name = m[1], val = m[2].trim();
  if (val.startsWith('#')) A[name] = val.toLowerCase();          // hex (ignora override oklch)
  else if (!(name in A)) A[name] = val.replace(/\s*\/\*.*$/, ''); // escalas/elevation (1ª aparición)
}
const c = (n) => { if (!A['--color-' + n]) throw new Error('falta --color-' + n); return A['--color-' + n]; };
const px = (n) => parseInt(A['--' + n], 10);

// ramps primitivos (no están en tokens.css) — valores exactos de Figma
const GRAY  = { 50:'#f7f7f7',100:'#e7e7e7',200:'#c9c9c9',300:'#ababab',400:'#8f8f8f',500:'#737373',600:'#5c5c5c',700:'#464646',800:'#313131',900:'#1e1e1e' };

// ---------- 2) palette — arquitectura por ROL (rol · tratamiento · estado) ----------
const palette = {
  // ═══ ROL / INTENCIÓN (prop color=) — cada uno: tonos MUI + estados + subtle ═══
  primary:   { main:c('action-primary-default'), light:c('action-primary-hover'), dark:c('action-primary-active'), contrastText:c('text-inverse'),
               hover:c('action-primary-hover'), active:c('action-primary-active'), disabled:c('action-primary-disabled'), subtle:c('action-tertiary-hover') },   // system (navy)
  secondary: { main:c('action-secondary-default'), light:c('action-tertiary-hover'), dark:c('action-secondary-active'), contrastText:c('text-primary'),
               hover:c('action-secondary-hover'), active:c('action-secondary-active'), disabled:c('action-primary-disabled'), subtle:c('action-tertiary-hover') }, // system secundario (slate)
  brand:     { main:c('action-brand-primary-default'), light:c('icon-brand-secondary'), dark:c('action-brand-primary-active'), contrastText:c('text-inverse'),
               hover:c('action-brand-primary-hover'), active:c('action-brand-primary-active'), disabled:c('action-primary-disabled'),
               subtle:c('bg-fill-brand-subtle'), subtleHover:c('action-brand-secondary-hover'), subtleActive:c('action-brand-secondary-active') },                // marca (coral) — color custom
  error:   { main:c('icon-status-danger'),  light:c('bg-status-danger'),  dark:c('text-status-danger'),  contrastText:'#ffffff', subtle:c('bg-status-danger') },
  warning: { main:c('icon-status-warning'), light:c('bg-status-warning'), dark:c('text-status-warning'), contrastText:'#ffffff', subtle:c('bg-status-warning') },
  info:    { main:c('icon-status-info'),    light:c('bg-status-info'),    dark:c('text-status-info'),    contrastText:'#ffffff', subtle:c('bg-status-info') },
  success: { main:c('icon-status-success'), light:c('bg-status-success'), dark:c('text-status-success'), contrastText:'#ffffff', subtle:c('bg-status-success') },

  // ═══ SUPERFICIES & NEUTRALES ═══
  text: { primary:c('text-primary'), secondary:c('text-secondary'), disabled:c('text-disabled'), inverse:c('text-inverse'),
          brand:c('text-brand'), brandStrong:c('text-brand-strong'), icon:c('icon-system-primary') },
  background: { default:c('bg-surface-subtle'), paper:c('bg-surface-default'), inverse:c('bg-surface-inverse') },
  divider: c('border-divider-default'),
  common: { black:c('bg-surface-inverse'), white:'#ffffff' },
  grey: GRAY,
  action: { active:c('icon-system-primary'), hover:c('action-tertiary-hover'), selected:c('action-tertiary-active'),
            disabled:c('text-disabled'), disabledBackground:c('action-primary-disabled'), focus:c('focus-ring-gap-default') }, // overlays de interacción de MUI (listas/menús/ripple) — distinto del concepto Aqua "action"

  // ═══ AUGMENTATION POR ROL ═══
  fill: { neutralSubtle:c('bg-fill-neutral-subtle'), neutralMedium:c('bg-fill-neutral-medium'), neutralStrong:c('bg-fill-neutral-strong'),
          inverseSubtle:c('bg-fill-inverse-subtle'), inverseMedium:c('bg-fill-inverse-medium'), inverseStrong:c('bg-fill-inverse-strong'),
          brandSubtle:c('bg-fill-brand-subtle'), brandMedium:c('bg-fill-brand-medium'), brandStrong:c('bg-fill-brand-strong') },
  deco: { 1:c('bg-deco-1'),2:c('bg-deco-2'),3:c('bg-deco-3'),4:c('bg-deco-4'),5:c('bg-deco-5') },
  status: {  // multi-canal (para feedback: alert, badge…)
    danger:  { bg:c('bg-status-danger'),  text:c('text-status-danger'),  icon:c('icon-status-danger'),  border:c('border-status-danger') },
    info:    { bg:c('bg-status-info'),     text:c('text-status-info'),     icon:c('icon-status-info'),     border:c('border-status-info') },
    success: { bg:c('bg-status-success'),  text:c('text-status-success'),  icon:c('icon-status-success'),  border:c('border-status-success') },
    warning: { bg:c('bg-status-warning'),  text:c('text-status-warning'),  icon:c('icon-status-warning'),  border:c('border-status-warning') },
    neutral: { bg:c('bg-status-neutral') },
  },
  focus: { ring:c('focus-ring-default'), gap:c('focus-ring-gap-default'), inverse:c('focus-ring-inverse'), gapInverse:c('focus-ring-gap-inverse') },
  link: { default:c('text-link-default'), hover:c('text-link-hover'), active:c('text-link-active') },
  border: { default:c('border-default'), focus:c('border-focus'), dangerFocus:c('border-danger-focus'), disabled:c('border-disabled'),
            dividerDefault:c('border-divider-default'), dividerBrand:c('border-divider-brand'), dividerInverse:c('border-divider-inverse'), inverse:c('border-inverse'),
            statusDanger:c('border-status-danger'), statusInfo:c('border-status-info'), statusSuccess:c('border-status-success'), statusWarning:c('border-status-warning') },
  icon: { systemPrimary:c('icon-system-primary'), systemSecondary:c('icon-system-secondary'), systemDisabled:c('icon-system-disabled'), systemInverse:c('icon-system-inverse'),
          brandPrimary:c('icon-brand-primary'), brandSecondary:c('icon-brand-secondary'), brandStrong:c('icon-brand-strong'), brandContrast:c('icon-brand-contrast') },
  onInverse: { primary:c('action-primary-inverse-default'), primaryHover:c('action-primary-inverse-hover'), primaryActive:c('action-primary-inverse-active') }, // acciones sobre superficie oscura
};

// ---------- 3) typography — LOS 22 variants de la propuesta + aliases estándar MUI ----------
const FAMILY = `'Noto Sans', system-ui, sans-serif`;
const V = (v) => ({ fontFamily:FAMILY, fontSize:`${px('type-'+v+'-size')}px`, fontWeight:px('type-'+v+'-weight'), lineHeight:`${px('type-'+v+'-line-height')}px` });
const camel = (s) => s.split('-').map((w,i)=>i?w[0].toUpperCase()+w.slice(1):w).join('');
// descubrir TODOS los variants Aqua (body/title/headline/display/caption × pesos)
const allVariants = [...new Set([...css.matchAll(/--type-([a-z]+-[a-z0-9]+-[a-z]+)-size/g)].map(m=>m[1]))].sort();
const typography = { fontFamily: FAMILY };
// (a) los 22 como variants CUSTOM (naming nuestro camelCase) — nada se pierde
for (const v of allVariants) typography[camel(v)] = V(v);
// (b) aliases estándar de MUI (para que <Typography variant="h1"> y los componentes anden)
Object.assign(typography, {
  h1:V('display-xl-bold'), h2:V('headline-lg-bold'), h3:V('headline-md-bold'), h4:V('headline-sm-bold'),
  h5:V('title-lg-medium'), h6:V('title-md-medium'),
  subtitle1:V('title-sm-medium'),      // ← el 18px tiene casa estándar
  subtitle2:V('body-md-medium'),
  body1:V('body-lg-regular'), body2:V('body-md-regular'),
  button:{ ...V('body-md-medium'), textTransform:'none' },
  caption:V('caption-sm-regular'),
  overline:{ ...V('caption-sm-medium'), textTransform:'uppercase' },
});

// ---------- 4) escalas no-color ----------
const scales = {
  space:   { none:'0px','2xs':'4px',xs:'8px',sm:'12px',md:'16px',lg:'24px',xl:'32px','2xl':'48px','3xl':'64px' },
  radius:  { none:A['--radius-none'],xs:A['--radius-xs'],sm:A['--radius-sm'],md:A['--radius-md'],lg:A['--radius-lg'],xl:A['--radius-xl'],'2xl':A['--radius-2xl'],pill:A['--radius-pill'] },
  stroke:  { none:A['--stroke-none'],xs:A['--stroke-xs'],sm:A['--stroke-sm'],md:A['--stroke-md'],focusRing:A['--stroke-focus-ring-width'] },
  iconSize:{ xs:A['--icon-size-xs'],sm:A['--icon-size-sm'],md:A['--icon-size-md'],lg:A['--icon-size-lg'],xl:A['--icon-size-xl'],'2xl':A['--icon-size-2xl'],'3xl':A['--icon-size-3xl'],'4xl':A['--icon-size-4xl'] },
};

// ---------- 5) shadows[0..24] ← elevation ----------
const Esh = { none:A['--elevation-none'], sm:A['--elevation-sm'], md:A['--elevation-md'], lg:A['--elevation-lg'] };
const shadows = Array.from({length:25}, (_,i)=> i===0?'none' : i<=4?Esh.sm : i<=12?Esh.md : Esh.lg);

// ---------- 6) emitir ----------
const banner = `// GENERADO por eds/build/build.mjs — NO editar a mano. Valores: single-source desde Aqua.\n`;
writeFileSync(resolve(EDS,'src/tokens.generated.mjs'),
  banner + `export const NS = ${JSON.stringify(NS)};\n` +
  `export const palette = ${JSON.stringify(palette,null,2)};\n` +
  `export const typography = ${JSON.stringify(typography,null,2)};\n` +
  `export const scales = ${JSON.stringify(scales,null,2)};\n` +
  `export const shadows = ${JSON.stringify(shadows,null,2)};\n`);

// eds-scales.css (:root con escalas no-color)
const cssVars = [];
for (const [grp, obj] of Object.entries(scales))
  for (const [k,v] of Object.entries(obj)) cssVars.push(`  --${NS}-${grp==='iconSize'?'icon-size':grp}-${k}: ${v};`);
writeFileSync(resolve(EDS,'eds-scales.css'),
  `/* GENERADO por eds/build/build.mjs — escalas no-color como CSS vars (color = MUI palette). */\n:root {\n${cssVars.join('\n')}\n}\n`);

console.log('✅ generado:');
console.log('   src/tokens.generated.mjs · eds-scales.css');
console.log(`   palette: ${Object.keys(palette).length} grupos · typography: ${Object.keys(typography).length-1} variants · shadows: 25 · scales: ${Object.keys(scales).length}`);
