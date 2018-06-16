import breakpointProvider from '../../breakpoints/breakpointProvider'
import {
  key1,
  key2,
  key3,
  value1,
  value2,
  value3,
} from '../testHelpers/fixtures/generic'

describe(`breakpointProvider`, () => {
  describe(`with length values`, () => {
    const breakpointMap = [[key1, `25em`], [key2, `50em`], [key3, `75em`]]
    const configuredProvider = breakpointProvider(breakpointMap)
    describe(`byIndex()`, () => {
      it(`returns an array of name, value pairs`, () => {
        const expected = [
          {
            name: key1,
            query: `@media (min-width: 25em) and (max-width: 49.99em)`,
            value: value1,
          },
          {
            name: key2,
            query: `@media (min-width: 50em) and (max-width: 74.99em)`,
            value: value2,
          },
          { name: key3, query: `@media (min-width: 75em)`, value: value3 },
        ]

        expect(configuredProvider.byIndex([value1, value2, value3])).toEqual(
          expected
        )
      })
    })

    describe(`byName()`, () => {
      it(`returns an array of name, value pairs`, () => {
        const expected = [
          { name: key1, query: `@media (min-width: 25em)`, value: value1 },
          { name: key2, query: `@media (min-width: 50em)`, value: value2 },
          { name: key3, query: `@media (min-width: 75em)`, value: value3 },
        ]
        expect(
          configuredProvider.byName({
            [key1]: value1,
            [key2]: value2,
            [key3]: value3,
          })
        ).toEqual(expected)
      })
    })
  })

  // Removing this becuase it prevents dynamic manipulation of values
  // describe(`with queries`, () => {
  //   const breakpointMap = [
  //     [key1, `@media (min-width: 25em)`],
  //     [key2, `@media (min-width: 50em)`],
  //     [key3, `@media (min-width: 75em)`],
  //   ]
  //   const configuredProvider = breakpointProvider(breakpointMap)
  //   describe(`byIndex()`, () => {
  //     it(`returns an array of name, value pairs`, () => {
  //       const expected = [
  //         { name: key1, query: `@media (min-width: 25em)`, value: value1 },
  //         { name: key2, query: `@media (min-width: 50em)`, value: value2 },
  //         { name: key3, query: `@media (min-width: 75em)`, value: value3 },
  //       ]

  //       expect(configuredProvider.byIndex([value1, value2, value3])).toEqual(
  //         expected
  //       )
  //     })
  //   })

  //   describe(`byName()`, () => {
  //     it(`returns an array of name, value pairs`, () => {
  //       const expected = [
  //         { name: key1, query: `@media (min-width: 25em)`, value: value1 },
  //         { name: key2, query: `@media (min-width: 50em)`, value: value2 },
  //         { name: key3, query: `@media (min-width: 75em)`, value: value3 },
  //       ]

  //       expect(
  //         configuredProvider.byName({
  //           [key1]: value1,
  //           [key2]: value2,
  //           [key3]: value3,
  //         })
  //       ).toEqual(expected)
  //     })
  //   })
  // })
})
