import React from 'react';
import { createStaticNavigation, StaticParamList } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen } from '../features/splash/screens/SplashScreen';
import { View, Text } from 'react-native';
import { LoginScreen } from '../features/auth/screens/LoginScreen';
import { SignUpScreen } from '../features/auth/screens/SignUpScreen';

import { PersonaQuizScreen } from '../features/personality-quiz/screens/PersonaQuizScreen';
import { BottomTabNavigator } from './BottomTabNavigator';

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
  },
});

export type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export const RootNavigator = createStaticNavigation(RootStack);

