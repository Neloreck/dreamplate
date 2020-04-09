// Lib.
import { TThemeType, IApplicationTheme, toggleTheme } from "@Lib/theme";
import { encrypt, setLocalStorageItem } from "@Lib/utils";

// Data.
import { ThemeContextManager } from "@Core/data/store";

describe("Theme context manager.", () => {
  it("Should properly initialize.", () => {
    const manager: ThemeContextManager = new ThemeContextManager();

    const { theme } = manager.context;

    expect(theme.palette.type).toBe(GTheme.DEFAULT_THEME_TYPE);

    // @ts-ignore privacy.
    manager.onProvisionStarted();

    // @ts-ignore privacy.
    manager.onProvisionEnded();
  });

  it("Should toggle theme correctly.", () => {
    const manager: ThemeContextManager = new ThemeContextManager();

    expect(manager.context.theme.palette.type).toBe("light");

    manager.toggleTheme();

    expect(manager.context.theme.palette.type).toBe("dark");
  });

  it("Should load preset from local storage.", () => {
    setLocalStorageItem("theme_type", "dark");

    const manager: ThemeContextManager = new ThemeContextManager();

    expect(manager.context.theme.palette.type).toBe("dark");
  });

  it("Should handle events from other tabs.", () => {
    const manager: ThemeContextManager = new ThemeContextManager();

    const defaultThemeValue: TThemeType = manager.context.theme.palette.type;
    const nextTheme: IApplicationTheme = toggleTheme(manager.context.theme);

    // @ts-ignore privacy.
    manager.onLocalStorageDataChanged({
      key: encrypt("theme_type"),
      newValue: encrypt(JSON.stringify(nextTheme.palette.type))
    });

    expect(manager.context.theme.palette.type).toBe(nextTheme.palette.type);
    expect(manager.context.theme.palette.type).not.toBe(defaultThemeValue);
  });
});
