import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SocialLoginButtonProps {
  provider: 'google' | 'facebook';
  onPress: () => void;
}

export const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({ provider, onPress }) => {
  const isGoogle = provider === 'google';
  
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
      <Ionicons 
        name={isGoogle ? 'logo-google' : 'logo-facebook'} 
        size={24} 
        color={isGoogle ? '#DB4437' : '#4267B2'} 
      />
      <Text style={styles.text}>
        Continue with {isGoogle ? 'Google' : 'Facebook'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 12,
    width: '100%',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 16,
  },
});
