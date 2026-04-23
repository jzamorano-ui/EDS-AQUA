# Aqua Design System — Guía completa

**Versión:** 0.1.0 · Piloto  
**Sistema:** OPS · Producto interno  
**Stack:** MUI + DTCG Tokens + CSS/TypeScript  

Este documento es la referencia central del sistema de diseño Aqua. Cubre qué es, cómo funciona, cuándo usar cada componente, reglas de gobernanza y respuestas a las preguntas más frecuentes del equipo.

---

## 1. Qué es el Design System

El DS Aqua es un conjunto de tokens, componentes y documentación que define el lenguaje visual del producto OPS. No es una librería de assets genéricos — es un contrato entre diseño y desarrollo.

**Qué resuelve:**
- Consistencia visual entre pantallas y equipos
- Velocidad de diseño — no reinventar componentes existentes
- Accesibilidad garantizada por construcción (WCAG 2.2 AA)
- Un solo lugar de verdad: Figma Library + código

**Qué NO es:**
- Un reemplazo del criterio de diseño
- Una colección de templates o pantallas completas
- Un sistema que aprueba todos los casos de uso

**Figma Libraries:**
- `OPS-Library-[Aqua] Tokens` — fuente de verdad de tokens
- `OPS-Library-[Aqua] Icons` — iconografía del sistema
- `OPS-Library-[Aqua] DS-Piloto` — componentes certificados

---

## 2. Arquitectura de tokens

Los tokens son variables con nombre que conectan las decisiones de diseño con el código. Hay tres capas:

```
Primitives → Semantics → Componentes
```

### Primitives
Valores crudos. No se usan directamente en diseño ni código.
- Ejemplo: `color-blue-500: #0043CE`
- Son la fuente de verdad cromática y de escala

### Semantics
Aliases con intención. Esto es lo que usan los componentes.
- Ejemplo: `color-bg-action-primary-default → {color-blue-500}` ... en este DS usa slate
- La intención está en el nombre: qué elemento, qué propiedad, qué rol, qué estado

### Naming de tokens
Formato: `topic-property-role-state`
- `topic` → color, space, radius, stroke, type
- `property` → bg, text, icon, border
- `role` → primary, secondary, action, status, semantic
- `state` → default, hover, active, disabled, focus

**Ejemplo:** `--color-text-status-danger-default` = color de texto para mensajes de error

### Escala de espaciado
| Token | Valor |
|---|---|
| `--space-2xs` | 4px |
| `--space-xs` | 8px |
| `--space-sm` | 12px |
| `--space-md` | 16px |
| `--space-lg` | 24px |
| `--space-xl` | 32px |
| `--space-2xl` | 48px |

### Escala de radio
| Token | Valor |
|---|---|
| `--radius-xs` | 4px |
| `--radius-sm` | 8px |
| `--radius-md` | 12px |
| `--radius-pill` | 999px |

### Tipografía
**Familia:** Noto Sans

| Estilo | font-size | font-weight | line-height |
|---|---|---|---|
| `caption/sm-regular` | 12px | 400 | 16px |
| `caption/sm-medium` | 12px | 500 | 16px |
| `body/md-regular` | 14px | 400 | 20px |
| `body/md-medium` | 14px | 500 | 20px |
| `body/md-bold` | 14px | 700 | 20px |
| `body/lg-regular` | 16px | 400 | 24px |
| `body/lg-bold` | 16px | 700 | 24px |

---

## 3. Guía de selección de componentes

### ¿Cuándo uso cada componente de acción?

| Necesidad | Componente |
|---|---|
| Ejecutar una acción (guardar, enviar, confirmar) | `button` |
| Navegar a otra pantalla o URL | `link` |
| Acción visual que parece link pero ejecuta lógica | `button variant=Tertiary` |
| Activar o desactivar una configuración con efecto inmediato | `toggle` |
| Seleccionar una opción entre varias (independientes) | `checkbox` |
| Seleccionar una sola opción entre varias (excluyentes) | `radio button` |
| Filtrar contenido dentro de la misma vista | `chips` |

### ¿Cuándo uso cada componente de feedback?

