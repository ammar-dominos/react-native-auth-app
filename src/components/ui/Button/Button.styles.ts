import { StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../../../styles/theme';

export const buttonStyles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.lg,
    ...shadows.md,
  },
  
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
