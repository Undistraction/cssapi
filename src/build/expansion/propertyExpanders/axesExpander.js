import { converge, identity, pipe } from 'ramda'
import { AXES_LIST } from '../../../const/expanders'
import { expandMainProp, expandSubProps } from '../../../utils/expanders'
import { appendSubToProp } from '../../../utils/formatting'

const axesExpander = ({
  mainWrapper = identity,
  subWrapper = identity,
} = {}) => (propName, style) =>
  converge(pipe, [
    expandMainProp,
    expandSubProps(appendSubToProp, AXES_LIST, subWrapper),
  ])(propName, style, mainWrapper)({})

export default axesExpander
