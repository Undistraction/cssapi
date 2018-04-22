import {
  breakpoint1,
  breakpoint2,
  breakpoint3,
} from '../testHelpers/fixtures/generic'
import configureCssApi from '../../index'
import { scope } from '../../utils/scope'

describe(`api()`, () => {
  const breakpointMap = [
    [breakpoint1, `25em`],
    [breakpoint2, `50em`],
    [breakpoint3, `75em`],
  ]

  const cssApi = configureCssApi({
    breakpoints: breakpointMap,
    data: {
      color: {
        red: `#FA0000`,
        green: `#00FA00`,
        blue: `#0000FA`,
      },
      rhythm: 20,
      scopes: [
        {
          resolve: [breakpoint1, breakpoint2],
          data: {
            rhythm: 24,
          },
        },
        {
          resolve: [breakpoint3],
          data: {
            rhythm: 28,
          },
        },
      ],
    },
  })

  it(`batches mulitple api functions into media queries`, () => {
    const result = cssApi({
      padding: [`1rem`, `2rem`, `3rem`],
      margin: [`1ru`, `2ru`, `3ru`],
      borderWidth: [scope(`1ru`)],
      color: [`c:red`, `c:green`, `c:blue`],
    })

    const expected = `
      padding: 1rem;
      margin: 1.25rem;
      border-width: 1.25rem;
      color: #FA0000;
      
      @media (min-width: 25em) {
        padding: 2rem;
        margin: 3rem;
        border-width: 1.5rem;
        color: #00FA00;
      }
      
      @media (min-width: 50em) {
        padding: 3rem;
        margin: 4.5rem;
        border-width: 1.5rem;
        color: #0000FA;
      }
      
      @media (min-width: 75em) {
        border-width: 1.75rem;
      }`

    expect(result).toEqualMultiline(expected)
  })
})
