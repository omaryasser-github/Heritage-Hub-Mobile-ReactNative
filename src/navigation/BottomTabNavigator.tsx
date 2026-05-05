import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../features/explore/screens/HomeScreen';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PlaceholderScreen = ({ name }: { name: string }) => (
  <View style={styles.placeholderContainer}>
    <Text style={styles.placeholderText}>{name} Screen</Text>
  </View>
);

const MapScreen = () => <PlaceholderScreen name="Explore" />;
const ProfileScreen = () => <PlaceholderScreen name="Profile" />;
const YourGuideScreen = () => <PlaceholderScreen name="Your Guide" />;
const GameScreen = () => <PlaceholderScreen name="Game" />;

export const BottomTabNavigator = createBottomTabNavigator({
  screenOptions: {
    headerShown: false,
    tabBarActiveTintColor: '#007AFF',
    tabBarInactiveTintColor: '#8E8E93',
    tabBarStyle: {
      borderTopWidth: 0,
      // elevation: 10,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowOffset: { width: 0, height: -3 },
      shadowRadius: 10,
      backgroundColor: '#F2E8DD',
      height: 60,
      // paddingTop: 10,
    },
  },
  screens: {
    Home: {
      screen: HomeScreen,
      options: {
        tabBarIcon: ({ color, size }: any) => <Ionicons name="home" size={size} color={color} />
      }
    },
    Explore: {
      screen: MapScreen,
      options: {
        tabBarIcon: ({ color, size }: any) => <Ionicons name="map" size={size} color={color} />
      }
    },
    AI_Guide: {
      screen: YourGuideScreen,
      options: {
        tabBarIcon: ({ color, size }: any) => <Ionicons name="heart" size={size} color={color} />
      }
    },
    Game: {
      screen: GameScreen,
      options: {
        tabBarIcon: ({ color, size }: any) => <Ionicons name="heart" size={size} color={color} />
      }
    },
    Profile: {
      screen: ProfileScreen,
      options: {
        tabBarIcon: ({ color, size }: any) => <Ionicons name="person" size={size} color={color} />
      }
    }
  }
});

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
