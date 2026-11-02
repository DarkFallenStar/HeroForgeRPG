import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store';
import { toggleEquipItem, clearEquipment, Item } from '../store/slices/inventorySlice';
import { selectHeroComputedStatus } from '../store/selectors';

export const ArmoryGrid: React.FC = () => {
    const dispatch = useAppDispatch();
    const { catalog, equippedIds } = useAppSelector((state) => state.inventory);
    const hero = useAppSelector(selectHeroComputedStatus);

    const renderItemCard = (item: Item) => {
        const isEquipped = equippedIds.includes(item.id);

        return (
            <TouchableOpacity
                key={item.id}
                style={[
                    styles.itemCard,
                    isEquipped && styles.itemCardEquipped,
                ]}
                activeOpacity={0.7}
                onPress={() => dispatch(toggleEquipItem(item.id))}
            >
                <View style={styles.cardHeader}>
                    <Text style={styles.itemIcon}>{item.icon}</Text>
                    {isEquipped && (
                        <View style={styles.equippedBadge}>
                            <Text style={styles.equippedText}>EQUIPADO</Text>
                        </View>
                    )}
                </View>

                <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.itemCategory}>{item.category.toUpperCase()}</Text>

                {/* Bonos de estadísticas */}
                <View style={styles.statsRow}>
                    {item.bonusStr > 0 && <Text style={[styles.statBadge, { color: '#ef4444' }]}>+{item.bonusStr} STR</Text>}
                    {item.bonusAgi > 0 && <Text style={[styles.statBadge, { color: '#10b981' }]}>+{item.bonusAgi} AGI</Text>}
                    {item.bonusInt > 0 && <Text style={[styles.statBadge, { color: '#3b82f6' }]}>+{item.bonusInt} INT</Text>}
                </View>

                {/* Peso del ítem */}
                <Text style={styles.itemWeight}>⚖️ {item.weight} kg</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.card}>
            {/* Encabezado con Botón de Limpiar */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.title}>Armería & Inventario</Text>
                    <Text style={styles.subtitle}>
                        Equipados: {equippedIds.length} / {catalog.length} ítems
                    </Text>
                </View>

                {equippedIds.length > 0 && (
                    <TouchableOpacity
                        style={styles.clearBtn}
                        onPress={() => dispatch(clearEquipment())}
                    >
                        <Text style={styles.clearBtnText}>Desequipar Todo</Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* Alerta de Sobrecarga dentro de la Armería */}
            {hero.isOverloaded && (
                <View style={styles.overloadBanner}>
                    <Text style={styles.overloadBannerText}>
                        ⚠️ ¡Límite de peso excedido! Desequipa ítems pesados para recuperar tu agilidad.
                    </Text>
                </View>
            )}

            {/* Cuadrícula de Ítems */}
            <View style={styles.grid}>
                {catalog.map(renderItemCard)}
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    title: {
        color: '#f8fafc',
        fontSize: 16,
        fontWeight: 'bold',
    },
    subtitle: {
        color: '#94a3b8',
        fontSize: 11,
        marginTop: 2,
    },
    clearBtn: {
        backgroundColor: '#374151',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
    },
    clearBtnText: {
        color: '#fca5a5',
        fontSize: 11,
        fontWeight: 'bold',
    },
    overloadBanner: {
        backgroundColor: '#450a0a',
        borderWidth: 1,
        borderColor: '#ef4444',
        padding: 10,
        borderRadius: 8,
        marginBottom: 12,
    },
    overloadBannerText: {
        color: '#fca5a5',
        fontSize: 11,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        justifyContent: 'space-between',
    },
    itemCard: {
        width: '31%', // 3 columnas limpias
        backgroundColor: '#0f172a',
        borderRadius: 12,
        padding: 10,
        borderWidth: 1.5,
        borderColor: '#334155',
        alignItems: 'center',
        marginBottom: 4,
    },
    itemCardEquipped: {
        borderColor: '#38bdf8', // Borde brillante cian al estar equipado
        backgroundColor: '#082f49',
        shadowColor: '#38bdf8',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 4,
    },
    cardHeader: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 4,
    },
    itemIcon: {
        fontSize: 28,
    },
    equippedBadge: {
        backgroundColor: '#0284c7',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
        marginTop: 2,
    },
    equippedText: {
        color: '#ffffff',
        fontSize: 8,
        fontWeight: 'bold',
    },
    itemName: {
        color: '#f8fafc',
        fontSize: 11,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 2,
    },
    itemCategory: {
        color: '#64748b',
        fontSize: 9,
        fontWeight: '600',
        marginBottom: 4,
    },
    statsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 2,
        marginVertical: 2,
    },
    statBadge: {
        fontSize: 9,
        fontWeight: 'bold',
    },
    itemWeight: {
        color: '#94a3b8',
        fontSize: 10,
        fontWeight: '600',
        marginTop: 4,
    },
});