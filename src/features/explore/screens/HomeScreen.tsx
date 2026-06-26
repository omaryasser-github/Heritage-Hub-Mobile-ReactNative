import React, { useMemo, useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView, Text, Image, ImageBackground, Modal } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { useTranslation } from 'react-i18next';
import { exploreService, Monument } from '../api/exploreService';
import { HomeCategoryFilter } from '../../../core/data/types';
import { SearchBar } from '../components/SearchBar';
import { CategoryPill } from '../components/CategoryPill';
import { MonumentCard } from '../components/MonumentCard';
import { HeaderMenu } from '../components/HeaderMenu';
import { useResponsive } from '../../../shared/utils/responsive';
import { Colors } from '../../../shared/constants/colors';
import { Typography } from '../../../shared/components/Typography';
import { GuestGateScreen } from '../../../shared/components/GuestGateScreen';
import { useAuthStore } from '../../../core/store/authStore';

export const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<HomeCategoryFilter>('popular');
  const [feedVersion, setFeedVersion] = useState(0);
  const [favoriteGateVisible, setFavoriteGateVisible] = useState(false);
  const { t, i18n } = useTranslation();
  const isGuest = useAuthStore((state) => state.isGuest);

  const categories = useMemo(
    () => [
      {
        id: 'recommended' as const,
        title: t('home.categoryRecommended'),
        image: require('../../../../assets/Home/icons/recommend-icon.png'),
      },
      {
        id: 'popular' as const,
        title: t('home.categoryPopular'),
        image: require('../../../../assets/Home/icons/popular.png'),
      },
      {
        id: 'cities' as const,
        title: t('home.categoryCities'),
        image: require('../../../../assets/Home/icons/cities.png'),
      },
      {
        id: 'museums' as const,
        title: t('home.categoryMuseums'),
        image: require('../../../../assets/Home/icons/museums.png'),
      },
      {
        id: 'temples' as const,
        title: t('home.categoryTemples'),
        image: require('../../../../assets/Home/icons/temples.png'),
      },
    ],
    [t]
  );

  const feed = useMemo(() => {
    void feedVersion;
    void i18n.language;
    return exploreService.getFeed({
      category: selectedCategory,
      search: searchQuery,
    });
  }, [selectedCategory, searchQuery, feedVersion, i18n.language]);

  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();
  const { sWidth, sHeight, sFont } = useResponsive();

  const handleFavoriteToggle = useCallback(
    async (slug: string) => {
      if (isGuest) {
        setFavoriteGateVisible(true);
        return;
      }
      await exploreService.toggleFavorite(slug);
      setFeedVersion((value) => value + 1);
    },
    [isGuest]
  );

  const handleCardPress = useCallback(
    (slug: string) => {
      navigation.navigate('MonumentDetail', { slug });
    },
    [navigation]
  );

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
          <Text style={[styles.screenTitle, { fontSize: sFont(23), marginEnd: sWidth(80) }]}>
            {t('home.title')}
          </Text>
          <HeaderMenu />
        </View>
        <SearchBar value={searchQuery} onChangeText={setSearchQuery} />

        <View style={[styles.categoryContainer, { paddingHorizontal: sWidth(15) }]}>
          <Text style={[styles.categoriesTitle, { fontSize: sFont(20) }]}>
            {t('home.categories')}
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
            {categories.map((cat) => (
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
        {feed.length === 0 ? (
          <Typography variant="bodyMd" color={Colors.textSubtle} align="center" style={styles.emptyText}>
            {t('home.emptyFeed')}
          </Typography>
        ) : (
          <FlashList
            data={feed}
            numColumns={2}
            keyExtractor={(item) => item.id}
            extraData={feedVersion}
            renderItem={({ item }: { item: Monument }) => (
              <View style={styles.cardContainer}>
                <MonumentCard
                  monument={item}
                  onPress={() => handleCardPress(item.slug)}
                  onFavorite={() => handleFavoriteToggle(item.slug)}
                />
              </View>
            )}
            contentContainerStyle={{ paddingBottom: tabBarHeight + insets.bottom }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      <Modal visible={favoriteGateVisible} animationType="slide" onRequestClose={() => setFavoriteGateVisible(false)}>
        <GuestGateScreen variant="profile" onContinueBrowsing={() => setFavoriteGateVisible(false)} />
      </Modal>
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
  header: {},
  screenTitle: {
    marginTop: 15,
    fontWeight: 'bold',
    color: Colors.textOnDark,
    marginBottom: 20,
  },
  categoryContainer: {
    marginTop: 15,
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
  emptyText: {
    marginTop: 40,
  },
});
