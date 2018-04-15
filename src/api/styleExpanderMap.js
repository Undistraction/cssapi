import directionExpander from './expanders/directionExpander'
import minMaxExpander from './expanders/minMaxExpander'
import axesExpander from './expanders/axesExpander'
import directionsExpander from './expanders/directionsExpander'
import { insertSubIntoProp } from '../utils/formatting'
import partsTransformer from '../transformers/composite/partsTransformer'
import { applyWrapperToProp } from '../utils/expanders'
import partPositionTransformer from '../transformers/composite/partPositionTransformer'

const STYLES = Object.freeze({
  padding: directionExpander(),
  margin: directionExpander(),
  border: directionExpander({
    mainWrapper: partsTransformer,
    subWrapper: partsTransformer,
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
  outlineColor: applyWrapperToProp(partsTransformer),
  outline: applyWrapperToProp(partsTransformer),
  flex: applyWrapperToProp(partPositionTransformer(2)),
  background: applyWrapperToProp(partsTransformer),
  backgroundImage: applyWrapperToProp(partsTransformer),
  backgroundPosition: axesExpander({
    mainWrapper: partsTransformer,
    subWrapper: partsTransformer,
  }),
  boxShadow: applyWrapperToProp(partsTransformer),
})

export default STYLES
