import { converge, identity, pipe } from 'ramda'
import { CORNERS_LIST } from '../../const/expanders'
import allPartsTransformer from '../../transformers/composite/allPartsTransformer'
import { expandMainProp, expandSubProps } from '../../utils/expanders'
import { appendSubToProp } from '../../utils/formatting'

const cornerExpander = ({
  mainWrapper = allPartsTransformer,
  subWrapper = identity,
  createPropNameStrategy = appendSubToProp,
} = {}) => (propName, style) =>
  converge(pipe, [
    expandMainProp,
    expandSubProps(createPropNameStrategy, CORNERS_LIST, subWrapper),
  ])(propName, style, mainWrapper)({})

export default cornerExpander
