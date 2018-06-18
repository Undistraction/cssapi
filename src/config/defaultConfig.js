import renderBaseline from '../build/declarations/renderers/renderBaseline'
import renderDirectionProps from '../build/declarations/renderers/renderDirectionProps'
import renderDualFromOneProps from '../build/declarations/renderers/renderDualFromOneProps'
import renderDualProps from '../build/declarations/renderers/renderDualProps'
import { CONFIG_FIELD_NAMES } from '../const/config'
import {
  DIRECTIONS_LIST_HORIZONTAL,
  DIRECTIONS_LIST_VERTICAL,
} from '../const/expanders'
import { LENGTH_UNITS } from '../const/units'
import baselineTransformer from '../transformers/composite/baselineTransformer'
import {
  borderLookupTransformer,
  boxShadowLookupTransformer,
  colorLookupTransformer,
  fontLookupTransformer,
  gradientLookupTransformer,
  imageLookupTransformer,
  scaleLookupTransformer,
} from '../transformers/factory/dataLookupTransformers'
import gradientTransformer from '../transformers/gradientTransformer'
import lengthTransformers from '../transformers/lengthTransformers'
import percentageStringToRatioTransformer from '../transformers/percentageStringToRatioTransformer'
import transformTransformer from '../transformers/transformTransformer'

const { BREAKPOINTS, DATA, ALIASES, SCOPES, PROPERTIES } = CONFIG_FIELD_NAMES

// -----------------------------------------------------------------------------
// Define API
// -----------------------------------------------------------------------------

