import React from 'react';
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
import { Input, Button, LoadingSpinner, Icon } from '../../components/ui';
import { useFormValidation } from '../../hooks';
import { validateName, validateEmail, validatePassword, validateConfirmPassword, showErrorAlert } from '../../utils';
import { signupScreenStyles as styles } from './SignupScreen.styles';

type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

export const SignupScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const { signup, isLoading } = useAuth();
  
    const { fields, setValue, validateAll, getValues } = useFormValidation({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: {
      name: validateName,
      email: validateEmail,
      password: validatePassword,
      confirmPassword: validatePassword, // We'll handle confirm password validation separately
    },
  });

  const handleSignup = async () => {
    if (!validateAll()) {
      return;
    }

    // Additional confirm password validation
    const values = getValues();
    const confirmPasswordValidation = validateConfirmPassword(values.password, values.confirmPassword);
    if (!confirmPasswordValidation.isValid) {
      showErrorAlert('Validation Error', confirmPasswordValidation.error || 'Passwords do not match');
      return;
    }

    try {
      await signup({ 
        name: values.name.trim(), 
        email: values.email.trim(), 
        password: values.password 
      });
      // Navigation will be handled by the parent component based on auth state
    } catch (error) {
      const errorMessage = (error as Error).message;
      showErrorAlert('Signup Failed', errorMessage || 'An error occurred during signup');
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
                <Icon name="rocket" size={48} color="#FFFFFF" />
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
              value={fields.name.value}
              onChangeText={(text: string) => setValue('name', text)}
              error={fields.name.error}
              autoCapitalize="words"
              autoCorrect={false}
              editable={!isLoading}
            />

            {/* Email Input */}
            <Input
              label="Email Address"
              placeholder="Enter your email"
              value={fields.email.value}
              onChangeText={(text: string) => setValue('email', text)}
              error={fields.email.error}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!isLoading}
            />

            {/* Password Input */}
            <Input
              label="Password"
              placeholder="Create a password"
              value={fields.password.value}
              onChangeText={(text: string) => setValue('password', text)}
              error={fields.password.error}
              secureTextEntry
              editable={!isLoading}
            />

            {/* Confirm Password Input */}
            <Input
              label="Confirm Password"
              placeholder="Confirm your password"
              value={fields.confirmPassword.value}
              onChangeText={(text: string) => setValue('confirmPassword', text)}
              error={fields.confirmPassword.error}
              secureTextEntry
              editable={!isLoading}
            />

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

