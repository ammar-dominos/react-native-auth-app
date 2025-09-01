import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { EnhancedInput } from './EnhancedInput';
import { colors, spacing } from '../../styles/theme';

interface PasswordInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  helperText?: string;
  placeholder?: string;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  value,
  onChangeText,
  error,
  helperText,
  placeholder = "Enter your password",
  ...props
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const EyeIcon = () => (
    <TouchableOpacity 
      onPress={togglePasswordVisibility} 
      style={styles.iconButton}
      activeOpacity={0.7}
    >
      <Text style={styles.iconText}>
        {isPasswordVisible ? '�' : '👁️'}
      </Text>
    </TouchableOpacity>
  );

  return (
    <EnhancedInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      error={error}
      helperText={helperText}
      placeholder={placeholder}
      secureTextEntry={!isPasswordVisible}
      rightIcon={<EyeIcon />}
      autoCapitalize="none"
      autoCorrect={false}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  iconButton: {
    padding: spacing.sm,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 32,
    minHeight: 32,
  },
  iconText: {
    fontSize: 20,
    color: colors.text.secondary,
    userSelect: 'none' as any,
  },
});
