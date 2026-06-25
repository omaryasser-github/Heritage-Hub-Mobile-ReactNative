import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { GameLaunchCard } from '../components/GameLaunchCard';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useResponsive } from '../../../shared/utils/responsive';
import { Colors } from '../../../shared/constants/colors';

export const GameHubScreen = () => {
  const insets = useSafeAreaInsets();
  const { sWidth, sHeight, sFont } = useResponsive();
  const { t } = useTranslation();

  const handlePlayPress = () => {
    console.log('Play button pressed. Navigating to Quiz...');
  };

  return (
    <View style={[styles.safeArea, { paddingTop: insets.top }]}>
      <View style={[styles.header, { paddingHorizontal: sWidth(24), paddingVertical: sHeight(16) }]}>
        <Text style={[styles.headerTitle, { fontSize: sFont(28) }]}>{t('gaming.hubTitle')}</Text>
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
    backgroundColor: Colors.backgroundApp,
  },
  header: {
    backgroundColor: Colors.backgroundApp,
  },
  headerTitle: {
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
