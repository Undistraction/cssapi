import buildBasicStylesAPI from './api/buildBasicStylesAPI'
import defaultConfig from './config/defaultConfig'

const api = (breakpointMap, config = defaultConfig) => {
  const basicStylesAPI = buildBasicStylesAPI(breakpointMap, config)

  return {
    ...basicStylesAPI,
  }
}

export default api
