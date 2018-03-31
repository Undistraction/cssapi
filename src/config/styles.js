import { repeatedProp, detectProps } from '../utils/transformers'
import unitlessNumberToLengthTransformer from '../transformers/unitlessNumberToLengthTransformer'
import percentageStringToRatioTransformer from '../transformers/percentageStringToRatioTransformer'
import renderOneToManyProps from '../renderers/renderMultiProp'
import { isNumberString } from '../utils/predicate'
import renderDirectionProps from '../renderers/renderDirectionProps'

const configuredUnitlessNumberToLengthTransformer = unitlessNumberToLengthTransformer(
  `rem`
)

const styles = Object.freeze({
  // ---------------------------------------------------------------------------
  // Box Model
  // ---------------------------------------------------------------------------

  // Padding

  padding: {
    transformers: [repeatedProp(configuredUnitlessNumberToLengthTransformer)],
  },
  paddingTop: {
    transformers: [configuredUnitlessNumberToLengthTransformer],
  },
  paddingRight: {
    transformers: [configuredUnitlessNumberToLengthTransformer],
  },
  paddingLeft: {
    transformers: [configuredUnitlessNumberToLengthTransformer],
  },
  paddingBottom: {
    transformers: [configuredUnitlessNumberToLengthTransformer],
  },

  // Margin

  margin: {
    transformers: [repeatedProp(configuredUnitlessNumberToLengthTransformer)],
  },
  marginTop: {
    transformers: [configuredUnitlessNumberToLengthTransformer],
  },
  marginRight: {
    transformers: [configuredUnitlessNumberToLengthTransformer],
  },
  marginLeft: {
    transformers: [configuredUnitlessNumberToLengthTransformer],
  },
  marginBottom: {
    transformers: [configuredUnitlessNumberToLengthTransformer],
  },

  // Border

  border: {
    transformers: [
      detectProps([
        [isNumberString, configuredUnitlessNumberToLengthTransformer],
      ]),
    ],
  },
  borderTop: {
    transformers: [
      detectProps([
        [isNumberString, configuredUnitlessNumberToLengthTransformer],
      ]),
    ],
  },
  borderRight: {
    transformers: [
      detectProps([
        [isNumberString, configuredUnitlessNumberToLengthTransformer],
      ]),
    ],
  },
  borderLeft: {
    transformers: [
      detectProps([
        [isNumberString, configuredUnitlessNumberToLengthTransformer],
      ]),
    ],
  },
  borderBottom: {
    transformers: [
      detectProps([
        [isNumberString, configuredUnitlessNumberToLengthTransformer],
      ]),
    ],
  },
  borderWidth: {
    transformers: [configuredUnitlessNumberToLengthTransformer],
  },
  borderTopWidth: {
    transformers: [configuredUnitlessNumberToLengthTransformer],
  },
  borderRightWidth: {
    transformers: [configuredUnitlessNumberToLengthTransformer],
  },
  borderBottomWidth: {
    transformers: [configuredUnitlessNumberToLengthTransformer],
  },
  borderLeftWidth: {
    transformers: [configuredUnitlessNumberToLengthTransformer],
  },
  borderColor: {},
  borderTopColor: {},
  borderRightColor: {},
  borderBottomColor: {},
  borderLeftColor: {},
  borderStyle: {},
  borderTopStyle: {},
  borderRightStyle: {},
  borderBottomStyle: {},
  borderLeftStyle: {},
  borderSpacing: {
    transformers: [configuredUnitlessNumberToLengthTransformer],
  },

  // ---------------------------------------------------------------------------
  // Text
  // ---------------------------------------------------------------------------

  fontFamily: {},
  fontSize: {},
  fontWeight: {},
  fontStyle: {},
  lineHeight: {},
  textAlign: {},
  letterSpacing: {},
  wordWrap: {},

  // ---------------------------------------------------------------------------
  // Background
  // ---------------------------------------------------------------------------

  backgroundColor: {},
  background: {},

  // ---------------------------------------------------------------------------
  // Color / Visibility
  // ---------------------------------------------------------------------------

  opacity: {
    transformers: [percentageStringToRatioTransformer],
  },
  color: {},
  visibility: {},

  // ---------------------------------------------------------------------------
  // Layout
  // ---------------------------------------------------------------------------

  display: {},
  position: {},
  top: {
    transformers: [repeatedProp(configuredUnitlessNumberToLengthTransformer)],
  },
  right: {
    transformers: [repeatedProp(configuredUnitlessNumberToLengthTransformer)],
  },
  bottom: {
    transformers: [repeatedProp(configuredUnitlessNumberToLengthTransformer)],
  },
  left: {
    transformers: [repeatedProp(configuredUnitlessNumberToLengthTransformer)],
  },
  width: {
    transformers: [repeatedProp(configuredUnitlessNumberToLengthTransformer)],
  },
  minWidth: {
    transformers: [repeatedProp(configuredUnitlessNumberToLengthTransformer)],
  },
  maxWidth: {
    transformers: [repeatedProp(configuredUnitlessNumberToLengthTransformer)],
  },
  height: {
    transformers: [repeatedProp(configuredUnitlessNumberToLengthTransformer)],
  },
  minHeight: {
    transformers: [repeatedProp(configuredUnitlessNumberToLengthTransformer)],
  },
  maxHeight: {
    transformers: [repeatedProp(configuredUnitlessNumberToLengthTransformer)],
  },

  // ---------------------------------------------------------------------------
  // Flexbox
  // ---------------------------------------------------------------------------

  flex: {},
  flexDirection: {},
  justifyContent: {},
  alignItems: {},
  alignContent: {},
  alignSelf: {},
  flexBasix: {},
  flexShrink: {},
  flexGrow: {},
  flexWrap: {},
  order: {},

  // ---------------------------------------------------------------------------
  // Tables
  // ---------------------------------------------------------------------------
  verticalAlign: {},

  // ---------------------------------------------------------------------------
  // Misc
  // ---------------------------------------------------------------------------

  borderRadius: {
    transformers: [repeatedProp(configuredUnitlessNumberToLengthTransformer)],
  },
  boxShadow: {},
  zIndex: {},
  overflow: {},
  overflowX: {},
  overflowY: {},
  outline: {},
  outlineColor: {},
  outlineOffset: {},
  outlineStyle: {},
  outlineWidth: {},
  zoom: {},

  // ---------------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------------

  paddingH: {
    transformers: [configuredUnitlessNumberToLengthTransformer],
    renderer: renderOneToManyProps([`paddingRight`, `paddingLeft`]),
  },

  paddingV: {
    transformers: [configuredUnitlessNumberToLengthTransformer],
    renderer: renderOneToManyProps([`paddingTop`, `paddingBottom`]),
  },

  marginH: {
    transformers: [configuredUnitlessNumberToLengthTransformer],
    renderer: renderOneToManyProps([`marginRight`, `marginLeft`]),
  },

  marginV: {
    transformers: [configuredUnitlessNumberToLengthTransformer],
    renderer: renderOneToManyProps([`marginTop`, `marginBottom`]),
  },

  offset: {
    transformers: [configuredUnitlessNumberToLengthTransformer],
    renderer: renderDirectionProps,
  },

  // TODO: Add offsetV and offsetH
  // TODO: Add fillV and fillH
})

export default styles
