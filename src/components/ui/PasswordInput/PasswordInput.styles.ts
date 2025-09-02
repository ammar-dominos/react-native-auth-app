import { StyleSheet } from 'react-native';
import { colors, spacing } from '../../../styles/theme';

export const passwordInputStyles = StyleSheet.create({
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
