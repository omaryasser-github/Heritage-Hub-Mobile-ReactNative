import React from 'react';
import { Modal, View, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Colors } from '../constants/colors';
import { Spacing } from '../constants/spacing';
import { Typography } from './Typography';
import { useResponsive } from '../utils/responsive';

interface ActionModalProps {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ActionModal = ({
  visible,
  title,
  message,
  confirmText,
  cancelText,
  isDestructive = false,
  onConfirm,
  onCancel,
}: ActionModalProps) => {
  const { sWidth, sHeight } = useResponsive();
  const { t } = useTranslation();
  const resolvedConfirmText = confirmText ?? t('common.confirm');
  const resolvedCancelText = cancelText ?? t('common.cancel');

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={[styles.overlay, { padding: sWidth(Spacing.screenPadding) }]}>
          <TouchableWithoutFeedback>
            <View
              style={[
                styles.container,
                {
                  borderRadius: sWidth(Spacing.borderRadius.lg),
                  padding: sWidth(Spacing.screenPadding),
                  maxWidth: sWidth(400),
                },
              ]}
            >
              <Typography
                variant="headlineSm"
                color={Colors.textPrimary}
                style={{ marginBottom: sHeight(Spacing.stackMd) }}
              >
                {title}
              </Typography>
              <Typography
                variant="bodyMd"
                color={Colors.textMuted}
                style={{ marginBottom: sHeight(Spacing.stackLg), lineHeight: sHeight(24) }}
              >
                {message}
              </Typography>

              <View style={[styles.buttonContainer, { gap: sWidth(Spacing.stackMd) }]}>
                <TouchableOpacity
                  style={[
                    styles.cancelButton,
                    {
                      paddingVertical: sHeight(10),
                      paddingHorizontal: sWidth(Spacing.gutter),
                      borderRadius: sWidth(Spacing.borderRadius.default),
                    },
                  ]}
                  onPress={onCancel}
                >
                  <Typography variant="labelLg" color={Colors.textPrimary}>
                    {resolvedCancelText}
                  </Typography>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.confirmButton,
                    isDestructive && styles.destructiveButton,
                    {
                      paddingVertical: sHeight(10),
                      paddingHorizontal: sWidth(Spacing.gutter),
                      borderRadius: sWidth(Spacing.borderRadius.default),
                    },
                  ]}
                  onPress={onConfirm}
                >
                  <Typography variant="labelLg" color={Colors.textOnDark}>
                    {resolvedConfirmText}
                  </Typography>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: Colors.overlayModal,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: Colors.surface,
    width: '100%',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cancelButton: {
    backgroundColor: Colors.backgroundNeutral,
  },
  confirmButton: {
    backgroundColor: Colors.primarySolid,
  },
  destructiveButton: {
    backgroundColor: Colors.errorDestructive,
  },
});
