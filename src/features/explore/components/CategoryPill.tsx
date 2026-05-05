import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet, ImageSourcePropType, View } from 'react-native';

interface CategoryPillProps {
  title: string;
  image: ImageSourcePropType;
  isSelected?: boolean;
  onPress: () => void;
}

export const CategoryPill = ({ title, image, isSelected, onPress }: CategoryPillProps) => {
  return (
    <View style={styles.maincontainer}>
      <TouchableOpacity
        style={[styles.container, isSelected && styles.selectedContainer]}
        onPress={onPress}
      >
        <Image source={image} style={styles.image} resizeMode="contain" />
      </TouchableOpacity>
      <Text style={[styles.text, isSelected && styles.selectedText]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 4,
    marginRight: 7
  },
  container: {
    alignItems: 'center',
    borderRadius: 40,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'transparent',

  },
  selectedContainer: {
    backgroundColor: '#E6F2FF',
    borderColor: '#FFCE51',
    borderWidth: 3,
  },
  image: {
    width: 60,
    height: 60,
    // marginRight: 6,
  },
  text: {
    // paddingLeft: 20,
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  selectedText: {
    color: '#007AFF',
  }
});
