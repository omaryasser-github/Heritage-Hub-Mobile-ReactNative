import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { HexagonBadge } from './HexagonBadge';

interface Badge {
  id: string;
  title: string;
}

export const BadgeHorizontalList = ({ badges }: { badges: Badge[] }) => {
  if (!badges || badges.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No badges earned yet. Keep exploring!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>My Badges</Text>
      <View style={styles.listContainer}>
        <FlashList
          data={badges}
          renderItem={({ item }) => <HexagonBadge title={item.title} />}
          // estimatedItemSize={76}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        />
      </View>
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
  listContainer: {
    height: 80
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    color: '#8E8E93',
    fontStyle: 'italic',
  }
});
