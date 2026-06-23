import { palette, typography, scales, NS } from '../src/tokens.generated.mjs';
import { writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const EDS = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const P = `--${NS}-palette`;
const row = (k,v)=>`| \`${k}\` | \`${v}\` |`;
let md = `# TOKENS — sistema EDS (vista \`--${NS}-*\` que consume dev)\n\n> Generado de \`src/tokens.generated.mjs\`. Valores: single-source desde Aqua.\n\n`;

// --- ROL / INTENCIÓN (prop color=) ---
const INTENT = ['primary','secondary','brand','error','warning','info','success'];
md += `## 1. Rol / intención  (prop \`color=\`)\n\nCada intención: tonos MUI (\`main/light/dark/contrastText\`) + **estados** (\`hover/active/disabled\`) + \`subtle\`.\n\n| intención | main | light | dark | contrastText | hover | active | subtle |\n|---|---|---|---|---|---|---|---|\n`;
for(const s of INTENT){ const p=palette[s]; md += `| **${s}** | \`${p.main}\` | \`${p.light}\` | \`${p.dark}\` | \`${p.contrastText}\` | \`${p.hover||'—'}\` | \`${p.active||'—'}\` | \`${p.subtle||'—'}\` |\n`; }
md += `\n> CSS var: \`${P}-primary-main\`, \`${P}-brand-hover\`, etc. \`brand\` es color custom (\`color="brand"\`).\n`;

// --- SUPERFICIES & NEUTRALES ---
md += `\n## 2. Superficies & neutrales\n\n| token | valor |\n|---|---|\n`;
for(const k of ['primary','secondary','disabled','inverse','brand','brandStrong','icon']) md += row(`${P}-text-${k}`, palette.text[k])+'\n';
for(const k of ['default','paper','inverse']) md += row(`${P}-background-${k}`, palette.background[k])+'\n';
md += row(`${P}-divider`, palette.divider)+'\n';
for(const k of Object.keys(palette.grey)) md += row(`${P}-grey-${k}`, palette.grey[k])+'\n';
md += `\n_\`action\` = overlays de interacción de MUI (listas/menús/ripple): ${Object.keys(palette.action).map(k=>'`'+k+'`').join(' · ')}_\n`;

// --- AUGMENTATION POR ROL ---
md += `\n## 3. Augmentation por rol 🆓\n`;
const AUG = ['fill','deco','focus','link','border','icon','onInverse'];
for (const grp of AUG) {
  md += `\n### ${grp}\n\n| token | valor |\n|---|---|\n`;
  for (const k of Object.keys(palette[grp])) md += row(`${P}-${grp}-${k}`, palette[grp][k])+'\n';
}
md += `\n### status — multi-canal (feedback: alert/badge)\n\n| | bg | text | icon | border |\n|---|---|---|---|---|\n`;
for(const s of ['danger','info','success','warning']){ const o=palette.status[s]; md += `| ${s} | \`${o.bg}\` | \`${o.text||'—'}\` | \`${o.icon||'—'}\` | \`${o.border||'—'}\` |\n`; }

// --- escalas 🆓 ---
md += `\n## Escalas no-color 🆓 (CSS vars + theme.eds.*)\n\n`;
for(const [grp,obj] of Object.entries(scales)){ md += `**${grp}:** `+Object.entries(obj).map(([k,v])=>`\`--${NS}-${grp==='iconSize'?'icon-size':grp}-${k}\`=${v}`).join(' · ')+'\n\n'; }

// --- typography ---
const STD = ['h1','h2','h3','h4','h5','h6','subtitle1','subtitle2','body1','body2','button','caption','overline'];
const fmt = (t)=>`${t.fontSize} / ${t.fontWeight} / ${t.lineHeight}${t.textTransform?' · '+t.textTransform:''}`;
md += `## Typography — Noto Sans\n\n**fontFamily:** \`${typography.fontFamily}\`\n\n`;
md += `### 22 variants de la propuesta 🆓\n\n| variant | size / weight / lh |\n|---|---|\n`;
for(const k of Object.keys(typography)) if(k!=='fontFamily' && !STD.includes(k)) md += `| \`${k}\` | ${fmt(typography[k])} |\n`;
md += `\n### aliases estándar MUI 🔒\n\n| variant | size / weight / lh |\n|---|---|\n`;
for(const k of STD) if(typography[k]) md += `| \`${k}\` | ${fmt(typography[k])} |\n`;

writeFileSync(resolve(EDS,'docs/TOKENS.md'), md);
console.log(md);
