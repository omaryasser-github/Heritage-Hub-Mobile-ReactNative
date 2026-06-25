import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Colors } from '../../../shared/constants/colors';
import { AvatarImage } from './AvatarImage';

interface ProfileHeaderProps {
  name: string;
  rank: string;
  points: number;
  avatarUrl?: any;
}

export const ProfileHeader = ({ name, rank, points, avatarUrl }: ProfileHeaderProps) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <AvatarImage size={90} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.rank}>{rank}</Text>
        <View style={styles.pointsBadge}>
          <Text style={styles.pointsText}>{t('profile.pointsXp', { points })}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    backgroundColor: Colors.backgroundApp,
  },
  infoContainer: {
    marginStart: 20,
    flex: 1,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  rank: {
    fontSize: 16,
    color: Colors.primaryDeep,
    marginTop: 4,
    fontWeight: '500',
  },
  pointsBadge: {
    backgroundColor: Colors.primarySoft,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  pointsText: {
    color: Colors.textOnDark,
    fontWeight: 'bold',
    fontSize: 14,
  },
});
