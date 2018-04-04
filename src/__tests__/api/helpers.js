import { key1, key2, key3 } from '../testHelpers/fixtures/generic'
import cssapi from '../..'

describe(`helpers`, () => {
  const breakpointMap = [[key1, `25em`], [key2, `50em`], [key3, `75em`]]
  const api = cssapi(breakpointMap)
  describe(`box helpers`, () => {
    describe(`padding-h`, () => {
      it(`returns left and right padding`, () => {
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

  describe(`offset`, () => {
    it(`renders a single value`, () => {
      const result = api.offset(`10px`)
      expect(result).toEqualMultiline(`
        top: 10px;
        right: 10px;
        bottom: 10px;
        left: 10px;
      `)
    })

    it(`renders two values`, () => {
      const result = api.offset([`10px`, `20px`])
      expect(result).toEqualMultiline(`
        top: 10px;
        right: 20px;
        bottom: 10px;
        left: 20px;
      `)
    })

    it(`renders three values`, () => {
      const result = api.offset([`10px`, `20px`, `5px`])
      expect(result).toEqualMultiline(`
        top: 10px;
        right: 20px;
        bottom: 5px;
        left: 20px;
      `)
    })

    it(`renders four values`, () => {
      const result = api.offset([`10px`, `20px`, `5px`, `2px`])
      expect(result).toEqualMultiline(`
        top: 10px;
        right: 20px;
        bottom: 5px;
        left: 2px;
      `)
    })
  })

  describe(`offsetV`, () => {
    it(`renders a single value`, () => {
      const result = api.offsetV(`10px`)
      expect(result).toEqualMultiline(`
        top: 10px;
        bottom: 10px;
      `)
    })

    it(`renders two values`, () => {
      const result = api.offsetV([`10px`, `20px`])
      expect(result).toEqualMultiline(`
        top: 10px;
        bottom: 20px;
      `)
    })
  })

  describe(`offsetH`, () => {
    it(`renders a single value`, () => {
      const result = api.offsetH(`10px`)
      expect(result).toEqualMultiline(`
        right: 10px;
        left: 10px;
      `)
    })

    it(`renders two values`, () => {
      const result = api.offsetH([`10px`, `20px`])
      expect(result).toEqualMultiline(`
        right: 10px;
        left: 20px;
      `)
    })
  })
})
