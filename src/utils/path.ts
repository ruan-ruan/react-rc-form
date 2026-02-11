import { NamePath } from '../types';

export function normalizeNamePath(name: NamePath): (string | number)[] {
  if (typeof name === 'string') {
    return name.split('.').flatMap(segment => {
      const match = segment.match(/^([^\[]+)\[(\d+)\]$/);
      if (match) {
        return [match[1], parseInt(match[2], 10)];
      }
      return [segment];
    });
  }
  if (typeof name === 'number') {
    return [name];
  }
  return name;
}

export function getValueByPath(obj: any, path: NamePath): any {
  const normalizedPath = normalizeNamePath(path);
  
  if (!obj || normalizedPath.length === 0) {
    return obj === null || obj === undefined ? undefined : obj;
  }

  let result = obj;
  for (let i = 0; i < normalizedPath.length; i++) {
    const key = normalizedPath[i];
    if (result == null) {
      return undefined;
    }
    result = result[key];
  }
  
  return result;
}

export function setValueByPath(obj: any, path: NamePath, value: any): any {
  const normalizedPath = normalizeNamePath(path);
  
  if (normalizedPath.length === 0) {
    return value;
  }

  const result = Array.isArray(obj) ? [...obj] : { ...obj };
  let current = result;
  
  for (let i = 0; i < normalizedPath.length - 1; i++) {
    const key = normalizedPath[i];
    
    if (current[key] == null) {
      const nextKey = normalizedPath[i + 1];
      current[key] = typeof nextKey === 'number' ? [] : {};
    } else {
      current[key] = Array.isArray(current[key]) ? [...current[key]] : { ...current[key] };
    }
    
    current = current[key];
  }
  
  const lastKey = normalizedPath[normalizedPath.length - 1];
  current[lastKey] = value;
  
  return result;
}

export function deleteValueByPath(obj: any, path: NamePath): any {
  const normalizedPath = normalizeNamePath(path);
  
  if (normalizedPath.length === 0) {
    return obj;
  }

  const result = Array.isArray(obj) ? [...obj] : { ...obj };
  let current = result;
  
  for (let i = 0; i < normalizedPath.length - 1; i++) {
    const key = normalizedPath[i];
    
    if (current[key] == null) {
      return result;
    }
    
    current[key] = Array.isArray(current[key]) ? [...current[key]] : { ...current[key] };
    current = current[key];
  }
  
  const lastKey = normalizedPath[normalizedPath.length - 1];
  
  if (Array.isArray(current)) {
    current.splice(lastKey as number, 1);
  } else {
    delete current[lastKey];
  }
  
  return result;
}

export function matchNamePath(name: NamePath, path: NamePath): boolean {
  const normalized1 = normalizeNamePath(name);
  const normalized2 = normalizeNamePath(path);
  
  if (normalized1.length !== normalized2.length) {
    return false;
  }
  
  return normalized1.every((key, index) => key === normalized2[index]);
}

export function isNamePathInList(name: NamePath, nameList: NamePath[]): boolean {
  return nameList.some((item) => matchNamePath(name, item));
}
