import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
  Switch,
} from 'react-native';
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


export const HeaderMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isArabic, setIsArabic] = useState(false);
  // useSafeAreaFrame gives the live screen dimensions from SafeAreaProvider —
  // more reliable than Dimensions.get('window') on foldables and during rotation.
  const { width } = useSafeAreaFrame();
  const insets = useSafeAreaInsets();
  const panelWidth = width * 0.72;
  const slideAnim = useRef(new Animated.Value(panelWidth)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

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
        toValue: panelWidth,
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
      {/* Shortlist-style trigger icon — 3 lines of descending width for a "filter list" feel */}
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
        {/* Dimmed backdrop — tap anywhere outside to close */}
        <TouchableWithoutFeedback onPress={closeMenu}>
          <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]} />
        </TouchableWithoutFeedback>

        {/* Slide-in panel from the right */}
        <Animated.View
          style={[styles.panel, { width: panelWidth, transform: [{ translateX: slideAnim }], paddingTop: insets.top + 16 }]}
        >
          {/* Panel Header */}
          <View style={styles.panelHeader}>
            <Text style={styles.panelTitle}>Menu</Text>
            <TouchableOpacity onPress={closeMenu} style={styles.closeBtn}>
              <Ionicons name="close" size={22} color="#4A3728" />
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          {/* ── Notifications ── */}
          <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
            <View style={styles.menuItemLeft}>
              <View style={styles.iconWrapper}>
                <Ionicons name="notifications-outline" size={20} color="#8B6914" />
              </View>
              <Text style={styles.menuItemText}>Notifications</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#C5A55A" />
          </TouchableOpacity>

          <View style={styles.itemDivider} />

          {/* ── Language Toggle AR / EN ── */}
          <View style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <View style={styles.iconWrapper}>
                <Ionicons name="language-outline" size={20} color="#8B6914" />
              </View>
              <Text style={styles.menuItemText}>Language</Text>
            </View>
            <View style={styles.langToggleRow}>
              <Text style={[styles.langLabel, !isArabic && styles.langActive]}>EN</Text>
              <Switch
                value={isArabic}
                onValueChange={setIsArabic}
                thumbColor="#8B6914"
                trackColor={{ false: '#E0C385', true: '#E0C385' }}
                style={styles.switch}
              />
              <Text style={[styles.langLabel, isArabic && styles.langActive]}>AR</Text>
            </View>
          </View>

          <View style={styles.itemDivider} />

          {/* ── Settings → navigates to placeholder screen ── */}
          <TouchableOpacity
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={() => {
              closeMenu();
              // Small delay so the close animation plays before navigation
              setTimeout(() => navigation.navigate('Settings' as never), 260);
            }}
          >
            <View style={styles.menuItemLeft}>
              <View style={styles.iconWrapper}>
                <Ionicons name="settings-outline" size={20} color="#8B6914" />
              </View>
              <Text style={styles.menuItemText}>Settings</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#C5A55A" />
          </TouchableOpacity>
        </Animated.View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  /* ── Trigger Icon ── */
  menuBtn: {
    gap: 5,
    alignItems: 'flex-end',
    justifyContent: 'center',
    padding: 4,
  },
  line: {
    height: 2.5,
    borderRadius: 2,
    backgroundColor: '#FFFFFF',
  },

  /* ── Modal Backdrop ── */
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(30, 18, 8, 0.45)',
  },

  /* ── Slide Panel ── */
  panel: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    // width is applied as inline style using panelWidth from useSafeAreaFrame()
    backgroundColor: '#FDF6EC',
    paddingHorizontal: 20,
    shadowColor: '#000',
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
    color: '#4A3728',
    letterSpacing: 0.4,
  },
  closeBtn: {
    padding: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#E8D5B5',
    marginBottom: 12,
  },
  itemDivider: {
    height: 1,
    backgroundColor: '#F0E2C8',
    marginVertical: 4,
    marginLeft: 52,
  },

  /* ── Menu Items ── */
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#FFF0D6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItemText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#4A3728',
  },

  /* ── Language Toggle ── */
  langToggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  langLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#B8A080',
  },
  langActive: {
    color: '#8B6914',
  },
  switch: {
    transform: [{ scaleX: 0.85 }, { scaleY: 0.85 }],
  },
});
