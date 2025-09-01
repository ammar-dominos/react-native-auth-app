import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../../styles/theme';

interface MessageCardProps {
  type: 'error' | 'success' | 'info' | 'warning';
  message: string;
  title?: string;
}

export const MessageCard: React.FC<MessageCardProps> = ({ type, message, title }) => {
  const getContainerStyle = () => {
    switch (type) {
      case 'error':
        return [styles.container, styles.errorContainer];
      case 'success':
        return [styles.container, styles.successContainer];
      case 'info':
        return [styles.container, styles.infoContainer];
      case 'warning':
        return [styles.container, styles.warningContainer];
      default:
        return [styles.container, styles.infoContainer];
    }
  };

  const getTextStyle = () => {
    switch (type) {
      case 'error':
        return styles.errorText;
      case 'success':
        return styles.successText;
      case 'info':
        return styles.infoText;
      case 'warning':
        return styles.warningText;
      default:
        return styles.infoText;
    }
  };

  const getTitleStyle = () => {
    switch (type) {
      case 'error':
        return styles.errorTitle;
      case 'success':
        return styles.successTitle;
      case 'info':
        return styles.infoTitle;
      case 'warning':
        return styles.warningTitle;
      default:
        return styles.infoTitle;
    }
  };

  return (
    <View style={getContainerStyle()}>
      {title && <Text style={getTitleStyle()}>{title}</Text>}
      <Text style={getTextStyle()}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
