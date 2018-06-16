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

    console.log(cssApi.mq)

    const extendedCssApi = cssApi.extend({
      breakpoints: extendedBreakpointMap,
    })

    expect(
      cssApi.mq(`default`)({
        margin: `1ru`,
        padding: `2ru`,
      })
    ).toEqualMultiline(`
        margin: 1.25rem;
        padding: 2.5rem;
    `)

    expect(
      extendedCssApi.mq(`default`)({
        margin: `1ru`,
        padding: `2ru`,
      })
    ).toEqualMultiline(`
        margin: 0.625rem;
        padding: 1.25rem;
    `)
  })
})
