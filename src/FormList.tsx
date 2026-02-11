import React, { useState, useEffect } from 'react';
import { NamePath } from './types';
import { useFormContext, InternalFormInstance } from './FormContext';


export interface FormListProps {
  name: NamePath;
  children: (fields: FormListField[], operations: FormListOperations, meta: FormListMeta) => React.ReactNode;
  initialValue?: any[];
}

export interface FormListField {
  key: number;
  name: number;
}

export interface FormListOperations {
  add: (defaultValue?: any, insertIndex?: number) => void;
  remove: (index: number | number[]) => void;
  move: (from: number, to: number) => void;
}

export interface FormListMeta {
  errors: React.ReactNode[];
}

const FormList = (props: FormListProps) => {
  const { name, children, initialValue = [] } = props;
  const form = useFormContext() as InternalFormInstance;
  const [fields, setFields] = useState<FormListField[]>(() => {
    const currentValue = form.getFieldValue(name) || initialValue;
    return currentValue.map((_: any, index: number) => ({ key: index, name: index }));
  });
  
  const [errors] = useState<React.ReactNode[]>([]);
  
  useEffect(() => {
    const currentValue = form.getFieldValue(name);
    if (!currentValue || currentValue.length === 0) {
      form.setFieldValue(name, initialValue);
    }
  }, []);
  
  useEffect(() => {
    const currentValue = form.getFieldValue(name) || initialValue;
    const newFields = currentValue.map((_: any, index: number) => ({ key: index, name: index }));
    setFields(newFields);
  }, [form, name, initialValue]);
  
  const add = (defaultValue: any = {}, insertIndex?: number) => {
    const currentList = form.getFieldValue(name) || [];
    const newField: FormListField = { key: Date.now(), name: insertIndex ?? currentList.length };
    
    let newList: any[];
    if (insertIndex !== undefined) {
      newList = [
        ...currentList.slice(0, insertIndex),
        defaultValue,
        ...currentList.slice(insertIndex),
      ];
      const newFields = [
        ...fields.slice(0, insertIndex),
        newField,
        ...fields.slice(insertIndex).map((f) => ({ ...f, name: f.name + 1 })),
      ];
      setFields(newFields);
    } else {
      newList = [...currentList, defaultValue];
      setFields([...fields, newField]);
    }
    
    form.setFieldValue(name, newList);
  };
  
  const remove = (index: number | number[]) => {
    const indices = Array.isArray(index) ? index : [index];
    const currentList = form.getFieldValue(name) || [];
    
    const sortedIndices = [...indices].sort((a, b) => b - a);
    
    let newList = [...currentList];
    sortedIndices.forEach((i) => {
      newList.splice(i, 1);
    });
    
    const newFields = fields.filter((f) => !indices.includes(f.name));
    
    setFields(newFields);
    form.setFieldValue(name, newList);
  };
  
  const move = (from: number, to: number) => {
    const currentList = form.getFieldValue(name) || [];
    if (from < 0 || from >= currentList.length || to < 0 || to >= currentList.length) {
      return;
    }
    
    const newList = [...currentList];
    const [movedItem] = newList.splice(from, 1);
    newList.splice(to, 0, movedItem);
    
    const newFields = [...fields];
    const [movedField] = newFields.splice(from, 1);
    newFields.splice(to, 0, movedField);
    
    setFields(newFields);
    form.setFieldValue(name, newList);
  };
  
  const operations: FormListOperations = {
    add,
    remove,
    move,
  };
  
  const meta: FormListMeta = {
    errors,
  };
  
  return (
    <>
      {children(fields, operations, meta)}
    </>
  );
};

FormList.displayName = 'FormList';

export default FormList;
