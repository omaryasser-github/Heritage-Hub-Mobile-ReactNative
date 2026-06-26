import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Colors } from '../../../shared/constants/colors';

interface SocialLoginButtonProps {
  provider: 'google' | 'facebook';
  onPress: () => void;
}

export const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({ provider, onPress }) => {
  const { t } = useTranslation();
  const isGoogle = provider === 'google';

  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
      <Ionicons
        name={isGoogle ? 'logo-google' : 'logo-facebook'}
        size={24}
        color={isGoogle ? Colors.socialGoogle : Colors.socialFacebook}
      />
      <Text style={styles.text}>
        {isGoogle ? t('auth.continueWithGoogle') : t('auth.continueWithFacebook')}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.overlayGlassButton,
    borderWidth: 1,
    borderColor: Colors.borderGlassSubtle,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 12,
    width: '100%',
  },
  text: {
    color: Colors.textOnDark,
    fontSize: 16,
    fontWeight: '500',
    marginStart: 16,
  },
});
