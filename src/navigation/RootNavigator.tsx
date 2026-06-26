import React from 'react';
import { createStaticNavigation, StaticParamList } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen } from '../features/splash/screens/SplashScreen';
import { LoginScreen } from '../features/auth/screens/LoginScreen';
import { SignUpScreen } from '../features/auth/screens/SignUpScreen';
import { PersonaQuizScreen } from '../features/personality-quiz/screens/PersonaQuizScreen';
import { BottomTabNavigator } from './BottomTabNavigator';
import { SettingsScreen } from '../features/profile/screens/SettingsScreen';
import { EditProfileScreen } from '../features/profile/screens/EditProfileScreen';
import { MonumentDetailScreen } from '../features/explore/screens/MonumentDetailScreen';
import { PanoramaScreen } from '../features/explore/screens/PanoramaScreen';

const AuthStack = createNativeStackNavigator({
  initialRouteName: 'Login',
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
    EditProfile: EditProfileScreen,
    // Card details (Phase 4.1) — opened from Home monument cards; not the Explore tab.
    MonumentDetail: MonumentDetailScreen,
    Panorama: PanoramaScreen,
  },
});

export type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

export const RootNavigator = createStaticNavigation(RootStack);

