import { map, apply } from 'ramda'
import renderProp from './renderProp'

const renderProps = map(apply(renderProp))

export default renderProps
