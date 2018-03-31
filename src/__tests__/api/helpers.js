import { key1, key2, key3 } from '../testHelpers/fixtures/generic'
import cssapi from '../..'

describe(`helpers`, () => {
  describe(`box helpers`, () => {
    describe(`padding-h`, () => {
      const breakpointMap = [[key1, `25em`], [key2, `50em`], [key3, `75em`]]
      it(`returns left and right padding`, () => {
        const api = cssapi(breakpointMap)

        expect(api.paddingH(`10px`, `15px`, `20px`)).toEqualMultiline(`
          padding-right: 10px;
          padding-left: 10px;
          @media (min-width: 25em) {
            padding-right: 15px;
            padding-left: 15px;
          }
          @media (min-width: 50em) {
            padding-right: 20px;
            padding-left: 20px;
          }
        `)
      })
    })
  })
})
