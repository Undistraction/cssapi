import { flip, split, compose, path, tail, prop } from 'ramda';
import { concatRight } from 'ramda-adjunct';
import { isUndefined } from 'util';
import {
  throwThemeError,
  missingThemeErrorMessage,
  invalidPathErrorMessage,
} from '../errors';

const THEME = `theme`;
const PROP_DELIMETER = `.`;
const propTheme = prop(THEME);

const toPath = compose(flip(concatRight)([THEME]), split(PROP_DELIMETER));

export default propPath => props => {
  const pathElements = toPath(propPath);
  const result = path(pathElements, props);
  if (isUndefined(result)) {
    if (isUndefined(propTheme(props))) {
      throwThemeError(missingThemeErrorMessage());
    } else {
      throwThemeError(invalidPathErrorMessage(tail(pathElements)));
    }
  }
  return result;
};
