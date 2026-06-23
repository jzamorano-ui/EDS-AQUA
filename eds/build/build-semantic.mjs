// build-semantic.mjs — emite la CAPA 1 (semánticos) como CSS vars en convención de
// producción: --{intent}--{role}--{intensity}[-state]. Valores resueltos a hex.
import { semantic } from '../src/semantic.mjs';
import { ramp, global } from '../src/primitives.mjs';
import { writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const EDS = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const out = [];
function walk(name, val) {
  if (typeof val === 'string') { out.push(`  ${name}: ${val};`); return; }
  const keys = Object.keys(val);
  const stateGroup = keys.includes('hover') || keys.includes('active');
  for (const [k, v] of Object.entries(val)) {
    if (stateGroup && k === 'default') walk(name, v);                 // default → sin sufijo
    else if (stateGroup && (k === 'hover' || k === 'active')) walk(`${name}-${k}`, v); // estado → -hover
    else walk(`${name}--${k}`, v);                                    // siguiente segmento → --seg
  }
}
for (const [intent, roles] of Object.entries(semantic)) walk(`--${intent}`, roles);

writeFileSync(resolve(EDS, 'eds-semantic.css'),
  `/* GENERADO — CAPA 1 semánticos (--{intent}--{role}--{intensity}[-state]). Convención de producción. */\n:root {\n${out.join('\n')}\n}\n`);

// validación: todo valor debe ser un hex de un primitivo
const primValues = new Set();
for (const steps of Object.values(ramp)) for (const h of Object.values(steps)) primValues.add(h.toUpperCase());
for (const h of Object.values(global)) primValues.add(h.toUpperCase());
let orphan = 0;
for (const line of out) { const h = line.match(/#[0-9A-Fa-f]{3,8}/); if (h && !primValues.has(h[0].toUpperCase())) { orphan++; console.log('  ⚠ no-primitivo:', line.trim()); } }

console.log(`✅ eds-semantic.css — ${out.length} tokens semánticos`);
console.log(`   ${Object.keys(semantic).length} grupos: ${Object.keys(semantic).join(' · ')}`);
console.log(orphan ? `   ❌ ${orphan} valores NO son primitivos` : `   ✅ todos resuelven a un primitivo (capa 0)`);
