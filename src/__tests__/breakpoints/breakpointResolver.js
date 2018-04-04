import {
  key1,
  key2,
  key3,
  value1,
  value2,
  value3,
  key4,
} from '../testHelpers/fixtures/generic'
import breakpointResolver from '../../breakpoints/breakpointResolver'

describe(`breakpointResolver()`, () => {
  const breakpointMap = [[key1, value1], [key2, value2], [key3, value3]]
  const resolver = breakpointResolver(breakpointMap)

  describe(`missing breakpoints`, () => {
    it(`throws when no breakpoint exists for index`, () => {
      expect(() => resolver(`a`, `b`, `c`, `d`)).toThrow(
        `Couldn't resolve breakpoint for args: ["a","b","c","d"]`
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
        `Couldn't resolve breakpoint for args: [{"key1":"a","key2":"b","key3":"c","key4":"d"}]`
      )
    })
  })

  describe(`with separate args`, () => {
    it(`returns an array of breakpointName and value`, () => {
      expect(resolver(`a`, `b`, `c`)).toEqual([
        [key1, `a`],
        [key2, `b`],
        [key3, `c`],
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
      ).toEqual([[value1, `a`], [value2, `b`], [value3, `c`]])
    })
  })
})
