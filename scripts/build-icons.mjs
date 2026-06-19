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

import { writeFile, mkdir, rm } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ICONS_FILE_KEY = 'zIbuWAvLhwTlwnVwbDgY5n'; // OPS-Library-Aqua Icons
const FAMILIES = ['system', 'semantic', 'brand'];
const MONO = new Set(['system', 'semantic']); // estas van a currentColor; brand mantiene color
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

/** Extrae viewBox + inner; si mono, color horneado → currentColor; si no, mantiene colores. */
function normalize(svg, mono) {
  const viewBox = (svg.match(/viewBox="([^"]+)"/) || [])[1] || '0 0 24 24';
  let inner = svg
    .replace(/^[\s\S]*?<svg[^>]*>/, '')
    .replace(/<\/svg>\s*$/, '');
  if (mono) inner = inner.replace(/(fill|stroke)="#[0-9a-fA-F]{3,8}"/g, '$1="currentColor"');
  inner = inner.replace(/\s+/g, ' ').trim();
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
    const mono = MONO.has(ic.family);
    const { viewBox, inner } = normalize(raw, mono);
    built.push({ ...ic, mono, viewBox, inner });
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

  const manifest = {};
  for (const f of FAMILIES) {
    manifest[f] = {};
    for (const b of built.filter((x) => x.family === f)) manifest[f][b.name] = { viewBox: b.viewBox, mono: b.mono };
  }
  await writeFile(resolve(OUT, 'index.json'), JSON.stringify(manifest, null, 2) + '\n');

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
<style>body{font:13px system-ui;padding:32px;color:#0F202B}
h3{margin-top:32px}small{color:#6B7A85;font-weight:normal}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:16px}
figure{margin:0;display:flex;flex-direction:column;align-items:center;gap:8px;padding:12px;border:1px solid #eee;border-radius:8px}
.i{width:24px;height:24px;color:#0F202B}figcaption{color:#6B7A85;font-size:11px;text-align:center}
.sem .i{color:#9B1020}</style>
<h2>Aqua DS — ${built.length} iconos</h2>
<svg xmlns="http://www.w3.org/2000/svg" style="display:none"><defs>
${symbols}
</defs></svg>
${section('system', 'System', 'currentColor — color via CSS')}
<div class="sem">${section('semantic', 'Semantic', 'currentColor — pintar con el token de estado')}</div>
${section('brand', 'Brand', 'multicolor — color propio')}\n`
  );

  console.log(`✅ ${built.length} íconos → ${OUT}`);
  console.log(`   svg/{${FAMILIES.join(',')}}/ · icons.svg · index.json · _demo.html`);
};

main().catch((e) => { console.error('❌', e.message); process.exit(1); });
