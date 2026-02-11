import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Form from './Form';
import FormItem from './FormItem';
import { useForm } from './FormContext';

describe('Basic Form Functionality', () => {
  it('should handle basic form operations', () => {
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
          <button 
            type="button" 
            data-testid="get-value-btn" 
            onClick={() => console.log(form.getFieldValue('username'))}
          >
            Get Value
          </button>
        </Form>
      );
    };

    render(<TestForm />);
    
    const input = screen.getByTestId('username-input');
    const resetBtn = screen.getByTestId('reset-btn');
    const getValueBtn = screen.getByTestId('get-value-btn');
    
    // 初始值应该正确显示
    expect(input).toHaveValue('John');
    
    // 修改值
    fireEvent.change(input, { target: { value: 'Jane' } });
    expect(input).toHaveValue('Jane');
    
    // 重置表单
    fireEvent.click(resetBtn);
    expect(input).toHaveValue('John');
  });

  it('should handle form validation', async () => {
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
            name="email" 
            label="Email"
            rules={[{ required: true, message: 'Email is required' }]}
          >
            <input data-testid="email-input" />
          </FormItem>
          <button type="submit" data-testid="submit-btn">Submit</button>
        </Form>
      );
    };

    render(<TestForm />);
    
    const submitBtn = screen.getByTestId('submit-btn');
    
    // 提交空表单（应该失败）
    fireEvent.click(submitBtn);
    
    // 等待异步验证完成
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // 验证失败时 onFinish 不应该被调用
    expect(onFinish).not.toHaveBeenCalled();
    
    // 填写有效值并再次提交
    const emailInput = screen.getByTestId('email-input');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitBtn);
    
    // 等待异步验证完成
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // 验证成功时 onFinish 应该被调用
    expect(onFinish).toHaveBeenCalledWith({ email: 'test@example.com' });
  });
});