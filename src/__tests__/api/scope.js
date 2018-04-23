import configureCssApi, { scope } from '../../index'
import {
  breakpoint1,
  breakpoint2,
  breakpoint3,
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

  const scopedScale = {
    scale: {
      small: 12,
      medium: 16,
      large: 22,
    },
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
      {
        resolve: [breakpoint3],
        data: {
          scale: {
            small: 18,
            medium: 26,
            large: 32,
          },
        },
      },
    ],
  }

  describe(`explicit`, () => {
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

      describe(`default and first breakpoints `, () => {
        it(`resolves to the scoped value`, () => {
          expect(cssApi.padding(`2ru`, `2ru`)).toEqualMultiline(`
          padding: 2.5rem;
          
          @media (min-width: 25em) {
            padding: 3rem;
          }`)
        })
      })

      describe(`default, first and second reakpoints`, () => {
        it(`resolves to the scoped value`, () => {
          expect(cssApi.padding(`2ru`, `2ru`, `2ru`)).toEqualMultiline(`
            padding: 2.5rem;
            
            @media (min-width: 25em) {
              padding: 3rem;
            }
            
            @media (min-width: 50em) {
              padding: 3rem;
            }`)
        })
      })

      describe(`default, second, third and fourth breakpoints`, () => {
        it(`resolves to the scoped value`, () => {
          expect(cssApi.padding(`2ru`, `2ru`, `2ru`, `2ru`)).toEqualMultiline(`
            padding: 2.5rem;
            
            @media (min-width: 25em) {
              padding: 3rem;
            }
            
            @media (min-width: 50em) {
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
          expect(cssApi.fontSize(`s:medium`)).toEqual(`font-size: 1rem;`)
        })
      })

      describe(`default and second breakpoints`, () => {
        it(`resolves to the scoped value`, () => {
          expect(cssApi.fontSize(`s:medium`, `s:medium`)).toEqualMultiline(`
          font-size: 1rem;
          
          @media (min-width: 25em) {
            font-size: 1.375rem;
          }`)
        })
      })

      describe(`default, second and third breakpoints`, () => {
        it(`resolves to the scoped value`, () => {
          expect(cssApi.fontSize(`s:medium`, `s:medium`, `s:medium`))
            .toEqualMultiline(`
          font-size: 1rem;
          
          @media (min-width: 25em) {
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
            cssApi.fontSize(`s:medium`, `s:medium`, `s:medium`, `s:medium`)
          ).toEqualMultiline(`
            font-size: 1rem;
            
            @media (min-width: 25em) {
              font-size: 1.375rem;
            }
            
            @media (min-width: 50em) {
              font-size: 1.375rem;
            }
            
            @media (min-width: 75em) {
              font-size: 1.625rem;
            }`)
        })
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
        it(`resolves to the scoped value`, () => {
          expect(cssApi.padding(scope(`2ru`))).toEqualMultiline(`
            padding: 2.5rem;
            
            @media (min-width: 25em) {
              padding: 3rem;
            }
            
            @media (min-width: 50em) {
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
          expect(cssApi.fontSize(scope(`s:medium`))).toEqualMultiline(`
            font-size: 1rem;
            
            @media (min-width: 25em) {
              font-size: 1.375rem;
            }
            
            @media (min-width: 50em) {
              font-size: 1.375rem;
            }
            
            @media (min-width: 75em) {
              font-size: 1.625rem;
            }`)
        })
      })
    })
  })
})
