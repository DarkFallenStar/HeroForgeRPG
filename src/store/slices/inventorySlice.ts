import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ItemCategory = 'weapon' | 'armor' | 'accessory';

export interface Item {
    id: string;
    name: string;
    icon: string;
    category: ItemCategory;
    bonusStr: number;
    bonusAgi: number;
    bonusInt: number;
    weight: number;
}

export interface InventoryState {
    catalog: Item[];
    equippedIds: string[];
}

const initialCatalog: Item[] = [
    {
        id: 'espada_fuego',
        name: 'Espada de Fuego',
        icon: '🗡️',
        category: 'weapon',
        bonusStr: 5,
        bonusAgi: 1,
        bonusInt: 0,
        weight: 6
    },
    {
        id: 'baculo_arcano',
        name: 'Báculo Arcano',
        icon: '🪄',
        category: 'weapon',
        bonusStr: 0,
        bonusAgi: 1,
        bonusInt: 5,
        weight: 4
    },
    {
        id: 'daga_sombria',
        name: 'Daga Sombría',
        icon: '🗡️',
        category: 'weapon',
        bonusStr: 1,
        bonusAgi: 5,
        bonusInt: 0,
        weight: 2
    },
    {
        id: 'cota_malla',
        name: 'Cota de Malla',
        icon: '🛡️',
        category: 'armor',
        bonusStr: 2,
        bonusAgi: 1,
        bonusInt: 0,
        weight: 8
    },
    {
        id: 'armadura_maldita',
        name: 'Armadura Maldita',
        icon: '🦹',
        category: 'armor',
        bonusStr: 8,
        bonusAgi: 0,
        bonusInt: 0,
        weight: 22
    },
    {
        id: 'super_boxers',
        name: 'Super Bóxers',
        icon: '🩲',
        category: 'armor',
        bonusStr: 2,
        bonusAgi: 2,
        bonusInt: 2,
        weight: 14
    },
    {
        id: 'botas_elficas',
        name: 'Botas Élficas',
        icon: '👢',
        category: 'accessory',
        bonusStr: 0,
        bonusAgi: 4,
        bonusInt: 1,
        weight: 2
    },
    {
        id: 'gorro_magico',
        name: 'Gorro Mágico',
        icon: '🎩',
        category: 'accessory',
        bonusStr: 1,
        bonusAgi: 0,
        bonusInt: 4,
        weight: 4
    },
    {
        id: 'ojo',
        name: 'Ojo que Todo lo Ve',
        icon: '🧿',
        category: 'accessory',
        bonusStr: 10,
        bonusAgi: 10,
        bonusInt: 10,
        weight: 40
    },
];

const initialState: InventoryState = {
    catalog: initialCatalog,
    equippedIds: [],
};

export const inventorySlice = createSlice({
    name: 'inventory',
    initialState,
    reducers: {
        toggleEquipItem: (state, action: PayloadAction<string>) => {
            const itemId = action.payload;
            const index = state.equippedIds.indexOf(itemId);
            if (index >= 0) {
                state.equippedIds.splice(index, 1);
            } else {
                state.equippedIds.push(itemId);
            }
        },
        clearEquipment: (state) => {
            state.equippedIds = [];
        },
    },
});

export const { toggleEquipItem, clearEquipment } = inventorySlice.actions;

export default inventorySlice.reducer;