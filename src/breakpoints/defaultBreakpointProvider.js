import {
  map,
  replace,
  __,
  useWith,
  identity,
  apply,
  compose,
  head,
  find,
  last,
  pipe,
  ifElse,
  always,
  pair,
} from 'ramda'
import { stubArray, list, appendFlipped, isUndefined } from 'ramda-adjunct'
import { reduceObjIndexed, reduceWithIndex } from '../utils/objects'
import { headEquals, nthFlipped } from '../utils/list'
import { throwError } from '../errors'

const TEMPLATE = `@media (min-width: #{minWidth})`
const REGEXP_TOKEN = `#{minWidth}`

const replaceToken = replace(REGEXP_TOKEN, __, TEMPLATE)

const toBreakpointMapping = pair

const defaultBreakpointMapProvider = (o = {}) => {
  const breakpointMap = map(apply(useWith(list, [identity, replaceToken])))(o)

  const findBreakpointByIndex = pipe(nthFlipped(breakpointMap), head)

  const findBreakpointByName = name =>
    compose(last, find(headEquals(name)))(breakpointMap)

  const breakpointExistsForName = name =>
    pipe(
      findBreakpointByName,
      ifElse(isUndefined, () => throwError(``), always(name))
    )(name)

  const findBreakpointsByName = reduceObjIndexed(
    (acc, [breakpointName, value]) =>
      pipe(
        useWith(toBreakpointMapping, [breakpointExistsForName, identity]),
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

  return {
    findBreakpointsByIndex,
    findBreakpointsByName,
    findBreakpointByName,
  }
}

export default defaultBreakpointMapProvider
