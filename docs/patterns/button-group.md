# Button Group

Agrupa acciones relacionadas dentro de un mismo contexto de tarea.
La posición del botón primario comunica la intención del flujo.

---

## Contexto de uso

### Exploración
El usuario puede salir sin consecuencias. El primario avanza, no compromete.

| Orden desktop | Composición |
|---|---|
| ← Primario · Secundario · Terciario | Hasta 3 acciones, primario a la izquierda |
| ← Primario · Secundario · Text link | Cuando la tercera acción es navegacional |

> ← Primario a la izquierda — inicia o avanza el flujo.

### Decisión
La acción tiene impacto real. El primario confirma y no se puede deshacer fácilmente.

| Orden desktop | Composición |
|---|---|
| Terciario · Secundario · Primario → | Hasta 3 acciones, primario a la derecha |
| Text link · Secundario · Primario → | Cuando la opción de salida es navegacional |

> Primario a la derecha — confirma la acción de impacto.

---

## Responsive

- El primario siempre va primero (arriba).
- Los botones llenan el ancho del contenedor.
- Orden: Primario → Secundario → Terciario.

---

## Reglas de composición

| Regla | Comportamiento |
|---|---|
| Máximo 3 acciones visibles | Si hay más opciones, mueve las menos frecuentes a un overflow menu. Nunca más de 3 visibles a la vez. |
| Siempre hay un camino de salida | El usuario puede cancelar o volver sin comprometerse. Siempre incluye una salida clara. |
| El primario nunca es destructivo | Acciones que eliminan o comprometen datos van en secundario o terciario con label explícito. |
| Separación mínima | Al menos `--space-sm` (12px) entre botones adyacentes. |

---

## Accesibilidad

- Cada botón del grupo mantiene su propio `aria-label` si no tiene label visible.
- El orden visual debe coincidir con el orden del DOM — no reordenar con CSS.
- En móvil, el touch target mínimo de 44×44px aplica a cada botón individualmente.
