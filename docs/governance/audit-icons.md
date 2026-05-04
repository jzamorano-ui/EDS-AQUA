# Icons Library Audit — Instrucción Operativa

> Leer este archivo completo antes de iniciar cualquier auditoría.
> Aplicar cada dominio en el orden definido. No saltar secciones.

---

## CONFIG

```yaml
FILE_ID:        zIbuWAvLhwTlwnVwbDgY5n        # OPS-Library-[Aqua] Icons
COLLECTIONS:
  - Icon/Context
MODES:
  Icon/Context: [default, inverse, brand, disabled, neutral]
SECTIONS_SOURCE:
  system:   938:6764   # _source/system   — iconos de sistema (mode-based)
  semantic: 938:6765   # _source/semantic — iconos semánticos (token directo)
  brand:    938:6766   # _source/brand    — iconos de marca (token directo)
VARIABLES:
  context-color:
    id:            "VariableID:40002056:1518"
    collection_id: "VariableCollectionId:40002056:1517"
    collection_key: "cada41d2441ac66946f6efb8af77f2c24e9be9cc"
LINKED_LIBRARIES:
  Tokens:
    name:           "OPS-Library-[Aqua] Tokens"
    file_key:       ml3ScFhJNwgs6xZpKUKuok
    semantics_coll_key: "82b667cada655a4698f3d29b1b303cb413212d3d"
ICON_CATEGORIES:
  system:   fills via Icon/Context modo + context-color (variable local)
  semantic: fills vía alias directo a Tokens Semantics (color/icon/semantic/*)
  brand:    fills vía alias directo a Tokens Semantics (color/icon/brand/*)
FIGMA_SOURCE:   true    # Figma es siempre fuente de verdad
STRICT_MODE:    true    # WARN en Crítico escala a FAIL
```

> **FIGMA_SOURCE: true** — la fuente de verdad es siempre el archivo Figma activo.
> **STRICT_MODE: true** — aplica en producción y releases. Un FAIL en Crítico detiene el release.

---

## Protocolo de ejecución

Antes de iniciar:
1. Leer CONFIG completo. Confirmar FILE_ID, SECTIONS_SOURCE y LINKED_LIBRARIES activos.
2. Conectar a Figma vía MCP (`figma_execute`) y cargar todas las páginas (`loadAllPagesAsync`).
3. Obtener colecciones locales (`getLocalVariableCollectionsAsync`).
4. Obtener variables locales (`getLocalVariablesAsync`).
5. Obtener colecciones de librería disponibles (`teamLibrary.getAvailableLibraryVariableCollectionsAsync`).
6. Ejecutar dominios en orden: D1 → D2 → D3 → D4 → D5 → D6 → D7 → D8.
7. Registrar cada hallazgo con el formato definido en §Output al finalizar el dominio.
8. Al finalizar todos los dominios, emitir resumen de scoring global + nivel de consistencia 0–10.

> No proponer correcciones durante la ejecución. Auditar completo primero, luego presentar hallazgos + acciones agrupadas por severidad.

---

## Clasificación de dominios

| Peso | Dominios | Razón |
|---|---|---|
| **Crítico** | D2, D3, D4, D5, D6 | Rompen la cadena de color o desincronizan el snapshot publicado |
| **Medio** | D1 | Afecta mantenibilidad sin bloquear implementación inmediata |
| **Bajo** | D7, D8 | Mejoran calidad y preparación futura; no bloquean entregas |

En `STRICT_MODE: true`, cualquier WARN en dominio **Crítico** escala a FAIL. Un FAIL en Crítico detiene el release.

---

## Dominios

---

### D1 — Arquitectura de colección `Icon/Context`
**Peso:** Medio

**Checks:**
- Existe exactamente una colección llamada `Icon/Context` (ni más ni menos).
- La colección tiene exactamente 5 modos: `default`, `inverse`, `brand`, `disabled`, `neutral` — con esos nombres exactos.
  - `neutral` → alias a `color/icon/system/secondary` (Tokens Semantics). Usado para íconos en contextos de menor énfasis.
- No existen modos duplicados ni modos con nombres alternativos (`danger`, `on-dark`, `light`, etc.).
- La colección tiene `hiddenFromPublishing: false` (debe ser accesible a consumidores).
- La colección contiene exactamente una variable: `icon/system/context-color`.
- No existen colecciones locales adicionales no declaradas en CONFIG.

**Verificación:**
```javascript
const colls = await figma.variables.getLocalVariableCollectionsAsync();
// Esperar: [{name: 'Icon/Context', hiddenFromPublishing: false, modes: ['default','inverse','brand','disabled','neutral']}]
```

