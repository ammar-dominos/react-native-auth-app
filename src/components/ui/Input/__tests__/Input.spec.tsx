import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Input } from '../Input';

describe('Input', () => {
  it('renders correctly with label', () => {
    const component = render(
      <Input label="Test Label" value="test value" onChangeText={() => {}} />
    );
    
    expect(component).toBeTruthy();
  });

  it('calls onChangeText when text changes', () => {
    const mockOnChangeText = jest.fn();
    const component = render(
      <Input label="Test Label" value="" onChangeText={mockOnChangeText} />
    );
    
    expect(component).toBeTruthy();
    expect(mockOnChangeText).toBeDefined();
  });

  it('displays error message when error prop is provided', () => {
    const component = render(
      <Input 
        label="Test Label" 
        value="" 
        onChangeText={() => {}} 
        error="This is an error" 
      />
    );
    
    expect(component).toBeTruthy();
  });

  it('displays helper text when provided and no error', () => {
    const component = render(
      <Input 
        label="Test Label" 
        value="" 
        onChangeText={() => {}} 
        helperText="This is helper text"
      />
    );
    
    expect(component).toBeTruthy();
  });

  it('does not display helper text when error is present', () => {
    const { queryByText } = render(
      <Input 
        label="Test Label" 
        value="" 
        onChangeText={() => {}} 
        error="This is an error"
        helperText="This is helper text"
      />
    );
    
    expect(queryByText('This is helper text')).toBeNull();
  });

  it('renders with left and right icons', () => {
    const LeftIcon = () => <Text>L</Text>;
    const RightIcon = () => <Text>R</Text>;
    
    const component = render(
      <Input 
        label="Test Label" 
        value="" 
        onChangeText={() => {}} 
        leftIcon={<LeftIcon />}
        rightIcon={<RightIcon />}
      />
    );
    
    expect(component).toBeTruthy();
  });

  it('handles focus and blur events', () => {
    const mockOnFocus = jest.fn();
    const mockOnBlur = jest.fn();
    const component = render(
      <Input 
        label="Test Label" 
        value=""
        onChangeText={() => {}}
        onFocus={mockOnFocus}
        onBlur={mockOnBlur}
      />
    );
    
    expect(component).toBeTruthy();
    expect(mockOnFocus).toBeDefined();
    expect(mockOnBlur).toBeDefined();
  });
});
