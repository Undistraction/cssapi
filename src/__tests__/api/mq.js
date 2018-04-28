import {
  breakpoint1,
  breakpoint2,
  breakpoint3,
} from '../testHelpers/fixtures/generic'
import configureCssApi from '../../index'

describe(`mq()`, () => {
  const breakpointMap = [
    [breakpoint1, `25em`],
    [breakpoint2, `50em`],
    [breakpoint3, `75em`],
  ]

  const cssApi = configureCssApi({
    breakpoints: breakpointMap,
  })

  it(`wraps declarations in supplied breakpoint`, () => {
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
      cssApi.mq(breakpoint2)({
        margin: `1ru`,
        padding: `2ru`,
      })
    ).toEqualMultiline(`
      @media (min-width: 50em) {
        margin: 1.25rem;
        padding: 2.5rem;
      }
    `)
  })

  it(`throws if multiple values are supplied for a declaration`, () => {
    expect(() =>
      cssApi.mq(breakpoint2)({
        margin: [10, 20],
      })
    ).toThrow(
      `[cssapi] api.mq() When using the mq() helper you must supply only a single decaration value but you supplied: [10,20]`
    )
  })

  it(`throws if an object is supplied for a  declaration`, () => {
    expect(() =>
      cssApi.mq(breakpoint2)({
        margin: {
          [breakpoint1]: 10,
        },
      })
    ).toThrow(
      `[cssapi] api.mq() When using the mq() helper you must supply only a single decaration value but you supplied: {"breakpoint1":10}`
    )
  })
})
