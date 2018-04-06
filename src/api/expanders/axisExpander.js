import { pipe, converge } from 'ramda'
import { stubObj } from 'ramda-adjunct'
import { DIRECTIONS_LIST } from '../../const'
import { expandSubProps, expandMainProp } from '../../utils/expanders'
import { appendSubToProp } from '../../utils/formatting'

const axisExpander = (wrapper, toProp = appendSubToProp) => (propName, style) =>
  converge(pipe, [expandMainProp, expandSubProps(DIRECTIONS_LIST, toProp)])(
    propName,
    style,
    wrapper
  )(stubObj)

export default axisExpander
