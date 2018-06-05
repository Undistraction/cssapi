import {
  any,
  compose,
  curry,
  equals,
  isNil,
  last,
  lensIndex,
  pipe,
  unless,
  view,
} from 'ramda'
import { splitOnColon } from './formatting'

export const elementsOfUnitedNumberString = value => {
  const captures = /^(-?\d+(?:.\d+)?)([a-z|%]+)?$/.exec(value)
  if (!captures || any(isNil, [captures, captures[1], captures[2]])) {
    throw new Error(
      `[cssapi] elementsOfUnitedNumber() Supplied value was not a number with a unit: '${value}'`
    )
  }
  return [Number(captures[1]), captures[2]]
}

export const numericPartOfUnitedNumberString = compose(
  view(lensIndex(0)),
  elementsOfUnitedNumberString
)

export const unitPartOfUnitedNumberString = compose(
  view(lensIndex(1)),
  elementsOfUnitedNumberString
)

export const nameOfNamedValue = pipe(splitOnColon, last)

export const addEmValues = curry((emValue1, emValue2) => {
  const value1 = unless(equals(0), numericPartOfUnitedNumberString)(emValue1)
  const value2 = unless(equals(0), numericPartOfUnitedNumberString)(emValue2)
  return `${value1 + value2}em`
})
