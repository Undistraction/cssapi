import {
  compose,
  map,
  identity,
  cond,
  append,
  T,
  toString,
  when,
  both,
  equals,
  always,
  flip,
} from 'ramda'
import { isNotString, isNotArray } from 'ramda-adjunct'
import { numericPartOfUnitedNumber, pxToRemOrEmValue } from 'cssapi-units'

import { splitOnWhitespace, joinWithNoSpace } from './formatting'
import { mapWithIndex } from './list'
import { divideBy } from './numbers'
import { LENGTH_UNITS } from '../const'

const { PX, REM } = LENGTH_UNITS

const defaultCondIdentity = [T, identity]

const prepareValue = compose(
  when(isNotArray, splitOnWhitespace),
  when(both(isNotString, isNotArray), toString)
)

const mapToTransformerOrIdentity = transformers =>
  mapWithIndex((value, idx) => {
    const transformer = transformers[idx] || identity
    return transformer(value)
  })

const mapAndDetectToTransformerOrIdentity = transformers =>
  map(cond(append(defaultCondIdentity, transformers)))

export const repeatedProp = transformer =>
  compose(map(transformer), prepareValue)

export const multiProps = transformers =>
  compose(mapToTransformerOrIdentity(transformers), prepareValue)

export const detectProps = transformers =>
  compose(mapAndDetectToTransformerOrIdentity(transformers), prepareValue)

export const percentageStringToRatio = compose(
  divideBy(100),
  numericPartOfUnitedNumber
)

export const unitlessNumberToDistance = (unit, baseFontSize) => v =>
  cond([
    [equals(PX), always(joinWithNoSpace([v, PX]))],
    [
      equals(REM),
      () => joinWithNoSpace([flip(pxToRemOrEmValue)(baseFontSize)(v), REM]),
    ],
  ])(unit)