| Necesidad | Componente |
|---|---|
| Mensaje del sistema que el usuario debe leer (info, error, éxito) | `alert` |
| Indicar cantidad o estado en un elemento (ej. notificaciones pendientes) | `badge` |
| Indicar estado semántico de un ítem (activo, inactivo, pendiente) | `badge/state` |
| Texto explicativo corto al hacer hover sobre un elemento | `tooltip` |
| Proceso en curso sin tiempo estimado | `spinner` |

### ¿Cuándo uso cada componente de clasificación?

| Necesidad | Componente |
|---|---|
| Indicar a qué categoría pertenece un elemento | `tag` |
| Seleccionar o filtrar por categoría (interactivo) | `chips` |
| Mostrar un estado activo de navegación | `tabs` |

### ¿Cuándo uso cada componente de entrada?

| Necesidad | Componente |
|---|---|
| Campo de texto libre (nombre, email, descripción) | `text-field` |
| Selección única entre pocas opciones visibles | `radio button` |
| Selección múltiple o confirmación (acepto términos) | `checkbox` |
| Activar/desactivar configuración | `toggle` |

---

## 4. Diferencias entre componentes similares

### Badge vs Chip vs Tag

Estos tres componentes se ven parecidos pero tienen propósitos completamente distintos.

| | Badge | Chip | Tag |
|---|---|---|---|
| **Para qué** | Cantidad o estado en un elemento | Selección o filtro activo | Clasificación de categoría |
| **Interactivo** | No | Sí | No |
| **Comunica** | "Cuántos" o "en qué estado está" | "Esto está seleccionado/filtrado" | "A qué categoría pertenece" |
| **Ejemplo** | 3 notificaciones pendientes | Filtro "Urgente" activo | Categoría "Dental" |
| **Se confunde con** | Badge/state | Tag (visualmente) | Chip (visualmente) |

**Regla rápida:** si el usuario puede hacer clic para activar/desactivar → `chip`. Si solo informa → `tag` o `badge`.

### Badge vs Badge/state

| | Badge | Badge/state |
|---|---|---|
| **Muestra** | Número o punto | Estado semántico con texto |
| **Variantes** | Número · Dot | Neutral · Info · Success · Warning · Danger |
| **Ejemplo** | "12 mensajes" · punto rojo | "Activo" · "Pendiente" · "Error" |

### Button vs Link

| | Button | Link |
|---|---|---|
| **Para qué** | Ejecutar una acción | Navegar a una URL |
| **Elemento HTML** | `<button>` | `<a href>` |
| **Resultado** | Ocurre algo en la app | El usuario va a otro lugar |
| **Ejemplo** | "Guardar" · "Enviar" · "Eliminar" | "Ver política de privacidad" · "Ir a configuración" |

**Error frecuente:** usar `<a>` para acciones o `<button>` para navegación. Si visualmente parece link pero ejecuta lógica → `button variant=Tertiary`.

### Toggle vs Checkbox vs Radio

| | Toggle | Checkbox | Radio |
|---|---|---|---|
| **Cuántas opciones** | Una (on/off) | Una o varias | Una de varias |
| **Efecto** | Inmediato | Requiere confirmación (submit) | Requiere confirmación (submit) |
| **Ejemplo** | "Activar notificaciones" | "Acepto términos y condiciones" | "Frecuencia: diaria / semanal / mensual" |
| **Grupo** | No | Checkbox group | Radio group |

**Regla:** toggle solo cuando el cambio se aplica al instante sin necesitar "guardar". Si el usuario tiene que confirmar → checkbox.

### Alert vs Tooltip vs Badge/state

| | Alert | Tooltip | Badge/state |
|---|---|---|---|
| **Cuándo aparece** | Siempre visible en el layout | Al hacer hover/focus | Siempre visible |
| **Qué comunica** | Mensaje del sistema con contexto | Información explicativa adicional | Estado puntual de un ítem |
| **Urgencia** | Alta (danger/warning) o informativa | Ninguna | Ninguna |
| **Ejemplo** | "Error de validación: revisa el formulario" | "Este campo acepta máximo 50 caracteres" | "Activo" |

