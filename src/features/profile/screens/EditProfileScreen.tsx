import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../../shared/constants/colors';
import { Spacing } from '../../../shared/constants/spacing';

export const EditProfileScreen = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const [name, setName] = useState('Omar Yasser');
  const [email, setEmail] = useState('omar.yasser@example.com');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      navigation.goBack();
    }, 1000);
  };

  return (
    <View
      style={[
        styles.safeArea,
        {
          paddingTop: insets.top,
          paddingBottom: Math.max(insets.bottom, 16),
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.headerTitle}>Edit Profile</Text>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              placeholderTextColor={Colors.textSubtle}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor={Colors.textSubtle}
            />
          </View>

          <TouchableOpacity
            style={[styles.saveButton, isSaving && styles.saveButtonDisabled]}
            onPress={handleSave}
            disabled={isSaving}
          >
            <Text style={styles.saveButtonText}>
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
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
  },
  scrollContent: {
    padding: Spacing.screenPadding,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 32,
  },
  formGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.switchTrackOff,
    borderRadius: Spacing.borderRadius.md,
    paddingHorizontal: Spacing.gutter,
    paddingVertical: 14,
    fontSize: 16,
    color: Colors.textSecondary,
  },
  saveButton: {
    backgroundColor: Colors.primarySolid,
    borderRadius: Spacing.borderRadius.md,
    paddingVertical: Spacing.gutter,
    alignItems: 'center',
    marginTop: Spacing.gutter,
  },
  saveButtonDisabled: {
    backgroundColor: Colors.switchTrackOff,
  },
  saveButtonText: {
    color: Colors.textOnDark,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
