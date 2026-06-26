import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageSourcePropType } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Monument } from '../api/exploreService';
import { useResponsive } from '../../../shared/utils/responsive';
import { Colors } from '../../../shared/constants/colors';

interface MonumentCardProps {
  monument: Monument;
  onPress: () => void;
  onFavorite: () => void;
}

export const MonumentCard = ({ monument, onPress, onFavorite }: MonumentCardProps) => {
  const { sWidth, sHeight, sFont } = useResponsive();

  const imageSource: ImageSourcePropType = monument.image;

  return (
    <TouchableOpacity
      style={[
        styles.card,
        { width: sWidth(165), height: sHeight(200), borderRadius: sWidth(20), marginBottom: sHeight(20) },
      ]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <Image source={imageSource} style={[styles.image, { height: sHeight(120) }]} resizeMode="cover" />
      <TouchableOpacity
        style={[styles.favoriteBtn, { top: sHeight(16), end: sWidth(16), padding: sWidth(8) }]}
        onPress={(event) => {
          event.stopPropagation?.();
          onFavorite();
        }}
      >
        <Ionicons
          name={monument.isFavorite ? 'heart' : 'heart-outline'}
          size={sWidth(24)}
          color={monument.isFavorite ? Colors.errorStrong : Colors.textOnDark}
        />
      </TouchableOpacity>
      <View style={[styles.info, { padding: sWidth(16) }]}>
        <View style={[styles.headerRow, { marginBottom: sHeight(6) }]}>
          <Text style={[styles.title, { fontSize: sFont(16), marginEnd: sWidth(10) }]} numberOfLines={1}>
            {monument.name}
          </Text>
          {monument.rating != null ? (
            <View
              style={[
                styles.ratingBadge,
                { paddingHorizontal: sWidth(8), paddingVertical: sHeight(4), borderRadius: sWidth(12) },
              ]}
            >
              <Ionicons name="star" size={sWidth(12)} color={Colors.rating} />
              <Text style={[styles.ratingText, { marginStart: sWidth(4), fontSize: sFont(12) }]}>
                {monument.rating}
              </Text>
            </View>
          ) : null}
        </View>
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={sWidth(14)} color={Colors.primaryDeep} />
          <Text style={[styles.locationText, { marginStart: sWidth(4), fontSize: sFont(14) }]} numberOfLines={1}>
            {monument.location}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    overflow: 'hidden',
    shadowColor: Colors.shadow,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 4,
  },
  image: {
    width: '100%',
  },
  favoriteBtn: {
    position: 'absolute',
    backgroundColor: 'transparent',
    borderRadius: 20,
  },
  info: {},
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    color: Colors.textTitle,
    flex: 1,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceRating,
  },
  ratingText: {
    fontWeight: 'bold',
    color: Colors.rating,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    color: Colors.primaryDeep,
    flex: 1,
  },
});
