import { Rule } from '../types';

export async function validateRules(value: any, rules: Rule[], name: string): Promise<string[]> {
  const errors: string[] = [];
  
  for (const rule of rules) {
    try {
      await validateRule(value, rule, name);
    } catch (error) {
      if (error instanceof Error) {
        errors.push(error.message);
      }
    }
  }
  
  return errors;
}

async function validateRule(value: any, rule: Rule, name: string): Promise<void> {
  const { required, message, pattern, validator, min, max, len, type } = rule;
  
  if (required && (value === undefined || value === null || value === '')) {
    throw new Error(message || `${name} is required`);
  }
  
  if (value === undefined || value === null || value === '') {
    return;
  }
  
  if (pattern && !pattern.test(value)) {
    throw new Error(message || `${name} does not match pattern`);
  }
  
  if (type) {
    const typeErrors = validateType(value, type, message || `${name} is not a valid ${type}`);
    if (typeErrors) {
      throw new Error(typeErrors);
    }
  }
  
  if (min !== undefined) {
    if (typeof value === 'string' || Array.isArray(value)) {
      if (value.length < min) {
        throw new Error(message || `${name} must be at least ${min} characters`);
      }
    } else if (typeof value === 'number') {
      if (value < min) {
        throw new Error(message || `${name} must be at least ${min}`);
      }
    }
  }
  
  if (max !== undefined) {
    if (typeof value === 'string' || Array.isArray(value)) {
      if (value.length > max) {
        throw new Error(message || `${name} must be at most ${max} characters`);
      }
    } else if (typeof value === 'number') {
      if (value > max) {
        throw new Error(message || `${name} must be at most ${max}`);
      }
    }
  }
  
  if (len !== undefined) {
    if (typeof value === 'string' || Array.isArray(value)) {
      if (value.length !== len) {
        throw new Error(message || `${name} must be exactly ${len} characters`);
      }
    }
  }
  
  if (validator) {
    await validator(rule, value);
  }
}

function validateType(value: any, type: string, message: string): string | null {
  switch (type) {
    case 'string':
      if (typeof value !== 'string') return message;
      break;
    case 'number':
      if (typeof value !== 'number') return message;
      break;
    case 'boolean':
      if (typeof value !== 'boolean') return message;
      break;
    case 'array':
      if (!Array.isArray(value)) return message;
      break;
    case 'object':
      if (typeof value !== 'object' || Array.isArray(value)) return message;
      break;
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return message;
      break;
    case 'url':
      try {
        new URL(value);
      } catch {
        return message;
      }
      break;
  }
  return null;
}
