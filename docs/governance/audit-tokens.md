# Token Library Audit — Instrucción Operativa

> Leer este archivo completo antes de iniciar cualquier auditoría.
> Aplicar cada dominio en el orden definido. No saltar secciones.

---

## CONFIG

```yaml
FILE_ID:        ml3ScFhJNwgs6xZpKUKuok       # Figma file a auditar
DOC_PAGE:       41:106                         # Node ID de la página de documentación
COLLECTIONS:
  - Primitives
  - Semantics
  - Layout
MODES:
  Primitives:  [Default]
  Semantics:   [Default]                       # Dark mode: deuda técnica planificada
  Layout:      [mobile, tablet, desktop, desktop-lg]
TOKEN_FILES:
  primitives:  tokens/primitives/              # color.json, col.json, space.json, radius.json, type.json, elevation.json, icon-size.json, stroke.json
  semantics:   tokens/semantics/               # semantics-color.json, semantics-space.json, semantics-radius.json, semantics-type.json, semantics-elevation.json, semantics-icon-size.json, semantics-stroke.json
  responsive:  tokens/responsive/layout.json
FIGMA_SOURCE:  true                            # Figma es siempre fuente de verdad → los JSON se actualizan para reflejar Figma
SCOPE:         full                            # full | D1,D3,S1  (dominios específicos)
STRICT_MODE:   true                            # true → cualquier WARN en dominio Crítico escala a FAIL
```

> **FIGMA_SOURCE: true** — ante cualquier discrepancia Figma ↔ JSON, el JSON es el que se corrige.
> **STRICT_MODE: true** — aplica en producción y releases. `false` permite WARNs en exploración.

---

## Protocolo de ejecución

Antes de iniciar:
1. Leer CONFIG completo. Confirmar FILE_ID, DOC_PAGE y TOKEN_FILES activos.
2. Conectar a Figma vía MCP (`figma_execute`) y cargar todas las páginas.
3. Obtener todas las colecciones de variables (`getLocalVariableCollectionsAsync`).
4. Obtener todas las variables (`getLocalVariablesAsync`).
5. Leer los archivos JSON de TOKEN_FILES desde el sistema de archivos local.
6. **Publish gate:** verificar si hay cambios locales pendientes de publicar. Si los hay, registrar como hallazgo Info antes de continuar — la auditoría corre sobre el estado local, pero los consumidores ven el snapshot publicado.
7. Ejecutar dominios en orden: D1 → D2 → D3 → D4 → D5 → D6 → D7 → D8 → S1 → S2.
8. Registrar cada hallazgo con el formato definido en §Output al finalizar el dominio.
9. Al finalizar todos los dominios, emitir resumen de scoring global.

> No proponer correcciones durante la ejecución. Auditar completo primero, luego presentar hallazgos + acciones agrupadas por severidad.

---

## Clasificación de dominios

| Peso | Dominios | Razón |
|---|---|---|
| **Crítico** | D2, D3, D5, S1, S2 | Rompen la cadena token→código o desincronizan Figma de la implementación |
| **Medio** | D1, D4, D6 | Afectan mantenibilidad y escala sin bloquear implementación inmediata |
| **Bajo** | D7, D8 | Mejoran calidad y preparación futura; no bloquean entregas |

En `STRICT_MODE: true`, cualquier WARN en dominio **Crítico** escala a FAIL. Un FAIL en Crítico detiene el release.

---

## Dominios

---

### D1 — Arquitectura de colecciones
**Peso:** Medio

**Checks:**
- Existen exactamente las colecciones declaradas en CONFIG.COLLECTIONS (ni más ni menos).
- Cada colección tiene los modos declarados en CONFIG.MODES (nombres exactos, sin duplicados).
- No existen tokens semánticos alojados en Primitives ni primitivos en Semantics.
- Las colecciones usan `hiddenFromPublishing: false` si son parte de la librería publicada.

**PASS:** Todas las colecciones y modos coinciden con CONFIG.
**WARN:** Colección extra no declarada o modo con nombre distinto al esperado.
**FAIL:** Colección faltante, colección duplicada, o token en colección incorrecta.

---

### D2 — Naming convention ❗ Crítico
**Peso:** Crítico

**Patrón obligatorio:**

