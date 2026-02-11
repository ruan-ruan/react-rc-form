
import { createRoot } from 'react-dom/client';
import Form from './Form';

import FormItem from './FormItem';
import FormList from './FormList';
import { useForm } from './FormContext';

interface UserFormValues {
  username: string;
  email: string;
  age: number;
  address: {
    street: string;
    city: string;
    zipCode: string;
  };
  contacts: Array<{
    type: string;
    value: string;
  }>;
}

const App = () => {
  const [form] = useForm<UserFormValues>();
  
  const onFinish = (values: UserFormValues) => {
    console.log('Form submitted:', values);
    alert('Form submitted successfully! Check console for values.');
  };
  
  const onValuesChange = (changedValues: Partial<UserFormValues>, allValues: UserFormValues) => {
    console.log('Values changed:', changedValues);
    console.log('All values:', allValues);
  };
  
  return (
    <div style={{ maxWidth: 600, margin: '50px auto', padding: 20 }}>
      <h1>React RC Form - 原子化表单组件</h1>
      <p>解决 Ant Design Form 深层嵌套数据问题</p>
      
      <Form
        form={form}
        initialValues={{
          username: '',
          email: '',
          age: 0,
          address: {
            street: '',
            city: '',
            zipCode: '',
          },
          contacts: [],
        }}
        onFinish={onFinish}
        onValuesChange={onValuesChange}
      >
        <FormItem
          name="username"
          label="用户名"
          required
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <input type="text" placeholder="请输入用户名" style={{ width: '100%', padding: 8 }} />
        </FormItem>
        
        <FormItem
          name="email"
          label="邮箱"
          required
          rules={[
            { required: true, message: '请输入邮箱' },
            { type: 'email', message: '请输入有效的邮箱地址' },
          ]}
        >
          <input type="email" placeholder="请输入邮箱" style={{ width: '100%', padding: 8 }} />
        </FormItem>
        
        <FormItem
          name="age"
          label="年龄"
          rules={[
            { required: true, message: '请输入年龄' },
            { type: 'number', message: '请输入有效的数字' },
            { min: 0, message: '年龄不能小于0' },
            { max: 150, message: '年龄不能大于150' },
          ]}
        >
          <input type="number" placeholder="请输入年龄" style={{ width: '100%', padding: 8 }} />
        </FormItem>
        
        <h3>地址信息（深层嵌套）</h3>
        
        <FormItem
          name="address.street"
          label="街道"
          required
          rules={[{ required: true, message: '请输入街道地址' }]}
        >
          <input type="text" placeholder="请输入街道地址" style={{ width: '100%', padding: 8 }} />
        </FormItem>
        
        <FormItem
          name="address.city"
          label="城市"
          required
          rules={[{ required: true, message: '请输入城市' }]}
        >
          <input type="text" placeholder="请输入城市" style={{ width: '100%', padding: 8 }} />
        </FormItem>
        
        <FormItem
          name="address.zipCode"
          label="邮编"
          rules={[
            { required: true, message: '请输入邮编' },
            { pattern: /^\d{6}$/, message: '请输入6位数字邮编' },
          ]}
        >
          <input type="text" placeholder="请输入邮编" style={{ width: '100%', padding: 8 }} />
        </FormItem>
        
        <h3>联系方式（动态列表）</h3>
        
        <FormList name="contacts">
          {(fields: any[], { add, remove }: { add: (item: any) => void, remove: (index: number) => void }) => (
            <>
              {fields.map((field: any) => (
                <div key={field.key} style={{ marginBottom: 16, padding: 16, border: '1px solid #ddd', borderRadius: 4 }}>
                  <FormItem
                    name={['contacts', field.name, 'type']}
                    label="类型"
                    required
                    rules={[{ required: true, message: '请选择联系方式类型' }]}
                  >
                    <select style={{ width: '100%', padding: 8 }}>
                      <option value="">请选择</option>
                      <option value="phone">电话</option>
                      <option value="email">邮箱</option>
                      <option value="wechat">微信</option>
                    </select>
                  </FormItem>
                  
                  <FormItem
                    name={['contacts', field.name, 'value']}
                    label="值"
                    required
                    rules={[{ required: true, message: '请输入联系方式' }]}
                  >
                    <input type="text" placeholder="请输入联系方式" style={{ width: '100%', padding: 8 }} />
                  </FormItem>
                  
                  <button
                    type="button"
                    onClick={() => remove(field.name)}
                    style={{ padding: '4px 8px', background: '#ff4d4f', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}
                  >
                    删除
                  </button>
                </div>
              ))}
              
              <button
                type="button"
                onClick={() => add({ type: '', value: '' })}
                style={{ padding: '8px 16px', background: '#1890ff', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}
              >
                添加联系方式
              </button>
            </>
          )}
        </FormList>
        
        <div style={{ marginTop: 24 }}>
          <button
            type="submit"
            style={{ padding: '10px 20px', background: '#52c41a', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 16 }}
          >
            提交表单
          </button>
          
          <button
            type="button"
            onClick={() => form.resetFields()}
            style={{ padding: '10px 20px', background: '#d9d9d9', color: 'black', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 16, marginLeft: 10 }}
          >
            重置表单
          </button>
        </div>
      </Form>
      
      <div style={{ marginTop: 40, padding: 20, background: '#f5f5f5', borderRadius: 4 }}>
        <h3>当前表单值（实时）</h3>
        <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
          {JSON.stringify(form.getFieldsValue(), null, 2)}
        </pre>
      </div>
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
