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
  const breakpointMap = [[key1, `25em`], [key2, `50em`], [key3, `75em`]]
  const configuredProvider = defaultBreakpointMapProvider(breakpointMap)

  describe(`findBreakpointsByIndex()`, () => {
    it(`returns an array of name, value pairs`, () => {
      const expected = [[key1, value1], [key2, value2], [key3, value3]]

      expect(
        configuredProvider.findBreakpointsByIndex([value1, value2, value3])
      ).toEqual(expected)
    })
  })

  describe(`findBreakpointsByName()`, () => {
    it(`returns an array of name, value pairs`, () => {
      const expected = [[key1, value1], [key2, value2], [key3, value3]]

      expect(
        configuredProvider.findBreakpointsByName({
          [key1]: value1,
          [key2]: value2,
          [key3]: value3,
        })
      ).toEqual(expected)
    })
  })

  describe(`findBreakpoint()`, () => {
    it(`returns the correct breakpoint`, () => {
      expect(configuredProvider.findBreakpointByName(key1)).toEqual(
        `@media (min-width: 25em)`
      )
      expect(configuredProvider.findBreakpointByName(key2)).toEqual(
        `@media (min-width: 50em)`
      )
    })
  })
})