| Colección | Patrón | Ejemplo |
|---|---|---|
| Primitives — color | `color/{palette}/{step}` | `color/red/500` |
| Primitives — otros | `{category}/{step}` | `space/400`, `radius/md` |
| Semantics | `{category}/{role}/{context}/{variant}-{state}` | `color/bg/surface/primary-default` |
| Layout | `{category}/{subcategory}` | `breakpoint/xs`, `grid/base/columns` |

**Checks:**
- Todos los nombres en lowercase y kebab-case dentro de cada segmento.
- Separador de jerarquía: `/` (slash). Nunca `.`, `_` ni espacio.
- Ningún nombre contiene mayúsculas, guiones bajos o espacios.
- Semantics color: el sufijo de estado (`-default`, `-hover`, `-disabled`, `-active`) aplica **solo a tokens stateful** — aquellos que tienen hermanos de estado en el mismo grupo.
  - **Stateful** → lleva `/default`: `color/action/primary/default` (tiene hermanos hover/active/disabled).
  - **Stateless** → sin sufijo: `color/text/primary`, `color/icon/system/primary`, `color/border/default` (no tienen hermanos de estado).
  - Regla práctica: si el grupo solo tiene una variante de estado, el token es stateless → sin `-default`.
- El tipo de token (COLOR, FLOAT, STRING) corresponde a la categoría del nombre.
- Nota: tokens de escala (type, space, radius, icon/size, elevation) no requieren sufijo de estado.

**PASS:** 100% de variables cumplen el patrón.
**WARN:** 1–3 tokens con irregularidad menor (mayúscula aislada, segmento extra).
**FAIL:** Patrón diferente en ≥ 1 categoría entera, o naming inconsistente entre tokens del mismo grupo.

---

### D3 — Integridad de la cadena de alias ❗ Crítico
**Peso:** Crítico

**Reglas:**
- **Primitives:** valor literal (`COLOR`, `FLOAT`, `STRING`). Nunca `VARIABLE_ALIAS`.
- **Semantics / Layout:** `VARIABLE_ALIAS` apuntando directamente a un Primitive. **Máximo 2 niveles.**
- **Prohibido:** `Semantic → Semantic → Primitive` (cadena de 3 niveles).
- **Prohibido:** referencias circulares (`A → B → A`).
- **Prohibido:** dangling references (alias a variable eliminada o inexistente).

**Checks:**
- Recorrer cada variable semántica y de Layout; verificar que su alias resuelve en exactamente 1 salto a un Primitive.
- Detectar cualquier semantic que alias a otro semantic.
- Verificar que el `id` de destino del alias existe en la colección Primitives.
- En todos los modos activos, el alias debe estar definido (no nulo).

**PASS:** Cadena de 2 niveles en el 100% de tokens semánticos y de Layout.
**WARN:** — (no aplica; cualquier violación es FAIL en esta regla).
**FAIL:** Cualquier token semántico o de Layout con cadena > 2 niveles, circular o dangling.

---

### D4 — Cobertura de modos
**Peso:** Medio

> **Decisión de arquitectura — 2026-04-24:** El DS opera en modo único (light only). Dark mode no es parte del roadmap actual. No levantar hallazgos por ausencia de modos Light/Dark en Semantics.

**Checks:**
- Cada variable tiene un valor (o alias) definido en **todos** los modos de su colección.
- Si un token no varía por modo, el mismo alias aparece en todos los modos (no vacío, no null).
- No existen modos vacíos (modo definido en la colección pero sin valores en ninguna variable).
- Layout: verificar que cada modo (mobile, tablet, desktop, desktop-lg) tiene valores completos.

**PASS:** 100% de variables con cobertura completa en todos los modos declarados en CONFIG.
**WARN:** ≤ 5% de variables con valor nulo en algún modo (no afectan flujo principal).
**FAIL:** > 5% de variables incompletas, o algún modo completamente vacío.

---

### D5 — codeSyntax WEB ❗ Crítico
**Peso:** Crítico

**Checks:**
- **Presencia:** 100% de tokens semánticos tienen `codeSyntax.WEB` configurado.
- **Formato:** `--{category}-{subcategory}-{variant}-{state}` en kebab-case. Ejemplo: `--color-action-primary-default`.
- **Correspondencia 1:1 con nombre:** el codeSyntax es la versión kebab del nombre de la variable (reemplazando `/` por `-`). Ninguna divergencia. Aplicar la regla stateless/stateful de D2: tokens stateless no llevan `-default` en el nombre → tampoco en el codeSyntax.
- **Coherencia Style Dictionary:** el CSS var generado por Style Dictionary debe coincidir exactamente con el `codeSyntax.WEB` de Figma. Detectar cualquier divergencia nombre/valor/ausencia.
- Primitives: codeSyntax es opcional; si existe, sigue el mismo patrón.

