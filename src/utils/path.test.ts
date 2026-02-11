import { normalizeNamePath, getValueByPath, setValueByPath, deleteValueByPath, matchNamePath, isNamePathInList } from './path';

describe('Path Utility Functions', () => {
  describe('normalizeNamePath', () => {
    it('should normalize string path to array', () => {
      expect(normalizeNamePath('user.name')).toEqual(['user', 'name']);
      expect(normalizeNamePath('user')).toEqual(['user']);
    });

    it('should normalize number path to array', () => {
      expect(normalizeNamePath(0)).toEqual([0]);
      expect(normalizeNamePath(5)).toEqual([5]);
    });

    it('should return array path as is', () => {
      expect(normalizeNamePath(['user', 'name'])).toEqual(['user', 'name']);
      expect(normalizeNamePath(['user', 0, 'name'])).toEqual(['user', 0, 'name']);
    });
  });

  describe('getValueByPath', () => {
    const testObject = {
      user: {
        name: 'John',
        age: 30,
        address: {
          street: '123 Main St',
          city: 'New York',
        },
        contacts: [
          { type: 'email', value: 'john@example.com' },
          { type: 'phone', value: '123-456-7890' },
        ],
      },
    };

    it('should get top-level value', () => {
      expect(getValueByPath(testObject, 'user')).toEqual(testObject.user);
    });

    it('should get nested value', () => {
      expect(getValueByPath(testObject, 'user.name')).toBe('John');
      expect(getValueByPath(testObject, 'user.address.city')).toBe('New York');
    });

    it('should get array value', () => {
      expect(getValueByPath(testObject, 'user.contacts[0]')).toEqual(testObject.user.contacts[0]);
      expect(getValueByPath(testObject, ['user', 'contacts', 1, 'value'])).toBe('123-456-7890');
    });

    it('should return undefined for non-existent path', () => {
      expect(getValueByPath(testObject, 'user.nonExistent')).toBeUndefined();
      expect(getValueByPath(testObject, 'user.address.nonExistent')).toBeUndefined();
    });

    it('should return undefined for null/undefined object', () => {
      expect(getValueByPath(null, 'user')).toBeUndefined();
      expect(getValueByPath(undefined, 'user')).toBeUndefined();
    });
  });

  describe('setValueByPath', () => {
    it('should set top-level value', () => {
      const obj = { user: { name: 'John' } };
      const result = setValueByPath(obj, 'name', 'Jane');
      expect(result).toEqual({ user: { name: 'John' }, name: 'Jane' });
      expect(result).not.toBe(obj);
    });

    it('should set nested value', () => {
      const obj = { user: { name: 'John' } };
      const result = setValueByPath(obj, 'user.name', 'Jane');
      expect(result).toEqual({ user: { name: 'Jane' } });
      expect(result.user).not.toBe(obj.user);
    });

    it('should set deeply nested value', () => {
      const obj = { user: {} };
      const result = setValueByPath(obj, 'user.address.city', 'New York');
      expect(result).toEqual({ user: { address: { city: 'New York' } } });
    });

    it('should set array value', () => {
      const obj = { user: { contacts: [{ type: 'email' }] } };
      const result = setValueByPath(obj, 'user.contacts[0].value', 'john@example.com');
      expect(result).toEqual({ user: { contacts: [{ type: 'email', value: 'john@example.com' }] } });
    });

    it('should return new object when path is empty', () => {
      const obj = { user: { name: 'John' } };
      const result = setValueByPath(obj, [], 'new value');
      expect(result).toBe('new value');
    });
  });

  describe('deleteValueByPath', () => {
    it('should delete top-level value', () => {
      const obj = { user: { name: 'John' }, age: 30 };
      const result = deleteValueByPath(obj, 'age');
      expect(result).toEqual({ user: { name: 'John' } });
      expect(result).not.toBe(obj);
    });

    it('should delete nested value', () => {
      const obj = { user: { name: 'John', age: 30 } };
      const result = deleteValueByPath(obj, 'user.age');
      expect(result).toEqual({ user: { name: 'John' } });
      expect(result.user).not.toBe(obj.user);
    });

    it('should delete array item', () => {
      const obj = { user: { contacts: [{ type: 'email' }, { type: 'phone' }] } };
      const result = deleteValueByPath(obj, 'user.contacts[0]');
      expect(result).toEqual({ user: { contacts: [{ type: 'phone' }] } });
    });

    it('should return original object when path does not exist', () => {
      const obj = { user: { name: 'John' } };
      const result = deleteValueByPath(obj, 'user.nonExistent');
      expect(result).toEqual({ user: { name: 'John' } });
    });

    it('should return original object when path is empty', () => {
      const obj = { user: { name: 'John' } };
      const result = deleteValueByPath(obj, []);
      expect(result).toEqual({ user: { name: 'John' } });
    });
  });

  describe('matchNamePath', () => {
    it('should match identical paths', () => {
      expect(matchNamePath('user.name', 'user.name')).toBe(true);
      expect(matchNamePath(['user', 'name'], ['user', 'name'])).toBe(true);
    });

    it('should not match different paths', () => {
      expect(matchNamePath('user.name', 'user.age')).toBe(false);
      expect(matchNamePath(['user', 'name'], ['user', 'age'])).toBe(false);
    });

    it('should not match paths with different lengths', () => {
      expect(matchNamePath('user', 'user.name')).toBe(false);
      expect(matchNamePath(['user'], ['user', 'name'])).toBe(false);
    });
  });

  describe('isNamePathInList', () => {
    const nameList = ['user.name', 'user.age', ['user', 'address', 'city']];

    it('should return true if name path is in list', () => {
      expect(isNamePathInList('user.name', nameList)).toBe(true);
      expect(isNamePathInList(['user', 'address', 'city'], nameList)).toBe(true);
    });

    it('should return false if name path is not in list', () => {
      expect(isNamePathInList('user.email', nameList)).toBe(false);
      expect(isNamePathInList(['user', 'address', 'zip'], nameList)).toBe(false);
    });
  });
});
