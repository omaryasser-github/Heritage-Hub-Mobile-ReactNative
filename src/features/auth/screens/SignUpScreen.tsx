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
import { PrimaryButton } from '../../../shared/components/PrimaryButton';
import { SocialLoginButton } from '../components/SocialLoginButton';
import { Typography } from '../../../shared/components/Typography';
import { register } from '../api/authService';
import { useAuthStore } from '../../../core/store/authStore';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useResponsive } from '../../../shared/utils/responsive';
import { Colors } from '../../../shared/constants/colors';

type SignUpFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const SignUpScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { sWidth, sHeight, sFont } = useResponsive();
  const { t } = useTranslation();

  const signUpSchema = useMemo(
    () =>
      z
        .object({
          name: z.string().min(2, { message: t('validation.nameMin') }),
          email: z.string().email({ message: t('validation.invalidEmail') }),
          password: z.string().min(6, { message: t('validation.passwordMin') }),
          confirmPassword: z.string().min(6, {
            message: t('validation.confirmPasswordMin'),
          }),
        })
        .refine((data) => data.password === data.confirmPassword, {
          message: t('validation.passwordsMismatch'),
          path: ['confirmPassword'],
        }),
    [t]
  );

  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const setToken = useAuthStore((state) => state.setToken);

  const { control, handleSubmit, formState: { errors } } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  });

  const onSubmit = async (data: SignUpFormValues) => {
    setIsLoading(true);
    setApiError('');
    try {
      const response: any = await register(data);
      setToken(response.token);
      (navigation.navigate as any)('PersonaQuiz');
    } catch (err: any) {
      setApiError(err.message || t('auth.signupFailed'));
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
                  {t('auth.createAccount')}
                </Typography>
                <Typography
                  variant="body"
                  color={Colors.textOnDarkMuted}
                  align="center"
                  style={{ fontSize: sFont(16) }}
                >
                  {t('auth.signupSubtitle')}
                </Typography>
              </View>

              <View style={styles.formContainer}>
                <Controller
                  control={control}
                  name="name"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <AuthInput
                      label={t('auth.fullName')}
                      placeholder={t('auth.fullNamePlaceholder')}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      error={errors.name?.message}
                    />
                  )}
                />

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
                      placeholder={t('auth.passwordCreatePlaceholder')}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      error={errors.password?.message}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="confirmPassword"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <PasswordInput
                      label={t('auth.confirmPassword')}
                      placeholder={t('auth.confirmPasswordPlaceholder')}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      error={errors.confirmPassword?.message}
                    />
                  )}
                />

                {apiError ? (
                  <Typography color={Colors.error} style={styles.apiError}>
                    {apiError}
                  </Typography>
                ) : null}

                <PrimaryButton
                  title={isLoading ? t('auth.creatingAccount') : t('auth.signUp')}
                  onPress={handleSubmit(onSubmit)}
                  disabled={isLoading}
                  style={styles.submitButton}
                />
                <View style={styles.footer}>
                  <Typography color={Colors.textOnDark}>{t('auth.hasAccount')} </Typography>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Login' as never)}
                  >
                    <Typography color={Colors.textLink} style={{ fontWeight: 'bold' }}>
                      {t('auth.logIn')}
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
    alignItems: 'flex-start',
  },
  overlay: { flex: 1, backgroundColor: Colors.overlayAuth },
  container: { flex: 1 },
  scrollContent: { flexGrow: 1, justifyContent: 'center' },
  header: { marginBottom: 20 },
  title: { marginBottom: 8 },
  formContainer: { width: '100%' },
  apiError: { marginBottom: 16, textAlign: 'center' },
  submitButton: { marginTop: 24, marginBottom: 24, width: '100%' },
  divider: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  line: { flex: 1, height: 1, backgroundColor: Colors.borderGlassSubtle },
  orText: { marginHorizontal: 16 },
  footer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 15 },
});
