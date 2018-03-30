import {
  key1,
  key2,
  key3,
  value1,
  value2,
  value3,
} from '../testHelpers/fixtures/generic'
import breakpointResolver from '../../resolvers/breakpointResolver'

describe(`breakpointResolver()`, () => {
  describe(`with separate args`, () => {
    it(`returns an array of breakpointName and value`, () => {
      const breakpointMap = [[key1, value1], [key2, value2], [key3, value3]]

      const resolver = breakpointResolver(breakpointMap)

      expect(resolver(`a`, `b`, `c`)).toEqual([
        [key1, `a`],
        [key2, `b`],
        [key3, `c`],
      ])
    })
  })

  describe(`with a map`, () => {
    it(`returns an array of breakpointName and value`, () => {
      const breakpointMap = [[key1, value1], [key2, value2], [key3, value3]]

      const resolver = breakpointResolver(breakpointMap)

      expect(
        resolver({
          [key1]: `a`,
          [key2]: `b`,
          [key3]: `c`,
        })
      ).toEqual([[key1, `a`], [key2, `b`], [key3, `c`]])
    })
  })
})
