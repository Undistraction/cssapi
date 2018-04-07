import { key1, key2, key3 } from '../testHelpers/fixtures/generic'
import configureCssApi from '../../index'

describe(`api()`, () => {
  const breakpointMap = [[key1, `25em`], [key2, `50em`], [key3, `75em`]]
  const cssApi = configureCssApi({ breakpoints: breakpointMap })

  it(`batches mulitple api functions into media queries`, () => {
    const result = cssApi({
      padding: [`1rem`, `2rem`, `3rem`],
      margin: [`0.5rem`, `1.5rem`],
      color: [`#F00`, `#0F0`, `#00F`],
    })

    const expected = `
      padding: 1rem;
      margin: 0.5rem;
      color: #F00;
      @media (min-width: 25em) {
        padding: 2rem;
        margin: 1.5rem;
        color: #0F0;
      }
      @media (min-width: 50em) {
        padding: 3rem;
        color: #00F;
      }`

    expect(result).toEqualMultiline(expected)
  })
})
