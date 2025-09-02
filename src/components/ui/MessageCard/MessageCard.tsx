import React from 'react';
import { View, Text } from 'react-native';
import { messageCardStyles as styles } from './MessageCard.styles';

export interface MessageCardProps {
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
