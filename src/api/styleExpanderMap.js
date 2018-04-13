import directionExpander from './expanders/directionExpander'
import minMaxExpander from './expanders/minMaxExpander'
import axesExpander from './expanders/axesExpander'
import matchingPartsTransformer from '../transformers/composite/machingPartsTransformer'
import directionsExpander from './expanders/directionsExpander'
import { insertSubIntoProp } from '../utils/formatting'
import multiArgStyleMap from './mulitArgStyleMap'
import { applyWrapperToProp } from '../utils/expanders'

const STYLES = Object.freeze({
  padding: directionExpander(),
  margin: directionExpander(),
  border: directionExpander({
    mainWrapper: matchingPartsTransformer(multiArgStyleMap.border),
    subWrapper: matchingPartsTransformer(multiArgStyleMap.border),
  }),
  borderWidth: directionExpander({
    toProp: insertSubIntoProp,
  }),
  borderStyle: directionExpander({
    toProp: insertSubIntoProp,
  }),
  borderColor: directionExpander({
    toProp: insertSubIntoProp,
  }),
  width: minMaxExpander(),
  height: minMaxExpander(),
  directions: directionsExpander(),
  overflow: axesExpander(),
  outline: applyWrapperToProp(
    matchingPartsTransformer(multiArgStyleMap.outline)
  ),
  flex: applyWrapperToProp(matchingPartsTransformer(multiArgStyleMap.flex)),
  background: applyWrapperToProp(
    matchingPartsTransformer(multiArgStyleMap.background)
  ),
  backgroundImage: applyWrapperToProp(
    matchingPartsTransformer(multiArgStyleMap.backgroundImage)
  ),
  backgroundPosition: axesExpander({
    mainWrapper: matchingPartsTransformer(multiArgStyleMap.backgroundPosition),
    subWrapper: matchingPartsTransformer(multiArgStyleMap.backgroundPosition),
  }),
  boxShadow: applyWrapperToProp(
    matchingPartsTransformer(multiArgStyleMap.boxShadow)
  ),
})

export default STYLES
