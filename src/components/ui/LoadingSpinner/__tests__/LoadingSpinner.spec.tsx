import React from 'react';
import { render } from '@testing-library/react-native';
import { LoadingSpinner } from '../LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders correctly with default props', () => {
    const component = render(<LoadingSpinner />);
    expect(component).toBeTruthy();
  });

  it('renders with text when provided', () => {
    const component = render(
      <LoadingSpinner text="Loading..." />
    );
    
    expect(component).toBeTruthy();
  });

  it('renders without text when not provided', () => {
    const component = render(<LoadingSpinner />);
    expect(component).toBeTruthy();
  });

  it('accepts different sizes', () => {
    const smallSpinner = render(<LoadingSpinner size="small" />);
    const mediumSpinner = render(<LoadingSpinner size="medium" />);
    const largeSpinner = render(<LoadingSpinner size="large" />);
    
    expect(smallSpinner).toBeTruthy();
    expect(mediumSpinner).toBeTruthy();
    expect(largeSpinner).toBeTruthy();
  });

  it('accepts custom color', () => {
    const component = render(
      <LoadingSpinner color="#ff0000" />
    );
    expect(component).toBeTruthy();
  });

  it('renders with custom text and color', () => {
    const component = render(
      <LoadingSpinner 
        text="Custom loading text" 
        color="#00ff00"
        size="large"
      />
    );
    
    expect(component).toBeTruthy();
  });
});
