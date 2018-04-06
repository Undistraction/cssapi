import { identity } from 'ramda'
import axisExpander from './expanders/axisExpander'
import minMaxExpander from './expanders/minMaxExpander'
import topBottomExpander from './expanders/topBottomExpander'
import {
  transformAllPartsWith,
  transformMatchingParts,
} from '../utils/transformers'
import directionsExpander from './expanders/directionsExpander'
import { insertSubIntoProp } from '../utils/formatting'

const STYLES = Object.freeze({
  padding: axisExpander(transformAllPartsWith),
  margin: axisExpander(transformAllPartsWith),
  border: axisExpander(transformMatchingParts),
  borderWidth: axisExpander(transformAllPartsWith, insertSubIntoProp),
  borderStyle: axisExpander(transformAllPartsWith, insertSubIntoProp),
  borderColor: axisExpander(transformAllPartsWith, insertSubIntoProp),
  width: minMaxExpander(identity),
  height: minMaxExpander(identity),
  directions: directionsExpander(identity),
  overflow: topBottomExpander(identity),
})

export default STYLES
