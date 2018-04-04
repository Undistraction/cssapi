import {
  ifElse,
  compose,
  both,
  head,
  useWith,
  identity,
  find,
  last,
  pipe,
  tryCatch,
} from 'ramda'
import { isPlainObject, stubArray, list, appendFlipped } from 'ramda-adjunct'
import { reduceObjIndexed, reduceWithIndex } from '../utils/objects'
import { lengthEq, headEquals, nthFlipped } from '../utils/list'
import { invalidBreakpointError, throwError } from '../errors'

const toBreakpointMapping = compose(list)

const breakpointResolver = breakpointMap => {
  const firstChildIsPlainObj = compose(isPlainObject, head)
  const argIsObj = both(lengthEq(1), firstChildIsPlainObj)

  const findBreakpointByIndex = idx =>
    pipe(nthFlipped(breakpointMap), head)(idx)

  const findBreakpointByName = name =>
    compose(last, find(headEquals(name)))(breakpointMap)

  const findBreakpointsByName = reduceObjIndexed(
    (acc, [breakpointName, value]) =>
      pipe(
        useWith(toBreakpointMapping, [findBreakpointByName, identity]),
        appendFlipped(acc)
      )(breakpointName, value),
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
    tryCatch(
      ifElse(
        argIsObj,
        compose(findBreakpointsByName, head),
        findBreakpointsByIndex
      ),
      () => throwError(invalidBreakpointError(args))
    )(args)

  return resolver
}
export default breakpointResolver
