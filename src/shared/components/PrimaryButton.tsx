import React from 'react';
import { TouchableOpacity, StyleSheet, TouchableOpacityProps } from 'react-native';
import { Typography } from './Typography';

interface PrimaryButtonProps extends TouchableOpacityProps {
  title: string;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({ title, style, ...props }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} activeOpacity={0.8} {...props}>
      <Typography variant="body" color="#FFFFFF" style={styles.text}>
        {title}
      </Typography>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#D4AF37', // Gold-ish color matching typical heritage app branding
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 200,
  },
  text: {
    fontWeight: '600',
  },
});
