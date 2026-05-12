import React from 'react';
import { View, StyleSheet, StatusBar, Text } from 'react-native';
import { GameLaunchCard } from '../components/GameLaunchCard';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useResponsive } from '../../../shared/utils/responsive';

export const GameHubScreen = () => {
  const insets = useSafeAreaInsets();
  const { sWidth, sHeight, sFont } = useResponsive();

  const handlePlayPress = () => {
    // Navigate to game challenge (placeholder for now)
    console.log("Play button pressed. Navigating to Quiz...");
  };

  return (
    <View style={[styles.safeArea, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FDF6EC" />
      <View style={[styles.header, { paddingHorizontal: sWidth(24), paddingVertical: sHeight(16) }]}>
        <Text style={[styles.headerTitle, { fontSize: sFont(28) }]}>Gaming Hub</Text>
      </View>
      <View style={[styles.container, { paddingTop: sHeight(10) }]}>
        <GameLaunchCard onPlayPress={handlePlayPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FDF6EC',
  },
  header: {
    backgroundColor: '#FDF6EC',
  },
  headerTitle: {
    fontWeight: 'bold',
    color: '#4A3728',
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

