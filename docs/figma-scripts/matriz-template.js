/**
 * Matriz de Componentes — Template Figma Script
 * Aqua Design System · DS-Piloto
 *
 * Uso: pegar en Figma Console (plugin Desktop Bridge).
 * Para replicar a otro componente: editar los 3 bloques marcados con ── EDITAR ──
 */

// ── EDITAR 1: Datos del componente ────────────────────────────────────────────

const COMPONENT_NAME = 'Button';  // aparece en el título del frame

const ROWS = [
  // { type, variant, surface, bg, acc }
  // bg   → color de fondo de la celda de datos
  // acc  → color de la barra de acento lateral
  { type: 'System', variant: 'Primary',   surface: 'Default', bg: C.sysBg,  acc: C.accSys   },
  { type: 'System', variant: 'Primary',   surface: 'Inverse', bg: C.invBg,  acc: C.accSys   },
  { type: 'System', variant: 'Secondary', surface: 'Default', bg: C.sysBg,  acc: C.accSys   },
  { type: 'System', variant: 'Secondary', surface: 'Inverse', bg: C.invBg,  acc: C.accSys   },
  { type: 'System', variant: 'Tertiary',  surface: 'Default', bg: C.sysBg,  acc: C.accSys   },
  { type: 'System', variant: 'Tertiary',  surface: 'Inverse', bg: C.invBg,  acc: C.accSys   },
  { type: 'Brand',  variant: 'Primary',   surface: 'Default', bg: C.white,  acc: C.accBrand },
];

const STATES = ['Default', 'Hover', 'Focus', 'Disabled', 'Loading'];

// IDS[fila][columna] = ID del master component (mismo orden que ROWS × STATES)
const IDS = [
  ['557:1954', '557:2294', '557:2344', '557:2369', '557:1979'],          // Sys/Primary/Default
  ['557:1969', '557:2309', '557:2359', '557:2384', '557:1991'],          // Sys/Primary/Inverse
  ['557:1964', '557:2304', '557:2354', '557:2379', '557:1987'],          // Sys/Secondary/Default
  ['40002739:6819', '40002739:6826', '40002739:6840', '40002739:6847', '40002739:6854'], // Sys/Secondary/Inverse
  ['557:1974', '557:2314', '557:2364', '557:2389', '557:1995'],          // Sys/Tertiary/Default
  ['40002739:6860', '40002739:6867', '40002739:6881', '40002739:6888', '40002739:6895'], // Sys/Tertiary/Inverse
  ['40002689:3668', '40002689:3673', '40002689:3683', '40002689:3688', '40002689:3806'], // Brand/Primary/Default
];

// Posición en el canvas (ajustar según el frame destino)
const FRAME_X = 11305;
const FRAME_Y = 4439;

// ── CONSTANTES (no tocar salvo necesidad) ─────────────────────────────────────

const LABEL_W = 96;   // ancho columna de labels
const COL_W   = 180;  // ancho por columna de estado
const ROW_H   = 120;  // alto por fila de variante
const HDR_H   = 52;   // alto fila de headers de estado
const PAD     = 48;   // padding del body
const ARTBOARD_H = 112; // alto del header oscuro

const N_COLS  = STATES.length;
const N_ROWS  = ROWS.length;
const GRID_W  = LABEL_W + N_COLS * COL_W;
const FW      = PAD * 2 + GRID_W;

// ── PALETA (fija para todo el DS) ────────────────────────────────────────────

const C = {
  dark:     { r: .071, g: .094, b: .153 },  // artboard header / Inverse bg
  white:    { r: 1,    g: 1,    b: 1    },
  sysBg:    { r: .973, g: .976, b: .980 },  // fondo filas System/Default
  invBg:    { r: .071, g: .094, b: .153 },  // fondo filas Inverse
  labelBg:  { r: .949, g: .953, b: .957 },  // columna labels
  hdrBg:    { r: .957, g: .961, b: .965 },  // fila headers estado
  lineW:    { r: .878, g: .894, b: .914 },  // líneas internas
  lineS:    { r: .820, g: .839, b: .863 },  // líneas de grupo
  grayTxt:  { r: .616, g: .647, b: .694 },  // "estado" pequeño
  darkTxt:  { r: .110, g: .149, b: .216 },  // nombre estado / variante
  typeGray: { r: .424, g: .463, b: .525 },  // "System" / "Inverse"
  hdrSub:   { r: .624, g: .651, b: .698 },  // subtítulo header
  accSys:   { r: .259, g: .416, b: .682 },  // barra acento System (azul)
  accBrand: { r: .859, g: .267, b: .220 },  // barra acento Brand (rojo)
};

