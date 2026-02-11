import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Form from './Form';
import FormItem from './FormItem';
import { useForm } from './FormContext';

describe('Form Component', () => {
  it('should submit form with valid values', async () => {
    const onFinish = jest.fn();
    
    const TestForm = () => {
      const [form] = useForm();
      
      return (
        <Form form={form} onFinish={onFinish}>
          <FormItem
            name="username"
            label="Username"
            rules={[{ required: true, message: 'Username is required' }]}
          >
            <input data-testid="username-input" />
          </FormItem>
          <button type="submit" data-testid="submit-btn">Submit</button>
        </Form>
      );
    };

    render(<TestForm />);
    
    const usernameInput = screen.getByTestId('username-input');
    const submitBtn = screen.getByTestId('submit-btn');
    
    fireEvent.change(usernameInput, { target: { value: 'John' } });
    fireEvent.click(submitBtn);
    
    await waitFor(() => {
      expect(onFinish).toHaveBeenCalledWith({ username: 'John' });
    });
  });

  it('should fail form submission with invalid values', async () => {
    const onFinish = jest.fn();
    const onFinishFailed = jest.fn();
    
    const TestForm = () => {
      const [form] = useForm();
      
      return (
        <Form
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <FormItem
            name="username"
            label="Username"
            rules={[{ required: true, message: 'Username is required' }]}
          >
            <input data-testid="username-input" />
          </FormItem>
          <button type="submit" data-testid="submit-btn">Submit</button>
        </Form>
      );
    };

    render(<TestForm />);
    
    const submitBtn = screen.getByTestId('submit-btn');
    fireEvent.click(submitBtn);
    
    // 等待异步验证完成
    await new Promise(resolve => setTimeout(resolve, 100));
    
    expect(onFinish).not.toHaveBeenCalled();
    expect(onFinishFailed).toHaveBeenCalled();
  });

  it('should call onValuesChange when values change', () => {
    const onValuesChange = jest.fn();
    
    const TestForm = () => {
      const [form] = useForm();
      
      return (
        <Form form={form} onValuesChange={onValuesChange}>
          <FormItem name="username" label="Username">
            <input data-testid="username-input" />
          </FormItem>
        </Form>
      );
    };

    render(<TestForm />);
    
    const usernameInput = screen.getByTestId('username-input');
    fireEvent.change(usernameInput, { target: { value: 'John' } });
    
    expect(onValuesChange).toHaveBeenCalledWith({ username: 'John' }, { username: 'John' });
  });

  it('should reset form fields', () => {
    const TestForm = () => {
      const [form] = useForm();
      
      return (
        <Form form={form} initialValues={{ username: 'John' }}>
          <FormItem name="username" label="Username">
            <input data-testid="username-input" />
          </FormItem>
          <button
            type="button"
            data-testid="reset-btn"
            onClick={() => form.resetFields()}
          >
            Reset
          </button>
        </Form>
      );
    };

    render(<TestForm />);
    
    const usernameInput = screen.getByTestId('username-input');
    const resetBtn = screen.getByTestId('reset-btn');
    
    fireEvent.change(usernameInput, { target: { value: 'Jane' } });
    expect(usernameInput).toHaveValue('Jane');
    
    fireEvent.click(resetBtn);
    expect(usernameInput).toHaveValue('John');
  });
});
