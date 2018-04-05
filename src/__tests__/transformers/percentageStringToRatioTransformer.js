import { map } from 'ramda'
import percentageStringToRatioTransformer from '../../transformers/percentageStringToRatioTransformer'
import { mapWithIndex } from '../../utils/objects'

describe(`percentageStringToRatioTransformer`, () => {
  it(`returns non-percentage values untouched`, () => {
    const values = [10, -10, 0, `10`, `10rem`, `auto`]
    map(value => {
      const result = percentageStringToRatioTransformer(value)
      expect(result).toEqual(value)
    })(values)
  })

  it(`transforms percentage value`, () => {
    const values = [`50%`, `3%`, `400%`]
    const expectedValues = [0.5, 0.03, 4]
    mapWithIndex((value, idx) => {
      const result = percentageStringToRatioTransformer(value)
      expect(result).toEqual(expectedValues[idx])
    })(values)
  })
})
