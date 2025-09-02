import { useState, useCallback } from 'react';
import { ValidationResult } from '../utils/validation';

export interface FormField {
  value: string;
  error?: string;
  touched: boolean;
}

export interface UseFormValidationOptions<T> {
  initialValues: T;
  validationSchema: {
    [K in keyof T]: (value: string) => ValidationResult;
  };
}

/**
 * Custom hook for form validation
 */
export const useFormValidation = <T extends Record<string, string>>(
  options: UseFormValidationOptions<T>
) => {
  const [fields, setFields] = useState<{ [K in keyof T]: FormField }>(() => {
    const initialFields = {} as { [K in keyof T]: FormField };
    for (const key in options.initialValues) {
      initialFields[key] = {
        value: options.initialValues[key],
        error: undefined,
        touched: false,
      };
    }
    return initialFields;
  });

  const setValue = useCallback((field: keyof T, value: string) => {
    setFields(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        value,
        touched: true,
        error: undefined,
      },
    }));
  }, []);

  const validateField = useCallback((field: keyof T) => {
    const validator = options.validationSchema[field];
    const result = validator(fields[field].value);
    
    setFields(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        error: result.isValid ? undefined : result.error,
      },
    }));

    return result.isValid;
  }, [fields, options.validationSchema]);

  const validateAll = useCallback(() => {
    let isValid = true;
    const newFields = { ...fields };

    for (const field in fields) {
      const validator = options.validationSchema[field];
      const result = validator(fields[field].value);
      
      newFields[field] = {
        ...newFields[field],
        touched: true,
        error: result.isValid ? undefined : result.error,
      };

      if (!result.isValid) {
        isValid = false;
      }
    }

    setFields(newFields);
    return isValid;
  }, [fields, options.validationSchema]);

  const getValues = useCallback(() => {
    const values = {} as T;
    for (const key in fields) {
      (values as any)[key] = fields[key].value;
    }
    return values;
  }, [fields]);

  const reset = useCallback(() => {
    const resetFields = {} as { [K in keyof T]: FormField };
    for (const key in options.initialValues) {
      resetFields[key] = {
        value: options.initialValues[key],
        error: undefined,
        touched: false,
      };
    }
    setFields(resetFields);
  }, [options.initialValues]);

  return {
    fields,
    setValue,
    validateField,
    validateAll,
    getValues,
    reset,
  };
};
