import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts';
import { EnhancedInput, EnhancedButton, MessageCard, LoadingSpinner, PasswordInput } from '../components/ui';
import { commonStyles } from '../styles/commonStyles';
import { enhancedLoginScreenStyles as styles } from './EnhancedLoginScreen.styles';

type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

export const EnhancedLoginScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const { login, isLoading } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    // Email validation
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(password)) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    console.log('handleLogin called');
    
    // Clear previous errors
    setErrors({});

    // Validate form
    if (!validateForm()) {
      console.log('Form validation failed');
      return;
    }

    console.log('Form validation passed, attempting login...');

    try {
      await login({ email: email.trim(), password });
      console.log('Login successful');
      // Navigation will be handled by the parent component based on auth state
    } catch (error) {
      console.log('Login error caught in screen:', error);
      const errorMessage = (error as Error).message;
      console.log('Setting error message:', errorMessage);
      
      // Set the error message directly from the API response
      setErrors({ general: errorMessage || 'An error occurred during login' });
      console.log('Error state updated');
    }
  };

  const clearError = (field: keyof typeof errors) => {
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleNavigateToSignup = () => {
    navigation.navigate('Signup');
  };

  if (isLoading) {
    return (
      <SafeAreaView style={commonStyles.centerContainer}>
        <LoadingSpinner size="large" text="Signing you in..." />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <View style={styles.logo}>
                <Text style={styles.logoText}>🔐</Text>
              </View>
            </View>
            <Text style={commonStyles.heading1}>Welcome Back</Text>
            <Text style={commonStyles.subtitle}>
              Sign in to your account to continue
            </Text>
          </View>

          {/* Form Card */}
          <View style={styles.formCard}>
            {/* Email Input */}
            <EnhancedInput
              label="Email Address"
              placeholder="Enter your email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                clearError('email');
                clearError('general');
              }}
              error={errors.email}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!isLoading}
            />

            {/* Password Input */}
            <PasswordInput
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                clearError('password');
                clearError('general');
              }}
              error={errors.password}
            />

            {/* General Error Message */}
            {errors.general && (
              <MessageCard type="error" message={errors.general} />
            )}

            {/* Login Button */}
            <EnhancedButton
              title="Sign In"
              onPress={handleLogin}
              loading={isLoading}
              disabled={isLoading}
              size="large"
              style={styles.loginButton}
            />

            {/* Forgot Password Link */}
            <TouchableOpacity style={styles.forgotPasswordContainer}>
              <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
            </TouchableOpacity>
          </View>

          {/* Demo Credentials */}
          <MessageCard
            type="info"
            title="Demo Credentials"
            message={`Email: demo@example.com\nPassword: password123`}
          />

          {/* Navigation to Signup */}
          <View style={styles.navigationContainer}>
            <Text style={styles.navigationText}>Don't have an account? </Text>
            <TouchableOpacity
              onPress={handleNavigateToSignup}
              disabled={isLoading}
            >
              <Text style={[
                styles.navigationLink,
                isLoading && styles.navigationLinkDisabled
              ]}>
                Create Account
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};


