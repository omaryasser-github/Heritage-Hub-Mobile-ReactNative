import React, { useState } from 'react';
import { ScrollView, StyleSheet, Alert, View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { SettingsGroup } from '../components/SettingsGroup';
import { SettingsRow } from '../components/SettingsRow';
import { LanguageSelector } from '../components/LanguageSelector';
import { SwitchToggle } from '../../../shared/components/SwitchToggle';
import { ActionModal } from '../../../shared/components/ActionModal';
import { Colors } from '../../../shared/constants/colors';
import { useLanguage } from '../../../shared/hooks/useLanguage';

const SettingsToggleRow = ({
  icon,
  label,
  value,
  onValueChange,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}) => (
  <View style={styles.rowContainer}>
    <Ionicons name={icon} size={24} color={Colors.textPrimary} />
    <Text style={styles.rowLabel}>{label}</Text>
    <SwitchToggle value={value} onValueChange={onValueChange} />
  </View>
);

export const SettingsScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const { t } = useTranslation();
  const { currentLanguage, supportedLanguages } = useLanguage();

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const activeLanguageLabel = supportedLanguages[currentLanguage].nativeLabel;

  const handleLogout = () => {
    setLogoutModalVisible(false);
    // TODO: Reset Zustand store and navigate to Auth
  };

  const handleDeleteAccount = () => {
    setDeleteModalVisible(false);
    // TODO: Call API to delete account, then reset store and navigate to Auth
  };

  const handleOpenLink = (url: string) => {
    Alert.alert(t('common.openingLink'), url);
  };

  return (
    <View
      style={[
        styles.safeArea,
        {
          paddingTop: insets.top + 10,
          paddingBottom: Math.max(insets.bottom, 16),
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}
    >
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <SettingsGroup title={t('settings.account')}>
          <SettingsRow
            icon="person-outline"
            label={t('profile.editProfile')}
            onPress={() => navigation.navigate('EditProfile')}
          />
        </SettingsGroup>

        <SettingsGroup title={t('settings.preferences')}>
          <SettingsRow
            icon="language-outline"
            label={t('common.language')}
            value={activeLanguageLabel}
            onPress={() => setLanguageModalVisible(true)}
          />
        </SettingsGroup>

        <SettingsGroup title={t('settings.permissions')}>
          <SettingsToggleRow
            icon="notifications-outline"
            label={t('settings.pushNotifications')}
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
          />
          <SettingsToggleRow
            icon="location-outline"
            label={t('settings.locationServices')}
            value={locationEnabled}
            onValueChange={setLocationEnabled}
          />
        </SettingsGroup>

        <SettingsGroup title={t('settings.legal')}>
          <SettingsRow
            icon="document-text-outline"
            label={t('settings.privacyPolicy')}
            onPress={() => handleOpenLink('https://heritagehub.example.com/privacy')}
          />
          <SettingsRow
            icon="information-circle-outline"
            label={t('settings.termsOfService')}
            onPress={() => handleOpenLink('https://heritagehub.example.com/terms')}
          />
          <SettingsRow
            icon="mail-outline"
            label={t('common.contactUs')}
            onPress={() => handleOpenLink('mailto:support@heritagehub.example.com')}
          />
        </SettingsGroup>

        <SettingsGroup title={t('settings.dangerZone')}>
          <SettingsRow
            icon="log-out-outline"
            label={t('profile.logOut')}
            onPress={() => setLogoutModalVisible(true)}
            isDestructive
          />
          <SettingsRow
            icon="trash-outline"
            label={t('settings.deleteAccount')}
            onPress={() => setDeleteModalVisible(true)}
            isDestructive
          />
        </SettingsGroup>

        <LanguageSelector
          visible={languageModalVisible}
          onClose={() => setLanguageModalVisible(false)}
        />

        <ActionModal
          visible={logoutModalVisible}
          title={t('settings.logoutTitle')}
          message={t('settings.logoutMessage')}
          confirmText={t('profile.logOut')}
          cancelText={t('common.cancel')}
          isDestructive
          onConfirm={handleLogout}
          onCancel={() => setLogoutModalVisible(false)}
        />

        <ActionModal
          visible={deleteModalVisible}
          title={t('settings.deleteTitle')}
          message={t('settings.deleteMessageLong')}
          confirmText={t('settings.deleteAccount')}
          cancelText={t('common.cancel')}
          isDestructive
          onConfirm={handleDeleteAccount}
          onCancel={() => setDeleteModalVisible(false)}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.backgroundApp,
  },
  container: {
    flex: 1,
    paddingTop: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.backgroundNeutral,
  },
  rowLabel: {
    flex: 1,
    fontSize: 16,
    marginStart: 16,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
});
