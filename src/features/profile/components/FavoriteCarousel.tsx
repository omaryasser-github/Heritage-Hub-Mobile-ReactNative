import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';

interface FavoritePlace {
  id: string;
  name: string;
  location: string;
}

const FavoriteCard = ({ place }: { place: FavoritePlace }) => (
  <View style={styles.card}>
    <View style={styles.cardImagePlaceholder} />
    <View style={styles.cardInfo}>
      <Text style={styles.cardTitle} numberOfLines={1}>{place.name}</Text>
      <Text style={styles.cardSubtitle} numberOfLines={1}>{place.location}</Text>
    </View>
  </View>
);

export const FavoriteCarousel = ({ favorites }: { favorites: FavoritePlace[] }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Favorite Places</Text>
      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>No favorites yet. Start exploring!</Text>
      ) : (
        <View style={{ height: 160 }}>
          <FlashList
            data={favorites}
            renderItem={({ item }) => <FavoriteCard place={item} />}
            // estimatedItemSize={160}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A3728',
    marginStart: 24,
    marginBottom: 12,
  },
  card: {
    width: 150,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    padding: 12,
    marginBottom: 20,
  },
  cardImagePlaceholder: {
    width: '100%',
    height: 80,
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
    marginBottom: 12,
  },
  cardInfo: {
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4A3728',
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 2,
  },
  emptyText: {
    color: '#8E8E93',
    fontStyle: 'italic',
    marginStart: 24,
  }
});
