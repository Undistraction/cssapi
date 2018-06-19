import { curry } from 'ramda'

const createQueryDescriptor = curry(({ from, to }) => ({
  from,
  to,
}))

export default createQueryDescriptor
