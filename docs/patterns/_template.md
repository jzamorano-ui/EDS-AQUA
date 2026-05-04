# [Patrón]

[Una línea: qué agrupa o resuelve. La posición o jerarquía que comunica.]

---

## Contexto de uso

### Exploración
[El usuario puede salir sin consecuencias. El primario avanza, no compromete.]

### Decisión
[La acción tiene impacto real. El primario confirma y no se puede deshacer fácilmente.]

---

## Responsive

- El primario siempre va primero (arriba).
- Los botones llenan el ancho del contenedor.
- Orden: Primario → Secundario → Terciario.

---

## Reglas de composición

| Regla | Comportamiento |
|---|---|
| Máximo 3 acciones visibles | Si hay más opciones, mover las menos frecuentes a un overflow menu. Nunca más de 3 visibles a la vez. |
| Siempre hay un camino de salida | El usuario puede cancelar o volver sin comprometerse. Siempre incluye una salida clara. |
| El primario nunca es destructivo | Acciones que eliminan o comprometen datos van en secundario o terciario con label explícito. |
| Separación mínima | Al menos `--space-sm` (12px) entre botones adyacentes. |

---

## Accesibilidad

- **WCAG 2.5.3** — criterio accionable en una línea.
