import { theme } from '..';
import { key1, value1, key2, key3 } from './testHelpers/fixtures/generic';

describe(`theme()`, () => {
  it(`returns value at shallow depth`, () => {
    const value = {
      theme: {
        [key1]: value1,
      },
    };
    const propsPath = key1;
    const result = theme(propsPath)(value);
    expect(result).toEqual(value1);
  });

  it(`returns value at depth`, () => {
    const value = {
      theme: {
        [key1]: {
          [key2]: {
            [key3]: value1,
          },
        },
      },
    };
    const propsPath = `${key1}.${key2}.${key3}`;
    const result = theme(propsPath)(value);
    expect(result).toEqual(value1);
  });

  it(`throws with no theme present`, () => {
    const value = {};
    const propsPath = key1;
    expect(() => theme(propsPath)(value)).toThrow(
      `[cssapi] theme() There is no 'theme' available on the props object`
    );
  });

  it(`throws with nothing at shallow path`, () => {
    const value = {
      theme: {},
    };
    const propsPath = key1;
    expect(() => theme(propsPath)(value)).toThrow(
      `[cssapi] theme() Theme doesn't provide a value at path '${propsPath}'`
    );
  });

  it(`throws with nothing at deep path`, () => {
    const value = {
      theme: {},
    };
    const propsPath = `${key1}.${key2}.${key3}`;
    expect(() => theme(propsPath)(value)).toThrow(
      `[cssapi] theme() Theme doesn't provide a value at path '${propsPath}'`
    );
  });
});