### Tabs vs Chips (filtro)

| | Tabs | Chips |
|---|---|---|
| **Para qué** | Organizar contenido en secciones distintas | Filtrar contenido dentro de la misma vista |
| **Cambia** | Qué sección se muestra | Qué items son visibles |
| **Selección** | Siempre exactamente uno activo | Puede haber varios activos |
| **Ejemplo** | "Datos personales / Seguridad / Pagos" | "Urgente · Esta semana · Sin asignar" |

---

## 5. Componentes — referencia rápida

### Alert
Mensajes del sistema que el usuario necesita leer.

**Variantes:** `info` · `success` · `warning` · `danger`  
**Props clave:** `variant` · `title` · `description` · `close` · `link`  
**Regla crítica:** `danger` con `close=false` indica error que debe resolverse antes de continuar. Un solo alert por contexto.  
**ARIA:** `role="alert" aria-live="assertive"` para danger/warning. `role="status" aria-live="polite"` para info/success.

### Badge
Indicadores numéricos o de punto sobre elementos.

**Variantes:** número · dot  
**Semánticos (badge/state):** neutral · info · success · warning · danger  
**Regla crítica:** no usar como elemento interactivo. No reemplaza un alert.

### Button
Ejecuta acciones. Nunca para navegar.

**Variants:** Primary · Secondary · Tertiary · Ghost  
**Tones:** Default · Destructive  
**Sizes:** Large (48px) · Medium (40px) · Small (32px)  
**Regla crítica:** un solo Primary por vista. `Destructive` solo para acciones irreversibles. `button/icon` siempre necesita `aria-label`.

### Checkbox
Selección de una o varias opciones independientes.

**Estados:** default · checked · indeterminate · disabled  
**Regla crítica:** siempre necesita label visible. `indeterminate` solo cuando hay selección parcial en un grupo.

### Chips
Filtros y selecciones dentro de una vista.

**Estados:** default · selected · disabled  
**Regla crítica:** no usar para navegar entre secciones → `tabs`. No usar para clasificar sin interacción → `tag`.

### Link
Navegación a URL, ruta o ancla. Nunca para ejecutar acciones.

**Sizes:** sm (12px) · md (14px) · lg (16px)  
**Props:** `underline` · `standalone` (touch target 44px)  
**Regla crítica:** `underline=true` obligatorio cuando convive con texto del mismo color (WCAG 1.4.1). Texto descriptivo — prohibido "clic aquí" o "ver más".

### Radio Button
Selección única entre opciones excluyentes.

**Estados:** default · selected · focus · disabled  
**Regla crítica:** mínimo 2 opciones. Siempre en grupo (`radio group`). Nunca como toggle — si es on/off usar `toggle`.

### Spinner
Indica proceso en curso sin tiempo estimado.

**Sizes:** sm (20px) · md (24px) · lg (32px)  
**Regla crítica:** no usar con texto de "cargando" visible si el spinner ya lo comunica. Respetar `prefers-reduced-motion`.

### Tabs
Organiza contenido en secciones horizontales.

**Estados:** default · active · focus · disabled  
**Regla crítica:** siempre exactamente 1 tab activo. Mínimo 2, máximo ~6. Label obligatorio — no usar solo iconos. No usar para filtrar → `chips`.

### Tag
Etiqueta de clasificación. No interactivo.

**Props:** `label` · `leadingIcon` · `trailingIcon`  
**Regla crítica:** sin estados hover, focus ni active. No para selección → `chip`. No para estado → `badge`.

### Text Field
Campo de entrada de texto.

**Estados:** default · focus · writing · filled · error · read-only · disabled  
**Props:** label · placeholder · helper · counter · leadingIcon · trailingIcon  
**Regla crítica:** label siempre visible — no usar solo placeholder como label. Estado error siempre acompañado de mensaje de ayuda que explique el problema.

### Toggle
Control on/off con efecto inmediato.

**Estados:** default · selected · focus · disabled  
**Regla crítica:** label externo obligatorio. El cambio ocurre al instante — no usar para acciones que requieren confirmación → `checkbox`. No para selección múltiple → `radio group`.

