import axisExpander from '../../../api/expanders/axisExpander'
import { value1, value2, key1 } from '../../testHelpers/fixtures/generic'

describe(`axisExpander`, () => {
  it(`expands one property to five`, () => {
    const transformers = [value1, value2]
    const wrapper = () => {}
    const renderer = () => {}

    const style = {
      transformers,
      renderer,
    }

    const expected = {
      [key1]: {
        transformers: wrapper(transformers),
        renderer,
      },
      [`${key1}Top`]: { transformers, renderer },
      [`${key1}Right`]: { transformers, renderer },
      [`${key1}Bottom`]: { transformers, renderer },
      [`${key1}Left`]: { transformers, renderer },
    }
    const result = axisExpander(wrapper)(key1, style)

    expect(result).toEqual(expected)
  })
})
