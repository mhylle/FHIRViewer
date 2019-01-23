import { structuredefinitionsReducer } from './structuredefinitions.reducer';

describe('Bundle Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = structuredefinitionsReducer(null, action);

      expect(result).toBe(null);
    });
  });
});
