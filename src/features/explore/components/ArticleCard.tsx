import React from 'react';
import { TouchableOpacity, View, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Typography } from '../../../shared/components/Typography';
import { Colors } from '../../../shared/constants/colors';
import { Spacing } from '../../../shared/constants/spacing';
import { useResponsive } from '../../../shared/utils/responsive';
import { LocalizedArticle } from '../../../core/data/types';

const ARTICLE_THUMBNAIL = require('../../../../assets/Home/card.png');
const READ_MORE_COLOR = '#6B7BC6';

interface ArticleCardProps {
  article: LocalizedArticle;
  thumbnail?: ImageSourcePropType;
  onPress?: () => void;
  showDivider?: boolean;
}

export const ArticleCard = ({ article, thumbnail, onPress, showDivider = true }: ArticleCardProps) => {
  const { t } = useTranslation();
  const { sWidth, sHeight, sFont } = useResponsive();
  const thumbSize = sWidth(72);

  return (
    <>
      <TouchableOpacity
        activeOpacity={onPress ? 0.85 : 1}
        onPress={onPress}
        style={[styles.row, { paddingVertical: sHeight(16), gap: sWidth(14) }]}
      >
        <Image
          source={thumbnail ?? ARTICLE_THUMBNAIL}
          style={[
            styles.thumbnail,
            {
              width: thumbSize,
              height: thumbSize,
              borderRadius: sWidth(12),
            },
          ]}
          resizeMode="cover"
        />
        <View style={styles.textCol}>
          <Typography
            variant="headlineSm"
            color={Colors.textPrimary}
            style={{ fontSize: sFont(16), marginBottom: sHeight(4) }}
          >
            {article.title}
          </Typography>
          <Typography
            variant="bodyMd"
            color={Colors.textMuted}
            numberOfLines={3}
            style={{ lineHeight: sHeight(20), fontSize: sFont(13), marginBottom: sHeight(6) }}
          >
            {article.body}
          </Typography>
          <Typography
            variant="labelSm"
            color={READ_MORE_COLOR}
            style={{ fontSize: sFont(13), textDecorationLine: 'underline' }}
          >
            {t('cardDetails.readMore')}
          </Typography>
        </View>
      </TouchableOpacity>
      {showDivider ? <View style={styles.divider} /> : null}
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  thumbnail: {
    backgroundColor: Colors.primaryContainer,
  },
  textCol: {
    flex: 1,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.borderDivider,
  },
});
