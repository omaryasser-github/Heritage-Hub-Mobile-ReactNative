import React from 'react';
import { TouchableOpacity, StyleSheet, TouchableOpacityProps } from 'react-native';
import { Colors } from '../constants/colors';
import { Spacing } from '../constants/spacing';
import { Typography } from './Typography';
import { useResponsive } from '../utils/responsive';

interface PrimaryButtonProps extends TouchableOpacityProps {
  title: string;
  textColor?: string;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  style,
  textColor,
  ...props
}) => {
  const { sWidth, sHeight } = useResponsive();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          paddingVertical: sHeight(14),
          borderRadius: sWidth(Spacing.borderRadius.full),
        },
        style,
      ]}
      {...props}
    >
      <Typography
        variant="bodyMd"
        color={textColor || Colors.textOnDark}
        style={styles.text}
      >
        {title}
      </Typography>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primaryButton,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '100%',
  },
  text: {
    fontWeight: '800',
  },
});
