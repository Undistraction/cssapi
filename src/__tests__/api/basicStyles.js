import { map } from 'ramda'
import dasherize from 'dasherize'
import { key1, key2, key3 } from '../testHelpers/fixtures/generic'
import configureCssApi from '../../index'

describe(`api`, () => {
  const breakpointMap = [[key1, `25em`], [key2, `50em`], [key3, `75em`]]

  // ---------------------------------------------------------------------------
  // Variable Prop Distance Values
  // ---------------------------------------------------------------------------

  const variableDistanceValues = [`margin`, `padding`]

  map(propName => {
    const cssName = dasherize(propName)
    describe(propName, () => {
      const cssApi = configureCssApi(breakpointMap)
      describe(`with explicit lengths`, () => {
        describe(`single values`, () => {
          it(`renders the correct CSS`, () => {
            expect(cssApi[propName](`10px`, `15px`, `20px`)).toEqualMultiline(`
              ${cssName}: 10px;
              @media (min-width: 25em) {
                ${cssName}: 15px;
              }
              @media (min-width: 50em) {
                ${cssName}: 20px;
              }
            `)
          })
        })

        describe(`multi string values`, () => {
          it(`renders the correct CSS`, () => {
            expect(
              cssApi[propName](
                `10px 5px 20px`,
                `15px 10px 40px`,
                `20px 15px 50px`
              )
            ).toEqualMultiline(`
              ${cssName}: 10px 5px 20px;
              @media (min-width: 25em) {
                ${cssName}: 15px 10px 40px;
              }
              @media (min-width: 50em) {
                ${cssName}: 20px 15px 50px;
              }
            `)
          })
        })

        describe(`multi array values`, () => {
          it(`renders the correct CSS`, () => {
            expect(
              cssApi[propName](
                [`10px`, `5px`, `20px`],
                [`15px`, `10px`, `40px`],
                [`20px`, `15px`, `50px`]
              )
            ).toEqualMultiline(`
              ${cssName}: 10px 5px 20px;
              @media (min-width: 25em) {
                ${cssName}: 15px 10px 40px;
              }
              @media (min-width: 50em) {
                ${cssName}: 20px 15px 50px;
              }
            `)
          })
        })
      })

      describe(`with unitless lengths`, () => {
        describe(`single string values`, () => {
          it(`renders the correct CSS`, () => {
            expect(cssApi[propName](`10`, `16`, `20`)).toEqualMultiline(`
            ${cssName}: 0.625rem;
            @media (min-width: 25em) {
              ${cssName}: 1rem;
            }
            @media (min-width: 50em) {
              ${cssName}: 1.25rem;
            }
          `)
          })
        })

        describe(`single numeric values`, () => {
          it(`renders the correct CSS`, () => {
            expect(cssApi[propName](10, 16, 20)).toEqualMultiline(`
              ${cssName}: 0.625rem;
              @media (min-width: 25em) {
                ${cssName}: 1rem;
              }
              @media (min-width: 50em) {
                ${cssName}: 1.25rem;
              }
            `)
          })
        })

        describe(`multi string values`, () => {
          it(`renders the correct CSS`, () => {
            expect(cssApi[propName](`10 20 40`, `16 32 64`, `20 40 80`))
              .toEqualMultiline(`
            ${cssName}: 0.625rem 1.25rem 2.5rem;
            @media (min-width: 25em) {
              ${cssName}: 1rem 2rem 4rem;
            }
            @media (min-width: 50em) {
              ${cssName}: 1.25rem 2.5rem 5rem;
            }
          `)
          })
        })

        describe(`multi numeric values`, () => {
          it(`renders the correct CSS`, () => {
            expect(cssApi[propName]([10, 20, 40], [16, 32, 64], [20, 40, 80]))
              .toEqualMultiline(`
            ${cssName}: 0.625rem 1.25rem 2.5rem;
            @media (min-width: 25em) {
              ${cssName}: 1rem 2rem 4rem;
            }
            @media (min-width: 50em) {
              ${cssName}: 1.25rem 2.5rem 5rem;
            }
          `)
          })
        })
      })
    })
  })(variableDistanceValues)

  // ---------------------------------------------------------------------------
  // Single Prop Distance Values
  // ---------------------------------------------------------------------------
  const singlePropDistanceValues = [
    `marginTop`,
    `marginRight`,
    `marginBottom`,
    `marginLeft`,
    `paddingTop`,
    `paddingRight`,
    `paddingBottom`,
    `paddingLeft`,
    `borderTopWidth`,
    `borderRightWidth`,
    `borderBottomWidth`,
    `borderLeftWidth`,
    `top`,
    `right`,
    `bottom`,
    `left`,
    `width`,
    `minWidth`,
    `maxWidth`,
    `height`,
    `minHeight`,
    `maxHeight`,
  ]

  map(propName => {
    const cssApi = configureCssApi(breakpointMap)
    const cssName = dasherize(propName)
    describe(cssName, () => {
      describe(`with explicit length`, () => {
        it(`renders the correct CSS`, () => {
          expect(cssApi[propName](`10px`, `15px`, `20px`)).toEqualMultiline(`
          ${cssName}: 10px;
          @media (min-width: 25em) {
            ${cssName}: 15px;
          }
          @media (min-width: 50em) {
            ${cssName}: 20px;
          }
        `)
        })
      })
      describe(`with unitless string lengths`, () => {
        it(`renders the correct CSS`, () => {
          expect(cssApi[propName](`10`, `16`, `20`)).toEqualMultiline(`
          ${cssName}: 0.625rem;
          @media (min-width: 25em) {
            ${cssName}: 1rem;
          }
          @media (min-width: 50em) {
            ${cssName}: 1.25rem;
          }
        `)
        })
      })

      describe(`with unitless numbers`, () => {
        it(`renders the correct CSS`, () => {
          expect(cssApi[propName](10, 16, 20)).toEqualMultiline(`
          ${cssName}: 0.625rem;
          @media (min-width: 25em) {
            ${cssName}: 1rem;
          }
          @media (min-width: 50em) {
            ${cssName}: 1.25rem;
          }
        `)
        })
      })
    })
  })(singlePropDistanceValues)

  // ---------------------------------------------------------------------------
  // Border
  // ---------------------------------------------------------------------------

  describe(`border`, () => {
    const cssApi = configureCssApi(breakpointMap)
    describe(`with explicit lengths`, () => {
      describe(`single values`, () => {
        it(`renders the correct CSS`, () => {
          expect(
            cssApi.border(
              `10px solid black`,
              `15px dotted white`,
              `20px dashed red`
            )
          ).toEqualMultiline(`
            border: 10px solid black;
            @media (min-width: 25em) {
              border: 15px dotted white;
            }
            @media (min-width: 50em) {
              border: 20px dashed red;
            }
          `)
        })
      })
    })

    describe(`with unitless lengths`, () => {
      describe(`single values`, () => {
        it(`renders the correct CSS`, () => {
          expect(
            cssApi.border(`10 solid black`, `15 dotted white`, `20 dashed red`)
          ).toEqualMultiline(`
            border: 0.625rem solid black;
            @media (min-width: 25em) {
              border: 0.9375rem dotted white;
            }
            @media (min-width: 50em) {
              border: 1.25rem dashed red;
            }
          `)
        })
      })
    })
  })

  // ---------------------------------------------------------------------------
  // Percentage To Fraction
  // ---------------------------------------------------------------------------

  describe(`opacity`, () => {
    const cssApi = configureCssApi(breakpointMap)
    describe(`with number or string number`, () => {
      it(`leaves values untouched`, () => {
        expect(cssApi.opacity(`1`, `0.5`, `.2`)).toEqualMultiline(`
            opacity: 1;
            @media (min-width: 25em) {
              opacity: 0.5;
            }
            @media (min-width: 50em) {
              opacity: .2;
            }
          `)
      })
    })

    describe(`with percentage values`, () => {
      it(`converts to ratio`, () => {
        expect(cssApi.opacity(`100%`, `50%`, `20%`)).toEqualMultiline(`
            opacity: 1;
            @media (min-width: 25em) {
              opacity: 0.5;
            }
            @media (min-width: 50em) {
              opacity: 0.2;
            }
          `)
      })
    })
  })

  // ---------------------------------------------------------------------------
  // Color Provider
  // ---------------------------------------------------------------------------

  describe(`color`, () => {
    const data = {
      color: {
        red: `#FA0000`,
        green: `#00FA00`,
        blue: `#0000FA`,
      },
    }
    const cssApi = configureCssApi(breakpointMap, data)

    it(`ignores explicit colors`, () => {
      expect(cssApi.color(`#FF0000`)).toEqual(`color: #FF0000;`)
      expect(cssApi.color(`#FF0`)).toEqual(`color: #FF0;`)
      expect(cssApi.color(`rgb(255, 15, 55)`)).toEqual(
        `color: rgb(255, 15, 55);`
      )
      expect(cssApi.color(`rgba(255, 15, 55, 0.5)`)).toEqual(
        `color: rgba(255, 15, 55, 0.5);`
      )
    })

    it(`looks up other colors`, () => {
      expect(cssApi.color(`red`)).toEqual(`color: #FA0000;`)
      expect(cssApi.color(`green`)).toEqual(`color: #00FA00;`)
      expect(cssApi.color(`blue`)).toEqual(`color: #0000FA;`)
    })
  })
})