// ── HELPERS ───────────────────────────────────────────────────────────────────

function bAll(n, col, w = 1) {
  n.strokes = [{ type: 'SOLID', color: col }];
  n.strokeWeight = w; n.strokeAlign = 'INSIDE';
}
function bRight(n, col, w = 1) {
  n.strokes = [{ type: 'SOLID', color: col }];
  n.strokeWeight = w;
  n.strokeTopWeight = 0; n.strokeRightWeight = w;
  n.strokeBottomWeight = 0; n.strokeLeftWeight = 0;
  n.strokeAlign = 'INSIDE';
}
function bBottom(n, col, w = 1) {
  n.strokes = [{ type: 'SOLID', color: col }];
  n.strokeWeight = w;
  n.strokeTopWeight = 0; n.strokeRightWeight = 0;
  n.strokeBottomWeight = w; n.strokeLeftWeight = 0;
  n.strokeAlign = 'INSIDE';
}
function mkT(chars, style, size, color, align = 'CENTER') {
  const n = figma.createText();
  n.fontName = { family: 'Inter', style };
  n.characters = chars; n.fontSize = size;
  n.fills = [{ type: 'SOLID', color }];
  n.textAlignHorizontal = align;
  return n;
}

// ── BUILD ─────────────────────────────────────────────────────────────────────

