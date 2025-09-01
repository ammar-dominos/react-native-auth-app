import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './src/contexts';
import { EnhancedRootNavigator } from './src/navigation';

export default function App() {
  return (
    <AuthProvider>
      <EnhancedRootNavigator />
      <StatusBar style="auto" />
    </AuthProvider>
  );
}
