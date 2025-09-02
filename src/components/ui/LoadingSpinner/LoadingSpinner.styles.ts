import { StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../../../styles/theme';

export const loadingSpinnerStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    borderWidth: 3,
    borderRadius: 999,
  },
  text: {
    marginTop: spacing.md,
    fontSize: typography.fontSizes.base,
    color: colors.text.secondary,
    fontWeight: typography.fontWeights.medium,
  },
});
