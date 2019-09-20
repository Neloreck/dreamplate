// Lib.
import { createDefaultTheme, DEFAULT_THEME_TYPE, EThemeType, IApplicationTheme, toggleTheme } from "@Lib/theme";
import { getFromLocalStorage, setLocalStorageItem } from "@Lib/utils";

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

    expect(manager.context.themeState.theme.palette.type).toBe(EThemeType.LIGHT);

    manager.toggleTheme();

    expect(manager.context.themeState.theme.palette.type).toBe(EThemeType.DARK);
  });

  it("Should load preset from local storage.", () => {

    const theme: IApplicationTheme = createDefaultTheme();

    setLocalStorageItem("theme", toggleTheme(theme));

    const manager: ThemeContextManager = new ThemeContextManager();

    expect(manager.context.themeState.theme.palette.type).toBe(getFromLocalStorage("theme").palette.type);
  });
});
