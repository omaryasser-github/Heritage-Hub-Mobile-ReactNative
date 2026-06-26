import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { useResponsive } from '../../../shared/utils/responsive';
import { Colors } from '../../../shared/constants/colors';


interface LikertCircleProps {
  value: number;
  isSelected: boolean;
  onSelect: (value: number) => void;
  sizeMultiplier?: number;
}

export const LikertCircle: React.FC<LikertCircleProps> = ({ value, isSelected, onSelect, sizeMultiplier = 1 }) => {
  const { sWidth } = useResponsive();

  // Base sizes: 1 and 5 are big (36), 2 and 4 are medium (28), 3 is small (20)
  let baseSize = 20;
  if (value === 1 || value === 5) baseSize = sWidth(44);
  else if (value === 2 || value === 4) baseSize = sWidth(32);
  else baseSize = sWidth(24);

  const size = baseSize * sizeMultiplier;


  return (
    <TouchableOpacity
      style={[
        styles.container,
        { width: sWidth(44), height: sWidth(44) } // Scalable touch target
      ]}

      onPress={() => onSelect(value)}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.circle,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: isSelected ? Colors.primary : 'transparent',
            borderColor: Colors.primary,
            borderWidth: isSelected ? 0 : 2,
          }
        ]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    // Basic circle styles, dynamics are in style array
  }
});
