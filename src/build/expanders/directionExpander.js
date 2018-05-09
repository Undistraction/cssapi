import { pipe, converge, identity } from 'ramda'
import { DIRECTIONS_LIST } from '../../const/expanders'
import { expandSubProps, expandMainProp } from '../../utils/expanders'
import { appendSubToProp } from '../../utils/formatting'
import allPartsTransformer from '../../transformers/composite/allPartsTransformer'

const directionExpander = ({
  mainWrapper = allPartsTransformer,
  subWrapper = identity,
  createPropNameStrategy = appendSubToProp,
} = {}) => (propName, style) =>
    converge(pipe, [
      expandMainProp,
      expandSubProps(createPropNameStrategy, DIRECTIONS_LIST, subWrapper),
    ])(propName, style, mainWrapper)({})

export default directionExpander
