# DS Audit Protocol — Maestro

**Versión:** 2.0  
**Última actualización:** 2026-04-25  
**Scope:** Sistema completo OPS-Library-[Aqua]

---

## 0. Jerarquía de fuentes de verdad — no negociable

```
Tokens (Figma)  ←  fuente de verdad absoluta para valores
    ↓
Icons (Figma)   ←  fuente de verdad para componentes de ícono
    ↓
DS (Figma)      ←  consumer únicamente; no define ni redefine nada
    ↓
JSON            ←  reflejo exacto de Tokens (Figma → JSON, nunca al revés)
    ↓
dist            ←  output de Style Dictionary; reflejo exacto de JSON
    ↓
.md             ←  documentación; reflejo exacto de Figma DS
```

**Regla absoluta:** Ninguna capa puede introducir valores que no existan en la capa superior. DS no crea tokens. Icons no crea colores. JSON no inventa variables. La auditoría detecta cualquier quiebre en esta cadena.

### Librerías Figma

| Librería | File key | Rol |
|---|---|---|
| **Tokens** | `ml3ScFhJNwgs6xZpKUKuok` | Fuente de verdad — primitives + semánticos |
| **Icons** | `zIbuWAvLhwTlwnVwbDgY5n` | Fuente de verdad — componentes de ícono |
| **DS** | `9FoTERLTyDXz3gmPLjjJ09` | Consumer — componentes de interfaz |

---

## 1. Tipos de auditoría

| Tipo | Cuándo usar | Layers obligatorios |
|---|---|---|
| **Full** | Antes de release o publicación de librería | L1 → L2 → L3 → L4 → L5 → L6 |
| **Triggered** | Al crear/modificar token, componente o docs | Ver tabla de triggers §1.1 |
| **Spot** | Corrección de hallazgo puntual | Layer afectado + L4 parcial + L5 |
| **Post-fix** | Después de resolver un BLOCKER | Layer afectado + L4-V1/V2/V3 |

### 1.1 Triggers y layers mínimos

| Trigger | Layers obligatorios |
|---|---|
| Nuevo token primitivo o semántico | L1 + L4-V1 + L4-V2 |
| Nuevo componente DS | L3 + L4-V3 + L4-V4 |
| Cambio en token existente | L1 + L3-C1 + L4 completo |
| Publicación librería Tokens | L1 + L4-V1 + L4-V2 |
| Publicación librería Icons | L2 + L3-C2 |
| Actualización .md | L4-V3 |
| Modificación de CSS de componente | **L4-V4** |
| Nuevo pattern | L6 |
| Actualización pattern (frame o .md) | L6 |
| Release a desarrollo | **Full** |

---

## 2. Pre-flight

Antes de iniciar cualquier auditoría:

```javascript
// 1. Conectar a los 3 archivos vía MCP — confirmar que están activos
// figma_list_open_files → verificar DS, Tokens e Icons presentes

// 2. Cargar todas las páginas en el archivo activo
await figma.loadAllPagesAsync();

// 3. Confirmar colecciones en Tokens library
// Navegar a Tokens → getLocalVariableCollectionsAsync()
// Esperado: Primitives + Semantics + Layout

// 4. Confirmar colección en Icons library
// Navegar a Icons → getLocalVariableCollectionsAsync()
// Esperado: Icon/Context con modos [default, inverse, brand, disabled]

// 5. SCOPE DINÁMICO — descubrimiento y validación del registro de componentes
// Este check reemplaza el count hardcodeado ("21 CS total"). Compara el estado real
// de Figma contra la registry definida en §3-L3. FAIL si hay CS no registrado o faltante.

const REGISTERED_IDS = new Set([
  '557:1953',       // button
  '561:10356',      // button/icon
  '40002291:3851',  // radio button
  '40002291:4232',  // radio group
  '40002351:6594',  // toggle
  '40002312:6388',  // checkbox
  '40002386:4344',  // chips
  '564:2268',       // link
  '40002386:6744',  // tabs
  '881:18695',      // alert
  '774:29702',      // spinner
  '40002369:4082',  // badge
  '40002369:4091',  // badge/state
  '40002339:1862',  // tooltip
  '40002482:2745',  // text fields
  '40002045:2142',  // icon/system (en DS)
  '40002386:4144',  // tag
  '40002045:2159',  // icon/semantic
  '40002045:2176',  // icon/brand
  '40002037:59',    // layout/grids
  '40002038:102',   // _slot
  // — Sub-componentes "group" (documentados en el .md del padre) —
  '40002386:6113',  // chips/group        → chips.md
  '40002386:6826',  // tabs/group         → tabs.md
  '40002312:6390',  // checkbox group     → checkbox.md
  '40002386:4322',  // notification       → badge.md
  // — Familia Select / Menu (staging — entra en v0.2.0) —
  '40003102:19653', // select
  '40003102:19674', // _menu/item
  '40003104:25695', // menu/list
  '40003146:80675', // _divider           → primitiva interna del menú
  '40003354:14160', // combobox           → reusa menu/list + _menu/item
]);

// EXCLUSIÓN DE SCOPE — página "→ Navegador kit": mockups de browser-chrome
// (Tab Bar iOS, Address Bar iOS, Desktop-windows, _Tab Bar Android, _Address Bar android).
// NO son componentes del DS — son utilería de documentación para frames "Use".
// No se auditan (C1–C5) ni requieren .md. Mantener fuera de REGISTERED_IDS a propósito.
const NAVEGADOR_KIT_EXCLUDED = new Set([
  '40003228:198','40003228:197','40003231:602','40003231:601','40003231:605',
]);

await figma.loadAllPagesAsync();
const unregistered = [];
const missing = [];

// CS/COMPONENT en Figma no registrados → FAIL (componente nuevo sin registrar)
for (const page of figma.root.children) {
  const nodes = page.findAll(n => n.type === 'COMPONENT_SET' || n.type === 'COMPONENT');
  for (const node of nodes) {
    if (node.type === 'COMPONENT' && node.parent?.type === 'COMPONENT_SET') continue; // variante interna
    if (NAVEGADOR_KIT_EXCLUDED.has(node.id)) continue;                                 // utilería doc, fuera de scope
    if (!REGISTERED_IDS.has(node.id)) {
      unregistered.push({ id: node.id, name: node.name, page: page.name });
    }
  }
}

// IDs registrados que ya no existen en Figma → FAIL (componente eliminado sin desregistrar)
for (const id of REGISTERED_IDS) {
  const node = await figma.getNodeByIdAsync(id);
  if (!node) missing.push(id);
}

// Esperado: unregistered = [] y missing = []
// Si unregistered.length > 0 → añadir el CS a la tabla §3-L3 y a la lista de .md de V3
// Si missing.length > 0     → eliminar el ID de la tabla §3-L3 y del registro

// 6. SCOPE COMPLETO — verificar que no hay CS/COMPONENT en páginas no listadas en §3-L3
// Para cada página de DS que NO sea ❖ ni → Icon ni → Layout:
// page.children.filter(n => n.type === 'COMPONENT_SET' || n.type === 'COMPONENT')
// Esperado: [] en páginas de Foundations, Gobernanza, Cover, separadores y secciones.
// Verificado 2026-04-30: 8 foundation pages + 10 otras = 0 CS/COMPONENT fuera de scope.

// 7. WCAG PRIMITIVES MATCH — verificar que los HEX documentados en doc page 41:106 coinciden con Primitives
// En Tokens library: extraer hex de todas las variables de Primitives collection
// En doc page 41:106 sección "Primitives / Color System": extraer text nodes con patrón /^#[0-9A-Fa-f]{6}$/
// Comparar sets: inActualNotInDoc y inDocNotInActual deben ser [].
// Verificado 2026-04-30: 102/102 hex values coinciden exactamente. PASS.

// 8. PUBLISH GATE — verificar estado de publicación en las 3 librerías
// Navegar a cada librería → Main menu → Libraries → revisar "Unpublished changes"
// Si hay cambios pendientes en Tokens o Icons → registrar como hallazgo Info antes de continuar.
// Razón: la auditoría corre sobre el estado LOCAL; los consumidores ven el SNAPSHOT publicado.
// Si hay cambios críticos (codeSyntax, alias, modos) sin publicar → escala a Warning.
```

