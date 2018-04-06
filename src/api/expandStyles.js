import { assoc, prop, compose, __, mergeDeepRight } from 'ramda'
import { reduceObjIndexed } from '../utils/objects'
import styleExpanderMap from './styleExpanderMap'

const expand = reduceObjIndexed(
  (api, [propName, expandFunc]) =>
    compose(mergeDeepRight(api), expandFunc)(propName, prop(propName, api)),
  __,
  styleExpanderMap
)

const expandStyles = config =>
  compose(assoc(`api`, __, config), expand, prop(`api`))(config)

export default expandStyles
