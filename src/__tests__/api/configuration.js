import { append } from 'ramda'
import { mapIndexed } from 'ramda-adjunct'
import configureCssApi from '../../index'
import { key1, key2, key3 } from '../testHelpers/fixtures/generic'
import { reduceObjIndexed } from '../../utils/objects'

describe(`configuration`, () => {
  describe(`custom breakpoint provider`, () => {
    const customProvider = {
      byName: reduceObjIndexed(
        (acc, [key, value]) => append([key, `_${key}`, value], acc),
        {}
      ),
      byIndex: mapIndexed((value, index) => [index, `_${index}`, value]),
    }
    const cssApi = configureCssApi({ breakpoints: customProvider })

    it(`returns the query for objects`, () => {
      expect(cssApi.padding({ [key1]: 8, [key2]: 16, [key3]: 32 }))
        .toEqualMultiline(`
        _key1 {
          padding: 0.5rem;
        }
        _key2 {
          padding: 1rem;
        }
        _key3 {
          padding: 2rem;
        }
      `)
    })

    it(`returns the query for arrays`, () => {
      expect(cssApi.padding(8, 16, 32)).toEqualMultiline(`
        _0 {
          padding: 0.5rem;
        }
        _1 {
          padding: 1rem;
        }
        _2 {
          padding: 2rem;
        }
      `)
    })
  })
})
