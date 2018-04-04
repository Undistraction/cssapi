import { map, replace, __, useWith, identity, apply } from 'ramda'
import { list } from 'ramda-adjunct'

const TEMPLATE = `@media (min-width: #{minWidth})`
const REGEXP_TOKEN = `#{minWidth}`

const replaceToken = replace(REGEXP_TOKEN, __, TEMPLATE)

const defaultBreakpointMapProvider = map(
  apply(useWith(list, [identity, replaceToken]))
)

export default defaultBreakpointMapProvider
