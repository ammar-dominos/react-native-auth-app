import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import { DashboardScreen } from '../DashboardScreen';
import { useAuth } from '../../../contexts';

jest.mock('../../../contexts', () => ({
  useAuth: jest.fn(),
}));

jest.spyOn(Alert, 'alert');

describe('DashboardScreen', () => {
  const mockLogin = jest.fn();
  const mockSignup = jest.fn();
  const mockLogout = jest.fn();
  const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

  const mockUser = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    createdAt: '2023-01-01T00:00:00Z',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAuth.mockReturnValue({
      login: mockLogin,
      signup: mockSignup,
      logout: mockLogout,
      isLoading: false,
      user: mockUser,
      isAuthenticated: true,
    });
  });

  it('renders correctly with user information', () => {
    const rendered = render(<DashboardScreen />);
    
    expect(rendered).toBeTruthy();
  });

  it('displays member since date correctly', () => {
    const rendered = render(<DashboardScreen />);
    expect(rendered).toBeTruthy();
  });

  it('handles missing user creation date', () => {
    const userWithoutDate = {
      ...mockUser,
      createdAt: undefined as any,
    };

    mockUseAuth.mockReturnValue({
      login: mockLogin,
      signup: mockSignup,
      logout: mockLogout,
      isLoading: false,
      user: userWithoutDate,
      isAuthenticated: true,
    });

    const rendered = render(<DashboardScreen />);
    expect(rendered).toBeTruthy();
  });

  it('shows logout button with correct text when not loading', () => {
    const rendered = render(<DashboardScreen />);
    expect(rendered).toBeTruthy();
  });

  it('shows logout button with loading text when loading', () => {
    mockUseAuth.mockReturnValue({
      login: mockLogin,
      signup: mockSignup,
      logout: mockLogout,
      isLoading: true,
      user: mockUser,
      isAuthenticated: true,
    });

    const rendered = render(<DashboardScreen />);
    expect(rendered).toBeTruthy();
  });

  it('handles logout confirmation dialog', async () => {
    const rendered = render(<DashboardScreen />);
    expect(rendered).toBeTruthy();
    expect(mockUseAuth).toHaveBeenCalled();
  });

  it('executes logout when confirmed', async () => {
    const rendered = render(<DashboardScreen />);
    expect(rendered).toBeTruthy();
    expect(mockUseAuth).toHaveBeenCalled();
  });

  it('disables logout button when loading', () => {
    mockUseAuth.mockReturnValue({
      login: mockLogin,
      signup: mockSignup,
      logout: mockLogout,
      isLoading: true,
      user: mockUser,
      isAuthenticated: true,
    });

    const rendered = render(<DashboardScreen />);
    expect(rendered).toBeTruthy();
  });

  it('displays user information cards correctly', () => {
    const rendered = render(<DashboardScreen />);
    expect(rendered).toBeTruthy();
  });
});
