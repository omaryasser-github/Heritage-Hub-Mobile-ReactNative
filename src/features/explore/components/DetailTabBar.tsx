import React from 'react';
import { TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { Typography } from '../../../shared/components/Typography';
import { Colors } from '../../../shared/constants/colors';
import { Spacing } from '../../../shared/constants/spacing';
import { useResponsive } from '../../../shared/utils/responsive';
import { getPanoramaTabIcon, getSectionIcon } from './CategoryIcon';

export type DetailTab = 'history' | 'culture';

interface DetailTabBarProps {
  activeTab: DetailTab;
  onTabChange: (tab: DetailTab) => void;
  showPanorama?: boolean;
  onPanoramaPress?: () => void;
}

export const DetailTabBar = ({
  activeTab,
  onTabChange,
  showPanorama = false,
  onPanoramaPress,
}: DetailTabBarProps) => {
  const { t } = useTranslation();
  const { sWidth, sHeight, sFont } = useResponsive();

  const tabs: { id: DetailTab; label: string }[] = [
    { id: 'history', label: t('cardDetails.tabHistory') },
    { id: 'culture', label: t('cardDetails.tabCulture') },
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[
        styles.pill,
        {
          borderRadius: sWidth(Spacing.borderRadius.full),
          padding: sWidth(4),
          gap: sWidth(4),
        },
      ]}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        const iconName = getSectionIcon(tab.id);

        return (
          <TouchableOpacity
            key={tab.id}
            onPress={() => onTabChange(tab.id)}
            style={[
              styles.tab,
              {
                paddingHorizontal: sWidth(14),
                paddingVertical: sHeight(8),
                borderRadius: sWidth(Spacing.borderRadius.full),
                gap: sWidth(6),
              },
              isActive && styles.tabActive,
            ]}
            activeOpacity={0.8}
          >
            <Ionicons
              name={iconName}
              size={sWidth(14)}
              color={isActive ? Colors.textPrimary : Colors.textMuted}
            />
            <Typography
              variant="labelLg"
              color={isActive ? Colors.textPrimary : Colors.textMuted}
              style={{ fontSize: sFont(12) }}
              numberOfLines={1}
            >
              {tab.label}
            </Typography>
          </TouchableOpacity>
        );
      })}

      {showPanorama ? (
        <TouchableOpacity
          onPress={onPanoramaPress}
          style={[
            styles.tab,
            {
              paddingHorizontal: sWidth(14),
              paddingVertical: sHeight(8),
              borderRadius: sWidth(Spacing.borderRadius.full),
              gap: sWidth(6),
            },
          ]}
          activeOpacity={0.8}
        >
          <Ionicons name={getPanoramaTabIcon()} size={sWidth(14)} color={Colors.textMuted} />
          <Typography
            variant="labelLg"
            color={Colors.textMuted}
            style={{ fontSize: sFont(12) }}
            numberOfLines={1}
          >
            {t('cardDetails.tabPanorama')}
          </Typography>
        </TouchableOpacity>
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(253, 246, 236, 0.92)',
    borderWidth: 1,
    borderColor: Colors.borderDividerLight,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabActive: {
    backgroundColor: Colors.tabActive,
    borderWidth: 1,
    borderColor: Colors.primaryMuted,
  },
});
