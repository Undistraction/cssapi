import { prop, compose, __, mergeDeepRight, over } from 'ramda'
import { reduceObjIndexed } from '../utils/objects'
import styleExpanderMap from './styleExpanderMap'
import { lApi } from '../utils/config'

const expand = reduceObjIndexed(
  (api, [propName, expandFunc]) =>
    compose(mergeDeepRight(api), expandFunc)(propName, prop(propName, api)),
  __,
  styleExpanderMap
)

const expandStyles = over(lApi, expand)

export default expandStyles
