/**
 * @module lib/utils
 */

import { EThemeType, IApplicationTheme } from "@Lib/theme/types";
import { createDefaultTheme, toggleTheme } from "@Lib/theme/utils";
import {
  DEFAULT_BACKGROUND_DARK,
  DEFAULT_BACKGROUND_LIGHT, DEFAULT_BACKGROUND_PAPER_DARK,
  DEFAULT_BACKGROUND_PAPER_LIGHT,
  DEFAULT_PRIMARY_DARK,
  DEFAULT_PRIMARY_LIGHT,
  DEFAULT_PRIMARY_MAIN,
  DEFAULT_SECONDARY_DARK,
  DEFAULT_SECONDARY_LIGHT,
  DEFAULT_SECONDARY_MAIN, DEFAULT_SPACING_UNIT, DEFAULT_TEXT_PRIMARY_DARK,
  DEFAULT_TEXT_PRIMARY_LIGHT, DEFAULT_TEXT_SECONDARY_DARK,
  DEFAULT_TEXT_SECONDARY_LIGHT,
  DEFAULT_THEME_TYPE
} from "@Lib/theme/theming";

describe("Theming utils should work properly.", () => {

  it("Should correctly create default theme based on default colors.", () => {

    const theme: IApplicationTheme = createDefaultTheme();

    expect(DEFAULT_THEME_TYPE).toBe(EThemeType.LIGHT);

    expect(theme.palette.type).toBe(DEFAULT_THEME_TYPE);

    expect(theme.palette.primary.light).toBe(DEFAULT_PRIMARY_LIGHT);
    expect(theme.palette.primary.main).toBe(DEFAULT_PRIMARY_MAIN);
    expect(theme.palette.primary.dark).toBe(DEFAULT_PRIMARY_DARK);

    expect(theme.palette.secondary.light).toBe(DEFAULT_SECONDARY_LIGHT);
    expect(theme.palette.secondary.main).toBe(DEFAULT_SECONDARY_MAIN);
    expect(theme.palette.secondary.dark).toBe(DEFAULT_SECONDARY_DARK);

    expect(theme.palette.background.default).toBe(DEFAULT_BACKGROUND_LIGHT);
    expect(theme.palette.background.paper).toBe(DEFAULT_BACKGROUND_PAPER_LIGHT);

    expect(theme.palette.text.primary).toBe(DEFAULT_TEXT_PRIMARY_LIGHT);
    expect(theme.palette.text.secondary).toBe(DEFAULT_TEXT_SECONDARY_LIGHT);

    expect(theme.spacing.unit).toBe(DEFAULT_SPACING_UNIT);
  });

  it("Should correctly toggle theme colors.", () => {

    let theme: IApplicationTheme = createDefaultTheme();

    for (let it = 0; it < 10; it ++) {

      const previousType: EThemeType = theme.palette.type;

      theme = toggleTheme(theme);

      const currentType: EThemeType = theme.palette.type;

      expect(currentType).not.toBe(previousType);

      expect(theme.palette.background.default).toBe(currentType === EThemeType.LIGHT ? DEFAULT_BACKGROUND_LIGHT : DEFAULT_BACKGROUND_DARK);
      expect(theme.palette.background.paper).toBe(currentType === EThemeType.LIGHT ? DEFAULT_BACKGROUND_PAPER_LIGHT : DEFAULT_BACKGROUND_PAPER_DARK);

      expect(theme.palette.text.primary).toBe(currentType === EThemeType.LIGHT ? DEFAULT_TEXT_PRIMARY_LIGHT : DEFAULT_TEXT_PRIMARY_DARK);
      expect(theme.palette.text.secondary).toBe(currentType === EThemeType.LIGHT ? DEFAULT_TEXT_SECONDARY_LIGHT : DEFAULT_TEXT_SECONDARY_DARK);
    }
  });
});
