import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Monument } from '../api/exploreService';
import { useResponsive } from '../../../shared/utils/responsive';

interface MonumentCardProps {
  monument: Monument;
  onPress: () => void;
  onFavorite: () => void;
}

export const MonumentCard = ({ monument, onPress, onFavorite }: MonumentCardProps) => {
  const { sWidth, sHeight, sFont } = useResponsive();

  return (
    <TouchableOpacity 
      style={[styles.card, { width: sWidth(165), height: sHeight(200), borderRadius: sWidth(20), marginBottom: sHeight(20) }]} 
      onPress={onPress} 
      activeOpacity={0.9}
    >
      <Image source={{ uri: monument.image_url }} style={[styles.image, { height: sHeight(120) }]} />
      <TouchableOpacity style={[styles.favoriteBtn, { top: sHeight(16), end: sWidth(16), padding: sWidth(8) }]} onPress={onFavorite}>
        <Ionicons
          name={monument.isFavorite ? "heart" : "heart-outline"}
          size={sWidth(24)}
          color={monument.isFavorite ? "#FF3B30" : "#FFFFFF"}
        />
      </TouchableOpacity>
      <View style={[styles.info, { padding: sWidth(16) }]}>
        <View style={[styles.headerRow, { marginBottom: sHeight(6) }]}>
          <Text style={[styles.title, { fontSize: sFont(16), marginEnd: sWidth(10) }]} numberOfLines={1}>{monument.title}</Text>
          <View style={[styles.ratingBadge, { paddingHorizontal: sWidth(8), paddingVertical: sHeight(4), borderRadius: sWidth(12) }]}>
            <Ionicons name="star" size={sWidth(12)} color="#FF9500" />
            <Text style={[styles.ratingText, { marginStart: sWidth(4), fontSize: sFont(12) }]}>{monument.rating}</Text>
          </View>
        </View>
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={sWidth(14)} color="blue" />
          <Text style={[styles.locationText, { marginStart: sWidth(4), fontSize: sFont(14) }]}>{monument.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 4,
  },
  image: {
    width: 'auto',
  },
  favoriteBtn: {
    position: 'absolute',
    backgroundColor: 'transparent',
    borderRadius: 20,
  },
  info: {
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    color: '#1A1A1A',
    flex: 1,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF4E5',
  },
  ratingText: {
    fontWeight: 'bold',
    color: '#FF9500',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    color: 'blue',
  }
});

