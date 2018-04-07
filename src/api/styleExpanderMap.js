import axisExpander from './expanders/axisExpander'
import minMaxExpander from './expanders/minMaxExpander'
import topBottomExpander from './expanders/topBottomExpander'
import { transformMatchingParts } from '../utils/transformers'
import directionsExpander from './expanders/directionsExpander'
import { insertSubIntoProp } from '../utils/formatting'
import wrapExpander from './expanders/wrapExpander'

const STYLES = Object.freeze({
  padding: axisExpander(),
  margin: axisExpander(),
  border: axisExpander({
    mainWrapper: transformMatchingParts,
    subWrapper: transformMatchingParts,
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
  outline: wrapExpander({ mainWrapper: transformMatchingParts }),
})

export default STYLES
