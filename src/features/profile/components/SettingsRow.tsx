import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SettingsProp {
    icon: string | any;
    label: string;
    onPress: () => void;
    isDestructive?: boolean;
}

export const SettingsRow = ({ icon, label, onPress, isDestructive }: SettingsProp) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Ionicons name={icon} size={24} color={isDestructive ? '#D32F2F' : '#4A3728'} />
            <Text style={[styles.label, isDestructive && styles.destructiveLabel]}>{label}</Text>
            <Ionicons name="chevron-forward" size={20} color="#8E8E93" style={styles.chevron} />
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 24,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    label: {
        flex: 1,
        fontSize: 16,
        marginStart: 16,
        color: '#4A3728',
        fontWeight: '500',
    },
    destructiveLabel: {
        color: '#D32F2F',
    },
    chevron: {
        opacity: 0.5,
    }
});
