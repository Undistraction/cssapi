import { flip, split, compose, path, tail } from 'ramda';
import { concatRight } from 'ramda-adjunct';
import { isUndefined } from 'util';
import {
  throwThemePropError,
  missingThemeErrorMessage,
  invalidPathErrorMessage,
} from '../errors';
import { THEME, PROP_DELIMETER } from '../const';
import { propTheme } from '../utils/props';

const toPath = compose(flip(concatRight)([THEME]), split(PROP_DELIMETER));

export default propPath => props => {
  const pathElements = toPath(propPath);
  const result = path(pathElements, props);
  if (isUndefined(result)) {
    if (isUndefined(propTheme(props))) {
      throwThemePropError(missingThemeErrorMessage());
    } else {
      throwThemePropError(invalidPathErrorMessage(tail(pathElements)));
    }
  }
  return result;
};