**Script de verificación:**
```javascript
const vars = await figma.variables.getLocalVariablesAsync();
const colls = await figma.variables.getLocalVariableCollectionsAsync();
const collMap = Object.fromEntries(colls.map(c => [c.id, c]));
const semVars = vars.filter(v => collMap[v.variableCollectionId]?.name === 'Semantics');
const mismatches = semVars.filter(v => {
  const expected = '--' + v.name.replace(/\//g, '-');
  return v.codeSyntax?.WEB !== expected;
});
return { total: semVars.length, mismatches: mismatches.map(v => ({
  name: v.name, current: v.codeSyntax?.WEB, expected: '--' + v.name.replace(/\//g, '-')
})) };
```

**Script de corrección (si hay mismatches):**
```javascript
for (const v of mismatches) {
  v.setVariableCodeSyntax('WEB', '--' + v.name.replace(/\//g, '-'));
}
// CRÍTICO: v.codeSyntax = { WEB: '...' } falla SILENCIOSAMENTE (no tiene setter).
// Usar SIEMPRE: v.setVariableCodeSyntax('WEB', value)
```

**PASS:** 100% de semánticos con codeSyntax correcto y alineado a Style Dictionary.
**WARN:** ≤ 3 tokens con codeSyntax faltante o divergencia menor de formato.
**FAIL:** Divergencia Figma ↔ Style Dictionary en ≥ 1 token, o > 3 tokens sin codeSyntax.

---

### D6 — Sincronía documentación ↔ variable
**Peso:** Medio

**Checks:**
- Cada token semántico COLOR tiene exactamente una fila en la doc page (CONFIG.DOC_PAGE).
- El nombre del token en la fila coincide con el nombre de la variable.
- El primitive referenciado en la fila (nombre + hex) coincide con el alias real de la variable.
- No existen filas doc para tokens eliminados (registros obsoletos / fantasma).
- El color preview en la fila usa el hex correcto del primitive al que apunta.

**PASS:** Correspondencia 1:1 entre librería y doc page en el 100% de tokens semánticos COLOR.
**WARN:** ≤ 3 tokens sin fila doc o con primitive desactualizado.
**FAIL:** > 3 tokens sin documentar, o filas con datos incorrectos que inducen a error en implementación.

---

### D7 — WCAG / Contraste
**Peso:** Bajo

**Regla:** Evaluar combinaciones reales de tokens semánticos, nunca hex directo.

**Pares a evaluar:**
- `color/text/*/` sobre `color/bg/*/`
- `color/icon/*/` sobre `color/bg/*/`

**Umbrales:**

| Tipo | Umbral | Nivel |
|---|---|---|
| Texto normal (< 18pt / < 14pt bold) | ≥ 4.5:1 | AA |
| Texto grande (≥ 18pt / ≥ 14pt bold) | ≥ 3:1 | AA Large |
| Iconos / gráficos | ≥ 3:1 | AA-Graphics |
| Disabled | N/A | No aplica WCAG |

**Excepciones aprobadas (no levantar como hallazgo):**
- `color/text/brand-default` — válido exclusivamente para texto ≥ 18pt (AA-Large 2.87:1). Uso en texto normal prohibido por regla de sistema.
- `color/text/secondary-default` sobre superficies secondary/tertiary — ratio 4.41:1 aceptado como funcional. Restringir a texto ≥ 14pt bold o ≥ 18pt sobre esas superficies.

**Restricciones de uso (documentadas como regla de sistema, no como hallazgo):**
- `color/text/inverse-default` — prohibido sobre `color/bg/fill/inverse-subtle-default` (slate.200). En ese contexto, usar `color/text/primary-default`.

**Checks:**
- Resolver cada par de tokens a sus valores hex reales (a través de la cadena alias).
- Calcular contrast ratio con la fórmula WCAG 2.1 (no evaluar hex directo).
- Solo evaluar pares del mismo contexto: light-with-light, inverse-with-inverse.
- Marcar como N/A los tokens con `-disabled` en el nombre.

**PASS:** 100% de pares válidos cumplen su umbral (respetando excepciones aprobadas).
**WARN:** 1–2 pares en AA Large que no alcanzan AAA (aceptable si el uso es solo texto grande).
**FAIL:** Cualquier par texto/fondo o icono/fondo fuera de excepciones que no alcanza AA.

