import { transformAllParts } from '../../utils/transformers'

describe(`transformAllParts()`, () => {
  describe(`with a single part`, () => {
    it(`applies the transfomer to that part`, () => {
      const value = `a`
      const transformer = jest.fn(() => `transformedValue`)
      const f = transformAllParts(transformer)
      const result = f(value)
      expect(result).toEqual([`transformedValue`])
      expect(transformer).toHaveBeenCalledWith(value, undefined)
    })
  })

  describe(`with multiple parts`, () => {
    it(`applies the transfomer to all parts`, () => {
      const value = `a b c`
      const transformer = jest.fn(() => `transformedValue`)
      const f = transformAllParts(transformer)
      const result = f(value)
      expect(result).toEqual([
        `transformedValue`,
        `transformedValue`,
        `transformedValue`,
      ])
      expect(transformer.mock.calls).toEqual([
        [`a`, undefined],
        [`b`, undefined],
        [`c`, undefined],
      ])
    })
  })
})
