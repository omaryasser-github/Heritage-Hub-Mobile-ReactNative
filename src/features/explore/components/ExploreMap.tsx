import React from 'react';
import { View, StyleSheet, Image, Pressable, LayoutChangeEvent } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { EXPLORE_MAP_PINS, getExploreMapPinLabel } from '../data/exploreMapPins';
import { useResponsive } from '../../../shared/utils/responsive';
import { Colors } from '../../../shared/constants/colors';

const MAP_IMAGE = require('../../../../assets/Home/explore/egypt-map.jpg');

interface ExploreMapProps {
  highlightedGovernorateKey: string | null;
  onLayoutSize?: (width: number, height: number) => void;
}

export const ExploreMap = ({ highlightedGovernorateKey, onLayoutSize }: ExploreMapProps) => {
  const { i18n } = useTranslation();
  const { sWidth } = useResponsive();

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    onLayoutSize?.(width, height);
  };

  const hasHighlight = highlightedGovernorateKey != null;

  return (
    <View style={styles.container} onLayout={handleLayout}>
      <Image source={MAP_IMAGE} style={styles.mapImage} resizeMode="contain" />

      {EXPLORE_MAP_PINS.map((pin) => {
        const isHighlighted = pin.key === highlightedGovernorateKey;
        const isDimmed = hasHighlight && !isHighlighted;
        const pinSize = sWidth(isHighlighted ? 36 : 30);

        return (
          <Pressable
            key={pin.key}
            style={[
              styles.pin,
              {
                left: `${pin.xPercent * 100}%`,
                top: `${pin.yPercent * 100}%`,
                marginLeft: -pinSize / 2,
                marginTop: -pinSize / 2,
                opacity: isDimmed ? 0.45 : 1,
                transform: [{ scale: isHighlighted ? 1.15 : 1 }],
              },
            ]}
            accessibilityRole="image"
            accessibilityLabel={getExploreMapPinLabel(pin, i18n.language)}
          >
            {isHighlighted ? <View style={[styles.pinRing, { width: pinSize + 10, height: pinSize + 10 }]} /> : null}
            <View
              style={[
                styles.pinBody,
                {
                  width: pinSize,
                  height: pinSize,
                  borderRadius: pinSize / 2,
                  backgroundColor: isHighlighted ? Colors.errorStrong : Colors.primary,
                },
              ]}
            >
              <Ionicons name="location" size={sWidth(isHighlighted ? 18 : 16)} color={Colors.textOnDark} />
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  pin: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinRing: {
    position: 'absolute',
    borderRadius: 999,
    borderWidth: 2,
    borderColor: Colors.primarySoft,
    backgroundColor: 'rgba(217, 169, 65, 0.2)',
  },
  pinBody: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.shadow,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
});
