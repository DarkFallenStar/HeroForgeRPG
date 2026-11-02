import { RootState } from './index';

export const selectHeroComputedStatus = (state: RootState) => {
    const { str, agi, int, currentHp, availablePoints } = state.stats;
    const { catalog, equippedIds } = state.inventory;

    // 1. Obtener la lista completa de ítems equipados
    const equippedItems = catalog.filter((item) => equippedIds.includes(item.id));

    // 2. Calcular atributos totales (base + bonos de equipo)
    const totalStr = str + equippedItems.reduce((acc, item) => acc + item.bonusStr, 0);
    const totalAgi = agi + equippedItems.reduce((acc, item) => acc + item.bonusAgi, 0);
    const totalInt = int + equippedItems.reduce((acc, item) => acc + item.bonusInt, 0);

    // 3. Calcular peso y sobrecarga
    const currentWeight = equippedItems.reduce((acc, item) => acc + item.weight, 0);
    const maxWeightCapacity = 10 + totalStr * 2;
    const isOverloaded = currentWeight > maxWeightCapacity;

    // 4. Determinar clase visual, aura e ícono del avatar
    let heroClass = 'Novato';
    let auraColor = '#94a3b8'; // Gris pizarra
    let classIcon = '🧑‍🌾';

    if (totalStr >= 15 && totalStr >= totalAgi && totalStr >= totalInt) {
        heroClass = 'Berserker Implacable';
        auraColor = '#ef4444'; // Rojo fuego
        classIcon = '🪓';
    } else if (totalInt >= 15 && totalInt >= totalStr && totalInt >= totalAgi) {
        heroClass = 'Archimago Arcano';
        auraColor = '#3b82f6'; // Azul arcano
        classIcon = '🧙‍♂️';
    } else if (totalAgi >= 15 && totalAgi >= totalStr && totalAgi >= totalInt) {
        heroClass = 'Asesino Sombrío';
        auraColor = '#10b981'; // Verde esmeralda
        classIcon = '🥷';
    }

    // 5. Calcular poder de combate (con penalización del 30% si está sobrecargado)
    const rawPower = totalStr * 3 + totalAgi * 2 + totalInt * 3;
    const combatPower = isOverloaded ? Math.round(rawPower * 0.7) : rawPower;

    return {
        // Stats base y derivados
        baseStr: str,
        baseAgi: agi,
        baseInt: int,
        totalStr,
        totalAgi,
        totalInt,
        availablePoints,
        currentHp,
        // Peso
        currentWeight,
        maxWeightCapacity,
        isOverloaded,
        // Apariencia y combate
        heroClass,
        auraColor,
        classIcon,
        rawPower,
        combatPower,
        isDefeated: currentHp <= 0,
        equippedItems,
    };
};

// Selector simple para obtener los logs en vivo
export const selectActionLogs = (state: RootState) => state.actionLog.logs;