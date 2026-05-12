import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { useResponsive } from '../utils/responsive';


interface TypographyProps extends TextProps {
  variant?: 'h1' | 'h2' | 'body' | 'caption';
  color?: string;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  color = '#333333',
  align = 'left',
  style,
  children,
  ...props
}) => {
  const { sFont } = useResponsive();

  const getVariantStyle = () => {
    // object lookup method is better than switch statement for large number of cases (Performance improvement)
    const variantMap = {
      'h1': { fontSize: sFont(32) },
      'h2': { fontSize: sFont(24) },
      'body': { fontSize: sFont(16) },
      'caption': { fontSize: sFont(12) },
    };
    return variantMap[variant] || variantMap.body;

    // switch(variant) {
    //   case 'h1': return { fontSize: sFont(32) };
    //   case 'h2': return { fontSize: sFont(24) };
    //   case 'caption': return { fontSize: sFont(12) };
    //   default: return { fontSize: sFont(16) };
    // }
  };

  return (
    <Text
      style={[
        styles[variant],
        getVariantStyle(),
        { color, textAlign: align },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};


const styles = StyleSheet.create({
  h1: {
    fontWeight: 'bold',
  },
  h2: {
    fontWeight: '600',
  },
  body: {
    fontWeight: 'normal',
  },
  caption: {
    fontWeight: 'normal',
  },
});
