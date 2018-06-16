import { mergeDeepRight, pipe } from 'ramda'
import defaultConfig from '../config/defaultConfig'
import { defaultToObj } from '../utils/functions'

const mergeWithDefaultConfig = pipe(defaultToObj, mergeDeepRight(defaultConfig))

export default mergeWithDefaultConfig
