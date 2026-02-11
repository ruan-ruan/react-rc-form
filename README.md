# React RC Form

基于 React 的原子化表单组件，专门用于解决 Ant Design Form 中深层嵌套数据路径的问题。

## 特性

- **原子化设计**：Field 组件可以独立使用，不依赖特定的 UI 库
- **深层嵌套支持**：完美支持 `address.city` 这种深层嵌套路径
- **类型安全**：完整的 TypeScript 类型支持
- **轻量级**：核心代码简洁，无外部依赖
- **灵活的验证**：支持多种验证规则和自定义验证器
- **动态表单**：支持 FormList 动态增减表单项

## 安装

```bash
npm install react-rc-form
```

## 核心组件

### Form

表单容器组件，提供表单上下文。

```tsx
import { Form, useForm } from 'react-rc-form';

const MyForm = () => {
  const [form] = useForm();
  
  return (
    <Form
      form={form}
      initialValues={{ username: '' }}
      onFinish={(values) => console.log(values)}
    >
      {/* 表单内容 */}
    </Form>
  );
};
```

### Field

原子化表单字段组件，可以包装任何表单控件。

```tsx
<Field name="username" rules={[{ required: true }]}>
  <input />
</Field>
```

### FormItem

带标签和错误提示的表单项组件。

```tsx
<FormItem
  name="username"
  label="用户名"
  required
  rules={[{ required: true, message: '请输入用户名' }]}
>
  <input />
</FormItem>
```

### FormList

动态表单列表组件，支持动态增减表单项。

```tsx
<FormList name="contacts">
  {(fields, { add, remove }) => (
    <>
      {fields.map((field) => (
        <FormItem key={field.key} name={['contacts', field.name, 'type']}>
          <input />
        </FormItem>
      ))}
      <button onClick={() => add()}>添加</button>
    </>
  )}
</FormList>
```

## API

### Form Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| form | 表单实例 | `FormInstance` | - |
| initialValues | 表单初始值 | `T` | - |
| onFinish | 提交成功回调 | `(values: T) => void` | - |
| onFinishFailed | 提交失败回调 | `(errorInfo) => void` | - |
| onValuesChange | 值变化回调 | `(changedValues, allValues) => void` | - |

### Field Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| name | 字段名，支持嵌套路径 | `NamePath` | - |
| rules | 验证规则 | `Rule[]` | - |
| trigger | 触发验证的事件 | `string` | `'onChange'` |
| validateTrigger | 验证触发时机 | `string \| string[]` | `'onChange'` |
| shouldUpdate | 是否根据值变化重新渲染 | `boolean \| function` | - |
| dependencies | 依赖的字段 | `NamePath[]` | - |

### FormInstance

表单实例，提供表单操作方法。

```typescript
interface FormInstance<T = any> {
  getFieldValue: (name: NamePath) => any;
  getFieldsValue: (nameList?: NamePath[]) => T;
  setFieldValue: (name: NamePath, value: any) => void;
  setFieldsValue: (values: Partial<T>) => void;
  getFieldError: (name: NamePath) => string | string[];
  getFieldsError: (nameList?: NamePath[]) => { name: NamePath; errors: string[] }[];
  setFieldError: (name: NamePath, error: string | string[]) => void;
  setFieldsError: (errors: { name: NamePath; errors: string[] }[]) => void;
  getFieldTouched: (name: NamePath) => boolean;
  getFieldsTouched: (nameList?: NamePath[]) => { [key: string]: boolean };
  setFieldTouched: (name: NamePath, touched: boolean) => void;
  resetFields: (nameList?: NamePath[]) => void;
  validateFields: (nameList?: NamePath[]) => Promise<T>;
  submit: () => void;
}
```

### Rule

验证规则类型。

```typescript
interface Rule {
  required?: boolean;
  message?: string;
  pattern?: RegExp;
  validator?: (rule: Rule, value: any) => Promise<void> | void;
  min?: number;
  max?: number;
  len?: number;
  type?: 'string' | 'number' | 'boolean' | 'array' | 'object' | 'email' | 'url';
}
```

## 使用示例

### 基础用法

```tsx
import { Form, FormItem, useForm } from 'react-rc-form';

function App() {
  const [form] = useForm();
  
  return (
    <Form form={form} onFinish={(values) => console.log(values)}>
      <FormItem
        name="username"
        label="用户名"
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <input />
      </FormItem>
      <button type="submit">提交</button>
    </Form>
  );
}
```

### 深层嵌套

```tsx
<Form form={form}>
  <FormItem name="address.street" label="街道">
    <input />
  </FormItem>
  <FormItem name="address.city" label="城市">
    <input />
  </FormItem>
  <FormItem name="address.zipCode" label="邮编">
    <input />
  </FormItem>
</Form>
```

### 动态表单

```tsx
<FormList name="contacts">
  {(fields, { add, remove }) => (
    <>
      {fields.map((field) => (
        <div key={field.key}>
          <FormItem name={['contacts', field.name, 'type']} label="类型">
            <select>
              <option value="phone">电话</option>
              <option value="email">邮箱</option>
            </select>
          </FormItem>
          <FormItem name={['contacts', field.name, 'value']} label="值">
            <input />
          </FormItem>
          <button onClick={() => remove(field.name)}>删除</button>
        </div>
      ))}
      <button onClick={() => add()}>添加</button>
    </>
  )}
</FormList>
```

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建
npm run build
```

## License

MIT
