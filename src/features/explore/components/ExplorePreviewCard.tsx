import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Monument } from '../api/exploreService';
import { Typography } from '../../../shared/components/Typography';
import { PrimaryButton } from '../../../shared/components/PrimaryButton';
import { Colors } from '../../../shared/constants/colors';
import { useResponsive } from '../../../shared/utils/responsive';

interface ExplorePreviewCardProps {
  monument: Monument;
  hasPanorama: boolean;
  onViewDetails: () => void;
  onDismiss: () => void;
}

export const ExplorePreviewCard = ({
  monument,
  hasPanorama,
  onViewDetails,
  onDismiss,
}: ExplorePreviewCardProps) => {
  const { t } = useTranslation();
  const { sWidth, sHeight, sFont } = useResponsive();

  const subtitle =
    monument.governorateName && monument.cityName !== monument.governorateName
      ? `${monument.cityName}, ${monument.governorateName}`
      : monument.location;

  return (
    <View
      style={[
        styles.card,
        {
          borderRadius: sWidth(20),
          padding: sWidth(16),
          marginHorizontal: sWidth(16),
        },
      ]}
    >
      <View style={styles.handle} />
      <TouchableOpacity
        style={styles.closeBtn}
        onPress={onDismiss}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Ionicons name="close" size={sWidth(22)} color={Colors.textMuted} />
      </TouchableOpacity>

      <View style={styles.contentRow}>
        <View style={styles.thumbWrap}>
          <Image
            source={monument.image}
            style={[styles.thumb, { width: sWidth(72), height: sWidth(72), borderRadius: sWidth(12) }]}
            resizeMode="cover"
          />
          {hasPanorama ? (
            <View style={[styles.panoramaBadge, { borderRadius: sWidth(8), paddingHorizontal: sWidth(6) }]}>
              <Ionicons name="globe-outline" size={sWidth(10)} color={Colors.textOnDark} />
              <Typography variant="labelSm" color={Colors.textOnDark} style={{ fontSize: sFont(9), marginStart: 2 }}>
                360°
              </Typography>
            </View>
          ) : null}
        </View>

        <View style={styles.textBlock}>
          <Typography variant="headlineSm" color={Colors.textTitle} numberOfLines={2} style={{ fontSize: sFont(16) }}>
            {monument.name}
          </Typography>
          <View style={[styles.locationRow, { marginTop: sHeight(6) }]}>
            <Ionicons name="location-outline" size={sWidth(14)} color={Colors.primaryDeep} />
            <Typography
              variant="bodyMd"
              color={Colors.primaryDeep}
              numberOfLines={2}
              style={{ flex: 1, marginStart: sWidth(4), fontSize: sFont(13) }}
            >
              {subtitle}
            </Typography>
          </View>
        </View>
      </View>

      <PrimaryButton
        title={t('explore.viewDetails')}
        onPress={onViewDetails}
        style={{ marginTop: sHeight(14), backgroundColor: Colors.primary }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    shadowColor: Colors.shadow,
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 12,
    elevation: 8,
  },
  handle: {
    alignSelf: 'center',
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.borderDivider,
    marginBottom: 8,
  },
  closeBtn: {
    position: 'absolute',
    top: 12,
    end: 12,
    zIndex: 1,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingEnd: 28,
  },
  thumbWrap: {
    position: 'relative',
  },
  thumb: {
    backgroundColor: Colors.backgroundNeutral,
  },
  panoramaBadge: {
    position: 'absolute',
    bottom: 4,
    start: 4,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.55)',
    paddingVertical: 2,
  },
  textBlock: {
    flex: 1,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
});