### Tooltip
Información contextual adicional. Aparece en hover/focus.

**Tipos (posición de flecha):** none · left · right · up · down · up-left · up-right · down-left · down-right  
**Regla crítica:** texto máximo ~40 caracteres. No reemplaza labels visibles. No contiene acciones. No usar para información crítica.

---

## 6. Patrones de uso frecuente

### Formulario estándar

```
[Label]          ← obligatorio, siempre visible
[Text field]     ← estado default
[Helper text]    ← instrucción o restricción
```

En estado error:
```
[Label]
[Text field]     ← borde --color-border-status-danger-default
[Error message]  ← texto con --color-text-status-danger-default
```

**Reglas del formulario:**
- Un solo Primary button para el submit principal
- El error se muestra en cada campo afectado + opcionalmente un alert general arriba
- Los campos disabled indican que no están disponibles — no los eliminar del layout
- El label nunca desaparece al escribir (no usar solo floating labels)

### Estados de carga

| Situación | Componente |
|---|---|
| Carga de página completa | Spinner lg centrado |
| Carga de sección | Spinner md dentro del contenedor |
| Botón ejecutando acción | Button state=Loading (spinner interno) |
| Dato individual cargando | Skeleton (fuera del scope MVP) |

### Feedback de acciones

| Resultado de acción | Componente |
|---|---|
| Éxito silencioso (guardado) | Alert success (opcional, desaparece) |
| Éxito importante | Alert success con close=true |
| Error recuperable | Alert danger + campos con error |
| Error crítico (no puede continuar) | Alert danger con close=false |
| Advertencia antes de acción | Alert warning |
| Información contextual | Alert info |

### Jerarquía de botones por vista

Una vista tiene máximo:
- **1 Primary** — acción principal
- **1 Secondary** — acción alternativa o de cancelar
- **N Tertiary/Ghost** — acciones secundarias o de navegación interna

Si hay más de un Primary en la misma vista → rediseñar la jerarquía.

### Selección de opciones según cantidad

| Opciones | Patrón |
|---|---|
| 2 opciones · efecto inmediato | Toggle |
| 2–5 opciones · submit | Radio group |
| 2–5 opciones · múltiple selección | Checkbox group |
| 5+ opciones | Select / Dropdown (fuera MVP) |

---

## 7. Reglas transversales

### Accesibilidad (WCAG 2.2 AA)

- **Touch target mínimo 44×44px** en todos los elementos interactivos
- **Focus visible siempre** — nunca suprimir el anillo de foco en ningún contexto
- **Contraste mínimo 4.5:1** para texto · **3:1** para iconos y bordes
- **Labels siempre visibles** — el placeholder no es un label
- Todo elemento interactivo sin texto visible necesita `aria-label`
- Los iconos decorativos siempre llevan `aria-hidden="true"`
- `prefers-reduced-motion` — respetar siempre en animaciones (spinner, transiciones)

### Mobile-first

- Diseñar primero para la pantalla más pequeña
- El sistema es responsive — los breakpoints son xs/sm/md/lg/xl
- Standalone links y botones aislados siempre con touch target 44px

### Uso de tokens

- Nunca usar valores HEX directos en componentes — siempre tokens semánticos
- Nunca usar tokens primitivos directamente (`color-blue-500`) — siempre semánticos (`color-text-link-default`)
- El nombre del token describe la intención, no el color: `color-text-status-danger-default` no es "rojo", es "texto de error"

### Jerarquía visual

- Un solo punto de mayor jerarquía por sección (botón Primary, título principal)
- Los estados hover/focus/active deben ser perceptibles sin depender solo de color
- No usar color como único indicador de estado (WCAG 1.4.1)

---

## 8. Gobernanza

### Roles

**DS Owner**
- Aprueba cambios en tokens y componentes
- Define la roadmap de fases
- Resuelve conflictos entre propuestas
- Autoriza breaking changes

**Consumer (diseñadores y desarrolladores)**
- Usa los tokens y componentes tal como están definidos
- Reporta inconsistencias o necesidades al Owner
- No modifica tokens directamente — propone via flujo de contribución

