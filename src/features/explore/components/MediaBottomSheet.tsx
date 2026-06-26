import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { I18nManager } from 'react-native';
import { Typography } from '../../../shared/components/Typography';
import { Colors } from '../../../shared/constants/colors';
import { Spacing } from '../../../shared/constants/spacing';
import { useResponsive } from '../../../shared/utils/responsive';
import { LocalizedPanoramaHotspot } from '../../../core/data/types';
import { useAuthStore } from '../../../core/store/authStore';
import { navigateAuthScreen, navigateToAiGuideTab } from '../../../navigation/authNavigation';
import { useChatbotStore } from '../../chatbot/store/useChatbotStore';
import { HotspotChatContext } from '../../chatbot/types/hotspotChatContext';

interface MediaBottomSheetProps {
  visible: boolean;
  hotspot: LocalizedPanoramaHotspot | null;
  monumentSlug: string;
  monumentName: string;
  onClose: () => void;
}

export const MediaBottomSheet = ({
  visible,
  hotspot,
  monumentSlug,
  monumentName,
  onClose,
}: MediaBottomSheetProps) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const { t, i18n } = useTranslation();
  const { sWidth, sHeight, sFont } = useResponsive();
  const isGuest = useAuthStore((state) => state.isGuest);
  const setPendingHotspotContext = useChatbotStore((state) => state.setPendingHotspotContext);

  if (!hotspot) return null;

  const openAiGuideWithContext = () => {
    const context: HotspotChatContext = {
      hotspotId: hotspot.id,
      hotspotTitle: hotspot.title,
      monumentSlug,
      monumentName,
      summary: hotspot.content,
      locale: i18n.language,
    };

    setPendingHotspotContext(context);
    onClose();
    requestAnimationFrame(() => {
      navigateToAiGuideTab(navigation);
    });
  };

  const handleAskAiGuide = () => {
    if (isGuest) {
      Alert.alert(
        t('cardDetails.askAiGuide'),
        t('cardDetails.askAiGuideGuestPrompt'),
        [
          { text: t('common.cancel'), style: 'cancel' },
          {
            text: t('auth.login'),
            onPress: () => navigateAuthScreen(navigation, 'Login'),
          },
        ]
      );
      return;
    }

    openAiGuideWithContext();
  };

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

          <TouchableOpacity
            style={[
              styles.askAiButton,
              {
                marginTop: sHeight(20),
                paddingVertical: sHeight(12),
                paddingHorizontal: sWidth(16),
                borderRadius: sWidth(14),
                gap: sWidth(10),
              },
            ]}
            onPress={handleAskAiGuide}
            accessibilityRole="button"
            accessibilityLabel={t('cardDetails.askAiGuideAbout', { title: hotspot.title })}
          >
            <Image
              source={require('../../../../assets/Home/icons/AI-icon.png')}
              style={{ width: sWidth(28), height: sWidth(28) }}
              resizeMode="contain"
            />
            <View style={styles.askAiTextBlock}>
              <Typography variant="labelLg" color={Colors.primaryDeep} style={{ fontSize: sFont(14) }}>
                {t('cardDetails.askAiGuide')}
              </Typography>
              <Typography variant="bodyMd" color={Colors.textMuted} style={{ fontSize: sFont(12), marginTop: 2 }}>
                {t('cardDetails.askAiGuideSubtitle', { title: hotspot.title })}
              </Typography>
            </View>
            <Ionicons
              name={I18nManager.isRTL ? 'chevron-back' : 'chevron-forward'}
              size={sWidth(18)}
              color={Colors.primaryDeep}
            />
          </TouchableOpacity>
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
    maxHeight: '52%',
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 4,
  },
  askAiButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryContainer,
  },
  askAiTextBlock: {
    flex: 1,
  },
});
