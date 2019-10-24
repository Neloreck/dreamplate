// Lib.
import { createDefaultTheme, DEFAULT_THEME_TYPE, TThemeType, IApplicationTheme, toggleTheme } from "@Lib/theme";
import { encrypt, getFromLocalStorage, setLocalStorageItem } from "@Lib/utils";

// Data.
import { ThemeContextManager } from "@Main/data/store";

describe("Theme context manager.", () => {

  it("Should properly initialize.", () => {

    const manager: ThemeContextManager = new ThemeContextManager();

    const { themeState: { theme } } = manager.context;

    expect(theme.palette.type).toBe(DEFAULT_THEME_TYPE);

    // @ts-ignore privacy.
    manager.onProvisionStarted();

    // @ts-ignore privacy.
    manager.onProvisionEnded();
  });

  it("Should toggle theme correctly.", () => {

    const manager: ThemeContextManager = new ThemeContextManager();

    // @ts-ignore privacy.
    manager.setState = (nextState: object) => manager.context.themeState = Object.assign({}, manager.context.themeState, nextState);

    expect(manager.context.themeState.theme.palette.type).toBe("light");

    manager.toggleTheme();

    expect(manager.context.themeState.theme.palette.type).toBe("dark");
  });

  it("Should load preset from local storage.", () => {

    setLocalStorageItem("theme_type", "dark");

    const manager: ThemeContextManager = new ThemeContextManager();

    expect(manager.context.themeState.theme.palette.type).toBe("dark");
  });

  it("Should handle events from other tabs.", () => {

    const manager: ThemeContextManager = new ThemeContextManager();

    const defaultThemeValue: TThemeType = manager.context.themeState.theme.palette.type;
    const nextTheme: IApplicationTheme = toggleTheme(manager.context.themeState.theme);

    // @ts-ignore privacy.
    manager.onLocalStorageDataChanged({ key: encrypt("theme_type"), newValue: encrypt(JSON.stringify(nextTheme.palette.type)) });

    expect(manager.context.themeState.theme.palette.type).toBe(nextTheme.palette.type);
    expect(manager.context.themeState.theme.palette.type).not.toBe(defaultThemeValue);
  });
});
