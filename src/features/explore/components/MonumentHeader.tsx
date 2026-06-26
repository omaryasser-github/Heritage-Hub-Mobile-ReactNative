import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Typography } from '../../../shared/components/Typography';
import { Colors } from '../../../shared/constants/colors';
import { useResponsive } from '../../../shared/utils/responsive';
import { MonumentDetail } from '../../../core/data/types';

interface MonumentHeaderProps {
  monument: MonumentDetail;
}

export const MonumentHeader = ({ monument }: MonumentHeaderProps) => {
  const { sWidth, sHeight, sFont } = useResponsive();
  const locationLine = monument.governorate
    ? `${monument.city}, ${monument.governorate}`
    : monument.city;

  return (
    <View style={[styles.container, { paddingTop: sHeight(8), gap: sHeight(6) }]}>
      <Image
        source={require('../../../../assets/splash/splash logo.png')}
        style={{ width: sWidth(80), height: sWidth(80) , opacity: 0.75 , shadowColor: Colors.shadow, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 12}}
        resizeMode="contain" 
      />
      <Typography
        variant="headlineMd"
        color={Colors.textPrimary}
        align="center"
        style={{ fontSize: sFont(25), paddingHorizontal: sWidth(16) }}
      >
        {monument.name}
      </Typography>
      <View style={[styles.locationRow, { gap: sWidth(6) }]}>
        <Ionicons name="location-outline" size={sWidth(14)} color={Colors.primaryMuted} />
        <Typography variant="caption" color={Colors.primaryMuted} style={{ fontSize: sFont(13) }}>
          {locationLine}
        </Typography>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
