import { clamp, divide, flip } from 'ramda'

// eslint-disable-next-line import/prefer-default-export
export const divideBy = flip(divide)

export const clampPositive = clamp(0, Number.POSITIVE_INFINITY)

export const divideBy2 = flip(divide)(2)
