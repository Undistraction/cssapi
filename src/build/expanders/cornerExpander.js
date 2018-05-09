import { pipe, converge, identity } from 'ramda'
import { CORNERS_LIST } from '../../const/expanders'
import { expandSubProps, expandMainProp } from '../../utils/expanders'
import { appendSubToProp } from '../../utils/formatting'
import allPartsTransformer from '../../transformers/composite/allPartsTransformer'

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
