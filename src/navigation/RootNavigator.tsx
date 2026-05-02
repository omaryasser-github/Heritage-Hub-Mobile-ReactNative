import React from 'react';
import { createStaticNavigation, StaticParamList } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen } from '../features/splash/screens/SplashScreen';
import { View, Text } from 'react-native';
import { LoginScreen } from '../features/auth/screens/LoginScreen';
import { SignUpScreen } from '../features/auth/screens/SignUpScreen';

const AuthStack = createNativeStackNavigator({
  screenOptions: { headerShown: false },
  screens: {
    Login: LoginScreen,
    SignUp: SignUpScreen,
  },
});

const PlaceholderMainTab = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Main Tab Navigator (Home)</Text>
  </View>
);

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Splash',
  screenOptions: { headerShown: false },
  screens: {
    Splash: SplashScreen,
    AuthStack: AuthStack,
    MainTabNavigator: PlaceholderMainTab,
  },
});

export type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export const RootNavigator = createStaticNavigation(RootStack);

