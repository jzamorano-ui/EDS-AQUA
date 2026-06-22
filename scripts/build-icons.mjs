#!/usr/bin/env node
/**
 * build-icons.mjs — Aqua DS
 * Genera el set de íconos consumible por dev desde la librería Figma "Icons".
 *
 * Fuente de verdad: Figma. Descubre los componentes `source/{system,semantic,brand}/*`,
 * baja sus SVG por la REST API y los normaliza según la familia:
 *   - system   → mono, `currentColor` (espejo de context-color; dev aplica el color)
 *   - semantic → mono, `currentColor` (dev aplica el token de estado, p. ej. danger)
 *   - brand    → MULTICOLOR, se mantienen los colores tal cual (ilustraciones)
 *
 * Uso:   FIGMA_TOKEN=figd_xxx node scripts/build-icons.mjs
 *        (token: figma.com → Settings → Personal access tokens, scope file content read)
 *
 * Salida (src/icons/, staging → se pliega a dist/V.x.x.x/icons/ en el corte):
 *   svg/<familia>/<nombre>.svg   individuales, sin width/height
 *   icons.svg                    sprite con <symbol id="<familia>-<nombre>">
 *   index.json                   manifest agrupado por familia { viewBox, mono }
 *   README.md                    guía de consumo (no se sobrescribe si existe)
 *   _demo.html                   galería de validación (sprite inline), agrupada por familia
 */

import { writeFile, readFile, mkdir, rm } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const ICONS_FILE_KEY = 'zIbuWAvLhwTlwnVwbDgY5n'; // OPS-Library-Aqua Icons
const FAMILIES = ['system', 'semantic', 'brand'];
// system → currentColor · semantic → token de estado · brand → tokens de marca (2 colores)
const SEM_TOKEN = { danger: 'danger', alert: 'danger', warning: 'warning', success: 'success', info: 'info' };
// brand usa 3 colores, todos con token icon/brand → se bindean (themeable, no hardcode)
const BRAND_TOKEN = {
  '#FF585C': '--color-icon-brand-primary',
  '#FFC7C3': '--color-icon-brand-secondary',
  '#FFFFFF': '--color-icon-brand-contrast', // el blanco/knockout de las ilustraciones
};
const OUT = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'icons');

const TOKEN = process.env.FIGMA_TOKEN;
if (!TOKEN) {
  console.error('❌ Falta FIGMA_TOKEN. Uso: FIGMA_TOKEN=figd_xxx node scripts/build-icons.mjs');
  process.exit(1);
}

const api = (path) =>
  fetch(`https://api.figma.com/v1/${path}`, { headers: { 'X-Figma-Token': TOKEN } })
    .then(async (r) => {
      if (!r.ok) throw new Error(`Figma API ${r.status}: ${await r.text()}`);
      return r.json();
    });

/** Aplica el color según familia.
 *  system   → currentColor (keyword válido como atributo de presentación).
 *  semantic → style="fill:var(--token, #fallback)". Ojo: var() NO funciona en el
 *             atributo `fill="..."` — debe ir en un `style` (contexto CSS). El token
 *             manda (themeable); el hex queda solo como fallback si no hay tokens.
 *  brand    → multicolor propio, se mantiene. */
function colorize(inner, family, name) {
  if (family === 'system')
    return inner.replace(/(fill|stroke)="#[0-9a-fA-F]{3,8}"/g, '$1="currentColor"');
  if (family === 'semantic') {
    const tok = SEM_TOKEN[name] || 'danger';
    return inner.replace(/fill="(#[0-9a-fA-F]{3,8})"/g,
      (_, hex) => `style="fill:var(--color-icon-status-${tok}, ${hex})"`);
  }
  // brand: colores de marca → tokens icon/brand (themeable). Acepta hex y `white`. Desconocido se mantiene.
  return inner.replace(/fill="(#[0-9A-Fa-f]{3,8}|white)"/gi, (m, val) => {
    let key = val.toUpperCase();
    if (key === '#FFF' || key === 'WHITE') key = '#FFFFFF';
    const tok = BRAND_TOKEN[key];
    return tok ? `style="fill:var(${tok}, ${val})"` : m;
  });
}

/** Extrae viewBox + inner y aplica el color de la familia. */
function normalize(svg, family, name) {
  const viewBox = (svg.match(/viewBox="([^"]+)"/) || [])[1] || '0 0 24 24';
  let inner = svg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
  inner = colorize(inner, family, name).replace(/\s+/g, ' ').trim();
  return { viewBox, inner };
}

