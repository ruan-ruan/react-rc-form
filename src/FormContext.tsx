import { createContext, useContext, useRef } from 'react';
import { FormInstance, NamePath, FieldState } from './types';
import { getValueByPath, setValueByPath, normalizeNamePath } from './utils/path';
import { validateRules } from './utils/validate';

const FormContext = createContext<FormInstance | null>(null);

export const useForm = <T = any>(): [FormInstance<T>] => {
  const formRef = useRef<FormInstance<T>>();
  
  if (!formRef.current) {
    const form = createForm<T>();
    formRef.current = form;
  }
  
  return [formRef.current];
};

function createForm<T = any>(initialValues?: T): FormInstance<T> {
  let values = initialValues ? JSON.parse(JSON.stringify(initialValues)) : {};
  let errors: Record<string, string[]> = {};
  let touched: Record<string, boolean> = {};
  let fieldEntities: Map<string, FieldState> = new Map();
  let callbacks: {
    onValuesChange?: (changedValues: Partial<T>, allValues: T) => void;
    onFinish?: (values: T) => void;
    onFinishFailed?: (errorInfo: any) => void;
  } = {};

  const getFieldValue = (name: NamePath): any => {
    return getValueByPath(values, name);
  };

  const getFieldsValue = (nameList?: NamePath[]): T => {
    if (!nameList || nameList.length === 0) {
      return JSON.parse(JSON.stringify(values));
    }
    
    const result: any = {};
    nameList.forEach((name) => {
      const normalizedName = normalizeNamePath(name).join('.');
      result[normalizedName] = getValueByPath(values, name);
    });
    
    return result;
  };

  const setFieldValue = (name: NamePath, value: any): void => {
    const normalizedName = normalizeNamePath(name).join('.');
    
    values = setValueByPath(values, name, value);
    
    const changedValues: any = setValueByPath({}, name, value);
    
    if (callbacks.onValuesChange) {
      callbacks.onValuesChange(changedValues, values);
    }
    
    updateFieldState(normalizedName, { value });
  };

  const setFieldsValue = (fields: Partial<T>): void => {
    Object.keys(fields).forEach((key) => {
      values = setValueByPath(values, key, (fields as any)[key]);
    });
    
    if (callbacks.onValuesChange) {
      callbacks.onValuesChange(fields, values);
    }
  };

  const getFieldError = (name: NamePath): string | string[] => {
    const normalizedName = normalizeNamePath(name).join('.');
    return errors[normalizedName] || [];
  };

  const getFieldsError = (nameList?: NamePath[]): { name: NamePath; errors: string[] }[] => {
    if (!nameList || nameList.length === 0) {
      return Object.keys(errors).map((key) => ({
        name: key.split('.'),
        errors: errors[key],
      }));
    }
    
    return nameList.map((name) => ({
      name,
      errors: getFieldError(name) as string[],
    }));
  };

  const setFieldError = (name: NamePath, error: string | string[]): void => {
    const normalizedName = normalizeNamePath(name).join('.');
    errors[normalizedName] = Array.isArray(error) ? error : [error];
    updateFieldState(normalizedName, { error: errors[normalizedName][0] });
  };

  const setFieldsError = (fields: { name: NamePath; errors: string[] }[]): void => {
    fields.forEach(({ name, errors: fieldErrors }) => {
      const normalizedName = normalizeNamePath(name).join('.');
      errors[normalizedName] = fieldErrors;
      updateFieldState(normalizedName, { error: fieldErrors[0] });
    });
  };

  const getFieldTouched = (name: NamePath): boolean => {
    const normalizedName = normalizeNamePath(name).join('.');
    return touched[normalizedName] || false;
  };

  const getFieldsTouched = (nameList?: NamePath[]): { [key: string]: boolean } => {
    if (!nameList || nameList.length === 0) {
      return { ...touched };
    }
    
    const result: { [key: string]: boolean } = {};
    nameList.forEach((name) => {
      const normalizedName = normalizeNamePath(name).join('.');
      result[normalizedName] = touched[normalizedName] || false;
    });
    
    return result;
  };

  const setFieldTouched = (name: NamePath, isTouched: boolean): void => {
    const normalizedName = normalizeNamePath(name).join('.');
    touched[normalizedName] = isTouched;
    updateFieldState(normalizedName, { touched: isTouched });
  };

  const resetFields = (nameList?: NamePath[]): void => {
    if (!nameList || nameList.length === 0) {
      values = initialValues ? JSON.parse(JSON.stringify(initialValues)) : {};
      errors = {};
      touched = {};
      
      // 重置所有字段状态
      fieldEntities.forEach((field, name) => {
        const initialValue = getValueByPath(initialValues, name);
        updateFieldState(name, { 
          value: initialValue, 
          error: undefined, 
          touched: false 
        });
      });
    } else {
      nameList.forEach((name) => {
        const normalizedName = normalizeNamePath(name).join('.');
        const initialValue = getValueByPath(initialValues, name);
        values = setValueByPath(values, name, initialValue);
        delete errors[normalizedName];
        delete touched[normalizedName];
        
        // Update field state with reset value
        updateFieldState(normalizedName, { 
          value: initialValue, 
          error: undefined, 
          touched: false 
        });
      });
    }
  };

  const validateFields = async (nameList?: NamePath[]): Promise<T> => {
    const fieldNames = nameList || Object.keys(fieldEntities);
    const allErrors: { name: NamePath; errors: string[] }[] = [];
    
    for (const name of fieldNames) {
      const normalizedName = normalizeNamePath(name).join('.');
      const field = fieldEntities.get(normalizedName);
      
      if (field && field.rules) {
        try {
          const fieldErrors = await validateRules(field.value, field.rules, normalizedName);
          if (fieldErrors.length > 0) {
            allErrors.push({ name, errors: fieldErrors });
            setFieldError(name, fieldErrors);
          } else {
            delete errors[normalizedName];
            updateFieldState(normalizedName, { error: undefined });
          }
        } catch (error) {
          console.error('Validation error:', error);
        }
      }
    }
    
    if (allErrors.length > 0) {
      const errorInfo = {
        values,
        errorFields: allErrors,
        outOfDate: false,
      };
      throw errorInfo;
    }
    
    return values;
  };

  const submit = (): void => {
    validateFields()
      .then((validatedValues) => {
        if (callbacks.onFinish) {
          callbacks.onFinish(validatedValues);
        }
      })
      .catch((error) => {
        if (callbacks.onFinishFailed) {
          callbacks.onFinishFailed({
            values: getFieldsValue(),
            errorFields: error.errorFields || [],
            outOfDate: false,
          });
        }
      });
  };

  const updateFieldState = (name: string, updates: Partial<FieldState>): void => {
    const field = fieldEntities.get(name);
    if (field) {
      fieldEntities.set(name, { ...field, ...updates });
    }
  };

  const registerField = (name: string, field: FieldState): void => {
    fieldEntities.set(name, field);
  };

  const unregisterField = (name: string): void => {
    fieldEntities.delete(name);
  };

  const setCallbacks = (newCallbacks: typeof callbacks): void => {
    callbacks = { ...callbacks, ...newCallbacks };
  };

  const formInstance: FormInstance = {
    getFieldValue,
    getFieldsValue,
    setFieldValue,
    setFieldsValue,
    getFieldError,
    getFieldsError,
    setFieldError,
    setFieldsError,
    getFieldTouched,
    getFieldsTouched,
    setFieldTouched,
    resetFields,
    validateFields,
    submit,
  };
  
  const internalFormInstance: InternalFormInstance = {
    ...formInstance,
    registerField,
    unregisterField,
    setCallbacks,
  };
  
  return internalFormInstance;
}

export interface InternalFormInstance extends FormInstance {
  registerField: (name: string, field: FieldState) => void;
  unregisterField: (name: string) => void;
  setCallbacks: (callbacks: any) => void;
  getFieldValue: (name: NamePath) => any;
  setFieldValue: (name: NamePath, value: any) => void;
  getFieldsValue: (nameList?: NamePath[]) => any;
}

export const FormProvider = FormContext.Provider;

export const useFormContext = (): FormInstance => {
  const formInstance = useContext(FormContext);
  if (!formInstance) {
    throw new Error('FormInstance is not available. Make sure you are using Field inside Form.');
  }
  return formInstance;
};
