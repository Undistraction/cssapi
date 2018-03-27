import { theme } from '..';

describe(`theme()`, () => {
  it(`returns theme object when present`, () => {
    const themeObj = {};
    const value = {
      theme: themeObj,
    };
    expect(theme(value)).toBe(themeObj);
  });

  it(`throws when no theme is present`, () => {
    const value = {};
    expect(() => theme(value)).toThrow(
      `[cssapi] theme() There is no 'theme' available on the props object`
    );
  });
});
