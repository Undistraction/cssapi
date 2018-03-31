import configureCSSAPI from '../../../../../src/index'

const breakpointMap = [[`small`, `25em`], [`medium`, `62em`], [`large`, `87em`]]
const cssAPI = configureCSSAPI(breakpointMap)

export default cssAPI
