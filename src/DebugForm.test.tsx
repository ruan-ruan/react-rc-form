import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Form from './Form';
import FormItem from './FormItem';
import { useForm } from './FormContext';

describe('Debug Form', () => {
  it('should debug form behavior', () => {
    const TestForm = () => {
      const [form] = useForm();
      
      const handleGetValue = () => {
        const value = form.getFieldValue('username');
        console.log('Form value:', value);
      };
      
      return (
        <Form form={form} initialValues={{ username: 'John' }}>
          <FormItem name="username" label="Username">
            {(control, meta) => {
              console.log('Field control:', control);
              console.log('Field meta:', meta);
              return <input data-testid="username-input" {...control} />;
            }}
          </FormItem>
          <button 
            type="button" 
            data-testid="get-value-btn" 
            onClick={handleGetValue}
          >
            Get Value
          </button>
        </Form>
      );
    };

    render(<TestForm />);
    
    const input = screen.getByTestId('username-input');
    const getValueBtn = screen.getByTestId('get-value-btn');
    
    console.log('Input value:', input.value);
    
    // 检查输入框的值
    expect(input.value).toBe('John');
    
    // 获取表单值
    fireEvent.click(getValueBtn);
  });
});