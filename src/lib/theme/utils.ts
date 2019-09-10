import {
  DEFAULT_BACKGROUND_DARK,
  DEFAULT_BACKGROUND_LIGHT,
  DEFAULT_BACKGROUND_PAPER_DARK,
  DEFAULT_BACKGROUND_PAPER_LIGHT,
  DEFAULT_TEXT_PRIMARY_DARK,
  DEFAULT_TEXT_PRIMARY_LIGHT,
  DEFAULT_TEXT_SECONDARY_DARK,
  DEFAULT_TEXT_SECONDARY_LIGHT
} from "@Lib/theme/theming";
import { EThemeType, IApplicationTheme } from "@Lib/theme/types";

export const toggleTheme = ({ palette, spacing }: IApplicationTheme, requestedType?: EThemeType): IApplicationTheme => {

  const nextType: EThemeType = requestedType || palette.type;
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
