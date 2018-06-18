import cssapi from '../../index'
import {
  breakpoint1,
  breakpoint2,
  breakpoint3,
} from '../testHelpers/fixtures/generic'

describe(`mq()`, () => {
  const breakpointMap = [
    [breakpoint1, `25em`],
    [breakpoint2, `50em`],
    [breakpoint3, `75em`],
  ]

  const cssApi = cssapi({
    breakpoints: breakpointMap,
  })

  it(`doesn't wrap default breakpoint`, () => {
    expect(
      cssApi.mq(`default`)({
        margin: `1ru`,
        padding: `2ru`,
      })
    ).toEqualMultiline(`
        margin: 1.25rem;
        padding: 2.5rem;
    `)
  })

  it(`wraps middle breakpoint`, () => {
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
  })

  describe(`with modifiers and offsets`, () => {
    describe(`with <`, () => {
      it(`renders`, () => {
        expect(
          cssApi.mq(`<breakpoint1`)({
            margin: `1ru`,
            padding: `2ru`,
          })
        ).toEqualMultiline(`
            @media (max-width: 24.99em) {
              margin: 1.25rem;
              padding: 2.5rem;
            }
          `)
      })
    })
    describe(`with >`, () => {
      it(`renders`, () => {
        expect(
          cssApi.mq(`>breakpoint1`)({
            margin: `1ru`,
            padding: `2ru`,
          })
        ).toEqualMultiline(`
            @media (min-width: 25em) {
              margin: 1.25rem;
              padding: 2.5rem;
            }
          `)
      })
    })

    describe(`with @`, () => {
      it(`renders`, () => {
        expect(
          cssApi.mq(`@breakpoint1`)({
            margin: `1ru`,
            padding: `2ru`,
          })
        ).toEqualMultiline(`
            @media (min-width: 25em) and (max-width: 49.99em) {
              margin: 1.25rem;
              padding: 2.5rem;
            }
          `)
      })
    })

    describe(`with range and offsets`, () => {
      it(`renders`, () => {
        expect(
          cssApi.mq(`>breakpoint1+50<breakpoint3-100`)({
            margin: `1ru`,
            padding: `2ru`,
          })
        ).toEqualMultiline(`
            @media (min-width: 28.125em) and (max-width: 68.74em) {
              margin: 1.25rem;
              padding: 2.5rem;
            }
          `)
      })
    })
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
