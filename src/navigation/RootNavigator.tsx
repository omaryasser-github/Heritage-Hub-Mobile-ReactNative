import React from 'react';
import { createStaticNavigation, StaticParamList } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen } from '../features/splash/screens/SplashScreen';
import { View, Text, StyleSheet } from 'react-native';
import { LoginScreen } from '../features/auth/screens/LoginScreen';
import { SignUpScreen } from '../features/auth/screens/SignUpScreen';

import { PersonaQuizScreen } from '../features/personality-quiz/screens/PersonaQuizScreen';
import { BottomTabNavigator } from './BottomTabNavigator';

// Placeholder — to be replaced when the real Settings feature is implemented.
const SettingsScreen = () => (
  <View style={settingsStyles.container}>
    <Text style={settingsStyles.title}>Settings</Text>
    <Text style={settingsStyles.subtitle}>Coming soon…</Text>
  </View>
);

const settingsStyles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FDF6EC' },
  title: { fontSize: 22, fontWeight: '700', color: '#4A3728' },
  subtitle: { marginTop: 8, fontSize: 15, color: '#8B6914' },
});

const AuthStack = createNativeStackNavigator({
  screenOptions: { headerShown: false },
  screens: {
    Login: LoginScreen,
    SignUp: SignUpScreen,
    PersonaQuiz: PersonaQuizScreen,
  },
});



const RootStack = createNativeStackNavigator({
  initialRouteName: 'Splash',
  screenOptions: { headerShown: false },
  screens: {
    Splash: SplashScreen,
    AuthStack: AuthStack,
    MainTabNavigator: BottomTabNavigator,
    // Settings is placed in the RootStack (not inside the tab navigator)
    // so it can be navigated to from anywhere, including the HeaderMenu overlay.
    Settings: SettingsScreen,
  },
});

export type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export const RootNavigator = createStaticNavigation(RootStack);

