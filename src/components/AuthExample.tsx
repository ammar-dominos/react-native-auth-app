import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useAuth } from '../contexts';

export const AuthExample: React.FC = () => {
  const { login, signup, logout, user, isAuthenticated, isLoading } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignupMode, setIsSignupMode] = useState(false);

  const handleAuth = async () => {
    try {
      if (isSignupMode) {
        await signup({ name, email, password });
        Alert.alert('Success', 'Account created successfully!');
      } else {
        await login({ email, password });
        Alert.alert('Success', 'Logged in successfully!');
      }
      // Clear form
      setEmail('');
      setPassword('');
      setName('');
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      Alert.alert('Success', 'Logged out successfully!');
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    }
  };

  if (isAuthenticated && user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.userInfo}>Name: {user.name}</Text>
        <Text style={styles.userInfo}>Email: {user.email}</Text>
        <Text style={styles.userInfo}>ID: {user.id}</Text>
        <TouchableOpacity
          style={[styles.button, styles.logoutButton]}
          onPress={handleLogout}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Logging out...' : 'Logout'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Text style={styles.title}>
        {isSignupMode ? 'Create Account' : 'Login'}
      </Text>
      
      {isSignupMode && (
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />
      )}
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <TouchableOpacity
        style={styles.button}
        onPress={handleAuth}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading 
            ? (isSignupMode ? 'Creating Account...' : 'Logging in...') 
            : (isSignupMode ? 'Sign Up' : 'Login')
          }
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.switchButton}
        onPress={() => setIsSignupMode(!isSignupMode)}
        disabled={isLoading}
      >
        <Text style={styles.switchButtonText}>
          {isSignupMode 
            ? 'Already have an account? Login' 
            : "Don't have an account? Sign Up"
          }
        </Text>
      </TouchableOpacity>
      
      <View style={styles.demoInfo}>
        <Text style={styles.demoText}>Demo credentials:</Text>
        <Text style={styles.demoText}>Email: demo@example.com</Text>
        <Text style={styles.demoText}>Password: password123</Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  switchButton: {
    alignItems: 'center',
    marginBottom: 20,
  },
  switchButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
  userInfo: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  demoInfo: {
    backgroundColor: '#e8f4fd',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  demoText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});
