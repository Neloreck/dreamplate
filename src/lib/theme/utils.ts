/**
 * @module @lib/theme
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
  DEFAULT_TEXT_SECONDARY_LIGHT
} from "@Lib/theme/theming";
import { IApplicationTheme, TThemeType } from "@Lib/theme/types";

/**
 * Create default theme.
 */
export const createDefaultTheme = (themeType: TThemeType): IApplicationTheme => ({
  palette: {
    background: {
      default:  (themeType === "dark" ? DEFAULT_BACKGROUND_DARK : DEFAULT_BACKGROUND_LIGHT),
      paper:  (themeType === "dark" ? DEFAULT_BACKGROUND_PAPER_DARK : DEFAULT_BACKGROUND_PAPER_LIGHT),
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
      primary: (themeType === "dark" ? DEFAULT_TEXT_PRIMARY_DARK : DEFAULT_TEXT_PRIMARY_LIGHT),
      secondary: (themeType === "dark" ? DEFAULT_TEXT_SECONDARY_DARK : DEFAULT_TEXT_SECONDARY_LIGHT),
    },
    type: themeType
  },
  spacing: {
    unit: DEFAULT_SPACING_UNIT
  }
});

/**
 * Create new theme from provided one.
 * Theme type is opposite or provided as second param.
 */
export const toggleTheme = ({ palette, spacing }: IApplicationTheme, requestedType?: TThemeType): IApplicationTheme => {

  const nextType: TThemeType = (requestedType || (palette.type === "light" ? "dark" : "light"));
  const isDark: boolean = (nextType === "dark");

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
