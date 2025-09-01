import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const PersistenceDemo: React.FC = () => {
  const [storageContent, setStorageContent] = useState<string>('');

  const checkStorage = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('@auth_user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setStorageContent(`User in storage:\nName: ${user.name}\nEmail: ${user.email}\nID: ${user.id}`);
      } else {
        setStorageContent('No user data in storage');
      }
    } catch (error) {
      setStorageContent('Error reading storage');
      console.error('Storage error:', error);
    }
  };

  const clearStorage = async () => {
    Alert.alert(
      'Clear Storage',
      'This will log out the user. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('@auth_user');
              setStorageContent('Storage cleared');
              Alert.alert('Success', 'Storage cleared. Please restart the app to see the effect.');
            } catch (error) {
              Alert.alert('Error', 'Failed to clear storage');
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AsyncStorage Demo</Text>
      
      <TouchableOpacity style={styles.button} onPress={checkStorage}>
        <Text style={styles.buttonText}>Check Storage Content</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.dangerButton]} onPress={clearStorage}>
        <Text style={styles.buttonText}>Clear Storage (Logout)</Text>
      </TouchableOpacity>

      {storageContent ? (
        <View style={styles.contentContainer}>
          <Text style={styles.contentTitle}>Storage Content:</Text>
          <Text style={styles.contentText}>{storageContent}</Text>
        </View>
      ) : null}

      <View style={styles.instructions}>
        <Text style={styles.instructionTitle}>Test Persistence:</Text>
        <Text style={styles.instructionText}>
          1. Login to your account{'\n'}
          2. Check storage content{'\n'}
          3. Force close the app{'\n'}
          4. Reopen the app{'\n'}
          5. You should still be logged in!
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#1a1a1a',
  },
  button: {
    backgroundColor: '#3b82f6',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  dangerButton: {
    backgroundColor: '#ef4444',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  contentContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  contentTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#374151',
  },
  contentText: {
    fontSize: 14,
    color: '#6b7280',
    fontFamily: 'monospace',
  },
  instructions: {
    backgroundColor: '#eff6ff',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  instructionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#1e40af',
  },
  instructionText: {
    fontSize: 14,
    color: '#3730a3',
    lineHeight: 20,
  },
});
