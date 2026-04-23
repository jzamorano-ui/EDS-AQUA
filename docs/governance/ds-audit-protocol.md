# DS Audit Protocol

**Versión:** 1.2  
**Rol:** Arquitecto Senior de Design Systems  
**Aplicación:** auditoría completa o parcial del sistema OPS-Library-[Aqua]

---

## 1. Fuente de verdad y alcance

### Cadena de dependencias

```
Token → Icons → DS → Figma docs → JSON → dist → .md
```

Cada capa hereda de la anterior. Ninguna puede redefinir lo que ya existe arriba.

### Librerías Figma

| Librería | URL | Rol |
|---|---|---|
| **Token** | https://www.figma.com/design/ml3ScFhJNwgs6xZpKUKuok | Fuente de verdad única |
| **Icons** | https://www.figma.com/design/zIbuWAvLhwTlwnVwbDgY5n | Consume Token |
| **DS** | https://www.figma.com/design/9FoTERLTyDXz3gmPLjjJ09 | Consume Token + Icons |

### Documentación de tokens en Figma

Referencia obligatoria: `node-id=41-106` (OPS-Library-[Aqua] Tokens)

**Regla crítica:** Cada variable creada en la librería Token debe estar documentada en esa página. La documentación debe ser el reflejo exacto de las variables existentes — ni más ni menos.

Falta de documentación de token = **🔴 BLOCKER** potencial.

---

## 2. Capas auditables

| Capa | Descripción | Dependencias |
|---|---|---|
| **Token** | Primitives + semánticos. Fuente de verdad. | — |
| **Icons** | Componentes de ícono. Consume Token. Sin lógica propia. | Token |
| **DS** | Componentes de interfaz. Consume Token + Icons. | Token + Icons |
| **Figma docs** | Documentación visible en Token (node 41:106). Debe reflejar variables exactas. | Token |
| **JSON** | Exportación de Token para código. Formato DTCG. | Token |
| **dist** | Output compilado por Style Dictionary v4 (`tokens.css`, `layout.css`, `tokens.js`). | JSON |
| **.md** | Documentación de componentes en markdown. | DS + Figma |

### Reglas de capa — no negociables

- Token = única fuente de verdad
- Semánticos = alias de primitives (0 valores hardcodeados)
- Componentes = solo tokens semánticos (nunca primitives directo)
- Sin component tokens
- Icons = no define lógica paralela a Token
- DS = no redefine ni duplica fundamentos de Token
- JSON refleja Token exactamente
- dist refleja JSON exactamente
- `.md` refleja Figma exactamente
- Figma no puede contradecir JSON, dist ni `.md`

---

## 3. Tipos de auditoría

| Tipo | Cuándo | Alcance |
|---|---|---|
| **Full** | Antes de release o publicación de librería | Todas las dimensiones (DIM-A → DIM-H) |
| **Triggered** | Al crear nuevo token, componente o actualizar docs | Dimensiones afectadas (ver tabla de triggers) |
| **Spot** | Corrección de hallazgo puntual | Dimensión afectada + validación de cadena parcial |
| **Post-fix** | Después de corregir un BLOCKER | DIM afectada + DIM-G + DIM-H |

### Triggers y alcance mínimo

| Trigger | Dimensiones obligatorias |
|---|---|
| Nuevo token primitivo o semántico | DIM-A · DIM-B · DIM-G + documentar en Figma docs |
| Nuevo componente | DIM-C · DIM-D · DIM-F · DIM-H |
| Cambio de token existente | DIM-A · DIM-C · DIM-G |
| Release a desarrollo | **Todas (DIM-A → DIM-H)** |
| Cambio en breakpoints / layout | DIM-A · DIM-G |
| Actualización de doc de componente | DIM-F · DIM-H |
| Publicación de librería Figma | DIM-A · DIM-B · DIM-F · DIM-G |

---

## 4. Proceso de validación y aprobación

> **Regla de proceso — no negociable.**

La auditoría es un proceso de diagnóstico y reporte. **Ningún cambio se aplica sin validación explícita del responsable del sistema.**

### Flujo obligatorio por hallazgo

```
[1] Detectar → registrar el hallazgo con diagnóstico claro
[2] Clasificar → severidad + tipo (ver sección 7)
[3] Proponer → describir la acción correctiva concreta
[4] Esperar → no ejecutar hasta recibir aprobación explícita
[5] Aplicar → solo después de "sí, procede" o equivalente
[6] Verificar → confirmar que el cambio resolvió el hallazgo
```

### Reglas del proceso

