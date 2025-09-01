import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreenNav, SignupScreenNav } from '../screens';
import { AuthStackParamList } from './types';

const Stack = createStackNavigator<AuthStackParamList>();

export const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#f8f9fa' },
      }}
    >
      <Stack.Screen 
        name="Login" 
        component={LoginScreenNav} 
        options={{ title: 'Login' }}
      />
      <Stack.Screen 
        name="Signup" 
        component={SignupScreenNav} 
        options={{ title: 'Sign Up' }}
      />
    </Stack.Navigator>
  );
};
