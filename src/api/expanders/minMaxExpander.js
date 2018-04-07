import { pipe, converge, identity } from 'ramda'
import { stubObj } from 'ramda-adjunct'
import { MIN_MAX_LIST } from '../../const'
import { expandMainProp, expandSubProps } from '../../utils/expanders'
import { prependSubToProp } from '../../utils/formatting'

const minMaxExpander = ({
  mainWrapper = identity,
  toProp = prependSubToProp,
} = {}) => (propName, style) =>
  converge(pipe, [expandMainProp, expandSubProps(toProp, MIN_MAX_LIST)])(
    propName,
    style,
    mainWrapper
  )(stubObj)

export default minMaxExpander
