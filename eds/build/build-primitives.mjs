// build-primitives.mjs — emite la CAPA 0 como CSS vars `--eds-ref-*` (INTERNAS).
// El sistema NO depende de estas vars (la semántica resuelve los primitivos en build);
// se emiten solo para referencia/inspección. NO usar `--eds-ref-*` directo en producto.
import { ramp, global, type, space, radius, stroke, iconSize, col, shadow, NS } from '../src/primitives.mjs';
import { writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const EDS = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const R = `--${NS}-ref`;
const lines = [];
const push = (k, v) => lines.push(`  ${k}: ${v};`);

lines.push('/* color ramps */');
for (const [fam, steps] of Object.entries(ramp)) for (const [s, hex] of Object.entries(steps)) push(`${R}-${fam}-${s}`, hex);
for (const [k, v] of Object.entries(global)) push(`${R}-global-${k.replace(/([A-Z0-9]+)/g,'-$1').toLowerCase()}`, v);
lines.push('  /* type */');
push(`${R}-font-family`, type.family);
for (const [k, v] of Object.entries(type.weight)) push(`${R}-font-weight-${k}`, v);
for (const [k, v] of Object.entries(type.size)) push(`${R}-font-size-${k}`, `${v}px`);
for (const [k, v] of Object.entries(type.line)) push(`${R}-line-${k}`, `${v}px`);
lines.push('  /* escalas */');
for (const [k, v] of Object.entries(space)) push(`${R}-space-${k}`, `${v}px`);
for (const [k, v] of Object.entries(radius)) push(`${R}-radius-${k}`, `${v}px`);
for (const [k, v] of Object.entries(stroke)) push(`${R}-stroke-${k}`, `${v}px`);
for (const [k, v] of Object.entries(iconSize)) push(`${R}-icon-size-${k}`, `${v}px`);
for (const [k, v] of Object.entries(col)) push(`${R}-col-${k}`, v);
for (const [k, v] of Object.entries(shadow)) push(`${R}-shadow-${k}`, v);

writeFileSync(resolve(EDS, 'eds-primitives.css'),
  `/* GENERADO — CAPA 0 primitivos (--eds-ref-*). INTERNOS: no usar directo en producto. */\n:root {\n${lines.join('\n')}\n}\n`);

const colorN = Object.values(ramp).reduce((a, s) => a + Object.keys(s).length, 0);
console.log(`✅ eds-primitives.css generado`);
console.log(`   color: ${colorN} (${Object.keys(ramp).length} ramps × pasos) + global ${Object.keys(global).length}`);
console.log(`   type: ${Object.keys(type.size).length} sizes · ${Object.keys(type.line).length} lines · ${Object.keys(type.weight).length} weights`);
console.log(`   space ${Object.keys(space).length} · radius ${Object.keys(radius).length} · stroke ${Object.keys(stroke).length} · iconSize ${Object.keys(iconSize).length} · shadow ${Object.keys(shadow).length}`);
console.log(`   total CSS vars: ${lines.filter(l=>l.includes('--eds-ref')).length}`);
