import { mergeDeepLeft } from 'ramda'
import buildBasicStylesAPI from './api/buildBasicStylesAPI'
import defaultConfig from './config/defaultConfig'

const api = (breakpointMap, config = {}) => {
  const mergedConfig = mergeDeepLeft(defaultConfig, config)
  const basicStylesAPI = buildBasicStylesAPI(breakpointMap, mergedConfig)

  return {
    ...basicStylesAPI,
  }
}

export default api
