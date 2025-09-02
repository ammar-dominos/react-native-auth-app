import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { User, AuthState, LoginCredentials, SignupCredentials, AuthContextType } from '../types/auth';
import { authService } from '../services';

const initialState: AuthState = {
  user: null,
  isLoading: true,
  isAuthenticated: false,
};

type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'RESTORE_USER'; payload: User | null };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case 'RESTORE_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    restoreUser();
  }, []);

  const restoreUser = async () => {
    try {
      console.log('Attempting to restore user session...');
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const user = await authService.restoreSession();
      console.log('Restored user:', user);
      
      dispatch({ type: 'RESTORE_USER', payload: user });
    } catch (error) {
      console.error('Failed to restore user session:', error);
      dispatch({ type: 'RESTORE_USER', payload: null });
    }
  };

  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      console.log('Attempting login for:', credentials.email);
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const user = await authService.login(credentials);
      console.log('Login successful:', user);
      
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } catch (error) {
      console.error('Login failed:', error);
      dispatch({ type: 'SET_LOADING', payload: false });
      throw error;
    }
  };

  const signup = async (credentials: SignupCredentials): Promise<void> => {
    try {
      console.log('Attempting signup for:', credentials.email);
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const user = await authService.signup(credentials);
      console.log('Signup successful:', user);
      
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } catch (error) {
      console.error('Signup failed:', error);
      dispatch({ type: 'SET_LOADING', payload: false });
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      console.log('Attempting logout...');
      dispatch({ type: 'SET_LOADING', payload: true });
      
      await authService.logout();
      console.log('Logout successful');
      
      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      console.error('Logout failed:', error);
      dispatch({ type: 'SET_LOADING', payload: false });
      throw error;
    }
  };

  const value: AuthContextType = {
    user: state.user,
    isLoading: state.isLoading,
    isAuthenticated: state.isAuthenticated,
    
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
