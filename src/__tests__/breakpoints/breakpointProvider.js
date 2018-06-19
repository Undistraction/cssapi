import breakpointProvider from '../../breakpoints/breakpointProvider'
import {
  key1,
  key2,
  key3,
  value1,
  value2,
  value3,
} from '../testHelpers/fixtures/generic'

describe(`breakpointProvider`, () => {
  describe(`with length values`, () => {
    const breakpointMap = [[key1, `25em`], [key2, `50em`], [key3, `75em`]]
    const configuredProvider = breakpointProvider(breakpointMap)
    describe(`byIndex()`, () => {
      it(`returns an array of name, value pairs`, () => {
        const expected = [
          {
            name: key1,
            query: { from: `25em`, to: `50em` },
            value: value1,
          },
          {
            name: key2,
            query: { from: `50em`, to: `75em` },
            value: value2,
          },
          { name: key3, query: { from: `75em` }, value: value3 },
        ]

        expect(configuredProvider.byIndex([value1, value2, value3])).toEqual(
          expected
        )
      })
    })

    describe(`byName()`, () => {
      it(`returns an array of name, value pairs`, () => {
        const expected = [
          { name: key1, query: { from: `25em` }, value: value1 },
          { name: key2, query: { from: `50em` }, value: value2 },
          { name: key3, query: { from: `75em` }, value: value3 },
        ]
        expect(
          configuredProvider.byName({
            [key1]: value1,
            [key2]: value2,
            [key3]: value3,
          })
        ).toEqual(expected)
      })
    })
  })
})
