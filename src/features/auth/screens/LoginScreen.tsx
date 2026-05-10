import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Image } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AuthInput } from '../components/AuthInput';
import { PasswordInput } from '../components/PasswordInput';
import { SocialLoginButton } from '../components/SocialLoginButton';
import { PrimaryButton } from '../../../shared/components/PrimaryButton';
import { Typography } from '../../../shared/components/Typography';
import { login } from '../api/authService';
import { useAuthStore } from '../../../core/store/authStore';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const setToken = useAuthStore((state: any) => state.setToken);

  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' }
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setApiError('');
    try {
      const response: any = await login(data);
      setToken(response.token);
      // Navigation is handled by RootNavigator reacting to token change
    } catch (err: any) {
      setApiError(err.message || 'Login failed');
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

            <ScrollView contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 60, paddingBottom: Math.max(insets.bottom + 20, 40) }]} keyboardShouldPersistTaps="handled">
              <View style={[styles.logoContainer, { top: insets.top + 10 }]}>
                <Image
                  source={require('../../../../assets/splash/splash logo.png')}
                  style={styles.logo}
                />
              </View>
              <View style={styles.header}>
                <Typography variant="h1" color="#FFFFFF" align="center" style={styles.title}>Welcome Back!</Typography>
                <Typography variant="body" color="#E0E0E0" align="center">Log in to continue your journey</Typography>
              </View>

              <View style={styles.formContainer}>
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <AuthInput
                      label="Email"
                      placeholder="Enter your email"
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
                      label="Password"
                      placeholder="Enter your password"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      error={errors.password?.message}
                    />
                  )}
                />

                {apiError ? <Typography color="#FF6B6B" style={styles.apiError}>{apiError}</Typography> : null}

                <TouchableOpacity style={styles.forgotPassword}>
                  <Typography color="#D9A941" variant="caption">Forgot Password?</Typography>
                </TouchableOpacity>

                <PrimaryButton
                  title={isLoading ? 'Logging in...' : 'Login'}
                  onPress={handleSubmit(onSubmit)}
                  disabled={isLoading}
                  style={styles.submitButton}
                />

                <View style={styles.footer}>
                  <Typography color="#FFFFFF">Don't have an account? </Typography>
                  <TouchableOpacity onPress={() => navigation.navigate('AuthStack', { screen: 'SignUp' })}>
                    <Typography color="#D9A941" style={{ fontWeight: 'bold' }}>Sign Up</Typography>
                  </TouchableOpacity>
                </View>
                <View style={styles.divider}>
                  <View style={styles.line} />
                  <Typography color="#E0E0E0" style={styles.orText}>OR</Typography>
                  <View style={styles.line} />
                </View>

                <SocialLoginButton provider="google" onPress={() => { }} />
                <SocialLoginButton provider="facebook" onPress={() => { }} />
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: { flex: 1, },
  background: { flex: 1, resizeMode: 'cover' },
  logoContainer: {
    position: 'absolute',
    left: 15,
    bottom: 0,
    alignItems: 'flex-start',
    // zIndex: 50
  },
  logo: {
    width: 75,
    height: 75,
    // resizeMode: 'contain',
  },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' },
  container: { flex: 1 },
  scrollContent: { flexGrow: 1, justifyContent: 'center', padding: 24, },
  header: { marginBottom: 20 },
  title: { marginBottom: 8 },
  formContainer: { width: '100%', display: 'flex', },
  apiError: { marginBottom: 16, textAlign: 'center' },
  forgotPassword: { alignSelf: 'flex-end', marginBottom: 24 },
  submitButton: { marginBottom: 24, width: '100%' },
  divider: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  line: { flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.2)' },
  orText: { marginHorizontal: 16 },
  footer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 15 }
});
