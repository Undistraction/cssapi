import configureCssApi, { scope } from '../../index'
import {
  breakpoint1,
  breakpoint2,
  breakpoint3,
  value1,
  value2,
} from '../testHelpers/fixtures/generic'

describe(`scope`, () => {
  const breakpointMap = [
    [breakpoint1, 400],
    [breakpoint2, 800],
    [breakpoint3, 1200],
  ]

  const scopedRhythm = {
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
  }

  const scopedBaseline = {
    scopes: [
      {
        resolve: [breakpoint1, breakpoint2],
        data: {
          baseline: {
            lineHeight: 24,
          },
        },
      },
      {
        resolve: [breakpoint3],
        data: {
          baseline: {
            lineHeight: 28,
          },
        },
      },
    ],
  }

  const scopedScale = {
    scale: {
      '1': 16,
      small: 12,
      medium: `s:1`,
      large: 22,
    },
    scopes: [
      {
        resolve: [breakpoint1, breakpoint2],
        data: {
          scale: {
            '1': 22,
            small: 16,
            medium: `s:1`,
            large: 28,
          },
        },
      },
      {
        resolve: [breakpoint3],
        data: {
          scale: {
            '1': 26,
            small: 18,
            medium: `s:1`,
            large: 32,
          },
        },
      },
    ],
  }

  describe(`using separate values for breakpoints`, () => {
    describe(`with scoped value`, () => {
      const cssApi = configureCssApi({
        breakpoints: breakpointMap,
        data: {
          ...scopedRhythm,
        },
      })

      describe(`default breakpoint`, () => {
        it(`resolves the default value`, () => {
          expect(
            cssApi({
              padding: `2ru`,
            })
          ).toEqual(`padding: 2.5rem;`)
        })
      })

      describe(`default and first breakpoints `, () => {
        it(`resolves to the scoped value`, () => {
          expect(
            cssApi({
              padding: [`2ru`, `2ru`],
            })
          ).toEqualMultiline(`
            padding: 2.5rem;
            
            @media (min-width: 25em) {
              padding: 3rem;
            }`)
        })
      })

      describe(`default, first and second breakpoints`, () => {
        it(`resolves to the scoped value`, () => {
          expect(cssApi({ padding: [`2ru`, `2ru`, `2ru`] })).toEqualMultiline(`
            padding: 2.5rem;
            
            @media (min-width: 25em) and (max-width: 49.99em) {
              padding: 3rem;
            }
            
            @media (min-width: 50em) {
              padding: 3rem;
            }`)
        })
      })

      describe(`default, second, third and fourth breakpoints`, () => {
        it(`resolves to the scoped value`, () => {
          expect(cssApi({ padding: [`2ru`, `2ru`, `2ru`, `2ru`] }))
            .toEqualMultiline(`
              padding: 2.5rem;
              
              @media (min-width: 25em) and (max-width: 49.99em) {
                padding: 3rem;
              }
              
              @media (min-width: 50em) and (max-width: 74.99em) {
                padding: 3rem;
              }
              
              @media (min-width: 75em) {
                padding: 3.5rem;
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
          expect(cssApi({ fontSize: `s:medium` })).toEqual(`font-size: 1rem;`)
        })
      })

      describe(`default and second breakpoints`, () => {
        it(`resolves to the scoped value`, () => {
          expect(cssApi({ fontSize: [`s:medium`, `s:medium`] }))
            .toEqualMultiline(`
              font-size: 1rem;
              
              @media (min-width: 25em) {
                font-size: 1.375rem;
              }`)
        })
      })

      describe(`default, second and third breakpoints`, () => {
        it(`resolves to the scoped value`, () => {
          expect(cssApi({ fontSize: [`s:medium`, `s:medium`, `s:medium`] }))
            .toEqualMultiline(`
          font-size: 1rem;
          
          @media (min-width: 25em) and (max-width: 49.99em) {
            font-size: 1.375rem;
          }
          
          @media (min-width: 50em) {
            font-size: 1.375rem;
          }`)
        })
      })

      describe(`default, second, third and fourth breakpoints`, () => {
        it(`resolves to the scoped value`, () => {
          expect(
            cssApi({
              fontSize: [`s:medium`, `s:medium`, `s:medium`, `s:medium`],
            })
          ).toEqualMultiline(`
            font-size: 1rem;
            
            @media (min-width: 25em) and (max-width: 49.99em) {
              font-size: 1.375rem;
            }
            
            @media (min-width: 50em) and (max-width: 74.99em) {
              font-size: 1.375rem;
            }
            
            @media (min-width: 75em) {
              font-size: 1.625rem;
            }`)
        })
      })
    })
  })

  describe(`scoped baseline`, () => {
    const cssApi = configureCssApi({
      breakpoints: breakpointMap,
      data: {
        ...scopedBaseline,
      },
    })

    describe(`default breakpoint`, () => {
      it(`resolves the all values`, () => {
        expect(cssApi({ baseline: [`16`, `16`, `16`, `16`] }))
          .toEqualMultiline(`
            font-size: 1rem;
            line-height: 1.25rem;
            
            @media (min-width: 25em) and (max-width: 49.99em) {
              font-size: 1rem;
              line-height: 1.5rem;
            }
            
            @media (min-width: 50em) and (max-width: 74.99em) {
              font-size: 1rem;
              line-height: 1.5rem;
            }
            
            @media (min-width: 75em) {
              font-size: 1rem;
              line-height: 1.75rem;
            }
        `)
      })
    })
  })

  describe(`scope helper`, () => {
    describe(`with scoped value`, () => {
      const cssApi = configureCssApi({
        breakpoints: breakpointMap,
        data: {
          ...scopedRhythm,
        },
      })

      describe(`default, second, third and fourth breakpoints`, () => {
        it(`renders values for every breakpoint`, () => {
          expect(cssApi({ padding: scope`2ru` })).toEqualMultiline(`
            padding: 2.5rem;
            
            @media (min-width: 25em) and (max-width: 49.99em) {
              padding: 3rem;
            }
            
            @media (min-width: 50em) and (max-width: 74.99em) {
              padding: 3rem;
            }
            
            @media (min-width: 75em) {
              padding: 3.5rem;
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

      describe(`default, second, third and fourth breakpoints`, () => {
        it(`resolves to the scoped value`, () => {
          expect(cssApi({ fontSize: scope`s:medium` })).toEqualMultiline(`
            font-size: 1rem;
            
            @media (min-width: 25em) and (max-width: 49.99em) {
              font-size: 1.375rem;
            }
            
            @media (min-width: 50em) and (max-width: 74.99em) {
              font-size: 1.375rem;
            }
            
            @media (min-width: 75em) {
              font-size: 1.625rem;
            }`)
        })
      })
    })

    it(`handles interpolated values`, () => {
      expect(scope`${value1}`).toEqual({
        scope: `value1`,
      })

      expect(scope` ${value1}`).toEqual({
        scope: ` value1`,
      })

      expect(scope`${value1} ${value2} value3`).toEqual({
        scope: `value1 value2 value3`,
      })
    })
  })
})
