import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Typography } from '../../../shared/components/Typography';
import { Colors } from '../../../shared/constants/colors';
import { Spacing } from '../../../shared/constants/spacing';
import { useResponsive } from '../../../shared/utils/responsive';
import { LocalizedPanoramaHotspot } from '../../../core/data/types';

interface MediaBottomSheetProps {
  visible: boolean;
  hotspot: LocalizedPanoramaHotspot | null;
  onClose: () => void;
}

export const MediaBottomSheet = ({ visible, hotspot, onClose }: MediaBottomSheetProps) => {
  const insets = useSafeAreaInsets();
  const { sWidth, sHeight, sFont } = useResponsive();

  if (!hotspot) return null;

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View
        style={[
          styles.sheet,
          {
            paddingBottom: Math.max(insets.bottom, sHeight(16)),
            paddingHorizontal: sWidth(Spacing.screenPadding),
            paddingTop: sHeight(16),
            borderTopLeftRadius: sWidth(24),
            borderTopRightRadius: sWidth(24),
          },
        ]}
      >
        <View style={styles.sheetHeader}>
          <Typography variant="headlineSm" color={Colors.textPrimary} style={{ flex: 1, fontSize: sFont(18) }}>
            {hotspot.title}
          </Typography>
          <TouchableOpacity onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Ionicons name="close" size={sWidth(24)} color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Typography
            variant="bodyMd"
            color={Colors.textMuted}
            style={{ fontSize: sFont(15), lineHeight: sHeight(22), marginTop: sHeight(8) }}
          >
            {hotspot.content}
          </Typography>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: Colors.overlayModal,
  },
  sheet: {
    backgroundColor: Colors.backgroundApp,
    maxHeight: '45%',
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 4,
  },
});
