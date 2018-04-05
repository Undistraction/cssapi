import { map, replace, __, useWith, identity, apply } from 'ramda'
import { list } from 'ramda-adjunct'

const TEMPLATE = `@media (min-width: #{minWidth})`
const REGEXP_TOKEN = `#{minWidth}`

const replaceToken = replace(REGEXP_TOKEN, __, TEMPLATE)

const defaultBreakpointMapProvider = o => {
  const breakpoints = map(apply(useWith(list, [identity, replaceToken])))(o)

  return breakpoints
}

export default defaultBreakpointMapProvider
