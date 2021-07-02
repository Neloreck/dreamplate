import { TThemeType } from "@Lib/theme/types";
import { TOptional } from "@Lib/types";

/**
 * Try to parse local storage-encrypted configs (if it is enabled).
 * Apply theme to body.
 */
export function initTheme(): void {
  const rawStr: TOptional<string> = localStorage.getItem(btoa("theme_type")) || null;
  const bodyStyle: CSSStyleDeclaration = document.body.style;

  if (rawStr) {
    const theme: TThemeType = JSON.parse(atob(rawStr));

    bodyStyle.backgroundColor = (theme === "dark" ? GTheme.DEFAULT_BACKGROUND_DARK : GTheme.DEFAULT_BACKGROUND_LIGHT);
    bodyStyle.color = (theme === "dark" ? GColor.WHITE : GColor.BLACK);
  }
}
