import { map } from 'ramda'
import dasherize from 'dasherize'
import {
  key1,
  key2,
  key3,
  key4,
  value1,
  value2,
  value3,
  value4,
  breakpoint1,
  breakpoint2,
  breakpoint3,
  key5,
} from '../testHelpers/fixtures/generic'
import configureCssApi from '../../index'

describe(`styles`, () => {
  const breakpointMap = [
    [breakpoint1, 400],
    [breakpoint2, 800],
    [breakpoint3, 1200],
  ]
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

  const scopedRhythm = {
    rhythm: 20,
    scopes: [
      {
        resolve: [breakpoint1, breakpoint2],
        data: {
          rhythm: 24,
        },
      },
    ],
  }

  const scopedScale = {
    ...scaleData,
    scopes: [
      {
        resolve: [breakpoint1, breakpoint2],
        data: {
          scale: {
            small: 16,
            medium: 22,
            large: 28,
          },
        },
      },
    ],
  }

  // ---------------------------------------------------------------------------
  // Errors
  // ---------------------------------------------------------------------------

  it(`throws if no items have been defined for data node named 'large`, () => {
    const cssApi = configureCssApi({ breakpoints: breakpointMap })
    expect(() => cssApi.fontSize(`large`)).toThrow(
      `[cssapi] (config.data) No item has been defined for data.scale named 'large'`
    )
  })

  it(`throws if no breakpoints have been defined`, () => {
    const cssApi = configureCssApi()
    expect(() => cssApi.padding([10, 20])).toThrow(
      `[cssapi] (config.breakpoints) Couldn't resolve breakpoint at index 0 with args: [[10,20]]`
    )
  })

  // ---------------------------------------------------------------------------
  // Scope
  // ---------------------------------------------------------------------------

  describe(`scope`, () => {
    describe(`with scoped value`, () => {
      const cssApi = configureCssApi({
        breakpoints: breakpointMap,
        data: {
          ...scopedRhythm,
        },
      })

      describe(`default breakpoint`, () => {
        it(`resolves the default value`, () => {
          expect(cssApi.padding(`2ru`)).toEqual(`padding: 2.5rem;`)
        })
      })

      describe(`medium breakpoint`, () => {
        it(`resolves to the scoped value`, () => {
          expect(cssApi.padding(`2ru`, `2ru`)).toEqualMultiline(`
          padding: 2.5rem;
          
          @media (min-width: 25em) {
            padding: 3rem;
          }`)
        })
      })

      describe(`large breakpoint`, () => {
        it(`resolves to the scoped value`, () => {
          expect(cssApi.padding(`2ru`, `1ru`, `2ru`)).toEqualMultiline(`
            padding: 2.5rem;
            
            @media (min-width: 25em) {
              padding: 1.5rem;
            }
            
            @media (min-width: 50em) {
              padding: 3rem;
            }`)
        })
      })
    })

    describe(`with scoped object`, () => {
      const cssApi = configureCssApi({
        breakpoints: breakpointMap,
        data: {
          ...scopedScale,
        },
      })

      describe(`default breakpoint`, () => {
        it(`resolves the default value`, () => {
          expect(cssApi.fontSize(`medium`)).toEqual(`font-size: 1rem;`)
        })
      })

      describe(`medium breakpoint`, () => {
        it(`resolves to the scoped value`, () => {
          expect(cssApi.fontSize(`medium`, `medium`)).toEqualMultiline(`
          font-size: 1rem;
          
          @media (min-width: 25em) {
            font-size: 1.375rem;
          }`)
        })
      })
    })
  })

  // ---------------------------------------------------------------------------
  // Property Expansion
  // ---------------------------------------------------------------------------

  describe(`expansion of data props`, () => {
    describe(`unscoped`, () => {
      const cssApi = configureCssApi({
        breakpoints: breakpointMap,
        data: {
          color: {
            [key1]: value1,
            [key2]: value2,
            [key3]: `#{key1}`,
            [key4]: `#{key2}`,
            [key5]: `linear-gradient(#{key1}, #{key2})`,
          },
        },
      })

      it(`expands tokens`, () => {
        expect(cssApi.color(key1)).toEqual(`color: ${value1};`)
        expect(cssApi.color(key2)).toEqual(`color: ${value2};`)
        expect(cssApi.color(key3)).toEqual(`color: ${value1};`)
        expect(cssApi.color(key4)).toEqual(`color: ${value2};`)
        expect(cssApi.backgroundColor(key5)).toEqual(
          `background-color: linear-gradient(value1, value2);`
        )
      })
    })

    describe(`scoped`, () => {
      const cssApi = configureCssApi({
        breakpoints: breakpointMap,
        data: {
          color: {
            [key1]: value1,
            [key2]: value2,
            [key3]: value3,
            [key4]: value4,
          },
          scopes: [
            {
              resolve: [breakpoint1],
              data: {
                color: {
                  [key1]: `#{key3}`,
                  [key2]: `#{key4}`,
                },
              },
            },
          ],
        },
      })

      it(`expands tokens`, () => {
        expect(cssApi.color(key1, key1)).toEqualMultiline(`
          color: ${value1};
          
          @media (min-width: 25em) {
            color: ${value3};
          }`)
        expect(cssApi.color(key2, key2)).toEqualMultiline(`
          color: ${value2};
          
          @media (min-width: 25em) {
            color: ${value4};
          }`)
      })
    })
  })

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
            ${cssName}: 1.25rem;
            
            @media (min-width: 25em) {
              ${cssName}: 2.5rem;
            }
            
            @media (min-width: 50em) {
              ${cssName}: 0.625rem;
            }
          `)
          })
        })
        describe(`multi values`, () => {
          it(`renders the correct CSS`, () => {
            expect(
              cssApi[propName](`1ru 2ru 0.5ru`, `2ru 4ru 1ru`, `4ru 8ru 2ru`)
            ).toEqualMultiline(`
            ${cssName}: 1.25rem 2.5rem 0.625rem;
            
            @media (min-width: 25em) {
              ${cssName}: 2.5rem 5rem 1.25rem;
            }
            
            @media (min-width: 50em) {
              ${cssName}: 5rem 10rem 2.5rem;
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
    `backgroundSize`,
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
            }`)
        })
      })

      describe(`with ru lengths`, () => {
        it(`renders the correct CSS`, () => {
          expect(cssApi[propName](`1ru`, `2ru`, `0.5ru`)).toEqualMultiline(`
            ${cssName}: 1.25rem;
            
            @media (min-width: 25em) {
              ${cssName}: 2.5rem;
            }
            
            @media (min-width: 50em) {
              ${cssName}: 0.625rem;
            }
          `)
        })
      })
    })
  })(singlePropDistanceValues)

  // ---------------------------------------------------------------------------
  // Border / Outline
  // ---------------------------------------------------------------------------

  const borderAndOutlineValues = [
    `border`,
    `borderTop`,
    `borderRight`,
    `borderBottom`,
    `borderLeft`,
    `outline`,
  ]

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
            ${cssName}: 1.25rem solid #FA0000;
            
            @media (min-width: 25em) {
              ${cssName}: 2.5rem dotted #00FA00;
            }
            
            @media (min-width: 50em) {
              ${cssName}: 3.75rem dashed #0000FA;
            }
          `)
        })
      })
    })
  })(borderAndOutlineValues)

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

  map(
    propName => {
      const cssName = dasherize(propName)
      describe(cssName, () => {
        const cssApi = configureCssApi({
          breakpoints: breakpointMap,
          data: {
            ...colorData,
          },
        })

        it(`ignores explicit colors`, () => {
          expect(cssApi[propName](`#FF0000`)).toEqual(`${cssName}: #FF0000;`)
          expect(cssApi[propName](`#FF0`)).toEqual(`${cssName}: #FF0;`)
          expect(cssApi[propName](`rgb(255, 15, 55)`)).toEqual(
            `${cssName}: rgb(255, 15, 55);`
          )
          expect(cssApi[propName](`rgba(255, 15, 55, 0.5)`)).toEqual(
            `${cssName}: rgba(255, 15, 55, 0.5);`
          )
        })

        it(`looks up colors`, () => {
          expect(cssApi[propName](`red`)).toEqual(`${cssName}: #FA0000;`)
          expect(cssApi[propName](`green`)).toEqual(`${cssName}: #00FA00;`)
          expect(cssApi[propName](`blue`)).toEqual(`${cssName}: #0000FA;`)
        })
      })
    },
    [`color`, `backgroundColor`]
  )

  // ---------------------------------------------------------------------------
  // Background-attachment
  // ---------------------------------------------------------------------------

  describe(`backgroundAttachment`, () => {
    const cssApi = configureCssApi({
      breakpoints: breakpointMap,
    })

    it(`returns value unchanged`, () => {
      expect(cssApi.backgroundAttachment(`local, scroll`)).toEqual(
        `background-attachment: local, scroll;`
      )
    })
  })

  // ---------------------------------------------------------------------------
  // Background-image
  // ---------------------------------------------------------------------------

  describe(`backgroundImage`, () => {
    const cssApi = configureCssApi({
      breakpoints: breakpointMap,
      data: {
        ...colorData,
      },
    })

    it(`returns single url value unchanged`, () => {
      expect(cssApi.backgroundImage(`url(../../example.jpg)`)).toEqual(
        `background-image: url(../../example.jpg);`
      )
    })

    it(`returns multiple group values unchanged`, () => {
      expect(
        cssApi.backgroundImage(
          `url(../../example1.jpg), linear-gradient(0.25turn, #3f87a6, #ebf8e1, #f69d3c), radial-gradient(#e66465, #9198e5)`
        )
      ).toEqual(
        `background-image: url(../../example1.jpg), linear-gradient(0.25turn, #3f87a6, #ebf8e1, #f69d3c), radial-gradient(#e66465, #9198e5);`
      )
    })

    it(`handles colors mixed with groups`, () => {
      expect(
        cssApi.backgroundImage(
          `linear-gradient(0.25turn, red, green, blue), radial-gradient(red, blue), red`
        )
      ).toEqual(
        `background-image: linear-gradient(0.25turn, #FA0000, #00FA00, #0000FA), radial-gradient(#FA0000, #0000FA), #FA0000;`
      )
    })

    it(`transforms colour values inside gradients`, () => {
      expect(
        cssApi.backgroundImage(
          `linear-gradient(0.25turn, red, green, blue), radial-gradient(red, blue)`
        )
      ).toEqual(
        `background-image: linear-gradient(0.25turn, #FA0000, #00FA00, #0000FA), radial-gradient(#FA0000, #0000FA);`
      )
    })
  })

  // ---------------------------------------------------------------------------
  // Background
  // ---------------------------------------------------------------------------

  describe(`background`, () => {
    const cssApi = configureCssApi({
      breakpoints: breakpointMap,
      data: {
        ...colorData,
      },
    })

    it(`returns single url value unchanged`, () => {
      expect(cssApi.background(`url(../../example.jpg) repeat-y`)).toEqual(
        `background: url(../../example.jpg) repeat-y;`
      )
    })

    it(`returns multiple group values unchanged`, () => {
      expect(
        cssApi.background(
          `url(../../example1.jpg), linear-gradient(0.25turn, #3f87a6, #ebf8e1, #f69d3c), radial-gradient(#e66465, #9198e5)`
        )
      ).toEqual(
        `background: url(../../example1.jpg), linear-gradient(0.25turn, #3f87a6, #ebf8e1, #f69d3c), radial-gradient(#e66465, #9198e5);`
      )
    })

    it(`handles colors mixed with groups`, () => {
      expect(
        cssApi.background(
          `linear-gradient(0.25turn, red, green, blue), radial-gradient(red, blue), red`
        )
      ).toEqual(
        `background: linear-gradient(0.25turn, #FA0000, #00FA00, #0000FA), radial-gradient(#FA0000, #0000FA), #FA0000;`
      )
    })

    it(`transforms colour values inside gradients`, () => {
      expect(
        cssApi.background(
          `linear-gradient(0.25turn, red, green, blue), radial-gradient(red, blue)`
        )
      ).toEqual(
        `background: linear-gradient(0.25turn, #FA0000, #00FA00, #0000FA), radial-gradient(#FA0000, #0000FA);`
      )
    })
  })

  // ---------------------------------------------------------------------------
  // Background-position
  // ---------------------------------------------------------------------------

  map(
    propName => {
      describe(propName, () => {
        const cssName = dasherize(propName)
        const cssApi = configureCssApi({
          breakpoints: breakpointMap,
        })

        it(`ignores explicit lengths`, () => {
          expect(cssApi[propName](`top left`)).toEqual(`${cssName}: top left;`)
          expect(cssApi[propName](`20px 5rem`)).toEqual(
            `${cssName}: 20px 5rem;`
          )
          expect(cssApi[propName](`20% bottom`)).toEqual(
            `${cssName}: 20% bottom;`
          )
        })

        it(`transforms unitless values`, () => {
          expect(cssApi[propName](`top 16`)).toEqual(`${cssName}: top 1rem;`)
          expect(cssApi[propName](`bottom 16 top 32`)).toEqual(
            `${cssName}: bottom 1rem top 2rem;`
          )
        })

        it(`transforms rhythm units`, () => {
          expect(cssApi[propName](`top 1ru`)).toEqual(
            `${cssName}: top 1.25rem;`
          )
          expect(cssApi[propName](`bottom 1ru top 2ru`)).toEqual(
            `${cssName}: bottom 1.25rem top 2.5rem;`
          )
        })
      })
    },
    [`backgroundPosition`, `backgroundPositionX`, `backgroundPositionY`]
  )

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

    it(`transforms rhythm units to rems`, () => {
      const result = cssApi.fontSize(`1ru`)
      expect(result).toEqual(`font-size: 1.25rem;`)
    })

    it(`looks up scale names`, () => {
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

  // ---------------------------------------------------------------------------
  // Box-shadow
  // ---------------------------------------------------------------------------

  describe(`box-shadow`, () => {
    const cssApi = configureCssApi({
      breakpoints: breakpointMap,
      data: {
        ...colorData,
      },
    })

    it(`returns single boxshadow with values unchanged`, () => {
      expect(cssApi.boxShadow(`2px 2px 2px 1px rgba(0, 0, 0, 0.2)`)).toEqual(
        `box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);`
      )
    })

    it(`replaces color names`, () => {
      expect(cssApi.boxShadow(`2px 2px 2px 1px red`)).toEqual(
        `box-shadow: 2px 2px 2px 1px #FA0000;`
      )
    })

    it(`replaces unitless distances`, () => {
      expect(cssApi.boxShadow(`2 2 2 1 red`)).toEqual(
        `box-shadow: 0.125rem 0.125rem 0.125rem 0.0625rem #FA0000;`
      )
    })

    it(`replaces rhythm units distances`, () => {
      expect(cssApi.boxShadow(`2ru 2ru 2ru 1ru red`)).toEqual(
        `box-shadow: 2.5rem 2.5rem 2.5rem 1.25rem #FA0000;`
      )
    })

    it(`returns handles multiple boxshadows with values unchanged`, () => {
      expect(
        cssApi.boxShadow(
          `2px 2px 2px 1px rgba(0, 0, 0, 0.2), 2px 2px 2px 1px #FF0`
        )
      ).toEqual(
        `box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2), 2px 2px 2px 1px #FF0;`
      )
    })
  })
})
