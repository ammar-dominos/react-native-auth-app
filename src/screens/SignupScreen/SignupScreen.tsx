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
import { useAuth } from '../../contexts';
import { Input, Button, MessageCard, LoadingSpinner } from '../../components/ui';
import { signupScreenStyles as styles } from './SignupScreen.styles';

type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

export const SignupScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const { signup, isLoading } = useAuth();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
  }>({});

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  const validateName = (name: string): boolean => {
    return name.trim().length >= 2;
  };

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    // Name validation
    if (!name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (!validateName(name)) {
      newErrors.name = 'Name must be at least 2 characters long';
    }

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

    // Confirm password validation
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    // Clear previous errors
    setErrors({});

    // Validate form
    if (!validateForm()) {
      return;
    }

    try {
      await signup({ 
        name: name.trim(), 
        email: email.trim(), 
        password 
      });
      // Navigation will be handled by the parent component based on auth state
    } catch (error) {
      const errorMessage = (error as Error).message;
      setErrors({ general: errorMessage || 'An error occurred during signup' });
    }
  };

  const clearError = (field: keyof typeof errors) => {
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleNavigateToLogin = () => {
    navigation.navigate('Login');
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <LoadingSpinner size="large" text="Creating your account..." />
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
                <Text style={styles.logoText}>🚀</Text>
              </View>
            </View>
            <Text style={styles.heading}>Create Account</Text>
            <Text style={styles.subtitle}>
              Join us today and get started
            </Text>
          </View>

          {/* Form Card */}
          <View style={styles.formCard}>
            {/* Name Input */}
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              value={name}
              onChangeText={(text: string) => {
                setName(text);
                clearError('name');
                clearError('general');
              }}
              error={errors.name}
              autoCapitalize="words"
              autoCorrect={false}
              editable={!isLoading}
            />

            {/* Email Input */}
            <Input
              label="Email Address"
              placeholder="Enter your email"
              value={email}
              onChangeText={(text: string) => {
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
            <Input
              label="Password"
              placeholder="Create a password"
              value={password}
              onChangeText={(text: string) => {
                setPassword(text);
                clearError('password');
                clearError('confirmPassword');
                clearError('general');
              }}
              error={errors.password}
              secureTextEntry
              editable={!isLoading}
            />

            {/* Confirm Password Input */}
            <Input
              label="Confirm Password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={(text: string) => {
                setConfirmPassword(text);
                clearError('confirmPassword');
                clearError('general');
              }}
              error={errors.confirmPassword}
              secureTextEntry
              editable={!isLoading}
            />

            {/* General Error Message */}
            {errors.general && (
              <MessageCard type="error" message={errors.general} />
            )}

            {/* Signup Button */}
            <Button
              title="Create Account"
              onPress={handleSignup}
              loading={isLoading}
              disabled={isLoading}
              variant="success"
              size="large"
              style={styles.signupButton}
            />

            {/* Terms and Privacy */}
            <Text style={styles.termsText}>
              By creating an account, you agree to our{' '}
              <Text style={styles.termsLink}>Terms of Service</Text>
              {' '}and{' '}
              <Text style={styles.termsLink}>Privacy Policy</Text>
            </Text>
          </View>

          {/* Navigation to Login */}
          <View style={styles.navigationContainer}>
            <Text style={styles.navigationText}>Already have an account? </Text>
            <TouchableOpacity
              onPress={handleNavigateToLogin}
              disabled={isLoading}
            >
              <Text style={[
                styles.navigationLink,
                isLoading && styles.navigationLinkDisabled
              ]}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

