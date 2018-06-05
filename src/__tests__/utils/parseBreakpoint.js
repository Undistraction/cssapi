import { map } from 'ramda'
import { GT_MODIFIER, LT_MODIFIER, MODIFIERS } from '../../const/breakpoints'
import { parseBreakpoint } from '../../utils/breakpoints'

describe(`parseBreakpoint`, () => {
  const name1 = `alpha`
  const name2 = `bravo`

  it(`throws when syntax is invalid`, () => {
    const value = `<alpha<bravo`

    expect(() => parseBreakpoint(value)).toThrow(
      `The syntax you used to describe your breakpoint range was invalid for '<alpha<bravo'`
    )
  })

  describe(`single value`, () => {
    it(`parses a name`, () => {
      const value = name1
      expect(parseBreakpoint(value)).toEqual({
        name: value,
        range: [{ name: value }],
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

    describe(`with offset modifiers`, () => {
      describe(`positive`, () => {
        describe(`with unitless value`, () => {
          it(`parses with an offset`, () => {
            const value = `${name1}+10`
            expect(parseBreakpoint(value)).toEqual({
              name: value,
              range: [{ name: name1, offset: `10` }],
            })
          })
        })

        describe(`with em value`, () => {
          it(`parses with an offset`, () => {
            const value = `${name1}+10em`
            expect(parseBreakpoint(value)).toEqual({
              name: value,
              range: [{ name: name1, offset: `10em` }],
            })
          })
        })
      })

      describe(`negative`, () => {
        describe(`with unitless value`, () => {
          it(`parses with an offset`, () => {
            const value = `${name1}-10`
            expect(parseBreakpoint(value)).toEqual({
              name: value,
              range: [{ name: name1, offset: `-10` }],
            })
          })
        })

        describe(`with em value`, () => {
          it(`parses with an offset`, () => {
            const value = `${name1}-10em`
            expect(parseBreakpoint(value)).toEqual({
              name: value,
              range: [{ name: name1, offset: `-10em` }],
            })
          })
        })
      })
    })

    describe(`with modifier and offset modifier`, () => {
      describe(`with em value`, () => {
        it(`parses with an offset`, () => {
          const value = `${LT_MODIFIER}${name1}+10em`
          expect(parseBreakpoint(value)).toEqual({
            name: value,
            range: [{ name: name1, modifier: LT_MODIFIER, offset: `10em` }],
          })
        })
      })
    })
  })

  describe(`multiple values`, () => {
    it(`parses two names`, () => {
      const value = `${name1}${LT_MODIFIER}${name2}`
      expect(parseBreakpoint(value)).toEqual({
        name: value,
        range: [{ name: name1 }, { name: name2 }],
      })
    })

    it(`with modified first name`, () => {
      const value = `>${name1}${LT_MODIFIER}${name2}`
      expect(parseBreakpoint(value)).toEqual({
        name: value,
        range: [{ name: name1, modifier: GT_MODIFIER }, { name: name2 }],
      })
    })

    it(`with modified first name and both offset`, () => {
      const value = `>${name1}+15em${LT_MODIFIER}${name2}-40`
      expect(parseBreakpoint(value)).toEqual({
        name: value,
        range: [
          { name: name1, modifier: GT_MODIFIER, offset: `15em` },
          { name: name2, offset: `-40` },
        ],
      })
    })
  })
})
