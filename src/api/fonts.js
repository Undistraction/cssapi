import { path, when, unless, compose } from 'ramda';
import { isUndefined } from 'ramda-adjunct';
import { propTheme } from '../utils/props';
import {
  throwFontsError,
  missingThemeErrorMessage,
  missingFontsErrorMessage,
} from '../errors';
import { THEME, FONTS } from '../const';

export default compose(
  when(isUndefined, () => throwFontsError(missingFontsErrorMessage())),
  path([THEME, FONTS]),
  unless(propTheme, () => throwFontsError(missingThemeErrorMessage()))
);
