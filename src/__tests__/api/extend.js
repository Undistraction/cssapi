import configureApi from '../../index'
import {
  breakpoint1,
  breakpoint2,
  breakpoint3,
} from '../testHelpers/fixtures/generic'

describe(`extend()`, () => {
  it(`creates a new api based on old`, () => {
    const firstBreakpointMap = [
      [breakpoint1, `25em`],
      [breakpoint2, `50em`],
      [breakpoint3, `75em`],
    ]

    const extendedBreakpointMap = [
      [breakpoint1, `12.5em`],
      [breakpoint2, `25em`],
      [breakpoint3, `37.5em`],
    ]

    const cssApi = configureApi({
      breakpoints: firstBreakpointMap,
    })

    const extendedCssApi = cssApi.extend({
      breakpoints: extendedBreakpointMap,
      data: {
        baseFontSize: 10,
      },
    })

    expect(
      cssApi.mq(breakpoint1)({
        margin: `1ru`,
        padding: `2ru`,
      })
    ).toEqualMultiline(`
      @media (min-width: 25em) {
        margin: 1.25rem;
        padding: 2.5rem;
      }
    `)

    expect(
      extendedCssApi.mq(breakpoint1)({
        margin: `1ru`,
        padding: `2ru`,
      })
    ).toEqualMultiline(`
      @media (min-width: 12.5em) {
        margin: 2rem;
        padding: 4rem;
      }
    `)
  })
})
