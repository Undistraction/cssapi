import defaultBreakpointMapProvider from '../../breakpoints/defaultBreakpointProvider'
import resolveBreakpoints from '../../breakpoints/resolveBreakpoints'
import { key1, key2, key3, key4 } from '../testHelpers/fixtures/generic'

const value1 = `500em`
const value2 = `900em`
const value3 = `1200em`

describe(`resolveBreakpoints()`, () => {
  const breakpointMap = [[key1, value1], [key2, value2], [key3, value3]]
  const provider = defaultBreakpointMapProvider(breakpointMap)
  const resolver = resolveBreakpoints(provider)

  describe(`missing breakpoints`, () => {
    it(`throws when no breakpoint exists for index`, () => {
      expect(() => resolver(`a`, `b`, `c`, `d`)).toThrow(
        `[cssapi] (config.breakpoints) Couldn't resolve breakpoint at index 3 with args: ["a","b","c","d"]`
      )
    })

    it(`throws when no breakpoint exists for key`, () => {
      expect(() =>
        resolver({
          [key1]: `a`,
          [key2]: `b`,
          [key3]: `c`,
          [key4]: `d`,
        })
      ).toThrow(
        `[cssapi] (config.breakpoints) Couldn't resolve breakpoint with name 'key4' with args: [{"key1":"a","key2":"b","key3":"c","key4":"d"}]`
      )
    })
  })

  describe(`with separate args`, () => {
    it(`returns an array of breakpointName and value`, () => {
      expect(resolver(`a`, `b`, `c`)).toEqual([
        {
          name: key1,
          query: `@media (min-width: 500em) and (max-width: 899.99em)`,
          value: `a`,
        },
        {
          name: key2,
          query: `@media (min-width: 900em) and (max-width: 1199.99em)`,
          value: `b`,
        },
        {
          name: key3,
          query: `@media (min-width: 1200em)`,
          value: `c`,
        },
      ])
    })
  })

  describe(`with a map`, () => {
    it(`returns an array of breakpointName and value`, () => {
      expect(
        resolver({
          [key1]: `a`,
          [key2]: `b`,
          [key3]: `c`,
        })
      ).toEqual([
        {
          name: key1,
          query: `@media (min-width: 500em)`,
          value: `a`,
        },
        {
          name: key2,
          query: `@media (min-width: 900em)`,
          value: `b`,
        },
        {
          name: key3,
          query: `@media (min-width: 1200em)`,
          value: `c`,
        },
      ])
    })
  })
})
