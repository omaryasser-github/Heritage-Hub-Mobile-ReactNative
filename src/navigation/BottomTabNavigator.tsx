import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../features/explore/screens/HomeScreen';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';

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
    tabBarActiveTintColor: '#E0C385',
    tabBarInactiveTintColor: '#8E8E93',

    tabBarStyle: {
      borderTopWidth: 0,
      // elevation: 10,
      // shadowColor: '#000',
      // shadowOpacity: 0.05,
      // shadowOffset: { width: 0, height: -3 },
      // shadowRadius: 10,
      backgroundColor: '#F4E8DA',
      height: 50,
      // paddingTop: 10,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
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
        tabBarIcon: ({ color, size }: any) => <Ionicons name="compass" size={size} color={color} />
      }
    },
    AI_Guide: {
      screen: YourGuideScreen,
      options: {
        tabBarIcon: ({ color, size }: any) => <Image source={require('../../assets/Home/icons/AI-icon.png')} style={{ width: size + 25, height: size + 25 }}
        />
      }
    },
    Game: {
      screen: GameScreen,
      options: {
        tabBarIcon: ({ color, size }: any) => <Ionicons name="game-controller" size={size} color={color} />
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
