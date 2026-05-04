# Form

Estructura para capturar información de forma clara y ordenada.
El orden y la agrupación de campos reducen el esfuerzo cognitivo del usuario.

---

## Anatomía del Field

### Field base

Estructura mínima: label visible + control de entrada.

> Label siempre sobre el control — nunca dentro.

### Field completo

Incluye help text y mensaje de error cuando aplica.

> El error aparece bajo el control que lo originó.

---

## Responsive

- Una sola columna en mobile.
- Los campos llenan el ancho del contenedor.
- Orden de lectura: de arriba a abajo.

---

## Reglas de composición

| Regla | Comportamiento |
|---|---|
| Un campo = una tarea | Cada campo captura un dato específico. No combinar información en un solo campo. |
| Labels siempre visibles | El label nunca desaparece. No usar placeholder como sustituto de label. |
| Agrupar campos relacionados | Datos relacionados van juntos. Separar secciones si el formulario es largo. |
| Mostrar errores junto al campo | El mensaje aparece inmediatamente bajo el control que lo generó. |
| Error al detectar formato incorrecto | El error aparece solo cuando hay suficiente texto para evaluar el formato. No al comenzar a escribir. |
| Mensajes de error claros | Describir qué salió mal y cómo corregirlo. Evitar "Error" o "Dato inválido". |

---

## Accesibilidad

- Cada campo requiere un `<label>` asociado — nunca solo placeholder.
- Los mensajes de error deben vincularse al campo con `aria-describedby`.
- En mobile, el touch target mínimo de 44×44px aplica a cada control individualmente.