| Regla | Descripción |
|---|---|
| Diagnóstico primero | Reportar el hallazgo antes de tocar nada. Nunca encadenar detección + corrección automáticamente. |
| Propuesta clara | Describir qué se va a cambiar, en qué capa, en qué nodo/archivo, y por qué. |
| Aprobación explícita | Esperar confirmación del responsable antes de ejecutar. Un silencio o "mira esto" no es aprobación. |
| Un hallazgo a la vez | Si hay múltiples hallazgos, presentar todos primero como tabla. Luego esperar aprobación por bloque o por ítem. |
| Verificación post-fix | Después de aplicar un cambio, confirmar que el estado final es el esperado y reportarlo. |
| Sin rollback silencioso | Si un fix aplicado resulta incorrecto, reportar inmediatamente y esperar instrucción antes de revertir. |

> Esta regla aplica a: rebindings en Figma, creación o edición de variables, ediciones de JSON/CSS/.md, cualquier cambio en archivos del sistema.

---

## 5. Orden de ejecución

Seguir este orden estrictamente. No saltar capas. Si una capa falla con BLOCKER, documentar y continuar para registrar el estado completo del sistema.

```
[1] Token (Figma)          → validar primitives + semánticos + documentación interna
[2] Icons (Figma)          → validar consumo de Token + estructura
[3] DS — componentes       → validar consumo Token + Icons + estructura interna
[4] Figma docs             → validar reflejo exacto de variables (node 41:106)
[5] JSON                   → validar alineación con Token (naming, valores, alias)
[6] dist                   → validar output de Style Dictionary (CSS + JS)
[7] .md de componentes     → validar alineación con Figma + tokens + variantes
[8] Validación de cadena   → cross-check completo entre todas las capas
[9] Evaluación y reporte   → clasificar hallazgos, calcular score, decisión de release
```

---

## 6. Dimensiones

### DIM-A — Consistencia vertical

**Objetivo:** Sin ruptura entre capas. Todo remite a Token.

Verificar que:
- Cada token semántico es alias de un primitive existente
- Ninguna capa introduce valores que no existen en Token
- La cadena Token → Icons → DS → JSON → dist → .md no tiene quiebres

### DIM-B — Consistencia horizontal

**Objetivo:** Naming uniforme, escalas coherentes, sin duplicados entre librerías.

Verificar que:
- Naming sigue el formato `topic/property/role/state` (kebab-case en CSS: `topic-property-role-state`)
- `state` siempre explícito (incluyendo `default`)
- Sin nombres de componentes en tokens
- Sin duplicación de tokens entre colecciones o librerías
- Sin escalas paralelas o redundantes

### DIM-C — Consumo de tokens

**Objetivo:** Componentes usan exclusivamente tokens semánticos. Sin excepciones.

Verificar que:
- Todos los fills, strokes, radii, spacing, type de componentes están bindeados a variables semánticas
- Ningún componente usa primitives directos
- Ningún valor está hardcodeado (HEX, px directo, etc.)
- No existen component tokens propios

### DIM-D — Integración de Icons

**Objetivo:** Icons se usa como librería, no como fuente de vectores sueltos.

Verificar que:
- Los íconos en DS provienen de la librería OPS-Library-[Aqua] Icons
- No existen vectores, paths o SVGs sueltos dentro de componentes DS
- Icons no define colores, tamaños ni espaciado propios — consumen Token
- El token `icon/system/context-color` se usa con `currentColor` en implementación

### DIM-E — Integridad de DS

**Objetivo:** DS no redefine, no duplica, no contradice Token.

Verificar que:
- DS no crea variables locales que repliquen semánticos de Token
- DS no introduce breakpoints, tipografías ni colores propios
- Todos los componentes en DS están vinculados a librerías oficiales (Token + Icons)
- No existen estilos locales que dupliquen variables de Token

### DIM-F — Figma ↔ documentación

**Objetivo:** La documentación en Figma (node 41:106) es el reflejo exacto de las variables.

Verificar que:
- Cada variable en la colección Semantics tiene su fila en la sección correspondiente del doc page
- Cada variable en la colección Primitives está representada en su sección
- No hay filas documentadas para tokens que no existen como variable
- Los nombres en la doc coinciden con los nombres de las variables (formato CSS)
- Los swatches de color están bindeados a la variable correspondiente (no hardcodeados)
- Las descripciones son correctas y consistentes
- Componentes documentados tienen variantes alineadas con las de Figma
- Nombres de capas en doc coinciden con los nombres reales del componente

### DIM-G — Figma ↔ JSON ↔ dist

**Objetivo:** La cadena de exportación es exacta y sin pérdidas.

Verificar que:
- Todos los tokens en JSON existen como variables en Token (Figma)
- Todos los tokens en Token (Figma) existen en JSON
- Los alias en JSON apuntan a tokens válidos (sin referencias rotas)
- dist no contiene valores `undefined`
- dist contiene output dual por token de color: HEX fallback + oklch override
- Unidades son correctas (`px` para dimensiones, `rem` donde corresponda)
- Los 3 archivos dist están generados: `tokens.css`, `layout.css`, `tokens.js`
- `node sd.config.mjs` compila limpio (0 errores)

