import React from 'react';
import { Switch, Platform } from 'react-native';
import { Colors } from '../constants/colors';

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
      trackColor={{ false: Colors.switchTrackOff, true: Colors.primarySolid }}
      thumbColor={
        Platform.OS === 'android'
          ? value
            ? Colors.textOnDark
            : Colors.switchThumbAndroid
          : undefined
      }
      ios_backgroundColor={Colors.switchTrackOff}
    />
  );
};
