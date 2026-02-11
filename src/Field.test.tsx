import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Form from './Form';
import Field from './Field';
import { useForm } from './FormContext';

describe('Field Component', () => {
  it('should render input with initial value', () => {
    const TestForm = () => {
      const [form] = useForm();
      
      return (
        <Form form={form} initialValues={{ username: 'John' }}>
          <Field name="username">
            {(control) => <input data-testid="username-input" {...control} />}
          </Field>
        </Form>
      );
    };

    render(<TestForm />);
    const input = screen.getByTestId('username-input');
    expect(input).toHaveValue('John');
  });

  it('should update value on change', () => {
    const TestForm = () => {
      const [form] = useForm();
      
      return (
        <Form form={form}>
          <Field name="username">
            {(control) => <input data-testid="username-input" {...control} />}
          </Field>
          <button type="button" onClick={() => console.log(form.getFieldValue('username'))}>
            Log Value
          </button>
        </Form>
      );
    };

    render(<TestForm />);
    const input = screen.getByTestId('username-input');
    
    fireEvent.change(input, { target: { value: 'Jane' } });
    expect(input).toHaveValue('Jane');
  });

  it('should validate field on blur', () => {
    const TestForm = () => {
      const [form] = useForm();
      
      return (
        <Form form={form}>
          <Field
            name="email"
            rules={[{ required: true, message: 'Email is required' }]}
            validateTrigger="onBlur"
          >
            {(control) => <input data-testid="email-input" {...control} />}
          </Field>
        </Form>
      );
    };

    render(<TestForm />);
    const input = screen.getByTestId('email-input');
    
    fireEvent.blur(input);
    // TODO: Test error message rendering
  });

  it('should render children as function with control and meta', () => {
    const TestForm = () => {
      const [form] = useForm();
      
      return (
        <Form form={form}>
          <Field name="username">
            {(control, meta) => (
              <div>
                <input data-testid="username-input" {...control} />
                {meta.error && <span data-testid="error">{meta.error}</span>}
              </div>
            )}
          </Field>
        </Form>
      );
    };

    render(<TestForm />);
    const input = screen.getByTestId('username-input');
    expect(input).toBeInTheDocument();
  });
});
