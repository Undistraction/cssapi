import configureCssApi from '../../index'
import { scope } from '../../utils/scope'
import {
  breakpoint1,
  breakpoint2,
  breakpoint3,
  key1,
} from '../testHelpers/fixtures/generic'

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

  it(`throws if prop name is not valid`, () => {
    expect(() => cssApi({ [key1]: `` })).toThrow(
      `[cssapi] api() API doesn't support a property named 'key1'`
    )
  })

  it(`batches mulitple api functions into media queries`, () => {
    const result = cssApi({
      padding: `1rem`,
      margin: [`1ru`, `2ru`, `3ru`],
      borderWidth: [scope`1ru`],
      color: [`c:red`, `c:green`, `c:blue`],
    })

    const expected = `
      padding: 1rem;
      margin: 1.25rem;
      border-width: 1.25rem;
      color: #FA0000;
      
      @media (min-width: 25em) and (max-width: 49.99em) {
        margin: 3rem;
        border-width: 1.5rem;
        color: #00FA00;
      }
      
      @media (min-width: 50em) {
        margin: 4.5rem;
        color: #0000FA;
      }
      
      @media (min-width: 50em) and (max-width: 74.99em) {
        border-width: 1.5rem;
      }
      
      @media (min-width: 75em) {
        border-width: 1.75rem;
      }`

    expect(result).toEqualMultiline(expected)
  })
})
