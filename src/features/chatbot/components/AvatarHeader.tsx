import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ChatSidebarMenu } from './ChatSidebarMenu';

interface AvatarHeaderProps {
  onReset: () => void;
}

export const AvatarHeader = ({ onReset }: AvatarHeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.avatarContainer}>
          {/* Fallback to local asset since AI-icon.png exists in BottomTabNavigator code */}
          <Image
            // source={require('../../../../../assets/Home/icons/AI-icon.png')}
            style={styles.avatar}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.greeting}>AI Explorer</Text>
          <Text style={styles.subtitle}>Online</Text>
        </View>
      </View>
      <View style={styles.right}>
        <TouchableOpacity style={styles.resetBtn} onPress={onReset}>
          <Ionicons name="refresh-outline" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <ChatSidebarMenu />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
    // backgroundColor: 'rgba(0,0,0,0.3)',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E0C385',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatar: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  textContainer: {
    marginLeft: 12,
  },
  greeting: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 13,
    color: '#D4C09A',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  resetBtn: {
    padding: 4,
  },
});
