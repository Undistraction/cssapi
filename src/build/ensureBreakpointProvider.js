import { compose, over } from 'ramda'
import breakpointProvider from '../breakpoints/breakpointProvider'
import { lBreakpoints } from '../objects/config'
import { addDefaultBreakpoint } from '../utils/breakpoints'

const configureBreakpointProvider = compose(
  breakpointProvider,
  addDefaultBreakpoint
)

const ensureBreakpointProvider = over(lBreakpoints, configureBreakpointProvider)

export default ensureBreakpointProvider
