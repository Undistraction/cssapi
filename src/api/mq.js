import { path, when, unless, compose } from 'ramda';
import { isUndefined } from 'ramda-adjunct';
import { propTheme } from '../utils/props';
import {
  throwMQError,
  missingThemeErrorMessage,
  missingMQErrorMessage,
} from '../errors';
import { THEME, MQ } from '../const';

export default compose(
  when(isUndefined, () => throwMQError(missingMQErrorMessage())),
  path([THEME, MQ]),
  unless(propTheme, () => throwMQError(missingThemeErrorMessage()))
);