Si alguna conexión falla → detener auditoría y reportar el problema de conexión antes de continuar.

---

## 3. Layer 1 — Token Library

**Archivo:** `ml3ScFhJNwgs6xZpKUKuok`  
**Protocolo especializado:** [`audit-tokens.md`](../audit-tokens.md) — ejecutar completo.

### Resumen de dominios

| Dominio | Peso | Qué verifica |
|---|---|---|
| D1 — Arquitectura | Medio | Colecciones y modos declarados en CONFIG |
| **D2 — Naming** | **Crítico** | kebab-case, jerarquía `/`, sin uppercase |
| **D3 — Alias chain** | **Crítico** | Semantics = alias a Primitives en ≤ 2 saltos |
| D4 — Cobertura de modos | Medio | Todos los modos con valor definido |
| **D5 — codeSyntax WEB** | **Crítico** | 100% semánticos con `--css-var` correcto |
| D6 — Doc sync | Medio | Tabla doc Figma (41:106) refleja variables |
| D7 — WCAG contraste | Bajo | Pares texto/fondo ≥ 4.5:1 (AA) |
| D8 — Escalabilidad | Bajo | Naming no bloquea crecimiento futuro |
| **S1 — Sync Primitivos** | **Crítico** | Figma Primitives ↔ JSON primitivos |
| **S2 — Sync Semánticos** | **Crítico** | Figma Semantics + Layout ↔ JSON semánticos |

**Score L1:** X/10 dominios en PASS  
**Gate:** D2, D3, D5, S1, S2 deben ser PASS para release.

---

## 4. Layer 2 — Icons Library

**Archivo:** `zIbuWAvLhwTlwnVwbDgY5n`  
**Protocolo especializado:** [`audit-icons.md`](../audit-icons.md) — ejecutar completo.

### Resumen de dominios

| Dominio | Peso | Qué verifica |
|---|---|---|
| D1 — Arquitectura Icon/Context | Medio | Colección única, 5 modos exactos |
| **D2 — Naming** | **Crítico** | `source/{categoría}/{nombre-kebab}` |
| **D3 — Bindings fill** | **Crítico** | System → `context-color` local; brand → Tokens Semantics |
| **D4 — Modos explícitos** | **Crítico** | `_source/system` con modo `default`; sin modos externos |
| **D5 — Snapshot publicado** | **Crítico** | Snapshot = estado local; modos correctos en consumidores |
| **D6 — Referencias Tokens** | **Crítico** | 5 aliases de `context-color` apuntan a Tokens actual |
| D7 — Cobertura de variantes | Bajo | Sin duplicados; tamaños tokenizados |
| D8 — Escalabilidad | Bajo | Agregar ícono/modo no requiere refactoring |

**Score L2:** X/8 dominios en PASS  
**Gate:** D2, D3, D4, D5, D6 deben ser PASS para release.

---

## 5. Layer 3 — DS Components

**Archivo:** `9FoTERLTyDXz3gmPLjjJ09`

DS es un consumer puro. Cada check en esta capa valida que DS consume correctamente Tokens e Icons — nunca que define algo propio.

### C1 — Cascade token binding

Verificar que cada propiedad visual en cada ComponentSet está bindeada a una variable semántica de Tokens. Sin valores hardcodeados, sin primitives directos, sin locales.

**ComponentSets a auditar — Registry oficial:**

> Esta tabla es el registro canónico de scope. El script de pre-flight §5 la valida dinámicamente contra Figma en cada auditoría. Al añadir un componente nuevo: registrarlo aquí, en la lista `.md` de V3, y en el set `REGISTERED_IDS` del pre-flight §5.

| CS | ID | Variantes | Nota |
|---|---|---|---|
| button | `557:1953` | 126 | |
| button/icon | `561:10356` | 105 | |
| radio button | `40002291:3851` | 5 | |
| radio group | `40002291:4232` | 5 | Mismo page que radio button |
| toggle | `40002351:6594` | 5 | |
| checkbox | `40002312:6388` | 5 | |
| chips | `40002386:4344` | 2 | |
| link | `564:2268` | 48 | |
| tabs | `40002386:6744` | 5 | |
| alert | `881:18695` | 4 | |
| spinner | `774:29702` | 24 | |
| badge | `40002369:4082` | 2 | |
| badge/state | `40002369:4091` | 5 | |
| tooltip | `40002339:1862` | 9 | |
| text fields | `40002482:2745` | 14 | |
| icon/system (en DS) | `40002045:2142` | 8 | |
| tag | `40002386:4144` | 1 | **COMPONENT** (no COMPONENT_SET) — una sola variante |
| icon/semantic | `40002045:2159` | 8 | Página `→ Icon` |
| icon/brand | `40002045:2176` | 8 | Página `→ Icon` |
| layout/grids | `40002037:59` | 6 | Página `→ Layout` |
| _slot | `40002038:102` | 1 | **COMPONENT** — utility placeholder interno; ver nota de exclusión abajo |
| chips/group | `40002386:6113` | 1 | **COMPONENT** — página ❖ Chips; documentado en `chips.md` |
| tabs/group | `40002386:6826` | 1 | **COMPONENT** — página ❖ Tabs; documentado en `tabs.md` |
| checkbox group | `40002312:6390` | 1 | **COMPONENT** — página ❖ Check box; documentado en `checkbox.md` |
| notification | `40002386:4322` | 1 | **COMPONENT** — página ❖ Badge; documentado en `badge.md` |
| select | `40003102:19653` | 7 | **Staging v0.2.0** — página ❖ Select; `select.md` |
| menu/list | `40003104:25695` | 4 | **Staging v0.2.0** — **público**; página ❖ Menu; `menu.md` |
| _menu/item | `40003102:19674` | 5 | **Staging v0.2.0** — primitiva interna; página ❖ Menu; `menu.md` |
| _divider | `40003146:80675` | 1 | **COMPONENT** — primitiva interna del menú; página ❖ Menu; `menu.md` |
| combobox | `40003354:14160` | 9 | **Staging v0.2.0** — página ❖ Combobox; `combobox.md`; reusa `menu/list` + `_menu/item` |

