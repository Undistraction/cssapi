import { curry, compose, reduce, toPairs } from 'ramda';

// eslint-disable-next-line import/prefer-default-export
export const reduceObjIndexed = curry((f, acc, v) =>
  compose(reduce(f, acc), toPairs)(v)
);
