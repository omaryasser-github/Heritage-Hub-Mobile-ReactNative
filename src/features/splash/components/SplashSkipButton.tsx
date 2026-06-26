import React from 'react';
import { TouchableOpacity, Text, StyleSheet, I18nManager } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Colors } from '../../../shared/constants/colors';
import { useResponsive } from '../../../shared/utils/responsive';

interface SplashSkipButtonProps {
  onPress: () => void;
  disabled?: boolean;
}

export const SplashSkipButton = ({ onPress, disabled }: SplashSkipButtonProps) => {
  const { t } = useTranslation();
  const { sFont, sWidth } = useResponsive();
  const chevronIcon = I18nManager.isRTL ? 'chevron-back' : 'arrow-forward';

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={styles.container}
      hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
      activeOpacity={0.7}
    >
      <Text style={[styles.label, { fontSize: sFont(15) }]}>{t('splash.skip')}</Text>
      <Ionicons name={chevronIcon} size={sWidth(18)} color={Colors.textOnDarkAccent} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  label: {
    color: Colors.textOnDarkAccent,
    fontWeight: '600',
  },
});
