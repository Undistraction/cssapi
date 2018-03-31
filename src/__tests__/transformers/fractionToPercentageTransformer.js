import { map } from 'ramda'
import fractionToPercentageTransformer from '../../transformers/fractionToPercentageTransformer'
import { mapWithIndex } from '../../utils/list'

describe(`fractionToPercentageTransformer`, () => {
  it(`returns non-fraction values untouched`, () => {
    const values = [10, -10, 0, `10`, `10rem`, `10%`, `auto`]
    map(value => {
      const result = fractionToPercentageTransformer(value)
      expect(result).toEqual(value)
    })(values)
  })

  it(`transforms fraction value below 4`, () => {
    const values = [0.5, 1 / 4, 4]
    const expectedValues = [`50%`, `25%`, `400%`]
    mapWithIndex((value, idx) => {
      const result = fractionToPercentageTransformer(value)
      expect(result).toEqual(expectedValues[idx])
    })(values)
  })
})
