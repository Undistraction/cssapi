import directionExpander from './expanders/directionExpander'
import minMaxExpander from './expanders/minMaxExpander'
import axesExpander from './expanders/axesExpander'
import { transformMatchingParts } from '../utils/transformers'
import directionsExpander from './expanders/directionsExpander'
import { insertSubIntoProp } from '../utils/formatting'
import multiArgStyleMap from './mulitArgStyleMap'
import { applyWrapperToProp } from '../utils/expanders'

const STYLES = Object.freeze({
  padding: directionExpander(),
  margin: directionExpander(),
  border: directionExpander({
    mainWrapper: transformMatchingParts(multiArgStyleMap.border),
    subWrapper: transformMatchingParts(multiArgStyleMap.border),
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
  outline: applyWrapperToProp(transformMatchingParts(multiArgStyleMap.outline)),
  flex: applyWrapperToProp(transformMatchingParts(multiArgStyleMap.flex)),
  background: applyWrapperToProp(
    transformMatchingParts(multiArgStyleMap.background)
  ),
  backgroundImage: applyWrapperToProp(
    transformMatchingParts(multiArgStyleMap.backgroundImage)
  ),
  backgroundPosition: axesExpander({
    mainWrapper: transformMatchingParts(multiArgStyleMap.backgroundPosition),
    subWrapper: transformMatchingParts(multiArgStyleMap.backgroundPosition),
  }),
})

export default STYLES
