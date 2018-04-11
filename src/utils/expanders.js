import {
  reduce,
  assoc,
  over,
  mergeDeepRight,
  compose,
  __,
  identity,
  pipe,
  objOf,
} from 'ramda'
import { list } from 'ramda-adjunct'
import { lTransformers } from './config'

export const toAppendedProps = (propName, style, affixedValues, toProp) =>
  reduce(
    (acc, direction) =>
      compose(assoc(__, style, acc), toProp, list)(propName, direction),
    {},
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

export const applyWrapperToProp = (wrapper = identity) => (propName, style) =>
  pipe(over(lTransformers, wrapper), objOf(propName))(style)
