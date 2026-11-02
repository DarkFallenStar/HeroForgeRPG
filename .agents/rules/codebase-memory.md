---
description: Reglas de uso eficiente de Codebase Memory MCP y optimización de contexto
always_on: true
---

# Codebase Memory MCP y Optimización de Contexto

## Principios de Exploración
1. **Consulta Estructural Primera:** Utilizar el grafo de conocimiento para localizar símbolos, funciones y tipos relevantes antes de lecturas masivas.
2. **Consultas Quirúrgicas:** Leer únicamente líneas y archivos necesarios para la tarea actual.
3. **Exclusiones Mandatorias:** Nunca indexar ni consultar `.git`, `node_modules`, `.expo`, archivos `.env`, temporales o binarios.
4. **Sincronización:** Priorizar actualización incremental del índice tras completar cada fase o modificación estructural.

