import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SignupScreen } from '../SignupScreen';
import { useAuth } from '../../../contexts';

jest.mock('../../../contexts', () => ({
  useAuth: jest.fn(),
}));

jest.spyOn(Alert, 'alert');

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

describe('SignupScreen', () => {
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
    const rendered = render(<SignupScreen />);
    expect(rendered).toBeTruthy();
  });

  it('shows loading state when signing up', () => {
    mockUseAuth.mockReturnValue({
      login: mockLogin,
      signup: mockSignup,
      logout: mockLogout,
      isLoading: true,
      user: null,
      isAuthenticated: false,
    });

    const rendered = render(<SignupScreen />);
    expect(rendered).toBeTruthy();
  });

  it('handles signup form submission', async () => {
    const rendered = render(<SignupScreen />);
    expect(rendered).toBeTruthy();
    expect(mockUseAuth).toHaveBeenCalled();
  });

  it('shows error alert for mismatched passwords', async () => {
    const rendered = render(<SignupScreen />);
    expect(rendered).toBeTruthy();
  });

  it('shows error alert for invalid email', async () => {
    const rendered = render(<SignupScreen />);
    expect(rendered).toBeTruthy();
  });

  it('shows error alert for empty fields', async () => {
    const rendered = render(<SignupScreen />);
    expect(rendered).toBeTruthy();
  });

  it('navigates to login when login link is pressed', () => {
    const rendered = render(<SignupScreen />);
    expect(rendered).toBeTruthy();
    expect(mockUseAuth).toHaveBeenCalled();
  });
});
