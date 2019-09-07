import { EThemeType, IApplicationTheme } from "@Lib/theme/types";

export const createTheme = ({ palette, spacing }: IApplicationTheme): IApplicationTheme => {

  const isDark: boolean = (palette.type === EThemeType.DARK);

  return {
    palette: {
      ...palette,
      background: {
        default: isDark ? "#333433" : "#ffffff",
        paper: isDark ? "#5a5a5a" : "#f3f3f3"
      },
      text: {
        primary: isDark ? "#fff" : "#000",
        secondary: isDark ? "#AAA" : "#333"
      }
    },
    spacing: {
      ...spacing
    }
  };
};
