import React from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../utils/index'

function RefreshButton({ load }) {
    const refreshButtonName = Platform.OS === 'ios' ? 'ios-refresh' : 'md-refresh';
    return (
        <View styles={styles.icon}>
            <Ionicons onPress={load} name={refreshButtonName} size={24} color={colors.PRIMARY_COLOR} />
        </View>
    );
}

const styles = StyleSheet.create({
    icon: { position: "absolute"}
})
export default RefreshButton;