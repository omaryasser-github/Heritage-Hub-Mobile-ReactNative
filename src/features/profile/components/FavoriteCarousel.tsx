import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Colors } from '../../../shared/constants/colors';
import { Spacing } from '../../../shared/constants/spacing';
import { useResponsive } from '../../../shared/utils/responsive';

interface FavoritePlace {
  id: string;
  name: string;
  location: string;
}

const FavoriteCard = ({
  place,
  sWidth,
  sFont,
  sHeight,
}: {
  place: FavoritePlace;
  sWidth: (n: number) => number;
  sFont: (n: number) => number;
  sHeight: (n: number) => number;
}) => (
  <View
    style={[
      styles.card,
      {
        width: sWidth(150),
        marginHorizontal: sWidth(8),
        padding: sWidth(12),
        borderRadius: sWidth(Spacing.borderRadius.lg),
      },
    ]}
  >
    <View
      style={[
        styles.cardImagePlaceholder,
        { height: sHeight(80), borderRadius: sWidth(Spacing.borderRadius.default), marginBottom: sHeight(12) },
      ]}
    />
    <View style={styles.cardInfo}>
      <Text style={[styles.cardTitle, { fontSize: sFont(14) }]} numberOfLines={1}>
        {place.name}
      </Text>
      <Text style={[styles.cardSubtitle, { fontSize: sFont(12) }]} numberOfLines={1}>
        {place.location}
      </Text>
    </View>
  </View>
);

export const FavoriteCarousel = ({ favorites }: { favorites: FavoritePlace[] }) => {
  const { sWidth, sHeight, sFont } = useResponsive();

  return (
    <View style={[styles.container, { marginTop: sHeight(24) }]}>
      <Text
        style={[
          styles.sectionTitle,
          { fontSize: sFont(18), marginStart: sWidth(24), marginBottom: sHeight(12) },
        ]}
      >
        Favorite Places
      </Text>
      {favorites.length === 0 ? (
        <Text style={[styles.emptyText, { marginStart: sWidth(24) }]}>
          No favorites yet. Start exploring!
        </Text>
      ) : (
        <View style={{ height: sHeight(160) }}>
          <FlashList
            data={favorites}
            renderItem={({ item }) => (
              <FavoriteCard place={item} sWidth={sWidth} sFont={sFont} sHeight={sHeight} />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: sWidth(Spacing.gutter) }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  sectionTitle: {
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  card: {
    backgroundColor: Colors.surface,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    marginBottom: 20,
  },
  cardImagePlaceholder: {
    width: '100%',
    backgroundColor: Colors.backgroundNeutral,
  },
  cardInfo: {
    justifyContent: 'center',
  },
  cardTitle: {
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  cardSubtitle: {
    color: Colors.textSubtle,
    marginTop: 2,
  },
  emptyText: {
    color: Colors.textSubtle,
    fontStyle: 'italic',
  },
});
