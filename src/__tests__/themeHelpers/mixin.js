import configureCssApi, { mixin } from '../../index'
import { value1, value2, value3 } from '../testHelpers/fixtures/generic'

describe(`mixin`, () => {
  const cssApi = configureCssApi()

  const defaultMixinFunc = () => () => {}

  describe(`with no theme`, () => {
    it(`throws`, () => {
      const props = {}

      expect(() => mixin(defaultMixinFunc)()(props)).toThrow(
        `[cssapi] mixin() There was no theme object available on the props object`
      )
    })
  })

  describe(`with no api function`, () => {
    it(`throws`, () => {
      const props = { theme: {} }
      expect(() => mixin(defaultMixinFunc)()(props)).toThrow(
        `[cssapi] mixin() There was no api function defined on the theme object. Value was: undefined`
      )
    })
  })

  describe(`with mixin defined on theme`, () => {
    describe(`when mixin accepts args`, () => {
      const mock = jest.fn()

      const mixinFunc = api => (...args) => {
        mock(api, ...args)
      }

      const props = {
        theme: {
          api: cssApi,
        },
      }

      it(`resolves declaration object`, () => {
        mixin(mixinFunc)(value1, value2, value3)(props)

        expect(mock).toBeCalledWith(cssApi, value1, value2, value3)
      })
    })

    describe(`when mixin doesn't accept args`, () => {
      const mock = jest.fn()

      const mixinFunc = api => () => {
        mock(api)
      }

      const props = {
        theme: {
          api: cssApi,
        },
      }

      it(`resolves declaration object`, () => {
        mixin(mixinFunc)()(props)

        expect(mock).toBeCalledWith(cssApi)
      })
    })
  })
})
