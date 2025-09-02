import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { simpleLoginTestStyles as styles } from './SimpleLoginTest.styles';

export const SimpleLoginTest: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');

  const testValidLogin = () => {
    console.log('Simulating valid login');
    setErrorMessage('');
    Alert.alert('Valid Login Test', 'This would log in successfully');
  };

  const testInvalidLogin = () => {
    console.log('Simulating invalid login');
    setErrorMessage('Invalid email or password');
    Alert.alert('Invalid Login Test', 'Error message should appear below');
  };

  const clearError = () => {
    setErrorMessage('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simple Login Test</Text>
      
      {errorMessage && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      )}
      
      <TouchableOpacity 
        style={[styles.button, styles.successButton]} 
        onPress={testValidLogin}
        accessibilityLabel="Test Valid Login"
      >
        <Text style={styles.buttonText}>Test Valid Login</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.button, styles.errorButton]} 
        onPress={testInvalidLogin}
        accessibilityLabel="Test Invalid Login"
      >
        <Text style={styles.buttonText}>Test Invalid Login</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.button, styles.clearButton]} 
        onPress={clearError}
        accessibilityLabel="Clear Error"
      >
        <Text style={styles.buttonText}>Clear Error</Text>
      </TouchableOpacity>
    </View>
  );
};
