import { TThemeType, IApplicationTheme } from "@Lib/theme/types";
import { createDefaultTheme, toggleTheme } from "@Lib/theme/utils";

describe("Theming utils should work properly.", () => {
  it("Should correctly create default theme based on default colors.", () => {
    const theme: IApplicationTheme = createDefaultTheme(GTheme.DEFAULT_THEME_TYPE);

    expect(GTheme.DEFAULT_THEME_TYPE).toBe("light");

    expect(theme.palette.type).toBe(GTheme.DEFAULT_THEME_TYPE);

    expect(theme.palette.primary.light).toBe(GTheme.DEFAULT_PRIMARY_LIGHT);
    expect(theme.palette.primary.main).toBe(GTheme.DEFAULT_PRIMARY_MAIN);
    expect(theme.palette.primary.dark).toBe(GTheme.DEFAULT_PRIMARY_DARK);

    expect(theme.palette.secondary.light).toBe(GTheme.DEFAULT_SECONDARY_LIGHT);
    expect(theme.palette.secondary.main).toBe(GTheme.DEFAULT_SECONDARY_MAIN);
    expect(theme.palette.secondary.dark).toBe(GTheme.DEFAULT_SECONDARY_DARK);

    expect(theme.palette.background.default).toBe(GTheme.DEFAULT_BACKGROUND_LIGHT);
    expect(theme.palette.background.paper).toBe(GTheme.DEFAULT_BACKGROUND_PAPER_LIGHT);

    expect(theme.palette.text.primary).toBe(GTheme.DEFAULT_TEXT_PRIMARY_LIGHT);
    expect(theme.palette.text.secondary).toBe(GTheme.DEFAULT_TEXT_SECONDARY_LIGHT);

    expect(theme.spacing.unit).toBe(GTheme.DEFAULT_SPACING_UNIT);
  });

  it("Should correctly toggle theme colors.", () => {
    let theme: IApplicationTheme = createDefaultTheme(GTheme.DEFAULT_THEME_TYPE);

    for (let it = 0; it < 10; it ++) {
      const previousType: TThemeType = theme.palette.type;

      theme = toggleTheme(theme);

      const currentType: TThemeType = theme.palette.type;

      expect(currentType).not.toBe(previousType);

      expect(theme.palette.background.default).toBe(currentType === "light" ? GTheme.DEFAULT_BACKGROUND_LIGHT : GTheme.DEFAULT_BACKGROUND_DARK);
      expect(theme.palette.background.paper).toBe(currentType === "light" ? GTheme.DEFAULT_BACKGROUND_PAPER_LIGHT : GTheme.DEFAULT_BACKGROUND_PAPER_DARK);

      expect(theme.palette.text.primary).toBe(currentType === "light" ? GTheme.DEFAULT_TEXT_PRIMARY_LIGHT : GTheme.DEFAULT_TEXT_PRIMARY_DARK);
      expect(theme.palette.text.secondary).toBe(currentType === "light" ? GTheme.DEFAULT_TEXT_SECONDARY_LIGHT : GTheme.DEFAULT_TEXT_SECONDARY_DARK);
    }
  });
});
