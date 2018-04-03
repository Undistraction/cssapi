import { ifElse, compose, nth, both, append, head } from 'ramda'
import { isPlainObject, stubArray, list, appendFlipped } from 'ramda-adjunct'
import { reduceObjIndexed, reduceWithIndex } from '../utils/objects'
import { lengthEq } from '../utils/list'

const toBreakpointMapping = compose(list)

const breakpointResolver = breakpointMap => {
  const findBreakpointByIndex = idx => compose(head, nth(idx))(breakpointMap)
  const firstChildIsPlainObj = compose(isPlainObject, head)

  const argIsObj = both(lengthEq(1), firstChildIsPlainObj)

  const findBreakpointsByName = reduceObjIndexed(
    (acc, [breakpointName, value]) =>
      compose(appendFlipped(acc), toBreakpointMapping)(breakpointName, value),
    stubArray()
  )

  const findBreakpointsByIndex = reduceWithIndex(
    (acc, value, idx) =>
      compose(appendFlipped(acc), toBreakpointMapping)(
        findBreakpointByIndex(idx),
        value
      ),
    stubArray()
  )

  const resolver = (...args) =>
    ifElse(
      argIsObj,
      compose(findBreakpointsByName, head),
      findBreakpointsByIndex
    )(args)

  return resolver
}
export default breakpointResolver
