import { identity, pipe, converge } from 'ramda'
import { AXES_LIST } from '../../const'
import { expandMainProp, expandSubProps } from '../../utils/expanders'
import { appendSubToProp } from '../../utils/formatting'

const axisExpander = ({
  mainWrapper = identity,
  toProp = appendSubToProp,
} = {}) => (propName, style) =>
  converge(pipe, [expandMainProp, expandSubProps(toProp, AXES_LIST)])(
    propName,
    style,
    mainWrapper
  )({})

export default axisExpander
