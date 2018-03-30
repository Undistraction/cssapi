import defaultQueryRenderer from '../renderers/defaultQueryRenderer'
import defaultPropRenderer from '../renderers/defaultPropRenderer'
import STYLES from '../const/styles'

const defaultConfig = {
  renderers: {
    queryRenderer: defaultQueryRenderer,
    propRenderer: defaultPropRenderer,
  },
  styles: STYLES,
}

export default defaultConfig
