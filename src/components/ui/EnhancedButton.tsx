import React, { useState } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../../styles/theme';

interface EnhancedButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'outline';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const EnhancedButton: React.FC<EnhancedButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  loading = false,
  leftIcon,
  rightIcon,
  disabled,
  style,
  ...props
}) => {
  const [scaleValue] = useState(new Animated.Value(1));

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
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
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

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.lg,
    ...shadows.md,
  },
  
  // Sizes
  small: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  medium: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  large: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
  },

  // Variants
  primary: {
    backgroundColor: colors.primary[600],
  },
  secondary: {
    backgroundColor: colors.secondary[600],
  },
  success: {
    backgroundColor: colors.success[600],
  },
  danger: {
    backgroundColor: colors.error[600],
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary[600],
  },
  disabled: {
    backgroundColor: colors.neutral[400],
    ...shadows.sm,
  },

  // Text styles
  text: {
    fontWeight: typography.fontWeights.semibold,
    color: colors.text.inverse,
    textAlign: 'center',
  },
  textSmall: {
    fontSize: typography.fontSizes.sm,
  },
  textMedium: {
    fontSize: typography.fontSizes.base,
  },
  textLarge: {
    fontSize: typography.fontSizes.lg,
  },
  textOutline: {
    color: colors.primary[600],
  },
});
