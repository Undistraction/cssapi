import { isNotNaN } from 'ramda-adjunct'
import { repeatedProp, detectProps } from '../utils/transformers'
import lengthTransformer from '../transformers/lengthTransformer'

const configuredLengthTransformer = lengthTransformer(`rem`)

const styles = Object.freeze({
  // ---------------------------------------------------------------------------
  // Box Model
  // ---------------------------------------------------------------------------

  padding: {
    transformer: repeatedProp(configuredLengthTransformer),
  },
  paddingTop: {
    transformer: configuredLengthTransformer,
  },
  paddingRight: {
    transformer: configuredLengthTransformer,
  },
  paddingLeft: {
    transformer: configuredLengthTransformer,
  },
  paddingBottom: {
    transformer: configuredLengthTransformer,
  },
  margin: {
    transformer: repeatedProp(configuredLengthTransformer),
  },
  marginTop: {
    transformer: configuredLengthTransformer,
  },
  marginRight: {
    transformer: configuredLengthTransformer,
  },
  marginLeft: {
    transformer: configuredLengthTransformer,
  },
  marginBottom: {
    transformer: configuredLengthTransformer,
  },
  border: {
    transformer: detectProps([isNotNaN, configuredLengthTransformer]),
  },
  borderTop: {
    transformer: detectProps([isNotNaN, configuredLengthTransformer]),
  },
  borderRight: {
    transformer: detectProps([isNotNaN, configuredLengthTransformer]),
  },
  borderLeft: {
    transformer: detectProps([isNotNaN, configuredLengthTransformer]),
  },
  borderBottom: {
    transformer: detectProps([isNotNaN, configuredLengthTransformer]),
  },

  // ---------------------------------------------------------------------------
  // Text
  // ---------------------------------------------------------------------------

  fontFamily: {},
  fontSize: {},
  fontWeight: {},
  fontStyle: {},
  lineHeight: {},
  color: {},
  textAlign: {},
  letterSpacing: {},

  // ---------------------------------------------------------------------------
  // Background
  // ---------------------------------------------------------------------------

  backgroundColor: {},
  background: {},

  // ---------------------------------------------------------------------------
  // Layout
  // ---------------------------------------------------------------------------

  display: {},
  position: {},
  top: {
    transformer: repeatedProp(configuredLengthTransformer),
  },
  right: {
    transformer: repeatedProp(configuredLengthTransformer),
  },
  bottom: {
    transformer: repeatedProp(configuredLengthTransformer),
  },
  left: {
    transformer: repeatedProp(configuredLengthTransformer),
  },
  width: {
    transformer: repeatedProp(configuredLengthTransformer),
  },
  minWidth: {
    transformer: repeatedProp(configuredLengthTransformer),
  },
  maxWidth: {
    transformer: repeatedProp(configuredLengthTransformer),
  },
  height: {
    transformer: repeatedProp(configuredLengthTransformer),
  },
  minHeight: {
    transformer: repeatedProp(configuredLengthTransformer),
  },
  maxHeight: {
    transformer: repeatedProp(configuredLengthTransformer),
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
  // Misc
  // ---------------------------------------------------------------------------

  borderRadius: {
    transformer: repeatedProp(configuredLengthTransformer),
  },
})

export default styles
