import { pipe, converge } from 'ramda'
import { MIN_MAX_LIST } from '../../const/expanders'
import { expandMainProp, expandSubProps } from '../../utils/expanders'
import { prependSubToProp } from '../../utils/formatting'

const minMaxExpander = () => (propName, style) =>
  converge(pipe, [
    expandMainProp,
    expandSubProps(prependSubToProp, MIN_MAX_LIST),
  ])(propName, style)({})

export default minMaxExpander
