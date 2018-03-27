import { compose, always } from 'ramda';
import { appendFlipped } from 'ramda-adjunct';
import { joinWithSpace, joinWithDot } from './utils';
import { ERROR_PREFIX, THEME_PREFIX } from './const';

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const throwError = message => {
  throw new Error(joinWithSpace([ERROR_PREFIX, message]));
};

const throwPrefixedError = prefix =>
  compose(throwError, joinWithSpace, appendFlipped([prefix]));

// -----------------------------------------------------------------------------
// Messages
// -----------------------------------------------------------------------------

export const missingThemeErrorMessage = always(
  `There is no 'theme' available on the props object`
);

export const invalidPathErrorMessage = propsPath =>
  `Theme doesn't provide a value at path '${joinWithDot(propsPath)}'`;

// -----------------------------------------------------------------------------
// Prefixed Errors
// -----------------------------------------------------------------------------

export const throwThemeError = throwPrefixedError(THEME_PREFIX);
