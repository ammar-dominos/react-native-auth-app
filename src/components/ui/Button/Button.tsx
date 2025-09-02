import React, { useState } from 'react';
import {
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { colors } from '../../../styles/theme';
import { buttonStyles as styles } from './Button.styles';

export interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'outline';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  loading = false,
  leftIcon,
  rightIcon,
  disabled,
  style,
  onPress,
  ...props
}) => {
  const [scaleValue] = useState(new Animated.Value(1));

  const handlePress = (event: any) => {
    if (disabled || loading) {
      return;
    }
    onPress?.(event);
  };

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const getButtonStyle = () => {
    const baseStyle = [styles.base, styles[size]];
    
    if (disabled || loading) {
      return [...baseStyle, styles.disabled];
    }

    switch (variant) {
      case 'primary':
        return [...baseStyle, styles.primary];
      case 'secondary':
        return [...baseStyle, styles.secondary];
      case 'success':
        return [...baseStyle, styles.success];
      case 'danger':
        return [...baseStyle, styles.danger];
      case 'outline':
        return [...baseStyle, styles.outline];
      default:
        return [...baseStyle, styles.primary];
    }
  };

  const getTextStyle = () => {
    const baseTextStyle = [styles.text, styles[`text${size.charAt(0).toUpperCase() + size.slice(1)}` as keyof typeof styles]];
    
    if (variant === 'outline') {
      return [...baseTextStyle, styles.textOutline];
    }
    
    return baseTextStyle;
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      <TouchableOpacity
        style={[getButtonStyle(), style]}
        disabled={disabled || loading}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        accessibilityRole="button"
        accessibilityLabel={title}
        {...props}
      >
        {loading ? (
          <ActivityIndicator 
            color={variant === 'outline' ? colors.primary[600] : colors.text.inverse} 
            size="small" 
          />
        ) : (
          <>
            {leftIcon}
            <Text style={getTextStyle()}>{title}</Text>
            {rightIcon}
          </>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};
