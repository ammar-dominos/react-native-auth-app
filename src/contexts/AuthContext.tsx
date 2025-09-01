import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, AuthState, LoginCredentials, SignupCredentials, AuthContextType } from '../types/auth';

// Initial state
const initialState: AuthState = {
  user: null,
  isLoading: true,
  isAuthenticated: false,
};

// Action types
type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'RESTORE_USER'; payload: User | null };

// Reducer
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

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Storage keys
const USER_STORAGE_KEY = '@auth_user';

// User database for demo purposes
const USERS_DATABASE: { [email: string]: { password: string; name: string; id: string; createdAt: string } } = {};

// Initialize demo user
USERS_DATABASE['demo@example.com'] = {
  password: 'password123',
  name: 'Demo User',
  id: '1',
  createdAt: new Date().toISOString(),
};

console.log('USERS_DATABASE initialized:', USERS_DATABASE);

// Add a second test user for testing
USERS_DATABASE['test@example.com'] = {
  password: 'test123',
  name: 'Test User',
  id: '2',
  createdAt: new Date().toISOString(),
};

console.log('Initial users database:', Object.keys(USERS_DATABASE));
console.log('Demo user details:', USERS_DATABASE['demo@example.com']);

// Provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Restore user session on app start
  useEffect(() => {
    restoreUser();
  }, []);

  const restoreUser = async () => {
    try {
      console.log('Attempting to restore user from AsyncStorage...');
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const storedUser = await AsyncStorage.getItem(USER_STORAGE_KEY);
      console.log('Raw stored data:', storedUser);
      
      if (storedUser) {
        const user: User = JSON.parse(storedUser);
        console.log('Restored user:', user);
        
        // Add the restored user to our demo database if not already there
        if (!USERS_DATABASE[user.email]) {
          USERS_DATABASE[user.email] = {
            password: 'restored_user', // We don't store passwords in real storage
            name: user.name,
            id: user.id,
            createdAt: user.createdAt,
          };
          console.log('Added restored user to database');
        }
        
        dispatch({ type: 'RESTORE_USER', payload: user });
      } else {
        console.log('No stored user found');
        dispatch({ type: 'RESTORE_USER', payload: null });
      }
    } catch (error) {
      console.error('Error restoring user:', error);
      dispatch({ type: 'RESTORE_USER', payload: null });
    }
  };

  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      console.log('Login function called with:', credentials.email);
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Authentication API call
      const response = await authenticateUser(credentials);
      console.log('API response:', response);
      
      if (response.success && response.user) {
        const user: User = response.user;
        
        // Store user in AsyncStorage
        await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
        
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      } else {
        console.log('Login failed, throwing error:', response.error);
        throw new Error(response.error || 'Login failed');
      }
    } catch (error) {
      console.log('Error in login function:', error);
      dispatch({ type: 'SET_LOADING', payload: false });
      throw error;
    }
  };

  const signup = async (credentials: SignupCredentials): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Registration API call
      const response = await registerUser(credentials);
      
      if (response.success && response.user) {
        const user: User = response.user;
        
        console.log('Saving user to AsyncStorage:', user);
        
        // Store user in AsyncStorage
        await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
        
        const savedData = await AsyncStorage.getItem(USER_STORAGE_KEY);
        console.log('Verified saved data:', savedData);
        
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      } else {
        throw new Error(response.error || 'Signup failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      dispatch({ type: 'SET_LOADING', payload: false });
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      // Remove user from AsyncStorage
      await AsyncStorage.removeItem(USER_STORAGE_KEY);
      
      // Update state
      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      console.error('Error during logout:', error);
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

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const authenticateUser = async (credentials: LoginCredentials): Promise<{
  success: boolean;
  user?: User;
  error?: string;
}> => {
  // Network delay for realistic UX
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  console.log('Attempting login for:', credentials.email);
  console.log('Available users:', Object.keys(USERS_DATABASE));
  
  // Check if user exists
  const storedUser = USERS_DATABASE[credentials.email];
  if (!storedUser) {
    console.log('User not found');
    return {
      success: false,
      error: 'No account found with this email address',
    };
  }
  
  // Check password
  if (storedUser.password !== credentials.password) {
    console.log('Invalid password');
    return {
      success: false,
      error: 'Invalid password. Please check your credentials.',
    };
  }
  
  console.log('Login successful');
  return {
    success: true,
    user: {
      id: storedUser.id,
      email: credentials.email,
      name: storedUser.name,
      createdAt: storedUser.createdAt,
    },
  };
};

const registerUser = async (credentials: SignupCredentials): Promise<{
  success: boolean;
  user?: User;
  error?: string;
}> => {
  // Network delay for realistic UX
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  console.log('Attempting signup for:', credentials.email);
  
  // Check if user already exists
  if (USERS_DATABASE[credentials.email]) {
    console.log('User already exists');
    return {
      success: false,
      error: 'An account with this email already exists',
    };
  }
  
  // Validate input
  if (!credentials.email || !credentials.password || !credentials.name) {
    return {
      success: false,
      error: 'All fields are required',
    };
  }
  
  // Create new user
  const newUser = {
    id: Date.now().toString(),
    email: credentials.email,
    name: credentials.name,
    password: credentials.password,
    createdAt: new Date().toISOString(),
  };
  
  // Add to database
  USERS_DATABASE[credentials.email] = newUser;
  
  console.log('Signup successful, user added to database');
  console.log('Updated users database:', Object.keys(USERS_DATABASE));
  
  return {
    success: true,
    user: {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      createdAt: newUser.createdAt,
    },
  };
};