---

### D8 — Escalabilidad estructural
**Peso:** Bajo

**Checks:**
- Agregar un nuevo modo a una colección no requiere redefinir tokens manualmente (el patrón de alias lo absorbe).
- Agregar una nueva escala de primitivos (ej: `color/red/550`) no rompe semánticos existentes.
- El patrón de naming permite crecer en categorías (`spacing`, `radius`, `shadow`) sin colisión con nombres existentes.
- No existen nombres tan genéricos que bloqueen la adición de variantes futuras (ej: `color/red` sin step bloquea el namespace).

**PASS:** El sistema soporta adición de modos, escalas y categorías sin refactoring.
**WARN:** 1–2 tokens con nombre genérico o estructura que requeriría rename al escalar.
**FAIL:** El patrón de naming o la cadena de alias bloquea la adición de un modo o categoría nueva sin trabajo manual extenso.

---

### S1 — Sync: Primitivos ❗ Crítico
**Peso:** Crítico
**Fuente de verdad:** Figma (`getLocalVariablesAsync`, colección Primitives)
**Archivos target:** `tokens/primitives/*.json`

**Traducción de nombres Figma → JSON:**
- Figma `color/red/500` → JSON key path `Primitives.color.red.500`
- Figma `space/400` → JSON key path `Primitives.space.400`
- Figma `radius/md` → JSON key path `Primitives.radius.md`
- Valor en JSON: `$value` (hex para COLOR, número para FLOAT)
- Tipo en JSON: `$type` (`"color"`, `"dimension"`, `"number"`)

**Checks:**
1. **Figma → JSON (adiciones):** cada variable de Figma Primitives tiene entrada en el JSON correspondiente. Si falta → el JSON está desactualizado, crear la entrada.
2. **JSON → Figma (eliminaciones):** cada entrada del JSON tiene variable en Figma. Si falta en Figma → entrada obsoleta en JSON, eliminar.
3. **Valores:** `$value` del JSON coincide con el valor hex/numérico resuelto de la variable en Figma.
4. **Tipo:** `$type` del JSON corresponde al `resolvedType` de Figma (`COLOR→"color"`, `FLOAT→"dimension"` o `"number"`).
5. **Extensiones opcionales:** si el JSON tiene `extensions.oklch` u otras, no son obligatorias pero no deben contradecir el `$value`.

**Acción ante discrepancia:** actualizar el JSON para reflejar Figma. Nunca modificar Figma para que coincida con el JSON.

**PASS:** 100% de variables Figma representadas en JSON con valores y tipos correctos.
**WARN:** ≤ 3 discrepancias menores (entrada faltante o valor desactualizado en una categoría no activa).
**FAIL:** ≥ 1 variable activa en Figma sin entrada en JSON, o valor incorrecto en token usado en producción.

---

### S2 — Sync: Semánticos + Responsivo ❗ Crítico
**Peso:** Crítico
**Fuente de verdad:** Figma (`getLocalVariablesAsync`, colecciones Semantics + Layout)
**Archivos target:** `tokens/semantics/*.json` + `tokens/responsive/layout.json`

**Traducción de nombres Figma → JSON:**
- Figma semantic `color/bg/surface/primary-default` → JSON `Semantics.color.bg.surface.primary-default`
- Valor semántico en JSON: referencia `{Primitives.color.global.white}` (alias, no hex)
- Figma Layout `breakpoint/xs` → JSON `layout.breakpoint.xs`
- Valor de Layout: literal (`"0px"`, `576`, etc.) o alias si corresponde

**Traducción de alias Figma → referencia JSON:**
- Figma `VARIABLE_ALIAS` apuntando a `color/global/white` (Primitives) → JSON `{Primitives.color.global.white}`
- La ruta del alias en JSON usa puntos como separador: `{Primitives.{name_with_dots}}`
- Nombre Figma `color/red/500` → referencia JSON `{Primitives.color.red.500}`

**Checks:**
1. **Figma → JSON (adiciones):** cada variable semántica de Figma tiene entrada en el JSON correspondiente. Si falta → crear.
2. **JSON → Figma (eliminaciones):** cada entrada semántica del JSON tiene variable en Figma. Si falta en Figma → entrada obsoleta, eliminar.
3. **Alias match:** el alias target de Figma (`VARIABLE_ALIAS.name`) coincide con la referencia `{...}` en el `$value` del JSON.
4. **Layout — valores por modo:** los valores por modo en Figma (mobile/tablet/desktop/desktop-lg) coinciden con los literales en `layout.json`.
5. **$type:** `"color"` para tokens COLOR, `"dimension"` para FLOAT de espacio/radio/tamaño, `"number"` para FLOAT numérico puro.

