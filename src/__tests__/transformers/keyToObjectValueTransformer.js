import { map } from 'ramda'
import keyToObjectValueTransformer from '../../transformers/keyToObjectValueTransformer'
import { value1, value2, key1 } from '../testHelpers/fixtures/generic'

describe(`keyToObjectValueTransformer`, () => {
  it(`returns non-string values untouched`, () => {
    const transformer = keyToObjectValueTransformer()
    const values = [10, true]
    map(value => {
      const result = transformer(value)
      expect(result).toEqual(value)
    })(values)
  })

  it(`returns string values excluded by regExp untouched`, () => {
    const transformer = keyToObjectValueTransformer({ exclude: /^#/ }, {})
    const values = [`#FF0`, `#00FF00`]
    map(value => {
      const result = transformer(value)
      expect(result).toEqual(value)
    })(values)
  })

  it(`looks up values not excluded by regExp`, () => {
    const transformer = keyToObjectValueTransformer(
      { exclude: /^#/ },
      {
        key1: value1,
        key2: value2,
      }
    )
    const result = transformer(key1)
    expect(result).toEqual(value1)
  })

  it(`looks up values included by regExp`, () => {
    const transformer = keyToObjectValueTransformer(
      { include: /^key/ },
      {
        key1: value1,
        key2: value2,
      }
    )
    const result = transformer(key1)
    expect(result).toEqual(value1)
  })
})
