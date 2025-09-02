import React from 'react';
import { render } from '@testing-library/react-native';
import { PasswordInput } from '../PasswordInput';

describe('PasswordInput', () => {
  it('renders correctly', () => {
    const rendered = render(
      <PasswordInput 
        label="Password"
        placeholder="Enter password" 
        value=""
        onChangeText={() => {}}
      />
    );
    expect(rendered).toBeTruthy();
  });

  it('renders with custom props', () => {
    const rendered = render(
      <PasswordInput 
        label="Password"
        placeholder="Enter your password"
        value=""
        onChangeText={() => {}}
        error="Password required"
        helperText="Enter at least 8 characters"
      />
    );
    expect(rendered).toBeTruthy();
  });
});