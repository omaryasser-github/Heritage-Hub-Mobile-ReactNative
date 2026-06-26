import React, { useState, useRef, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
  FlatList,
  I18nManager,
} from 'react-native';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Colors } from '../../../shared/constants/colors';

export const ChatSidebarMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { width } = useSafeAreaFrame();
  const { t } = useTranslation();
  const panelWidth = width * 0.72;
  const closedOffset = I18nManager.isRTL ? -panelWidth : panelWidth;
  const slideAnim = useRef(new Animated.Value(closedOffset)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  const historyChats = useMemo(
    () => [
      { id: '1', title: t('chatbot.historySphinx') },
      { id: '2', title: t('chatbot.historyPyramids') },
      { id: '3', title: t('chatbot.historyTut') },
    ],
    [t]
  );

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

  return (
    <>
      <TouchableOpacity
        style={styles.menuBtn}
        onPress={openMenu}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <View style={[styles.line, { width: 22 }]} />
        <View style={[styles.line, { width: 16 }]} />
        <View style={[styles.line, { width: 10 }]} />
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
          style={[styles.panel, { width: panelWidth, transform: [{ translateX: slideAnim }] }]}
        >
          <View style={styles.panelHeader}>
            <Text style={styles.panelTitle}>{t('chatbot.chatMenu')}</Text>
            <TouchableOpacity onPress={closeMenu} style={styles.closeBtn}>
              <Ionicons name="close" size={22} color={Colors.textPrimary} />
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.newChatBtn} activeOpacity={0.7} onPress={closeMenu}>
            <View style={styles.newChatBtnLeft}>
              <View style={styles.iconWrapper}>
                <Ionicons name="add" size={22} color={Colors.primaryDeep} />
              </View>
              <Text style={styles.newChatText}>{t('chatbot.newChat')}</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.itemDivider} />

          <Text style={styles.sectionTitle}>{t('chatbot.recentHistory')}</Text>

          <FlatList
            data={historyChats}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.menuItem} activeOpacity={0.7} onPress={closeMenu}>
                <View style={styles.menuItemLeft}>
                  <View style={styles.iconWrapperSmall}>
                    <Ionicons name="chatbubble-outline" size={16} color={Colors.primaryDeep} />
                  </View>
                  <Text style={styles.menuItemText}>{item.title}</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color={Colors.primaryMuted} />
              </TouchableOpacity>
            )}
          />
        </Animated.View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  menuBtn: {
    gap: 5,
    alignItems: 'flex-end',
    justifyContent: 'center',
    padding: 4,
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
    paddingTop: 56,
    paddingHorizontal: 20,
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
    marginBottom: 16,
  },
  panelTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.textPrimary,
    letterSpacing: 0.4,
  },
  closeBtn: {
    padding: 4,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderDivider,
    marginBottom: 12,
  },
  itemDivider: {
    height: 1,
    backgroundColor: Colors.borderDividerLight,
    marginVertical: 8,
    marginStart: 52,
  },
  newChatBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  newChatBtnLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapperSmall: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: Colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  newChatText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textDisabled,
    marginTop: 16,
    marginBottom: 8,
    marginStart: 4,
    textTransform: 'uppercase',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  menuItemText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
});
