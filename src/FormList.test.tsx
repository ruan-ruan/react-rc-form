import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Form from './Form';
import FormList from './FormList';
import FormItem from './FormItem';
import { useForm } from './FormContext';

describe('FormList Component', () => {
  it('should render initial form list fields', () => {
    const TestForm = () => {
      const [form] = useForm();
      
      return (
        <Form form={form} initialValues={{ contacts: [{ type: 'email', value: 'john@example.com' }] }}>
          <FormList name="contacts">
            {(fields, { add, remove }) => (
              <div data-testid="form-list">
                {fields.map((field, index) => (
                  <div key={field.key} data-testid={`contact-${index}`}>
                    <FormItem name={['contacts', field.name, 'type']} label="Type">
                      <input data-testid={`type-${index}`} />
                    </FormItem>
                    <FormItem name={['contacts', field.name, 'value']} label="Value">
                      <input data-testid={`value-${index}`} />
                    </FormItem>
                    <button type="button" onClick={() => remove(field.name)} data-testid={`remove-${index}`}>
                      Remove
                    </button>
                  </div>
                ))}
                <button type="button" onClick={() => add({ type: '', value: '' })} data-testid="add-btn">
                  Add Contact
                </button>
              </div>
            )}
          </FormList>
        </Form>
      );
    };

    render(<TestForm />);
    
    expect(screen.getByTestId('contact-0')).toBeInTheDocument();
    expect(screen.getByTestId('type-0')).toHaveValue('email');
    expect(screen.getByTestId('value-0')).toHaveValue('john@example.com');
  });

  it('should add new form list field', () => {
    const TestForm = () => {
      const [form] = useForm();
      
      return (
        <Form form={form} initialValues={{ contacts: [] }}>
          <FormList name="contacts">
            {(fields, { add }) => (
              <div data-testid="form-list">
                {fields.map((field, index) => (
                  <div key={field.key} data-testid={`contact-${index}`}>
                    <FormItem name={['contacts', field.name, 'type']} label="Type">
                      <input data-testid={`type-${index}`} />
                    </FormItem>
                    <FormItem name={['contacts', field.name, 'value']} label="Value">
                      <input data-testid={`value-${index}`} />
                    </FormItem>
                  </div>
                ))}
                <button type="button" onClick={() => add({ type: 'phone', value: '123-456-7890' })} data-testid="add-btn">
                  Add Contact
                </button>
              </div>
            )}
          </FormList>
        </Form>
      );
    };

    render(<TestForm />);
    
    const addBtn = screen.getByTestId('add-btn');
    fireEvent.click(addBtn);
    
    expect(screen.getByTestId('contact-0')).toBeInTheDocument();
    expect(screen.getByTestId('type-0')).toHaveValue('phone');
    expect(screen.getByTestId('value-0')).toHaveValue('123-456-7890');
  });

  it('should remove form list field', () => {
    const TestForm = () => {
      const [form] = useForm();
      
      return (
        <Form form={form} initialValues={{ contacts: [{ type: 'email' }, { type: 'phone' }] }}>
          <FormList name="contacts">
            {(fields, { add, remove }) => (
              <div data-testid="form-list">
                {fields.map((field, index) => (
                  <div key={field.key} data-testid={`contact-${index}`}>
                    <FormItem name={['contacts', field.name, 'type']} label="Type">
                      <input data-testid={`type-${index}`} />
                    </FormItem>
                    <button type="button" onClick={() => remove(field.name)} data-testid={`remove-${index}`}>
                      Remove
                    </button>
                  </div>
                ))}
                <button type="button" onClick={() => add({ type: '' })} data-testid="add-btn">
                  Add Contact
                </button>
              </div>
            )}
          </FormList>
        </Form>
      );
    };

    render(<TestForm />);
    
    expect(screen.getByTestId('contact-0')).toBeInTheDocument();
    expect(screen.getByTestId('contact-1')).toBeInTheDocument();
    
    const removeBtn = screen.getByTestId('remove-0');
    fireEvent.click(removeBtn);
    
    expect(screen.queryByTestId('contact-0')).not.toBeInTheDocument();
    expect(screen.getByTestId('contact-0')).toBeInTheDocument(); // Now the second item becomes the first
  });

  it('should update form list field values', () => {
    const TestForm = () => {
      const [form] = useForm();
      
      return (
        <Form form={form} initialValues={{ contacts: [{ type: 'email', value: 'john@example.com' }] }}>
          <FormList name="contacts">
            {(fields) => (
              <div data-testid="form-list">
                {fields.map((field, index) => (
                  <div key={field.key} data-testid={`contact-${index}`}>
                    <FormItem name={['contacts', field.name, 'type']} label="Type">
                      <input data-testid={`type-${index}`} />
                    </FormItem>
                    <FormItem name={['contacts', field.name, 'value']} label="Value">
                      <input data-testid={`value-${index}`} />
                    </FormItem>
                  </div>
                ))}
              </div>
            )}
          </FormList>
        </Form>
      );
    };

    render(<TestForm />);
    
    const typeInput = screen.getByTestId('type-0');
    const valueInput = screen.getByTestId('value-0');
    
    fireEvent.change(typeInput, { target: { value: 'phone' } });
    fireEvent.change(valueInput, { target: { value: '123-456-7890' } });
    
    expect(typeInput).toHaveValue('phone');
    expect(valueInput).toHaveValue('123-456-7890');
  });
});
