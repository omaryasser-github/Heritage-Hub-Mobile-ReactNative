import React, { useMemo } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { ProfileHeader } from '../components/ProfileHeader';
import { BadgeHorizontalList } from '../components/BadgeHorizontalList';
import { FavoriteCarousel } from '../components/FavoriteCarousel';
import { SettingsRow } from '../components/SettingsRow';
import { Colors } from '../../../shared/constants/colors';

export const ProfileScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const { t } = useTranslation();

  const badges = useMemo(
    () => [
      { id: '1', title: t('profile.badgeFirstSteps') },
      { id: '2', title: t('profile.badgePyramidMaster') },
      { id: '3', title: t('profile.badgeQuizWhiz') },
      { id: '4', title: t('profile.badgeSocialBee') },
    ],
    [t]
  );

  const favorites = useMemo(
    () => [
      { id: '1', name: t('profile.favoritePyramid'), location: t('profile.favoritePyramidLocation') },
      { id: '2', name: t('profile.favoriteKarnak'), location: t('profile.favoriteKarnakLocation') },
    ],
    [t]
  );

  return (
    <View style={[styles.safeArea, { paddingTop: insets.top }]}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <ProfileHeader
          name="Omar Yasser"
          rank={t('profile.rankGoldExplorer')}
          points={1250}
        />
        <BadgeHorizontalList badges={badges} />
        <FavoriteCarousel favorites={favorites} />
        <View style={styles.settingsSection}>
          <SettingsRow
            icon="settings-outline"
            label={t('profile.accountSettings')}
            onPress={() => navigation.navigate('Settings')}
          />
          <SettingsRow
            icon="notifications-outline"
            label={t('common.notifications')}
            onPress={() => {}}
          />
          <SettingsRow
            icon="log-out-outline"
            label={t('profile.logOut')}
            onPress={() => console.log('Logging out...')}
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
