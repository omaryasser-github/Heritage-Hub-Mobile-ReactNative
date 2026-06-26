import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useTranslation } from 'react-i18next';
import { Colors } from '../../../shared/constants/colors';
import { HexagonBadge } from './HexagonBadge';
import { useResponsive } from '../../../shared/utils/responsive';

interface Badge {
  id: string;
  title: string;
}

export const BadgeHorizontalList = ({ badges }: { badges: Badge[] }) => {
  const { sWidth, sHeight, sFont } = useResponsive();
  const { t } = useTranslation();

  if (!badges || badges.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>{t('profile.noBadges')}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { marginTop: sHeight(24) }]}>
      <Text
        style={[
          styles.sectionTitle,
          { fontSize: sFont(18), marginStart: sWidth(24), marginBottom: sHeight(12) },
        ]}
      >
        {t('profile.myBadges')}
      </Text>
      <View style={[styles.listContainer, { height: sHeight(80) }]}>
        <FlashList
          data={badges}
          renderItem={({ item }) => <HexagonBadge title={item.title} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: sWidth(16) }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginStart: 24,
    marginBottom: 12,
  },
  listContainer: {
    height: 80,
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    color: Colors.textSubtle,
    fontStyle: 'italic',
  },
});
