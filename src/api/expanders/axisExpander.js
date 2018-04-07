import { pipe, converge, identity } from 'ramda'
import { stubObj } from 'ramda-adjunct'
import { DIRECTIONS_LIST } from '../../const'
import { expandSubProps, expandMainProp } from '../../utils/expanders'
import { appendSubToProp } from '../../utils/formatting'
import { transformAllPartsWith } from '../../utils/transformers'

const axisExpander = ({
  mainWrapper = transformAllPartsWith,
  subWrapper = identity,
  toProp = appendSubToProp,
} = {}) => (propName, style) =>
    converge(pipe, [
      expandMainProp,
      expandSubProps(toProp, DIRECTIONS_LIST, subWrapper),
    ])(propName, style, mainWrapper)(stubObj)

export default axisExpander
