import { map } from 'ramda'
import { GT_MODIFIER, LT_MODIFIER, MODIFIERS } from '../../const/breakpoints'
import { parseBreakpoint } from '../../utils/breakpoints'

describe(`parseBreakpoint`, () => {
  const name1 = `alpha`
  const name2 = `bravo`

  it(`throws when syntax is invalid`, () => {
    const value = `<alpha<bravo`

    expect(() => parseBreakpoint(value)).toThrow(
      `[cssapi] (config.breakpoints) Breakpoint syntax invalid with args: "<alpha<bravo"`
    )
  })

  describe(`single value`, () => {
    it(`parses a name`, () => {
      expect(parseBreakpoint(name1)).toEqual({
        name: name1,
        range: [{ name: name1 }],
      })
    })

    map(modifier => {
      it(`parses a name with ${modifier} modifier`, () => {
        const value = `${modifier}${name1}`
        expect(parseBreakpoint(value)).toEqual({
          name: value,
          range: [{ name: name1, modifier }],
        })
      })
    }, MODIFIERS)
  })

  describe(`multiple values`, () => {
    it(`parses two names`, () => {
      const value = `${name1}${LT_MODIFIER}${name2}`
      expect(parseBreakpoint(value)).toEqual({
        name: value,
        range: [{ name: name1 }, { name: name2 }],
      })
    })

    it(`parses two names with modified first name`, () => {
      const value = `>${name1}${LT_MODIFIER}${name2}`
      expect(parseBreakpoint(value)).toEqual({
        name: value,
        range: [{ name: name1, modifier: GT_MODIFIER }, { name: name2 }],
      })
    })

    map(modifier => {
      it(`parses a name with ${modifier} modifier`, () => {
        const value = `${modifier}${name1}`
        expect(parseBreakpoint(value)).toEqual({
          name: value,
          range: [{ name: name1, modifier }],
        })
      })
    }, MODIFIERS)
  })
})
