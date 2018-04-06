import { pipe, converge } from 'ramda'
import { stubObj } from 'ramda-adjunct'
import { AXES_LIST } from '../../const'
import { expandMainProp, expandSubProps } from '../../utils/expanders'
import { appendSubToProp } from '../../utils/formatting'

const axisExpander = (wrapper, toProp = appendSubToProp) => (propName, style) =>
  converge(pipe, [expandMainProp, expandSubProps(toProp, AXES_LIST)])(
    propName,
    style,
    wrapper
  )(stubObj)

export default axisExpander