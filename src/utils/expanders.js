import {
  reduce,
  assoc,
  over,
  mergeDeepRight,
  compose,
  __,
  lensProp,
  identity,
} from 'ramda'
import { stubObj, list } from 'ramda-adjunct'

export const lTransformers = lensProp(`transformers`)

export const toAppendedProps = (propName, style, affixedValues, toProp) =>
  reduce(
    (acc, direction) =>
      compose(assoc(__, style, acc), toProp, list)(propName, direction),
    stubObj(),
    affixedValues
  )

export const expandMainProp = (propName, style, wrapper) =>
  assoc(propName, over(lTransformers, wrapper, style))

export const expandSubProps = (toProp, suffixes, wrapper = identity) => (
  propName,
  style
) =>
  mergeDeepRight(
    toAppendedProps(
      propName,
      over(lTransformers, wrapper, style),
      suffixes,
      toProp
    )
  )
