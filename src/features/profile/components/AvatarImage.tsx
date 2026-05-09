import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

interface AvatarImageProps {
  source?: any;
  size?: number;
}

export const AvatarImage = ({ source, size = 80 }: AvatarImageProps) => (
  <View style={[styles.container, { width: size, height: size, borderRadius: size / 2 }]}>
    <Image source={source} style={styles.image} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: '#E0C385',
    borderWidth: 2,
    borderColor: '#E0C385',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  }
});
