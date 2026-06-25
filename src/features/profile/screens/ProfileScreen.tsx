import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ProfileHeader } from '../components/ProfileHeader';
import { BadgeHorizontalList } from '../components/BadgeHorizontalList';
import { FavoriteCarousel } from '../components/FavoriteCarousel';
import { SettingsRow } from '../components/SettingsRow';
import { Colors } from '../../../shared/constants/colors';

const MOCK_BADGES = [
  { id: '1', title: 'First\nSteps' },
  { id: '2', title: 'Pyramid\nMaster' },
  { id: '3', title: 'Quiz\nWhiz' },
  { id: '4', title: 'Social\nBee' },
];

const MOCK_FAVORITES = [
  { id: '1', name: 'Great Pyramid of Giza', location: 'Giza, Egypt' },
  { id: '2', name: 'Karnak Temple', location: 'Luxor, Egypt' },
];

export const ProfileScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  const handleNavigateToSettings = () => {
    navigation.navigate('Settings');
  };

  const handleLogout = () => {
    console.log('Logging out...');
  };

  return (
    <View style={[styles.safeArea, { paddingTop: insets.top }]}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <ProfileHeader name="Omar Yasser" rank="Gold Explorer" points={1250} />
        <BadgeHorizontalList badges={MOCK_BADGES} />
        <FavoriteCarousel favorites={MOCK_FAVORITES} />
        <View style={styles.settingsSection}>
          <SettingsRow
            icon="settings-outline"
            label="Account Settings"
            onPress={handleNavigateToSettings}
          />
          <SettingsRow icon="notifications-outline" label="Notifications" onPress={() => {}} />
          <SettingsRow
            icon="log-out-outline"
            label="Log Out"
            onPress={handleLogout}
            isDestructive
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.backgroundApp,
  },
  container: {
    flex: 1,
  },
  settingsSection: {
    marginTop: 45,
    marginBottom: 40,
    borderTopWidth: 1,
    borderTopColor: Colors.backgroundNeutral,
  },
});
