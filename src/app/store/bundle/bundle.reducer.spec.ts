import { bundleReducer } from './bundle.reducer';

describe('Bundle Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = bundleReducer(null, action);

      expect(result).toBe(null);
    });
  });
});
