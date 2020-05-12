import { getCurrent, getCurrentContext } from "dreamstate";
import { registerService, unRegisterService } from "dreamstate/test-utils";

// Lib.
import { TThemeType, IApplicationTheme, toggleTheme } from "@Lib/theme";
import { encrypt, setLocalStorageItem } from "@Lib/utils";

// Data.
import { ThemeContextManager } from "@Core/data/store";

describe("Theme context manager.", () => {
  beforeEach(() => registerService(ThemeContextManager));
  afterEach(() => unRegisterService(ThemeContextManager));

  it("Should properly initialize.", () => {
    const { theme } = getCurrentContext(ThemeContextManager)!;

    expect(theme.palette.type).toBe(GTheme.DEFAULT_THEME_TYPE);
  });

  it("Should toggle theme correctly.", () => {
    const manager: ThemeContextManager = getCurrent(ThemeContextManager)!;

    expect(manager.context.theme.palette.type).toBe("light");

    manager.toggleTheme();

    expect(manager.context.theme.palette.type).toBe("dark");
  });

  it("Should load preset from local storage.", () => {
    setLocalStorageItem("theme_type", "dark");

    const manager: ThemeContextManager = getCurrent(ThemeContextManager)!;

    expect(manager.context.theme.palette.type).toBe("dark");
  });

  it("Should handle events from other tabs.", async () => {
    const manager: ThemeContextManager = getCurrent(ThemeContextManager)!;

    const defaultThemeValue: TThemeType = manager.context.theme.palette.type;
    const nextTheme: IApplicationTheme = toggleTheme(manager.context.theme);

    manager["onLocalStorageDataChanged"]({
      key: encrypt("theme_type"),
      newValue: encrypt(JSON.stringify(nextTheme.palette.type))
    } as StorageEvent);

    expect(manager.context.theme.palette.type).toBe(nextTheme.palette.type);
    expect(manager.context.theme.palette.type).not.toBe(defaultThemeValue);
  });
});
