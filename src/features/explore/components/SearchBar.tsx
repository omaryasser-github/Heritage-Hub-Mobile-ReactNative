import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Colors } from '../../../shared/constants/colors';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

export const SearchBar = ({ value, onChangeText }: SearchBarProps) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={t('home.searchPlaceholder')}
        placeholderTextColor={Colors.textSubtle}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Ionicons name="search" size={18} color={Colors.textSubtle} style={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundSearch,
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 1,
    marginBottom: 17,
    alignSelf: 'center',
    width: '80%',
  },
  icon: {
    marginEnd: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    width: '70%',
    color: Colors.textTitle,
  },
});
