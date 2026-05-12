import React from 'react';
import { TouchableOpacity, StyleSheet, TouchableOpacityProps } from 'react-native';
import { Typography } from './Typography';
import { useResponsive } from '../utils/responsive';

interface PrimaryButtonProps extends TouchableOpacityProps {
  title: string;
  textColor?: string;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({ title, style, textColor, ...props }) => {
  const { sWidth, sHeight } = useResponsive();
  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        { 
          paddingVertical: sHeight(14), 
          borderRadius: sWidth(45) 
        }, 
        style
      ]} 
      {...props}
    >
      <Typography variant="body" color={textColor || "#FFFFFF"} style={styles.text}>
        {title}
      </Typography>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'rgba(217, 169, 65, 0.7)', // Gold-ish color matching typical heritage app branding
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '100%',
  },
  text: {
    fontWeight: '800',
  },
});

