import buildApi from '../../api/buildApi'
import { value1, value2, value3, value4 } from '../testHelpers/fixtures/generic'

describe.skip(`buildAPI`, () => {
  const f1 = jest.fn(() => value1)
  const f2 = jest.fn(() => value2)

  const api = {
    a: f1,
    b: f2,
  }

  const resolver = buildApi(api)

  it(`builds an api`, () => {
    expect(resolver.a).toEqual(f1)
    expect(resolver.b).toEqual(f2)
    expect(
      resolver({
        a: value3,
        b: value4,
      })
    ).toEqualMultiline(`
      value1
      value2`)
    expect(f1).toHaveBeenCalledWith(value3)
    expect(f2).toHaveBeenCalledWith(value4)
  })
})
