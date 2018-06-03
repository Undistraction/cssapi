import { map, test } from 'ramda'
import { RE_MODIFIED_MQ } from '../../const/regexp'

describe(`isValidModifiedMq`, () => {
  it(`returns true for valid values`, () => {
    const validValues = [
      `alpha`,
      `alphaBravo`,
      `alphaBravoCharlie`,
      `>alpha`,
      `<alpha`,
      `>alpha+10`,
      `<alpha+10`,
      `>alpha+1.5`,
      `<alpha+1.5`,
      `>alpha-10`,
      `>alpha-10`,
      `>alpha-1.5`,
      `>alpha-1.5`,
      `>alpha+10em`,
      `<alpha+10em`,
      `>alpha+1.5em`,
      `<alpha+1.5em`,
      `>alpha-1.5em`,
      `>alpha-1.5em`,
      `alpha-50em<delta-100em`,
      `alpha-50em<delta+100em`,
      `>alpha-50em<delta+100em`,
    ]
    map(value => {
      expect(test(RE_MODIFIED_MQ, value)).toBeTrue()
    }, validValues)
  })

  it(`returns false for invalid values`, () => {
    const invalidValues = [
      `<<alpha`,
      `<>alpha`,
      `>>alpha`,
      `><alpha`,
      `alpha+100px`,
      `alpha-100px`,
      `alpha>bravo`,
      `alpha+10>bravo`,
      `alpha-50em<delta+100em<echo+100em`,
      `alpha+100px`,
      `alpha-100px`,
      `alpha<bravo+100px`,
      `alpha<bravo-100px`,
      `<alpha<bravo`,
    ]
    map(value => {
      expect(test(RE_MODIFIED_MQ, value)).toBeFalse()
    }, invalidValues)
  })
})
