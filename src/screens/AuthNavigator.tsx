import React, { useState } from 'react';
import { LoginScreen } from './LoginScreen';
import { SignupScreen } from './SignupScreen';

type AuthScreenType = 'login' | 'signup';

export const AuthNavigator: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AuthScreenType>('login');

  const navigateToSignup = () => {
    setCurrentScreen('signup');
  };

  const navigateToLogin = () => {
    setCurrentScreen('login');
  };

  if (currentScreen === 'signup') {
    return <SignupScreen onNavigateToLogin={navigateToLogin} />;
  }

  return <LoginScreen onNavigateToSignup={navigateToSignup} />;
};
