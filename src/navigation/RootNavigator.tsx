import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen } from '../features/splash/screens/SplashScreen';
import { useAuthStore } from '../core/store/authStore';
import { View, Text } from 'react-native';

const Stack = createNativeStackNavigator();

// Placeholder screens for routing from Splash
const PlaceholderAuthStack = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Auth Stack (Login/Register)</Text>
  </View>
);

const PlaceholderMainTab = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Main Tab Navigator (Home)</Text>
  </View>
);

export const RootNavigator = () => {
  const token = useAuthStore((state) => state.token);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Always start with splash, the splash logic handles routing next */}
        <Stack.Screen name="Splash" component={SplashScreen} />
        
        {/* After Splash, we go to either Auth or Main */}
        <Stack.Screen name="AuthStack" component={PlaceholderAuthStack} />
        <Stack.Screen name="MainTabNavigator" component={PlaceholderMainTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
