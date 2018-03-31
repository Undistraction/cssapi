import { ifElse, compose, nth, both, append, head } from 'ramda'
import { isPlainObject } from 'ramda-adjunct'
import { reduceObjIndexed, reduceWithIndex } from '../utils/objects'
import { lengthEq } from '../utils/list'

const breakpointResolver = breakpointMap => {
  // ---------------------------------------------------------------------------
  // Utils
  // ---------------------------------------------------------------------------

  const findBreakpointByIndex = idx => compose(head, nth(idx))(breakpointMap)

  const argIsObj = both(lengthEq(1), compose(isPlainObject, head))

  const findBreakpointsByName = reduceObjIndexed(
    (acc, [breakpointName, value]) => append([breakpointName, value], acc),
    []
  )

  const findBreakpointsByIndex = reduceWithIndex(
    (acc, value, idx) => append([findBreakpointByIndex(idx), value], acc),
    []
  )

  const resolver = (...args) =>
    compose(
      ifElse(
        argIsObj,
        compose(findBreakpointsByName, head),
        findBreakpointsByIndex
      )
    )(args)

  return resolver
}
export default breakpointResolver
