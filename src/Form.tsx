import React, { useImperativeHandle, forwardRef, useEffect, useMemo } from 'react';
import { FormProps, FormInstance } from './types';
import { useForm, FormProvider, InternalFormInstance } from './FormContext';

export interface FormRef extends FormInstance {}

const Form = forwardRef<FormRef, FormProps>((props, ref) => {
  const { form: externalForm, initialValues, onFinish, onFinishFailed, onValuesChange, children } = props;
  
  const [internalForm] = useForm<any>();
  const form = externalForm || internalForm;
  
  useEffect(() => {
    (form as InternalFormInstance).setCallbacks({
      onFinish,
      onFinishFailed,
      onValuesChange,
    });
  }, [form, onFinish, onFinishFailed, onValuesChange]);
  
  useEffect(() => {
    if (initialValues && !externalForm) {
      form.setFieldsValue(initialValues);
    }
  }, [form, initialValues, externalForm]);
  
  useImperativeHandle(ref, () => form as FormInstance);
  
  const formContextValue = useMemo(() => form, [form]);
  
  return (
    <FormProvider value={formContextValue}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.submit();
        }}
      >
        {children}
      </form>
    </FormProvider>
  );
});

Form.displayName = 'Form';

export default Form;
