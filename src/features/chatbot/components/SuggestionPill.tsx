import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface SuggestionPillProps {
  title: string;
  onPress: (title: string) => void;
}

export const SuggestionPill = ({ title, onPress }: SuggestionPillProps) => {
  return (
    <TouchableOpacity style={styles.pill} onPress={() => onPress(title)} activeOpacity={0.7}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pill: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
});
