import { curry, length, addIndex, map, compose, equals } from 'ramda'

export const mapWithIndex = addIndex(map)

export const lengthEq = curry((l, v) => compose(equals(l), length)(v))
