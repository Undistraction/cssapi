import { insertSubIntoProp } from '../../utils/formatting'
import { value1 } from '../testHelpers/fixtures/generic'

describe(`insertSubIntoProp`, () => {
  it(`inserts the sub into the prop`, () => {
    const prop = `alphaBravo`
    const expected = `alphaValue1Bravo`
    expect(insertSubIntoProp([prop, value1])).toEqual(expected)
  })
})
