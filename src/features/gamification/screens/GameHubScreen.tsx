import React from 'react';
import { View, StyleSheet, StatusBar, Text } from 'react-native';
import { GameLaunchCard } from '../components/GameLaunchCard';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const GameHubScreen = () => {
  const insets = useSafeAreaInsets();
  const handlePlayPress = () => {
    // Navigate to game challenge (placeholder for now)
    console.log("Play button pressed. Navigating to Quiz...");
  };

  return (
    <View style={[styles.safeArea, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FDF6EC" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Gaming Hub</Text>
      </View>
      <View style={styles.container}>
        <GameLaunchCard onPlayPress={handlePlayPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FDF6EC', // Same as Home background
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#FDF6EC',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4A3728',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
  },
});
