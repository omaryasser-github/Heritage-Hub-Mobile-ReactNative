import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Image, ImageBackground } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { FlashList } from '@shopify/flash-list';
// import { useQuery } from '@tanstack/react-query';
import { exploreService, Monument } from '../api/exploreService';
import { SearchBar } from '../components/SearchBar';
import { CategoryPill } from '../components/CategoryPill';
import { MonumentCard } from '../components/MonumentCard';

const CATEGORIES = [
  { id: 'recommended', title: 'Recommend', image: require('../../../../assets/Home/icons/recommend-icon.png') },
  { id: 'popular', title: 'Popular', image: require('../../../../assets/Home/icons/popular.png') },
  { id: 'cities', title: 'Cities', image: require('../../../../assets/Home/icons/cities.png') },
  { id: 'museums', title: 'Museums', image: require('../../../../assets/Home/icons/museums.png') },
  { id: 'temples', title: 'Temples', image: require('../../../../assets/Home/icons/temples.png') },
];

export const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('popular');

  // Dynamic safe area values — avoids hardcoded spacing for notch/status bar/gesture area.
  const insets = useSafeAreaInsets();

  // Tab bar height from the navigator — used to prevent the last list card from
  // being hidden behind the bottom tab bar on any device.
  const tabBarHeight = useBottomTabBarHeight();

  // const { data: feed = [], isLoading, isError } = useQuery({
  //   queryKey: ['exploreFeed'],
  //   queryFn: exploreService.getFeed,
  // });

  const renderHeader = () => (
    <View style={styles.header}>
      <ImageBackground
        source={require('../../../../assets/Home/homeBackgroundHeader.png')}
        // paddingTop uses insets.top so the logo/title clears the notch on all devices.
        style={[styles.background, { paddingTop: insets.top + 10 }]}
      >
        <View style={styles.logoContainer}>
          <Image
            source={require('../../../../assets/splash/splash logo.png')}
            style={styles.logo}
          />
          <Text style={styles.screenTitle}>Explore Egypt</Text>
        </View>
        <SearchBar value={searchQuery} onChangeText={setSearchQuery} />

        <View style={styles.categoryContainer}>
          <Text style={styles.categoriesTitle}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
            {CATEGORIES.map((cat) => (
              <CategoryPill
                key={cat.id}
                title={cat.title}
                image={cat.image}
                isSelected={selectedCategory === cat.id}
                onPress={() => setSelectedCategory(cat.id)}
              />
            ))}
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );

  return (
    // Do NOT pass edges={['top']} here — insets.top is applied manually to the
    // ImageBackground so it can extend to the very top of the screen (edge-to-edge).
    <View style={styles.container}>
      {renderHeader()}
      {/* flex: 1 allows the list to fill all remaining space below the header */}
      <View style={styles.listContainer}>
        {/* {isLoading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : isError ? (
          <Text style={styles.errorText}>Failed to load feed. Pull to refresh.</Text>
        ) : feed.length === 0 ? (
          <Text style={styles.emptyText}>No monuments found.</Text>
        ) : ( */}
        <FlashList
          data={exploreService.getFeed()}
          numColumns={2}
          renderItem={({ item }: { item: Monument }) => (
            <View style={styles.cardContainer}>
              <MonumentCard
                monument={item}
                onPress={() => console.log('Navigate to', item.id)}
                onFavorite={() => { item.isFavorite = !item.isFavorite }}
              />
            </View>
          )}
          // tabBarHeight + insets.bottom ensures the last card is always fully
          // visible above the tab bar and the device's bottom gesture area.
          contentContainerStyle={{ paddingBottom: tabBarHeight + insets.bottom }}
          showsVerticalScrollIndicator={false}
        />
        {/* )} */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // flex: 1 fills the full device screen height.
  container: {
    flex: 1,
    backgroundColor: "#F2E8DD",
  },
  background: {
    // paddingTop is now applied dynamically via insets.top in the JSX above.
    height: 270,
    backgroundColor: '#F2E8DD',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 10,
    marginBottom: 10,
    paddingHorizontal: 5
  },
  logo: {
    width: 70,
    height: 70,
  },
  header: {
    // Negative marginBottom creates the visual overlap where cards float over the header.
    marginBottom: -70,
  },
  screenTitle: {
    marginTop: 15,
    fontSize: 23,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  categoryContainer: {
    paddingHorizontal: 15,
    marginTop: 15
  },
  categoriesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  categories: {
    flexDirection: 'row',
  },
  // flex: 1 replaces the broken hardcoded paddingBottom: 700.
  // The list now stretches to fill all remaining space naturally.
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 150,
  },
  cardContainer: {
    flex: 1,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 40,
    color: '#8E8E93',
    fontSize: 16,
  },
  errorText: {
    textAlign: 'center',
    marginTop: 40,
    color: '#FF3B30',
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: '#8E8E93',
    fontSize: 16,
  }
});
