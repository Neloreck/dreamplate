/**
 * @module @lib
 */

import {
  DEFAULT_BACKGROUND_DARK,
  DEFAULT_BACKGROUND_LIGHT,
  DEFAULT_BACKGROUND_PAPER_DARK,
  DEFAULT_BACKGROUND_PAPER_LIGHT,
  DEFAULT_PRIMARY_DARK,
  DEFAULT_PRIMARY_LIGHT,
  DEFAULT_PRIMARY_MAIN,
  DEFAULT_SECONDARY_DARK,
  DEFAULT_SECONDARY_LIGHT,
  DEFAULT_SECONDARY_MAIN,
  DEFAULT_SPACING_UNIT,
  DEFAULT_TEXT_PRIMARY_DARK,
  DEFAULT_TEXT_PRIMARY_LIGHT,
  DEFAULT_TEXT_SECONDARY_DARK,
  DEFAULT_TEXT_SECONDARY_LIGHT,
  DEFAULT_THEME_TYPE
} from "@Lib/theme/theming";
import { EThemeType, IApplicationTheme } from "@Lib/theme/types";

/**
 * Create default theme.
 */
export const createDefaultTheme = (): IApplicationTheme => ({
  palette: {
    background: {
      default: DEFAULT_BACKGROUND_LIGHT,
      paper: DEFAULT_BACKGROUND_PAPER_LIGHT
    },
    primary: {
      dark: DEFAULT_PRIMARY_DARK,
      light: DEFAULT_PRIMARY_LIGHT,
      main: DEFAULT_PRIMARY_MAIN
    },
    secondary: {
      dark: DEFAULT_SECONDARY_DARK,
      light: DEFAULT_SECONDARY_LIGHT,
      main: DEFAULT_SECONDARY_MAIN
    },
    text: {
      primary: (DEFAULT_THEME_TYPE === EThemeType.LIGHT ? DEFAULT_TEXT_PRIMARY_LIGHT : DEFAULT_TEXT_PRIMARY_DARK),
      secondary: (DEFAULT_THEME_TYPE === EThemeType.LIGHT ? DEFAULT_TEXT_SECONDARY_LIGHT : DEFAULT_TEXT_SECONDARY_DARK),
    },
    type: DEFAULT_THEME_TYPE
  },
  spacing: {
    unit: DEFAULT_SPACING_UNIT
  }
});

/**
 * Create new theme from provided one.
 * Theme type is opposite or provided as second param.
 */
export const toggleTheme = ({ palette, spacing }: IApplicationTheme, requestedType?: EThemeType): IApplicationTheme => {

  const nextType: EThemeType = (requestedType || (palette.type === EThemeType.LIGHT ? EThemeType.DARK : EThemeType.LIGHT));
  const isDark: boolean = (nextType === EThemeType.DARK);

  return {
    palette: {
      ...palette,
      background: {
        default: isDark ? DEFAULT_BACKGROUND_DARK : DEFAULT_BACKGROUND_LIGHT,
        paper: isDark ? DEFAULT_BACKGROUND_PAPER_DARK : DEFAULT_BACKGROUND_PAPER_LIGHT
      },
      text: {
        primary: isDark ? DEFAULT_TEXT_PRIMARY_DARK : DEFAULT_TEXT_PRIMARY_LIGHT,
        secondary: isDark ? DEFAULT_TEXT_SECONDARY_DARK : DEFAULT_TEXT_SECONDARY_LIGHT
      },
      type: nextType
    },
    spacing
  };
};
