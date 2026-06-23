// primitives.mjs — CAPA 0: primitivos (valores crudos de Figma, base del sistema).
// INTERNOS — no se referencian directo. La capa semántica los consume.
// Fuente: OPS-Library-Aqua Tokens · colección Primitives (10 ramps × 10 pasos + escalas).

export const NS = 'eds';

// ── Color: 10 ramps × 10 pasos (50→900) ──
export const ramp = {
  slate:  { 50:'#F4F7F9',100:'#E2E9EE',200:'#BECDD8',300:'#9BB3C3',400:'#7A99AD',500:'#5B7F95',600:'#45667A',700:'#304D5F',800:'#1F3644',900:'#0F202B' }, // primary
  red:    { 50:'#FFF4F3',100:'#FFE5E3',200:'#FFC7C3',300:'#FFA7A3',400:'#FF8481',500:'#FF585C',600:'#D2353F',700:'#9B1020',800:'#720012',900:'#410006' }, // brand / error
  green:  { 50:'#F3F9F3',100:'#DBECDC',200:'#AED2B2',300:'#7EB986',400:'#519E5F',500:'#1E833A',600:'#006B27',700:'#00531D',800:'#003C12',900:'#002608' }, // success
  yellow: { 50:'#FCF6EF',100:'#FEECD8',200:'#FED9AF',300:'#FFC580',400:'#FCB150',500:'#F59E0B',600:'#BF7900',700:'#8B5700',800:'#5A3600',900:'#2E1900' }, // warning
  blue:   { 50:'#F3F7FF',100:'#D6E4FF',200:'#9EBEFB',300:'#6797F5',400:'#366FE5',500:'#0043CE',600:'#0036AF',700:'#002A90',800:'#001E73',900:'#001358' }, // info
  gray:   { 50:'#F7F7F7',100:'#E7E7E7',200:'#C9C9C9',300:'#ABABAB',400:'#8F8F8F',500:'#737373',600:'#5C5C5C',700:'#464646',800:'#313131',900:'#1E1E1E' }, // neutral (= MUI grey)
  // decorativos
  aqua:   { 50:'#F1F9F7',100:'#DBF0ED',200:'#B0DED8',300:'#81CCC3',400:'#50B8AE',500:'#00A499',600:'#008178',700:'#006059',800:'#00413C',900:'#002421' },
  pink:   { 50:'#FCEEF7',100:'#F8D3EB',200:'#EFAED8',300:'#E189C2',400:'#D265AC',500:'#C44197',600:'#A02C77',700:'#781C58',800:'#51103A',900:'#2C071F' },
  purple: { 50:'#F8F5FF',100:'#ECE4FF',200:'#D6C1FF',300:'#C19DFF',400:'#AD78FB',500:'#9753ED',600:'#7B38C9',700:'#5F20A1',800:'#430D77',900:'#2A0050' },
  sky:    { 50:'#EDF4FD',100:'#D1E3FA',200:'#A5C8F3',300:'#79AAE7',400:'#5692DC',500:'#3077CF',600:'#235DA4',700:'#18457C',800:'#0E2D53',900:'#06182D' },
};

export const global = {
  white:'#FFFFFF', black:'#000000', transparent:'#FFFFFF00', overlay:'#00000099',
  whiteAlpha8:'#FFFFFF14', whiteAlpha16:'#FFFFFF29',
};

// ── Type ──
export const type = {
  family: `'Noto Sans', system-ui, sans-serif`,
  weight: { regular:400, medium:500, bold:700 },
  size:   { 50:12, 100:14, 200:16, 300:18, 400:20, 500:24, 600:32, 700:40, 800:48, 900:64 },
  line:   { 50:16, 100:20, 200:24, 300:26, 400:28, 500:32, 600:40, 700:48, 800:64, 900:72 },
  letterSpacing: 0,
  paragraph: { lg:28, md:24, sm:20 },
};

// ── Escalas no-color (px) ──
export const space  = { none:0, 50:4, 100:8, 150:12, 200:16, 250:20, 300:24, 400:32, 500:40, 600:48, 700:56, 800:64, 900:72, 1000:80, 1100:96, 1200:320 };
export const radius = { 0:0, 50:4, 100:8, 150:12, 200:16, 300:24, 400:32, 500:40, full:999 };
export const stroke = { 0:0, 25:1, 50:2, 75:4 };
export const iconSize = { 200:16, 250:20, 300:24, 400:32, 500:40, 600:48, 700:56, 800:64 };
export const col = { 4:4, 8:8, 12:12 };

// ── Elevation (sombras) ──
export const shadow = {
  0:'none',
  1:'0px 2px 4px rgba(49,49,49,0.08)',
  2:'0px 4px 12px rgba(49,49,49,0.10)',
  3:'0px 8px 24px rgba(49,49,49,0.12)',
  4:'0px -4px 8px rgba(49,49,49,0.10)',
};
