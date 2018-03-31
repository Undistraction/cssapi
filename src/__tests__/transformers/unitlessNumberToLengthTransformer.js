import { map } from 'ramda'
import unitlessNumberToLengthTransformer from '../../transformers/unitlessNumberToLengthTransformer'
import { mapWithIndex } from '../../utils/list'

describe(`unitlessNumberToLengthTransformer`, () => {
  it(`returns non-numeric values untouched`, () => {
    const values = [`10px`, `10rem`, `10em`, `10%`, `auto`]
    map(value => {
      const result = unitlessNumberToLengthTransformer(`px`)(value)
      expect(result).toEqual(value)
    })(values)
  })

  describe(`with pixels configured`, () => {
    const values = [-10, 0, 10.5]
    const expectedValues = [`-10px`, 0, `10.5px`]
    it(`transforms numeric value`, () => {
      mapWithIndex((value, idx) => {
        const result = unitlessNumberToLengthTransformer(`px`)(value)
        expect(result).toEqual(expectedValues[idx])
      })(values)
    })
  })
})