### Cómo proponer un cambio o nuevo componente

1. **Identificar la necesidad** — documentar el problema, el contexto y por qué no lo resuelve ningún componente existente
2. **Crear propuesta** — nombre, definición, variantes, casos de uso, y si aplica: alias de token de origen
3. **Revisión** — el DS Owner evalúa consistencia con el sistema (naming, capa, scope)
4. **Aprobación** — si hay impacto en otros equipos, se notifica antes de implementar
5. **Implementación** — se añade a Figma + JSON de tokens si aplica
6. **Documentación** — se documenta en la librería y se publica nueva versión

### Cuándo NO crear un componente nuevo

- Si existe un componente que resuelve el problema aunque no sea exactamente igual visualmente
- Si el caso de uso es específico de una pantalla (usar composición de componentes existentes)
- Si el componente propuesto mezcla responsabilidades de dos componentes existentes

### Tipos de cambio

| Tipo | Descripción | Aprobación |
|---|---|---|
| **Additive** | Nuevo componente o token — no afecta lo existente | Simple |
| **Update** | Modificar algo existente — puede ser breaking | Requiere análisis de impacto |
| **Deprecated** | Marcar como obsoleto — aún funciona | Simple + comunicar |
| **Breaking** | Eliminar o renombrar — rompe implementaciones | DS Owner + aviso ≥ 2 sprints |

### Versionado (semver)

| Versión | Cuándo |
|---|---|
| `MAJOR` (1.0.0 → 2.0.0) | Cambio breaking — eliminar o renombrar tokens/componentes |
| `MINOR` (1.0.0 → 1.1.0) | Nuevo componente o token — no breaking |
| `PATCH` (1.0.0 → 1.0.1) | Corrección de valor o documentación |

**Versión actual:** 0.1.0 · Piloto — pre-estable, puede recibir cambios breaking antes de v1.0.0.

### Proceso para breaking changes

Antes de eliminar o renombrar cualquier token o componente:
1. Documentarlo como `Deprecated` en el CHANGELOG
2. Notificar a todos los equipos consumidores con **mínimo 2 sprints de anticipación**
3. Marcar como deprecated en Figma y en el JSON de tokens
4. Eliminar en la release marcada

Ningún elemento se elimina sin aviso previo documentado.

---

## 9. Preguntas frecuentes

**¿Puedo modificar un componente de la librería para adaptarlo a mi pantalla?**
No. Los componentes de la librería son la fuente de verdad — modificar instancias localmente genera inconsistencia. Si el componente no resuelve tu caso, propón un cambio via el flujo de contribución.

**¿Puedo usar colores que no están en los tokens?**
No. Solo tokens semánticos. Si necesitas un color que no existe, propón el token al DS Owner. Usar HEX directamente rompe la cadena de trazabilidad y complica actualizaciones futuras.

**¿Qué hago si el componente que necesito no existe en el DS?**
Primero verifica que no sea una combinación de componentes existentes. Si confirmás que hace falta uno nuevo, abrís el flujo de contribución: documentás la necesidad y lo proponés al DS Owner.

**¿Puedo usar los primitives directamente?**
No. Los primitives son la fuente de verdad interna del sistema, no están diseñados para consumo directo. Siempre usar tokens semánticos (`--color-text-primary-default`, no `--color-gray-900`).

**¿Cómo sé qué token de color usar en un componente nuevo?**
Seguir el naming: `color-[propiedad]-[rol]-[estado]`. Para texto principal usar `--color-text-primary-default`. Para fondos de superficie `--color-bg-surface-primary-default`. Para acciones `--color-action-primary-default`. Si hay duda, consultar `design-system-rules.md`.

**¿Cuándo un icono necesita aria-label?**
Cuando es el único contenido del elemento interactivo (button/icon sin texto). Si el icono es decorativo dentro de un elemento que ya tiene texto, lleva `aria-hidden="true"`.

**¿Puedo tener más de un botón Primary en la misma vista?**
No. Un solo Primary por vista. Múltiples Primary anulan la jerarquía y confunden al usuario sobre cuál es la acción principal.

