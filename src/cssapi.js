import { compose } from 'ramda'
import api from './api'

import { ensureBreakpointMapHasDefault } from './utils/breakpoints'

const cssapi = compose(api, ensureBreakpointMapHasDefault)

export default cssapi

// 0. Pass in styles config
// 1. Utilities
// 2. Error Handlers
// 3. Integration with other libs
// 4. Validations
