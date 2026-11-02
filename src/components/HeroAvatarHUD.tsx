import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppSelector } from '../store';
import { selectHeroComputedStatus } from '../store/selectors';

export const HeroAvatarHUD: React.FC = () => {
    // Conexión directa a Redux mediante selector derivado (¡Cero Prop Drilling!)
    const hero = useAppSelector(selectHeroComputedStatus);

    // Porcentaje de vida y peso para las barras
    const hpPercent = Math.max(0, Math.min(100, hero.currentHp));
    const weightPercent = Math.min(100, (hero.currentWeight / hero.maxWeightCapacity) * 100);

    return (
        <View style={styles.card}>
            {/* Encabezado con Clase y Aura */}
            <View style={styles.header}>
                <View style={[styles.badge, { backgroundColor: hero.auraColor }]}>
                    <Text style={styles.badgeText}>{hero.heroClass.toUpperCase()}</Text>
                </View>
                <Text style={styles.powerText}>⚔️ Poder: {hero.combatPower}</Text>
            </View>

            {/* Avatar Central */}
            <View style={styles.avatarContainer}>
                <View style={[styles.avatarCircle, { borderColor: hero.auraColor }]}>
                    <Text style={styles.avatarEmoji}>
                        {hero.isDefeated ? '💀' : hero.classIcon}
                    </Text>
                </View>
                {hero.isDefeated && <Text style={styles.defeatedText}>¡HÉROE DERROTADO!</Text>}
            </View>

            {/* Barra de Vida (HP) */}
            <View style={styles.barSection}>
                <View style={styles.barLabelRow}>
                    <Text style={styles.barLabel}>❤️ Salud (HP)</Text>
                    <Text style={styles.barValue}>{hero.currentHp} / 100</Text>
                </View>
                <View style={styles.barTrack}>
                    <View
                        style={[
                            styles.barFill,
                            {
                                width: `${hpPercent}%`,
                                backgroundColor: hpPercent > 30 ? '#22c55e' : '#ef4444',
                            },
                        ]}
                    />
                </View>
            </View>

            {/* Barra de Peso y Capacidad */}
            <View style={styles.barSection}>
                <View style={styles.barLabelRow}>
                    <Text style={styles.barLabel}>🎒 Carga ({hero.currentWeight}kg / {hero.maxWeightCapacity}kg)</Text>
                    <Text style={[styles.barValue, hero.isOverloaded && styles.overloadText]}>
                        {hero.isOverloaded ? '¡SOBRECARGADO!' : `${Math.round(weightPercent)}%`}
                    </Text>
                </View>
                <View style={styles.barTrack}>
                    <View
                        style={[
                            styles.barFill,
                            {
                                width: `${Math.min(100, weightPercent)}%`,
                                backgroundColor: hero.isOverloaded ? '#ef4444' : weightPercent > 70 ? '#eab308' : '#3b82f6',
                            },
                        ]}
                    />
                </View>
            </View>

            {/* Alerta de Penalización si hay sobrecarga */}
            {hero.isOverloaded && (
                <View style={styles.penaltyAlert}>
                    <Text style={styles.penaltyText}>⚠️ Sobrecarga activa: -30% al Poder de Combate</Text>
                </View>
            )}
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
        marginBottom: 12,
    },
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },
    badgeText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 12,
    },
    powerText: {
        color: '#f8fafc',
        fontWeight: 'bold',
        fontSize: 14,
    },
    avatarContainer: {
        alignItems: 'center',
        marginVertical: 8,
    },
    avatarCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#0f172a',
        borderWidth: 4,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 6,
    },
    avatarEmoji: {
        fontSize: 40,
    },
    defeatedText: {
        color: '#ef4444',
        fontWeight: 'bold',
        marginTop: 6,
        fontSize: 12,
    },
    barSection: {
        marginTop: 10,
    },
    barLabelRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    barLabel: {
        color: '#cbd5e1',
        fontSize: 12,
        fontWeight: '600',
    },
    barValue: {
        color: '#94a3b8',
        fontSize: 12,
        fontWeight: 'bold',
    },
    overloadText: {
        color: '#ef4444',
        fontWeight: 'bold',
    },
    barTrack: {
        height: 10,
        backgroundColor: '#334155',
        borderRadius: 5,
        overflow: 'hidden',
    },
    barFill: {
        height: '100%',
        borderRadius: 5,
    },
    penaltyAlert: {
        backgroundColor: '#7f1d1d',
        borderRadius: 8,
        padding: 8,
        marginTop: 12,
        alignItems: 'center',
    },
    penaltyText: {
        color: '#fca5a5',
        fontSize: 11,
        fontWeight: 'bold',
    },
});