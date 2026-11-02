import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { store } from './src/store';

// Importación de las 4 Zonas Visuales Independientes
import { HeroAvatarHUD } from './src/components/HeroAvatarHUD';
import { StatsControlPanel } from './src/components/StatsControlPanel';
import { ArmoryGrid } from './src/components/ArmoryGrid';
import { ReduxLiveInspector } from './src/components/ReduxLiveInspector';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="light" />
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Título Principal de la Aplicación */}
          <View style={styles.appHeader}>
            <Text style={styles.appTitle}>HEROFORGE RPG</Text>
            <Text style={styles.appSubtitle}>
              Arquitectura de Estado Visual con Redux Toolkit
            </Text>
          </View>

          {/* Zona A: Avatar, HUD & Barras Reactivas */}
          <HeroAvatarHUD />

          {/* Zona B: Panel de Entrenamiento y Presets */}
          <StatsControlPanel />

          {/* Zona C: Armería, Mochila y Sobrecarga */}
          <ArmoryGrid />

          {/* Zona D: Arena contra Boss y Consola Redux en Vivo */}
          <ReduxLiveInspector />
        </ScrollView>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0b1329', // Fondo exterior seguro
  },
  container: {
    flex: 1,
    backgroundColor: '#0b1329',
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 40,
  },
  appHeader: {
    alignItems: 'center',
    marginBottom: 12,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#38bdf8',
    letterSpacing: 2,
  },
  appSubtitle: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 2,
  },
});