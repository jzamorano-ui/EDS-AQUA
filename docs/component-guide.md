# Guía de componentes — Selección, diferencias y patrones

Cuándo usar cada componente, cómo distinguir los similares y patrones de composición frecuentes.

> Para specs técnicas de cada componente: [`docs/components/`](components/)  
> Para referencia de tokens: [`docs/tokens-map.md`](tokens-map.md)

---

## Selección de componentes

### Componentes de acción

| Necesidad | Componente |
|---|---|
| Ejecutar una acción (guardar, enviar, confirmar) | `button` |
| Navegar a otra pantalla o URL | `link` |
| Acción visual que parece link pero ejecuta lógica | `button variant=Tertiary` |
| Activar o desactivar una configuración con efecto inmediato | `toggle` |
| Seleccionar una opción entre varias (independientes) | `checkbox` |
| Seleccionar una sola opción entre varias (excluyentes) | `radio button` |
| Filtrar contenido dentro de la misma vista | `chips` |

### Componentes de feedback

| Necesidad | Componente |
|---|---|
| Mensaje del sistema que el usuario debe leer (info, error, éxito) | `alert` |
| Indicar cantidad o estado en un elemento (ej. notificaciones pendientes) | `badge` |
| Indicar estado semántico de un ítem (activo, inactivo, pendiente) | `badge/state` |
| Texto explicativo corto al hacer hover sobre un elemento | `tooltip` |
| Proceso en curso sin tiempo estimado | `spinner` |

### Componentes de clasificación

| Necesidad | Componente |
|---|---|
| Indicar a qué categoría pertenece un elemento | `tag` |
| Seleccionar o filtrar por categoría (interactivo) | `chips` |
| Mostrar un estado activo de navegación | `tabs` |

### Componentes de entrada

| Necesidad | Componente |
|---|---|
| Campo de texto libre (nombre, email, descripción) | `text-field` |
| Selección única entre pocas opciones visibles | `radio button` |
| Selección múltiple o confirmación (acepto términos) | `checkbox` |
| Activar/desactivar configuración | `toggle` |

---

## Diferencias entre componentes similares

### Badge vs Chip vs Tag

| | Badge | Chip | Tag |
|---|---|---|---|
| **Para qué** | Cantidad o estado en un elemento | Selección o filtro activo | Clasificación de categoría |
| **Interactivo** | No | Sí | No |
| **Comunica** | "Cuántos" o "en qué estado está" | "Esto está seleccionado/filtrado" | "A qué categoría pertenece" |
| **Ejemplo** | 3 notificaciones pendientes | Filtro "Urgente" activo | Categoría "Dental" |

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

## Patrones de uso frecuente

### Formulario estándar

```
[Label]          ← obligatorio, siempre visible
[Text field]     ← estado default
[Helper text]    ← instrucción o restricción
```

En estado error:
```
[Label]
[Text field]     ← borde --color-border-danger-focus
[Error message]  ← texto con --color-text-status-danger
```

**Reglas del formulario:**
- Un solo Primary button para el submit principal
- El error se muestra en cada campo afectado + opcionalmente un alert general arriba
- Los campos disabled indican que no están disponibles — no eliminarlos del layout
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

## Preguntas frecuentes

**¿Puedo modificar un componente de la librería para adaptarlo a mi pantalla?**
No. Los componentes de la librería son la fuente de verdad — modificar instancias localmente genera inconsistencia. Si el componente no resuelve tu caso, propón un cambio via el flujo de contribución.

**¿Puedo usar colores que no están en los tokens?**
No. Solo tokens semánticos. Si necesitas un color que no existe, propón el token al DS Owner. Usar HEX directamente rompe la cadena de trazabilidad y complica actualizaciones futuras.

**¿Qué hago si el componente que necesito no existe en el DS?**
Primero verifica que no sea una combinación de componentes existentes. Si confirmás que hace falta uno nuevo, abrís el flujo de contribución: documentás la necesidad y lo proponés al DS Owner.

**¿Puedo usar los primitives directamente?**
No. Los primitives son la fuente de verdad interna del sistema, no están diseñados para consumo directo. Siempre usar tokens semánticos (`--color-text-primary`, no `--color-gray-900`).

**¿Cómo sé qué token de color usar en un componente nuevo?**
Seguir el naming: `color-[propiedad]-[rol]-[estado]`. Para texto principal: `--color-text-primary`. Para fondos de superficie: `--color-bg-surface-default`. Para acciones: `--color-action-primary-default`. Si hay duda, consultar [`docs/tokens-map.md`](tokens-map.md).

**¿Cuándo un icono necesita aria-label?**
Cuando es el único contenido del elemento interactivo (button/icon sin texto). Si el icono es decorativo dentro de un elemento que ya tiene texto, lleva `aria-hidden="true"`.

**¿Puedo tener más de un botón Primary en la misma vista?**
No. Un solo Primary por vista. Múltiples Primary anulan la jerarquía y confunden al usuario sobre cuál es la acción principal.

**¿El tooltip reemplaza al label de un campo?**
No. El tooltip es información adicional, no el label principal. El label debe ser siempre visible en el layout.

**¿Cuándo uso alert danger y cuándo alert warning?**
`danger` — algo ya salió mal (error de validación, fallo del sistema). `warning` — algo podría salir mal si el usuario continúa (advertencia antes de una acción irreversible).

**¿Cuándo el spinner tiene texto y cuándo no?**
El spinner comunica "cargando" por sí solo. Solo agregar texto si el contexto no es suficientemente claro, por ejemplo en cargas largas donde conviene decir "Procesando tu solicitud...".

**¿Qué diferencia hay entre disabled y read-only en un text field?**
`disabled` — el campo no está disponible en este contexto. `read-only` — el campo tiene un valor que el usuario puede ver y copiar pero no editar.

**¿Los chips pueden tener varios seleccionados al mismo tiempo?**
Sí. Chips permite selección múltiple. Tabs no — siempre exactamente uno activo.

**¿Dónde reporto un error en el DS?**
Directamente al DS Owner. Describir el componente afectado, el error encontrado y el comportamiento esperado.
