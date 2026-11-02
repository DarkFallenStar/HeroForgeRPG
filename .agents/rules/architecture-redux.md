---
description: Arquitectura técnica oficial del taller HeroForge RPG con Redux Toolkit
always_on: true
---

# Arquitectura Técnica Redux Toolkit

## 1. Responsabilidades del Store (`src/store/`)
- **`statsSlice.ts`:**
  - Estado: `availablePoints: 15`, `str: 5`, `agi: 5`, `int: 5`, `currentHp: 100`.
  - Reducers: `incrementStat`, `decrementStat`, `takeDamage`, `healHero`, `applyBuildPreset`.
- **`inventorySlice.ts`:**
  - Estado: `catalog` (mínimo 6 ítems con bonos de STR/AGI/INT y peso), `equippedIds: string[]`.
  - Reducers: `toggleEquipItem`, `clearEquipment` (alias semántico `unequipAll`).
- **`actionLogSlice.ts`:**
  - Estado: Historial de las últimas 5 acciones despachadas (`type`, `payload`, `timestamp`).
  - Implementación: Uso de `extraReducers` con `builder.addMatcher` para captura reactiva.
- **`store.ts` / `index.ts`:**
  - Configurado con `configureStore({ reducer: { stats, inventory, actionLog } })`.
  - Exporta `RootState`, `AppDispatch` y hooks tipados: `useAppDispatch` y `useAppSelector`.

## 2. Regla de Oro: Estado Derivado (`src/store/selectors.ts`)
- **Prohibido duplicar valores calculados en el State.**
- Selectores obligatorios:
  - `selectTotalStats`: Stats base + bonos de ítems equipados.
  - `selectTotalWeight`: Suma de pesos de ítems equipados.
  - `selectMaxWeightCapacity`: `10 + (totalStr * 2)`.
  - `selectIsOverencumbered`: `currentWeight > maxWeightCapacity`.
  - `selectCombatPower`: Cálculo con penalización del 30% si está sobrecargado.
  - `selectHeroVisualClass`: Clase y color de aura según atributo dominante.

## 3. Zonas Visuales Independientes (Cero Prop Drilling)
- `HeroAvatarHUD` (Zona A): Avatar dinámico, barras visuales, badge de clase reactivo.
- `StatsControlPanel` (Zona B): Controles de puntos y atributos, presets, poción de reseteo.
- `ArmoryGrid` (Zona C): Cuadrícula de tarjetas de ítems, estado equipado, alerta visual de sobrecarga.
- `ReduxLiveInspector` (Zona D): Simulador de combate contra Boss y monitor visual en vivo de las últimas 5 acciones.
- Cada zona consume directamente de Redux mediante `useAppSelector` y despacha con `useAppDispatch`.

