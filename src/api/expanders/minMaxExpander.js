import { pipe, converge } from 'ramda'
import { stubObj } from 'ramda-adjunct'
import { MIN_MAX_LIST } from '../../const'
import { expandMainProp, expandSubProps } from '../../utils/expanders'
import { prependSubToProp } from '../../utils/formatting'

const minMaxExpander = (wrapper, toProp = prependSubToProp) => (
  propName,
  style
) =>
  converge(pipe, [expandMainProp, expandSubProps(MIN_MAX_LIST, toProp)])(
    propName,
    style,
    wrapper
  )(stubObj)

export default minMaxExpander
