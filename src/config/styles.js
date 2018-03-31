import { repeatedProp, detectProps } from '../utils/transformers'
import unitlessNumberToLengthTransformer from '../transformers/unitlessNumberToLengthTransformer'
import renderOneToManyProps from '../renderers/renderMultiProp'
import { isNumberString } from '../../lib/utils/predicate'

const configuredunitlessNumberToLengthTransformer = unitlessNumberToLengthTransformer(
  `rem`
)

const styles = Object.freeze({
  // ---------------------------------------------------------------------------
  // Box Model
  // ---------------------------------------------------------------------------

  // Padding

  padding: {
    transformers: [repeatedProp(configuredunitlessNumberToLengthTransformer)],
  },
  paddingTop: {
    transformers: [configuredunitlessNumberToLengthTransformer],
  },
  paddingRight: {
    transformers: [configuredunitlessNumberToLengthTransformer],
  },
  paddingLeft: {
    transformers: [configuredunitlessNumberToLengthTransformer],
  },
  paddingBottom: {
    transformers: [configuredunitlessNumberToLengthTransformer],
  },

  // Margin

  margin: {
    transformers: [repeatedProp(configuredunitlessNumberToLengthTransformer)],
  },
  marginTop: {
    transformers: [configuredunitlessNumberToLengthTransformer],
  },
  marginRight: {
    transformers: [configuredunitlessNumberToLengthTransformer],
  },
  marginLeft: {
    transformers: [configuredunitlessNumberToLengthTransformer],
  },
  marginBottom: {
    transformers: [configuredunitlessNumberToLengthTransformer],
  },

  // Border

  border: {
    transformers: [
      detectProps([
        [isNumberString, configuredunitlessNumberToLengthTransformer],
      ]),
    ],
  },
  borderTop: {
    transformers: [
      detectProps([
        [isNumberString, configuredunitlessNumberToLengthTransformer],
      ]),
    ],
  },
  borderRight: {
    transformers: [
      detectProps([
        [isNumberString, configuredunitlessNumberToLengthTransformer],
      ]),
    ],
  },
  borderLeft: {
    transformers: [
      detectProps([
        [isNumberString, configuredunitlessNumberToLengthTransformer],
      ]),
    ],
  },
  borderBottom: {
    transformers: [
      detectProps([
        [isNumberString, configuredunitlessNumberToLengthTransformer],
      ]),
    ],
  },
  borderWidth: {
    transformers: [configuredunitlessNumberToLengthTransformer],
  },
  borderTopWidth: {
    transformers: [configuredunitlessNumberToLengthTransformer],
  },
  borderRightWidth: {
    transformers: [configuredunitlessNumberToLengthTransformer],
  },
  borderBottomWidth: {
    transformers: [configuredunitlessNumberToLengthTransformer],
  },
  borderLeftWidth: {
    transformers: [configuredunitlessNumberToLengthTransformer],
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
    transformers: [configuredunitlessNumberToLengthTransformer],
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

  opacity: {},
  color: {},
  visibility: {},

  // ---------------------------------------------------------------------------
  // Layout
  // ---------------------------------------------------------------------------

  display: {},
  position: {},
  top: {
    transformers: [repeatedProp(configuredunitlessNumberToLengthTransformer)],
  },
  right: {
    transformers: [repeatedProp(configuredunitlessNumberToLengthTransformer)],
  },
  bottom: {
    transformers: [repeatedProp(configuredunitlessNumberToLengthTransformer)],
  },
  left: {
    transformers: [repeatedProp(configuredunitlessNumberToLengthTransformer)],
  },
  width: {
    transformers: [repeatedProp(configuredunitlessNumberToLengthTransformer)],
  },
  minWidth: {
    transformers: [repeatedProp(configuredunitlessNumberToLengthTransformer)],
  },
  maxWidth: {
    transformers: [repeatedProp(configuredunitlessNumberToLengthTransformer)],
  },
  height: {
    transformers: [repeatedProp(configuredunitlessNumberToLengthTransformer)],
  },
  minHeight: {
    transformers: [repeatedProp(configuredunitlessNumberToLengthTransformer)],
  },
  maxHeight: {
    transformers: [repeatedProp(configuredunitlessNumberToLengthTransformer)],
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
    transformers: [repeatedProp(configuredunitlessNumberToLengthTransformer)],
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
    transformers: [configuredunitlessNumberToLengthTransformer],
    renderer: renderOneToManyProps([`paddingRight`, `paddingLeft`]),
  },

  paddingV: {
    transformers: [configuredunitlessNumberToLengthTransformer],
    renderer: renderOneToManyProps([`paddingTop`, `paddingBottom`]),
  },

  marginH: {
    transformers: [configuredunitlessNumberToLengthTransformer],
    renderer: renderOneToManyProps([`marginRight`, `marginLeft`]),
  },

  marginV: {
    transformers: [configuredunitlessNumberToLengthTransformer],
    renderer: renderOneToManyProps([`marginTop`, `marginBottom`]),
  },

  // offset: {
  //   transformers: [configuredunitlessNumberToLengthTransformer],
  //   renderer: renderManyToManyProps([`top`, `right`, `bottom`, `left`]),
  // },

  // offsetH: {
  //   transformers: [configuredunitlessNumberToLengthTransformer],
  //   renderer: renderManyToManyProps([`right`, `left`]),
  // },

  // offsetV: {
  //   transformers: [configuredunitlessNumberToLengthTransformer],
  //   renderer: renderManyToManyProps([`right`, `left`]),
  // },

  // fill
  // fillH
  // fillV
})

export default styles
