import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../../shared/constants/colors';

interface SuggestionPillProps {
  title: string;
  onPress: (title: string) => void;
}

export const SuggestionPill = ({ title, onPress }: SuggestionPillProps) => {
  return (
    <TouchableOpacity style={styles.pill} onPress={() => onPress(title)} activeOpacity={0.7}>
      <Text style={styles.text}>{title}</Text>
      <Ionicons name="chevron-forward" style={styles.arrow} size={20} color={Colors.textTitle} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundSuggestion,
    // borderWidth: 1,
    // borderColor: 'rgba(255, 255, 255, 0.5)',
    // paddingHorizontal: 16,
    // paddingVertical: 20,
    width: '100%',
    height: '50%',
    borderRadius: 20,
    // marginRight: 8,
    marginBottom: 8,
  },
  text: {
    color: Colors.textTitle,
    opacity: 0.55,
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    // textAlignVertical: 'center',
    textAlign: "center",
  },
  arrow: {
    paddingRight: 15,
  },
});
