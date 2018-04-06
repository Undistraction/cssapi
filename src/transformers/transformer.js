import { when } from 'ramda'

const transformer = (predicate, convert) => when(predicate, convert)

export default transformer
