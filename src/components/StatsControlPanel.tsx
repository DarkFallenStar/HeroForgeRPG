import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store';
import {
    incrementStat,
    decrementStat,
    applyBuildPreset,
    resetStats,
    StatType,
    PresetType,
} from '../store/slices/statsSlice';
import { selectHeroComputedStatus } from '../store/selectors';

export const StatsControlPanel: React.FC = () => {
    // Despachador de Redux y lectura del estado derivado
    const dispatch = useAppDispatch();
    const hero = useAppSelector(selectHeroComputedStatus);

    const renderStatRow = (
        label: string,
        statKey: StatType,
        baseValue: number,
        totalValue: number,
        color: string
    ) => {
        const bonus = totalValue - baseValue;
        const canIncrement = hero.availablePoints > 0;
        const canDecrement = baseValue > 1;

        return (
            <View style={styles.statRow}>
                <View style={styles.statInfo}>
                    <Text style={[styles.statLabel, { color }]}>{label}</Text>
                    <Text style={styles.statNumbers}>
                        {baseValue} {bonus > 0 && <Text style={styles.bonusText}>(+{bonus})</Text>} = <Text style={styles.totalText}>{totalValue}</Text>
                    </Text>
                </View>

                <View style={styles.buttonGroup}>
                    <TouchableOpacity
                        style={[styles.circleBtn, !canDecrement && styles.btnDisabled]}
                        disabled={!canDecrement}
                        onPress={() => dispatch(decrementStat(statKey))}
                    >
                        <Text style={styles.circleBtnText}>-</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.circleBtn, !canIncrement && styles.btnDisabled]}
                        disabled={!canIncrement}
                        onPress={() => dispatch(incrementStat(statKey))}
                    >
                        <Text style={styles.circleBtnText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.card}>
            {/* Encabezado con Puntos Disponibles */}
            <View style={styles.header}>
                <Text style={styles.title}>Panel de Atributos</Text>
                <View style={styles.pointsBadge}>
                    <Text style={styles.pointsText}>Puntos: {hero.availablePoints}</Text>
                </View>
            </View>

            {/* Filas de Atributos */}
            {renderStatRow('Fuerza (STR)', 'str', hero.baseStr, hero.totalStr, '#ef4444')}
            {renderStatRow('Agilidad (AGI)', 'agi', hero.baseAgi, hero.totalAgi, '#10b981')}
            {renderStatRow('Inteligencia (INT)', 'int', hero.baseInt, hero.totalInt, '#3b82f6')}

            {/* Presets Rápidos */}
            <Text style={styles.sectionSubtitle}>Presets de Clase Rápida</Text>
            <View style={styles.presetRow}>
                <TouchableOpacity
                    style={[styles.presetBtn, { borderColor: '#ef4444' }]}
                    onPress={() => dispatch(applyBuildPreset('WARRIOR'))}
                >
                    <Text style={styles.presetBtnText}>⚔️ Guerrero</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.presetBtn, { borderColor: '#3b82f6' }]}
                    onPress={() => dispatch(applyBuildPreset('MAGE'))}
                >
                    <Text style={styles.presetBtnText}>🪄 Mago</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.presetBtn, { borderColor: '#10b981' }]}
                    onPress={() => dispatch(applyBuildPreset('ROGUE'))}
                >
                    <Text style={styles.presetBtnText}>🥷 Pícaro</Text>
                </TouchableOpacity>
            </View>

            {/* Botón de Reseteo */}
            <TouchableOpacity
                style={styles.resetBtn}
                onPress={() => dispatch(resetStats())}
            >
                <Text style={styles.resetBtnText}>🧪 Poción de Reseteo (Reset Stats)</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#1e293b',
        borderRadius: 16,
        padding: 16,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: '#334155',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        color: '#f8fafc',
        fontSize: 16,
        fontWeight: 'bold',
    },
    pointsBadge: {
        backgroundColor: '#6366f1',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    pointsText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 12,
    },
    statRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#0f172a',
        padding: 12,
        borderRadius: 10,
        marginBottom: 8,
    },
    statInfo: {
        flex: 1,
    },
    statLabel: {
        fontSize: 13,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    statNumbers: {
        color: '#94a3b8',
        fontSize: 12,
    },
    bonusText: {
        color: '#eab308',
        fontWeight: 'bold',
    },
    totalText: {
        color: '#f8fafc',
        fontWeight: 'bold',
    },
    buttonGroup: {
        flexDirection: 'row',
        gap: 8,
    },
    circleBtn: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: '#334155',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleBtnText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    btnDisabled: {
        opacity: 0.3,
    },
    sectionSubtitle: {
        color: '#94a3b8',
        fontSize: 12,
        fontWeight: '600',
        marginTop: 12,
        marginBottom: 8,
    },
    presetRow: {
        flexDirection: 'row',
        gap: 8,
    },
    presetBtn: {
        flex: 1,
        backgroundColor: '#0f172a',
        borderWidth: 1,
        borderRadius: 8,
        paddingVertical: 10,
        alignItems: 'center',
    },
    presetBtnText: {
        color: '#f8fafc',
        fontSize: 11,
        fontWeight: 'bold',
    },
    resetBtn: {
        marginTop: 12,
        backgroundColor: '#374151',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    resetBtnText: {
        color: '#fca5a5',
        fontSize: 12,
        fontWeight: 'bold',
    },
});