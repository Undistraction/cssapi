import { pipe, converge, identity } from 'ramda'
import { DIRECTIONS_LIST } from '../../const'
import { expandSubProps, expandMainProp } from '../../utils/expanders'
import { appendSubToProp } from '../../utils/formatting'
import { transformAllParts } from '../../utils/transformers'

const axisExpander = ({
  mainWrapper = transformAllParts,
  subWrapper = identity,
  toProp = appendSubToProp,
} = {}) => (propName, style) =>
  converge(pipe, [
    expandMainProp,
    expandSubProps(toProp, DIRECTIONS_LIST, subWrapper),
  ])(propName, style, mainWrapper)({})

export default axisExpander
