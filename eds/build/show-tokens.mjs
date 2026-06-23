import { palette, typography, scales, NS } from '../src/tokens.generated.mjs';
import { writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const EDS = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const P = `--${NS}-palette`;
const row = (k,v)=>`| \`${k}\` | \`${v}\` |`;
let md = `# TOKENS — sistema EDS (vista \`--${NS}-*\` que consume dev)\n\n> Generado de \`src/tokens.generated.mjs\`. Valores: single-source desde Aqua.\n\n`;

// --- palette: slots MUI 🔒 ---
const muiSlots = ['primary','secondary','error','warning','info','success'];
md += `## Palette — slots MUI 🔒\n\n| token | valor |\n|---|---|\n`;
for(const s of muiSlots) for(const k of ['main','light','dark','contrastText']) md += row(`${P}-${s}-${k}`, palette[s][k])+'\n';
for(const k of ['primary','secondary','disabled','icon']) md += row(`${P}-text-${k}`, palette.text[k])+'\n';
for(const k of ['default','paper']) md += row(`${P}-background-${k}`, palette.background[k])+'\n';
md += row(`${P}-divider`, palette.divider)+'\n';
for(const k of ['active','hover','selected','disabled','disabledBackground','focus']) md += row(`${P}-action-${k}`, palette.action[k])+'\n';
md += `\n### grey 🔒\n\n| token | valor |\n|---|---|\n`;
for(const k of Object.keys(palette.grey)) md += row(`${P}-grey-${k}`, palette.grey[k])+'\n';

// --- augmentation 🆓 ---
md += `\n## Augmentation 🆓 (naming nuestro)\n\n`;
md += `### estados por color\n\n| token | valor |\n|---|---|\n`;
for(const s of ['primary','secondary']) for(const k of ['hover','active','disabled']) if(palette[s][k]) md += row(`${P}-${s}-${k}`, palette[s][k])+'\n';
md += `\n### brand · fill · deco · focus · link\n\n| token | valor |\n|---|---|\n`;
for(const k of Object.keys(palette.brand)) md += row(`${P}-brand-${k}`, palette.brand[k])+'\n';
for(const k of Object.keys(palette.fill)) md += row(`${P}-fill-${k}`, palette.fill[k])+'\n';
for(const k of Object.keys(palette.deco)) md += row(`${P}-deco-${k}`, palette.deco[k])+'\n';
for(const k of Object.keys(palette.focus)) md += row(`${P}-focus-${k}`, palette.focus[k])+'\n';
for(const k of Object.keys(palette.link)) md += row(`${P}-link-${k}`, palette.link[k])+'\n';
md += `\n### status multi-canal\n\n| | bg | text | icon | border |\n|---|---|---|---|---|\n`;
for(const s of ['danger','info','success','warning']){ const o=palette.status[s]; md += `| ${s} | \`${o.bg}\` | \`${o.text||'—'}\` | \`${o.icon||'—'}\` | \`${o.border||'—'}\` |\n`; }

// --- escalas 🆓 ---
md += `\n## Escalas no-color 🆓 (CSS vars + theme.eds.*)\n\n`;
for(const [grp,obj] of Object.entries(scales)){ md += `**${grp}:** `+Object.entries(obj).map(([k,v])=>`\`--${NS}-${grp==='iconSize'?'icon-size':grp}-${k}\`=${v}`).join(' · ')+'\n\n'; }

// --- typography 🔒 ---
md += `## Typography 🔒\n\n| variant | size / weight / line-height |\n|---|---|\n`;
md += `| fontFamily | ${typography.fontFamily} |\n`;
for(const v of ['h1','h2','h3','h4','h5','h6','body1','body2','button','caption']){ const t=typography[v]; md += `| ${v} | ${t.fontSize} / ${t.fontWeight} / ${t.lineHeight}${t.textTransform?' · '+t.textTransform:''} |\n`; }

writeFileSync(resolve(EDS,'docs/TOKENS.md'), md);
console.log(md);
