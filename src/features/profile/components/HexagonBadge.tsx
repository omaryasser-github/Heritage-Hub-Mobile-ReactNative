import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Polygon } from 'react-native-svg';

interface HexagonBadgeProps {
  title: string;
  size?: number;
  color?: string;
}

export const HexagonBadge = memo(({ title, size = 60, color = '#E0C385' }: HexagonBadgeProps) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg height="100%" width="100%" viewBox="0 0 100 100">
        <Polygon points="50 3, 100 28, 100 72, 50 97, 0 72, 0 28" fill={color} opacity={0.2} stroke={color} strokeWidth="2" />
      </Svg>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  textContainer: {
    position: 'absolute',
  },
  text: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#4A3728',
    textAlign: 'center',
  }
});
