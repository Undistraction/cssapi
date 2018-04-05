import {
  transformAllPartsWith,
  transformMatchingParts,
} from '../utils/transformers'
import percentageStringToRatioTransformer from '../transformers/percentageStringToRatioTransformer'
import renderOneToManyProps from '../renderers/renderMultiProp'
import {
  isNumberString,
  isColorPartOfBorderProp,
  isColorPartOfOutlineProp,
} from '../utils/predicate'
import renderDirectionProps from '../renderers/renderDirectionProps'
import { REGEXP_COLOR } from '../const'
import dataMapLookupProvider from '../providers/dataMapLookupProvider'
import rhythmProvider from '../providers/rhythmProvider'
import unitlessNumberToRemsTransformer from '../transformers/unitlessNumberToRemsTransformer'
import renderHorizontalDirections from '../renderers/renderHorizontalDirections'
import renderVerticalDirections from '../renderers/renderVerticalDirections'

// -----------------------------------------------------------------------------
// 1. Providers
// -----------------------------------------------------------------------------

const colorProvider = dataMapLookupProvider(`color`, { exclude: REGEXP_COLOR })
const rhythmUnitsToRemsTransformer = rhythmProvider(`rhythm`)

// -----------------------------------------------------------------------------
// 2. Transformers
// -----------------------------------------------------------------------------

const lengthTransformer = [
  unitlessNumberToRemsTransformer,
  rhythmUnitsToRemsTransformer,
]

// -----------------------------------------------------------------------------
// 3. Define API
// -----------------------------------------------------------------------------

const defaultConfig = {
  // -------------------------------------------------------------------------
  // Box Model
  // -------------------------------------------------------------------------

  // Padding

  padding: {
    transformers: transformAllPartsWith(lengthTransformer),
  },
  paddingTop: {
    transformers: lengthTransformer,
  },
  paddingRight: {
    transformers: lengthTransformer,
  },
  paddingLeft: {
    transformers: lengthTransformer,
  },
  paddingBottom: {
    transformers: lengthTransformer,
  },

  // Margin

  margin: {
    transformers: transformAllPartsWith(lengthTransformer),
  },
  marginTop: {
    transformers: lengthTransformer,
  },
  marginRight: {
    transformers: lengthTransformer,
  },
  marginLeft: {
    transformers: lengthTransformer,
  },
  marginBottom: {
    transformers: lengthTransformer,
  },

  // Border

  border: {
    transformers: transformMatchingParts([
      [isNumberString, lengthTransformer],
      [isColorPartOfBorderProp, colorProvider],
    ]),
  },
  borderTop: {
    transformers: transformMatchingParts([[isNumberString, lengthTransformer]]),
  },
  borderRight: {
    transformers: transformMatchingParts([[isNumberString, lengthTransformer]]),
  },
  borderLeft: {
    transformers: transformMatchingParts([[isNumberString, lengthTransformer]]),
  },
  borderBottom: {
    transformers: transformMatchingParts([[isNumberString, lengthTransformer]]),
  },
  borderWidth: {
    transformers: lengthTransformer,
  },
  borderTopWidth: {
    transformers: lengthTransformer,
  },
  borderRightWidth: {
    transformers: lengthTransformer,
  },
  borderBottomWidth: {
    transformers: lengthTransformer,
  },
  borderLeftWidth: {
    transformers: lengthTransformer,
  },
  borderColor: colorProvider,
  borderTopColor: colorProvider,
  borderRightColor: colorProvider,
  borderBottomColor: colorProvider,
  borderLeftColor: colorProvider,
  borderStyle: {},
  borderTopStyle: {},
  borderRightStyle: {},
  borderBottomStyle: {},
  borderLeftStyle: {},
  borderSpacing: {
    transformers: lengthTransformer,
  },

  // -------------------------------------------------------------------------
  // Text
  // -------------------------------------------------------------------------

  fontFamily: {},
  fontSize: {},
  fontWeight: {},
  fontStyle: {},
  lineHeight: {},
  textAlign: {},
  letterSpacing: {},
  wordWrap: {},

  // -------------------------------------------------------------------------
  // Background
  // -------------------------------------------------------------------------

  backgroundColor: {
    transformers: colorProvider,
  },

  // -------------------------------------------------------------------------
  // Color / Visibility
  // -------------------------------------------------------------------------

  opacity: {
    transformers: percentageStringToRatioTransformer,
  },
  color: {
    transformers: colorProvider,
  },
  visibility: {},

  // -------------------------------------------------------------------------
  // Layout
  // -------------------------------------------------------------------------

  display: {},
  position: {},
  top: {
    transformers: lengthTransformer,
  },
  right: {
    transformers: lengthTransformer,
  },
  bottom: {
    transformers: lengthTransformer,
  },
  left: {
    transformers: lengthTransformer,
  },
  width: {
    transformers: lengthTransformer,
  },
  minWidth: {
    transformers: lengthTransformer,
  },
  maxWidth: {
    transformers: lengthTransformer,
  },
  height: {
    transformers: lengthTransformer,
  },
  minHeight: {
    transformers: lengthTransformer,
  },
  maxHeight: {
    transformers: lengthTransformer,
  },

  // -------------------------------------------------------------------------
  // Flexbox
  // -------------------------------------------------------------------------

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

  // -------------------------------------------------------------------------
  // Tables
  // -------------------------------------------------------------------------

  verticalAlign: {},

  // -------------------------------------------------------------------------
  // Misc
  // -------------------------------------------------------------------------

  borderRadius: {
    transformers: lengthTransformer,
  },
  zIndex: {},
  zoom: {},
  overflow: {},
  overflowX: {},
  overflowY: {},
  outline: {
    transformers: transformMatchingParts([
      [isNumberString, lengthTransformer],
      [isColorPartOfOutlineProp, colorProvider],
    ]),
  },
  outlineColor: {
    transformers: colorProvider,
  },
  outlineOffset: lengthTransformer,
  outlineStyle: {},
  outlineWidth: lengthTransformer,

  // -------------------------------------------------------------------------
  // Helpers
  // -------------------------------------------------------------------------

  paddingH: {
    transformers: lengthTransformer,
    renderer: renderOneToManyProps([`paddingRight`, `paddingLeft`]),
  },

  paddingV: {
    transformers: lengthTransformer,
    renderer: renderOneToManyProps([`paddingTop`, `paddingBottom`]),
  },

  marginH: {
    transformers: lengthTransformer,
    renderer: renderOneToManyProps([`marginRight`, `marginLeft`]),
  },

  marginV: {
    transformers: lengthTransformer,
    renderer: renderOneToManyProps([`marginTop`, `marginBottom`]),
  },

  offset: {
    transformers: lengthTransformer,
    renderer: renderDirectionProps,
  },

  offsetV: {
    transformers: lengthTransformer,
    renderer: renderVerticalDirections,
  },

  offsetH: {
    transformers: lengthTransformer,
    renderer: renderHorizontalDirections,
  },
}

export default defaultConfig
