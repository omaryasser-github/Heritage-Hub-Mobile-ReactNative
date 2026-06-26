import React, { useMemo, useState } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Modal,
  I18nManager,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { monumentService } from '../api/monumentService';
import { MonumentHeader } from '../components/MonumentHeader';
import { DetailTabBar, DetailTab } from '../components/DetailTabBar';
import { ArticleCard } from '../components/ArticleCard';
import { HeaderMenu } from '../components/HeaderMenu';
import { getSectionIcon } from '../components/CategoryIcon';
import { Typography } from '../../../shared/components/Typography';
import { PrimaryButton } from '../../../shared/components/PrimaryButton';
import { GuestGateScreen } from '../../../shared/components/GuestGateScreen';
import { Colors } from '../../../shared/constants/colors';
import { Spacing } from '../../../shared/constants/spacing';
import { useResponsive } from '../../../shared/utils/responsive';
import { useAuthStore } from '../../../core/store/authStore';
import { MonumentDetail } from '../../../core/data/types';

type MonumentDetailRouteParams = {
  MonumentDetail: { slug: string };
};

const HERO_HEIGHT_RATIO = 0.42;
const SHEET_OVERLAP = 28;
const DEFAULT_HERO_IMAGE = require('../../../../assets/Home/explore/exploreBackground.png');