**¿El tooltip reemplaza al label de un campo?**
No. El tooltip es información adicional, no el label principal. El label debe ser siempre visible en el layout.

**¿Cuándo uso alert danger y cuándo alert warning?**
`danger` — algo ya salió mal (error de validación, fallo del sistema). `warning` — algo podría salir mal si el usuario continúa (advertencia antes de una acción irreversible).

**¿Cuándo el spinner tiene texto y cuándo no?**
El spinner comunica "cargando" por sí solo. Solo agregar texto si el contexto no es suficientemente claro para el usuario, por ejemplo en cargas largas donde conviene decir "Procesando tu solicitud...".

**¿Qué diferencia hay entre disabled y read-only en un text field?**
`disabled` — el campo no está disponible en este contexto (el usuario no puede interactuar con él). `read-only` — el campo tiene un valor que el usuario puede ver y copiar pero no editar.

**¿Los chips pueden tener varios seleccionados al mismo tiempo?**
Sí. Chips permite selección múltiple. Tabs no — siempre exactamente uno activo.

**¿Dónde reporto un error en el DS?**
Directamente al DS Owner. Describir el componente afectado, el error encontrado y el comportamiento esperado.

---

## 10. Tokens de color — referencia rápida

### Texto
| Token | Uso |
|---|---|
| `--color-text-primary-default` | Texto principal |
| `--color-text-secondary-default` | Texto secundario, labels, placeholders |
| `--color-text-disabled-default` | Texto en elementos deshabilitados |
| `--color-text-inverse-default` | Texto sobre fondos oscuros (ej. botón primary) |
| `--color-text-link-default` | Links en estado default |
| `--color-text-link-hover` | Links en hover |
| `--color-text-link-active` | Links en active |
| `--color-text-status-info-default` | Texto informativo |
| `--color-text-status-success-default` | Texto de éxito |
| `--color-text-status-warning-default` | Texto de advertencia |
| `--color-text-status-danger-default` | Texto de error |

### Fondos
| Token | Uso |
|---|---|
| `--color-bg-surface-primary-default` | Fondo principal de superficies |
| `--color-bg-surface-secondary-default` | Fondo secundario |
| `--color-bg-fill-subtle-default` | Fondo sutil (tags, badges neutros) |
| `--color-bg-fill-inverse-default` | Fondo inverso (tooltips) |
| `--color-bg-status-info-default` | Fondo de alert info |
| `--color-bg-status-success-default` | Fondo de alert success |
| `--color-bg-status-warning-default` | Fondo de alert warning |
| `--color-bg-status-danger-default` | Fondo de alert danger |

### Acciones (botones)
| Token | Uso |
|---|---|
| `--color-action-primary-default` | Fondo botón primary default |
| `--color-action-primary-hover` | Fondo botón primary hover |
| `--color-action-primary-active` | Fondo botón primary active |
| `--color-action-primary-disabled` | Fondo botón primary disabled |
| `--color-action-destructive-default` | Fondo botón destructivo default |
| `--color-action-secondary-default` | Fondo botón secondary |

### Bordes
| Token | Uso |
|---|---|
| `--color-border-default` | Borde estándar |
| `--color-border-hover` | Borde en hover |
| `--color-border-focus` | Borde en focus / indicador de tab activo |
| `--color-border-disabled` | Borde de elementos disabled |
| `--color-border-status-danger-default` | Borde de campo con error |

### Iconos
| Token | Uso |
|---|---|
| `--color-icon-system-primary-default` | Icono primario |
| `--color-icon-system-secondary-default` | Icono secundario |
| `--color-icon-system-inverse-default` | Icono sobre fondo oscuro |
| `--color-icon-system-disabled-default` | Icono deshabilitado |
| `--color-icon-semantic-info-default` | Icono informativo |
| `--color-icon-semantic-success-default` | Icono de éxito |
| `--color-icon-semantic-warning-default` | Icono de advertencia |
| `--color-icon-semantic-danger-default` | Icono de error |

### Focus
| Token | Uso |
|---|---|
| `--color-focus-ring-default` | Anillo de foco estándar |
| `--focus-ring-width` | Grosor del anillo (2px) |
