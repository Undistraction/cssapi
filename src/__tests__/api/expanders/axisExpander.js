import directionExpander from '../../../build/expansion/directionExpander'
import { key1, value1, value2 } from '../../testHelpers/fixtures/generic'

describe(`directionExpander`, () => {
  it(`expands one property to five`, () => {
    const transformers = [value1, value2]
    const mainWrapper = () => {}
    const renderer = () => {}

    const style = {
      transformers,
      renderer,
    }

    const expected = {
      [key1]: {
        transformers: mainWrapper(transformers),
        renderer,
      },
      [`${key1}Top`]: { transformers, renderer },
      [`${key1}Right`]: { transformers, renderer },
      [`${key1}Bottom`]: { transformers, renderer },
      [`${key1}Left`]: { transformers, renderer },
    }
    const result = directionExpander({ mainWrapper })(key1, style)

    expect(result).toEqual(expected)
  })
})
