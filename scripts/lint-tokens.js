#!/usr/bin/env node
/**
 * Aqua DS — Token Lint
 *
 * Escanea archivos de código en busca de violaciones del design system:
 *   1. Colores hardcodeados (hex, rgb, rgba, hsl)
 *   2. Referencias a tokens CSS que no existen en dist/tokens.css
 *
 * Uso:
 *   node scripts/lint-tokens.js [ruta]         # escanea ruta relativa o absoluta
 *   node scripts/lint-tokens.js src/           # escanea carpeta src/
 *   node scripts/lint-tokens.js                # escanea src/ por defecto
 *
 * Exit code: 0 = sin errores · 1 = violaciones encontradas
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { resolve, extname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = resolve(__dirname, '..');
const TOKENS_CSS = resolve(ROOT, 'dist/tokens.css');

// ── Extensiones a escanear ────────────────────────────────────────────────────

const SCAN_EXTENSIONS = new Set(['.css', '.scss', '.less', '.ts', '.tsx', '.js', '.jsx', '.vue', '.svelte']);

// ── Patrones de violación ─────────────────────────────────────────────────────

const PATTERNS = [
  {
    id: 'hardcoded-hex',
    label: 'Color hex hardcodeado',
    regex: /#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g,
    // Ignorar: IDs de URL (#anchor), comentarios con hash, valores primitivos conocidos
    filter: (match, line) => {
      // Permitir solo si no está dentro de un comentario o string de URL
      const beforeMatch = line.slice(0, line.indexOf(match));
      if (beforeMatch.includes('//') || beforeMatch.includes('/*')) return false;
      if (beforeMatch.includes('url(') || beforeMatch.includes('href=')) return false;
      return true;
    },
  },
  {
    id: 'hardcoded-rgb',
    label: 'Color rgb/rgba hardcodeado',
    regex: /\brgba?\(\s*\d+/g,
    filter: () => true,
  },
  {
    id: 'hardcoded-hsl',
    label: 'Color hsl/hsla hardcodeado',
    regex: /\bhsla?\(\s*\d+/g,
    filter: () => true,
  },
  {
    id: 'unknown-token',
    label: 'Token CSS desconocido (--color-* no declarado)',
    regex: /var\((--color-[a-z0-9-]+)\)/g,
    // Este patrón se valida contra el set de tokens conocidos — ver lógica abajo
    filter: () => true,
    checkAgainstTokens: true,
  },
];

// ── Leer tokens válidos desde dist/tokens.css ─────────────────────────────────

function loadValidTokens() {
  let css;
  try {
    css = readFileSync(TOKENS_CSS, 'utf8');
  } catch {
    console.error(`\n✗ No se encontró dist/tokens.css en: ${TOKENS_CSS}`);
    console.error('  Ejecuta el build primero: npm run build\n');
    process.exit(1);
  }

  const tokens = new Set();
  const tokenRegex = /^\s*(--[a-z][a-z0-9-]+)\s*:/gm;
  let m;
  while ((m = tokenRegex.exec(css)) !== null) {
    tokens.add(m[1]);
  }
  return tokens;
}

// ── Recorrer archivos ─────────────────────────────────────────────────────────

function walkDir(dir, files = []) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return files;
  }
  for (const entry of entries) {
    if (entry.startsWith('.') || entry === 'node_modules' || entry === 'dist') continue;
    const full = resolve(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      walkDir(full, files);
    } else if (SCAN_EXTENSIONS.has(extname(entry))) {
      files.push(full);
    }
  }
  return files;
}

// ── Analizar un archivo ───────────────────────────────────────────────────────

function lintFile(filePath, validTokens) {
  const content = readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const violations = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNum = i + 1;

    // Saltar líneas que son solo comentarios
    const trimmed = line.trim();
    if (trimmed.startsWith('//') || trimmed.startsWith('*') || trimmed.startsWith('/*')) continue;

    for (const pattern of PATTERNS) {
      pattern.regex.lastIndex = 0;
      let match;
      while ((match = pattern.regex.exec(line)) !== null) {
        const fullMatch = match[0];

        if (pattern.filter && !pattern.filter(fullMatch, line)) continue;

        if (pattern.checkAgainstTokens) {
          // Solo reportar si el token no existe en el set de tokens válidos
          const tokenName = match[1];
          if (validTokens.has(tokenName)) continue;
          violations.push({
            line: lineNum,
            col: match.index + 1,
            rule: pattern.id,
            label: pattern.label,
            excerpt: fullMatch,
            hint: `'${tokenName}' no existe en dist/tokens.css`,
          });
        } else {
          violations.push({
            line: lineNum,
            col: match.index + 1,
            rule: pattern.id,
            label: pattern.label,
            excerpt: fullMatch.trim().slice(0, 40),
            hint: 'Usar var(--color-*) del design system',
          });
        }
      }
    }
  }

  return violations;
}

// ── Formateo de salida ────────────────────────────────────────────────────────

const RESET  = '\x1b[0m';
const RED    = '\x1b[31m';
const YELLOW = '\x1b[33m';
const CYAN   = '\x1b[36m';
const BOLD   = '\x1b[1m';
const DIM    = '\x1b[2m';
const GREEN  = '\x1b[32m';

function fmt(filePath, violations, rootDir) {
  const rel = relative(rootDir, filePath);
  console.log(`\n${BOLD}${CYAN}${rel}${RESET}`);
  for (const v of violations) {
    const loc = `${DIM}${v.line}:${v.col}${RESET}`;
    const rule = `${DIM}[${v.rule}]${RESET}`;
    console.log(`  ${RED}✗${RESET} ${loc}  ${YELLOW}${v.excerpt}${RESET}  ${DIM}→ ${v.hint}${RESET}  ${rule}`);
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────

function main() {
  const argPath = process.argv[2];
  const targetDir = argPath ? resolve(process.cwd(), argPath) : resolve(ROOT, 'src');

  console.log(`\n${BOLD}Aqua DS — Token Lint${RESET}`);
  console.log(`${DIM}Tokens: ${TOKENS_CSS}${RESET}`);
  console.log(`${DIM}Escaneando: ${targetDir}${RESET}\n`);

  const validTokens = loadValidTokens();
  console.log(`${DIM}${validTokens.size} tokens válidos cargados${RESET}`);

  const files = walkDir(targetDir);
  if (files.length === 0) {
    console.log(`\n${YELLOW}No se encontraron archivos para escanear en: ${targetDir}${RESET}`);
    console.log(`${DIM}Usa: node scripts/lint-tokens.js <ruta>${RESET}\n`);
    process.exit(0);
  }

  let totalViolations = 0;
  let filesWithViolations = 0;

  for (const file of files) {
    const violations = lintFile(file, validTokens);
    if (violations.length > 0) {
      fmt(file, violations, ROOT);
      totalViolations += violations.length;
      filesWithViolations++;
    }
  }

  // ── Resumen ───────────────────────────────────────────────────────────────

  console.log('\n' + '─'.repeat(60));

  if (totalViolations === 0) {
    console.log(`\n${GREEN}${BOLD}✓ Sin violaciones — ${files.length} archivos escaneados${RESET}\n`);
    process.exit(0);
  } else {
    const plural = totalViolations === 1 ? 'violación' : 'violaciones';
    console.log(`\n${RED}${BOLD}✗ ${totalViolations} ${plural} en ${filesWithViolations}/${files.length} archivos${RESET}\n`);
    process.exit(1);
  }
}

main();
