import cssapi from '../../index'
import {
  breakpoint1,
  breakpoint2,
  breakpoint3,
} from '../testHelpers/fixtures/generic'

describe(`configuration`, () => {
  it(`supports length values for breakpoint map`, () => {
    const breakpoints = [
      [breakpoint1, `25em`],
      [breakpoint2, `50em`],
      [breakpoint3, `75em`],
    ]

    expect(() => cssapi({ breakpoints })).not.toThrow()
  })

  it(`supports unitless values for breakpoint map`, () => {
    const breakpoints = [
      [breakpoint1, 400],
      [breakpoint2, 800],
      [breakpoint3, 1200],
    ]

    expect(() => cssapi({ breakpoints })).not.toThrow()
  })
})
