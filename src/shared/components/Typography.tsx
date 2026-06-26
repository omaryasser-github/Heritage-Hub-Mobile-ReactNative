import React from 'react';
import { Text, TextProps } from 'react-native';
import { Colors } from '../constants/colors';
import {
  TypographyConstants,
  TypographyLegacyVariant,
  TypographyVariant,
  resolveTypographyVariant,
} from '../constants/typography';
import { useResponsive } from '../utils/responsive';

interface TypographyProps extends TextProps {
  variant?: TypographyVariant | TypographyLegacyVariant;
  color?: string;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'bodyMd',
  color = Colors.textSecondary,
  align = 'auto',
  style,
  children,
  ...props
}) => {
  const { sFont } = useResponsive();
  const resolvedVariant = resolveTypographyVariant(variant);
  const baseStyle = TypographyConstants.styles[resolvedVariant];

  return (
    <Text
      style={[
        {
          fontFamily: baseStyle.fontFamily,
          fontSize: sFont(baseStyle.fontSize),
          lineHeight: sFont(baseStyle.lineHeight),
          letterSpacing: 'letterSpacing' in baseStyle ? baseStyle.letterSpacing : undefined,
          color,
          textAlign: align,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};