export const MonumentDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<MonumentDetailRouteParams, 'MonumentDetail'>>();
  const { slug } = route.params;
  const insets = useSafeAreaInsets();
  const { t, i18n } = useTranslation();
  const { sWidth, sHeight, sFont, screenHeight } = useResponsive();
  const isGuest = useAuthStore((state) => state.isGuest);

  const [activeTab, setActiveTab] = useState<DetailTab>('history');
  const [favoriteGateVisible, setFavoriteGateVisible] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const heroHeight = screenHeight * HERO_HEIGHT_RATIO;

  const monument: MonumentDetail | null = useMemo(() => {
    void refreshKey;
    void i18n.language;
    return monumentService.getBySlug(slug);
  }, [slug, refreshKey, i18n.language]);

  const articles = activeTab === 'history' ? monument?.articles.history : monument?.articles.culture;
  const emptyMessage =
    activeTab === 'history' ? t('cardDetails.emptyHistory') : t('cardDetails.emptyCulture');
  const sectionLabel =
    activeTab === 'history' ? t('cardDetails.tabHistory') : t('cardDetails.tabCulture');
  const sectionIcon = getSectionIcon(activeTab);

  const handleToggleFavorite = () => {
    if (isGuest) {
      setFavoriteGateVisible(true);
      return;
    }
    if (!monument) return;
    monumentService.toggleFavorite(monument.slug);
    setRefreshKey((value) => value + 1);
  };

  if (!monument) {
    return (
      <View style={[styles.centered, { paddingTop: insets.top, paddingHorizontal: sWidth(24) }]}>
        <Typography variant="headlineSm" color={Colors.textPrimary} align="center">
          {t('cardDetails.notFound')}
        </Typography>
        <PrimaryButton
          title={t('common.back')}
          onPress={() => navigation.goBack()}
          style={{ marginTop: sHeight(20), width: '100%' }}
        />
      </View>
    );
  }


  return (
    <View style={styles.container}>
      <View style={[styles.hero, { height: heroHeight }]}>
        <ImageBackground source={DEFAULT_HERO_IMAGE} style={StyleSheet.absoluteFillObject} resizeMode="cover">
          <View style={styles.heroTopScrim} />
          <View style={[styles.heroBottomFade, { height: heroHeight * 0.01 }]} />
        </ImageBackground>

        <View style={[styles.heroNav, { paddingTop: insets.top + sHeight(6), paddingHorizontal: sWidth(Spacing.screenPadding) }]}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name={I18nManager.isRTL ? 'arrow-forward' : 'arrow-back'}
              size={sWidth(24)}
              color={Colors.textOnDark}
            />
          </TouchableOpacity>

          <View style={styles.heroNavRight}>
            <TouchableOpacity onPress={handleToggleFavorite} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Ionicons
                name={monument.isFavorite ? 'heart' : 'heart-outline'}
                size={sWidth(24)}
                color={monument.isFavorite ? Colors.errorStrong : Colors.textOnDark}
              />
            </TouchableOpacity>
            <HeaderMenu />
          </View>
        </View>

        <View style={[styles.heroContent, { paddingHorizontal: sWidth(Spacing.screenPadding) }]}>
          <MonumentHeader monument={monument} />
        </View>
      </View>

      <View
        style={[
          styles.tabBarWrap,
          {
            marginTop: -sHeight(SHEET_OVERLAP),
            paddingHorizontal: sWidth(Spacing.screenPadding),
            zIndex: 2,
          },
        ]}
      >
        <DetailTabBar activeTab={activeTab} onTabChange={setActiveTab} />
      </View>

      <ScrollView
        style={[styles.sheetScroll, { marginTop: -sHeight(4) }]}
        contentContainerStyle={{
          paddingBottom: Math.max(insets.bottom, sHeight(24)),
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.contentSheet,
            {
              borderTopLeftRadius: sWidth(32),
              borderTopRightRadius: sWidth(32),
              paddingTop: sHeight(20),
              paddingHorizontal: sWidth(Spacing.screenPadding),
              minHeight: screenHeight * 0.55,
            },
          ]}
        >
          <View style={[styles.sectionHeader, { gap: sWidth(10), marginBottom: sHeight(12) }]}>
            <Ionicons name={sectionIcon} size={sWidth(22)} color={Colors.primaryDeep} />
            <Typography variant="headlineSm" color={Colors.textPrimary} style={{ fontSize: sFont(20) }}>
              {sectionLabel}
            </Typography>
          </View>

          {monument.summary ? (
            <Typography
              variant="bodyMd"
              color={Colors.textMuted}
              style={{ fontSize: sFont(14), lineHeight: sHeight(22), marginBottom: sHeight(16) }}
            >
              {monument.summary}
            </Typography>
          ) : null}

          {(monument.rating != null || monument.openingHours || monument.entryFee) && (
            <View style={[styles.metaBlock, { gap: sHeight(8), marginBottom: sHeight(16), paddingBottom: sHeight(16) }]}>
              {monument.rating != null ? (
                <View style={styles.metaItem}>
                  <Ionicons name="star" size={sWidth(14)} color={Colors.rating} />
                  <Typography variant="caption" color={Colors.textMuted} style={{ fontSize: sFont(13) }}>
                    {monument.rating}
                  </Typography>
                </View>
              ) : null}
              {monument.openingHours ? (
                <View style={styles.metaItem}>
                  <Ionicons name="time-outline" size={sWidth(14)} color={Colors.primaryDeep} />
                  <Typography variant="caption" color={Colors.textMuted} style={{ fontSize: sFont(13) }}>
                    {monument.openingHours}
                  </Typography>
                </View>
              ) : null}
              {monument.entryFee ? (
                <View style={styles.metaItem}>
                  <Ionicons name="ticket-outline" size={sWidth(14)} color={Colors.primaryDeep} />
                  <Typography variant="caption" color={Colors.textMuted} style={{ fontSize: sFont(13) }}>
                    {monument.entryFee}
                  </Typography>
                </View>
              ) : null}
            </View>
          )}

          {articles && articles.length > 0 ? (
            articles.map((article, index) => (
              <ArticleCard
                key={article.id}
                article={article}
                showDivider={index < articles.length - 1}
              />
            ))
          ) : (
            <Typography variant="bodyMd" color={Colors.textMuted} align="center" style={{ fontSize: sFont(15), paddingVertical: sHeight(24) }}>
              {emptyMessage}
            </Typography>
          )}
        </View>
      </ScrollView>

      <Modal visible={favoriteGateVisible} animationType="slide" onRequestClose={() => setFavoriteGateVisible(false)}>
        <GuestGateScreen
          variant="profile"
          onContinueBrowsing={() => setFavoriteGateVisible(false)}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundApp,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.backgroundApp,
  },
  hero: {
    width: '100%',
    overflow: 'hidden',
  },
  heroTopScrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
  },
  heroBottomFade: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(253, 246, 236, 0.55)',
  },
  heroNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heroNavRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  heroContent: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 36,
  },
  tabBarWrap: {},
  sheetScroll: {
    flex: 1,
  },
  contentSheet: {
    backgroundColor: Colors.backgroundApp,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: Colors.borderDividerLight,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  metaBlock: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.borderDivider,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
