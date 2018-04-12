import { identity, pipe, converge } from 'ramda'
import { AXES_LIST } from '../../const/expanders'
import { expandMainProp, expandSubProps } from '../../utils/expanders'
import { appendSubToProp } from '../../utils/formatting'

const axesExpander = ({
  mainWrapper = identity,
  subWrapper = identity,
  toProp = appendSubToProp,
} = {}) => (propName, style) =>
    converge(pipe, [
      expandMainProp,
      expandSubProps(toProp, AXES_LIST, subWrapper),
    ])(propName, style, mainWrapper)({})

export default axesExpander