**PASS:** Colección y modos coinciden exactamente con CONFIG.
**WARN:** Orden de modos distinto o `hiddenFromPublishing` en estado inesperado.
**FAIL:** Colección faltante, modo faltante, nombre de modo incorrecto, o colección duplicada.

---

### D2 — Naming convention de variables y componentes ❗ Crítico
**Peso:** Crítico

**Patrón obligatorio — variables:**

| Variable | Patrón | Ejemplo |
|---|---|---|
| Variable de contexto | `icon/system/{role}` | `icon/system/context-color` |

**Patrón obligatorio — componentes source:**

| Categoría | Patrón | Ejemplo |
|---|---|---|
| System | `source/system/{nombre-kebab}` | `source/system/agregar` |
| Semantic | `source/semantic/{nombre-kebab}` | `source/semantic/info` |
| Brand | `source/brand/{nombre-kebab}` | `source/brand/logo` |

**Checks:**
- El nombre de la variable `icon/system/context-color` es exacto (lowercase, kebab-case, sin espacios).
- Todos los componentes en `_source/system` siguen el patrón `source/system/{nombre}`.
- Todos los componentes en `_source/semantic` siguen el patrón `source/semantic/{nombre}`.
- Todos los componentes en `_source/brand` siguen el patrón `source/brand/{nombre}`.
- Ningún nombre de componente contiene mayúsculas, guiones bajos, o espacios.
- Las secciones source se llaman exactamente `_source/system`, `_source/semantic`, `_source/brand`.

**PASS:** 100% de variables y componentes cumplen el patrón.
**WARN:** 1–3 componentes con irregularidad menor (mayúscula aislada, guión bajo).
**FAIL:** Patrón diferente en toda una categoría, o variable con nombre incorrecto.

---

### D3 — Integridad de bindings de fill ❗ Crítico
**Peso:** Crítico

**Reglas por categoría:**

| Categoría | Fill debe apuntar a | Tipo de binding |
|---|---|---|
| System | `icon/system/context-color` (LOCAL — `40002056:1518`) | `VARIABLE_ALIAS` local |
| Semantic | `color/icon/status/{estado}` (Tokens Semantics) | `VARIABLE_ALIAS` externo |
| Brand | `color/icon/brand/{variante}` (Tokens Semantics) | `VARIABLE_ALIAS` externo |

> **Naming:** la sección Figma se llama `_source/semantic` pero los tokens que consume son `color/icon/status/*` (status, no semantic). Estos tokens son stateless → sin sufijo `-default`.

**Prohibido — aplica a TODAS las categorías:**
- Fill con variable ID que contenga un file-key distinto al Tokens actual (`ml3ScFhJNwgs6xZpKUKuok`).
- Fill con `VARIABLE_ALIAS` apuntando a colección con ID que no existe en ninguna librería enlazada activa (referencia huérfana / dangling).
- Fill con valor hardcoded (hex directo) en lugar de variable.
- Fill vacío (`fills: []`) en un vector de icono.

**Verificación:**
```javascript
// Para system icons — todos los vectores deben tener:
boundVariables.fills[0].id === 'VariableID:40002056:1518'

// Buscar bindings externos problemáticos:
function walk(node) {
  const fills = node.boundVariables?.fills || [];
  for (const f of fills) {
    if (f?.id && !f.id.startsWith('VariableID:40002056')) {
      // Posible binding externo — verificar si es Tokens actual o huérfano
    }
  }
  if ('children' in node) node.children.forEach(walk);
}
```

**Excepción aprobada — Semantic icons:**
Los vectores de `_source/semantic` tienen bindings con variable keys propios de su arquitectura interna. No auditar contra el patrón de system icons ni modificar sin verificación visual previa. Confirmado correcto por el autor del DS (2026-04-24).

**PASS:** 100% de vectores system con `context-color` local; brand con variables `color/icon/brand/*` de Tokens; semantic según excepción aprobada.
**WARN:** 1–3 vectores con fill hardcoded o binding a versión anterior de Tokens (no huérfano).
**FAIL:** Cualquier vector system sin `context-color` local, binding huérfano en system/brand, o fill vacío.

---

### D4 — Integridad de modos explícitos en secciones source ❗ Crítico
**Peso:** Crítico

**Reglas:**
- La sección `_source/system` debe tener `explicitVariableModes` con `Icon/Context → default`.
- Las secciones `_source/semantic` y `_source/brand` pueden tener cualquier modo de `Icon/Context` o ninguno — no se requiere modo explícito ya que sus fills no dependen del modo.
- Ningún componente ni vector debe tener `explicitVariableModes` apuntando a una colección externa (colección no en `localIds`).
- El modo aplicado en `_source/system` debe ser exactamente `default` (ID `40002056:4`).

