import { map } from 'ramda'
import lengthTransformer from '../../transformers/lengthTransformer'
import { mapWithIndex } from '../../utils/list'

describe.skip(`lengthTransformer`, () => {
  it(`returns non-numeric values untouched`, () => {
    const values = [`10px`, `10rem`, `10em`, `10%`, `auto`]
    map(value => {
      const result = lengthTransformer(`px`)(value)
      expect(result).toEqual(value)
    })(values)
  })

  describe(`with pixels configured`, () => {
    const values = [-10, 0, 10.5]
    const expectedValues = [`-10px`, 0, `10.5px`]
    it(`transforms numeric value`, () => {
      mapWithIndex((value, idx) => {
        const result = lengthTransformer(`px`)(value)
        expect(result).toEqual(expectedValues[idx])
      })(values)
    })
  })
})
