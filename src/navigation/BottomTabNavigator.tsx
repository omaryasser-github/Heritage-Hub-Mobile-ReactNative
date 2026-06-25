import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { HomeScreen } from '../features/explore/screens/HomeScreen';
import { ChatbotScreen } from '../features/chatbot/screens/ChatbotScreen';
import { GameHubScreen } from '../features/gamification/screens/GameHubScreen';
import { ProfileScreen } from '../features/profile/screens/ProfileScreen';
import { useResponsive } from '../shared/utils/responsive';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../shared/constants/colors';

const Tab = createBottomTabNavigator();

const PlaceholderScreen = ({ labelKey }: { labelKey: string }) => {
  const { t } = useTranslation();
  return (
    <View style={styles.placeholderContainer}>
      <Text style={styles.placeholderText}>
        {t(labelKey)} {t('common.screen')}
      </Text>
    </View>
  );
};

const MapScreen = () => <PlaceholderScreen labelKey="tabs.explore" />;

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
        component={MapScreen}
        options={{
          tabBarLabel: t('tabs.explore'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="compass" size={sWidth(size)} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="AI_Guide"
        component={ChatbotScreen}
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
        component={ProfileScreen}
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

const styles = StyleSheet.create({
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.backgroundPlaceholder,
  },
  placeholderText: {
    fontSize: 18,
    color: Colors.textSubtle,
  },
});
