import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useResponsive } from '../../../shared/utils/responsive';
import { Colors } from '../../../shared/constants/colors';

interface GameLaunchCardProps {
  onPlayPress: () => void;
}

export const GameLaunchCard: React.FC<GameLaunchCardProps> = ({ onPlayPress }) => {
  const { sWidth, sHeight, sFont } = useResponsive();
  const { t } = useTranslation();

  return (
    <View
      style={[
        styles.cardContainer,
        { borderRadius: sWidth(24), marginHorizontal: sWidth(20), marginTop: sHeight(20) },
      ]}
    >
      <Image
        source={require('../../../../assets/Game/gameImage.png')}
        style={[styles.gameImage, { height: sHeight(220) }]}
        resizeMode="cover"
      />
      <View style={[styles.contentContainer, { padding: sWidth(24) }]}>
        <Text style={[styles.title, { fontSize: sFont(24), marginBottom: sHeight(8) }]}>
          {t('gaming.cardTitle')}
        </Text>
        <Text style={[styles.subtitle, { fontSize: sFont(16), marginBottom: sHeight(16) }]}>
          {t('gaming.cardSubtitle')}
        </Text>
        <Text
          style={[
            styles.description,
            { fontSize: sFont(14), marginBottom: sHeight(24), lineHeight: sFont(20) },
          ]}
        >
          {t('gaming.cardDescription')}
        </Text>

        <TouchableOpacity
          style={[
            styles.playButton,
            {
              paddingVertical: sHeight(14),
              paddingHorizontal: sWidth(32),
              borderRadius: sWidth(30),
            },
          ]}
          onPress={onPlayPress}
          activeOpacity={0.8}
        >
          <Text style={[styles.playButtonText, { fontSize: sFont(18) }]}>{t('gaming.playNow')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: Colors.surface,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginHorizontal: 20,
    marginTop: 20,
  },
  gameImage: {
    width: '100%',
    height: 220,
  },
  contentContainer: {
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primaryDeep,
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: Colors.textMuted,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  playButton: {
    backgroundColor: Colors.primarySoft,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    shadowColor: Colors.primarySoft,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  playButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textOnDark,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
