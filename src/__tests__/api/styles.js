import dasherize from 'dasherize'
import { map } from 'ramda'
import configureCssApi from '../../index'
import {
  breakpoint1,
  breakpoint2,
  breakpoint3,
  key1,
  key2,
  key3,
  key4,
  value1,
  value2,
  value3,
  value4,
} from '../testHelpers/fixtures/generic'

describe(`styles`, () => {
  const breakpoints = [
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

  const boxShadowData = {
    boxShadow: {
      small: `31px 21px 43px 0px c:red`,
    },
  }

  const gradientData = {
    gradient: {
      [key1]: `radial-gradient(#FF0, #00F)`,
      [key2]: `linear-gradient(rgb(10, 20, 30), rgba(10,20,30))`,
    },
  }

  const imageData = {
    image: {
      [key1]: `url('../example/alpha.jpg')`,
      [key2]: `url('../example/bravo.jpg')`,
    },
  }

  // ---------------------------------------------------------------------------
  // Errors
  // ---------------------------------------------------------------------------

  it(`throws if no items have been defined for data node named 'large`, () => {
    const cssApi = configureCssApi({ breakpoints })
    expect(() => cssApi({ fontSize: `s:large` })).toThrow(
      `[cssapi] (config.data) No item has been defined for data.scale named 'large'`
    )
  })

  it(`throws for missing breakpoint`, () => {
    const cssApi = configureCssApi()
    expect(() => cssApi({ padding: [10, [10, 20]] })).toThrow(
      `[cssapi] (config.breakpoints) Couldn't resolve breakpoint at index 1 with args: [10,[10,20]]`
    )
  })

  // ---------------------------------------------------------------------------
  // Breakpoints
  // ---------------------------------------------------------------------------

  it(`resolves default breakpoint without supplied breakpoints`, () => {
    const cssApi = configureCssApi()
    expect(cssApi({ padding: `10 20` })).toEqual(`padding: 0.625rem 1.25rem;`)
  })

  // ---------------------------------------------------------------------------
  // Property Expansion
  // ---------------------------------------------------------------------------

  describe(`expansion of data props`, () => {
    describe(`errors`, () => {
      it(`throws when data node is missing`, () => {
        const config = {
          data: {
            color: {
              [key1]: `x:key1`,
            },
          },
        }

        expect(() => configureCssApi(config)).toThrow(
          `[cssapi] (config.data) Unrecognised prefix encountered: 'x'. Available prefixes are: ["lengthUnit","baseFontSize","rhythm","baseline","color","scale","gradient","boxShadow","image","border","c","g","s","d","b","i","f"]`
        )
      })

      it(`throws when data key is missing`, () => {
        const config = {
          data: {
            color: {
              [key1]: `c:key2`,
            },
          },
        }

        expect(() => configureCssApi(config)).toThrow(
          `[cssapi] (config.data) No item has been defined for data.color named 'key2'`
        )
      })
    })

    describe(`unscoped`, () => {
      describe(`own node`, () => {
        const cssApi = configureCssApi({
          breakpoints,
          data: {
            color: {
              [key1]: value1,
              [key2]: value2,
              [key3]: `c:key1`,
              [key4]: `c:key2`,
            },
          },
        })

        it(`expands tokens`, () => {
          expect(cssApi({ color: `c:key1` })).toEqual(`color: ${value1};`)
          expect(cssApi({ color: `c:key2` })).toEqual(`color: ${value2};`)
          expect(cssApi({ color: `c:key3` })).toEqual(`color: ${value1};`)
          expect(cssApi({ color: `c:key4` })).toEqual(`color: ${value2};`)
        })
      })

      describe(`different node`, () => {
        const cssApi = configureCssApi({
          breakpoints,
          data: {
            color: {
              [key1]: value1,
            },
            gradient: {
              [key2]: `linear-gradient(c:key1)`,
            },
          },
        })

        it(`expands tokens`, () => {
          expect(cssApi({ backgroundImage: `g:key2` })).toEqual(
            `background-image: linear-gradient(value1);`
          )
        })
      })
    })

    describe(`scoped`, () => {
      const cssApi = configureCssApi({
        breakpoints,
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
                  [key1]: `c:key3`,
                  [key2]: `c:key4`,
                },
              },
            },
          ],
        },
      })

      it(`expands tokens`, () => {
        expect(cssApi({ color: [`c:key1`, `c:key1`] })).toEqualMultiline(`
          color: ${value1};
          
          @media (min-width: 25em) {
            color: ${value3};
          }`)
        expect(cssApi({ color: [`c:key2`, `c:key2`] })).toEqualMultiline(`
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
        const cssApi = configureCssApi({ breakpoints })
        describe(`single values`, () => {
          it(`renders the correct CSS`, () => {
            expect(cssApi({ [propName]: [`10px`, `15px`, `20px`] }))
              .toEqualMultiline(`
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
              cssApi({
                [propName]: [
                  `10px 5px 20px`,
                  `15px 10px 40px`,
                  `20px 15px 50px`,
                ],
              })
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
              cssApi({
                [propName]: [
                  [`10px 5px 20px`],
                  [`15px 10px 40px`],
                  [`20px 15px 50px`],
                ],
              })
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
        const cssApi = configureCssApi({ breakpoints })
        describe(`single string values`, () => {
          it(`renders the correct CSS`, () => {
            expect(cssApi({ [propName]: [`10`, `16`, `20`] }))
              .toEqualMultiline(`
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
            expect(cssApi({ [propName]: [10, 16, 20] })).toEqualMultiline(`
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
            expect(cssApi({ [propName]: [`10 20 40`, `16 32 64`, `20 40 80`] }))
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
            expect(cssApi({ [propName]: [`10 20 40`, `16 32 64`, `20 40 80`] }))
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
        const cssApi = configureCssApi({ breakpoints })
        describe(`single values`, () => {
          it(`renders the correct CSS`, () => {
            expect(cssApi({ [propName]: [`1ru`, `2ru`, `0.5ru`] }))
              .toEqualMultiline(`
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
              cssApi({
                [propName]: [`1ru 2ru 0.5ru`, `2ru 4ru 1ru`, `4ru 8ru 2ru`],
              })
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
    const cssApi = configureCssApi({ breakpoints })
    const cssName = dasherize(propName)
    describe(cssName, () => {
      describe(`with explicit length`, () => {
        it(`renders the correct CSS`, () => {
          expect(cssApi({ [propName]: [`10px`, `15px`, `20px`] }))
            .toEqualMultiline(`
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
          expect(cssApi({ [propName]: [`10`, `16`, `20`] })).toEqualMultiline(`
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
          expect(cssApi({ [propName]: [10, 16, 20] })).toEqualMultiline(`
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
          expect(cssApi({ [propName]: [`1ru`, `2ru`, `0.5ru`] }))
            .toEqualMultiline(`
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

      describe(`with calc`, () => {
        it(`renders the correct CSS`, () => {
          expect(
            cssApi({
              [propName]: [
                `calc(40% - 1ru)`,
                `calc(50% - 2ru)`,
                `calc(60% - 0.5ru)`,
              ],
            })
          ).toEqualMultiline(`
            ${cssName}: calc(40% - 1.25rem);
            
            @media (min-width: 25em) {
              ${cssName}: calc(50% - 2.5rem);
            }
            
            @media (min-width: 50em) {
              ${cssName}: calc(60% - 0.625rem);
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
      breakpoints,
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
              cssApi({
                [propName]: [
                  `10px solid c:red`,
                  `15px dotted c:green`,
                  `20px dashed c:blue`,
                ],
              })
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
            cssApi({
              [propName]: [
                `10 solid c:red`,
                `15 dotted c:green`,
                `20 dashed c:blue`,
              ],
            })
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
            cssApi({
              [propName]: [
                `1ru solid c:red`,
                `2ru dotted c:green`,
                `3ru dashed c:blue`,
              ],
            })
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
    const cssApi = configureCssApi({ breakpoints })
    describe(`with number or string number`, () => {
      it(`leaves values untouched`, () => {
        expect(cssApi({ opacity: [`1`, `0.5`, `.2`] })).toEqualMultiline(`
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
        expect(cssApi({ opacity: [`100%`, `50%`, `20%`] })).toEqualMultiline(`
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
          breakpoints,
          data: {
            ...colorData,
          },
        })

        it(`ignores explicit colors`, () => {
          expect(
            cssApi({
              [propName]: `#FF0000 rgb(255, 15, 55) rgba(255, 15, 55, 0.5)`,
            })
          ).toEqual(
            `${cssName}: #FF0000 rgb(255, 15, 55) rgba(255, 15, 55, 0.5);`
          )
        })

        it(`looks up colors`, () => {
          expect(cssApi({ [propName]: `c:red c:green c:blue` })).toEqual(
            `${cssName}: #FA0000 #00FA00 #0000FA;`
          )
        })
      })
    },
    [`borderColor`, `outlineColor`]
  )

  map(
    propName => {
      const cssName = dasherize(propName)
      describe(cssName, () => {
        const cssApi = configureCssApi({
          breakpoints,
          data: {
            ...colorData,
          },
        })

        it(`ignores explicit colors`, () => {
          expect(cssApi({ [propName]: `#FF0000` })).toEqual(
            `${cssName}: #FF0000;`
          )
          expect(cssApi({ [propName]: `#FF0` })).toEqual(`${cssName}: #FF0;`)
          expect(cssApi({ [propName]: `rgb(255, 15, 55)` })).toEqual(
            `${cssName}: rgb(255, 15, 55);`
          )
          expect(cssApi({ [propName]: `rgba(255, 15, 55, 0.5)` })).toEqual(
            `${cssName}: rgba(255, 15, 55, 0.5);`
          )
        })

        it(`looks up colors`, () => {
          expect(cssApi({ [propName]: `c:red` })).toEqual(
            `${cssName}: #FA0000;`
          )
          expect(cssApi({ [propName]: `c:green` })).toEqual(
            `${cssName}: #00FA00;`
          )
          expect(cssApi({ [propName]: `c:blue` })).toEqual(
            `${cssName}: #0000FA;`
          )
        })
      })
    },
    [
      `color`,
      `backgroundColor`,
      `borderTopColor`,
      `borderRightColor`,
      `borderBottomColor`,
      `borderLeftColor`,
    ]
  )

  // ---------------------------------------------------------------------------
  // Background-attachment
  // ---------------------------------------------------------------------------

  describe(`backgroundAttachment`, () => {
    const cssApi = configureCssApi({
      breakpoints,
    })

    it(`returns value unchanged`, () => {
      expect(cssApi({ backgroundAttachment: `local, scroll` })).toEqual(
        `background-attachment: local, scroll;`
      )
    })
  })

  // ---------------------------------------------------------------------------
  // Background-image
  // ---------------------------------------------------------------------------

  describe(`backgroundImage`, () => {
    const cssApi = configureCssApi({
      breakpoints,
      data: {
        ...colorData,
        ...gradientData,
        ...imageData,
      },
    })

    it(`returns single url value unchanged`, () => {
      expect(cssApi({ backgroundImage: `url(../../example.jpg)` })).toEqual(
        `background-image: url(../../example.jpg);`
      )
    })

    it(`returns multiple group values unchanged`, () => {
      expect(
        cssApi({
          backgroundImage: `url(../../example1.jpg), linear-gradient(0.25turn, #3f87a6, #ebf8e1, #f69d3c), radial-gradient(#e66465, #9198e5)`,
        })
      ).toEqual(
        `background-image: url(../../example1.jpg), linear-gradient(0.25turn, #3f87a6, #ebf8e1, #f69d3c), radial-gradient(#e66465, #9198e5);`
      )
    })

    it(`transforms colour values inside gradients`, () => {
      expect(
        cssApi({
          backgroundImage: `linear-gradient(0.25turn, c:red, c:green, c:blue), radial-gradient(c:red, c:blue)`,
        })
      ).toEqual(
        `background-image: linear-gradient(0.25turn, #FA0000, #00FA00, #0000FA), radial-gradient(#FA0000, #0000FA);`
      )
    })
    it(`looks up gradients`, () => {
      expect(cssApi({ backgroundImage: `g:key1, g:key2` })).toEqual(
        `background-image: radial-gradient(#FF0, #00F), linear-gradient(rgb(10, 20, 30), rgba(10, 20, 30));`
      )
    })

    it(`looks up images`, () => {
      expect(cssApi({ backgroundImage: `i:key1, i:key2` })).toEqual(
        `background-image: url('../example/alpha.jpg'), url('../example/bravo.jpg');`
      )
    })
  })

  // ---------------------------------------------------------------------------
  // Background
  // ---------------------------------------------------------------------------

  describe(`background`, () => {
    const cssApi = configureCssApi({
      breakpoints,
      data: {
        ...colorData,
      },
    })

    it(`returns single url value unchanged`, () => {
      expect(cssApi({ background: `url(../../example.jpg) repeat-y` })).toEqual(
        `background: url(../../example.jpg) repeat-y;`
      )
    })

    it(`returns multiple group values unchanged`, () => {
      expect(
        cssApi({
          background: `url(../../example1.jpg), linear-gradient(0.25turn, #3f87a6, #ebf8e1, #f69d3c), radial-gradient(#e66465, #9198e5)`,
        })
      ).toEqual(
        `background: url(../../example1.jpg), linear-gradient(0.25turn, #3f87a6, #ebf8e1, #f69d3c), radial-gradient(#e66465, #9198e5);`
      )
    })

    it(`handles colors mixed with groups`, () => {
      expect(
        cssApi({
          background: `linear-gradient(0.25turn, c:red 20%, c:green, c:blue), radial-gradient(c:red, c:blue), c:red`,
        })
      ).toEqual(
        `background: linear-gradient(0.25turn, #FA0000 20%, #00FA00, #0000FA), radial-gradient(#FA0000, #0000FA), #FA0000;`
      )
    })

    it(`transforms colour values inside gradients`, () => {
      expect(
        cssApi({
          background: `linear-gradient(0.25turn, c:red, c:green, c:blue), radial-gradient(c:red, c:blue)`,
        })
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
          breakpoints,
        })

        it(`ignores explicit lengths`, () => {
          expect(cssApi({ [propName]: `top left` })).toEqual(
            `${cssName}: top left;`
          )
          expect(cssApi({ [propName]: `20px 5rem` })).toEqual(
            `${cssName}: 20px 5rem;`
          )
          expect(cssApi({ [propName]: `20% bottom` })).toEqual(
            `${cssName}: 20% bottom;`
          )
        })

        it(`transforms unitless values`, () => {
          expect(cssApi({ [propName]: `top 16` })).toEqual(
            `${cssName}: top 1rem;`
          )
          expect(cssApi({ [propName]: `bottom 16 top 32` })).toEqual(
            `${cssName}: bottom 1rem top 2rem;`
          )
        })

        it(`transforms rhythm units`, () => {
          expect(cssApi({ [propName]: `top 1ru` })).toEqual(
            `${cssName}: top 1.25rem;`
          )
          expect(cssApi({ [propName]: `bottom 1ru top 2ru` })).toEqual(
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
      breakpoints,
      data: {
        ...fontData,
      },
    })

    it(`ignores generic values`, () => {
      const result = cssApi({ fontFamily: `sans-serif` })
      expect(result).toEqual(`font-family: sans-serif;`)
    })

    it(`looks up font names`, () => {
      const result = cssApi({ fontFamily: `f:Alpha` })
      expect(result).toEqual(`font-family: alpha-family;`)
    })
  })

  // ---------------------------------------------------------------------------
  // Font-size
  // ---------------------------------------------------------------------------

  describe(`font-size`, () => {
    const cssApi = configureCssApi({
      breakpoints,
      data: {
        ...scaleData,
      },
    })

    it(`ignores generic values`, () => {
      const result = cssApi({ fontSize: `16px` })
      expect(result).toEqual(`font-size: 16px;`)
    })

    it(`transforms unitless values to rems`, () => {
      const result = cssApi({ fontSize: 16 })
      expect(result).toEqual(`font-size: 1rem;`)
    })

    it(`transforms rhythm units to rems`, () => {
      const result = cssApi({ fontSize: `1ru` })
      expect(result).toEqual(`font-size: 1.25rem;`)
    })

    it(`looks up scale names`, () => {
      const result = cssApi({ fontSize: `s:small` })
      expect(result).toEqual(`font-size: 0.75rem;`)
    })
  })

  // ---------------------------------------------------------------------------
  // Flex
  // ---------------------------------------------------------------------------

  describe(`flex`, () => {
    const cssApi = configureCssApi({
      breakpoints,
    })

    describe(`generic values`, () => {
      it(`ignores single generic argument`, () => {
        const result = cssApi({ flex: 1 })
        expect(result).toEqual(`flex: 1;`)
      })

      it(`ignores two generic arguments`, () => {
        const result = cssApi({ flex: `1 20px` })
        expect(result).toEqual(`flex: 1 20px;`)
      })

      it(`ignores three generic arguments`, () => {
        const result = cssApi({ flex: `1 2 20px` })
        expect(result).toEqual(`flex: 1 2 20px;`)
      })
    })

    it(`transforms unitless value in third position `, () => {
      const result = cssApi({ flex: `1 3 16` })
      expect(result).toEqual(`flex: 1 3 1rem;`)
    })
  })

  // ---------------------------------------------------------------------------
  // Box-shadow
  // ---------------------------------------------------------------------------

  describe(`box-shadow`, () => {
    const cssApi = configureCssApi({
      breakpoints,
      data: {
        ...colorData,
        ...boxShadowData,
      },
    })

    it(`returns single boxshadow with values unchanged`, () => {
      expect(
        cssApi({ boxShadow: `2px 2px 2px 1px rgba(0, 0, 0, 0.2)` })
      ).toEqual(`box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);`)
    })

    it(`replaces color names`, () => {
      expect(cssApi({ boxShadow: `2px 2px 2px 1px c:red` })).toEqual(
        `box-shadow: 2px 2px 2px 1px #FA0000;`
      )
    })

    it(`replaces unitless distances`, () => {
      expect(cssApi({ boxShadow: `2 2 2 1 c:red` })).toEqual(
        `box-shadow: 0.125rem 0.125rem 0.125rem 0.0625rem #FA0000;`
      )
    })

    it(`replaces rhythm units distances`, () => {
      expect(cssApi({ boxShadow: `2ru 2ru 2ru 1ru c:red` })).toEqual(
        `box-shadow: 2.5rem 2.5rem 2.5rem 1.25rem #FA0000;`
      )
    })

    it(`replaces names`, () => {
      expect(cssApi({ boxShadow: `d:small` })).toEqual(
        `box-shadow: 31px 21px 43px 0px #FA0000;`
      )
    })

    it(`returns handles multiple boxshadows with values unchanged`, () => {
      expect(
        cssApi({
          boxShadow: `2px 2px 2px 1px rgba(0, 0, 0, 0.2), 2px 2px 2px 1px #FF0`,
        })
      ).toEqual(
        `box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2), 2px 2px 2px 1px #FF0;`
      )
    })
  })

  // ---------------------------------------------------------------------------
  // Transform
  // ---------------------------------------------------------------------------

  describe(`transform`, () => {
    const cssApi = configureCssApi({
      breakpoints,
    })

    it(`processes transforms`, () => {
      expect(cssApi({ transform: `scale(2, 2), rotate(20)` }))
    })
  })

  describe(`transform-origin`, () => {
    const cssApi = configureCssApi({
      breakpoints,
    })

    it(`processes transforms`, () => {
      expect(cssApi({ transformOrigin: `1ru 50%` })).toEqual(
        `transform-origin: 1.25rem 50%;`
      )
    })
  })
})
