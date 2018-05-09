import { LENGTH_UNITS } from '../const/units'
import renderBaseline from '../renderers/renderBaseline'
import renderDirectionProps from '../renderers/renderDirectionProps'
import renderMultiProp from '../renderers/renderMultiProp'
import baselineTransformer from '../transformers/composite/baselineTransformer'
import {
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
import { DIRECTIONS_LIST_VERTICAL, DIRECTIONS_LIST_HORIZONTAL } from '../const/expanders';

// -----------------------------------------------------------------------------
// Define API
// -----------------------------------------------------------------------------

const defaultConfig = {
  breakpoints: [],
  data: {
    aliases: {
      c: `color`,
      g: `gradient`,
      s: `scale`,
      b: `boxShadow`,
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
  },
  api: {
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
      transformers: [lengthTransformers, colorLookupTransformer],
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

    // -------------------------------------------------------------------------
    // Outline
    // -------------------------------------------------------------------------

    outline: {
      transformers: [lengthTransformers, colorLookupTransformer],
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
        gradientTransformer(colorLookupTransformer),
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
        gradientTransformer(colorLookupTransformer),
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

    transform: {},
    transformBox: {},
    transformOrigin: {
      transformers: [lengthTransformers],
    },

    // -------------------------------------------------------------------------
    // SVG
    // -------------------------------------------------------------------------

    fill: {
      transformers: [
        colorLookupTransformer,
        gradientLookupTransformer,
        gradientTransformer(colorLookupTransformer),
      ],
    },

    stroke: {
      transformers: [
        colorLookupTransformer,
        gradientLookupTransformer,
        gradientTransformer(colorLookupTransformer),
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
      renderer: renderMultiProp([`paddingLeft`, `paddingRight`]),
    },

    paddingV: {
      transformers: lengthTransformers,
      renderer: renderMultiProp([`paddingTop`, `paddingBottom`]),
    },

    marginH: {
      transformers: lengthTransformers,
      renderer: renderMultiProp([`marginRight`, `marginLeft`]),
    },

    marginV: {
      transformers: lengthTransformers,
      renderer: renderMultiProp([`marginTop`, `marginBottom`]),
    },

    borderH: {
      transformers: [lengthTransformers, colorLookupTransformer],
      renderer: renderMultiProp([`borderRight`, `borderLeft`]),
    },

    borderV: {
      transformers: [lengthTransformers, colorLookupTransformer],
      renderer: renderMultiProp([`borderTop`, `borderBottom`]),
    },

    offset: {
      transformers: lengthTransformers,
      renderer: renderDirectionProps,
    },

    offsetV: {
      transformers: lengthTransformers,
      renderer: renderMultiProp(DIRECTIONS_LIST_VERTICAL),
    },

    offsetH: {
      transformers: lengthTransformers,
      renderer: renderMultiProp(DIRECTIONS_LIST_HORIZONTAL),
    },

    borderTopRadius: {
      transformers: lengthTransformers,
      renderer: renderMultiProp([
        `borderTopLeftRadius`,
        `borderTopRightRadius`,
      ]),
    },

    borderRightRadius: {
      transformers: lengthTransformers,
      renderer: renderMultiProp([
        `borderTopRightRadius`,
        `borderBottomRightRadius`,
      ]),
    },

    borderBottomRadius: {
      transformers: lengthTransformers,
      renderer: renderMultiProp([
        `borderBottomRightRadius`,
        `borderBottomLeftRadius`,
      ]),
    },

    borderLeftRadius: {
      transformers: lengthTransformers,
      renderer: renderMultiProp([
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
