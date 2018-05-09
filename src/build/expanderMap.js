import partPositionTransformer from '../transformers/composite/partPositionTransformer'
import transformPartsWith from '../transformers/composite/transformPartsWith'
import { wrapWithTransform } from '../utils/expanders'
import { insertSubIntoProp } from '../utils/formatting'
import axesExpander from './expanders/axesExpander'
import cornerExpander from './expanders/cornerExpander'
import directionExpander from './expanders/directionExpander'
import directionsExpander from './expanders/directionsExpander'
import minMaxExpander from './expanders/minMaxExpander'

const EXPANDER_MAP = Object.freeze({
  padding: directionExpander(),
  margin: directionExpander(),
  border: directionExpander({
    mainWrapper: transformPartsWith,
    subWrapper: transformPartsWith,
  }),
  borderWidth: directionExpander({
    createPropNameStrategy: insertSubIntoProp,
  }),
  borderStyle: directionExpander({
    createPropNameStrategy: insertSubIntoProp,
  }),
  borderColor: directionExpander({
    createPropNameStrategy: insertSubIntoProp,
  }),
  borderRadius: cornerExpander({
    createPropNameStrategy: insertSubIntoProp,
  }),
  width: minMaxExpander(),
  height: minMaxExpander(),
  directions: directionsExpander(),
  overflow: axesExpander(),
  outlineColor: wrapWithTransform(transformPartsWith),
  outline: wrapWithTransform(transformPartsWith),
  flex: wrapWithTransform(partPositionTransformer(2)),
  background: wrapWithTransform(transformPartsWith),
  backgroundImage: wrapWithTransform(transformPartsWith),
  backgroundPosition: axesExpander({
    mainWrapper: transformPartsWith,
    subWrapper: transformPartsWith,
  }),
  boxShadow: wrapWithTransform(transformPartsWith),
  transformOrigin: wrapWithTransform(transformPartsWith),
})

export default EXPANDER_MAP