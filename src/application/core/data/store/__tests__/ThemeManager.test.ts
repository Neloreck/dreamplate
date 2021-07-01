import { mockManagerWithScope } from "dreamstate/test-utils";

import { TThemeType, IApplicationTheme, toggleTheme } from "@Lib/theme";
import { encrypt, setLocalStorageItem } from "@Lib/utils";

import { ThemeManager } from "@Core/data/store";

describe("Theme context manager.", () => {
  it("Should properly initialize.", () => {
    const [ themeManager ] = mockManagerWithScope(ThemeManager);
    const { theme } = themeManager.context;

    expect(theme.palette.type).toBe(GTheme.DEFAULT_THEME_TYPE);
  });

  it("Should toggle theme correctly.", () => {
    const [ themeManager ] = mockManagerWithScope(ThemeManager);

    expect(themeManager.context.theme.palette.type).toBe("light");

    themeManager.toggleTheme();

    expect(themeManager.context.theme.palette.type).toBe("dark");
  });

  it("Should load preset from local storage.", () => {
    setLocalStorageItem("theme_type", "dark");

    const [ themeManager ] = mockManagerWithScope(ThemeManager);

    expect(themeManager.context.theme.palette.type).toBe("dark");
  });

  it("Should handle events from other tabs.", async () => {
    const [ themeManager ] = mockManagerWithScope(ThemeManager);

    const defaultThemeValue: TThemeType = themeManager.context.theme.palette.type;
    const nextTheme: IApplicationTheme = toggleTheme(themeManager.context.theme);

    themeManager["onLocalStorageDataChanged"]({
      key: encrypt("theme_type"),
      newValue: encrypt(JSON.stringify(nextTheme.palette.type))
    } as StorageEvent);

    expect(themeManager.context.theme.palette.type).toBe(nextTheme.palette.type);
    expect(themeManager.context.theme.palette.type).not.toBe(defaultThemeValue);
  });
});
