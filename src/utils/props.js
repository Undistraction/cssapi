import { prop } from 'ramda';

import { THEME, MQ, FONTS, RHYTHM, BASELINE } from '../const';

export const propTheme = prop(THEME);
export const propMQ = prop(MQ);
export const propFonts = prop(FONTS);
export const propRhythm = prop(RHYTHM);
export const propBaseline = prop(BASELINE);
