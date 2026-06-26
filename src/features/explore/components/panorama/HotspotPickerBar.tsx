import React from 'react';
import { ScrollView, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Typography } from '../../../../shared/components/Typography';
import { Colors } from '../../../../shared/constants/colors';
import { useResponsive } from '../../../../shared/utils/responsive';
import { LocalizedPanoramaHotspot } from '../../../../core/data/types';

interface HotspotPickerBarProps {
  hotspots: LocalizedPanoramaHotspot[];
  selectedId?: string | null;
  onSelect: (hotspot: LocalizedPanoramaHotspot) => void;
}

export const HotspotPickerBar = ({ hotspots, selectedId, onSelect }: HotspotPickerBarProps) => {
  const { t } = useTranslation();
  const { sWidth, sHeight, sFont } = useResponsive();

  return (
    <View style={[styles.container, { paddingVertical: sHeight(10), gap: sHeight(8) }]}>
      <View style={[styles.titleRow, { paddingHorizontal: sWidth(16), gap: sWidth(6) }]}>
        <Ionicons name="location" size={sWidth(16)} color={Colors.primary} />
        <Typography variant="labelLg" color={Colors.textOnDark} style={{ fontSize: sFont(13) }}>
          {t('cardDetails.panoramaHotspotsTitle')}
        </Typography>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingHorizontal: sWidth(12), gap: sWidth(8) }]}
      >
        {hotspots.map((hotspot) => {
          const isSelected = hotspot.id === selectedId;
          return (
            <TouchableOpacity
              key={hotspot.id}
              onPress={() => onSelect(hotspot)}
              style={[
                styles.chip,
                {
                  paddingHorizontal: sWidth(14),
                  paddingVertical: sHeight(10),
                  borderRadius: sWidth(20),
                },
                isSelected && styles.chipSelected,
              ]}
              activeOpacity={0.85}
            >
              <Ionicons
                name="ellipse"
                size={sWidth(8)}
                color={isSelected ? Colors.textPrimary : Colors.primary}
              />
              <Typography
                variant="labelLg"
                color={isSelected ? Colors.textPrimary : Colors.textOnDark}
                style={{ fontSize: sFont(13), maxWidth: sWidth(180) }}
                numberOfLines={1}
              >
                {hotspot.title}
              </Typography>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(20, 12, 6, 0.82)',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(255, 255, 255, 0.15)',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  chipSelected: {
    backgroundColor: Colors.tabActive,
    borderColor: Colors.primaryMuted,
  },
});
