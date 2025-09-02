import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../../styles/theme';

export const simpleLoginTestStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
    backgroundColor: colors.background.primary,
  },
  title: {
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.bold,
    color: colors.text.primary,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  errorContainer: {
    backgroundColor: colors.error[50],
    borderColor: colors.error[200],
    borderWidth: 1,
    borderRadius: 6,
    padding: spacing.sm,
    marginBottom: spacing.md,
  },
  errorText: {
    color: colors.error[700],
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.medium,
  },
  button: {
    padding: spacing.md,
    borderRadius: 6,
    marginVertical: spacing.xs,
    alignItems: 'center',
  },
  successButton: {
    backgroundColor: colors.success[500],
  },
  errorButton: {
    backgroundColor: colors.error[500],
  },
  clearButton: {
    backgroundColor: colors.text.tertiary,
  },
  buttonText: {
    color: colors.text.inverse,
    fontWeight: typography.fontWeights.semibold,
    fontSize: typography.fontSizes.sm,
  },
});