**Exclusión documentada — `→ Navegador kit`:** los 5 nodos de la página `→ Navegador kit` (Tab Bar iOS, Address Bar iOS, Desktop-windows, _Tab Bar Android, _Address Bar android) son mockups de browser-chrome para frames de uso/documentación — **no son componentes del DS**. No se auditan ni requieren `.md`. Excluidos a propósito vía `NAVEGADOR_KIT_EXCLUDED` en el pre-flight §2.

**Exclusión documentada — `_slot`:**

`_slot` es un utility placeholder interno (fill púrpura `#9747FF` + text "Instance Slot"). Tiene prefix `_` por convención interna. Sus fills y text nodes NO necesitan binding semántico — no son visibles al usuario final. Los hallazgos de `UNBOUND_FILL` / `NO_TEXT_STYLE` en `_slot` y en instancias de `_slot` dentro de `layout/grids` son **falsos positivos** esperados — ignorar.

**Script de referencia:**

> **CRÍTICO — resolución cross-library:** En DS (consumer puro), `figma.variables.getVariableById(id)` (sync) devuelve `null` para variables de librerías externas. Usar siempre `await figma.variables.getVariableByIdAsync(id)` para resolver bindings.

```javascript
function hasRadiusBinding(node) {
  const bv = node.boundVariables || {};
  // IMPORTANTE: verificar AMBAS formas — shorthand y por esquina
  return !!(
    bv.cornerRadius ||
    bv.topLeftRadius || bv.topRightRadius ||
    bv.bottomLeftRadius || bv.bottomRightRadius
  );
}

async function auditNode(node, issues, seen) {
  // Fills — toda pintura sólida debe ser variable semántica
  if (node.fills?.some(f => f.type === 'SOLID' && f.visible !== false)) {
    if (!node.boundVariables?.fills?.length) {
      const k = `fill::${node.name}::${node.type}`;
      if (!seen.has(k)) { seen.add(k); issues.push({ type: 'UNBOUND_FILL', node: node.name }); }
    } else {
      // DANGLING check — binding existe pero la variable fue renombrada o eliminada
      for (const binding of (node.boundVariables.fills || [])) {
        const resolved = await figma.variables.getVariableByIdAsync(binding.id);
        if (!resolved) {
          const k = `dangling-fill::${node.name}::${binding.id}`;
          if (!seen.has(k)) { seen.add(k); issues.push({ type: 'DANGLING_BINDING', node: node.name, variableId: binding.id, property: 'fill' }); }
        }
      }
    }
  }
  // Strokes — ídem. COMPONENT_SET root lleva stroke visual de Figma (borde púrpura de contenedor) — excluir.
  if (node.type !== 'COMPONENT_SET' && node.strokes?.some(s => s.type === 'SOLID' && s.visible !== false)) {
    if (!node.boundVariables?.strokes?.length) {
      const k = `stroke::${node.name}::${node.type}`;
      if (!seen.has(k)) { seen.add(k); issues.push({ type: 'UNBOUND_STROKE', node: node.name }); }
    } else {
      for (const binding of (node.boundVariables.strokes || [])) {
        const resolved = await figma.variables.getVariableByIdAsync(binding.id);
        if (!resolved) {
          const k = `dangling-stroke::${node.name}::${binding.id}`;
          if (!seen.has(k)) { seen.add(k); issues.push({ type: 'DANGLING_BINDING', node: node.name, variableId: binding.id, property: 'stroke' }); }
        }
      }
    }
  }
  // Text style — todo TEXT debe referenciar un estilo REMOTO de la librería Tokens
  // Los IDs remotos tienen formato "S:xxxxxxxx,..." — un textStyleId local o vacío es FAIL
  if (node.type === 'TEXT') {
    const sid = node.textStyleId;
    const hasRemoteStyle = sid && sid !== figma.mixed && sid !== '' && typeof sid === 'string' && sid.startsWith('S:');
    if (!hasRemoteStyle) {
      const k = `text::${node.name}`;
      if (!seen.has(k)) { seen.add(k); issues.push({ type: 'NO_REMOTE_TEXT_STYLE', node: node.name, styleId: sid || 'none' }); }
    }
  }
  // Radius — verificar shorthand Y corners individuales
  const r = typeof node.cornerRadius === 'number' ? node.cornerRadius :
            (node.topLeftRadius || 0);
  if (r > 0 && !hasRadiusBinding(node)) {
    const k = `radius::${node.name}::${r}`;
    if (!seen.has(k)) { seen.add(k); issues.push({ type: 'UNBOUND_RADIUS', node: node.name, value: r }); }
  }
  if (node.children) for (const c of node.children) await auditNode(c, issues, seen);
}
```

**Resultado esperado:**

| Componente | UNBOUND_FILL | UNBOUND_STROKE | NO_TEXT_STYLE | UNBOUND_RADIUS | DANGLING_BINDING | Score |
|---|---|---|---|---|---|---|
| (cada CS) | 0 | 0 | 0 | 0 | 0 | ✅ |

> `DANGLING_BINDING` = binding a variable renombrada o eliminada. Causa: variable renombrada en Tokens sin rebind en DS. Acción: rebindear al token correcto via `setBoundVariable` + `getVariableByIdAsync` del token actual.

**PASS:** 0 issues en todos los CS.  
**WARN:** 1–3 issues en nodos no visibles o de estructura interna.  
**FAIL:** Cualquier `DANGLING_BINDING`, o issue en nodo con fill/stroke/text/radius visible al usuario.

---

### C2 — Integración de Icons library

Todos los íconos usados en componentes DS deben ser instancias provenientes de `zIbuWAvLhwTlwnVwbDgY5n`. Ningún vector o path suelto.

