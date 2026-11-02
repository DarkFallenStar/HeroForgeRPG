import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store';
import { takeDamage, healHero } from '../store/slices/statsSlice';
import { clearLogs } from '../store/slices/actionLogSlice';
import { selectHeroComputedStatus, selectActionLogs } from '../store/selectors';

export const ReduxLiveInspector: React.FC = () => {
    const dispatch = useAppDispatch();
    const hero = useAppSelector(selectHeroComputedStatus);
    const logs = useAppSelector(selectActionLogs);

    return (
        <View style={styles.card}>
            {/* 1. Arena de Simulación contra Boss */}
            <View style={styles.bossArena}>
                <View style={styles.bossHeader}>
                    <Text style={styles.bossTitle}>🐉 Arena del Boss: Dragón del Abismo</Text>
                    <Text style={styles.heroPowerBadge}>Tu Poder: {hero.combatPower}</Text>
                </View>

                <Text style={styles.bossDesc}>
                    Ataca al Boss para recibir daño y probar la reactividad de la barra de vida y el estado de derrota en el HUD.
                </Text>

                <View style={styles.actionButtonsRow}>
                    <TouchableOpacity
                        style={[styles.combatBtn, styles.attackBtn, hero.isDefeated && styles.btnDisabled]}
                        disabled={hero.isDefeated}
                        onPress={() => dispatch(takeDamage(25))}
                    >
                        <Text style={styles.btnText}>⚔️ Atacar (-25 HP)</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.combatBtn, styles.healBtn]}
                        onPress={() => dispatch(healHero())}
                    >
                        <Text style={styles.btnText}>🧪 Curar (+10 HP)</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* 2. Consola Visual de Redux en Vivo */}
            <View style={styles.consoleHeader}>
                <View>
                    <Text style={styles.consoleTitle}>📟 Redux Live Inspector</Text>
                    <Text style={styles.consoleSubtitle}>Últimas 5 acciones despachadas (auto-capturadas)</Text>
                </View>
                {logs.length > 0 && (
                    <TouchableOpacity
                        style={styles.clearLogsBtn}
                        onPress={() => dispatch(clearLogs())}
                    >
                        <Text style={styles.clearLogsBtnText}>Limpiar</Text>
                    </TouchableOpacity>
                )}
            </View>

            <View style={styles.terminal}>
                {logs.length === 0 ? (
                    <Text style={styles.emptyLogsText}>
                        Esperando acciones... Interactúa con la app para ver el flujo de Redux en vivo.
                    </Text>
                ) : (
                    logs.map((log) => (
                        <View key={log.id} style={styles.logRow}>
                            <Text style={styles.logTime}>[{log.timestamp}]</Text>
                            <View style={styles.logTypeBadge}>
                                <Text style={styles.logTypeText}>{log.type}</Text>
                            </View>
                            <Text style={styles.logPayload} numberOfLines={1}>
                                {log.payload !== undefined ? `↳ ${JSON.stringify(log.payload)}` : '↳ ()'}
                            </Text>
                        </View>
                    ))
                )}
            </View>
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
    bossArena: {
        backgroundColor: '#0f172a',
        borderRadius: 12,
        padding: 14,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#dc2626',
    },
    bossHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
    bossTitle: {
        color: '#f87171',
        fontSize: 14,
        fontWeight: 'bold',
    },
    heroPowerBadge: {
        backgroundColor: '#374151',
        color: '#f8fafc',
        fontSize: 11,
        fontWeight: 'bold',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
    },
    bossDesc: {
        color: '#94a3b8',
        fontSize: 11,
        marginBottom: 12,
    },
    actionButtonsRow: {
        flexDirection: 'row',
        gap: 10,
    },
    combatBtn: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    attackBtn: {
        backgroundColor: '#dc2626',
    },
    healBtn: {
        backgroundColor: '#16a34a',
    },
    btnText: {
        color: '#ffffff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    btnDisabled: {
        opacity: 0.4,
    },
    consoleHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    consoleTitle: {
        color: '#38bdf8',
        fontSize: 15,
        fontWeight: 'bold',
    },
    consoleSubtitle: {
        color: '#64748b',
        fontSize: 10,
        marginTop: 1,
    },
    clearLogsBtn: {
        backgroundColor: '#334155',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
    },
    clearLogsBtnText: {
        color: '#cbd5e1',
        fontSize: 10,
        fontWeight: '600',
    },
    terminal: {
        backgroundColor: '#020617',
        borderRadius: 10,
        padding: 12,
        borderWidth: 1,
        borderColor: '#1e293b',
        minHeight: 110,
        justifyContent: 'center',
    },
    emptyLogsText: {
        color: '#475569',
        fontSize: 11,
        fontStyle: 'italic',
        textAlign: 'center',
    },
    logRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    logTime: {
        color: '#64748b',
        fontSize: 10,
        fontFamily: 'monospace',
        marginRight: 6,
    },
    logTypeBadge: {
        backgroundColor: '#1e293b',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        marginRight: 6,
    },
    logTypeText: {
        color: '#38bdf8',
        fontSize: 10,
        fontWeight: 'bold',
        fontFamily: 'monospace',
    },
    logPayload: {
        color: '#facc15',
        fontSize: 10,
        fontFamily: 'monospace',
        flex: 1,
    },
});