import { Alert } from 'react-native';

export interface AlertButton {
  text: string;
  style?: 'default' | 'cancel' | 'destructive';
  onPress?: () => void;
}

/**
 * Show a confirmation alert with custom buttons
 */
export const showConfirmationAlert = (
  title: string,
  message: string,
  onConfirm: () => void,
  onCancel?: () => void
): void => {
  Alert.alert(
    title,
    message,
    [
      {
        text: 'Cancel',
        style: 'cancel',
        onPress: onCancel,
      },
      {
        text: 'Confirm',
        style: 'destructive',
        onPress: onConfirm,
      },
    ]
  );
};

/**
 * Show a simple error alert
 */
export const showErrorAlert = (
  title: string = 'Error',
  message: string,
  onDismiss?: () => void
): void => {
  Alert.alert(
    title,
    message,
    [
      {
        text: 'OK',
        onPress: onDismiss,
      },
    ]
  );
};

/**
 * Show a success alert
 */
export const showSuccessAlert = (
  title: string = 'Success',
  message: string,
  onDismiss?: () => void
): void => {
  Alert.alert(
    title,
    message,
    [
      {
        text: 'OK',
        onPress: onDismiss,
      },
    ]
  );
};

/**
 * Show a custom alert with multiple buttons
 */
export const showCustomAlert = (
  title: string,
  message: string,
  buttons: AlertButton[]
): void => {
  Alert.alert(title, message, buttons);
};