**Verificación:**
```javascript
const localCollections = await figma.variables.getLocalVariableCollectionsAsync();
const localIds = new Set(localCollections.map(c => c.id));

// Buscar modos externos en TODOS los nodos
function walk(node) {
  for (const [colId] of Object.entries(node.explicitVariableModes || {})) {
    if (!localIds.has(colId)) { /* FAIL — modo externo */ }
  }
  if ('children' in node) node.children.forEach(walk);
}
```

**PASS:** `_source/system` con modo `default` correcto; cero modos externos en cualquier nodo.
**WARN:** `_source/system` con modo explícito ausente (usa `Auto`).
**FAIL:** Cualquier nodo con `explicitVariableModes` apuntando a colección externa, o modo de `_source/system` incorrecto.

---

### D5 — Snapshot publicado — consistencia local ↔ publicado ❗ Crítico
**Peso:** Crítico

**Reglas:**
- El snapshot publicado de Icons debe reflejar el estado local actual de `Icon/Context`.
- El snapshot no debe contener modos obsoletos (`danger`, `on-dark`, o cualquier modo no en CONFIG.MODES).
- La colección `Icon/Context` debe aparecer en consumidores con los 4 modos correctos: `default / inverse / brand / disabled`.
- No deben existir colecciones fantasma (colecciones en el snapshot publicado que ya no existen localmente).

**Verificación — desde un archivo consumidor:**
```javascript
const colls = await figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync();
const iconCtx = colls.find(c => c.libraryName.includes('Icons') && c.name === 'Icon/Context');
// Esperar: iconCtx existe y sus modos son [default, inverse, brand, disabled]
```

**Verificación — desde el propio archivo Icons:**
```javascript
// Comprobar que no hay cambios pendientes de publicar
// Si los hay, el snapshot está desactualizado → publicar antes de cerrar auditoría
```

**PASS:** Snapshot publicado = estado local. Modos correctos en consumidores.
**WARN:** Snapshot con ≤ 1 diferencia menor (nombre de descripción, no modos).
**FAIL:** Snapshot con modo obsoleto visible en consumidores, o colección fantasma activa.

> **Acción requerida ante FAIL:** publicar el archivo Icons (Main menu → Libraries → Publish changes) antes de cerrar la auditoría.

---

### D6 — Referencias a Tokens library — sin file keys huérfanas ❗ Crítico
**Peso:** Crítico

**Contexto:**
`icon/system/context-color` tiene 4 valores (uno por modo), cada uno es un `VARIABLE_ALIAS` a una variable de la librería Tokens. Todos deben apuntar al archivo Tokens actual (`ml3ScFhJNwgs6xZpKUKuok`, colección Semantics key `82b667cada655a4698f3d29b1b303cb413212d3d`).

**Variables target esperadas en Tokens Semantics:**

> Estos tokens son **stateless** (sin hermanos hover/active en Tokens) → NO llevan sufijo `-default`. Corrección aplicada 2026-04-30: los modos apuntaban a nombres con `-default` stale; se rebindearon a las variables sin sufijo. Los keys son estables ante rename — verificar tras cada publicación de Tokens.

| Modo | Variable Tokens | Key esperado |
|---|---|---|
| `default` | `color/icon/system/primary` | `bf4047b5e6252640d7ac25859af64823102853d3` |
| `inverse` | `color/icon/system/inverse` | `928fc82d391fac68480ed28335cfd0f9cc7ad264` |
| `brand` | `color/icon/brand/strong` | `4e750ab9292f904f3bd2f38f2bc2167f7db07e36` |
| `disabled` | `color/icon/system/disabled` | `8a92526746208ff9f66ee8b56d6b6e88cf7b9728` |

**Checks:**
- Los 4 aliases de `context-color` apuntan exactamente a las variables listadas arriba.
- Las 4 referencias resuelven a la colección Semantics del Tokens actual (no a una versión/copia antigua).
- `importVariableByKeyAsync` para cada key devuelve `collectionId` con `82b667...` (Tokens Semantics key actual).
- No existen referencias a file keys distintos al Tokens actual entre los 4 modos.

**Verificación:**
```javascript
const ctxColor = vars.find(v => v.name === 'icon/system/context-color');
for (const [modeId, val] of Object.entries(ctxColor.valuesByMode)) {
  const imported = await figma.variables.importVariableByKeyAsync(/* key del alias */);
  // Verificar: imported.variableCollectionId contiene '82b667cada655a4698f3d29b1b303cb413212d3d'
}
```

