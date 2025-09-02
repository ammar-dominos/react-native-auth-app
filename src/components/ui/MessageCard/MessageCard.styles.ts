import { StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../../../styles/theme';

export const messageCardStyles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
  },
  
  // Error styles
  errorContainer: {
    backgroundColor: colors.error[50],
    borderColor: colors.error[200],
  },
  errorTitle: {
    color: colors.error[800],
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.semibold,
    marginBottom: spacing.xs,
  },
  errorText: {
    color: colors.error[700],
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.medium,
    textAlign: 'center',
  },

  // Success styles
  successContainer: {
    backgroundColor: colors.success[50],
    borderColor: colors.success[200],
  },
  successTitle: {
    color: colors.success[800],
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.semibold,
    marginBottom: spacing.xs,
  },
  successText: {
    color: colors.success[700],
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.medium,
    textAlign: 'center',
  },

  // Info styles
  infoContainer: {
    backgroundColor: colors.primary[50],
    borderColor: colors.primary[200],
  },
  infoTitle: {
    color: colors.primary[800],
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.semibold,
    marginBottom: spacing.xs,
  },
  infoText: {
    color: colors.primary[700],
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.medium,
    textAlign: 'center',
  },

  // Warning styles
  warningContainer: {
    backgroundColor: colors.warning[50],
    borderColor: colors.warning[200],
  },
  warningTitle: {
    color: colors.warning[800],
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.semibold,
    marginBottom: spacing.xs,
  },
  warningText: {
    color: colors.warning[700],
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.medium,
    textAlign: 'center',
  },
});
