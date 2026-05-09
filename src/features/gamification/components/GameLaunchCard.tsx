import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

interface GameLaunchCardProps {
  onPlayPress: () => void;
}

export const GameLaunchCard: React.FC<GameLaunchCardProps> = ({ onPlayPress }) => {
  return (
    <View style={styles.cardContainer}>
      <Image 
        source={require('../../../../assets/Game/gameImage.png')} 
        style={styles.gameImage}
        resizeMode="cover"
      />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Heritage Hub</Text>
        <Text style={styles.subtitle}>Bridging History and Technology</Text>
        <Text style={styles.description}>
          Test your knowledge about Egyptian history, earn XP, and climb the leaderboard!
        </Text>
        
        <TouchableOpacity style={styles.playButton} onPress={onPlayPress} activeOpacity={0.8}>
          <Text style={styles.playButtonText}>Play Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginHorizontal: 20,
    marginTop: 20,
    width: width - 40,
  },
  gameImage: {
    width: '100%',
    height: 220,
  },
  contentContainer: {
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A3728',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8B6914',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  playButton: {
    backgroundColor: '#E0C385', // Primary gold color
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#E0C385',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  playButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
