import { unless, compose } from 'ramda';
import { throwThemeError, missingThemeErrorMessage } from '../errors';
import { propTheme } from '../utils/props';

export default compose(
  propTheme(),
  unless(propTheme, () => throwThemeError(missingThemeErrorMessage()))
);
