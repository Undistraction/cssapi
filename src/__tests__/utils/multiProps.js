import { multiProps } from '../../utils/transformers'

describe(`multiProps()`, () => {
  describe(`with a single part`, () => {
    it(`applies the transfomer to that part`, () => {
      const value = `a`
      const transformer1 = jest.fn(() => `transformedValue1`)
      const transformer2 = jest.fn(() => `transformedValue2`)
      const transformer3 = jest.fn(() => `transformedValue3`)
      const f = multiProps([transformer1, transformer2, transformer3])
      const result = f(value)
      expect(result).toEqual([`transformedValue1`])
      expect(transformer1).toHaveBeenCalledWith(`a`)
      expect(transformer2).not.toHaveBeenCalled()
      expect(transformer3).not.toHaveBeenCalled()
    })
  })

  describe(`with multiple parts`, () => {
    it(`applies a transfomer to each part`, () => {
      const value = `a b c`
      const transformer1 = jest.fn(() => `transformedValue1`)
      const transformer2 = jest.fn(() => `transformedValue2`)
      const transformer3 = jest.fn(() => `transformedValue3`)
      const f = multiProps([transformer1, transformer2, transformer3])
      const result = f(value)
      expect(result).toEqual([
        `transformedValue1`,
        `transformedValue2`,
        `transformedValue3`,
      ])
      expect(transformer1).toHaveBeenCalledWith(`a`)
      expect(transformer2).toHaveBeenCalledWith(`b`)
      expect(transformer3).toHaveBeenCalledWith(`c`)
    })
  })

  describe(`with more parts than transformers`, () => {
    it(`leaves remaining parts untransformed`, () => {
      const value = `a b c`
      const transformer1 = jest.fn(() => `transformedValue1`)
      const transformer2 = jest.fn(() => `transformedValue2`)
      const f = multiProps([transformer1, transformer2])
      const result = f(value)
      expect(result).toEqual([`transformedValue1`, `transformedValue2`, `c`])
      expect(transformer1).toHaveBeenCalledWith(`a`)
      expect(transformer2).toHaveBeenCalledWith(`b`)
    })
  })
})
