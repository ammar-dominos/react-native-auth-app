import React, { useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Input } from '../Input';
import { Icon } from '../Icon';
import { passwordInputStyles as styles } from './PasswordInput.styles';

export interface PasswordInputProps {
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
      <Icon 
        name={isPasswordVisible ? 'eye-off' : 'eye'} 
        size={20} 
        color="#666" 
      />
    </TouchableOpacity>
  );

  return (
    <Input
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
