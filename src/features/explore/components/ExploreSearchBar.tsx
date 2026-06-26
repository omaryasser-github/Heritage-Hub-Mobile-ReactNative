import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Colors } from '../../../shared/constants/colors';
import { useResponsive } from '../../../shared/utils/responsive';

interface ExploreSearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
}

export const ExploreSearchBar = ({ value, onChangeText, onClear }: ExploreSearchBarProps) => {
  const { t } = useTranslation();
  const { sWidth, sHeight, sFont } = useResponsive();

  return (
    <View
      style={[
        styles.container,
        {
          borderRadius: sWidth(14),
          paddingHorizontal: sWidth(14),
          paddingVertical: sHeight(10),
          minHeight: sHeight(48),
        },
      ]}
    >
      <Ionicons name="search" size={sWidth(20)} color={Colors.textSubtle} />
      <TextInput
        style={[styles.input, { fontSize: sFont(15), marginHorizontal: sWidth(10) }]}
        placeholder={t('explore.searchPlaceholder')}
        placeholderTextColor={Colors.textSubtle}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
      />
      {value.length > 0 ? (
        <TouchableOpacity onPress={onClear} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Ionicons name="close-circle" size={sWidth(20)} color={Colors.textSubtle} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    shadowColor: Colors.shadow,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  input: {
    flex: 1,
    color: Colors.textTitle,
    paddingVertical: 0,
  },
});
