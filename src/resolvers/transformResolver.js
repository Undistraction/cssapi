import { compose, apply, of } from 'ramda'

const transformResolver = transformer => (...args) => {
  console.log(`ARGS`, args)
  const t = compose(apply(transformer), of)(...args)
  console.log(`Transformed`, t)
  return t
}

export default transformResolver
