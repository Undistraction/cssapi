import { map } from 'ramda';

import * as API from '../index';

import { API_OBJECTS } from '../const';

map(name => {
  describe(`${name}()`, () => {
    const apiFunction = API[name];
    it(`returns ${name} object when present`, () => {
      const o = {};
      const value = {
        theme: {
          [name]: o,
        },
      };
      expect(apiFunction(value)).toBe(o);
    });

    it(`throws when no theme is present`, () => {
      const value = {};
      expect(() => apiFunction(value)).toThrow(
        `[cssapi] ${name}() There is no 'theme' available on the props object`
      );
    });

    it(`throws when no fonts object is present`, () => {
      const value = {
        theme: {},
      };
      expect(() => apiFunction(value)).toThrow(
        `[cssapi] ${name}() There is no '${name}' object available on this theme`
      );
    });
  });
})(API_OBJECTS);
