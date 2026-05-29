import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useResponsive } from '../../../shared/utils/responsive';

interface FavoritePlace {
  id: string;
  name: string;
  location: string;
}

const FavoriteCard = ({ place, sWidth, sFont, sHeight }: { place: FavoritePlace; sWidth: any; sFont: any; sHeight: any }) => (
  <View style={[styles.card, { width: sWidth(150), marginHorizontal: sWidth(8), padding: sWidth(12), borderRadius: sWidth(16) }]}>
    <View style={[styles.cardImagePlaceholder, { height: sHeight(80), borderRadius: sWidth(8), marginBottom: sHeight(12) }]} />
    <View style={styles.cardInfo}>
      <Text style={[styles.cardTitle, { fontSize: sFont(14) }]} numberOfLines={1}>{place.name}</Text>
      <Text style={[styles.cardSubtitle, { fontSize: sFont(12) }]} numberOfLines={1}>{place.location}</Text>
    </View>
  </View>
);

export const FavoriteCarousel = ({ favorites }: { favorites: FavoritePlace[] }) => {
  const { sWidth, sHeight, sFont } = useResponsive();
  return (
    <View style={[styles.container, { marginTop: sHeight(24) }]}>
      <Text style={[styles.sectionTitle, { fontSize: sFont(18), marginStart: sWidth(24), marginBottom: sHeight(12) }]}>Favorite Places</Text>
      {favorites.length === 0 ? (
        <Text style={[styles.emptyText, { marginStart: sWidth(24) }]}>No favorites yet. Start exploring!</Text>
      ) : (
        <View style={{ height: sHeight(160) }}>
          <FlashList
            data={favorites}
            renderItem={({ item }) => <FavoriteCard place={item} sWidth={sWidth} sFont={sFont} sHeight={sHeight} />}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: sWidth(16) }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  sectionTitle: {
    fontWeight: 'bold',
    color: '#4A3728',
  },
  card: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    marginBottom: 20,
  },
  cardImagePlaceholder: {
    width: '100%',
    backgroundColor: '#F0F0F0',
  },
  cardInfo: {
    justifyContent: 'center',
  },
  cardTitle: {
    fontWeight: 'bold',
    color: '#4A3728',
  },
  cardSubtitle: {
    color: '#8E8E93',
    marginTop: 2,
  },
  emptyText: {
    color: '#8E8E93',
    fontStyle: 'italic',
  }
});

