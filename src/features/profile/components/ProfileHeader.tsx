import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AvatarImage } from './AvatarImage';

interface ProfileHeaderProps {
  name: string;
  rank: string;
  points: number;
  avatarUrl?: any;
}

export const ProfileHeader = ({ name, rank, points, avatarUrl }: ProfileHeaderProps) => {
  return (
    <View style={styles.container}>
      <AvatarImage size={90} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.rank}>{rank}</Text>
        <View style={styles.pointsBadge}>
          <Text style={styles.pointsText}>{points} XP</Text>
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
    backgroundColor: '#FDF6EC',
    // borderBottomWidth: 1,
    // borderBottomColor: '#F0F0F0',
  },
  infoContainer: {
    marginStart: 20,
    flex: 1,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4A3728',
  },
  rank: {
    fontSize: 16,
    color: '#8B6914',
    marginTop: 4,
    fontWeight: '500',
  },
  pointsBadge: {
    backgroundColor: '#E0C385',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  pointsText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  }
});
