import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Monument } from '../api/exploreService';

interface MonumentCardProps {
  monument: Monument;
  onPress: () => void;
  onFavorite: () => void;
}

export const MonumentCard = ({ monument, onPress, onFavorite }: MonumentCardProps) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <Image source={{ uri: monument.image_url }} style={styles.image} />
      <TouchableOpacity style={styles.favoriteBtn} onPress={onFavorite}>
        <Ionicons
          name={monument.isFavorite ? "heart" : "heart-outline"}
          size={24}
          color={monument.isFavorite ? "#FF3B30" : "#FFFFFF"}
        />
      </TouchableOpacity>
      <View style={styles.info}>
        <View style={styles.headerRow}>
          <Text style={styles.title} numberOfLines={1}>{monument.title}</Text>
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={12} color="#FF9500" />
            <Text style={styles.ratingText}>{monument.rating}</Text>
          </View>
        </View>
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={14} fill="blue" color="blue" />
          <Text style={styles.locationText}>{monument.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 4,
    width: 165,
    height: 200,
  },
  image: {
    width: 'auto',
    height: 120,
  },
  favoriteBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'transparent',
    borderRadius: 20,
    padding: 8,
    // backdropFilter: 'blur(10px)', // Will only work if glassmorphism wrapper used, but ok for now
  },
  info: {
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
    flex: 1,
    marginRight: 10,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF4E5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FF9500',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 4,
    fontSize: 14,
    color: 'blue',
  }
});
