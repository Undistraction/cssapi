import renderQuery from '../renderers/renderQuery'
import renderProp from '../renderers/renderProp'
import STYLES from './styles'

const defaultConfig = {
  renderers: {
    queryRenderer: renderQuery,
    propRenderer: renderProp,
  },
  styles: STYLES,
}

export default defaultConfig