const defaultConfig = {
  [BREAKPOINTS]: [],
  [DATA]: {
    [ALIASES]: {
      c: `color`,
      g: `gradient`,
      s: `scale`,
      d: `boxShadow`,
      b: `border`,
      i: `image`,
      f: `font`,
    },
    lengthUnit: LENGTH_UNITS.REM, // | LENGTH_UNITS.PX | LENGTH_UNITS.EM
    baseFontSize: 16, // Font size of your page's root element
    rhythm: 20, // Unit of rhythm for use in layout
    baseline: {
      lineHeight: 20, // Baseline height
      minLeading: 2, // Minimum remaining leading before line or half-line added
      allowHalfLines: true, // Allow half-lines to be used in baseline calc
    },
    color: {},
    scale: {},
    gradient: {},
    boxShadow: {},
    image: {},
    border: {},
    [SCOPES]: [],
  },
  [PROPERTIES]: {
    // -------------------------------------------------------------------------
    // Box Model
    // -------------------------------------------------------------------------

    padding: {
      transformers: lengthTransformers,
    },
    margin: {
      transformers: lengthTransformers,
    },
    border: {
      transformers: [
        borderLookupTransformer,
        lengthTransformers,
        colorLookupTransformer,
      ],
    },
    borderWidth: {
      transformers: lengthTransformers,
    },
    borderColor: {
      transformers: colorLookupTransformer,
    },
    borderStyle: {},
    borderSpacing: {
      transformers: lengthTransformers,
    },
    borderRadius: {
      transformers: lengthTransformers,
    },
    borderImageSource: {
      transformers: [
        imageLookupTransformer,
        gradientLookupTransformer,
        gradientTransformer([colorLookupTransformer, ...lengthTransformers]),
      ],
    },

    // -------------------------------------------------------------------------
    // Outline
    // -------------------------------------------------------------------------

    outline: {
      transformers: [
        borderLookupTransformer,
        lengthTransformers,
        colorLookupTransformer,
      ],
    },
    outlineColor: {
      transformers: colorLookupTransformer,
    },
    outlineOffset: {
      transformers: lengthTransformers,
    },
    outlineStyle: {},
    outlineWidth: {
      transformers: lengthTransformers,
    },

    // -------------------------------------------------------------------------
    // Text
    // -------------------------------------------------------------------------

    fontFamily: {
      transformers: fontLookupTransformer,
    },
    fontSize: {
      transformers: [scaleLookupTransformer, lengthTransformers],
    },
    fontWeight: {},
    fontVarient: {},
    fontStretch: {},
    fontStyle: {},
    lineHeight: {
      transformers: lengthTransformers,
    },
    textAlign: {},
    letterSpacing: {
      transformers: lengthTransformers,
    },
    wordWrap: {},
    wordSpacing: {},
    textDecoration: {},
    whiteSpace: {},

    // -------------------------------------------------------------------------
    // List
    // -------------------------------------------------------------------------

    listStyle: {
      transformers: imageLookupTransformer,
    },
    listStyleImage: {
      transformers: imageLookupTransformer,
    },
    listStylePosition: {},
    listStyleType: {},

    // -------------------------------------------------------------------------
    // Background
    // -------------------------------------------------------------------------

    background: {
      transformers: [
        colorLookupTransformer,
        imageLookupTransformer,
        gradientLookupTransformer,
        gradientTransformer([colorLookupTransformer, ...lengthTransformers]),
        imageLookupTransformer,
      ],
    },

    backgroundAttachment: {},

    backgroundClip: {},

    backgroundColor: {
      transformers: colorLookupTransformer,
    },

    backgroundImage: {
      transformers: [
        gradientLookupTransformer,
        imageLookupTransformer,
        gradientTransformer([colorLookupTransformer, ...lengthTransformers]),
        imageLookupTransformer,
      ],
    },

    backgroundOrigin: {},

    backgroundPosition: {
      transformers: lengthTransformers,
    },

    backgroundRepeat: {},

    backgroundSize: {
      transformers: lengthTransformers,
    },

    // -------------------------------------------------------------------------
    // Color / Visibility
    // -------------------------------------------------------------------------

    opacity: {
      transformers: percentageStringToRatioTransformer,
    },
    color: {
      transformers: colorLookupTransformer,
    },
    visibility: {},

    // -------------------------------------------------------------------------
    // Layout
    // -------------------------------------------------------------------------

    display: {},
    float: {},
    clear: {},
    position: {},
    directions: {
      transformers: lengthTransformers,
    },
    width: {
      transformers: lengthTransformers,
    },
    height: {
      transformers: lengthTransformers,
    },

    // -------------------------------------------------------------------------
    // Flexbox
    // -------------------------------------------------------------------------

    flex: {
      transformers: lengthTransformers,
    },
    flexDirection: {},
    justifyContent: {},
    alignItems: {},
    alignContent: {},
    alignSelf: {},
    flexBasis: {
      transformers: lengthTransformers,
    },
    flexShrink: {}, // Doesn't support <length> values
    flexGrow: {}, // Doesn't support <length> values
    flexWrap: {},
    order: {},

    // -------------------------------------------------------------------------
    // Columns
    // -------------------------------------------------------------------------

    columnCount: {},

    columnWidth: {
      transformers: lengthTransformers,
    },

    columnGap: {
      transformers: lengthTransformers,
    },

    columnRuleWidth: {
      transformers: lengthTransformers,
    },

    // -------------------------------------------------------------------------
    // Tables
    // -------------------------------------------------------------------------

    verticalAlign: {},

    // -------------------------------------------------------------------------
    // Misc
    // -------------------------------------------------------------------------

    zIndex: {},
    zoom: {},
    overflow: {},
    boxShadow: {
      transformers: [
        boxShadowLookupTransformer,
        colorLookupTransformer,
        lengthTransformers,
      ],
    },
    cursor: {},
    hyphens: {},

    // -------------------------------------------------------------------------
    // Transforms
    // -------------------------------------------------------------------------

    transform: { transformers: transformTransformer(lengthTransformers) },
    transformBox: {},
    transformOrigin: {
      transformers: lengthTransformers,
    },

    // -------------------------------------------------------------------------
    // SVG
    // -------------------------------------------------------------------------

    fill: {
      transformers: [
        colorLookupTransformer,
        gradientLookupTransformer,
        gradientTransformer([colorLookupTransformer, ...lengthTransformers]),
      ],
    },

    stroke: {
      transformers: [
        colorLookupTransformer,
        gradientLookupTransformer,
        gradientTransformer([colorLookupTransformer, ...lengthTransformers]),
      ],
    },

    stopColor: {
      transformers: [colorLookupTransformer],
    },

    // -------------------------------------------------------------------------
    // Helpers
    // -------------------------------------------------------------------------

    paddingH: {
      transformers: lengthTransformers,
      renderer: renderDualProps([`paddingLeft`, `paddingRight`]),
    },

    paddingV: {
      transformers: lengthTransformers,
      renderer: renderDualProps([`paddingTop`, `paddingBottom`]),
    },

    marginH: {
      transformers: lengthTransformers,
      renderer: renderDualProps([`marginRight`, `marginLeft`]),
    },

    marginV: {
      transformers: lengthTransformers,
      renderer: renderDualProps([`marginTop`, `marginBottom`]),
    },

    borderH: {
      transformers: [
        borderLookupTransformer,
        lengthTransformers,
        colorLookupTransformer,
      ],
      renderer: renderDualFromOneProps([`borderLeft`, `borderRight`]),
    },

    borderV: {
      transformers: [
        borderLookupTransformer,
        lengthTransformers,
        colorLookupTransformer,
      ],
      renderer: renderDualFromOneProps([`borderTop`, `borderBottom`]),
    },

    offset: {
      transformers: lengthTransformers,
      renderer: renderDirectionProps,
    },

    offsetV: {
      transformers: lengthTransformers,
      renderer: renderDualProps(DIRECTIONS_LIST_VERTICAL),
    },

    offsetH: {
      transformers: lengthTransformers,
      renderer: renderDualProps(DIRECTIONS_LIST_HORIZONTAL),
    },

    borderTopRadius: {
      transformers: lengthTransformers,
      renderer: renderDualProps([
        `borderTopLeftRadius`,
        `borderTopRightRadius`,
      ]),
    },

    borderRightRadius: {
      transformers: lengthTransformers,
      renderer: renderDualProps([
        `borderTopRightRadius`,
        `borderBottomRightRadius`,
      ]),
    },

    borderBottomRadius: {
      transformers: lengthTransformers,
      renderer: renderDualProps([
        `borderBottomRightRadius`,
        `borderBottomLeftRadius`,
      ]),
    },

    borderLeftRadius: {
      transformers: lengthTransformers,
      renderer: renderDualProps([
        `borderBottomLeftRadius`,
        `borderTopLeftRadius`,
      ]),
    },

    baseline: {
      transformers: baselineTransformer([
        scaleLookupTransformer,
        lengthTransformers,
      ]),
      renderer: renderBaseline,
    },
  },
}

export default defaultConfig
