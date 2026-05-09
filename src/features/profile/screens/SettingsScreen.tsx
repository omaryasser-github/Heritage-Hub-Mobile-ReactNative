import React, { useState } from 'react';
import { ScrollView, StyleSheet, Alert, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SettingsGroup } from '../components/SettingsGroup';
import { SettingsRow } from '../components/SettingsRow';
import { SwitchToggle } from '../../../shared/components/SwitchToggle';
import { ActionModal } from '../../../shared/components/ActionModal';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Local component to handle toggle rows without modifying the original SettingsRow
const SettingsToggleRow = ({ icon, label, value, onValueChange }: any) => (
  <View style={styles.rowContainer}>
    <Ionicons name={icon} size={24} color="#4A3728" />
    <Text style={styles.rowLabel}>{label}</Text>
    <SwitchToggle value={value} onValueChange={onValueChange} />
  </View>
);

export const SettingsScreen = () => {
  // State for switches
  const [isArabic, setIsArabic] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(false);

  // State for modals
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const navigation = useNavigation<any>();

  const handleNavigateToEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  // Handlers
  const handleToggleLanguage = (value: boolean) => {
    setIsArabic(value);
    // TODO: In a real implementation, use I18nManager.forceRTL(value) and trigger an app reload
  };

  const handleLogout = () => {
    setLogoutModalVisible(false);
    // TODO: Reset Zustand store and navigate to Auth
  };

  const handleDeleteAccount = () => {
    setDeleteModalVisible(false);
    // TODO: Call API to delete account, then reset store and navigate to Auth
  };

  const handleOpenLink = (url: string) => {
    // In a real app, use Linking.openURL(url)
    Alert.alert('Opening Link', url);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        <SettingsGroup title="Account">
          <SettingsRow
            icon="person-outline"
            label="Edit Profile"
            onPress={() => handleNavigateToEditProfile()}
          />
        </SettingsGroup>

        <SettingsGroup title="Preferences">
          <SettingsToggleRow
            icon="language-outline"
            label="Arabic Language (RTL)"
            value={isArabic}
            onValueChange={handleToggleLanguage}
          />
        </SettingsGroup>

        <SettingsGroup title="Permissions">
          <SettingsToggleRow
            icon="notifications-outline"
            label="Push Notifications"
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
          />
          <SettingsToggleRow
            icon="location-outline"
            label="Location Services"
            value={locationEnabled}
            onValueChange={setLocationEnabled}
          />
        </SettingsGroup>

        <SettingsGroup title="Support">
          <SettingsRow
            icon="document-text-outline"
            label="Privacy Policy"
            onPress={() => handleOpenLink('https://heritagehub.example.com/privacy')}
          />
          <SettingsRow
            icon="information-circle-outline"
            label="Terms of Service"
            onPress={() => handleOpenLink('https://heritagehub.example.com/terms')}
          />
          <SettingsRow
            icon="mail-outline"
            label="Contact Us"
            onPress={() => handleOpenLink('mailto:support@heritagehub.example.com')}
          />
        </SettingsGroup>

        <SettingsGroup title="Danger Zone">
          <SettingsRow
            icon="log-out-outline"
            label="Log Out"
            onPress={() => setLogoutModalVisible(true)}
            isDestructive
          />
          <SettingsRow
            icon="trash-outline"
            label="Delete Account"
            onPress={() => setDeleteModalVisible(true)}
            isDestructive
          />
        </SettingsGroup>

        {/* Modals */}
        <ActionModal
          visible={logoutModalVisible}
          title="Log Out"
          message="Are you sure you want to log out of your account?"
          confirmText="Log Out"
          isDestructive={true}
          onConfirm={handleLogout}
          onCancel={() => setLogoutModalVisible(false)}
        />

        <ActionModal
          visible={deleteModalVisible}
          title="Delete Account"
          message="This action is permanent and cannot be undone. All your progress, badges, and favorites will be lost. Are you absolutely sure?"
          confirmText="Delete"
          isDestructive={true}
          onConfirm={handleDeleteAccount}
          onCancel={() => setDeleteModalVisible(false)}
        />

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FDF6EC',
    marginTop: 30,
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
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  rowLabel: {
    flex: 1,
    fontSize: 16,
    marginStart: 16,
    color: '#4A3728',
    fontWeight: '500',
  },
});
