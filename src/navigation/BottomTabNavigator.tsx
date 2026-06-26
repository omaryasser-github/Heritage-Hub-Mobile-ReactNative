import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { HomeScreen } from '../features/explore/screens/HomeScreen';
import { ExploreTabScreen } from '../features/explore/screens/ExploreTabScreen';
import { ChatbotScreen } from '../features/chatbot/screens/ChatbotScreen';
import { GameHubScreen } from '../features/gamification/screens/GameHubScreen';
import { ProfileScreen } from '../features/profile/screens/ProfileScreen';
import { useResponsive } from '../shared/utils/responsive';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../shared/constants/colors';
import { createGuestGatedScreen } from './guestGatedScreen';

const Tab = createBottomTabNavigator();

const GatedChatbotScreen = createGuestGatedScreen(ChatbotScreen, 'ai');
const GatedProfileScreen = createGuestGatedScreen(ProfileScreen, 'profile');

export const BottomTabNavigator = () => {
  const { sWidth, sHeight } = useResponsive();
  const insets = useSafeAreaInsets();
  const { t, i18n } = useTranslation();

  return (
    <Tab.Navigator
      key={i18n.language}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.tabActive,
        tabBarInactiveTintColor: Colors.tabInactive,
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: Colors.tabBarBackground,
          height: sHeight(60) + insets.bottom,
          paddingBottom: insets.bottom > 0 ? insets.bottom / 2 : 0,
          borderTopLeftRadius: sWidth(15),
          borderTopRightRadius: sWidth(15),
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: t('tabs.home'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={sWidth(size)} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreTabScreen}
        options={{
          tabBarLabel: t('tabs.explore'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="compass" size={sWidth(size)} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="AI_Guide"
        component={GatedChatbotScreen}
        options={{
          tabBarLabel: t('tabs.aiGuide'),
          tabBarIcon: ({ size }) => (
            <Image
              source={require('../../assets/Home/icons/AI-icon.png')}
              style={{ width: sWidth(size + 25), height: sWidth(size + 25) }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Game"
        component={GameHubScreen}
        options={{
          tabBarLabel: t('tabs.game'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="game-controller" size={sWidth(size)} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={GatedProfileScreen}
        options={{
          tabBarLabel: t('tabs.profile'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={sWidth(size)} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
