import React, { useMemo, useState } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTranslation } from 'react-i18next';
import { AuthInput } from '../components/AuthInput';
import { PasswordInput } from '../components/PasswordInput';
import { SocialLoginButton } from '../components/SocialLoginButton';
import { PrimaryButton } from '../../../shared/components/PrimaryButton';
import { Typography } from '../../../shared/components/Typography';
import { login } from '../api/authService';
import { useAuthStore } from '../../../core/store/authStore';
import { useNavigation } from '@react-navigation/native';
import { switchAuthScreen } from '../../../navigation/authNavigation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useResponsive } from '../../../shared/utils/responsive';
import { Colors } from '../../../shared/constants/colors';

type LoginFormValues = {
  email: string;
  password: string;
};

export const LoginScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { sWidth, sHeight, sFont } = useResponsive();
  const { t } = useTranslation();

  const loginSchema = useMemo(
    () =>
      z.object({
        email: z.string().email({ message: t('validation.invalidEmail') }),
        password: z.string().min(6, { message: t('validation.passwordMin') }),
      }),
    [t]
  );

  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const setToken = useAuthStore((state) => state.setToken);

  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setApiError('');
    try {
      const response: any = await login(data);
      setToken(response.token);
    } catch (err: any) {
      setApiError(err.message || t('auth.loginFailed'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.pageContainer}>
      <ImageBackground
        source={require('../../../../assets/Auth/authBackground.png')}
        style={styles.background}
      >
        <View style={styles.overlay}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
          >
            <ScrollView
              contentContainerStyle={[
                styles.scrollContent,
                {
                  paddingTop: insets.top + sHeight(60),
                  paddingBottom: Math.max(insets.bottom + sHeight(20), sHeight(40)),
                  paddingHorizontal: sWidth(24),
                },
              ]}
              keyboardShouldPersistTaps="handled"
            >
              <View
                style={[
                  styles.logoContainer,
                  { top: insets.top + sHeight(10), marginStart: sWidth(15) },
                ]}
              >
                <Image
                  source={require('../../../../assets/splash/splash logo.png')}
                  style={{ width: sWidth(75), height: sWidth(75) }}
                />
              </View>
              <View style={styles.header}>
                <Typography
                  variant="h1"
                  color={Colors.textOnDark}
                  align="center"
                  style={[styles.title, { fontSize: sFont(32) }]}
                >
                  {t('auth.welcomeBack')}
                </Typography>
                <Typography
                  variant="body"
                  color={Colors.textOnDarkMuted}
                  align="center"
                  style={{ fontSize: sFont(16) }}
                >
                  {t('auth.loginSubtitle')}
                </Typography>
              </View>

              <View style={styles.formContainer}>
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <AuthInput
                      label={t('auth.email')}
                      placeholder={t('auth.emailPlaceholder')}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      error={errors.email?.message}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <PasswordInput
                      label={t('auth.password')}
                      placeholder={t('auth.passwordPlaceholder')}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      error={errors.password?.message}
                    />
                  )}
                />

                {apiError ? (
                  <Typography color={Colors.error} style={styles.apiError}>
                    {apiError}
                  </Typography>
                ) : null}

                <TouchableOpacity style={styles.forgotPassword}>
                  <Typography color={Colors.textLink} variant="caption">
                    {t('auth.forgotPassword')}
                  </Typography>
                </TouchableOpacity>

                <PrimaryButton
                  title={isLoading ? t('auth.loggingIn') : t('auth.login')}
                  onPress={handleSubmit(onSubmit)}
                  disabled={isLoading}
                  style={styles.submitButton}
                />

                <View style={styles.footer}>
                  <Typography color={Colors.textOnDark}>{t('auth.noAccount')} </Typography>
                  <TouchableOpacity
                    onPress={() => switchAuthScreen(navigation, 'SignUp')}
                  >
                    <Typography color={Colors.textLink} style={{ fontWeight: 'bold' }}>
                      {t('auth.signUp')}
                    </Typography>
                  </TouchableOpacity>
                </View>
                <View style={styles.divider}>
                  <View style={styles.line} />
                  <Typography color={Colors.textOnDarkMuted} style={styles.orText}>
                    {t('common.or')}
                  </Typography>
                  <View style={styles.line} />
                </View>

                <SocialLoginButton provider="google" onPress={() => {}} />
                <SocialLoginButton provider="facebook" onPress={() => {}} />
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: { flex: 1 },
  background: { flex: 1, resizeMode: 'cover' },
  logoContainer: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'flex-start',
  },
  overlay: { flex: 1, backgroundColor: Colors.overlayAuth },
  container: { flex: 1 },
  scrollContent: { flexGrow: 1, justifyContent: 'center' },
  header: { marginBottom: 20 },
  title: { marginBottom: 8 },
  formContainer: { width: '100%', display: 'flex' },
  apiError: { marginBottom: 16, textAlign: 'center' },
  forgotPassword: { alignSelf: 'flex-end', marginBottom: 24 },
  submitButton: { marginBottom: 24, width: '100%' },
  divider: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  line: { flex: 1, height: 1, backgroundColor: Colors.borderGlassSubtle },
  orText: { marginHorizontal: 16 },
  footer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 15 },
});
