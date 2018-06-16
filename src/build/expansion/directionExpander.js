import { converge, identity, pipe } from 'ramda'
import { DIRECTIONS_LIST } from '../../const/expanders'
import allPartsTransformer from '../../transformers/composite/allPartsTransformer'
import { expandMainProp, expandSubProps } from '../../utils/expanders'
import { appendSubToProp } from '../../utils/formatting'

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