const main = async () => {
  console.log('· Descubriendo source/{system,semantic,brand}/* (traverse del documento) …');
  const { document } = await api(`files/${ICONS_FILE_KEY}`);
  const found = [];
  (function walk(n) {
    if (n.type === 'COMPONENT' && typeof n.name === 'string') {
      const seg = n.name.split('/');
      if (seg[0] === 'source' && FAMILIES.includes(seg[1])) {
        found.push({ family: seg[1], name: seg.slice(2).join('/'), nodeId: n.id });
      }
    }
    if (n.children) for (const c of n.children) walk(c);
  })(document);
  const icons = found
    .filter((v, i, a) => a.findIndex((x) => x.family === v.family && x.name === v.name) === i)
    .sort((a, b) => a.family.localeCompare(b.family) || a.name.localeCompare(b.name));
  const counts = FAMILIES.map((f) => `${f}: ${icons.filter((i) => i.family === f).length}`).join(' · ');
  console.log(`  ${icons.length} íconos (${counts}).`);
  if (!icons.length) { console.error('❌ 0 íconos — revisá el file key o los prefijos.'); process.exit(1); }

  console.log('· Pidiendo SVGs a la REST API …');
  const ids = icons.map((i) => i.nodeId).join(',');
  const { images } = await api(`images/${ICONS_FILE_KEY}?ids=${encodeURIComponent(ids)}&format=svg`);

  console.log('· Descargando y normalizando …');
  const built = [];
  for (const ic of icons) {
    const url = images[ic.nodeId];
    if (!url) { console.warn(`  ⚠ sin export: ${ic.family}/${ic.name}`); continue; }
    const raw = await fetch(url).then((r) => r.text());
    const { viewBox, inner } = normalize(raw, ic.family, ic.name);
    const color = ic.family === 'system' ? 'currentColor'
      : ic.family === 'semantic' ? 'token' : 'multicolor';
    built.push({ ...ic, color, viewBox, inner });
  }

  // limpiar y reescribir
  for (const f of FAMILIES) {
    await rm(resolve(OUT, 'svg', f), { recursive: true, force: true });
    await mkdir(resolve(OUT, 'svg', f), { recursive: true });
  }
  for (const b of built) {
    const svg = `<svg viewBox="${b.viewBox}" xmlns="http://www.w3.org/2000/svg">${b.inner}</svg>\n`;
    await writeFile(resolve(OUT, 'svg', b.family, `${b.name}.svg`), svg);
  }

  const symbols = built
    .map((b) => `<symbol id="${b.family}-${b.name}" viewBox="${b.viewBox}">${b.inner}</symbol>`)
    .join('\n');
  await writeFile(
    resolve(OUT, 'icons.svg'),
    `<svg xmlns="http://www.w3.org/2000/svg" style="display:none"><defs>\n${symbols}\n</defs></svg>\n`
  );

  // hash de contenido por ícono → permite detectar cambios (geometría o color)
  for (const b of built) b.hash = createHash('sha1').update(`${b.viewBox}|${b.inner}`).digest('hex').slice(0, 8);

  // diff contra la corrida anterior (index.json es la memoria, versionada en git)
  let prev = {};
  try { prev = JSON.parse(await readFile(resolve(OUT, 'index.json'), 'utf8')); } catch { /* primera corrida */ }
  const prevFlat = {};
  for (const f of Object.keys(prev)) for (const n of Object.keys(prev[f] || {})) prevFlat[`${f}/${n}`] = prev[f][n];
  const nowFlat = {};
  for (const b of built) nowFlat[`${b.family}/${b.name}`] = b;
  const added = Object.keys(nowFlat).filter((k) => !prevFlat[k]).sort();
  const removed = Object.keys(prevFlat).filter((k) => !nowFlat[k]).sort();
  const changed = Object.keys(nowFlat)
    .filter((k) => prevFlat[k] && prevFlat[k].hash && prevFlat[k].hash !== nowFlat[k].hash).sort();

  const manifest = {};
  for (const f of FAMILIES) {
    manifest[f] = {};
    for (const b of built.filter((x) => x.family === f)) manifest[f][b.name] = { viewBox: b.viewBox, color: b.color, hash: b.hash };
  }
  await writeFile(resolve(OUT, 'index.json'), JSON.stringify(manifest, null, 2) + '\n');

  // hoja de estilos del set: tamaños + color por defecto (themeable, sin hex)
  await writeFile(resolve(OUT, 'icons.css'), `/* Aqua DS — iconos
   Requiere dist/tokens.css cargado primero (define los --icon-size-* y --color-icon-*).

   system   → el SVG usa currentColor; el color por defecto lo da .icon (abajo).
   semantic → el SVG ya trae su color bindeado al token de estado (var(--color-icon-status-*)).
              No requiere clase: ya sale con su color y es themeable.
   brand    → multicolor propio; color/currentColor no aplica, solo tamaño. */

.icon { display: inline-flex; flex-shrink: 0; width: var(--icon-size-md); height: var(--icon-size-md); }
.icon--xs { width: var(--icon-size-xs); height: var(--icon-size-xs); }
.icon--sm { width: var(--icon-size-sm); height: var(--icon-size-sm); }
.icon--md { width: var(--icon-size-md); height: var(--icon-size-md); }
.icon--lg { width: var(--icon-size-lg); height: var(--icon-size-lg); }
.icon--xl { width: var(--icon-size-xl); height: var(--icon-size-xl); }

/* system: color por defecto (currentColor toma este valor) */
.icon { color: var(--color-icon-system-primary); }
.icon--secondary { color: var(--color-icon-system-secondary); }
.icon--disabled  { color: var(--color-icon-system-disabled); }
.icon--inverse   { color: var(--color-icon-system-inverse); }
`);

  // demo agrupado por familia
  const section = (f, label, hint) => {
    const items = built.filter((b) => b.family === f)
      .map((b) => `  <figure><svg class="i"><use href="#${b.family}-${b.name}"/></svg><figcaption>${b.name}</figcaption></figure>`)
      .join('\n');
    return `<h3>${label} <small>${hint}</small></h3>\n<div class="grid">\n${items}\n</div>`;
  };
  await writeFile(
    resolve(OUT, '_demo.html'),
    `<!doctype html><meta charset="utf-8"><title>Aqua DS — Iconos</title>
<style>:root{--color-icon-system-primary:#0F202B;--color-icon-status-danger:#9B1020;--color-icon-status-warning:#BF7900;--color-icon-status-success:#006B27;--color-icon-status-info:#0036AF;--color-icon-brand-primary:#FF585C;--color-icon-brand-secondary:#FFC7C3;--color-icon-brand-contrast:#FFFFFF}
body{font:13px system-ui;padding:32px;color:#0F202B}
h3{margin-top:32px}small{color:#6B7A85;font-weight:normal}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:16px}
figure{margin:0;display:flex;flex-direction:column;align-items:center;gap:8px;padding:12px;border:1px solid #eee;border-radius:8px}
.i{width:24px;height:24px;color:var(--color-icon-system-primary)}figcaption{color:#6B7A85;font-size:11px;text-align:center}</style>
<h2>Aqua DS — ${built.length} iconos</h2>
<p style="color:#6B7A85">Preview con tokens inline. system = currentColor · semantic = token de estado bindeado · brand = color propio.</p>
<svg xmlns="http://www.w3.org/2000/svg" style="display:none"><defs>
${symbols}
</defs></svg>
${section('system', 'System', 'currentColor — por defecto icon-system-primary (.icon)')}
${section('semantic', 'Semantic', 'color bindeado al token de estado — automático')}
${section('brand', 'Brand', 'multicolor — color propio')}\n`
  );

  console.log(`✅ ${built.length} íconos → ${OUT}`);
  console.log(`   svg/{${FAMILIES.join(',')}}/ · icons.svg · icons.css · index.json · _demo.html`);

  // reporte de novedades
  const fmt = (a) => (a.length ? a.join(', ') : '—');
  console.log('\n· Cambios desde la corrida anterior:');
  console.log(`  + Nuevos (${added.length}): ${fmt(added)}`);
  console.log(`  ~ Modificados (${changed.length}): ${fmt(changed)}`);
  console.log(`  - Eliminados (${removed.length}): ${fmt(removed)}`);
  if (!added.length && !changed.length && !removed.length) console.log('  (sin cambios — set idéntico al anterior)');
};

main().catch((e) => { console.error('❌', e.message); process.exit(1); });
