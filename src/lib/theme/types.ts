/**
 * @module @lib/theme
 */

export enum EThemeType {
  LIGHT = "light",
  DARK = "dark"
}

export interface IApplicationTheme {
  palette: {
    background: {
      default: string;
      paper: string;
    }
    primary: {
      light: string;
      main: string;
      dark: string;
    },
    secondary: {
      light: string;
      main: string;
      dark: string;
    },
    text: {
      primary: string;
      secondary: string;
    }
    type: EThemeType
  };
  spacing: {
    unit: number;
  };
}
