import React, { useMemo, useState, useCallback } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { exploreService, Monument } from '../api/exploreService';
import { panoramaService } from '../api/panoramaService';
import { ExploreSearchBar } from '../components/ExploreSearchBar';
import { ExploreSearchResults } from '../components/ExploreSearchResults';
import { ExploreMap } from '../components/ExploreMap';
import { ExplorePreviewCard } from '../components/ExplorePreviewCard';
import { Typography } from '../../../shared/components/Typography';
import { Colors } from '../../../shared/constants/colors';
import { Spacing } from '../../../shared/constants/spacing';
import { useResponsive } from '../../../shared/utils/responsive';

export const ExploreTabScreen = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();
  const { t, i18n } = useTranslation();
  const { sWidth, sHeight, sFont } = useResponsive();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMonument, setSelectedMonument] = useState<Monument | null>(null);
  const [highlightedGovernorateKey, setHighlightedGovernorateKey] = useState<string | null>(null);

  const trimmedQuery = searchQuery.trim();
  const isSearching = trimmedQuery.length > 0;

  const searchResults = useMemo(() => {
    if (!isSearching) return [];
    void i18n.language;
    return exploreService.getFeed({ search: trimmedQuery });
  }, [trimmedQuery, isSearching, i18n.language]);

  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
    setSelectedMonument(null);
    setHighlightedGovernorateKey(null);
    Keyboard.dismiss();
  }, []);

  const handleSelectMonument = useCallback((monument: Monument) => {
    setSelectedMonument(monument);
    setHighlightedGovernorateKey(monument.governorateKey || null);
    setSearchQuery(monument.name);
    Keyboard.dismiss();
  }, []);

  const handleDismissPreview = useCallback(() => {
    setSelectedMonument(null);
    setHighlightedGovernorateKey(null);
  }, []);

  const handleViewDetails = useCallback(() => {
    if (!selectedMonument) return;
    navigation.navigate('MonumentDetail', { slug: selectedMonument.slug });
  }, [navigation, selectedMonument]);

  const hasPanorama = selectedMonument ? panoramaService.hasPanorama(selectedMonument.slug) : false;

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={[styles.container, { paddingTop: insets.top }]}>
          <View style={[styles.header, { paddingHorizontal: sWidth(Spacing.screenPadding) }]}>
            <Typography
              variant="headlineSm"
              color={Colors.textTitle}
              align="center"
              style={{ fontSize: sFont(20), marginBottom: sHeight(12) }}
            >
              {t('explore.title')}
            </Typography>

            <ExploreSearchBar
              value={searchQuery}
              onChangeText={(text) => {
                setSearchQuery(text);
                if (selectedMonument && text !== selectedMonument.name) {
                  setSelectedMonument(null);
                  setHighlightedGovernorateKey(null);
                }
              }}
              onClear={handleClearSearch}
            />

            {isSearching ? (
              <ExploreSearchResults results={searchResults} onSelect={handleSelectMonument} />
            ) : null}
          </View>

          <View style={styles.mapArea}>
            <ExploreMap highlightedGovernorateKey={highlightedGovernorateKey} />
          </View>

          {selectedMonument ? (
            <View style={[styles.previewWrap, { paddingBottom: tabBarHeight + sHeight(8) }]}>
              <ExplorePreviewCard
                monument={selectedMonument}
                hasPanorama={hasPanorama}
                onViewDetails={handleViewDetails}
                onDismiss={handleDismissPreview}
              />
            </View>
          ) : null}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundApp,
  },
  header: {
    zIndex: 10,
  },
  mapArea: {
    flex: 1,
    marginTop: 4,
  },
  previewWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 20,
  },
});
