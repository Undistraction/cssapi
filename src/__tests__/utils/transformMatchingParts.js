import { F, equals } from 'ramda'
import { isString } from 'ramda-adjunct'
import { transformMatchingParts } from '../../utils/transformers'

describe(`transformMatchingParts()`, () => {
  describe(`with a single part`, () => {
    describe(`that doesn't match a transformer`, () => {
      it(`applies the transfomer to that part`, () => {
        const value = `a`
        const transformer1 = jest.fn(() => `transformedValue`)
        const f = transformMatchingParts([[F, transformer1]])
        const result = f(value)
        expect(result).toEqual([`a`])
        expect(transformer1).not.toHaveBeenCalled()
      })
    })

    describe(`that matches a transformer`, () => {
      it(`applies the transfomer to that part`, () => {
        const value = `a`
        const transformer1 = jest.fn(() => `transformedValue`)
        const f = transformMatchingParts([[isString, transformer1]])
        const result = f(value)
        expect(result).toEqual([`transformedValue`])
        expect(transformer1).toHaveBeenCalledWith(`a`, undefined)
      })
    })
  })

  describe(`with multiple parts`, () => {
    describe(`that all match a transformers`, () => {
      it(`applies the transfomer to that part`, () => {
        const value = `a b c`
        const transformer1 = jest.fn(() => `transformedValue1`)
        const transformer2 = jest.fn(() => `transformedValue2`)
        const transformer3 = jest.fn(() => `transformedValue3`)
        const f = transformMatchingParts([
          [equals(`a`), transformer1],
          [equals(`b`), transformer2],
          [equals(`c`), transformer3],
        ])
        const result = f(value)
        expect(result).toEqual([
          `transformedValue1`,
          `transformedValue2`,
          `transformedValue3`,
        ])
        expect(transformer1).toHaveBeenCalledWith(`a`, undefined)
        expect(transformer2).toHaveBeenCalledWith(`b`, undefined)
        expect(transformer3).toHaveBeenCalledWith(`c`, undefined)
      })
    })

    describe(`with multiple parts`, () => {
      describe(`that all match a transformers`, () => {
        it(`applies the transfomer to that part`, () => {
          const value = `a b c`
          const transformer1 = jest.fn(() => `transformedValue1`)
          const transformer2 = jest.fn(() => `transformedValue2`)
          const transformer3 = jest.fn(() => `transformedValue3`)
          const f = transformMatchingParts([
            [F, transformer1],
            [equals(`b`), transformer2],
            [F, transformer3],
          ])
          const result = f(value)
          expect(result).toEqual([`a`, `transformedValue2`, `c`])
          expect(transformer1).not.toHaveBeenCalled()
          expect(transformer2).toHaveBeenCalledWith(`b`, undefined)
          expect(transformer3).not.toHaveBeenCalled()
        })
      })
    })
  })
})
