import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../contexts';
import { EnhancedAuthNavigator } from './EnhancedAuthNavigator';
import { EnhancedHomeScreen } from '../screens';
import { LoadingSpinner } from '../components/ui';
import { SafeAreaView } from 'react-native';
import { commonStyles } from '../styles/commonStyles';

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const EnhancedRootNavigator: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <SafeAreaView style={commonStyles.centerContainer}>
        <LoadingSpinner size="large" text="Loading..." />
      </SafeAreaView>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}
      >
        {isAuthenticated ? (
          <Stack.Screen name="Main" component={EnhancedHomeScreen} />
        ) : (
          <Stack.Screen name="Auth" component={EnhancedAuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
