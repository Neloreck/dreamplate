/**
 * @packageDocumentation
 * @module @lib/theme
 */

import { IApplicationTheme, TThemeType } from "@Lib/theme/types";

/**
 * Create default theme.
 */
export const createDefaultTheme = (themeType: TThemeType): IApplicationTheme => ({
  palette: {
    background: {
      default:  (themeType === "dark" ? GTheme.DEFAULT_BACKGROUND_DARK : GTheme.DEFAULT_BACKGROUND_LIGHT),
      paper:  (themeType === "dark" ? GTheme.DEFAULT_BACKGROUND_PAPER_DARK : GTheme.DEFAULT_BACKGROUND_PAPER_LIGHT),
    },
    primary: {
      dark: GTheme.DEFAULT_PRIMARY_DARK,
      light: GTheme.DEFAULT_PRIMARY_LIGHT,
      main: GTheme.DEFAULT_PRIMARY_MAIN
    },
    secondary: {
      dark: GTheme.DEFAULT_SECONDARY_DARK,
      light: GTheme.DEFAULT_SECONDARY_LIGHT,
      main: GTheme.DEFAULT_SECONDARY_MAIN
    },
    text: {
      primary: (themeType === "dark" ? GTheme.DEFAULT_TEXT_PRIMARY_DARK : GTheme.DEFAULT_TEXT_PRIMARY_LIGHT),
      secondary: (themeType === "dark" ? GTheme.DEFAULT_TEXT_SECONDARY_DARK : GTheme.DEFAULT_TEXT_SECONDARY_LIGHT),
    },
    type: themeType
  },
  spacing: {
    unit: GTheme.DEFAULT_SPACING_UNIT
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
        default: isDark ? GTheme.DEFAULT_BACKGROUND_DARK : GTheme.DEFAULT_BACKGROUND_LIGHT,
        paper: isDark ? GTheme.DEFAULT_BACKGROUND_PAPER_DARK : GTheme.DEFAULT_BACKGROUND_PAPER_LIGHT
      },
      text: {
        primary: isDark ? GTheme.DEFAULT_TEXT_PRIMARY_DARK : GTheme.DEFAULT_TEXT_PRIMARY_LIGHT,
        secondary: isDark ? GTheme.DEFAULT_TEXT_SECONDARY_DARK : GTheme.DEFAULT_TEXT_SECONDARY_LIGHT
      },
      type: nextType
    },
    spacing
  };
};
