import { difference } from '..';

describe('helper', () => {
  describe('difference', () => {
    it('SHOULD be no difference', () => {
      const obj = {};
      const base = {};
      const result = difference(obj, base);
      expect(result).toEqual({});
    });

    it('SHOULD be a difference', () => {
      const obj = {
        key1: 'aa',
        key2: 'bb',
      };
      const base = {
        key1: 'aa',
      };
      const result = difference(obj, base);
      expect(result).toEqual({ key2: 'bb' });
    });

    it('SHOULD be a difference', () => {
      const obj = {
        key1: {
          key2: 'aa',
        },
      };
      const base = {
        key1: {
          key3: 'cc',
        },
      };
      const result = difference(obj, base);
      expect(result).toEqual({
        key1: {
          key2: 'aa',
        },
      });
    });
  });
});
