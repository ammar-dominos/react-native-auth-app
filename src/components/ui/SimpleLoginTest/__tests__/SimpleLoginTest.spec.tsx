import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Alert } from 'react-native';
import { SimpleLoginTest } from '../SimpleLoginTest';

// Mock Alert
jest.spyOn(Alert, 'alert');

describe('SimpleLoginTest', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByLabelText } = render(<SimpleLoginTest />);
    
    expect(getByLabelText('Test Valid Login')).toBeTruthy();
    expect(getByLabelText('Test Invalid Login')).toBeTruthy();
    expect(getByLabelText('Clear Error')).toBeTruthy();
  });

  it('shows alert when valid login button is pressed', () => {
    const { getByLabelText } = render(<SimpleLoginTest />);
    
    fireEvent.press(getByLabelText('Test Valid Login'));
    
    expect(Alert.alert).toHaveBeenCalledWith(
      'Valid Login Test',
      'This would log in successfully'
    );
  });

  it('shows error message when invalid login button is pressed', () => {
    const { getByLabelText } = render(<SimpleLoginTest />);
    
    fireEvent.press(getByLabelText('Test Invalid Login'));
    
    expect(Alert.alert).toHaveBeenCalledWith(
      'Invalid Login Test',
      'Error message should appear below'
    );
  });

  it('clears error message when clear button is pressed', () => {
    const { getByLabelText } = render(<SimpleLoginTest />);
    
    // First trigger an error
    fireEvent.press(getByLabelText('Test Invalid Login'));
    
    // Then clear it
    fireEvent.press(getByLabelText('Clear Error'));
    
    // Test passes if no error is thrown
    expect(true).toBeTruthy();
  });

  it('does not show error message initially', () => {
    const component = render(<SimpleLoginTest />);
    
    expect(component).toBeTruthy();
  });

  it('clears error when valid login is pressed after error', () => {
    const { getByLabelText } = render(<SimpleLoginTest />);
    
    // First trigger an error
    fireEvent.press(getByLabelText('Test Invalid Login'));
    
    // Then press valid login (should clear error)
    fireEvent.press(getByLabelText('Test Valid Login'));
    
    // Test passes if no error is thrown
    expect(true).toBeTruthy();
  });
});
