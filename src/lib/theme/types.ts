/**
 * @packageDocumentation
 * @module @lib/theme
 */

export type TThemeType = "light" | "dark";

export interface IApplicationTheme {
  palette: {
    background: {
      default: string;
      paper: string;
    };
    primary: {
      light: string;
      main: string;
      dark: string;
    };
    secondary: {
      light: string;
      main: string;
      dark: string;
    };
    text: {
      primary: string;
      secondary: string;
    };
    type: TThemeType;
  };
  spacing: {
    unit: number;
  };
}
