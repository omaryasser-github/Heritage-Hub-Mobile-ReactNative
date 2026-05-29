import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useResponsive } from '../../../shared/utils/responsive';

interface SettingsProp {
    icon: string | any;
    label: string;
    onPress: () => void;
    isDestructive?: boolean;
}

export const SettingsRow = ({ icon, label, onPress, isDestructive }: SettingsProp) => {
    const { sWidth, sHeight, sFont } = useResponsive();
    return (
        <TouchableOpacity 
            style={[styles.container, { paddingVertical: sHeight(16), paddingHorizontal: sWidth(24) }]} 
            onPress={onPress}
        >
            <Ionicons name={icon} size={sWidth(24)} color={isDestructive ? '#D32F2F' : '#4A3728'} />
            <Text style={[styles.label, { fontSize: sFont(16), marginStart: sWidth(16) }, isDestructive && styles.destructiveLabel]}>
                {label}
            </Text>
            <Ionicons name="chevron-forward" size={sWidth(20)} color="#8E8E93" style={styles.chevron} />
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    label: {
        flex: 1,
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

