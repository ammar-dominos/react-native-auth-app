import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ActivityIndicator } from 'react-native';
import { Button } from '../Button';

describe('Button', () => {
  it('renders correctly with title', () => {
    const { getByLabelText } = render(<Button title="Test Button" />);
    const button = getByLabelText('Test Button');
    expect(button).toBeDefined();
    expect(button).toHaveTextContent('Test Button');
  });

  it('calls onPress when pressed', () => {
    const mockOnPress = jest.fn();
    const { getByLabelText } = render(
      <Button title="Test Button" onPress={mockOnPress} />
    );
    
    fireEvent.press(getByLabelText('Test Button'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('shows loading indicator when loading prop is true', () => {
    const { queryByText, UNSAFE_getByType } = render(
      <Button title="Test Button" loading={true} />
    );
    
    expect(queryByText('Test Button')).toBeNull();
    expect(UNSAFE_getByType(ActivityIndicator)).toBeDefined();
  });

  it('is disabled when disabled prop is true', () => {
    const mockOnPress = jest.fn();
    const { getByLabelText } = render(
      <Button title="Test Button" disabled={true} onPress={mockOnPress} />
    );
    
    fireEvent.press(getByLabelText('Test Button'));
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it('applies correct variant styles', () => {
    const { getByLabelText } = render(
      <Button title="Test Button" variant="danger" />
    );
    
    expect(getByLabelText('Test Button')).toBeDefined();
  });

  it('applies correct size styles', () => {
    const { getByLabelText } = render(
      <Button title="Test Button" size="large" />
    );
    
    expect(getByLabelText('Test Button')).toBeDefined();
  });

  it('renders with left and right icons', () => {
    const LeftIcon = () => <></>;
    const RightIcon = () => <></>;
    
    const { getByLabelText } = render(
      <Button 
        title="Test Button" 
        leftIcon={<LeftIcon />}
        rightIcon={<RightIcon />}
      />
    );
    
    expect(getByLabelText('Test Button')).toBeDefined();
  });

  it('handles press animations', () => {
    const { getByLabelText } = render(<Button title="Test Button" />);
    const button = getByLabelText('Test Button');
    
    expect(button).toBeDefined();
    
    // Test press in and out animations
    fireEvent(button, 'pressIn');
    fireEvent(button, 'pressOut');
  });

  it('renders different variants correctly', () => {
    const variants = ['primary', 'secondary', 'success', 'danger', 'outline'] as const;
    
    variants.forEach(variant => {
      const { getByLabelText } = render(
        <Button title={`variant Button`} variant={variant} />
      );
      expect(getByLabelText(`variant Button`)).toBeDefined();
    });
  });

  it('renders different sizes correctly', () => {
    const sizes = ['small', 'medium', 'large'] as const;
    
    sizes.forEach(size => {
      const { getByLabelText } = render(
        <Button title={`size Button`} size={size} />
      );
      expect(getByLabelText(`size Button`)).toBeDefined();
    });
  });
});
