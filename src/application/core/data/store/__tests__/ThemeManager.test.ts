import { mockManager } from "dreamstate/test-utils";

import { ThemeManager } from "@/core/data/store";
import { IApplicationTheme, toggleTheme, TThemeType } from "@/lib/theme";
import { encrypt, setLocalStorageItem } from "@/lib/utils";

describe("Theme context manager.", () => {
  it("should properly initialize.", () => {
    const manager: ThemeManager = mockManager(ThemeManager);
    const { theme } = manager.context;

    expect(theme.palette.type).toBe(GTheme.DEFAULT_THEME_TYPE);
  });

  it("should toggle theme correctly.", () => {
    const manager: ThemeManager = mockManager(ThemeManager);

    expect(manager.context.theme.palette.type).toBe("light");

    manager.toggleTheme();

    expect(manager.context.theme.palette.type).toBe("dark");
  });

  it("should load preset from local storage.", () => {
    setLocalStorageItem("theme_type", "dark");

    const manager: ThemeManager = mockManager(ThemeManager);

    expect(manager.context.theme.palette.type).toBe("dark");
  });

  it("should handle events from other tabs.", async () => {
    const manager: ThemeManager = mockManager(ThemeManager);

    const defaultThemeValue: TThemeType = manager.context.theme.palette.type;
    const nextTheme: IApplicationTheme = toggleTheme(manager.context.theme);

    manager["onLocalStorageDataChanged"]({
      key: encrypt("theme_type"),
      newValue: encrypt(JSON.stringify(nextTheme.palette.type)),
    } as StorageEvent);

    expect(manager.context.theme.palette.type).toBe(nextTheme.palette.type);
    expect(manager.context.theme.palette.type).not.toBe(defaultThemeValue);
  });
});
