import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type StatType = 'str' | 'agi' | 'int';
export type PresetType = 'WARRIOR' | 'MAGE' | 'ROGUE';

export interface StatsState {
    availablePoints: number;
    str: number;
    agi: number;
    int: number;
    currentHp: number;
}

const initialState: StatsState = {
    availablePoints: 15,
    str: 5,
    agi: 5,
    int: 5,
    currentHp: 100,
};

export const statsSlice = createSlice({
    name: 'stats',
    initialState,
    reducers: {
        incrementStat: (state, action: PayloadAction<StatType>) => {
            if (state.availablePoints > 0) {
                state[action.payload] += 1;
                state.availablePoints -= 1;
            }
        },
        decrementStat: (state, action: PayloadAction<StatType>) => {
            // No permitir bajar de 5 y devolver el punto
            if (state[action.payload] > 1) {
                state[action.payload] -= 1;
                state.availablePoints += 1;
            }
        },
        takeDamage: (state, action: PayloadAction<number>) => {
            state.currentHp = Math.max(0, state.currentHp - action.payload);
        },
        healHero: (state) => {
            state.currentHp = Math.min(100, state.currentHp + 10);
        },
        applyBuildPreset: (state, action: PayloadAction<PresetType>) => {
            state.availablePoints = 0;
            if (action.payload === 'WARRIOR') {
                state.str = 15;
                state.agi = 8;
                state.int = 7;
            } else if (action.payload === 'MAGE') {
                state.str = 7;
                state.agi = 8;
                state.int = 15;
            } else if (action.payload === 'ROGUE') {
                state.str = 8;
                state.agi = 15;
                state.int = 7;
            }
        },
        resetStats: (state) => {
            state.availablePoints = 15;
            state.str = 5;
            state.agi = 5;
            state.int = 5;
            state.currentHp = 100;
        },
    },
});

export const {
    incrementStat,
    decrementStat,
    takeDamage,
    healHero,
    applyBuildPreset,
    resetStats,
} = statsSlice.actions;

export default statsSlice.reducer;