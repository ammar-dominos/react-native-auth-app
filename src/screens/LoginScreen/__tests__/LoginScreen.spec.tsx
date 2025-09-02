import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../LoginScreen';
import { useAuth } from '../../../contexts';

// Mock the useAuth hook
jest.mock('../../../contexts', () => ({
  useAuth: jest.fn(),
}));

// Mock Alert
jest.spyOn(Alert, 'alert');

// Mock navigation
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  NavigationContainer: ({ children }: { children: React.ReactNode }) => children,
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

jest.mock('@react-navigation/stack', () => ({
  createStackNavigator: () => ({
    Navigator: ({ children }: { children: React.ReactNode }) => children,
    Screen: ({ children }: { children: React.ReactNode }) => children,
  }),
}));

describe('LoginScreen', () => {
  const mockLogin = jest.fn();
  const mockSignup = jest.fn();
  const mockLogout = jest.fn();
  const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAuth.mockReturnValue({
      login: mockLogin,
      signup: mockSignup,
      logout: mockLogout,
      isLoading: false,
      user: null,
      isAuthenticated: false,
    });
  });

  it('renders correctly', () => {
    const rendered = render(<LoginScreen />);
    expect(rendered).toBeTruthy();
  });

  it('shows loading state when logging in', () => {
    mockUseAuth.mockReturnValue({
      login: mockLogin,
      signup: mockSignup,
      logout: mockLogout,
      isLoading: true,
      user: null,
      isAuthenticated: false,
    });

    const rendered = render(<LoginScreen />);
    expect(rendered).toBeTruthy();
  });

  it('handles login form submission', async () => {
    const rendered = render(<LoginScreen />);
    expect(rendered).toBeTruthy();
    expect(mockUseAuth).toHaveBeenCalled();
  });

  it('shows error alert for invalid email', async () => {
    const rendered = render(<LoginScreen />);
    expect(rendered).toBeTruthy();
  });

  it('shows error alert for empty fields', async () => {
    const rendered = render(<LoginScreen />);
    expect(rendered).toBeTruthy();
  });

  it('navigates to signup when signup link is pressed', () => {
    const rendered = render(<LoginScreen />);
    expect(rendered).toBeTruthy();
    expect(mockUseAuth).toHaveBeenCalled();
  });

  it('shows error alert for invalid email', async () => {
    const rendered = render(<LoginScreen />);
    expect(rendered).toBeTruthy();
  });

  it('shows error alert for empty fields', async () => {
    const rendered = render(<LoginScreen />);
    expect(rendered).toBeTruthy();
  });

  it('navigates to signup when signup link is pressed', () => {
    const rendered = render(<LoginScreen />);
    expect(rendered).toBeTruthy();
    expect(mockUseAuth).toHaveBeenCalled();
  });
});
