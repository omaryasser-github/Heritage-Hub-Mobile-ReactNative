import React from 'react';
import { Switch, Platform } from 'react-native';

interface SwitchToggleProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
}

export const SwitchToggle = ({ value, onValueChange, disabled }: SwitchToggleProps) => {
  return (
    <Switch
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      trackColor={{ false: '#E0E0E0', true: '#D4AF37' }}
      thumbColor={Platform.OS === 'android' ? (value ? '#FFFFFF' : '#F4F3F4') : ''}
      ios_backgroundColor="#E0E0E0"
    />
  );
};
