---
description: Reglas de revisión de código, tipado estricto y validación de entregable
always_on: true
---

# Criterios de Revisión y Validación

## 1. Verificación Estricta de Código
- **TypeScript:** Cero errores de tipos con `npx tsc --noEmit`. No utilizar `any` no justificado.
- **Inmutabilidad y Redux Toolkit:** Los reducers deben aprovechar la mutación segura vía Immer provista por RTK. El payload debe tiparse con `PayloadAction<T>`.
- **Desacoplamiento:** Comprobar que no exista comunicación de estado por props entre las 4 zonas visuales.

## 2. Validación de Criterios del Taller
- **Simulador Boss y Logs:** Garantizar que cada interacción despache acciones registradas visualmente en tiempo real en la Zona D.
- **Efecto Dominó:** Comprobar que un solo dispatch (ej. equipar ítem pesado) impacte en vivo el HUD superior, la Armería y el Inspector.
- **Preparación para el Video (5-7 min):**
  - Minuto 0:00 - 1:30: Problema arquitectónico y ciclo unidireccional de Redux.
  - Minuto 1:30 - 3:30: Demo visual del efecto dominó y sobrecarga.
  - Minuto 3:30 - 5:30: Recorrido de código (Slices, Immer, Selectores).
  - Minuto 5:30 - 6:30: Cuándo usar `useState` vs Redux Toolkit.

