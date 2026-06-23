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

// ---------- 2) palette (MUI 🔒 + augmentation 🆓) ----------
const palette = {
  primary:   { main:c('action-primary-default'), light:c('action-primary-hover'), dark:c('action-primary-active'), contrastText:c('text-inverse'),
               hover:c('action-primary-hover'), active:c('action-primary-active'), disabled:c('action-primary-disabled') },
  secondary: { main:c('action-brand-primary-default'), light:c('icon-brand-secondary'), dark:c('action-brand-primary-active'), contrastText:c('text-inverse'),
               hover:c('action-brand-primary-hover'), active:c('action-brand-primary-active') },
  error:   { main:c('icon-status-danger'),  light:c('bg-status-danger'),  dark:c('text-status-danger'),  contrastText:'#ffffff' },
  warning: { main:c('icon-status-warning'), light:c('bg-status-warning'), dark:c('text-status-warning'), contrastText:'#ffffff' },
  info:    { main:c('icon-status-info'),    light:c('bg-status-info'),    dark:c('text-status-info'),    contrastText:'#ffffff' },
  success: { main:c('icon-status-success'), light:c('bg-status-success'), dark:c('text-status-success'), contrastText:'#ffffff' },
  text: { primary:c('text-primary'), secondary:c('text-secondary'), disabled:c('text-disabled'), icon:c('icon-system-primary') },
  background: { default:c('bg-surface-subtle'), paper:c('bg-surface-default') },
  divider: c('border-divider-default'),
  common: { black:c('bg-surface-inverse'), white:'#ffffff' },
  action: { active:c('icon-system-primary'), hover:c('action-tertiary-hover'), selected:c('action-tertiary-active'),
            disabled:c('text-disabled'), disabledBackground:c('action-primary-disabled'), focus:c('focus-ring-gap-default') },
  grey: GRAY,
  // ── augmentation (naming nuestro) ──
  brand: { main:c('action-brand-primary-default'), hover:c('action-brand-primary-hover'), active:c('action-brand-primary-active'),
           subtle:c('bg-fill-brand-subtle'), strong:c('icon-brand-strong'), contrast:c('icon-brand-contrast') },
  fill: { neutralSubtle:c('bg-fill-neutral-subtle'), neutralMedium:c('bg-fill-neutral-medium'), neutralStrong:c('bg-fill-neutral-strong'),
          inverseSubtle:c('bg-fill-inverse-subtle'), inverseMedium:c('bg-fill-inverse-medium'), inverseStrong:c('bg-fill-inverse-strong'),
          brandSubtle:c('bg-fill-brand-subtle'), brandMedium:c('bg-fill-brand-medium'), brandStrong:c('bg-fill-brand-strong') },
  deco: { 1:c('bg-deco-1'),2:c('bg-deco-2'),3:c('bg-deco-3'),4:c('bg-deco-4'),5:c('bg-deco-5') },
  status: {
    danger:  { bg:c('bg-status-danger'),  text:c('text-status-danger'),  icon:c('icon-status-danger'),  border:c('border-status-danger') },
    info:    { bg:c('bg-status-info'),     text:c('text-status-info'),     icon:c('icon-status-info'),     border:c('border-status-info') },
    success: { bg:c('bg-status-success'),  text:c('text-status-success'),  icon:c('icon-status-success'),  border:c('border-status-success') },
    warning: { bg:c('bg-status-warning'),  text:c('text-status-warning'),  icon:c('icon-status-warning'),  border:c('border-status-warning') },
    neutral: { bg:c('bg-status-neutral') },
  },
  focus: { ring:c('focus-ring-default'), gap:c('focus-ring-gap-default'), inverse:c('focus-ring-inverse'), gapInverse:c('focus-ring-gap-inverse') },
  link: { default:c('text-link-default'), hover:c('text-link-hover'), active:c('text-link-active') },
};

// ---------- 3) typography (variants ← type scale de Aqua) ----------
const FAMILY = `'Noto Sans', system-ui, sans-serif`;
const T = (v) => ({ fontFamily:FAMILY, fontSize:`${px('type-'+v+'-size')}px`, fontWeight:px('type-'+v+'-weight'), lineHeight:`${px('type-'+v+'-line-height')}px` });
const typography = {
  fontFamily: FAMILY,
  h1:T('display-xl-bold'), h2:T('headline-lg-bold'), h3:T('headline-md-bold'), h4:T('headline-sm-bold'),
  h5:T('title-lg-medium'), h6:T('title-md-medium'),
  body1:T('body-lg-regular'), body2:T('body-md-regular'),
  button:{ ...T('body-md-medium'), textTransform:'none' },
  caption:T('caption-sm-regular'),
};

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
