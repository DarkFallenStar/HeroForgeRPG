import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import statsReducer from './slices/statsSlice';
import inventoryReducer from './slices/inventorySlice';



export const store = configureStore({
    reducer: {
        stats: statsReducer,
        inventory: inventoryReducer,
    },
});

// Inferir los tipos `RootState` y `AppDispatch` del propio store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Hooks personalizados con tipado estricto para usar en las 4 Zonas Visuales
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;