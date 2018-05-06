import configureCssApi, { api } from '../../index'

describe(`theme helpers`, () => {
  describe(`api()`, () => {
    const cssApi = configureCssApi()

    describe(`with no theme`, () => {
      it(`throws`, () => {
        expect(() => api({})({})).toThrow(
          `[cssapi] api() There was no theme object available on the props object`
        )
      })
    })

    describe(`with no api function`, () => {
      it(`throws`, () => {
        expect(() => api({})({ theme: {} })).toThrow(
          `[cssapi] api() There was no api function defined on the theme object. Value was: undefined`
        )
      })
    })

    describe(`with api defined on theme`, () => {
      it(`resolves declaration object`, () => {
        expect(
          api({
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
