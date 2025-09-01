import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, spacing, typography, borderRadius } from '../../styles/theme';

const USER_STORAGE_KEY = '@auth_user';

export const DebugStorage: React.FC = () => {
  const [storageData, setStorageData] = useState<string>('');

  const checkStorage = async () => {
    try {
      const data = await AsyncStorage.getItem(USER_STORAGE_KEY);
      const message = data ? `Found user data: ${data}` : 'No user data found in storage';
      setStorageData(message);
      Alert.alert('Storage Check', message);
    } catch (error) {
      const errorMsg = 'Failed to read from storage';
      setStorageData(errorMsg);
      Alert.alert('Error', errorMsg);
    }
  };

  const clearStorage = async () => {
    try {
      await AsyncStorage.removeItem(USER_STORAGE_KEY);
      const message = 'Storage cleared successfully';
      setStorageData(message);
      Alert.alert('Success', message);
    } catch (error) {
      const errorMsg = 'Failed to clear storage';
      setStorageData(errorMsg);
      Alert.alert('Error', errorMsg);
    }
  };

  const getAllKeys = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const message = `All storage keys: ${keys.join(', ')}`;
      setStorageData(message);
      Alert.alert('All Keys', message);
    } catch (error) {
      const errorMsg = 'Failed to get storage keys';
      setStorageData(errorMsg);
      Alert.alert('Error', errorMsg);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔍 Storage Debug Panel</Text>
      
      <TouchableOpacity style={styles.button} onPress={checkStorage}>
        <Text style={styles.buttonText}>Check User Data</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={getAllKeys}>
        <Text style={styles.buttonText}>Show All Keys</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.button, styles.dangerButton]} onPress={clearStorage}>
        <Text style={styles.buttonText}>Clear Storage</Text>
      </TouchableOpacity>
      
      {storageData ? (
        <View style={styles.dataContainer}>
          <Text style={styles.dataTitle}>Last Result:</Text>
          <Text style={styles.dataText}>{storageData}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    backgroundColor: colors.background.secondary,
    margin: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  title: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.bold,
    color: colors.text.primary,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  button: {
    backgroundColor: colors.primary[500],
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginVertical: spacing.xs,
    alignItems: 'center',
  },
  dangerButton: {
    backgroundColor: colors.error[500],
  },
  buttonText: {
    color: colors.text.inverse,
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.semibold,
  },
  dataContainer: {
    marginTop: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  dataTitle: {
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.semibold,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  dataText: {
    fontSize: typography.fontSizes.sm,
    color: colors.text.primary,
    fontFamily: 'monospace',
  },
});
