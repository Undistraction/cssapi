import { curry } from 'ramda'
import { ensureArray } from 'ramda-adjunct'

const createBreakpointDescriptor = curry((name, range) => ({
  name,
  range: ensureArray(range),
}))

export default createBreakpointDescriptor
