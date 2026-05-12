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
import { useResponsive } from '../../../shared/utils/responsive';


export const HeaderMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isArabic, setIsArabic] = useState(false);
  const { width } = useSafeAreaFrame();
  const insets = useSafeAreaInsets();
  const { sWidth, sHeight, sFont } = useResponsive();
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
              paddingHorizontal: sWidth(20)
            }
          ]}
        >
          <View style={[styles.panelHeader, { marginBottom: sHeight(16) }]}>
            <Text style={[styles.panelTitle, { fontSize: sFont(20) }]}>Menu</Text>
            <TouchableOpacity onPress={closeMenu} style={[styles.closeBtn, { padding: sWidth(4) }]}>
              <Ionicons name="close" size={sWidth(22)} color="#4A3728" />
            </TouchableOpacity>
          </View>

          <View style={[styles.divider, { marginBottom: sHeight(12) }]} />

          <TouchableOpacity style={[styles.menuItem, { paddingVertical: sHeight(14) }]} activeOpacity={0.7}>
            <View style={[styles.menuItemLeft, { gap: sWidth(14) }]}>
              <View style={[styles.iconWrapper, { width: sWidth(36), height: sWidth(36), borderRadius: sWidth(10) }]}>
                <Ionicons name="notifications-outline" size={sWidth(20)} color="#8B6914" />
              </View>
              <Text style={[styles.menuItemText, { fontSize: sFont(15) }]}>Notifications</Text>
            </View>
            <Ionicons name="chevron-forward" size={sWidth(16)} color="#C5A55A" />
          </TouchableOpacity>

          <View style={[styles.itemDivider, { marginVertical: sHeight(4), marginStart: sWidth(52) }]} />

          <View style={[styles.menuItem, { paddingVertical: sHeight(14) }]}>
            <View style={[styles.menuItemLeft, { gap: sWidth(14) }]}>
              <View style={[styles.iconWrapper, { width: sWidth(36), height: sWidth(36), borderRadius: sWidth(10) }]}>
                <Ionicons name="language-outline" size={sWidth(20)} color="#8B6914" />
              </View>
              <Text style={[styles.menuItemText, { fontSize: sFont(15) }]}>Language</Text>
            </View>
            <View style={[styles.langToggleRow, { gap: sWidth(4) }]}>
              <Text style={[styles.langLabel, { fontSize: sFont(13) }, !isArabic && styles.langActive]}>EN</Text>
              <Switch
                value={isArabic}
                onValueChange={setIsArabic}
                thumbColor="#8B6914"
                trackColor={{ false: '#E0C385', true: '#E0C385' }}
                style={styles.switch}
              />
              <Text style={[styles.langLabel, { fontSize: sFont(13) }, isArabic && styles.langActive]}>AR</Text>
            </View>
          </View>

          <View style={[styles.itemDivider, { marginVertical: sHeight(4), marginStart: sWidth(52) }]} />

          <TouchableOpacity
            style={[styles.menuItem, { paddingVertical: sHeight(14) }]}
            activeOpacity={0.7}
            onPress={() => {
              closeMenu();
              setTimeout(() => navigation.navigate('Settings'), 260);
            }}
          >
            <View style={[styles.menuItemLeft, { gap: sWidth(14) }]}>
              <View style={[styles.iconWrapper, { width: sWidth(36), height: sWidth(36), borderRadius: sWidth(10) }]}>
                <Ionicons name="settings-outline" size={sWidth(20)} color="#8B6914" />
              </View>
              <Text style={[styles.menuItemText, { fontSize: sFont(15) }]}>Settings</Text>
            </View>
            <Ionicons name="chevron-forward" size={sWidth(16)} color="#C5A55A" />
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
    backgroundColor: '#FFFFFF',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(30, 18, 8, 0.45)',
  },
  panel: {
    position: 'absolute',
    end: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#FDF6EC',
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
  },
  panelTitle: {
    fontWeight: '700',
    color: '#4A3728',
    letterSpacing: 0.4,
  },
  closeBtn: {
  },
  divider: {
    height: 1,
    backgroundColor: '#E8D5B5',
  },
  itemDivider: {
    height: 1,
    backgroundColor: '#F0E2C8',
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
    backgroundColor: '#FFF0D6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItemText: {
    fontWeight: '600',
    color: '#4A3728',
  },
  langToggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  langLabel: {
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

