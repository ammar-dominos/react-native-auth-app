import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { colors, spacing, typography } from '../../styles/theme';

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
      
      <TouchableOpacity style={[styles.button, styles.successButton]} onPress={testValidLogin}>
        <Text style={styles.buttonText}>Test Valid Login</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.button, styles.errorButton]} onPress={testInvalidLogin}>
        <Text style={styles.buttonText}>Test Invalid Login</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={clearError}>
        <Text style={styles.buttonText}>Clear Error</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.secondary,
    padding: spacing.md,
    borderRadius: 8,
    margin: spacing.md,
    borderWidth: 2,
    borderColor: colors.border.light,
  },
  title: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.bold,
    color: colors.text.primary,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  errorContainer: {
    backgroundColor: colors.error[50],
    borderColor: colors.error[200],
    borderWidth: 1,
    borderRadius: 6,
    padding: spacing.sm,
    marginBottom: spacing.md,
  },
  errorText: {
    color: colors.error[700],
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.medium,
  },
  button: {
    padding: spacing.md,
    borderRadius: 6,
    marginVertical: spacing.xs,
    alignItems: 'center',
  },
  successButton: {
    backgroundColor: colors.success[500],
  },
  errorButton: {
    backgroundColor: colors.error[500],
  },
  clearButton: {
    backgroundColor: colors.text.tertiary,
  },
  buttonText: {
    color: colors.text.inverse,
    fontWeight: typography.fontWeights.semibold,
    fontSize: typography.fontSizes.sm,
  },
});
