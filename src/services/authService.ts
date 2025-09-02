import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, LoginCredentials, SignupCredentials } from '../types/auth';

const STORAGE_KEYS = {
  USER: '@auth_user',
  TOKEN: '@auth_token',
} as const;

/**
 * Authentication service responsible for all auth-related API calls and data persistence
 */
export class AuthService {
  /**
   * Simulate login API call
   */
  async login(credentials: LoginCredentials): Promise<User> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock validation
    if (!credentials.email || !credentials.password) {
      throw new Error('Email and password are required');
    }
    
    if (!this.isValidEmail(credentials.email)) {
      throw new Error('Please enter a valid email address');
    }
    
    if (credentials.password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }
    
    // Mock user data
    const user: User = {
      id: '1',
      email: credentials.email,
      name: credentials.email.split('@')[0],
      createdAt: new Date().toISOString(),
    };
    
    // Store user data
    await this.storeUserData(user);
    
    return user;
  }
  
  /**
   * Simulate signup API call
   */
  async signup(credentials: SignupCredentials): Promise<User> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock validation
    if (!credentials.name || !credentials.email || !credentials.password) {
      throw new Error('All fields are required');
    }
    
    if (!this.isValidEmail(credentials.email)) {
      throw new Error('Please enter a valid email address');
    }
    
    if (credentials.password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }
    
    if (credentials.name.length < 2) {
      throw new Error('Name must be at least 2 characters');
    }
    
    // Mock user data
    const user: User = {
      id: '1',
      email: credentials.email,
      name: credentials.name,
      createdAt: new Date().toISOString(),
    };
    
    // Store user data
    await this.storeUserData(user);
    
    return user;
  }
  
  /**
   * Logout user and clear stored data
   */
  async logout(): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Clear stored data
    await Promise.all([
      AsyncStorage.removeItem(STORAGE_KEYS.USER),
      AsyncStorage.removeItem(STORAGE_KEYS.TOKEN),
    ]);
  }
  
  /**
   * Restore user session from storage
   */
  async restoreSession(): Promise<User | null> {
    try {
      const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Failed to restore session:', error);
      return null;
    }
  }
  
  /**
   * Store user data in AsyncStorage
   */
  private async storeUserData(user: User): Promise<void> {
    await Promise.all([
      AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user)),
      AsyncStorage.setItem(STORAGE_KEYS.TOKEN, 'mock_token'),
    ]);
  }
  
  /**
   * Validate email format
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

// Export singleton instance
export const authService = new AuthService();
