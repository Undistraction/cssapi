import { map } from 'ramda'
import { mapIndexed } from 'ramda-adjunct'
import ratioToPercentageStringTransformer from '../../transformers/ratioToPercentageStringTransformer'

describe(`ratioToPercentageStringTransformer`, () => {
  it(`returns non-fraction values untouched`, () => {
    const values = [0, `10`, `10rem`, `10%`, `auto`]
    map(value => {
      const result = ratioToPercentageStringTransformer(value)
      expect(result).toEqual(value)
    })(values)
  })

  it(`transforms fraction value below 4`, () => {
    const values = [0.5, 1 / 4, 4]
    const expectedValues = [`50%`, `25%`, `400%`]
    mapIndexed((value, idx) => {
      const result = ratioToPercentageStringTransformer(value)
      expect(result).toEqual(expectedValues[idx])
    })(values)
  })
})
