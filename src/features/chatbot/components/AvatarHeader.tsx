import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { ChatSidebarMenu } from './ChatSidebarMenu';
import { Colors } from '../../../shared/constants/colors';

interface AvatarHeaderProps {
  onReset: () => void;
}

export const AvatarHeader = ({ onReset }: AvatarHeaderProps) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.avatarContainer}>
          <Image style={styles.avatar} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.greeting}>{t('chatbot.userName')}</Text>
        </View>
      </View>
      <View style={styles.right}>
        <TouchableOpacity style={styles.resetBtn} onPress={onReset}>
          <Ionicons name="refresh-outline" size={20} color={Colors.textOnDark} />
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
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.chatAvatarHeader,
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
    marginStart: 12,
  },
  greeting: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textOnDark,
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
