// semantic.mjs — CAPA 1: semánticos. Vocabulario {intent}-{role}-{intensity}[-state].
// Referencia los PRIMITIVOS (capa 0) y resuelve a hex en build. Es lo que se USA.
// Convención de salida (como producción): --{intent}--{role}--{intensity}[-state]
import { ramp, global } from './primitives.mjs';

const W = global.white;

// intent → ramp + estados del fill sólido [default, hover, active]
// (derivados de la propuesta: primary/brand respetan sus estados; el resto, regla coherente)
export const INTENT = {
  primary:   { r:'slate',  fill:[800,700,900] }, // navy — hover aclara (ya es oscuro)
  secondary: { r:'aqua',   fill:[600,700,800] }, // teal
  brand:     { r:'red',    fill:[500,600,700] }, // coral — hover oscurece
  success:   { r:'green',  fill:[600,700,800] },
  warning:   { r:'yellow', fill:[600,700,800] },
  error:     { r:'red',    fill:[700,800,900] },
  info:      { r:'blue',   fill:[600,700,800] },
};

const at = (r, s) => ramp[r][s];
const st = (r, [d,h,a]) => ({ default:at(r,d), hover:at(r,h), active:at(r,a) });

export const semantic = {};
for (const [intent, { r, fill }] of Object.entries(INTENT)) {
  semantic[intent] = {
    background: {
      light:  st(r, [100,200,300]),  // tint suave (chips, hovers, banners)
      medium: st(r, fill),           // fill sólido (botón)
    },
    foreground: {
      medium: st(r, fill),           // el color como texto/ícono
      strong: at(r, 900),            // máximo contraste
    },
    border: {
      light:  at(r, 200),
      medium: st(r, fill),
    },
    on: W,                            // texto/ícono sobre el fill sólido (contraste)
  };
}

// neutral — el workhorse de superficies y texto (más niveles)
semantic.neutral = {
  background: { light: ramp.gray[50], medium: ramp.gray[100], strong: ramp.gray[800] },
  foreground: { light: ramp.gray[500], medium: ramp.gray[700], strong: ramp.gray[900] }, // 500=secundario, 700=cuerpo, 900=fuerte
  border:     { light: ramp.gray[200], medium: ramp.gray[300], strong: ramp.gray[400] },
  surface:    { default: global.white, subtle: ramp.slate[50], inverse: ramp.slate[900] },
};

// disabled — global (cualquier elemento)
semantic.disabled = { background: ramp.gray[50], foreground: ramp.gray[300], border: ramp.gray[200] };

// focus ring (de la propuesta)
semantic.focus = { ring: ramp.blue[500], gap: ramp.blue[50], inverse: W };
