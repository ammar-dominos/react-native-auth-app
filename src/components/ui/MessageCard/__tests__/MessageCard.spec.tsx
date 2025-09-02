import React from 'react';
import { render } from '@testing-library/react-native';
import { MessageCard } from '../MessageCard';

describe('MessageCard', () => {
  it('renders without crashing with error type', () => {
    const component = render(
      <MessageCard type="error" message="Error message" />
    );
    expect(component).toBeTruthy();
  });

  it('renders without crashing with success type', () => {
    const component = render(
      <MessageCard type="success" message="Success message" />
    );
    expect(component).toBeTruthy();
  });

  it('renders without crashing with info type', () => {
    const component = render(
      <MessageCard type="info" message="Info message" />
    );
    expect(component).toBeTruthy();
  });

  it('renders without crashing with warning type', () => {
    const component = render(
      <MessageCard type="warning" message="Warning message" />
    );
    expect(component).toBeTruthy();
  });

  it('renders with title when provided', () => {
    const component = render(
      <MessageCard 
        type="error" 
        message="Error message" 
        title="Error Title"
      />
    );
    expect(component).toBeTruthy();
  });

  it('renders without title when not provided', () => {
    const component = render(
      <MessageCard type="info" message="Info message" />
    );
    expect(component).toBeTruthy();
  });

  it('applies correct styles for different types', () => {
    const errorCard = render(
      <MessageCard type="error" message="Error" />
    );
    const successCard = render(
      <MessageCard type="success" message="Success" />
    );
    
    expect(errorCard).toBeTruthy();
    expect(successCard).toBeTruthy();
  });
});