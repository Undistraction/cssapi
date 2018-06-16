import { compose, over, unless } from 'ramda'
import breakpointProvider from '../breakpoints/breakpointProvider'
import { addDefaultBreakpoint } from '../utils/breakpoints'
import { lBreakpoints } from '../utils/config'
import { isBreakpointProvider } from '../utils/predicate'

const configureBreakpointProvider = compose(
  breakpointProvider,
  addDefaultBreakpoint
)

const ensureBreakpointProvider = over(
  lBreakpoints,
  unless(isBreakpointProvider, configureBreakpointProvider)
)

export default ensureBreakpointProvider
