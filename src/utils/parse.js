import {
  any,
  compose,
  curry,
  equals,
  gt,
  isNil,
  last,
  lensIndex,
  pipe,
  unless,
  view,
  when,
  __,
} from 'ramda'
import { throwParseError, unitedNumberError } from '../errors'
import { splitOnColon } from './formatting'
import { clampPositive } from './numbers'

export const elementsOfUnitedNumberString = value => {
  const captures = /^(-?\d+(?:.\d+)?)([a-z|%]+)?$/.exec(value)
  if (!captures || any(isNil, [captures, captures[1], captures[2]])) {
    throwParseError(unitedNumberError(value))
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

export const tokenName = pipe(splitOnColon, last)

export const addEmValues = curry((emValue1, emValue2) => {
  const value1 = unless(equals(0), numericPartOfUnitedNumberString)(emValue1)
  const value2 = unless(equals(0), numericPartOfUnitedNumberString)(emValue2)
  const result = clampPositive(value1 + value2)
  return when(gt(__, 0), v => `${v}em`, result)
})
