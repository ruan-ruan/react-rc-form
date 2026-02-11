export type Path = string | number | (string | number)[];

export type PathValue<T, P extends Path> = P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
    ? PathValue<T[K], Rest>
    : any
  : P extends keyof T
  ? T[P]
  : any;

export type NamePath = string | number | (string | number)[];

export interface FieldState {
  value: any;
  touched: boolean;
  error?: string;
  validating: boolean;
  rules?: Rule[];
}

export interface FormInstance<T = any> {
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

export interface FormProps<T = any> {
  form?: any;
  initialValues?: T;
  onFinish?: (values: T) => void;
  onFinishFailed?: (errorInfo: { values: T; errorFields: any[]; outOfDate: boolean }) => void;
  onValuesChange?: (changedValues: Partial<T>, allValues: T) => void;
  children?: React.ReactNode;
}

export interface FieldProps {
  name: NamePath;
  children?: (control: any, meta: FieldState) => React.ReactNode;
  rules?: Rule[];
  trigger?: string;
  validateTrigger?: string | string[];
  shouldUpdate?: boolean | ((prevValues: any, nextValues: any) => boolean);
  dependencies?: NamePath[];
}

export interface Rule {
  required?: boolean;
  message?: string;
  pattern?: RegExp;
  validator?: (rule: Rule, value: any) => Promise<void> | void;
  min?: number;
  max?: number;
  len?: number;
  type?: 'string' | 'number' | 'boolean' | 'method' | 'regexp' | 'integer' | 'float' | 'array' | 'object' | 'enum' | 'date' | 'url' | 'hex' | 'email';
}