### DIM-H — Readiness de release

**Objetivo:** El sistema está cohesionado y listo para ser consumido.

Verificar que:
- Cada componente activo en DS tiene su `.md` correspondiente en `/Docs`
- Cada `.md` refleja las variantes actuales de Figma (tokens, estados, ARIA, keyboard)
- El build de dist está actualizado respecto al JSON actual
- La librería Token está publicada con todos los cambios pendientes
- No existen tokens creados localmente en DS sin pasar por Token
- No existen hallazgos 🔴 BLOCKER sin resolver

---

## 7. Audit de componentes — dimensión individual

Cada componente activo debe auditarse individualmente siguiendo esta secuencia:

### 6.1 Consumo de tokens

Verificar por propiedad:

| Propiedad | Qué verificar |
|---|---|
| Color (fill / bg) | Variable semántica bindeada. Sin hardcode, sin primitive. |
| Color (text / fg) | Variable semántica bindeada. |
| Border / stroke | Variable semántica. Ancho dentro de escala (excepción documentada si aplica). |
| Radius | Variable semántica de radius. |
| Spacing / padding | Variable semántica de spacing. |
| Typography | Text style de la librería Token. Sin binding directo a fontSize/fontFamily/fontWeight. |
| Effects / elevation | Variable semántica de elevation si aplica. |

### 6.2 Consistencia interna

- Misma lógica de tokens en todos los estados del componente
- Estados (default / hover / active / disabled / focus) son coherentes entre sí
- Sin excepciones arbitrarias entre variantes del mismo componente

### 6.3 Estructura de capas

- Nombres de capas coinciden con los definidos en el `.md`
- Sin duplicación de capas o frames innecesarios
- Sin dependencia de overrides manuales en instancias

### 6.4 Excepción controlada — Focus

El estado focus puede tener estructura distinta (anillo externo, offset, doble anillo). **No marcar como error** si:
- Responde a criterios de accesibilidad (WCAG 2.2 AA — contraste mínimo 3:1 del indicador)
- Usa tokens semánticos de focus (`color/focus/ring-*`, `focus/ring-width`)
- Es consistente a nivel sistema (mismo patrón en todos los componentes)

---

## 8. Tipos de hallazgo

### Por severidad

| Nivel | Símbolo | Criterio | Acción |
|---|---|---|---|
| Blocker | 🔴 BLOCKER | Rompe la cadena, impide release o genera inconsistencia UX↔código | Resolver antes de liberar. Release bloqueado. |
| Warning | 🟡 WARNING | Inconsistencia parcial, riesgo técnico futuro, doc incompleta | Resolver en el ciclo actual si es posible. |
| Info | 🔵 INFO | Mejora de calidad, convención, optimización sin impacto funcional | Registrar, resolver sin urgencia. |

### Por tipo

| Tipo | Descripción |
|---|---|
| **Estructural** | Rompe la arquitectura de capas (ej: primitive en componente, component token, hardcode) |
| **Sincronización** | Desalineación entre capas (ej: variable en Figma sin doc, JSON sin equivalente en dist) |
| **Gobernanza** | Violación de regla de naming, scope o proceso (ej: token con nombre de componente) |
| **Calidad** | No rompe el sistema pero reduce mantenibilidad (ej: descripción faltante, orden irregular) |

---

## 9. Checks críticos

Los siguientes hallazgos son automáticamente 🔴 BLOCKER:

- Valor hardcodeado (HEX, px, nombre) fuera de la capa primitives
- Primitive usado directamente en un componente
- Token semántico con valor directo (no alias)
- Component token creado dentro de DS o Icons
- Variable en Token sin fila en la documentación de Figma (node 41:106)
- Token en JSON sin correspondencia en Token (Figma)
- dist con valores `undefined` o alias rotos
- Componente activo sin `.md`
- `.md` con tokens o variantes que no existen en Figma
- Icons con vectores sueltos no provenientes de la librería oficial
- DS con variables locales que replican semánticos de Token

Los siguientes son 🟡 WARNING:

- Token documentado en Figma con swatch hardcodeado (no bindeado a variable)
- `.md` con tokens correctos pero descripción desactualizada
- Espaciado o radius con valor fuera de escala sin excepción documentada
- Componente sin ARIA o keyboard en `.md`
- Build con warnings no fatales en Style Dictionary

---

## 10. Método de evaluación

### Score por capa

Cada capa se evalúa con el siguiente criterio:

