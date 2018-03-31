import { compose, apply, of } from 'ramda'

const transformResolver = transformer => compose(apply(transformer), of)

export default transformResolver
