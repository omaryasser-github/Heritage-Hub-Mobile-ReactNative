import React from 'react';
import { TextInput, TextInputProps, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useResponsive } from '../../../shared/utils/responsive';

interface AuthInputProps extends TextInputProps {
  label?: string;
  error?: string;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
}

export const AuthInput: React.FC<AuthInputProps> = ({ 
  label, error, rightIcon, onRightIconPress, style, ...props 
}) => {
  const { sWidth, sHeight, sFont } = useResponsive();
  
  return (
    <View style={[styles.container, { marginBottom: sHeight(16) }]}>
      {label ? <Text style={[styles.label, { marginBottom: sHeight(8), fontSize: sFont(14) }]}>{label}</Text> : null}
      <View style={styles.inputWrapper}>
        <TextInput
          style={[
            styles.input, 
            { 
              borderRadius: sWidth(12), 
              paddingHorizontal: sWidth(16), 
              paddingVertical: sHeight(14), 
              fontSize: sFont(16) 
            },
            error ? styles.inputError : null, 
            rightIcon ? { paddingEnd: sWidth(45) } : null,
            style
          ]}
          placeholderTextColor="rgba(255, 255, 255, 0.6)"
          {...props}
        />
        {rightIcon && (
          <TouchableOpacity 
            style={[styles.iconContainer, { end: sWidth(16) }]} 
            onPress={onRightIconPress}
            disabled={!onRightIconPress}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
      {error ? <Text style={[styles.errorText, { fontSize: sFont(12), marginTop: sHeight(4), marginStart: sWidth(4) }]}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  inputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)', // Glassmorphism base
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    color: '#FFFFFF',
  },
  inputError: {
    borderColor: '#FF6B6B',
  },
  iconContainer: {
    position: 'absolute',
  },
  errorText: {
    color: '#FF6B6B',
  },
});

