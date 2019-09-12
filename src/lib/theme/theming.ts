/**
 * @module lib/theme
 */

import {
  BLACK, GRAY_200,
  GRAY_700,
  INDIGO_100,
  INDIGO_200,
  INDIGO_300, LIGHT_BLACK, LIGHT_WHITE,
  PURPLE_200,
  PURPLE_300,
  PURPLE_400,
  WHITE
} from "@Lib/theme/colors";
import { EThemeType } from "@Lib/theme/types";

/*
 * Default theme generation config.
 */

export const DEFAULT_THEME_TYPE: EThemeType = EThemeType.LIGHT;

export const DEFAULT_SPACING_UNIT: number = 4;

export const DEFAULT_PRIMARY_LIGHT: string = INDIGO_100;

export const DEFAULT_PRIMARY_MAIN: string = INDIGO_200;

export const DEFAULT_PRIMARY_DARK: string = INDIGO_300;

export const DEFAULT_SECONDARY_LIGHT: string = PURPLE_200;

export const DEFAULT_SECONDARY_MAIN: string = PURPLE_300;

export const DEFAULT_SECONDARY_DARK: string = PURPLE_400;

export const DEFAULT_BACKGROUND_LIGHT: string = WHITE;

export const DEFAULT_BACKGROUND_PAPER_LIGHT: string = GRAY_200;

export const DEFAULT_BACKGROUND_DARK: string = LIGHT_BLACK;

export const DEFAULT_BACKGROUND_PAPER_DARK: string = GRAY_700;

export const DEFAULT_TEXT_PRIMARY_LIGHT: string = BLACK;

export const DEFAULT_TEXT_SECONDARY_LIGHT: string = LIGHT_BLACK;

export const DEFAULT_TEXT_PRIMARY_DARK: string = WHITE;

export const DEFAULT_TEXT_SECONDARY_DARK: string = LIGHT_WHITE;
