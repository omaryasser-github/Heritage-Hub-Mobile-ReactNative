import React from 'react';
import { TextInput, TextInputProps, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useResponsive } from '../../../shared/utils/responsive';
import { Colors } from '../../../shared/constants/colors';

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
          placeholderTextColor={Colors.textOnDarkMuted}
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
    color: Colors.textOnDark,
    fontWeight: '500',
  },
  inputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: Colors.overlayGlass,
    borderWidth: 1,
    borderColor: Colors.borderGlass,
    color: Colors.textOnDark,
  },
  inputError: {
    borderColor: Colors.error,
  },
  iconContainer: {
    position: 'absolute',
  },
  errorText: {
    color: Colors.error,
  },
});

