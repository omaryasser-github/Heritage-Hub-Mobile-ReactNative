import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../../shared/constants/colors';
import { Spacing } from '../../../shared/constants/spacing';

interface SettingsGroupProps {
  title: string;
  children: React.ReactNode;
}

export const SettingsGroup = ({ title, children }: SettingsGroupProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.card}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSubtle,
    textTransform: 'uppercase',
    marginBottom: 8,
    marginStart: 16,
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Spacing.borderRadius.lg,
    overflow: 'hidden',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginHorizontal: 16,
  }
});
