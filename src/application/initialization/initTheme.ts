/**
 * @module @initialization
 */

// Lib.
import { TThemeType } from "@Lib/theme/types";
import { Optional } from "@Lib/ts";

export const BLACK = "#000";
export const WHITE = "#FFF";
export const LIGHT_BLACK = "#444";

/**
 * Try to parse local storage-encrypted configs (if it is enabled).
 * Apply theme to body.
 */
export const initTheme = () => {

  const rawStr: Optional<string> = localStorage.getItem(btoa("theme_type")) || null;

  if (rawStr) {

    const theme: TThemeType = JSON.parse(atob(rawStr));

    document.body.style.backgroundColor = (theme === "dark" ? LIGHT_BLACK : WHITE);
    document.body.style.color = (theme === "dark" ? WHITE : BLACK);
  }
};
