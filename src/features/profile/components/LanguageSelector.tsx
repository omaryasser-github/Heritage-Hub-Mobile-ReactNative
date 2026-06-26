import React, { useState } from 'react';
import { ActivityIndicator, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { AppLanguage } from '../../../core/i18n/languages';
import { Typography } from '../../../shared/components/Typography';
import { Colors } from '../../../shared/constants/colors';
import { Spacing } from '../../../shared/constants/spacing';
import { useLanguage } from '../../../shared/hooks/useLanguage';
import { useTranslation } from 'react-i18next';

interface LanguageSelectorProps {
  visible: boolean;
  onClose: () => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ visible, onClose }) => {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage, supportedLanguages } = useLanguage();
  const [isChanging, setIsChanging] = useState(false);

  const handleSelectLanguage = async (lang: AppLanguage) => {
    if (isChanging || currentLanguage === lang) {
      onClose();
      return;
    }

    setIsChanging(true);
    onClose();

    try {
      await changeLanguage(lang);
    } finally {
      setIsChanging(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Typography variant="headlineSm" color={Colors.textPrimary} align="center" style={styles.title}>
            {t('settings.selectLanguage')}
          </Typography>

          {(Object.keys(supportedLanguages) as AppLanguage[]).map((key) => {
            const isSelected = currentLanguage === key;
            return (
              <TouchableOpacity
                key={key}
                style={[styles.optionRow, isSelected && styles.selectedOption]}
                onPress={() => handleSelectLanguage(key)}
                disabled={isChanging}
              >
                <Typography
                  variant="bodyLg"
                  color={isSelected ? Colors.primary : Colors.textPrimary}
                >
                  {supportedLanguages[key].nativeLabel} ({supportedLanguages[key].label})
                </Typography>
              </TouchableOpacity>
            );
          })}

          {isChanging ? (
            <ActivityIndicator color={Colors.primary} style={styles.loader} />
          ) : null}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: Colors.overlayDrawer,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.screenPadding,
  },
  modalContainer: {
    width: '100%',
    backgroundColor: Colors.surface,
    borderRadius: Spacing.borderRadius.lg,
    padding: Spacing.gutter,
    borderWidth: 1,
    borderColor: Colors.borderDivider,
  },
  title: {
    marginBottom: Spacing.stackMd,
  },
  optionRow: {
    paddingVertical: Spacing.stackMd,
    paddingHorizontal: Spacing.gutter,
    borderRadius: Spacing.borderRadius.default,
    marginBottom: Spacing.stackSm,
  },
  selectedOption: {
    backgroundColor: Colors.primarySelected,
  },
  loader: {
    marginTop: Spacing.stackSm,
  },
});
