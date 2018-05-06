import configureCssApi from '../..'
import { key1, key2, key3 } from '../testHelpers/fixtures/generic'

describe(`helpers`, () => {
  const breakpointMap = [[key1, `25em`], [key2, `50em`], [key3, `75em`]]
  const scaleData = {
    scale: {
      small: 12,
      medium: 16,
      large: 22,
    },
  }

  describe(`box helpers`, () => {
    const cssApi = configureCssApi({ breakpoints: breakpointMap })

    describe(`padding-h`, () => {
      it(`returns left and right padding`, () => {
        expect(cssApi({ paddingH: [`10px`, `15px`, `20px`] }))
          .toEqualMultiline(`
            padding-right: 10px;
            padding-left: 10px;
            
            @media (min-width: 25em) {
              padding-right: 15px;
              padding-left: 15px;
            }
            
            @media (min-width: 50em) {
              padding-right: 20px;
              padding-left: 20px;
            }
          `)
      })
    })
  })

  describe(`offset`, () => {
    const cssApi = configureCssApi({ breakpoints: breakpointMap })

    it(`renders a single value`, () => {
      const result = cssApi({ offset: `10px` })
      expect(result).toEqualMultiline(`
        top: 10px;
        right: 10px;
        bottom: 10px;
        left: 10px;
      `)
    })

    it(`renders two values`, () => {
      const result = cssApi({ offset: `10px 20px` })
      expect(result).toEqualMultiline(`
        top: 10px;
        right: 20px;
        bottom: 10px;
        left: 20px;
      `)
    })

    it(`renders three values`, () => {
      const result = cssApi({
        offset: `10px 20px 5px`,
      })
      expect(result).toEqualMultiline(`
        top: 10px;
        right: 20px;
        bottom: 5px;
        left: 20px;
      `)
    })

    it(`renders four values`, () => {
      const result = cssApi({
        offset: `10px 20px 5px 2px`,
      })
      expect(result).toEqualMultiline(`
        top: 10px;
        right: 20px;
        bottom: 5px;
        left: 2px;
      `)
    })
  })

  describe(`offsetV`, () => {
    const cssApi = configureCssApi({ breakpoints: breakpointMap })

    it(`renders a single value`, () => {
      const result = cssApi({
        offsetV: `10px`,
      })
      expect(result).toEqualMultiline(`
        top: 10px;
        bottom: 10px;
      `)
    })

    it(`renders two values`, () => {
      const result = cssApi({ offsetV: `10px 20px` })
      expect(result).toEqualMultiline(`
        top: 10px;
        bottom: 20px;
      `)
    })
  })

  describe(`offsetH`, () => {
    const cssApi = configureCssApi({ breakpoints: breakpointMap })

    it(`renders a single value`, () => {
      const result = cssApi({ offsetH: `10px` })
      expect(result).toEqualMultiline(`
        right: 10px;
        left: 10px;
      `)
    })

    it(`renders two values`, () => {
      const result = cssApi({ offsetH: `10px 20px` })
      expect(result).toEqualMultiline(`
        right: 10px;
        left: 20px;
      `)
    })
  })

  describe(`baseline`, () => {
    describe(`half lines`, () => {
      const cssApi = configureCssApi({
        breakpoints: breakpointMap,
        data: {
          ...scaleData,
        },
      })

      describe(`with explicit font-size`, () => {
        describe(`with explicit lines`, () => {
          const result = cssApi({ baseline: `16px 1` })
          expect(result).toEqualMultiline(`
            font-size: 16px;
            line-height: 1.25rem;
          `)
        })

        describe(`with auto lines`, () => {
          expect(cssApi({ baseline: `16px` })).toEqualMultiline(`
            font-size: 16px;
            line-height: 1.25rem;
          `) // 1 lines

          expect(cssApi({ baseline: `20px` })).toEqualMultiline(`
            font-size: 20px;
            line-height: 1.875rem;
          `) // 1.5 lines

          expect(cssApi({ baseline: `21px` })).toEqualMultiline(`
            font-size: 21px;
            line-height: 1.875rem;
          `) // 1.5 lines
        })
      })

      describe(`with unitless font-size`, () => {
        describe(`with explicit lines`, () => {
          const result = cssApi({ baseline: `16 1` })
          expect(result).toEqualMultiline(`
            font-size: 1rem;
            line-height: 1.25rem;
          `)
        })
      })

      describe(`with rhythm unit font-size`, () => {
        describe(`with explicit lines`, () => {
          const result = cssApi({ baseline: `1ru` })
          expect(result).toEqualMultiline(`
            font-size: 1.25rem;
            line-height: 1.875rem;
          `)
        })
      })

      describe(`with font name`, () => {
        describe(`with explicit lines`, () => {
          const result = cssApi({ baseline: `s:large 1` })
          expect(result).toEqualMultiline(`
            font-size: 1.375rem;
            line-height: 1.25rem;
          `)
        })
      })
    })

    describe(`whole lines`, () => {
      const cssApi = configureCssApi({
        breakpoints: breakpointMap,
        data: {
          ...scaleData,
          baseline: {
            allowHalfLines: false,
          },
        },
      })

      expect(cssApi({ baseline: `20px` })).toEqualMultiline(`
        font-size: 20px;
        line-height: 2.5rem;
      `) // 2 lines
    })

    describe(`leading`, () => {
      const cssApi = configureCssApi({
        breakpoints: breakpointMap,
        data: {
          ...scaleData,
          baseline: {
            minLeading: 4,
          },
        },
      })

      expect(cssApi({ baseline: `17px` })).toEqualMultiline(`
        font-size: 17px;
        line-height: 1.875rem;
      `) // 1.5 lines

      expect(cssApi({ baseline: `16px` })).toEqualMultiline(`
        font-size: 16px;
        line-height: 1.25rem;
      `) // 1 line
    })

    describe(`lineHeight`, () => {
      const cssApi = configureCssApi({
        breakpoints: breakpointMap,
        data: {
          ...scaleData,
          baseline: {
            lineHeight: 24,
          },
        },
      })

      expect(cssApi({ baseline: `22px` })).toEqualMultiline(`
        font-size: 22px;
        line-height: 1.5rem;
      `) // 1 lines

      expect(cssApi({ baseline: `23px` })).toEqualMultiline(`
        font-size: 23px;
        line-height: 2.25rem;
      `) // 1.5 lines
    })
  })
})
