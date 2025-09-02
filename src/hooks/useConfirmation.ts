import { useCallback } from 'react';
import { showConfirmationAlert } from '../utils/alerts';

export interface UseConfirmationOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

/**
 * Custom hook for handling confirmation dialogs
 */
export const useConfirmation = () => {
  const confirm = useCallback((
    options: UseConfirmationOptions,
    onConfirm: () => void,
    onCancel?: () => void
  ) => {
    showConfirmationAlert(
      options.title,
      options.message,
      onConfirm,
      onCancel
    );
  }, []);

  return { confirm };
};
