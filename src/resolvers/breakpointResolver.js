import { compose, equals, nth, both, append, head, length } from 'ramda'
import { isPlainObject } from 'ramda-adjunct'
import { reduceObjIndexed, reduceWithIndex } from '../utils/objects'

const breakpointResolver = breakpointMap => {
  // ---------------------------------------------------------------------------
  // Utils
  // ---------------------------------------------------------------------------

  const findBreakpointByIndex = idx => compose(head, nth(idx))(breakpointMap)

  const listHasOneChild = compose(equals(1), length)

  const argIsObj = both(listHasOneChild, compose(isPlainObject, head))

  const findBreakpointsByName = reduceObjIndexed(
    (acc, [breakpointName, value]) => append([breakpointName, value], acc),
    []
  )

  const findBreakpointsByIndex = reduceWithIndex(
    (acc, value, idx) => append([findBreakpointByIndex(idx), value], acc),
    []
  )

  const resolver = (...args) =>
    argIsObj(args)
      ? findBreakpointsByName(args[0])
      : findBreakpointsByIndex(args)

  return resolver
}

export default breakpointResolver
