import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EnhancedLoginScreen, EnhancedSignupScreen } from '../screens';
import { colors } from '../styles/theme';

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const EnhancedAuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background.secondary },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen 
        name="Login" 
        component={EnhancedLoginScreen}
        options={{
          title: 'Sign In',
        }}
      />
      <Stack.Screen 
        name="Signup" 
        component={EnhancedSignupScreen}
        options={{
          title: 'Create Account',
        }}
      />
    </Stack.Navigator>
  );
};