| Estado | Símbolo | Criterio |
|---|---|---|
| Aprobado | ✅ | 0 blockers, ≤ 3 warnings, issues documentados |
| Con advertencias | ⚠️ | 0 blockers, > 3 warnings o warnings críticos |
| Rechazado | ❌ | 1 o más blockers sin resolver |

### Validación de cadena completa

Verificar el flujo completo en este orden:

```
Token (Figma)
  └─ ¿Variables primitivas con valores reales? ✓/✗
  └─ ¿Semánticos = alias de primitives? ✓/✗
  └─ ¿Documentación en node 41:106 refleja todas las variables? ✓/✗

Icons (Figma)
  └─ ¿Consume Token? ✓/✗
  └─ ¿Sin vectores sueltos? ✓/✗
  └─ ¿Sin lógica propia? ✓/✗

DS — Componentes (Figma)
  └─ ¿Solo tokens semánticos? ✓/✗
  └─ ¿Icons desde librería oficial? ✓/✗
  └─ ¿Sin component tokens? ✓/✗

Figma docs (node 41:106)
  └─ ¿Cada variable tiene su fila? ✓/✗
  └─ ¿Swatches bindeados a variables? ✓/✗
  └─ ¿Sin filas huérfanas? ✓/✗

JSON
  └─ ¿Todos los tokens de Token presentes? ✓/✗
  └─ ¿Alias válidos (sin referencias rotas)? ✓/✗
  └─ ¿0 valores hardcodeados? ✓/✗

dist
  └─ ¿Build limpio (0 errores)? ✓/✗
  └─ ¿0 valores undefined? ✓/✗
  └─ ¿HEX + oklch presentes en todos los colores? ✓/✗
  └─ ¿3 archivos generados? ✓/✗

.md de componentes
  └─ ¿Cada componente activo tiene su .md? ✓/✗
  └─ ¿Tokens en .md coinciden con Figma? ✓/✗
  └─ ¿Variantes en .md coinciden con Figma? ✓/✗
```

---

## 11. Formato de salida

```markdown
# Auditoría DS — [versión / fecha]
Ejecutada por: [rol]
Tipo: Full / Triggered / Spot / Post-fix
Trigger: [motivo]

---

## Resumen ejecutivo

Estado general: ✅ Aprobado / ⚠️ Con advertencias / ❌ Rechazado
Blockers pendientes: N
Warnings activos: N
Decisión de release: APROBADO / BLOQUEADO

---

## Estado por capa

| Capa | Estado | Blockers | Warnings | Notas |
|---|---|---|---|---|
| Token (Figma) | ✅/⚠️/❌ | N | N | |
| Icons (Figma) | ✅/⚠️/❌ | N | N | |
| DS — Componentes | ✅/⚠️/❌ | N | N | |
| Figma docs | ✅/⚠️/❌ | N | N | |
| JSON | ✅/⚠️/❌ | N | N | |
| dist | ✅/⚠️/❌ | N | N | |
| .md componentes | ✅/⚠️/❌ | N | N | |

---

## Validación de cadena

Token ✓/✗ → Icons ✓/✗ → DS ✓/✗ → Figma docs ✓/✗ → JSON ✓/✗ → dist ✓/✗ → .md ✓/✗

Quiebres detectados:
- [capa]: [descripción del quiebre]

---

## Tabla de hallazgos

| # | Capa | Componente | Dimensión | Tipo | Problema | Severidad | Acción | Estado |
|---|---|---|---|---|---|---|---|---|
| 1 | | | | | | 🔴/🟡/🔵 | | Abierto/Resuelto |

---

## Riesgos

- [descripción del riesgo y su impacto potencial]

---

## Acciones priorizadas

### 🔴 Blockers (resolver antes de release)
1. [acción concreta — capa — responsable]

### 🟡 Warnings (resolver en ciclo actual)
1. [acción concreta — capa]

### 🔵 Info (backlog)
1. [acción concreta — capa]

---

## Decisión final

**Release:** APROBADO / NO APROBADO

**Justificación:**
[razón clara y directa basada en los hallazgos]

**Condición de desbloqueo (si aplica):**
[qué debe resolverse para aprobar el release]
```

---

## Apéndice — Reglas de naming

| Segmento | Definición | Ejemplos |
|---|---|---|
| `topic` | Categoría técnica | `color` · `space` · `type` · `radius` · `stroke` · `elevation` · `layout` |
| `property` | Propiedad afectada | `bg` · `text` · `border` · `icon` · `focus` |
| `role` | Intención semántica | `primary` · `secondary` · `neutral` · `success` · `warning` · `danger` · `info` |
| `state` | Estado de interacción | `default` · `hover` · `active` · `disabled` · `focus` · `inverse` |

**Formato Figma:** `topic/property/role/state`  
**Formato CSS:** `topic-property-role-state`  
**Regla:** `state` siempre explícito · sin nombres de componentes · sin idiomas mezclados
