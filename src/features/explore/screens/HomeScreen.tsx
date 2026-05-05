import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Image, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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

  // const { data: feed = [], isLoading, isError } = useQuery({
  //   queryKey: ['exploreFeed'],
  //   queryFn: exploreService.getFeed,
  // });

  const renderHeader = () => (
    <View style={styles.header}>
      <ImageBackground
        source={require('../../../../assets/Home/homeBackgroundHeader.png')}
        style={styles.background}
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
    <SafeAreaView style={styles.container} edges={['top']}>
      {renderHeader()}
      <View style={styles.listContainer}>
        {/* {isLoading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : isError ? (
          <Text style={styles.errorText}>Failed to load feed. Pull to refresh.</Text>
        ) : feed.length === 0 ? (
          <Text style={styles.emptyText}>No monuments found.</Text>
        ) : ( */}
        <FlashList
          data={[]}
          renderItem={({ item }: { item: Monument }) => (
            <MonumentCard
              monument={item}
              onPress={() => console.log('Navigate to', item.id)}
              onFavorite={() => console.log('Toggle favorite', item.id)}
            />
          )}
          // estimatedItemSize={290}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
        {/* )} */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2E8DD',
  },
  background: {
    // flex: 1,
    paddingTop: 27,
    height: 280,
    backgroundColor: '#F2E8DD',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 10,
    marginBottom: 20,
    paddingHorizontal: 5
  },
  logo: {
    width: 70,
    height: 70,
    // resizeMode: 'contain',
  },
  header: {
    // paddingHorizontal: 20,
    // paddingTop: 10,
    paddingBottom: 100,
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
    marginTop: 35
  },
  categoriesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  categories: {
    display: 'flex',
    flexDirection: 'row',
    // marginBottom: 10,
    // backgroundColor: "red",
    // borderWidth: 4,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listContent: {
    paddingBottom: 24,
    paddingTop: 10,
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
