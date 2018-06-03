import { any, compose, isNil, last, lensIndex, pipe, view } from 'ramda'
import { splitOnColon } from './formatting'

export const elementsOfUnitedNumber = value => {
  const captures = /^(-?\d+(?:.\d+)?)([a-z|%]+)?$/.exec(value)
  if (!captures || any(isNil, [captures, captures[1], captures[2]])) {
    throw new Error(
      `[cssapi] elementsOfUnitedNumber() Supplied value was not a number with a unit: '${value}'`
    )
  }
  return [Number(captures[1]), captures[2]]
}

export const numericPartOfUnitedNumber = compose(
  view(lensIndex(0)),
  elementsOfUnitedNumber
)

export const unitPartOfUnitedNumber = compose(
  view(lensIndex(1)),
  elementsOfUnitedNumber
)

export const nameOfNamedValue = pipe(splitOnColon, last)
