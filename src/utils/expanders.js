import {
  assoc,
  compose,
  identity,
  mergeDeepRight,
  objOf,
  over,
  pipe,
  reduce,
  __,
} from 'ramda'
import { list } from 'ramda-adjunct'
import { lTransformers } from '../objects/config'

export const toAppendedProps = (propName, style, affixedValues, toProp) =>
  reduce(
    (acc, direction) =>
      compose(assoc(__, style, acc), toProp, list)(propName, direction),
    {},
    affixedValues
  )

export const expandMainProp = (propName, style, wrapper = identity) =>
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

export const wrapWithTransform = wrapper => (propName, style) =>
  pipe(over(lTransformers, wrapper), objOf(propName))(style)
