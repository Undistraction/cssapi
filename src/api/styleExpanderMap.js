import axisExpander from './expanders/axisExpander'
import minMaxExpander from './expanders/minMaxExpander'
import topBottomExpander from './expanders/topBottomExpander'
import { transformMatchingParts } from '../utils/transformers'
import directionsExpander from './expanders/directionsExpander'
import { insertSubIntoProp } from '../utils/formatting'
import multiArgStyleMap from './mulitArgStyleMap'
import { applyWrapperToProp } from '../utils/expanders'

const STYLES = Object.freeze({
  padding: axisExpander(),
  margin: axisExpander(),
  border: axisExpander({
    mainWrapper: transformMatchingParts(multiArgStyleMap.border),
    subWrapper: transformMatchingParts(multiArgStyleMap.border),
  }),
  borderWidth: axisExpander({
    toProp: insertSubIntoProp,
  }),
  borderStyle: axisExpander({
    toProp: insertSubIntoProp,
  }),
  borderColor: axisExpander({
    toProp: insertSubIntoProp,
  }),
  width: minMaxExpander(),
  height: minMaxExpander(),
  directions: directionsExpander(),
  overflow: topBottomExpander(),
  outline: applyWrapperToProp(transformMatchingParts(multiArgStyleMap.outline)),
  flex: applyWrapperToProp(transformMatchingParts(multiArgStyleMap.flex)),
})

export default STYLES
