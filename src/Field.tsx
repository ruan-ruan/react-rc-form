import { useEffect, useState, useRef, useMemo } from 'react';
import { FieldProps, FieldState, NamePath } from './types';
import { useFormContext, InternalFormInstance } from './FormContext';
import { normalizeNamePath } from './utils/path';
import { validateRules } from './utils/validate';

const Field = (props: FieldProps) => {
  const { name, children, rules, trigger = 'onChange', validateTrigger = trigger, shouldUpdate, dependencies } = props;
  const form = useFormContext() as InternalFormInstance;
  const normalizedName = normalizeNamePath(name).join('.');
  
  // 在初始化时直接获取表单的初始值
  const initialValue = form.getFieldValue(name);
  
  const [state, setState] = useState<FieldState>({
    value: initialValue,
    touched: false,
    error: undefined,
    validating: false,
  });
  
  const mountedRef = useRef(true);
  const prevValuesRef = useRef(form.getFieldsValue());
  
  useEffect(() => {
    if (!mountedRef.current) return;
    
    form.registerField(normalizedName, { ...state, rules });
    
    return () => {
      if (mountedRef.current) {
        form.unregisterField(normalizedName);
      }
    };
  }, [normalizedName, state, rules]);
  
  useEffect(() => {
    if (!mountedRef.current) return;
    
    const formValue = form.getFieldValue(name);
    if (formValue !== state.value) {
      setState((prev) => ({ ...prev, value: formValue }));
    }
  }, [form, name]);
  
  const handleTrigger = (event: any) => {
    const newValue = event?.target?.value ?? event;
    
    setState((prev) => ({ ...prev, value: newValue, touched: true }));
    form.setFieldValue(name, newValue);
    form.setFieldTouched(name, true);
    
    if (validateTrigger) {
      const triggers = Array.isArray(validateTrigger) ? validateTrigger : [validateTrigger];
      if (triggers.includes(trigger)) {
        validateField(newValue);
      }
    }
  };
  
  const validateField = async (value: any = state.value) => {
    if (!rules || rules.length === 0) {
      setState((prev) => ({ ...prev, error: undefined, validating: false }));
      return;
    }
    
    setState((prev) => ({ ...prev, validating: true }));
    
    try {
      const errors = await validateRules(value, rules, normalizedName);
      const error = errors.length > 0 ? errors[0] : undefined;
      
      if (mountedRef.current) {
        setState((prev) => ({ ...prev, error, validating: false }));
        form.setFieldError(name, errors);
      }
    } catch (error) {
      if (mountedRef.current) {
        setState((prev) => ({ ...prev, validating: false }));
      }
    }
  };
  
  const control = {
    [trigger]: handleTrigger,
    value: state.value,
  };
  
  const meta = {
    value: state.value,
    touched: state.touched,
    error: state.error,
    validating: state.validating,
  };
  
  const shouldRender = useMemo(() => {
    if (shouldUpdate === true) {
      return true;
    }
    
    if (typeof shouldUpdate === 'function') {
      const prevValues = prevValuesRef.current;
      const currentValues = form.getFieldsValue();
      const result = shouldUpdate(prevValues, currentValues);
      prevValuesRef.current = currentValues;
      return result;
    }
    
    if (dependencies && dependencies.length > 0) {
      const currentValues = form.getFieldsValue();
      const prevValues = prevValuesRef.current;
      
      const hasChanged = dependencies.some((dep) => {
        const depValue = form.getFieldValue(dep);
        const prevDepValue = getValueByPath(prevValues, dep);
        return depValue !== prevDepValue;
      });
      
      prevValuesRef.current = currentValues;
      return hasChanged;
    }
    
    return true;
  }, [shouldUpdate, dependencies, form]);
  
  useEffect(() => {
    if (!mountedRef.current) return;
    
    const formValue = form.getFieldValue(name);
    if (formValue !== state.value) {
      setState((prev) => ({ ...prev, value: formValue }));
    }
  }, [form, name, state.value]);
  
  if (!shouldRender) {
    return null;
  }
  
  if (typeof children === 'function') {
    return children(control, meta);
  }
  return children;
};

function getValueByPath(obj: any, path: NamePath): any {
  const normalizedPath = normalizeNamePath(path);
  
  if (!obj || normalizedPath.length === 0) {
    return obj;
  }

  let result = obj;
  for (let i = 0; i < normalizedPath.length; i++) {
    const key = normalizedPath[i];
    if (result == null) {
      return undefined;
    }
    result = result[key];
  }
  
  return result;
}

Field.displayName = 'Field';

export default Field;
