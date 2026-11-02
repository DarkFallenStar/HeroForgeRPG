import { createSlice, PayloadAction, UnknownAction } from '@reduxjs/toolkit';

export interface ActionLogEntry {
    id: string;
    type: string;
    payload: any;
    timestamp: string;
}

export interface ActionLogState {
    logs: ActionLogEntry[];
}

const initialState: ActionLogState = {
    logs: [],
};

export const actionLogSlice = createSlice({
    name: 'actionLog',
    initialState,
    reducers: {
        clearLogs: (state) => {
            state.logs = [];
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            // 👇 Predicado con Type Guard: le enseña a TypeScript que la acción tiene payload
            (action: UnknownAction): action is PayloadAction<any> =>
                action.type.startsWith('stats/')
                || action.type.startsWith('inventory/'),
            (state, action) => {
                const now = new Date();
                const timeStr = now.toTimeString().split(' ')[0];

                state.logs.push({
                    id: `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
                    type: action.type,
                    payload: action.payload,
                    timestamp: timeStr,
                });

                // Mantener estrictamente las últimas 5 acciones
                if (state.logs.length > 5) {
                    state.logs.shift();
                }
            }
        );
    },
});

export const { clearLogs } = actionLogSlice.actions;

export default actionLogSlice.reducer;