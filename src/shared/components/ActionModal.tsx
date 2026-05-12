import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';
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
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDestructive = false,
  onConfirm,
  onCancel,
}: ActionModalProps) => {
  const { sWidth, sHeight, sFont } = useResponsive();

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onCancel}
    >
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={[styles.overlay, { padding: sWidth(24) }]}>
          <TouchableWithoutFeedback>
            <View style={[styles.container, { borderRadius: sWidth(16), padding: sWidth(24), maxWidth: sWidth(400) }]}>
              <Text style={[styles.title, { fontSize: sFont(20), marginBottom: sHeight(12) }]}>{title}</Text>
              <Text style={[styles.message, { fontSize: sFont(16), marginBottom: sHeight(24), lineHeight: sFont(24) }]}>{message}</Text>
              
              <View style={[styles.buttonContainer, { gap: sWidth(12) }]}>
                <TouchableOpacity style={[styles.cancelButton, { paddingVertical: sHeight(10), paddingHorizontal: sWidth(16), borderRadius: sWidth(8) }]} onPress={onCancel}>
                  <Text style={[styles.cancelText, { fontSize: sFont(16) }]}>{cancelText}</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.confirmButton, isDestructive && styles.destructiveButton, { paddingVertical: sHeight(10), paddingHorizontal: sWidth(16), borderRadius: sWidth(8) }]} 
                  onPress={onConfirm}
                >
                  <Text style={[styles.confirmText, { fontSize: sFont(16) }]}>{confirmText}</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A3728',
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 24,
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A3728',
  },
  confirmButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#D4AF37',
  },
  destructiveButton: {
    backgroundColor: '#D32F2F',
  },
  confirmText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
