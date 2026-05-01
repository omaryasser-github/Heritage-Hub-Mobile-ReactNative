import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Image } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AuthInput } from '../components/AuthInput';
import { PasswordInput } from '../components/PasswordInput';
import { PrimaryButton } from '../../../shared/components/PrimaryButton';
import { SocialLoginButton } from '../components/SocialLoginButton';
import { Typography } from '../../../shared/components/Typography';
import { register } from '../api/authService';
import { useAuthStore } from '../../../core/store/authStore';

const signUpSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z.string().min(6, {
    message: 'Confirm Password must be at least 6 characters'
  })
}).refine((data) => data.password === data.confirmPassword, { message: 'Passwords do not match', path: ['confirmPassword'] });

type SignUpFormValues = z.infer<typeof signUpSchema>;

export const SignUpScreen = ({ navigation }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const setToken = useAuthStore((state: any) => state.setToken);

  const { control, handleSubmit, formState: { errors } } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' }
  });

  const onSubmit = async (data: SignUpFormValues) => {
    setIsLoading(true);
    setApiError('');
    try {
      const response: any = await register(data);
      setToken(response.token);
      // Navigation is handled by RootNavigator reacting to token change
    } catch (err: any) {
      setApiError(err.message || 'Registration failed');
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
            <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
              <View style={styles.logoContainer}>
                <Image
                  source={require('../../../../assets/splash/splash logo.png')}
                  style={styles.logo}
                />
              </View>
              <View style={styles.header}>
                <Typography variant="h1" color="#FFFFFF" align="center" style={styles.title}>Create Account!</Typography>
                <Typography variant="body" color="#E0E0E0" align="center">Start your journey today</Typography>
              </View>

              <View style={styles.formContainer}>
                <Controller
                  control={control}
                  name="name"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <AuthInput
                      label="Full Name"
                      placeholder="Enter your full name"
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
                      placeholder="Create a secure password"
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
                      label="Confirm Password"
                      placeholder="Confirm your password"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      error={errors.confirmPassword?.message}
                    />
                  )}
                />

                {apiError ? <Typography color="#FF6B6B" style={styles.apiError}>{apiError}</Typography> : null}

                <PrimaryButton
                  title={isLoading ? 'Creating account...' : 'Sign Up'}
                  onPress={handleSubmit(onSubmit)}
                  disabled={isLoading}
                  style={styles.submitButton}
                />
                <View style={styles.footer}>
                  <Typography color="#FFFFFF">Already have an account? </Typography>
                  <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Typography color="#D9A941" style={{ fontWeight: 'bold' }}>Log In</Typography>
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
  background: { flex: 1, resizeMode: 'cover', },
  logoContainer: {
    position: 'absolute',
    top: 40,
    left: 15,
    alignItems: 'flex-start',
    // zIndex: 50,
  },
  logo: {
    width: 75,
    height: 75,
    // resizeMode: 'contain',
  },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', },
  container: { flex: 1 },
  scrollContent: { flexGrow: 1, justifyContent: 'center', padding: 24, paddingTop: 120, paddingBottom: 100, },
  header: { marginBottom: 20 },
  title: { marginBottom: 8 },
  formContainer: { width: '100%' },
  apiError: { marginBottom: 16, textAlign: 'center' },
  submitButton: { marginTop: 24, marginBottom: 24, width: '100%' },
  divider: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  line: { flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.2)' },
  orText: { marginHorizontal: 16 },
  footer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 15 }
});
