import React from 'react';
import { FieldProps } from './types';
import Field from './Field';

export interface FormItemProps extends Omit<FieldProps, 'children'> {
  label?: React.ReactNode;
  extra?: React.ReactNode;
  help?: React.ReactNode;
  required?: boolean;
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode | ((control: any, meta: any) => React.ReactNode);
}

const FormItem = (props: FormItemProps) => {
  const { name, label, extra, help, required, style, className, children, ...restProps } = props;
  
  return (
    <Field name={name} {...restProps}>
      {(control, meta) => {
        const { error } = meta;
        
        return (
          <div style={style} className={className}>
            {label && (
              <label style={{ display: 'block', marginBottom: 8 }}>
                {required && <span style={{ color: '#ff4d4f', marginRight: 4 }}>*</span>}
                {label}
              </label>
            )}
            {typeof children === 'function' ? children(control, meta) : React.cloneElement(children as React.ReactElement, control)}
            {(error || help || extra) && (
              <div style={{ marginTop: 4 }}>
                {error && <div style={{ color: '#ff4d4f', fontSize: 12 }}>{error}</div>}
                {help && <div style={{ fontSize: 12 }}>{help}</div>}
                {extra && <div style={{ fontSize: 12, color: '#888' }}>{extra}</div>}
              </div>
            )}
          </div>
        );
      }}
    </Field>
  );
};

FormItem.displayName = 'FormItem';

export default FormItem;
