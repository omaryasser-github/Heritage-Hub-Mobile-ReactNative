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
import { HeaderMenu } from '../components/HeaderMenu';
import { useResponsive } from '../../../shared/utils/responsive';
import { Colors } from '../../../shared/constants/colors';


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
  const { sWidth, sHeight, sFont } = useResponsive();

  // const { data: feed = [], isLoading, isError } = useQuery({
  //   queryKey: ['exploreFeed'],
  //   queryFn: exploreService.getFeed,
  // });

  const renderHeader = () => (
    <View style={[styles.header, { marginBottom: sHeight(-70) }]}>
      <ImageBackground
        source={require('../../../../assets/Home/homeBackgroundHeader.png')}
        style={[styles.background, { paddingTop: insets.top + sHeight(10), height: sHeight(300) }]}
      >
        <View style={[styles.logoContainer, { paddingHorizontal: sWidth(10), gap: sWidth(10) }]}>
          <Image
            source={require('../../../../assets/splash/splash logo.png')}
            style={{ width: sWidth(70), height: sWidth(70) }}
          />
          <Text style={[styles.screenTitle, { fontSize: sFont(23), marginEnd: sWidth(80) }]}>Explore Egypt</Text>
          <HeaderMenu />
        </View>
        <SearchBar value={searchQuery} onChangeText={setSearchQuery} />

        <View style={[styles.categoryContainer, { paddingHorizontal: sWidth(15) }]}>
          <Text style={[styles.categoriesTitle, { fontSize: sFont(20) }]}>Categories</Text>
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
    <View style={styles.container}>
      {renderHeader()}
      <View style={[styles.listContainer, { paddingHorizontal: sWidth(20), marginTop: sHeight(150) }]}>

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
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundHome,
  },
  background: {
    backgroundColor: Colors.backgroundHome,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  header: {
    // marginBottom is handled inline to maintain responsive ratio
  },
  screenTitle: {
    marginTop: 15,
    fontWeight: 'bold',
    color: Colors.textOnDark,
    marginBottom: 20,
  },
  categoryContainer: {
    marginTop: 15
  },
  categoriesTitle: {
    fontWeight: 'bold',
    color: Colors.textOnDark,
    marginBottom: 10,
  },
  categories: {
    flexDirection: 'row',
  },
  listContainer: {
    flex: 1,
  },

  cardContainer: {
    flex: 1,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 40,
    color: Colors.textSubtle,
    fontSize: 16,
  },
  errorText: {
    textAlign: 'center',
    marginTop: 40,
    color: Colors.errorStrong,
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: Colors.textSubtle,
    fontSize: 16,
  }
});
