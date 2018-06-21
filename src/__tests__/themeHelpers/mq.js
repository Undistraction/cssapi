import configureCssApi, { mq } from '../../index'
import { breakpoint1 } from '../testHelpers/fixtures/generic'

describe(`theme helpers`, () => {
  describe(`mq()`, () => {
    const cssApi = configureCssApi()

    describe(`with no theme`, () => {
      it(`throws`, () => {
        expect(() => mq(breakpoint1, {})({})).toThrow(
          `[cssapi] api() There was no theme object available on the props object`
        )
      })
    })

    describe(`with no api function`, () => {
      it(`throws`, () => {
        expect(() => mq(breakpoint1, {})({ theme: {} })).toThrow(
          `[cssapi] api() There was no api function defined on the theme object. Value was: undefined`
        )
      })
    })

    describe(`with api defined on theme`, () => {
      it(`resolves declaration object`, () => {
        expect(
          mq(`default`, {
            padding: 16,
          })({
            theme: {
              api: cssApi,
            },
          })
        ).toEqual(`padding: 1rem;`)
      })
    })
  })
})
