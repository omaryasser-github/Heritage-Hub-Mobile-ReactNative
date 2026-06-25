import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
  Switch,
  I18nManager,
} from 'react-native';
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useResponsive } from '../../../shared/utils/responsive';
import { Colors } from '../../../shared/constants/colors';
import { useLanguage } from '../../../shared/hooks/useLanguage';

export const HeaderMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChangingLanguage, setIsChangingLanguage] = useState(false);
  const { width } = useSafeAreaFrame();
  const insets = useSafeAreaInsets();
  const { sWidth, sHeight, sFont } = useResponsive();
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage } = useLanguage();
  const panelWidth = width * 0.72;
  const closedOffset = I18nManager.isRTL ? -panelWidth : panelWidth;
  const slideAnim = useRef(new Animated.Value(closedOffset)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  const isArabic = currentLanguage === 'ar';

  const openMenu = () => {
    setIsOpen(true);
    Animated.parallel([
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 70,
        friction: 12,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeMenu = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: closedOffset,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => setIsOpen(false));
  };

  const handleLanguageToggle = useCallback(
    async (value: boolean) => {
      if (isChangingLanguage) return;
      const targetLang = value ? 'ar' : 'en';
      if (targetLang === currentLanguage) return;

      setIsChangingLanguage(true);
      try {
        closeMenu();
        await changeLanguage(targetLang);
      } finally {
        setIsChangingLanguage(false);
      }
    },
    [changeLanguage, currentLanguage, isChangingLanguage]
  );

  return (
    <>
      <TouchableOpacity
        style={[styles.menuBtn, { padding: sWidth(4), gap: sHeight(5) }]}
        onPress={openMenu}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <View style={[styles.line, { width: sWidth(22) }]} />
        <View style={[styles.line, { width: sWidth(16) }]} />
        <View style={[styles.line, { width: sWidth(10) }]} />
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        transparent
        animationType="none"
        statusBarTranslucent
        onRequestClose={closeMenu}
      >
        <TouchableWithoutFeedback onPress={closeMenu}>
          <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]} />
        </TouchableWithoutFeedback>

        <Animated.View
          style={[
            styles.panel,
            {
              width: panelWidth,
              transform: [{ translateX: slideAnim }],
              paddingTop: insets.top + sHeight(16),
              paddingHorizontal: sWidth(20),
            },
          ]}
        >
          <View style={[styles.panelHeader, { marginBottom: sHeight(16) }]}>
            <Text style={[styles.panelTitle, { fontSize: sFont(20) }]}>{t('common.menu')}</Text>
            <TouchableOpacity onPress={closeMenu} style={[styles.closeBtn, { padding: sWidth(4) }]}>
              <Ionicons name="close" size={sWidth(22)} color={Colors.textPrimary} />
            </TouchableOpacity>
          </View>

          <View style={[styles.divider, { marginBottom: sHeight(12) }]} />

          <TouchableOpacity
            style={[styles.menuItem, { paddingVertical: sHeight(14) }]}
            activeOpacity={0.7}
          >
            <View style={[styles.menuItemLeft, { gap: sWidth(14) }]}>
              <View
                style={[
                  styles.iconWrapper,
                  { width: sWidth(36), height: sWidth(36), borderRadius: sWidth(10) },
                ]}
              >
                <Ionicons name="notifications-outline" size={sWidth(20)} color={Colors.primaryDeep} />
              </View>
              <Text style={[styles.menuItemText, { fontSize: sFont(15) }]}>
                {t('common.notifications')}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={sWidth(16)} color={Colors.primaryMuted} />
          </TouchableOpacity>

          <View style={[styles.itemDivider, { marginVertical: sHeight(4), marginStart: sWidth(52) }]} />

          <View style={[styles.menuItem, { paddingVertical: sHeight(14) }]}>
            <View style={[styles.menuItemLeft, { gap: sWidth(14) }]}>
              <View
                style={[
                  styles.iconWrapper,
                  { width: sWidth(36), height: sWidth(36), borderRadius: sWidth(10) },
                ]}
              >
                <Ionicons name="language-outline" size={sWidth(20)} color={Colors.primaryDeep} />
              </View>
              <Text style={[styles.menuItemText, { fontSize: sFont(15) }]}>
                {t('common.language')}
              </Text>
            </View>
            <View style={[styles.langToggleRow, { gap: sWidth(4) }]}>
              <Text
                style={[
                  styles.langLabel,
                  { fontSize: sFont(13) },
                  !isArabic && styles.langActive,
                ]}
              >
                {t('common.english')}
              </Text>
              <Switch
                value={isArabic}
                onValueChange={handleLanguageToggle}
                disabled={isChangingLanguage}
                thumbColor={Colors.primaryDeep}
                trackColor={{ false: Colors.primarySoft, true: Colors.primarySoft }}
                style={styles.switch}
              />
              <Text
                style={[
                  styles.langLabel,
                  { fontSize: sFont(13) },
                  isArabic && styles.langActive,
                ]}
              >
                {t('common.arabic')}
              </Text>
            </View>
          </View>

          <View style={[styles.itemDivider, { marginVertical: sHeight(4), marginStart: sWidth(52) }]} />

          <TouchableOpacity
            style={[styles.menuItem, { paddingVertical: sHeight(14) }]}
            activeOpacity={0.7}
            onPress={() => {
              closeMenu();
              setTimeout(() => navigation.navigate('Settings' as never), 260);
            }}
          >
            <View style={[styles.menuItemLeft, { gap: sWidth(14) }]}>
              <View
                style={[
                  styles.iconWrapper,
                  { width: sWidth(36), height: sWidth(36), borderRadius: sWidth(10) },
                ]}
              >
                <Ionicons name="settings-outline" size={sWidth(20)} color={Colors.primaryDeep} />
              </View>
              <Text style={[styles.menuItemText, { fontSize: sFont(15) }]}>
                {t('common.settings')}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={sWidth(16)} color={Colors.primaryMuted} />
          </TouchableOpacity>
        </Animated.View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  menuBtn: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  line: {
    height: 2.5,
    borderRadius: 2,
    backgroundColor: Colors.textOnDark,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.overlayDrawer,
  },
  panel: {
    position: 'absolute',
    end: 0,
    top: 0,
    bottom: 0,
    backgroundColor: Colors.backgroundApp,
    shadowColor: Colors.shadow,
    shadowOpacity: 0.18,
    shadowOffset: { width: -4, height: 0 },
    shadowRadius: 16,
    elevation: 12,
  },
  panelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  panelTitle: {
    fontWeight: '700',
    color: Colors.textPrimary,
    letterSpacing: 0.4,
  },
  closeBtn: {},
  divider: {
    height: 1,
    backgroundColor: Colors.borderDivider,
  },
  itemDivider: {
    height: 1,
    backgroundColor: Colors.borderDividerLight,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    backgroundColor: Colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItemText: {
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  langToggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  langLabel: {
    fontWeight: '700',
    color: Colors.textDisabled,
  },
  langActive: {
    color: Colors.primaryDeep,
  },
  switch: {
    transform: [{ scaleX: 0.85 }, { scaleY: 0.85 }],
  },
});
