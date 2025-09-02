import { StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../../styles/theme';

export const signupScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing['2xl'],
  },
  logoContainer: {
    marginBottom: spacing.lg,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary[600],
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.lg,
  },
  logoText: {
    fontSize: 40,
    color: colors.text.inverse,
  },
  heading: {
    fontSize: 32,
    fontWeight: typography.fontWeights.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.fontSizes.lg,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  formCard: {
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    marginBottom: spacing.lg,
    ...shadows.md,
  },
  signupButton: {
    marginBottom: spacing.md,
  },
  termsText: {
    fontSize: typography.fontSizes.sm,
    color: colors.text.tertiary,
    textAlign: 'center',
    lineHeight: typography.lineHeights.normal * typography.fontSizes.sm,
    paddingHorizontal: spacing.md,
  },
  termsLink: {
    color: colors.primary[600],
    fontWeight: typography.fontWeights.medium,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  navigationText: {
    fontSize: typography.fontSizes.base,
    color: colors.text.secondary,
  },
  navigationLink: {
    fontSize: typography.fontSizes.base,
    color: colors.primary[600],
    fontWeight: typography.fontWeights.semibold,
  },
  navigationLinkDisabled: {
    color: colors.neutral[400],
  },
});
