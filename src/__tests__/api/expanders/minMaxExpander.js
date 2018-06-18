import minMaxExpander from '../../../build/expansion/propertyExpanders/minMaxExpander'
import { key1, value1, value2 } from '../../testHelpers/fixtures/generic'

describe(`minMaxExpander`, () => {
  it(`expands one property to three`, () => {
    const transformers = () => [value1, value2]
    const renderer = () => {}

    const style = {
      transformers,
      renderer,
    }

    const expected = {
      [key1]: {
        transformers,
        renderer,
      },
      [`minKey1`]: { transformers, renderer },
      [`maxKey1`]: { transformers, renderer },
    }
    const result = minMaxExpander()(key1, style)

    expect(result).toEqual(expected)
  })
})
