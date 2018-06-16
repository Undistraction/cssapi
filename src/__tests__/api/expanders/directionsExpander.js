import directionsExpander from '../../../build/expansion/directionsExpander'
import { key1, value1, value2 } from '../../testHelpers/fixtures/generic'

describe(`directionsExpander`, () => {
  it(`expands to directions`, () => {
    const transformers = [value1, value2]
    const mainWrapper = () => {}
    const renderer = () => {}

    const style = {
      transformers,
      renderer,
    }

    const expected = {
      [`top`]: { transformers, renderer },
      [`right`]: { transformers, renderer },
      [`bottom`]: { transformers, renderer },
      [`left`]: { transformers, renderer },
    }
    const result = directionsExpander({ mainWrapper })(key1, style)

    expect(result).toEqual(expected)
  })
})
