import React from 'react';
import { TouchableOpacity, StyleSheet, TouchableOpacityProps } from 'react-native';
import { Typography } from './Typography';

interface PrimaryButtonProps extends TouchableOpacityProps {
  title: string;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({ title, style, ...props }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} {...props}>
      <Typography variant="body" color="#FFFFFF" style={styles.text}>
        {title}
      </Typography>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'rgba(217, 169, 65, 0.7)', // Gold-ish color matching typical heritage app branding
    paddingVertical: 14,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '100%',
  },
  text: {
    fontWeight: '800',
  },
});
