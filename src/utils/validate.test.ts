import { validateRules } from './validate';

describe('Validate Utility Functions', () => {
  describe('validateRules', () => {
    it('should pass validation with no rules', async () => {
      const errors = await validateRules('test', [], 'field');
      expect(errors).toEqual([]);
    });

    it('should pass validation with required rule and non-empty value', async () => {
      const errors = await validateRules('test', [{ required: true }], 'field');
      expect(errors).toEqual([]);
    });

    it('should fail validation with required rule and empty value', async () => {
      const errors = await validateRules('', [{ required: true, message: 'Field is required' }], 'field');
      expect(errors).toEqual(['Field is required']);
    });

    it('should pass validation with pattern rule and matching value', async () => {
      const errors = await validateRules('test@example.com', [{ pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }], 'email');
      expect(errors).toEqual([]);
    });

    it('should fail validation with pattern rule and non-matching value', async () => {
      const errors = await validateRules('invalid-email', [{ pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email format' }], 'email');
      expect(errors).toEqual(['Invalid email format']);
    });

    it('should pass validation with min length rule and sufficient length', async () => {
      const errors = await validateRules('test', [{ min: 3 }], 'field');
      expect(errors).toEqual([]);
    });

    it('should fail validation with min length rule and insufficient length', async () => {
      const errors = await validateRules('te', [{ min: 3, message: 'Minimum length is 3' }], 'field');
      expect(errors).toEqual(['Minimum length is 3']);
    });

    it('should pass validation with max length rule and within limit', async () => {
      const errors = await validateRules('test', [{ max: 5 }], 'field');
      expect(errors).toEqual([]);
    });

    it('should fail validation with max length rule and over limit', async () => {
      const errors = await validateRules('testing', [{ max: 5, message: 'Maximum length is 5' }], 'field');
      expect(errors).toEqual(['Maximum length is 5']);
    });

    it('should pass validation with len rule and exact length', async () => {
      const errors = await validateRules('test', [{ len: 4 }], 'field');
      expect(errors).toEqual([]);
    });

    it('should fail validation with len rule and incorrect length', async () => {
      const errors = await validateRules('testing', [{ len: 4, message: 'Length must be 4' }], 'field');
      expect(errors).toEqual(['Length must be 4']);
    });

    it('should pass validation with type rule and correct type', async () => {
      expect(await validateRules('test', [{ type: 'string' }], 'field')).toEqual([]);
      expect(await validateRules(123, [{ type: 'number' }], 'field')).toEqual([]);
      expect(await validateRules(true, [{ type: 'boolean' }], 'field')).toEqual([]);
      expect(await validateRules([], [{ type: 'array' }], 'field')).toEqual([]);
      expect(await validateRules({}, [{ type: 'object' }], 'field')).toEqual([]);
      expect(await validateRules('test@example.com', [{ type: 'email' }], 'field')).toEqual([]);
      expect(await validateRules('https://example.com', [{ type: 'url' }], 'field')).toEqual([]);
    });

    it('should fail validation with type rule and incorrect type', async () => {
      expect(await validateRules(123, [{ type: 'string', message: 'Must be string' }], 'field')).toEqual(['Must be string']);
      expect(await validateRules('test', [{ type: 'number', message: 'Must be number' }], 'field')).toEqual(['Must be number']);
      expect(await validateRules('test', [{ type: 'email', message: 'Must be email' }], 'field')).toEqual(['Must be email']);
    });

    it('should pass validation with custom validator that resolves', async () => {
      const validator = jest.fn(() => Promise.resolve());
      const errors = await validateRules('test', [{ validator }], 'field');
      expect(errors).toEqual([]);
      expect(validator).toHaveBeenCalled();
    });

    it('should fail validation with custom validator that rejects', async () => {
      const validator = jest.fn(() => Promise.reject(new Error('Custom error')));
      const errors = await validateRules('test', [{ validator }], 'field');
      expect(errors).toEqual(['Custom error']);
      expect(validator).toHaveBeenCalled();
    });

    it('should validate multiple rules', async () => {
      const rules = [
        { required: true, message: 'Required' },
        { min: 3, message: 'Too short' },
        { max: 10, message: 'Too long' },
      ];

      // Should fail required
      expect(await validateRules('', rules, 'field')).toEqual(['Required']);

      // Should fail min length
      expect(await validateRules('te', rules, 'field')).toEqual(['Too short']);

      // Should pass
      expect(await validateRules('test', rules, 'field')).toEqual([]);

      // Should fail max length
      expect(await validateRules('this-is-too-long', rules, 'field')).toEqual(['Too long']);
    });
  });
});
