import { assoc, path, when, unless, compose, reduce } from 'ramda';
import { isUndefined } from 'ramda-adjunct';

import { THEME, API_OBJECTS } from '../const';
import {
  throwAPIError,
  missingAPIErrorMessage,
  missingThemeErrorMessage,
} from '../errors';
import { propTheme } from '../utils/props';

const apiItem = name =>
  compose(
    when(isUndefined, () => throwAPIError(name)(missingAPIErrorMessage(name))),
    path([THEME, name]),
    unless(propTheme, () => throwAPIError(name)(missingThemeErrorMessage()))
  );

export const { mq, baseline, rhythm, fonts } = reduce(
  (acc, name) => assoc(name, apiItem(name), acc),
  {},
  API_OBJECTS
);