**Acción ante discrepancia:** actualizar el JSON para reflejar Figma. Nunca modificar Figma para que coincida con el JSON.

**PASS:** 100% de variables Figma Semantics + Layout representadas en JSON con alias y tipos correctos.
**WARN:** ≤ 3 discrepancias menores (alias desactualizado o entrada faltante en categoría no activa).
**FAIL:** ≥ 1 alias semántico incorrecto en JSON, o variable activa en Figma sin entrada en JSON.

**Excepción aprobada — Type tokens (Option A):**
Figma almacena cada variante tipográfica como un FLOAT independiente (font-size únicamente). Los JSON de `tokens/semantics/semantics-type.json` y `tokens/primitives/type.json` usan un formato expandido con 4 sub-propiedades por variante (`size`, `lineHeight`, `letterSpacing`, `weight`) más compuestos. Esta estructura es documentación complementaria y no debe sincronizarse contra Figma variable por variable. No levantar hallazgos S2 por ausencia de correspondencia 1:1 en tokens de tipo.

---

## Scoring

### Por dominio

| Score | Criterio |
|---|---|
| ✅ PASS | Todos los checks del dominio superados |
| ⚠️ WARN | ≥ 80% de checks superados; hallazgos menores sin impacto estructural |
| ❌ FAIL | < 80% de checks superados, o violación en cualquier regla marcada como absoluta |

En `STRICT_MODE: true`: WARN en dominio Crítico → escala a FAIL.

### Global

```
Score: X / 10 dominios en PASS
Críticos (5): D2, D3, D5, S1, S2 → X/5 PASS
Medios   (3): D1, D4, D6         → X/3 PASS
Bajos    (2): D7, D8              → X/2 PASS
```

**Release gate** (STRICT_MODE: true):
- Críticos: 5/5 PASS obligatorio.
- Medios y Bajos: pueden tener WARNs si están documentados en backlog.

---

## Output por hallazgo

```
[{D|S}{n}-{seq}] {Critical | Major | Minor}
Dominio:  {nombre del dominio}
Token:    {nombre completo en Figma} — JSON: {ruta en JSON}
Hallazgo: {descripción exacta de qué falla y por qué}
Acción:   {corrección específica en el JSON o en Figma}
Estado:   Pending | In-progress | Resolved
```

**Severidades:**

| Severidad | Cuándo usar |
|---|---|
| **Critical** | Rompe la cadena token→código, impide implementación o release |
| **Major** | Inconsistencia estructural que acumula deuda técnica significativa |
| **Minor** | Mejora de calidad o preparación para escala, sin bloqueo inmediato |

---

## Resumen de auditoría (template de cierre)

```markdown
## Auditoría — {fecha}
**Scope:** {full | dominios específicos}
**STRICT_MODE:** {true | false}

### Score global: {X}/10

| Dominio | Peso | Resultado | Hallazgos |
|---|---|---|---|
| D1 — Colecciones    | Medio   | ✅/⚠️/❌ | {n} |
| D2 — Naming         | Crítico | ✅/⚠️/❌ | {n} |
| D3 — Alias chain    | Crítico | ✅/⚠️/❌ | {n} |
| D4 — Modos          | Medio   | ✅/⚠️/❌ | {n} |
| D5 — codeSyntax     | Crítico | ✅/⚠️/❌ | {n} |
| D6 — Docs sync      | Medio   | ✅/⚠️/❌ | {n} |
| D7 — WCAG           | Bajo    | ✅/⚠️/❌ | {n} |
| D8 — Escalabilidad  | Bajo    | ✅/⚠️/❌ | {n} |
| S1 — Sync Primitivos        | Crítico | ✅/⚠️/❌ | {n} |
| S2 — Sync Semánticos + Resp | Crítico | ✅/⚠️/❌ | {n} |

### Hallazgos por severidad
- Critical: {n}
- Major: {n}
- Minor: {n}

### Acción inmediata requerida
{Lista de Critical + Major con acción propuesta}

### Backlog
{Lista de Minor ordenada por impacto estimado}
```
