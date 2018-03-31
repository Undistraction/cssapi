import { map } from 'ramda'
import renderProp from './renderProp'

const renderProps = map(([name, v]) => renderProp(name)(v))

export default renderProps
