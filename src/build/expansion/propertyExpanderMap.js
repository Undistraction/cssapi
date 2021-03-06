import partPositionTransformer from '../../transformers/composite/partPositionTransformer'
import transformPartsWith from '../../transformers/composite/transformPartsWith'
import { wrapWithTransform } from '../../utils/expanders'
import { insertSubIntoProp } from '../../utils/formatting'
import axesExpander from './propertyExpanders/axesExpander'
import cornerExpander from './propertyExpanders/cornerExpander'
import directionExpander from './propertyExpanders/directionExpander'
import directionsExpander from './propertyExpanders/directionsExpander'
import minMaxExpander from './propertyExpanders/minMaxExpander'

// Expanders take an item described in the config and expand it to multiple
// separate properties. For example 'padding' is expanded to 'padding-top',
// 'padding-right', 'padding-bottom' and 'padding-left', or 'directions' is
// expanded to 'top', 'right', 'bottom' and 'left'.
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
  offset: wrapWithTransform(transformPartsWith),
  offsetV: wrapWithTransform(transformPartsWith),
  offsetH: wrapWithTransform(transformPartsWith),
  paddingH: wrapWithTransform(transformPartsWith),
  paddingV: wrapWithTransform(transformPartsWith),
  marginH: wrapWithTransform(transformPartsWith),
  marginV: wrapWithTransform(transformPartsWith),
  borderH: wrapWithTransform(transformPartsWith),
  borderV: wrapWithTransform(transformPartsWith),
})

export default EXPANDER_MAP
