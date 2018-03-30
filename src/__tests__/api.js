import { key1, key2, key3 } from './testHelpers/fixtures/generic'
import cssapi from '../index'

describe(`api`, () => {
  const breakpointMap = [[key1, `25em`], [key2, `50em`], [key3, `75em`]]

  describe(`with explicit lengths`, () => {
    describe(`margin`, () => {
      it(`renders the correct CSS`, () => {
        const api = cssapi(breakpointMap)

        expect(api.margin(`10px`, `15px`, `20px`)).toEqualMultiline(`
          margin: 10px;
          @media (min-width: 25em) {
            margin: 15px;
          }
          @media (min-width: 50em) {
            margin: 20px;
          }
        `)
      })
    })
  })
  describe(`with unitless string lengths`, () => {
    describe(`margin`, () => {
      it(`renders the correct CSS`, () => {
        const api = cssapi(breakpointMap)

        expect(api.margin(`10`, `16`, `20`)).toEqualMultiline(`
          margin: 0.625rem;
          @media (min-width: 25em) {
            margin: 1rem;
          }
          @media (min-width: 50em) {
            margin: 1.25rem;
          }
        `)
      })
    })
  })

  describe(`with unitless numberss`, () => {
    describe(`margin`, () => {
      it(`renders the correct CSS`, () => {
        const api = cssapi(breakpointMap)

        expect(api.margin(10, 16, 20)).toEqualMultiline(`
          margin: 0.625rem;
          @media (min-width: 25em) {
            margin: 1rem;
          }
          @media (min-width: 50em) {
            margin: 1.25rem;
          }
        `)
      })
    })
  })
})
