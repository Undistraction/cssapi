import { clamp, divide, flip } from 'ramda'

export const divideBy = flip(divide)

export const divideBy2 = flip(divide)(2)

export const clampPositive = clamp(0, Number.POSITIVE_INFINITY)