**PASS:** Los 4 aliases resuelven al Tokens actual con los keys exactos declarados en CONFIG.
**WARN:** 1–2 aliases con key correcto pero file-hash distinto (copia del mismo archivo).
**FAIL:** Cualquier alias huérfano (no resuelve), o alias apuntando a variable en colección no existente en Tokens actual.

---

### D7 — Cobertura de variantes por categoría
**Peso:** Bajo

**Checks:**
- Cada ícono de sistema existe como componente en `_source/system` con fill enlazado a `context-color`.
- Iconos semánticos cubren las 4 variantes: `info`, `success`, `warning`, `danger` (como mínimo).
- Iconos de marca cubren los roles principales definidos por el DS.
- No existen componentes duplicados (mismo ícono dos veces en la misma sección).
- Todos los vectores tienen un tamaño estándar definido por los tokens `icon/size/*` de Tokens (no hardcoded).

**PASS:** Cobertura completa por categoría, sin duplicados, con tamaños tokenizados.
**WARN:** 1–3 íconos con tamaño hardcoded o variante semántica faltante menor.
**FAIL:** Variante semántica obligatoria ausente, o categoría completa sin cobertura.

---

### D8 — Escalabilidad estructural
**Peso:** Bajo

**Checks:**
- Agregar un nuevo ícono de sistema no requiere crear variables adicionales — solo crear el componente y bindear `context-color`.
- El patrón `source/{categoría}/{nombre}` permite agregar categorías nuevas sin colisión de nombres.
- Agregar un nuevo modo a `Icon/Context` (ej: `on-brand`) no requiere modificar todos los componentes existentes — solo añadir el valor correspondiente en `context-color`.
- Las secciones `_source/*` están organizadas de forma que nuevos íconos se agregan sin reorganización estructural.

**PASS:** El sistema soporta adición de íconos y modos sin refactoring de variables ni bindings existentes.
**WARN:** 1–2 componentes con estructura que requeriría ajuste manual al agregar un modo nuevo.
**FAIL:** La estructura actual bloquea agregar un modo nuevo sin modificar todos los vectores existentes.

---

## Scoring

### Por dominio

| Score | Criterio |
|---|---|
| ✅ PASS | Todos los checks del dominio superados |
| ⚠️ WARN | ≥ 80% de checks superados; hallazgos menores sin impacto estructural |
| ❌ FAIL | Cualquier check crítico fallido o < 80% de checks superados |

### Global

| Score global | Criterio |
|---|---|
| ✅ PASS | Todos los dominios en PASS (o WARN en dominios Bajo/Medio con plan de acción) |
| ⚠️ WARN | ≥ 1 dominio Medio en WARN; ningún Crítico en FAIL |
| ❌ FAIL | ≥ 1 dominio Crítico en FAIL |

---

## Output format

Al finalizar cada dominio, reportar en este formato:

```
### D{N} — {Nombre}
**Score:** ✅ PASS | ⚠️ WARN | ❌ FAIL
**Hallazgos:** {descripción breve o "ninguno"}
**Acción:** {corrección requerida o "—"}
```

Al finalizar todos los dominios:

```
## Resumen
| Dominio | Score |
|---------|-------|
| D1 — Arquitectura Icon/Context     | ✅ / ⚠️ / ❌ |
| D2 — Naming convention             | ✅ / ⚠️ / ❌ |
| D3 — Integridad bindings fill      | ✅ / ⚠️ / ❌ |
| D4 — Modos explícitos secciones    | ✅ / ⚠️ / ❌ |
| D5 — Snapshot publicado            | ✅ / ⚠️ / ❌ |
| D6 — Referencias Tokens sin huérfanas | ✅ / ⚠️ / ❌ |
| D7 — Cobertura de variantes        | ✅ / ⚠️ / ❌ |
| D8 — Escalabilidad estructural     | ✅ / ⚠️ / ❌ |

**Score global:** ✅ PASS | ⚠️ WARN | ❌ FAIL
**Nivel de consistencia: X/10**
```

---

## Historial de auditorías

| Fecha | Score global | Hallazgos resueltos | Notas |
|-------|-------------|---------------------|-------|
| 2026-04-24 | ⚠️ WARN | D3 system (222 vectores), D3 secciones (3 nodos) | Bug raíz resuelto: `context-color` apuntaba a colección `Icon/Context` fantasma de snapshot obsoleto de Tokens. D5 pendiente: verificar snapshot desde archivo consumidor. Semantic icons: bindings propios confirmados como correctos — excepción documentada en D3. Nivel de consistencia: 9/10. |
