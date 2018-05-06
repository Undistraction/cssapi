import { pipe, converge, identity } from 'ramda'
import { CORNERS_LIST } from '../../const/expanders'
import { expandSubProps, expandMainProp } from '../../utils/expanders'
import { appendSubToProp } from '../../utils/formatting'
import allPartsTransformer from '../../transformers/composite/allPartsTransformer'

const cornerExpander = ({
  mainWrapper = allPartsTransformer,
  subWrapper = identity,
  createPropName = appendSubToProp,
} = {}) => (propName, style) =>
  converge(pipe, [
    expandMainProp,
    expandSubProps(createPropName, CORNERS_LIST, subWrapper),
  ])(propName, style, mainWrapper)({})

export default cornerExpander
