import { map } from 'ramda'
import dasherize from 'dasherize'
import { key1, key2, key3 } from '../testHelpers/fixtures/generic'
import configureCssApi from '../../index'

describe(`styles`, () => {
  const breakpointMap = [[key1, 400], [key2, 800], [key3, 1200]]
  const colorData = {
    color: {
      red: `#FA0000`,
      green: `#00FA00`,
      blue: `#0000FA`,
    },
  }
  const fontData = {
    font: {
      Alpha: `alpha-family`,
      Beta: `beta-family`,
      Charlie: `charlie-family`,
    },
  }

  const scaleData = {
    scale: {
      small: 12,
      medium: 16,
      large: 22,
    },
  }

  // ---------------------------------------------------------------------------
  // Variable Prop Distance Values
  // ---------------------------------------------------------------------------

  const variableDistanceValues = [`margin`, `padding`]

  map(propName => {
    const cssName = dasherize(propName)
    describe(propName, () => {
      describe(`with explicit lengths`, () => {
        const cssApi = configureCssApi({ breakpoints: breakpointMap })
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
        const cssApi = configureCssApi({ breakpoints: breakpointMap })
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

        describe(`multi values`, () => {
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

      describe(`with ru lengths`, () => {
        const cssApi = configureCssApi({ breakpoints: breakpointMap })
        describe(`single values`, () => {
          it(`renders the correct CSS`, () => {
            expect(cssApi[propName](`1ru`, `2ru`, `0.5ru`)).toEqualMultiline(`
            ${cssName}: 0.625rem;
            @media (min-width: 25em) {
              ${cssName}: 1.25rem;
            }
            @media (min-width: 50em) {
              ${cssName}: 0.3125rem;
            }
          `)
          })
        })
        describe(`multi values`, () => {
          it(`renders the correct CSS`, () => {
            expect(
              cssApi[propName](`1ru 2ru 0.5ru`, `2ru 4ru 1ru`, `4ru 8ru 2ru`)
            ).toEqualMultiline(`
            ${cssName}: 0.625rem 1.25rem 0.3125rem;
            @media (min-width: 25em) {
              ${cssName}: 1.25rem 2.5rem 0.625rem;
            }
            @media (min-width: 50em) {
              ${cssName}: 2.5rem 5rem 1.25rem;
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
    const cssApi = configureCssApi({ breakpoints: breakpointMap })
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

      describe(`with ru lengths`, () => {
        it(`renders the correct CSS`, () => {
          expect(cssApi[propName](`1ru`, `2ru`, `0.5ru`)).toEqualMultiline(`
            ${cssName}: 0.625rem;
            @media (min-width: 25em) {
              ${cssName}: 1.25rem;
            }
            @media (min-width: 50em) {
              ${cssName}: 0.3125rem;
            }
          `)
        })
      })
    })
  })(singlePropDistanceValues)

  // ---------------------------------------------------------------------------
  // Border / Outline
  // ---------------------------------------------------------------------------

  map(propName => {
    const cssApi = configureCssApi({
      breakpoints: breakpointMap,
      data: {
        ...colorData,
      },
    })
    const cssName = dasherize(propName)
    describe(cssName, () => {
      describe(`with explicit lengths`, () => {
        describe(`single values`, () => {
          it(`renders the correct CSS`, () => {
            expect(
              cssApi[propName](
                `10px solid red`,
                `15px dotted green`,
                `20px dashed blue`
              )
            ).toEqualMultiline(`
            ${cssName}: 10px solid #FA0000;
            @media (min-width: 25em) {
              ${cssName}: 15px dotted #00FA00;
            }
            @media (min-width: 50em) {
              ${cssName}: 20px dashed #0000FA;
            }
          `)
          })
        })
      })

      describe(`with unitless lengths`, () => {
        it(`renders the correct CSS`, () => {
          expect(
            cssApi[propName](
              `10 solid red`,
              `15 dotted green`,
              `20 dashed blue`
            )
          ).toEqualMultiline(`
            ${cssName}: 0.625rem solid #FA0000;
            @media (min-width: 25em) {
              ${cssName}: 0.9375rem dotted #00FA00;
            }
            @media (min-width: 50em) {
              ${cssName}: 1.25rem dashed #0000FA;
            }
          `)
        })
      })

      describe(`with ru lengths`, () => {
        it(`renders the correct CSS`, () => {
          expect(
            cssApi[propName](
              `1ru solid red`,
              `2ru dotted green`,
              `3ru dashed blue`
            )
          ).toEqualMultiline(`
            ${cssName}: 0.625rem solid #FA0000;
            @media (min-width: 25em) {
              ${cssName}: 1.25rem dotted #00FA00;
            }
            @media (min-width: 50em) {
              ${cssName}: 1.875rem dashed #0000FA;
            }
          `)
        })
      })
    })
  })([
    `border`,
    `borderTop`,
    `borderRight`,
    `borderBottom`,
    `borderLeft`,
    `outline`,
  ])

  // ---------------------------------------------------------------------------
  // Percentage To Fraction
  // ---------------------------------------------------------------------------

  describe(`opacity`, () => {
    const cssApi = configureCssApi({ breakpoints: breakpointMap })
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
    const cssApi = configureCssApi({
      breakpoints: breakpointMap,
      data: {
        ...colorData,
      },
    })

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

    it(`looks up colors`, () => {
      expect(cssApi.color(`red`)).toEqual(`color: #FA0000;`)
      expect(cssApi.color(`green`)).toEqual(`color: #00FA00;`)
      expect(cssApi.color(`blue`)).toEqual(`color: #0000FA;`)
    })
  })

  // ---------------------------------------------------------------------------
  // Font-family
  // ---------------------------------------------------------------------------

  describe(`font-family`, () => {
    const cssApi = configureCssApi({
      breakpoints: breakpointMap,
      data: {
        ...fontData,
      },
    })

    it(`ignores generic values`, () => {
      const result = cssApi.fontFamily(`sans-serif`)
      expect(result).toEqual(`font-family: sans-serif;`)
    })

    it(`looks up font names`, () => {
      const result = cssApi.fontFamily(`Alpha`)
      expect(result).toEqual(`font-family: alpha-family;`)
    })
  })

  // ---------------------------------------------------------------------------
  // Font-size
  // ---------------------------------------------------------------------------

  describe(`font-size`, () => {
    const cssApi = configureCssApi({
      breakpoints: breakpointMap,
      data: {
        ...scaleData,
      },
    })

    it(`ignores generic values`, () => {
      const result = cssApi.fontSize(`16px`)
      expect(result).toEqual(`font-size: 16px;`)
    })

    it(`transforms unitless values to rems`, () => {
      const result = cssApi.fontSize(16)
      expect(result).toEqual(`font-size: 1rem;`)
    })

    it(`looks up font names`, () => {
      const result = cssApi.fontSize(`small`)
      expect(result).toEqual(`font-size: 0.75rem;`)
    })
  })

  // ---------------------------------------------------------------------------
  // Flex
  // ---------------------------------------------------------------------------

  describe(`flex`, () => {
    const cssApi = configureCssApi({
      breakpoints: breakpointMap,
    })

    describe(`generic values`, () => {
      it(`ignores single generic argument`, () => {
        const result = cssApi.flex(1)
        expect(result).toEqual(`flex: 1;`)
      })

      it(`ignores two generic arguments`, () => {
        const result = cssApi.flex(`1 20px`)
        expect(result).toEqual(`flex: 1 20px;`)
      })

      it(`ignores three generic arguments`, () => {
        const result = cssApi.flex(`1 2 20px`)
        expect(result).toEqual(`flex: 1 2 20px;`)
      })
    })

    describe(`unitless value in position`, () => {
      describe(`one arg > 5`, () => {
        it(`transforms unitless value > 5`, () => {
          const result = cssApi.flex(`16`)
          expect(result).toEqual(`flex: 1rem;`)
        })
      })

      describe(`one arg <= 5`, () => {
        it(`doesn't transform uniless value <= to 5`, () => {
          const result = cssApi.flex(`5`)
          expect(result).toEqual(`flex: 5;`)
        })
      })

      describe(`second arg`, () => {
        it(`transforms unitless value > 5 in second position `, () => {
          const result = cssApi.flex(`1 16`)
          expect(result).toEqual(`flex: 1 1rem;`)
        })
      })

      describe(`second arg`, () => {
        it(`transforms unitless value > 5 in third position `, () => {
          const result = cssApi.flex(`1 3 16`)
          expect(result).toEqual(`flex: 1 3 1rem;`)
        })
      })
    })
  })
})
