import {
  key1,
  key2,
  key3,
  value1,
  value2,
  value3,
} from '../testHelpers/fixtures/generic'
import defaultBreakpointMapProvider from '../../breakpoints/defaultBreakpointProvider'

describe(`defaultBreakpointMapProvider`, () => {
  describe(`with length values`, () => {
    const breakpointMap = [[key1, `25em`], [key2, `50em`], [key3, `75em`]]
    const configuredProvider = defaultBreakpointMapProvider(breakpointMap)
    describe(`byIndex()`, () => {
      it(`returns an array of name, value pairs`, () => {
        const expected = [
          { name: key1, query: `@media (min-width: 25em)`, value: value1 },
          { name: key2, query: `@media (min-width: 50em)`, value: value2 },
          { name: key3, query: `@media (min-width: 75em)`, value: value3 },
        ]

        expect(configuredProvider.byIndex([value1, value2, value3])).toEqual(
          expected
        )
      })
    })

    describe(`byName()`, () => {
      it(`returns an array of name, value pairs`, () => {
        const expected = [
          { name: key1, query: `@media (min-width: 25em)`, value: value1 },
          { name: key2, query: `@media (min-width: 50em)`, value: value2 },
          { name: key3, query: `@media (min-width: 75em)`, value: value3 },
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

  describe(`with queries`, () => {
    const breakpointMap = [
      [key1, `@media (min-width: 25em)`],
      [key2, `@media (min-width: 50em)`],
      [key3, `@media (min-width: 75em)`],
    ]
    const configuredProvider = defaultBreakpointMapProvider(breakpointMap)
    describe(`byIndex()`, () => {
      it(`returns an array of name, value pairs`, () => {
        const expected = [
          { name: key1, query: `@media (min-width: 25em)`, value: value1 },
          { name: key2, query: `@media (min-width: 50em)`, value: value2 },
          { name: key3, query: `@media (min-width: 75em)`, value: value3 },
        ]

        expect(configuredProvider.byIndex([value1, value2, value3])).toEqual(
          expected
        )
      })
    })

    describe(`byName()`, () => {
      it(`returns an array of name, value pairs`, () => {
        const expected = [
          { name: key1, query: `@media (min-width: 25em)`, value: value1 },
          { name: key2, query: `@media (min-width: 50em)`, value: value2 },
          { name: key3, query: `@media (min-width: 75em)`, value: value3 },
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