async function buildMatrix() {
  const page = figma.currentPage;

  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
  await figma.loadFontAsync({ family: 'Inter', style: 'Medium' });
  await figma.loadFontAsync({ family: 'Inter', style: 'Semi Bold' });

  // Limpia frame anterior si existe
  const old = page.findOne(n => n.name === `${COMPONENT_NAME} — Matriz` && n.type === 'FRAME');
  if (old) old.remove();

  // OUTER FRAME
  const frame = figma.createFrame();
  frame.name = `${COMPONENT_NAME} — Matriz`;
  frame.layoutMode = 'VERTICAL'; frame.itemSpacing = 0;
  frame.paddingTop = frame.paddingBottom = frame.paddingLeft = frame.paddingRight = 0;
  frame.primaryAxisSizingMode = 'AUTO'; frame.counterAxisSizingMode = 'FIXED';
  frame.resize(FW, 100);
  frame.fills = [{ type: 'SOLID', color: C.white }]; frame.clipsContent = false;
  frame.x = FRAME_X; frame.y = FRAME_Y;
  page.appendChild(frame);

  // HEADER
  const artH = figma.createFrame();
  artH.name = '_header'; artH.layoutMode = 'VERTICAL'; artH.itemSpacing = 4;
  artH.paddingTop = 20; artH.paddingBottom = 20; artH.paddingLeft = PAD; artH.paddingRight = PAD;
  artH.primaryAxisAlignItems = 'MIN'; artH.counterAxisAlignItems = 'MIN';
  artH.primaryAxisSizingMode = 'FIXED'; artH.counterAxisSizingMode = 'FIXED';
  artH.resize(FW, ARTBOARD_H); artH.fills = [{ type: 'SOLID', color: C.dark }];
  frame.appendChild(artH); artH.layoutSizingHorizontal = 'FILL'; artH.layoutSizingVertical = 'FIXED';
  const sub = mkT('Aqua Design System', 'Regular', 11, C.hdrSub, 'LEFT'); artH.appendChild(sub); sub.layoutSizingHorizontal = 'FILL';
  const tit = mkT(`${COMPONENT_NAME} / Matriz`, 'Semi Bold', 28, C.white, 'LEFT'); artH.appendChild(tit); tit.layoutSizingHorizontal = 'FILL';

  // BODY
  const body = figma.createFrame();
  body.name = '_body'; body.layoutMode = 'VERTICAL'; body.itemSpacing = 0;
  body.paddingTop = body.paddingBottom = body.paddingLeft = body.paddingRight = PAD;
  body.primaryAxisSizingMode = 'AUTO'; body.counterAxisSizingMode = 'FIXED';
  body.resize(FW, 100); body.fills = [{ type: 'SOLID', color: C.white }];
  frame.appendChild(body); body.layoutSizingHorizontal = 'FILL'; body.layoutSizingVertical = 'HUG';

  // GRID
  const grid = figma.createFrame();
  grid.name = '_grid'; grid.layoutMode = 'VERTICAL'; grid.itemSpacing = 0;
  grid.paddingTop = grid.paddingBottom = grid.paddingLeft = grid.paddingRight = 0;
  grid.primaryAxisSizingMode = 'AUTO'; grid.counterAxisSizingMode = 'AUTO';
  grid.fills = []; bAll(grid, C.lineS, 1);
  body.appendChild(grid); grid.layoutSizingHorizontal = 'HUG'; grid.layoutSizingVertical = 'HUG';

  // STATE HEADER ROW
  const hdrRow = figma.createFrame();
  hdrRow.name = '_col-headers'; hdrRow.layoutMode = 'HORIZONTAL'; hdrRow.itemSpacing = 0;
  hdrRow.paddingTop = hdrRow.paddingBottom = hdrRow.paddingLeft = hdrRow.paddingRight = 0;
  hdrRow.primaryAxisSizingMode = 'AUTO'; hdrRow.counterAxisSizingMode = 'FIXED';
  hdrRow.resize(100, HDR_H); hdrRow.fills = []; bBottom(hdrRow, C.lineS, 1);
  grid.appendChild(hdrRow); hdrRow.layoutSizingHorizontal = 'HUG'; hdrRow.layoutSizingVertical = 'FIXED';

  const corner = figma.createFrame();
  corner.name = '_corner'; corner.layoutMode = 'NONE'; corner.resize(LABEL_W, HDR_H);
  corner.fills = [{ type: 'SOLID', color: C.labelBg }];
  hdrRow.appendChild(corner); corner.layoutSizingHorizontal = 'FIXED'; corner.layoutSizingVertical = 'FIXED';

  for (let i = 0; i < N_COLS; i++) {
    const sc = figma.createFrame();
    sc.name = `_col-${STATES[i]}`; sc.layoutMode = 'VERTICAL'; sc.itemSpacing = 2;
    sc.paddingTop = 11; sc.paddingBottom = 0; sc.paddingLeft = 0; sc.paddingRight = 0;
    sc.primaryAxisAlignItems = 'MIN'; sc.counterAxisAlignItems = 'CENTER';
    sc.primaryAxisSizingMode = 'FIXED'; sc.counterAxisSizingMode = 'FIXED';
    sc.resize(COL_W, HDR_H); sc.fills = [{ type: 'SOLID', color: C.hdrBg }];
    if (i < N_COLS - 1) bRight(sc, C.lineW, 1);
    hdrRow.appendChild(sc); sc.layoutSizingHorizontal = 'FIXED'; sc.layoutSizingVertical = 'FIXED';
    const l = mkT('estado', 'Regular', 10, C.grayTxt); sc.appendChild(l); l.layoutSizingHorizontal = 'FILL';
    const nm = mkT(STATES[i], 'Medium', 13, C.darkTxt); sc.appendChild(nm); nm.layoutSizingHorizontal = 'FILL';
  }

  // DATA ROWS
  for (let r = 0; r < N_ROWS; r++) {
    const isDefault  = ROWS[r].surface === 'Default';
    const showType   = r === 0 || ROWS[r].type !== ROWS[r - 1].type;
    const isBoundary = r % 2 === 1; // línea fuerte después de fila Inverse (1,3,5,...)

    const row = figma.createFrame();
    row.name = `_row-${r}`; row.layoutMode = 'HORIZONTAL'; row.itemSpacing = 0;
    row.paddingTop = row.paddingBottom = row.paddingLeft = row.paddingRight = 0;
    row.primaryAxisSizingMode = 'AUTO'; row.counterAxisSizingMode = 'FIXED';
    row.resize(100, ROW_H); row.fills = [];
    if (r < N_ROWS - 1) bBottom(row, isBoundary ? C.lineS : C.lineW, 1);
    grid.appendChild(row); row.layoutSizingHorizontal = 'HUG'; row.layoutSizingVertical = 'FIXED';

    // Label cell
    const lc = figma.createFrame();
    lc.name = `_label-${r}`; lc.layoutMode = 'HORIZONTAL'; lc.itemSpacing = 0;
    lc.paddingTop = lc.paddingBottom = lc.paddingLeft = lc.paddingRight = 0;
    lc.primaryAxisAlignItems = 'MIN'; lc.counterAxisAlignItems = 'CENTER';
    lc.primaryAxisSizingMode = 'FIXED'; lc.counterAxisSizingMode = 'FIXED';
    lc.resize(LABEL_W, ROW_H); lc.fills = [{ type: 'SOLID', color: C.labelBg }];
    bRight(lc, C.lineS, 1);
    row.appendChild(lc); lc.layoutSizingHorizontal = 'FIXED'; lc.layoutSizingVertical = 'FIXED';

    const acc = figma.createRectangle();
    acc.name = '_acc'; acc.resize(3, ROW_H);
    acc.fills = [{ type: 'SOLID', color: ROWS[r].acc }];
    lc.appendChild(acc); acc.layoutSizingHorizontal = 'FIXED'; acc.layoutSizingVertical = 'FILL';

    const ta = figma.createFrame();
    ta.name = '_text'; ta.layoutMode = 'VERTICAL'; ta.itemSpacing = 2;
    ta.paddingLeft = 6; ta.paddingRight = 6; ta.paddingTop = ta.paddingBottom = 0;
    ta.primaryAxisAlignItems = 'CENTER'; ta.counterAxisAlignItems = 'CENTER';
    ta.primaryAxisSizingMode = 'FIXED'; ta.counterAxisSizingMode = 'FIXED';
    ta.resize(LABEL_W - 3, ROW_H); ta.fills = [];
    lc.appendChild(ta); ta.layoutSizingHorizontal = 'FILL'; ta.layoutSizingVertical = 'FILL';

    if (isDefault) {
      if (showType) { const tt = mkT(ROWS[r].type, 'Regular', 10, C.typeGray); ta.appendChild(tt); tt.layoutSizingHorizontal = 'FILL'; }
      const vt = mkT(ROWS[r].variant, 'Medium', 13, C.darkTxt); ta.appendChild(vt); vt.layoutSizingHorizontal = 'FILL';
    } else {
      const it = mkT('Inverse', 'Regular', 10, C.typeGray); ta.appendChild(it); it.layoutSizingHorizontal = 'FILL';
    }

    // Data cells — instancias se auto-centran (VERTICAL AL con CENTER)
    for (let c = 0; c < N_COLS; c++) {
      const cell = figma.createFrame();
      cell.name = `_cell-${r}-${c}`; cell.layoutMode = 'VERTICAL';
      cell.primaryAxisAlignItems = 'CENTER'; cell.counterAxisAlignItems = 'CENTER';
      cell.primaryAxisSizingMode = 'FIXED'; cell.counterAxisSizingMode = 'FIXED';
      cell.resize(COL_W, ROW_H); cell.fills = [{ type: 'SOLID', color: ROWS[r].bg }];
      if (c < N_COLS - 1) bRight(cell, C.lineW, 1);
      row.appendChild(cell); cell.layoutSizingHorizontal = 'FIXED'; cell.layoutSizingVertical = 'FIXED';
    }
  }

  // INSTANCIAS
  for (let r = 0; r < N_ROWS; r++) {
    for (let c = 0; c < N_COLS; c++) {
      if (!IDS[r] || !IDS[r][c]) continue;
      const cell = frame.findOne(n => n.name === `_cell-${r}-${c}`);
      if (!cell) continue;
      const master = await figma.getNodeByIdAsync(IDS[r][c]);
      if (!master || master.type !== 'COMPONENT') continue;
      const inst = master.createInstance();
      cell.appendChild(inst);
      inst.layoutSizingHorizontal = 'FIXED';
      inst.layoutSizingVertical = 'FIXED';
    }
  }

  return { id: frame.id, width: FW, rows: N_ROWS, cols: N_COLS };
}

buildMatrix();
