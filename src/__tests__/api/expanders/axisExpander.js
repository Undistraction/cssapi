import { value1, value2, key1 } from '../../testHelpers/fixtures/generic'

describe(`axisExpander`, () => {
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
    const result = axisExpander({ mainWrapper })(key1, style)

    expect(result).toEqual(expected)
  })
})
