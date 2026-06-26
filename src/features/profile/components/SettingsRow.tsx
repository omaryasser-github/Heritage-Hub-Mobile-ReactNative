import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../../shared/constants/colors';
import { useResponsive } from '../../../shared/utils/responsive';

interface SettingsRowProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  isDestructive?: boolean;
  value?: string;
}

export const SettingsRow = ({
  icon,
  label,
  onPress,
  isDestructive,
  value,
}: SettingsRowProps) => {
  const { sWidth, sHeight, sFont } = useResponsive();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { paddingVertical: sHeight(16), paddingHorizontal: sWidth(24) },
      ]}
      onPress={onPress}
    >
      <Ionicons
        name={icon}
        size={sWidth(24)}
        color={isDestructive ? Colors.errorDestructive : Colors.textPrimary}
      />
      <Text
        style={[
          styles.label,
          { fontSize: sFont(16), marginStart: sWidth(16) },
          isDestructive && styles.destructiveLabel,
        ]}
      >
        {label}
      </Text>
      {value ? (
        <View style={styles.valueContainer}>
          <Text style={[styles.value, { fontSize: sFont(14) }]}>{value}</Text>
          <Ionicons
            name="chevron-forward"
            size={sWidth(20)}
            color={Colors.textSubtle}
            style={styles.chevron}
          />
        </View>
      ) : (
        <Ionicons
          name="chevron-forward"
          size={sWidth(20)}
          color={Colors.textSubtle}
          style={styles.chevron}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.backgroundNeutral,
  },
  label: {
    flex: 1,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  destructiveLabel: {
    color: Colors.errorDestructive,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  value: {
    color: Colors.textSubtle,
  },
  chevron: {
    opacity: 0.5,
  },
});