```javascript
// En cada ComponentSet de DS, buscar instancias de ícono
function auditIconIntegration(cs) {
  const issues = [];
  // Vectores sueltos = FAIL
  const vectors = cs.findAll(n => n.type === 'VECTOR');
  vectors.forEach(v => {
    if (v.parent?.type !== 'BOOLEAN_OPERATION') {
      issues.push({ type: 'LOOSE_VECTOR', node: v.name, id: v.id });
    }
  });
  // Instancias de ícono — verificar que vienen de Icons library
  const iconInstances = cs.findAll(n =>
    n.type === 'INSTANCE' &&
    (n.name.startsWith('source/system') || n.name.startsWith('icon/'))
  );
  iconInstances.forEach(inst => {
    const mainComp = inst.mainComponent;
    // El mainComponent debe estar en el file de Icons
    if (!mainComp || !mainComp.remote) {
      issues.push({ type: 'LOCAL_ICON', node: inst.name, id: inst.id });
    }
  });
  return issues;
}
```

**PASS:** 0 vectores sueltos; todos los íconos son instancias remotas de Icons library.  
**WARN:** Ícono local con binding correcto a `context-color` (estructura válida pero no de librería).  
**FAIL:** Vector suelto con color hardcodeado, o instancia de ícono local sin binding semántico.

---

### C3 — Estructura interna de componentes

```javascript
// Checks por ComponentSet
async function auditStructure(cs) {
  const issues = [];
  // Sin variables locales propias en DS
  const localVars = figma.variables.getLocalVariablesAsync
    ? await figma.variables.getLocalVariablesAsync() : [];
  if (localVars.length > 0) {
    issues.push({ type: 'LOCAL_VARIABLES', count: localVars.length });
  }
  // Variantes sin propiedades — orphan components
  cs.children?.forEach(v => {
    if (!v.variantProperties || Object.keys(v.variantProperties).length === 0) {
      issues.push({ type: 'ORPHAN_VARIANT', id: v.id, name: v.name });
    }
  });
  return issues;
}
```

**PASS:** Sin variables locales en DS; todas las variantes con propiedades definidas.  
**FAIL:** Variables locales en DS que replican semánticos de Tokens. Variables locales = BLOCKER.

---

### C4 — Accesibilidad en componentes

Verificar que los componentes DS cumplen criterios de accesibilidad a nivel Figma y documentación:

**C4.1 — Focus states token-bound**

Todo componente interactivo debe tener un `state=Focus` con:
- Focus ring bindeado a `color/focus/ring-*` de Tokens
- Gap bindeado a `color/focus/ring-gap-*` de Tokens
- `stroke-width` bindeado a `stroke/focus-ring-width` de Tokens

Componentes con estado Focus obligatorio: `button`, `button/icon`, `checkbox`, `radio button`, `toggle`, `link`, `tabs`, `text fields`, `chips`, `select`, `combobox`.

**C4.2 — ARIA y teclado en .md**

Cada `.md` de componente debe tener las secciones:
- `## ARIA` — con tabla de atributos requeridos
- `## Teclado` — con tabla de teclas y acciones
- Si el componente tiene `button/icon` → `aria-label` marcado como obligatorio, no como warning

**C4.3 — Contraste en Figma (texto y no-textual)**

**Contraste textual — WCAG 1.4.3:**
- Resolver el hex real del token (primitivo referenciado por el semántico)
- Calcular contraste WCAG 2.1 con la fórmula estándar
- Referencia: los resultados de D7 en L1 (audit-tokens) aplican aquí directamente

**Contraste no-textual — WCAG 1.4.11 (≥3:1):**

Los siguientes elementos deben tener ratio ≥3:1 sobre su fondo inmediato:

