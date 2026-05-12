import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../features/explore/screens/HomeScreen';
import { ChatbotScreen } from '../features/chatbot/screens/ChatbotScreen';
import { GameHubScreen } from '../features/gamification/screens/GameHubScreen';
import { ProfileScreen } from '../features/profile/screens/ProfileScreen';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useResponsive } from '../shared/utils/responsive';

const Tab = createBottomTabNavigator();

const PlaceholderScreen = ({ name }: { name: string }) => (
  <View style={styles.placeholderContainer}>
    <Text style={styles.placeholderText}>{name} Screen</Text>
  </View>
);

const MapScreen = () => <PlaceholderScreen name="Explore" />;

export const BottomTabNavigator = () => {
  const { sWidth, sHeight } = useResponsive();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#E0C385',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: '#F4E8DA',
          height: sHeight(60),
          borderTopLeftRadius: sWidth(5),
          borderTopRightRadius: sWidth(5),
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={sWidth(size)} color={color} />
        }}
      />
      <Tab.Screen
        name="Explore"
        component={MapScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="compass" size={sWidth(size)} color={color} />
        }}
      />
      <Tab.Screen
        name="AI_Guide"
        component={ChatbotScreen}
        options={{
          tabBarIcon: ({ size }) => (
            <Image
              source={require('../../assets/Home/icons/AI-icon.png')}
              style={{ width: sWidth(size + 25), height: sWidth(size + 25) }}
            />
          )
        }}
      />
      <Tab.Screen
        name="Game"
        component={GameHubScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="game-controller" size={sWidth(size)} color={color} />
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="person" size={sWidth(size)} color={color} />
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
    backgroundColor: '#FAFAFA'
  },
  placeholderText: {
    fontSize: 18,
    color: '#8E8E93'
  }
});

