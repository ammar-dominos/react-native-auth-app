import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts';
import { Input, Button, Icon } from '../../components/ui';
import { useFormValidation } from '../../hooks';
import { validateEmail, validatePassword, showErrorAlert } from '../../utils';
import { colors } from '../../styles/theme';
import { loginScreenStyles as styles } from './LoginScreen.styles';

type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const { login, isLoading } = useAuth();
  
  const { fields, setValue, validateAll, getValues } = useFormValidation({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: {
      email: validateEmail,
      password: validatePassword,
    },
  });

  const handleLogin = useCallback(async () => {
    if (!validateAll()) {
      return;
    }

    Keyboard.dismiss();

    try {
      const values = getValues();
      await login({ email: values.email, password: values.password });
      // Navigation will be handled by the auth context
    } catch (error) {
      showErrorAlert(
        'Login Failed',
        error instanceof Error ? error.message : 'An unexpected error occurred'
      );
    }
  }, [validateAll, getValues, login]);

  const handleSignUpNavigation = useCallback(() => {
    navigation.navigate('Signup');
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header Section */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <View style={styles.logo}>
                <Icon name="lock" size={40} color="#007AFF" />
              </View>
            </View>
            <Text style={{ fontSize: 28, fontWeight: 'bold', color: colors.text.primary, marginBottom: 8 }}>
              Welcome Back
            </Text>
            <Text style={{ fontSize: 16, color: colors.text.secondary, textAlign: 'center' }}>
              Sign in to your account
            </Text>
          </View>

          {/* Form Section */}
          <View style={styles.formCard}>
            <Input
              label="Email"
              placeholder="Enter your email"
              value={fields.email.value}
              onChangeText={(value: string) => setValue('email', value)}
              error={fields.email.error}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
              editable={!isLoading}
            />

            <Input
              label="Password"
              placeholder="Enter your password"
              value={fields.password.value}
              onChangeText={(value: string) => setValue('password', value)}
              error={fields.password.error}
              secureTextEntry
              returnKeyType="done"
              onSubmitEditing={handleLogin}
              editable={!isLoading}
            />

            <Button
              title="Sign In"
              onPress={handleLogin}
              loading={isLoading}
              style={styles.loginButton}
            />
          </View>

          {/* Navigation Section */}
          <View style={styles.navigationContainer}>
            <Text style={styles.navigationText}>
              Don't have an account?{' '}
            </Text>
            <TouchableOpacity
              onPress={handleSignUpNavigation}
              disabled={isLoading}
            >
              <Text
                style={[
                  styles.navigationLink,
                  isLoading && styles.navigationLinkDisabled,
                ]}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
