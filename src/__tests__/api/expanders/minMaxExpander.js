import minMaxExpander from '../../../api/expanders/minMaxExpander'
import { value1, value2, key1 } from '../../testHelpers/fixtures/generic'

describe(`minMaxExpander`, () => {
  it(`expands one property to three`, () => {
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
      [`minKey1`]: { transformers, renderer },
      [`maxKey1`]: { transformers, renderer },
    }
    const result = minMaxExpander({ mainWrapper })(key1, style)

    expect(result).toEqual(expected)
  })
})