| Elemento | Token de color | Fondo de comparación |
|---|---|---|
| Borde de inputs (default) | `--color-border-default` (#c9c9c9) | `--color-bg-fill-neutral-subtle` (#ffffff) |
| Borde de inputs (focus) | `--color-border-focus` (#0f202b) | `--color-bg-fill-neutral-subtle` (#ffffff) |
| Borde de inputs (error) | `--color-border-danger-focus` (#9b1020) | `--color-bg-fill-neutral-subtle` (#ffffff) |
| Indicador activo de tabs | `--color-border-focus` (#0f202b) | `--color-bg-surface-default` (#ffffff) |
| Indicador hover de tabs | `--color-action-primary-hover` (#304d5f) | `--color-bg-surface-default` (#ffffff) |
| Focus ring | `--color-focus-ring-default` (#0043ce) | contexto claro |
| Toggle track (default) | `--color-icon-system-secondary` (#737373) | `--color-bg-surface-default` (#ffffff) |
| Toggle track (selected) | `--color-icon-status-success` (#006b27) | `--color-bg-surface-default` (#ffffff) |
| Íconos de estado | `--color-icon-status-*` | fondo de status correspondiente |

**Nota:** `--color-border-default` (#c9c9c9) sobre blanco = 1.66:1 — **por debajo de 3:1**. Es una deuda conocida: los bordes en default state no alcanzan WCAG 1.4.11. Documentar como WARN aceptado hasta que se decida elevar el token. No bloquea release pero debe registrarse en cada auditoría.

**C4.4 — Completitud de estados requeridos**

Todo componente interactivo debe tener los 5 estados definidos en las reglas del sistema. Un componente que sale sin alguno de estos estados puede pasar C1–C3 sin ser detectado.

**Estados requeridos para componentes interactivos:**

| Estado | Obligatorio en |
|---|---|
| `default` | Todos |
| `hover` | Todos los interactivos **salvo campos de formulario** (ver exención) |
| `active` | Todos los interactivos |
| `focus` | Todos los interactivos |
| `disabled` | Todos salvo `spinner`, `alert`, `badge`, `tag`, `tooltip` |

**Exención `hover` — campos de formulario (`text fields`, `select`, `combobox`):** estos componentes **no tienen estado `hover`** por decisión de diseño documentada. El cursor sobre un input/trigger no cambia su apariencia; la retroalimentación se da en `active`/`writing` (escritura) y `focus` (anillo de teclado). El `REQUIRED` del script debe excluir `hover` para `text fields`, `select` y `combobox` — un input sin `hover` es **PASS**, no FAIL. (Nota: `_menu/item`, la opción del menú, **sí** tiene `hover` y no está exenta.)

**Script de verificación:**

```javascript
// Para cada CS interactivo: extraer estados reales de las variantes
const cs = await figma.getNodeByIdAsync(csId);
const actualStates = new Set();
cs.children?.forEach(v => {
  const stateVal = v.variantProperties?.state || v.variantProperties?.State;
  if (stateVal) actualStates.add(stateVal.toLowerCase());
});

// Campos de formulario exentos de `hover` (ver exención arriba)
const HOVER_EXEMPT = new Set(['40002482:2745' /* text fields */, '40003102:19653' /* select */, '40003354:14160' /* combobox */]);
const REQUIRED = ['default', 'hover', 'active', 'focus', 'disabled']
  .filter(s => !(s === 'hover' && HOVER_EXEMPT.has(csId)));
const missing = REQUIRED.filter(s => !actualStates.has(s));
// FAIL si missing.length > 0
```

**Componentes no interactivos** (exentos de hover/active/focus/disabled): `spinner`, `alert`, `badge/state`, `tag`, `tooltip`.

**PASS:** Focus states en 100% de componentes interactivos; .md con ARIA y Teclado; sin pares texto/fondo bajo AA; 5 estados presentes en cada CS interactivo.  
**WARN:** 1 componente sin sección Teclado o ARIA incompleta.  
**FAIL:** Componente interactivo sin estado Focus o sin `disabled`, o focus sin tokens semánticos.

---

### C5 — Documentation links

Cada ComponentSet (y COMPONENT standalone como `tag`) debe tener exactamente un documentation link configurado apuntando a la página Figma de ese componente.

**Formato obligatorio:**
```
https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/OPS-Library-Aqua-DS-MVP?node-id={pageId}
```
Donde `{pageId}` es el ID de la página Figma con `-` como separador (no `:`).

**Reglas:**
- El link apunta al `node-id` de la **página** (no al ID del ComponentSet).
- Páginas con múltiples ComponentSets (ej: `radio button` + `radio group`) → todos apuntan al mismo `node-id`.
- COMPONENT standalone (`tag`) también requiere documentation link.

**Script de verificación:**
```javascript
const componentPages = figma.root.children.filter(p => p.name.includes('❖'));
const missing = [];
for (const page of componentPages) {
  await page.loadAsync();
  const sets = page.findAll(n => n.type === 'COMPONENT_SET' || n.type === 'COMPONENT');
  for (const n of sets) {
    if (!n.documentationLinks?.length) {
      missing.push({ page: page.name.trim(), name: n.name, type: n.type });
    }
  }
}
return missing; // Esperado: []
```

**Script de corrección:**
```javascript
// Para un nodo sin link:
const node = await figma.getNodeByIdAsync(nodeId);
node.documentationLinks = [{ uri: 'https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09/OPS-Library-Aqua-DS-MVP?node-id=' + pageId.replace(':', '-') }];
```

**PASS:** 100% de ComponentSets y COMPONENTs standalone con documentation link correcto.  
**WARN:** 1–2 sets con link faltante o apuntando al node-id del set en lugar de la página.  
**FAIL:** > 2 sets sin documentation link, o links que apuntan a archivo incorrecto.

---

## 6. Layer 4 — Chain validation

Validar que la cadena completa no tiene quiebres entre capas.

### V1 — Figma Tokens ↔ JSON

```bash
# Desde la raíz del repo
# 1. Exportar variables actuales de Figma (vía script o manual)
# 2. Comparar contra tokens/primitives/*.json y tokens/semantics/*.json

# Check rápido: ¿el build usa todas las variables que existen en Figma?
cat dist/V.0.1.0/tokens.css | grep "undefined"   # → debe retornar vacío
cat dist/V.0.1.0/tokens.js  | grep "undefined"   # → debe retornar vacío
```

**Checks:**
- Cada variable primitiva de Figma tiene entrada en `tokens/primitives/`
- Cada variable semántica de Figma tiene entrada en `tokens/semantics/`
- Los valores/aliases en JSON coinciden con Figma (FIGMA_SOURCE = true)
- Sin entradas JSON huérfanas (variables en JSON que no existen en Figma)

**PASS:** 100% de variables representadas; 0 huérfanas; 0 valores incorrectos.  
**FAIL:** Variable activa en Figma sin entrada JSON, o alias JSON incorrecto.

---

### V2 — JSON ↔ dist

```bash
npm run build   # → debe completar con 0 errores

# Verificar los 3 archivos generados
ls dist/V.0.1.0/tokens.css dist/V.0.1.0/layout.css dist/V.0.1.0/tokens.js

# Verificar ausencia de valores inválidos
grep -c "undefined\|null\|NaN" dist/V.0.1.0/tokens.css    # → 0
grep -c "undefined\|null\|NaN" dist/V.0.1.0/tokens.js     # → 0

# Verificar formato dual en colores (HEX + oklch)
grep -c "oklch" dist/V.0.1.0/tokens.css   # → > 0 (debe tener overrides oklch)
```

**Checks:**
- `npm run build` termina con exit code 0
- Los 3 archivos `dist/V.x.x.x/tokens.css`, `dist/V.x.x.x/layout.css`, `dist/V.x.x.x/tokens.js` existen y no están vacíos
- Sin valores `undefined`, `null` o `NaN` en ningún archivo dist
- Los custom properties CSS siguen el formato `--{category}-{subcategory}-{role}-{state}`
- Cada token de color tiene HEX fallback + override oklch

**PASS:** Build limpio, 3 archivos válidos, 0 valores inválidos.  
**FAIL:** Build con errores, archivo faltante, o `undefined` en dist.

---

### V3 — .md ↔ Figma DS

Para cada componente activo:

**Check de variantes:**
```javascript
// Extraer propiedades reales del ComponentSet en Figma
const cs = await figma.getNodeByIdAsync(csId);
const realProps = {};
cs.children?.forEach(v => {
  Object.entries(v.variantProperties || {}).forEach(([key, val]) => {
    if (!realProps[key]) realProps[key] = new Set();
    realProps[key].add(val);
  });
});
// Comparar contra tabla Propiedades del .md correspondiente
```

**Check de tokens:**
- Cada token CSS mencionado en el `.md` (`--color-*`, `--space-*`, `--radius-*`) debe existir en `dist/V.x.x.x/tokens.css`
- Sin tokens en `.md` que no estén en dist

**Check tokens-map.md:**
- `docs/tokens-map.md` debe estar sincronizado con `dist/V.x.x.x/tokens.css`
- Cada `--custom-property` listada en tokens-map.md debe existir en tokens.css (sin huérfanas)
- Verificar con:
```bash
# Extraer tokens de tokens-map.md
grep -o '\`--[a-z][a-z0-9-]*\`' docs/tokens-map.md | tr -d '\`' | sort -u > /tmp/map_tokens.txt
# Extraer tokens de dist
grep -o '^\s*--[a-z][a-z0-9-]*' dist/V.0.1.0/tokens.css | tr -d ' ' | sort -u > /tmp/dist_tokens.txt
# Diff — debe ser vacío
comm -23 /tmp/map_tokens.txt /tmp/dist_tokens.txt
```
- **Snapshot de regresión de valores:** en cada release, comparar el valor hex de cada token semántico contra el release anterior para detectar cambios de valor no intencionales. Guardar snapshot como `docs/governance/token-snapshot-vX.X.X.json` al cerrar cada versión.

**Check de secciones:**
Cada `.md` debe tener exactamente estas 8 secciones: `Propiedades`, `Props`, `Tokens`, `HTML`, `ARIA`, `Teclado`, `Reglas`, `Accesibilidad`.

**Componentes .md a verificar — Registry de documentación:**

> Sincronizar con la tabla C1 de §3-L3. Al añadir un componente nuevo también añadirlo aquí.

| Componente | Archivo .md |
|---|---|
| alert | `docs/components/alert.md` |
| badge | `docs/components/badge.md` |
| button | `docs/components/button.md` |
| checkbox | `docs/components/checkbox.md` |
| chips | `docs/components/chips.md` |
| link | `docs/components/link.md` |
| radio-button | `docs/components/radio-button.md` |
| spinner | `docs/components/spinner.md` |
| tabs | `docs/components/tabs.md` |
| text-field | `docs/components/text-field.md` |
| toggle | `docs/components/toggle.md` |
| tag | `docs/components/tag.md` |
| tooltip | `docs/components/tooltip.md` |
| select *(staging v0.2.0)* | `docs/components/select.md` |
| combobox *(staging v0.2.0)* | `docs/components/combobox.md` |
| menu *(staging v0.2.0)* | `docs/components/menu.md` |

> **Sub-componentes documentados en el `.md` del padre** (no llevan `.md` propio): `chips/group`→`chips.md`, `tabs/group`→`tabs.md`, `checkbox group`→`checkbox.md`, `notification`→`badge.md`. **`menu/list` es público** (`menu.md`); `_menu/item`+`_divider` son sus internas, también documentadas en `menu.md`. **Select** y **Combobox** consumen `menu/list`+`_menu/item` (documentados en `menu.md`) y documentan su propio trigger/campo en `select.md`/`combobox.md`.

**PASS:** Variantes, tokens y secciones coinciden al 100% con Figma y dist.  
**WARN:** 1–2 tokens en .md con nombre desactualizado pero valor correcto.  
**FAIL:** Variante en .md que no existe en Figma, o token en .md que no existe en dist.

---

### V4 — CSS components ↔ Figma DS

Los archivos CSS de componentes son **handwritten** — no los genera Style Dictionary. Este check verifica que ningún CSS de componente tenga propiedades visuales que Figma no tiene, ni omita propiedades que Figma sí tiene.

**Origen del gap:** el lint-tokens.js detecta tokens inválidos o HEX hardcodeados, pero no detecta propiedades CSS semánticamente correctas que sean inconsistentes con Figma (ej. `border-color: var(--color-border-default)` en una variante que en Figma no tiene stroke).

**Archivos a verificar:** `dist/V.x.x.x/components/*.css` + `src/components/*.css`

**Check 1 — Strokes: CSS vs Figma**

Para cada componente, extraer de Figma qué variantes tienen stroke y comparar contra el CSS:

```javascript
// En Figma: obtener variantes con stroke visible (strokes.length > 0)
const cs = await figma.getNodeByIdAsync(csId);
const variantsWithStroke = cs.children
  .filter(v => v.strokes?.length > 0)
  .map(v => ({ name: v.name, strokeVar: v.boundVariables?.strokes?.[0] }));

// Comparar contra el CSS correspondiente:
// Si Figma tiene strokes: [] en una variante → el CSS no debe tener border-color visible
// Si Figma tiene strokes: [{...}] → el CSS debe aplicar el token correcto
```

**Check 2 — Propiedades extra en CSS**

Revisar manualmente (o con grep) que no existan propiedades en el CSS que no tengan respaldo en Figma:

```bash
# Buscar border-color en todos los CSS de componentes
grep -n "border-color" dist/V.*/components/*.css src/components/*.css

# Para cada resultado: verificar que la variante correspondiente en Figma
# tenga un stroke con binding a ese mismo token.
# border-color: transparent → siempre válido (patrón de reserva de layout)
# border-color: var(--color-*) → requiere stroke en Figma con ese binding
```

**Check 3 — Background / fills**

```bash
# Buscar backgrounds no transparentes
grep -n "background:" dist/V.*/components/*.css src/components/*.css | grep -v "transparent"

# Cada background debe corresponder a un fill en Figma con binding al mismo token
```

**Caso documentado — button.css secondary (detectado 2026-05-28):**

`.btn--secondary` tenía `border-color: var(--color-border-default)` pero Figma muestra `strokes: []` en todas las variantes Secondary/Default. El CSS debía usar `border-color: transparent`. No fue detectado por auditorías anteriores porque el check corría en dirección Figma→CSS (¿los tokens del .md son válidos?) y no CSS→Figma (¿el CSS tiene propiedades que Figma no tiene?).

**Componentes CSS a verificar:**

| Archivo | Clase raíz |
|---|---|
| `alert.css` | `.alert` |
| `badge.css` | `.badge` |
| `button.css` | `.btn` |
| `checkbox.css` | `.checkbox` |
| `chips.css` | `.chip` |
| `link.css` | `.link` |
| `radio-button.css` | `.radio` |
| `spinner.css` | `.spinner` |
| `tabs.css` | `.tabs` |
| `tag.css` | `.tag` |
| `text-field.css` | `.field` |
| `toggle.css` | `.toggle-field` |
| `tooltip.css` | `.tooltip` |
| `menu.css` (staging) | `.menu-list` · `.menu-item` · `.menu-divider` (primitivas públicas/internas) |
| `select.css` (staging) | `.select` (consume `.menu-list`/`.menu-item` de menu.css) |
| `combobox.css` (staging) | `.combobox` · `.menu-list__empty` (consume `.menu-list`/`.menu-item` de menu.css) |

**PASS:** Toda propiedad visual con valor no-transparente en CSS tiene respaldo de binding en Figma; toda propiedad bindeada en Figma está reflejada en CSS.  
**WARN:** Propiedad extra en CSS con valor visible pero sin stroke/fill en Figma, en un nodo no visible al usuario.  
**FAIL:** `border-color`, `background` o `color` con valor no-transparente en CSS sin binding correspondiente en Figma en nodo visible; o binding en Figma sin propiedad en CSS.

---

## 6.5 Layer 6 — Patterns

**Archivo:** `9FoTERLTyDXz3gmPLjjJ09` — página `Patterns 🚧`  
**Protocolo especializado:** [`audit-patterns.md`](audit-patterns.md) — ejecutar completo.

### Resumen de dominios

| Dominio | Peso | Qué verifica |
|---|---|---|
| **P1 — Estructura frame** | Crítico | Header, body, secciones, mob-row y tabla presentes |
| **P2 — Contenido** | Crítico | Lede claro, reglas accionables, sin tecnicismos |
| P3 — Componentes | Medio | Instancias reales del DS en cards y phones |
| **P4 — .md sync** | Crítico | `.md` existe y refleja el frame Patrón sin discrepancias |

**Score L6:** X/4 dominios en PASS  
**Gate:** P1, P2, P4 deben ser PASS para release.

---

## 7. Layer 5 — Release gate

### Cadencia hacia un nuevo dist

El camino a una nueva versión de `dist/` corre **una sola Full audit en el gate** — no auditoría Triggered por componente. Los cambios de cada componente se acumulan como delta (ver `design-system-rules.md §Versionado`); la validación completa L1→L6 se ejecuta una única vez, justo antes del corte. Las auditorías Triggered/Spot (§1) siguen disponibles para trabajo ad-hoc fuera del camino de release.

### Scoring unificado

```
Score sistema = suma ponderada:

  L1 Token      → peso 0.30  (fuente de verdad)
  L2 Icons      → peso 0.15
  L3 DS         → peso 0.28
  L4 Chain      → peso 0.20
  L6 Patterns   → peso 0.07

Score por layer = (dominios/checks en PASS) / (total dominios/checks) × 10
Score sistema   = L1×0.30 + L2×0.15 + L3×0.28 + L4×0.20 + L6×0.07
```

### Pre-condición de release — CI gate

Antes de aprobar cualquier release, el workflow de CI (`.github/workflows/audit.yml`) debe haber corrido verde en el commit de release. Los checks automatizados cubren:
- V2: tokens.css sin undefined/NaN + oklch presente + 3 archivos de entrega existen
- V4: CSS components sin HEX hardcodeados
- V3: todos los .md con las 8 secciones requeridas

Los checks que requieren acceso a Figma (pre-flight §5 scope dinámico, C1 cascade binding, L2 Icons) se ejecutan manualmente antes de cada Full audit y su resultado se commitea en el historial §11.

**Audit report:** el output completo de cada Full audit debe commitearse en el mismo PR/commit de release. Formato: una entrada en la tabla §11 con fecha, score, BLOCKERs y WARNs. Sin audit commitado = release no aprobado.

### Release decision

| Condición | Decisión |
|---|---|
| CI verde + Score sistema ≥ 9.5 + 0 BLOCKERs | ✅ RELEASE APROBADO |
| CI verde + Score sistema ≥ 8.0 + 0 BLOCKERs + WARNs documentados | ⚠️ RELEASE CON OBSERVACIONES |
| CI falla O Score sistema < 8.0 O ≥ 1 BLOCKER | ❌ RELEASE BLOQUEADO |

### BLOCKERs automáticos — cualquiera bloquea release

- Valor hardcodeado (HEX, px) fuera de la capa Primitives
- Token semántico con valor directo (no alias)
- Primitive usado directamente en un componente DS
- Variable local en DS que replica un semántico de Tokens
- Componente DS con ícono no proveniente de Icons library
- Build dist con errores o valores `undefined`
- CSS de componente con `border-color`, `background` o `color` visible sin binding correspondiente en Figma (V4)
- Componente activo sin `.md`
- `.md` con variante o token que no existe en Figma/dist
- Pattern con frame Patrón en Figma sin `.md` en `docs/patterns/`
- `.md` de pattern con reglas que no coinciden con el frame Figma
- JSON con variable activa en producción sin correspondencia en Figma
- Icons con modos obsoletos en snapshot publicado

---

## 8. Tipos de hallazgo

| Nivel | Símbolo | Criterio | Impacto en release |
|---|---|---|---|
| Blocker | 🔴 | Rompe cadena, impide implementación correcta, inconsistencia UX↔código | **Detiene release** |
| Warning | 🟡 | Inconsistencia parcial, deuda técnica acumulable, doc incompleta | Release con condición |
| Info | 🔵 | Mejora de calidad, convención, optimización | Backlog |

| Tipo | Descripción |
|---|---|
| **Estructural** | Rompe arquitectura de capas (HEX en componente, component token, variable local en DS) |
| **Sincronización** | Desalineación entre capas (Figma sin doc, JSON sin dist, .md sin Figma) |
| **Gobernanza** | Violación de naming, scope o proceso |
| **Calidad** | No rompe el sistema pero reduce mantenibilidad |

---

## 9. Proceso de validación

> **Regla de proceso — no negociable.**

La auditoría es diagnóstico y reporte. Ningún cambio se aplica sin validación explícita del responsable.

```
[1] Detectar  → registrar el hallazgo con diagnóstico claro
[2] Clasificar → severidad + tipo
[3] Proponer  → describir la acción correctiva concreta
[4] Esperar   → NO ejecutar hasta recibir aprobación explícita
[5] Aplicar   → solo después de "sí, procede"
[6] Verificar → confirmar que el cambio resolvió el hallazgo
```

---

## 10. Output de auditoría

### Por hallazgo

```
[{Layer}-{Check}-{seq}] {Blocker | Warning | Info}
Capa:      {Token | Icons | DS | Chain}
Archivo:   {figma file key | json path | dist file | .md path}
Elemento:  {nombre de variable / CS / nodo / token}
Hallazgo:  {descripción exacta de qué falla y por qué}
Acción:    {corrección específica — en qué archivo/nodo, qué cambiar}
Estado:    Pending | In-progress | Resolved
```

### Resumen final

```markdown
# Auditoría DS — {fecha}
Tipo: Full / Triggered / Spot
Trigger: {motivo}

## Score global: {X.X}/10

| Layer | Peso | Score | BLOCKERs | WARNs |
|---|---|---|---|---|
| L1 — Token    | 35% | X/10 | N | N |
| L2 — Icons    | 15% | X/10 | N | N |
| L3 — DS       | 30% | X/10 | N | N |
| L4 — Chain    | 20% | X/10 | N | N |
| L6 — Patterns | 7%  | X/10 | N | N |
| **SISTEMA**   | —   | **X.X/10** | **N** | **N** |

## Decisión de release: ✅ APROBADO / ⚠️ CON OBSERVACIONES / ❌ BLOQUEADO

## Validación de cadena
Tokens ✓/✗ → Icons ✓/✗ → DS ✓/✗ → JSON ✓/✗ → dist ✓/✗ → .md ✓/✗

Quiebres detectados:
- {capa}: {descripción}

## Hallazgos

### 🔴 Blockers
| # | Capa | Elemento | Hallazgo | Acción |
|---|---|---|---|---|

### 🟡 Warnings
| # | Capa | Elemento | Hallazgo | Acción |
|---|---|---|---|---|

### 🔵 Info / Backlog
| # | Capa | Elemento | Hallazgo | Acción |
|---|---|---|---|---|

## Acciones priorizadas
1. {acción concreta — capa — urgencia}

## Condición de desbloqueo (si aplica)
{qué debe resolverse exactamente para aprobar el release}
```

---

## 11. Historial de auditorías

| Fecha | Tipo | Score | BLOCKERs | WARNs | Decisión | Notas |
|---|---|---|---|---|---|---|
| 2026-04-23 | Full | 10/10 | 0 | 0 | ✅ APROBADO | Auditoría inicial — 16 hallazgos resueltos en sesión |
| 2026-04-24 | Triggered | ⚠️ L2: 9/10 | 0 | 1 | ⚠️ CON OBSERVACIONES | D3 Icons resuelto (222 vectores). D5 snapshot pendiente verificación desde consumidor |
| 2026-04-25 | Spot | 10/10 | 0 | 0 | ✅ APROBADO | Cascade component audit: 3 UNBOUND_RADIUS corregidos (radio/checkbox/badge) |
| 2026-04-27 | Full | 8.65/10 | 0 | 3 | ⚠️ CON OBSERVACIONES | Full audit v2.0: B1+B2 resueltos (semantics-color.json alias + badge.md token); W4 (4 docs focus-ring-gap-default); W5 (tag añadido a CS list). WARNs activos: W1 (doc page sync), W2 (derivacion-out), W3 (chips focus state) |
| 2026-04-27 | Fix | 10/10 | 0 | 0 | ✅ APROBADO | W1+W2+W3 resueltos: doc page token name sync (Tokens lib), icon rename derivacion-out (Icons lib), chips CS focus state añadido (2×2 grid, ring-default + ring-gap-default). Pendiente: publicar 3 librerías en Figma UI |
| 2026-04-30 | Full | 9.88/10 | 0 | 3 | ✅ APROBADO | Pre-release Full audit: W1 toggle thumb radius/pill bindeado, W2 notification doc link añadido, W3 button.md focus-ring-gap tokens corregidos. 0 BLOCKERs. Release a dev aprobado. |
| 2026-04-30 | Full (2nd) | 10/10 | 0 | 0 | ✅ APROBADO | Auditoría exhaustiva pre-release v0.2.1: B1 button.md outline-offset (color→px+box-shadow), B2 chips.md label/icon filled tokens (→inverse), W4–W9 docs corregidos (tabs, radio-button, chips HTML, audit protocol), W-02/W-03/I-06 design-system-rules, I-03 tokens-map, I-04 component-guide. Fundación congelada. |
| 2026-04-30 | Full Cascade | 10/10 | 0 | 0 | ✅ APROBADO | Cascade audit L1→L2→L3→L4→L5 + fixes: W-01 doc Focus names corregidos en Figma, W-02 modo neutral formalizado en protocolos, W-03 script C1 excluye COMPONENT_SET root. D5 Icons snapshot verificado manualmente. 0 issues abiertos. |
| 2026-04-30 | Gap Verification | 10/10 | 0 | 0 | ✅ APROBADO | 3 gaps explícitos verificados: (1) text styles DS — 329/329 TEXT en COMPONENT_SET/COMPONENT usan estilo remoto de Tokens library (100%); (2) primitives WCAG — 102/102 hex coinciden con doc page 41:106; (3) scope DS — 21 CS/COMPONENT totales, 0 fuera de scope. C1+C5 en 4 nodos previamente no auditados (icon/semantic, icon/brand, layout/grids, _slot): PASS. |

---

## Apéndice A — Checks críticos de referencia rápida

Al iniciar cualquier auditoría, estos son los checks de mayor impacto:

```
Token library
  □ D3 — ningún semántico alias a otro semántico (max 2 niveles)
  □ D5 — 100% semánticos con codeSyntax WEB
  □ S1 — Figma Primitives = JSON primitivos (sin huérfanos)
  □ S2 — Figma Semantics = JSON semánticos (alias correctos)

Icons library
  □ D3 — todos los vectores system con context-color local (ID 40002056:1518)
  □ D4 — cero nodos con explicitVariableModes apuntando a colección externa
  □ D5 — snapshot publicado sin modos obsoletos
  □ D6 — 5 aliases de context-color al Tokens actual (default/inverse/brand/disabled/neutral)

DS components
  □ C1 — 0 fills/strokes hardcoded en ningún CS (excluir stroke visual de COMPONENT_SET root)
  □ C1 — radius verificado vía topLeftRadius (no solo cornerRadius shorthand)
  □ C1 — 0 DANGLING_BINDING (getVariableByIdAsync retorna null → variable renombrada/eliminada)
  □ C1 — usar getVariableByIdAsync (async) — getVariableById (sync) devuelve null en cross-library
  □ C1 — 100% TEXT en COMPONENT_SET/COMPONENT usan textStyle REMOTO (S: prefix) de Tokens library
  □ C1 — scope = 21 nodos (17 páginas ❖ + icon/semantic + icon/brand + layout/grids + _slot)
  □ C1 — _slot y sus instancias: UNBOUND_FILL/NO_TEXT_STYLE esperados → ignorar (utility placeholder)
  □ C2 — 0 vectores sueltos; íconos = instancias de Icons library
  □ C3 — 0 variables locales en DS
  □ C4.4 — estados requeridos: default/hover/active/focus/disabled en todos los CS interactivos
  □ C5 — 100% de ComponentSets con documentation link → página Figma del componente
  □ Pre-flight 5 — scope dinámico: unregistered = [] y missing = [] (script §2 pre-flight)
  □ Pre-flight 6 — scope check: 0 CS/COMPONENT en páginas fuera de lista §3-L3
  □ Pre-flight 7 — WCAG primitives: hex doc page 41:106 = hex Primitives collection (0 diff)

Chain
  □ CI — workflow .github/workflows/audit.yml verde antes de release
  □ V2 — npm run build → exit code 0
  □ V2 — grep "undefined" dist/V.0.1.0/tokens.css → 0 resultados
  □ V3 — cada .md tiene 8 secciones obligatorias
  □ V3 — tokens-map.md sin huérfanas respecto a dist/V.0.1.0/tokens.css
  □ V4 — grep "border-color" en todos los CSS de componentes → cada valor no-transparent tiene stroke en Figma
  □ V4 — grep "background:" en todos los CSS de componentes → cada valor no-transparent tiene fill en Figma
  □ V4 — dirección inversa: strokes/fills en Figma → propiedad correspondiente en CSS
  □ A11y — WCAG 1.4.11: bordes de inputs, indicadores de focus e íconos ≥3:1 sobre su fondo
  □ A11y — WARN documentado: --color-border-default sobre blanco = 1.66:1 (deuda conocida)
```

---

## Apéndice B — Tokens de sistema (referencia)

| Token | ID Figma | Valor |
|---|---|---|
| `radius/pill` | `VariableID:46edf422.../301:273` | 999px |
| `radius/sm` | `VariableID:fe4654de.../301:xxx` | 8px |
| `radius/xs` | `VariableID:8708eef3.../301:267` | 4px |
| `icon/system/context-color` | `VariableID:40002056:1518` | (alias a Tokens Semantics) |

> Los IDs completos se obtienen en cada sesión vía `figma.variables.getVariableByIdAsync()`. Usar los nombres como referencia canónica; los IDs pueden cambiar si la variable es recreada.
