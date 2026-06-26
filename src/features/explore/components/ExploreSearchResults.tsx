import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Monument } from '../api/exploreService';
import { Typography } from '../../../shared/components/Typography';
import { Colors } from '../../../shared/constants/colors';
import { useResponsive } from '../../../shared/utils/responsive';

interface ExploreSearchResultsProps {
  results: Monument[];
  onSelect: (monument: Monument) => void;
}

const MAX_LIST_HEIGHT = 200;

export const ExploreSearchResults = ({ results, onSelect }: ExploreSearchResultsProps) => {
  const { t } = useTranslation();
  const { sWidth, sHeight, sFont } = useResponsive();

  return (
    <View
      style={[
        styles.container,
        {
          borderRadius: sWidth(14),
          marginTop: sHeight(8),
          maxHeight: sHeight(MAX_LIST_HEIGHT),
        },
      ]}
    >
      {results.length > 0 ? (
        <Typography
          variant="labelSm"
          color={Colors.textMuted}
          style={{ paddingHorizontal: sWidth(14), paddingTop: sHeight(10), fontSize: sFont(12) }}
        >
          {t('explore.resultsCount', { count: results.length })}
        </Typography>
      ) : null}

      <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        {results.length === 0 ? (
          <Typography
            variant="bodyMd"
            color={Colors.textMuted}
            align="center"
            style={{ padding: sWidth(16), fontSize: sFont(14) }}
          >
            {t('explore.noResults')}
          </Typography>
        ) : (
          results.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.row, { paddingHorizontal: sWidth(14), paddingVertical: sHeight(12) }]}
              onPress={() => onSelect(item)}
            >
              <Typography variant="labelLg" color={Colors.textTitle} style={{ fontSize: sFont(15) }}>
                {item.name}
              </Typography>
              <Typography
                variant="bodyMd"
                color={Colors.textMuted}
                style={{ fontSize: sFont(12), marginTop: 2 }}
                numberOfLines={1}
              >
                {item.location}
              </Typography>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    shadowColor: Colors.shadow,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 4,
    overflow: 'hidden',
  },
  row: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.borderDividerLight,
  },
});
