import { key1, key2, key3 } from '../testHelpers/fixtures/generic'
import defaultBreakpointMapProvider from '../../providers/defaultBreakpointMapProvider'

describe(`defaultBreakpointMapProvider`, () => {
  it(`replaces width values with queries`, () => {
    const breakpointMap = [[key1, `25em`], [key2, `50em`], [key3, `75em`]]
    const expected = [
      [key1, `@media (min-width: 25em)`],
      [key2, `@media (min-width: 50em)`],
      [key3, `@media (min-width: 75em)`],
    ]
    const result = defaultBreakpointMapProvider(breakpointMap)
    expect(result).toEqual(expected)
  })
})
