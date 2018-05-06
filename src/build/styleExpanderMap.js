import partPositionTransformer from '../transformers/composite/partPositionTransformer'
import partsTransformer from '../transformers/composite/partsTransformer'
import { applyWrapperToProp } from '../utils/expanders'
import { insertSubIntoProp } from '../utils/formatting'
import axesExpander from './expanders/axesExpander'
import cornerExpander from './expanders/cornerExpander'
import directionExpander from './expanders/directionExpander'
import directionsExpander from './expanders/directionsExpander'
import minMaxExpander from './expanders/minMaxExpander'

const STYLES = Object.freeze({
  padding: directionExpander(),
  margin: directionExpander(),
  border: directionExpander({
    mainWrapper: partsTransformer,
    subWrapper: partsTransformer,
  }),
  borderWidth: directionExpander({
    createPropName: insertSubIntoProp,
  }),
  borderStyle: directionExpander({
    createPropName: insertSubIntoProp,
  }),
  borderColor: directionExpander({
    createPropName: insertSubIntoProp,
  }),
  borderRadius: cornerExpander({
    createPropName: insertSubIntoProp,
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
  transformOrigin: applyWrapperToProp(partsTransformer),
  offset: applyWrapperToProp(partsTransformer),
  offsetV: applyWrapperToProp(partsTransformer),
  offsetH: applyWrapperToProp(partsTransformer),
})

export default STYLES
