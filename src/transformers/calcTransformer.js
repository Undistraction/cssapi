import { isCalcFunction } from '../utils/predicate'
import { transformCalcElements, transformValue } from '../utils/transformers'
import transformer from './transformer'

const calcTransformer = transformers =>
  transformer(isCalcFunction, (value, data, breakpointName) => {
    const r = transformCalcElements(
      transformValue(transformers, data, breakpointName)
    )(value)
    return r
  })
export default calcTransformer
