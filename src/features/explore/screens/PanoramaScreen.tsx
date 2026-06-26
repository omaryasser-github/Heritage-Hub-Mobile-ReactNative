import React, { useMemo, useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { I18nManager } from 'react-native';
import { panoramaService } from '../api/panoramaService';
import { monumentService } from '../api/monumentService';
import { PanoramaViewer, PanoramaViewerHandle } from '../components/panorama/PanoramaViewer';
import { HotspotPickerBar } from '../components/panorama/HotspotPickerBar';
import { MediaBottomSheet } from '../components/MediaBottomSheet';
import { Typography } from '../../../shared/components/Typography';
import { PrimaryButton } from '../../../shared/components/PrimaryButton';
import { Colors } from '../../../shared/constants/colors';
import { Spacing } from '../../../shared/constants/spacing';
import { useResponsive } from '../../../shared/utils/responsive';
import { LocalizedPanoramaHotspot } from '../../../core/data/types';

type PanoramaRouteParams = {
  Panorama: { slug: string };
};

const FALLBACK_TEXTURE = require('../../../../assets/Home/panorama/bobelatic-alex.png');

export const PanoramaScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<PanoramaRouteParams, 'Panorama'>>();
  const { slug } = route.params;
  const insets = useSafeAreaInsets();
  const { t, i18n } = useTranslation();
  const { sWidth, sHeight, sFont } = useResponsive();
  const viewerRef = useRef<PanoramaViewerHandle>(null);

  const [selectedHotspot, setSelectedHotspot] = useState<LocalizedPanoramaHotspot | null>(null);
  const [focusedHotspotId, setFocusedHotspotId] = useState<string | null>(null);

  const panorama = useMemo(() => {
    void i18n.language;
    return panoramaService.getBySlug(slug);
  }, [slug, i18n.language]);

  const monumentName = useMemo(() => {
    void i18n.language;
    return monumentService.getBySlug(slug)?.name;
  }, [slug, i18n.language]);

  const handleHotspotSelect = (hotspot: LocalizedPanoramaHotspot) => {
    setFocusedHotspotId(hotspot.id);
    viewerRef.current?.focusHotspot(hotspot);
    setSelectedHotspot(hotspot);
  };

  if (!panorama) {
    return (
      <View style={[styles.centered, { paddingTop: insets.top, paddingHorizontal: sWidth(24) }]}>
        <Image source={FALLBACK_TEXTURE} style={styles.fallbackImage} resizeMode="cover" />
        <Typography
          variant="bodyMd"
          color={Colors.textPrimary}
          align="center"
          style={{ marginTop: sHeight(16), fontSize: sFont(15) }}
        >
          {t('cardDetails.panoramaUnavailable')}
        </Typography>
        <PrimaryButton
          title={t('cardDetails.panoramaBack')}
          onPress={() => navigation.goBack()}
          style={{ marginTop: sHeight(20), width: '100%' }}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <PanoramaViewer
        ref={viewerRef}
        texture={panorama.texture}
        viewConfig={panorama.viewConfig}
        hotspots={panorama.hotspots}
        focusedHotspotId={focusedHotspotId}
        onHotspotSelect={handleHotspotSelect}
      />

      <View style={[styles.topBar, { paddingTop: insets.top + sHeight(8), paddingHorizontal: sWidth(Spacing.screenPadding) }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons
            name={I18nManager.isRTL ? 'arrow-forward' : 'arrow-back'}
            size={sWidth(24)}
            color={Colors.textOnDark}
          />
        </TouchableOpacity>
        {monumentName ? (
          <Typography
            variant="labelLg"
            color={Colors.textOnDark}
            numberOfLines={1}
            style={{ flex: 1, textAlign: 'center', fontSize: sFont(14) }}
          >
            {monumentName}
          </Typography>
        ) : (
          <View style={{ flex: 1 }} />
        )}
        <View style={styles.backButton} />
      </View>

      <View style={[styles.bottomChrome, { paddingBottom: Math.max(insets.bottom, sHeight(8)) }]}>
        <HotspotPickerBar
          hotspots={panorama.hotspots}
          selectedId={focusedHotspotId}
          onSelect={handleHotspotSelect}
        />
      </View>

      <MediaBottomSheet
        visible={selectedHotspot != null}
        hotspot={selectedHotspot}
        onClose={() => setSelectedHotspot(null)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surfaceDark,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.backgroundApp,
  },
  fallbackImage: {
    width: '100%',
    height: 220,
    borderRadius: 16,
  },
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  backButton: {
    width: 32,
    alignItems: 'flex-start',
  },
  bottomChrome: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});
