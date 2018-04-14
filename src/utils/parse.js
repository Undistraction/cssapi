import { view, compose, lensIndex, isNil, any, pipe, match, nth } from 'ramda'
import { RE_COLOR_NAME } from '../const/regexp'

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

export const nameOfNamedValue = pipe(match(RE_COLOR_NAME), nth(1))
